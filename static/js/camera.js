// Camera functionality for animal reporting
let stream = null;
let currentLocation = null;
let capturedImageBlob = null;

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('captureBtn');
const retakeBtn = document.getElementById('retakeBtn');
const submitBtn = document.getElementById('submitBtn');
const capturedImageDiv = document.getElementById('capturedImage');
const photo = document.getElementById('photo');
const locationBadge = document.getElementById('locationBadge');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const reportForm = document.getElementById('reportForm');

// Get user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                currentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                
                // Update hidden form fields
                document.getElementById('latitude').value = currentLocation.latitude;
                document.getElementById('longitude').value = currentLocation.longitude;
                
                // Update location badge
                locationBadge.innerHTML = `
                    <span class="badge-icon">✓</span>
                    <span class="badge-text">Location detected</span>
                `;
                locationBadge.style.background = 'rgba(40, 167, 69, 0.9)';
                
                // Get address from coordinates using reverse geocoding
                reverseGeocode(currentLocation.latitude, currentLocation.longitude);
            },
            error => {
                console.error('Error getting location:', error);
                locationBadge.innerHTML = `
                    <span class="badge-icon">⚠</span>
                    <span class="badge-text">Location unavailable</span>
                `;
                locationBadge.style.background = 'rgba(220, 53, 69, 0.9)';
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    } else {
        locationBadge.innerHTML = `
            <span class="badge-icon">⚠</span>
            <span class="badge-text">Geolocation not supported</span>
        `;
        locationBadge.style.background = 'rgba(220, 53, 69, 0.9)';
    }
}

// Reverse geocode to get address from coordinates
async function reverseGeocode(lat, lng) {
    try {
        // Using OpenStreetMap Nominatim API (free, no API key required)
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await response.json();
        
        if (data && data.display_name) {
            document.getElementById('location_address').value = data.display_name;
        }
    } catch (error) {
        console.error('Error reverse geocoding:', error);
        document.getElementById('location_address').value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
}

// Initialize camera
async function startCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment', // Use back camera on mobile
                width: { ideal: 1920 },
                height: { ideal: 1080 }
            }
        });
        video.srcObject = stream;
        video.play();
    } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Could not access camera. Please check permissions or use the upload button.');
    }
}

// Capture photo from video stream
function capturePhoto() {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to blob
    canvas.toBlob(blob => {
        capturedImageBlob = blob;
        const url = URL.createObjectURL(blob);
        photo.src = url;
        
        // Hide video, show captured image
        video.style.display = 'none';
        capturedImageDiv.style.display = 'block';
        
        // Stop camera stream
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        // Enable submit button
        submitBtn.disabled = false;
    }, 'image/jpeg', 0.9);
}

// Retake photo
function retakePhoto() {
    capturedImageBlob = null;
    video.style.display = 'block';
    capturedImageDiv.style.display = 'none';
    submitBtn.disabled = true;
    startCamera();
}

// Handle file upload
fileInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
        capturedImageBlob = file;
        const url = URL.createObjectURL(file);
        photo.src = url;
        
        // Hide video, show uploaded image
        video.style.display = 'none';
        capturedImageDiv.style.display = 'block';
        
        // Stop camera stream
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        // Enable submit button
        submitBtn.disabled = false;
    }
});

// Form submission
reportForm.addEventListener('submit', function(e) {
    if (!capturedImageBlob) {
        e.preventDefault();
        alert('Please capture or upload an image first.');
        return;
    }
    
    if (!currentLocation) {
        e.preventDefault();
        alert('Location is required. Please allow location access.');
        return;
    }
    
    // Create FormData and append the image
    const formData = new FormData(this);
    formData.append('image', capturedImageBlob, 'animal_report.jpg');
    
    // Submit via fetch to handle file upload properly
    e.preventDefault();
    
    fetch(this.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        }
        throw new Error('Network response was not ok');
    })
    .then(html => {
        // Redirect to the response page
        window.location.href = this.action;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the report. Please try again.');
    });
});

// Event listeners
captureBtn.addEventListener('click', capturePhoto);
retakeBtn.addEventListener('click', retakePhoto);
uploadBtn.addEventListener('click', () => fileInput.click());

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    getLocation();
    startCamera();
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
});
