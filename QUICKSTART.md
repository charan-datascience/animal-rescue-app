# 🚀 Quick Start Guide

Get the Animal Rescue Application running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Python 3.8 or higher installed
- ✅ pip (comes with Python)
- ✅ Git (optional, for cloning)

**Check your Python version:**
```bash
python --version
# or
python3 --version
```

## Installation Methods

### Method 1: Automatic Setup (Recommended)

#### On macOS/Linux:

```bash
# Navigate to the project directory
cd animal-rescue-app

# Run the setup script
chmod +x run.sh
./run.sh
```

#### On Windows:

```bash
# Navigate to the project directory
cd animal-rescue-app

# Run the setup script
run.bat
```

The script will automatically:
1. Create a virtual environment
2. Install all dependencies
3. Initialize the database
4. Start the application

### Method 2: Manual Setup

#### Step 1: Navigate to Project
```bash
cd animal-rescue-app
```

#### Step 2: Create Virtual Environment

**macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

#### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

#### Step 4: Initialize Database
```bash
python
```
Then in the Python interpreter:
```python
from app import app, db
with app.app_context():
    db.create_all()
exit()
```

#### Step 5: Run the Application
```bash
python app.py
```

## Access the Application

Once running, open your browser and go to:
```
http://localhost:5000
```

You should see the beautiful home page! 🎉

## First Steps

### 1. Explore the Home Page
- Check out the hero section
- Read about how it works
- View the statistics

### 2. Register as a Helper
- Click "Join as Helper"
- Fill in your details
- Allow location access
- Submit registration

### 3. Report an Animal
- Click "Report Animal in Distress"
- Allow camera and location access
- Capture or upload a photo
- Add description (optional)
- Submit report

### 4. Check Status
- After reporting, you'll see the status page
- View the timeline
- See assigned helper details
- Check location on map

### 5. Make a Donation
- Click "Donate"
- Select or enter amount
- Fill in your details
- Submit (demo mode)

## Common Issues & Solutions

### Issue: "Python not found"
**Solution:**
```bash
# Try python3 instead of python
python3 --version
```

### Issue: "Permission denied" on run.sh
**Solution:**
```bash
chmod +x run.sh
```

### Issue: "Module not found"
**Solution:**
```bash
# Make sure virtual environment is activated
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

### Issue: "Address already in use"
**Solution:**
```bash
# Another application is using port 5000
# Either stop that application or change the port in app.py

# To change port, edit app.py:
app.run(debug=True, host='0.0.0.0', port=5001)
```

### Issue: Camera not working
**Solutions:**
1. **Check browser permissions:** Click the lock icon in address bar → Allow camera
2. **Use HTTPS:** Some browsers require HTTPS for camera access
3. **Try different browser:** Chrome and Firefox work best
4. **Use upload option:** Click "Upload from Gallery" instead

### Issue: Location not detected
**Solutions:**
1. **Check browser permissions:** Allow location access
2. **Enable location services:** System settings → Privacy → Location
3. **Try manual entry:** Enter location manually in the form

## Testing with Sample Data

### Create Test Helper Accounts

```python
# Run Python interpreter
python

# Then:
from app import app, db, Helper
with app.app_context():
    # Create a test NGO
    ngo = Helper(
        name="Test Animal Welfare NGO",
        age=30,
        contact="+1234567890",
        email="ngo@test.com",
        location="New York, USA",
        latitude=40.7128,
        longitude=-74.0060,
        helper_type="NGO"
    )
    
    # Create a test veterinarian
    vet = Helper(
        name="Dr. Test Veterinarian",
        age=35,
        contact="+1234567891",
        email="vet@test.com",
        location="Los Angeles, USA",
        latitude=34.0522,
        longitude=-118.2437,
        helper_type="Veterinarian"
    )
    
    db.session.add(ngo)
    db.session.add(vet)
    db.session.commit()
    print("✓ Test helpers created!")
exit()
```

## Browser Compatibility

✅ **Recommended Browsers:**
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

⚠️ **Required Features:**
- JavaScript enabled
- Cookies enabled
- Camera access (for photo capture)
- Location access (for geolocation)

## Next Steps

Once you're comfortable with the basics:

1. **Read the full README.md** for detailed documentation
2. **Check DEPLOYMENT.md** for production deployment
3. **Review CONTRIBUTING.md** to contribute
4. **Explore the code** to understand how it works
5. **Customize** the application for your needs

## Getting Help

If you're stuck:
1. Check this guide again
2. Read the error messages carefully
3. Check existing GitHub issues
4. Create a new issue with:
   - What you tried to do
   - What happened
   - Error messages
   - Your environment (OS, Python version)

## Stopping the Application

Press `Ctrl+C` in the terminal where the app is running.

To deactivate the virtual environment:
```bash
deactivate
```

## Video Tutorial (Coming Soon)

We're working on video tutorials to make setup even easier!

---

**Congratulations! You're now ready to help save animal lives! 🐾**

For more information:
- 📖 [Full Documentation](README.md)
- 🚀 [Deployment Guide](DEPLOYMENT.md)
- 🤝 [Contributing Guide](CONTRIBUTING.md)
- 📝 [License](LICENSE)
