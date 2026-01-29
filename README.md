#  Animal Rescue Application

A comprehensive web application for reporting and rescuing street animals in distress. Built with Flask, this application connects people who find injured animals with nearby volunteers, NGOs, and veterinarians who can help.

![Animal Rescue](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![Flask](https://img.shields.io/badge/Flask-3.0-green)

##  Features

### 1. **Home Page**
- Beautiful, compassionate design
- Clear call-to-action buttons
- Information about the rescue process
- Statistics dashboard

### 2. **Report Animal** 
- Camera integration with live preview
- Automatic geolocation detection
- Upload from gallery option
- Reverse geocoding for address
- Image capture with location tagging
- Email notifications to nearby helpers

### 3. **Rescue Status** 
- Real-time status tracking
- Timeline visualization
- Assigned helper information
- Google Maps integration
- Report details display

### 4. **Registration** 
- Multi-type registration (NGO, Vet, Individual)
- Location-based helper matching
- Automatic coordinate detection
- Email notification system

### 5. **Donation** 
- Flexible donation amounts
- Impact calculator
- Recent donor showcase
- Transparent fund allocation
- Multiple payment gateway support (demo)

##  Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/animal-rescue-app.git
   cd animal-rescue-app
   ```

2. **Create a virtual environment** (recommended)
   ```bash
   # On Windows
   python -m venv venv
   venv\Scripts\activate

   # On macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Initialize the database**
   ```bash
   python
   >>> from app import app, db
   >>> with app.app_context():
   ...     db.create_all()
   >>> exit()
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Open your browser**
   Navigate to `http://localhost:5000`

##  Project Structure

```
animal-rescue-app/
│
├── app.py                      # Main Flask application
├── requirements.txt            # Python dependencies
├── README.md                   # This file
├── .gitignore                  # Git ignore file
│
├── templates/                  # HTML templates
│   ├── base.html              # Base template
│   ├── home.html              # Home page
│   ├── report.html            # Report animal page
│   ├── rescue_status.html     # Status tracking page
│   ├── register.html          # Helper registration
│   └── donate.html            # Donation page
│
├── static/                     # Static files
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   ├── main.js            # Common JavaScript
│   │   ├── camera.js          # Camera functionality
│   │   ├── register.js        # Registration logic
│   │   └── donate.js          # Donation logic
│   └── uploads/               # Uploaded images
│
└── instance/                   # Instance folder (auto-created)
    └── animal_rescue.db       # SQLite database
```

## 💾 Database Schema

### Helper Model
- `id`: Primary key
- `name`: Helper/Organization name
- `age`: Helper's age
- `contact`: Phone number
- `email`: Email address (unique)
- `location`: Address/service area
- `latitude`: GPS latitude
- `longitude`: GPS longitude
- `helper_type`: NGO/Veterinarian/Individual
- `created_at`: Registration timestamp

### Report Model
- `id`: Primary key
- `image_path`: Saved image filename
- `latitude`: Report location latitude
- `longitude`: Report location longitude
- `location_address`: Human-readable address
- `description`: Optional description
- `status`: pending/assigned/rescued
- `created_at`: Report timestamp
- `assigned_helper_id`: Foreign key to Helper
- `reporter_contact`: Reporter's phone (optional)

### Donation Model
- `id`: Primary key
- `donor_name`: Donor's name
- `donor_email`: Donor's email
- `amount`: Donation amount
- `message`: Optional message
- `created_at`: Donation timestamp

## 🔧 Configuration

### Email Notifications

To enable email notifications, configure SMTP settings in `app.py`:

```python
# Update the send_email_notification function with your SMTP settings
smtp_server = "smtp.gmail.com"
smtp_port = 587
sender_email = "your-email@gmail.com"
sender_password = "your-app-password"
```

### Production Deployment

For production deployment:

1. **Set a strong secret key**
   ```python
   app.config['SECRET_KEY'] = 'your-very-secret-key-here'
   ```

2. **Use a production database** (PostgreSQL recommended)
   ```python
   app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:password@localhost/dbname'
   ```

3. **Configure email service** (SendGrid, Mailgun, etc.)

4. **Add payment gateway integration** (Stripe, PayPal, Razorpay)

5. **Deploy using Gunicorn**
   ```bash
   gunicorn -w 4 -b 0.0.0.0:8000 app:app
   ```

##  API Endpoints

- `GET /` - Home page
- `GET/POST /report` - Report animal page
- `GET /rescue-status/<id>` - View rescue status
- `GET/POST /register` - Helper registration
- `GET/POST /donate` - Donation page
- `GET /api/helpers` - Get all helpers (JSON)
- `GET /api/reports` - Get all reports (JSON)

##  Security Features

-  CSRF protection via Flask-WTF
-  Secure file upload handling
-  SQL injection prevention (SQLAlchemy ORM)
-  XSS protection (Jinja2 auto-escaping)
-  Location data validation
-  File size limits
-  Email validation

##  Design Features

- Responsive design for mobile and desktop
- Compassionate color palette
- Smooth animations and transitions
- Accessible UI components
- Modern gradient backgrounds
- Interactive feedback
- Professional typography

##  Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Required Permissions

-  Camera access (for photo capture)
-  Location access (for geolocation)

##  Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##  Future Enhancements

- [ ] Real-time chat between reporters and helpers
- [ ] Mobile app (iOS/Android)
- [ ] SMS notifications
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Integration with animal hospitals
- [ ] Adoption portal
- [ ] Success story gallery
- [ ] Volunteer training modules
- [ ] AI-powered injury detection

##  License

This project is licensed under the MIT License - see the LICENSE file for details.

##  Acknowledgments

- OpenStreetMap Nominatim for reverse geocoding
- Flask and SQLAlchemy communities
- All animal welfare organizations worldwide
- Volunteers who dedicate their time to rescue animals

##  Contact

For questions, suggestions, or support:
- Email: rescue@animalrescue.org
- GitHub Issues: [Create an issue](https://github.com/yourusername/animal-rescue-app/issues)

---

Made with ❤️ for animals in need

**Remember: Every life matters. Together, we can make a difference!** 🐾
