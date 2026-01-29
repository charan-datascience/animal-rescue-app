from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os
from werkzeug.utils import secure_filename
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import math

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-change-this-in-production'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///animal_rescue.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create upload folder if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

db = SQLAlchemy(app)

# Database Models
class Helper(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    contact = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    location = db.Column(db.String(200), nullable=False)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    helper_type = db.Column(db.String(50))  # NGO, Vet, Individual
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Helper {self.name}>'

class Report(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_path = db.Column(db.String(200), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    location_address = db.Column(db.String(300))
    description = db.Column(db.Text)
    status = db.Column(db.String(50), default='pending')  # pending, assigned, rescued
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    assigned_helper_id = db.Column(db.Integer, db.ForeignKey('helper.id'))
    reporter_contact = db.Column(db.String(20))

    def __repr__(self):
        return f'<Report {self.id}>'

class Donation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    donor_name = db.Column(db.String(100), nullable=False)
    donor_email = db.Column(db.String(120), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    message = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Donation {self.donor_name} - ${self.amount}>'

# Helper function to calculate distance between two coordinates
def calculate_distance(lat1, lon1, lat2, lon2):
    """Calculate distance between two points using Haversine formula (in km)"""
    R = 6371  # Earth's radius in kilometers
    
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    delta_lat = math.radians(lat2 - lat1)
    delta_lon = math.radians(lon2 - lon1)
    
    a = math.sin(delta_lat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(delta_lon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    
    return R * c

# Helper function to find nearest helpers
def find_nearest_helpers(latitude, longitude, max_distance=50):
    """Find helpers within max_distance km"""
    all_helpers = Helper.query.all()
    nearby_helpers = []
    
    for helper in all_helpers:
        if helper.latitude and helper.longitude:
            distance = calculate_distance(latitude, longitude, helper.latitude, helper.longitude)
            if distance <= max_distance:
                nearby_helpers.append({
                    'helper': helper,
                    'distance': distance
                })
    
    # Sort by distance
    nearby_helpers.sort(key=lambda x: x['distance'])
    return nearby_helpers

# Email notification function
def send_email_notification(helper_email, helper_name, report_id, latitude, longitude, location_address):
    """Send email notification to helper about new rescue request"""
    try:
        # Note: In production, configure with actual SMTP settings
        # For development, this will be a placeholder
        subject = f"🚨 New Animal Rescue Alert - Report #{report_id}"
        body = f"""
        Dear {helper_name},
        
        A new animal rescue request has been reported near your location!
        
        Report Details:
        - Report ID: #{report_id}
        - Location: {location_address}
        - Coordinates: {latitude}, {longitude}
        - View on Map: https://www.google.com/maps?q={latitude},{longitude}
        
        Please respond as soon as possible to help this animal in need.
        
        Thank you for your dedication to animal welfare!
        
        Best regards,
        Animal Rescue Team
        """
        
        # In production, implement actual email sending
        # For now, we'll just log it
        print(f"Email would be sent to {helper_email}")
        print(f"Subject: {subject}")
        print(f"Body: {body}")
        
        return True
    except Exception as e:
        print(f"Email sending failed: {str(e)}")
        return False

# Routes
@app.route('/')
def home():
    """Home page with main actions"""
    return render_template('home.html')

@app.route('/report', methods=['GET', 'POST'])
def report_animal():
    """Report animal page with image capture and geolocation"""
    if request.method == 'POST':
        try:
            # Get form data
            latitude = float(request.form.get('latitude'))
            longitude = float(request.form.get('longitude'))
            location_address = request.form.get('location_address', '')
            description = request.form.get('description', '')
            reporter_contact = request.form.get('contact', '')
            
            # Handle image upload
            if 'image' not in request.files:
                flash('No image uploaded', 'error')
                return redirect(request.url)
            
            file = request.files['image']
            if file.filename == '':
                flash('No selected file', 'error')
                return redirect(request.url)
            
            # Save the image
            filename = secure_filename(f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename}")
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            
            # Create new report
            new_report = Report(
                image_path=filename,
                latitude=latitude,
                longitude=longitude,
                location_address=location_address,
                description=description,
                reporter_contact=reporter_contact,
                status='pending'
            )
            db.session.add(new_report)
            db.session.commit()
            
            # Find nearest helpers
            nearby_helpers = find_nearest_helpers(latitude, longitude)
            
            # Send notifications to nearest helpers (up to 5)
            notifications_sent = 0
            for helper_data in nearby_helpers[:5]:
                helper = helper_data['helper']
                if send_email_notification(
                    helper.email,
                    helper.name,
                    new_report.id,
                    latitude,
                    longitude,
                    location_address
                ):
                    notifications_sent += 1
            
            # Update report with assignment if helpers found
            if nearby_helpers:
                new_report.assigned_helper_id = nearby_helpers[0]['helper'].id
                new_report.status = 'assigned'
                db.session.commit()
            
            flash(f'Report submitted successfully! {notifications_sent} helpers notified.', 'success')
            return redirect(url_for('rescue_status', report_id=new_report.id))
            
        except Exception as e:
            flash(f'Error submitting report: {str(e)}', 'error')
            return redirect(request.url)
    
    return render_template('report.html')

@app.route('/rescue-status/<int:report_id>')
def rescue_status(report_id):
    """Show rescue status for a specific report"""
    report = Report.query.get_or_404(report_id)
    assigned_helper = None
    
    if report.assigned_helper_id:
        assigned_helper = Helper.query.get(report.assigned_helper_id)
    
    return render_template('rescue_status.html', report=report, helper=assigned_helper)

@app.route('/register', methods=['GET', 'POST'])
def register():
    """Registration page for helpers (NGOs, vets, individuals)"""
    if request.method == 'POST':
        try:
            name = request.form.get('name')
            age = int(request.form.get('age'))
            contact = request.form.get('contact')
            email = request.form.get('email')
            location = request.form.get('location')
            latitude = float(request.form.get('latitude', 0))
            longitude = float(request.form.get('longitude', 0))
            helper_type = request.form.get('helper_type')
            
            # Check if email already exists
            existing_helper = Helper.query.filter_by(email=email).first()
            if existing_helper:
                flash('Email already registered!', 'error')
                return redirect(request.url)
            
            # Create new helper
            new_helper = Helper(
                name=name,
                age=age,
                contact=contact,
                email=email,
                location=location,
                latitude=latitude,
                longitude=longitude,
                helper_type=helper_type
            )
            db.session.add(new_helper)
            db.session.commit()
            
            flash('Registration successful! You will now receive notifications about nearby rescue requests.', 'success')
            return redirect(url_for('home'))
            
        except Exception as e:
            flash(f'Registration failed: {str(e)}', 'error')
            return redirect(request.url)
    
    return render_template('register.html')

@app.route('/donate', methods=['GET', 'POST'])
def donate():
    """Donation page for funding animal rescue"""
    if request.method == 'POST':
        try:
            donor_name = request.form.get('donor_name')
            donor_email = request.form.get('donor_email')
            amount = float(request.form.get('amount'))
            message = request.form.get('message', '')
            
            # Create donation record
            new_donation = Donation(
                donor_name=donor_name,
                donor_email=donor_email,
                amount=amount,
                message=message
            )
            db.session.add(new_donation)
            db.session.commit()
            
            flash(f'Thank you for your generous donation of ${amount:.2f}!', 'success')
            return redirect(url_for('donate'))
            
        except Exception as e:
            flash(f'Donation failed: {str(e)}', 'error')
            return redirect(request.url)
    
    # Get total donations and recent donations
    total_donations = db.session.query(db.func.sum(Donation.amount)).scalar() or 0
    recent_donations = Donation.query.order_by(Donation.created_at.desc()).limit(10).all()
    
    return render_template('donate.html', total_donations=total_donations, recent_donations=recent_donations)

@app.route('/api/helpers')
def api_helpers():
    """API endpoint to get all registered helpers"""
    helpers = Helper.query.all()
    return jsonify([{
        'id': h.id,
        'name': h.name,
        'location': h.location,
        'helper_type': h.helper_type
    } for h in helpers])

@app.route('/api/reports')
def api_reports():
    """API endpoint to get all reports"""
    reports = Report.query.order_by(Report.created_at.desc()).all()
    return jsonify([{
        'id': r.id,
        'latitude': r.latitude,
        'longitude': r.longitude,
        'status': r.status,
        'created_at': r.created_at.isoformat()
    } for r in reports])

# Initialize database
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
