// Registration page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const detectLocationBtn = document.getElementById('detectLocationBtn');
    const locationStatus = document.getElementById('locationStatus');
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');
    const locationInput = document.getElementById('location');

    // Detect location button
    if (detectLocationBtn) {
        detectLocationBtn.addEventListener('click', function() {
            if (navigator.geolocation) {
                // Update button state
                detectLocationBtn.disabled = true;
                detectLocationBtn.innerHTML = `
                    <span class="btn-icon">⏳</span>
                    <span>Detecting...</span>
                `;
                locationStatus.textContent = 'Detecting your location...';
                locationStatus.style.color = '#FFA726';

                navigator.geolocation.getCurrentPosition(
                    position => {
                        // Success
                        latitudeInput.value = position.coords.latitude;
                        longitudeInput.value = position.coords.longitude;

                        // Update button
                        detectLocationBtn.disabled = false;
                        detectLocationBtn.innerHTML = `
                            <span class="btn-icon">✓</span>
                            <span>Location Detected</span>
                        `;
                        detectLocationBtn.style.background = '#6BCF7F';
                        detectLocationBtn.style.color = 'white';

                        // Update status
                        locationStatus.textContent = `✓ Location detected: ${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
                        locationStatus.style.color = '#6BCF7F';

                        // Get address
                        reverseGeocode(position.coords.latitude, position.coords.longitude);
                    },
                    error => {
                        // Error
                        detectLocationBtn.disabled = false;
                        detectLocationBtn.innerHTML = `
                            <span class="btn-icon">📍</span>
                            <span>Detect My Location</span>
                        `;

                        let errorMsg = 'Location detection failed. ';
                        switch(error.code) {
                            case error.PERMISSION_DENIED:
                                errorMsg += 'Please allow location access.';
                                break;
                            case error.POSITION_UNAVAILABLE:
                                errorMsg += 'Location information unavailable.';
                                break;
                            case error.TIMEOUT:
                                errorMsg += 'Location request timed out.';
                                break;
                            default:
                                errorMsg += 'An unknown error occurred.';
                        }

                        locationStatus.textContent = errorMsg;
                        locationStatus.style.color = '#EF5350';
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 0
                    }
                );
            } else {
                locationStatus.textContent = 'Geolocation is not supported by your browser.';
                locationStatus.style.color = '#EF5350';
            }
        });
    }

    // Reverse geocode to get address
    async function reverseGeocode(lat, lng) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            const data = await response.json();

            if (data && data.address) {
                // Build a nice address string
                const parts = [];
                if (data.address.city) parts.push(data.address.city);
                if (data.address.state) parts.push(data.address.state);
                if (data.address.country) parts.push(data.address.country);

                if (parts.length > 0 && locationInput.value === '') {
                    locationInput.value = parts.join(', ');
                }
            }
        } catch (error) {
            console.error('Error reverse geocoding:', error);
        }
    }

    // Form validation
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            const lat = latitudeInput.value;
            const lng = longitudeInput.value;

            if (!lat || !lng) {
                e.preventDefault();
                alert('Please detect your location before submitting. This helps us match you with nearby rescue requests.');
                return false;
            }
        });
    }

    // Helper type selection - add visual feedback
    const helperTypeSelect = document.getElementById('helper_type');
    if (helperTypeSelect) {
        helperTypeSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            if (selectedOption.value) {
                this.style.borderColor = '#4ECDC4';
            }
        });
    }
});
