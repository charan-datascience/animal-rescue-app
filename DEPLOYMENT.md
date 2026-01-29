# 🚀 Deployment Guide

This guide covers deploying the Animal Rescue Application to various platforms.

## Table of Contents
- [Heroku Deployment](#heroku-deployment)
- [AWS Deployment](#aws-deployment)
- [DigitalOcean Deployment](#digitalocean-deployment)
- [Docker Deployment](#docker-deployment)
- [Environment Variables](#environment-variables)

## Heroku Deployment

### Prerequisites
- Heroku account
- Heroku CLI installed

### Steps

1. **Create a Procfile**
   ```
   web: gunicorn app:app
   ```

2. **Create runtime.txt**
   ```
   python-3.11.7
   ```

3. **Initialize git repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

4. **Create Heroku app**
   ```bash
   heroku create your-animal-rescue-app
   ```

5. **Add PostgreSQL addon**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

6. **Set environment variables**
   ```bash
   heroku config:set SECRET_KEY="your-secret-key"
   heroku config:set FLASK_ENV="production"
   ```

7. **Deploy**
   ```bash
   git push heroku main
   ```

8. **Initialize database**
   ```bash
   heroku run python
   >>> from app import app, db
   >>> with app.app_context():
   ...     db.create_all()
   ```

## AWS Deployment

### Using AWS Elastic Beanstalk

1. **Install EB CLI**
   ```bash
   pip install awsebcli
   ```

2. **Initialize EB**
   ```bash
   eb init -p python-3.11 animal-rescue-app
   ```

3. **Create environment**
   ```bash
   eb create animal-rescue-env
   ```

4. **Deploy**
   ```bash
   eb deploy
   ```

5. **Open application**
   ```bash
   eb open
   ```

## DigitalOcean Deployment

### Using App Platform

1. **Connect GitHub repository** to DigitalOcean App Platform

2. **Configure build settings**
   - Build Command: `pip install -r requirements.txt`
   - Run Command: `gunicorn --worker-tmp-dir /dev/shm app:app`

3. **Add environment variables**
   - `SECRET_KEY`
   - `DATABASE_URL` (if using managed database)

4. **Deploy** - DigitalOcean will automatically build and deploy

## Docker Deployment

### Create Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN mkdir -p instance static/uploads

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "app:app"]
```

### Create docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "5000:5000"
    environment:
      - SECRET_KEY=${SECRET_KEY}
      - DATABASE_URL=postgresql://user:password@db:5432/animalrescue
    volumes:
      - ./static/uploads:/app/static/uploads
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=animalrescue
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Build and run

```bash
docker-compose up --build
```

## Environment Variables

### Required Variables

```bash
SECRET_KEY=your-very-secret-random-key-here
FLASK_ENV=production
```

### Optional Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/dbname

# Email Configuration
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# File Upload
MAX_CONTENT_LENGTH=16777216  # 16MB in bytes
UPLOAD_FOLDER=static/uploads

# Payment Gateway (for production)
STRIPE_PUBLIC_KEY=your-stripe-public-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

## Database Migration for Production

### Using PostgreSQL

1. **Update app.py database configuration**
   ```python
   import os
   
   app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
       'DATABASE_URL',
       'sqlite:///animal_rescue.db'
   ).replace('postgres://', 'postgresql://')  # Heroku compatibility
   ```

2. **Install psycopg2**
   ```bash
   pip install psycopg2-binary
   ```

3. **Update requirements.txt**
   ```
   psycopg2-binary==2.9.9
   ```

## SSL/HTTPS Configuration

### Using Let's Encrypt with Nginx

1. **Install Certbot**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   ```

2. **Obtain certificate**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

3. **Auto-renewal**
   ```bash
   sudo certbot renew --dry-run
   ```

## Performance Optimization

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static {
        alias /path/to/app/static;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### Gunicorn Configuration

```python
# gunicorn.conf.py
bind = "0.0.0.0:5000"
workers = 4
worker_class = "sync"
worker_connections = 1000
timeout = 30
keepalive = 2
```

Run with:
```bash
gunicorn -c gunicorn.conf.py app:app
```

## Monitoring and Logging

### Using Sentry

```python
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[FlaskIntegration()],
    traces_sample_rate=1.0
)
```

## Backup Strategy

### Database Backups

```bash
# PostgreSQL backup
pg_dump -U user -h host dbname > backup.sql

# Restore
psql -U user -h host dbname < backup.sql
```

### Automated Backups

```bash
# Add to crontab
0 2 * * * /usr/bin/pg_dump -U user dbname > /backups/db_$(date +\%Y\%m\%d).sql
```

## Post-Deployment Checklist

- [ ] Secret key is set and secure
- [ ] Database is properly configured
- [ ] Email notifications are working
- [ ] File uploads are working
- [ ] HTTPS/SSL is configured
- [ ] Monitoring is set up
- [ ] Backups are scheduled
- [ ] Error logging is configured
- [ ] Performance testing completed
- [ ] Security headers are set

## Troubleshooting

### Common Issues

1. **Database connection errors**
   - Check DATABASE_URL format
   - Verify database credentials
   - Ensure database server is running

2. **File upload issues**
   - Check UPLOAD_FOLDER permissions
   - Verify MAX_CONTENT_LENGTH setting
   - Ensure enough disk space

3. **Email not sending**
   - Verify SMTP credentials
   - Check firewall rules
   - Enable "less secure apps" for Gmail (or use App Passwords)

## Support

For deployment issues:
- GitHub Issues: [Create an issue](https://github.com/yourusername/animal-rescue-app/issues)
- Email: support@animalrescue.org
