@echo off
REM Animal Rescue App - Windows Startup Script

echo 🐾 Starting Animal Rescue Application...
echo.

REM Check if virtual environment exists
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Initialize database if it doesn't exist
if not exist "instance\animal_rescue.db" (
    echo Initializing database...
    python -c "from app import app, db; app.app_context().push(); db.create_all(); print('✓ Database created successfully!')"
)

REM Run the application
echo.
echo ✓ Starting Flask application...
echo 🌐 Application will be available at: http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

python app.py
