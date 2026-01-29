#!/bin/bash

# Animal Rescue App - Startup Script

echo "🐾 Starting Animal Rescue Application..."
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Initialize database if it doesn't exist
if [ ! -f "instance/animal_rescue.db" ]; then
    echo "Initializing database..."
    python3 << EOF
from app import app, db
with app.app_context():
    db.create_all()
    print("✓ Database created successfully!")
EOF
fi

# Run the application
echo ""
echo "✓ Starting Flask application..."
echo "🌐 Application will be available at: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 app.py
