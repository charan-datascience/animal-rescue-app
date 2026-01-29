# Contributing to Animal Rescue Application

First off, thank you for considering contributing to the Animal Rescue Application! It's people like you who make this project possible and help save animal lives. ❤️

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to:

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**How to submit a bug report:**

1. Use a clear and descriptive title
2. Describe the exact steps to reproduce the problem
3. Provide specific examples
4. Describe the behavior you observed and what you expected
5. Include screenshots if applicable
6. Note your environment (OS, browser, Python version)

**Template:**
```markdown
**Description:**
A clear description of the bug

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior:**
What you expected to happen

**Actual Behavior:**
What actually happened

**Environment:**
- OS: [e.g., Windows 10, macOS 14, Ubuntu 22.04]
- Browser: [e.g., Chrome 120, Firefox 121]
- Python Version: [e.g., 3.11.7]

**Screenshots:**
If applicable, add screenshots
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues.

**How to submit an enhancement suggestion:**

1. Use a clear and descriptive title
2. Provide a detailed description of the proposed feature
3. Explain why this enhancement would be useful
4. Include mockups or examples if applicable

### Code Contributions

#### Good First Issues

Look for issues labeled `good first issue` - these are great for newcomers!

#### Areas Where Help is Needed

- 🌐 Internationalization (i18n)
- 📱 Mobile app development
- 🎨 UI/UX improvements
- 📊 Analytics and reporting
- 🔒 Security enhancements
- 📝 Documentation
- ✅ Testing

## Development Setup

1. **Fork the repository**

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/animal-rescue-app.git
   cd animal-rescue-app
   ```

3. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Initialize the database**
   ```bash
   python
   >>> from app import app, db
   >>> with app.app_context():
   ...     db.create_all()
   >>> exit()
   ```

6. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

7. **Make your changes**

8. **Test your changes**
   ```bash
   python app.py
   # Visit http://localhost:5000
   ```

## Coding Standards

### Python

Follow PEP 8 style guide:

```python
# Good
def calculate_distance(lat1, lon1, lat2, lon2):
    """Calculate distance between two points using Haversine formula."""
    # Implementation
    pass

# Bad
def calc_dist(l1,lo1,l2,lo2):
    # Implementation
    pass
```

**Key points:**
- Use 4 spaces for indentation
- Maximum line length: 88 characters (Black formatter standard)
- Use descriptive variable names
- Add docstrings to functions and classes
- Use type hints where appropriate

### JavaScript

```javascript
// Good
function updateImpactMessage(amount) {
    const message = calculateImpact(amount);
    displayMessage(message);
}

// Bad
function upd(a) {
    let m = calc(a);
    disp(m);
}
```

**Key points:**
- Use camelCase for variables and functions
- Use const/let instead of var
- Add comments for complex logic
- Use meaningful variable names

### HTML/CSS

```html
<!-- Good -->
<div class="action-card">
    <h2 class="card-title">Title</h2>
    <p class="card-description">Description</p>
</div>

<!-- Bad -->
<div class="ac">
    <h2 class="t">Title</h2>
    <p class="d">Description</p>
</div>
```

**Key points:**
- Use semantic HTML
- Use BEM naming convention for CSS classes
- Keep CSS organized and commented
- Ensure responsive design

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(report): add photo compression before upload

Implemented client-side image compression to reduce upload size
and improve performance on slow connections.

Closes #123
```

```
fix(donate): correct amount validation logic

Fixed bug where donations less than $1 were accepted.
Added proper validation and error messages.

Fixes #456
```

## Pull Request Process

1. **Update documentation**
   - Update README.md if needed
   - Add/update docstrings
   - Update DEPLOYMENT.md for infrastructure changes

2. **Test your changes**
   - Manually test all affected features
   - Ensure no console errors
   - Test on different screen sizes
   - Test on different browsers

3. **Create the Pull Request**
   - Use a clear and descriptive title
   - Reference related issues
   - Describe what changes you made and why
   - Include screenshots for UI changes
   - List any breaking changes

**PR Template:**

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Closes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots (if applicable)
[Add screenshots here]

## Testing
Describe the tests you ran

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have tested my changes
```

4. **Code Review**
   - Be responsive to feedback
   - Make requested changes promptly
   - Be respectful and professional

5. **Merge**
   - Maintainers will merge once approved
   - Delete your branch after merge

## Development Tips

### Running in Development Mode

```python
# In app.py, change:
app.run(debug=True, host='0.0.0.0', port=5000)
```

This enables:
- Auto-reload on code changes
- Detailed error pages
- Debug toolbar

### Database Migrations

When changing models:

```python
# Drop and recreate (development only!)
from app import app, db
with app.app_context():
    db.drop_all()
    db.create_all()
```

### Testing Email Locally

Use MailHog for local email testing:

```bash
# Install MailHog
# macOS: brew install mailhog
# Others: Download from GitHub

# Run MailHog
mailhog

# Update SMTP settings in app.py
smtp_server = "localhost"
smtp_port = 1025
```

### Debugging JavaScript

```javascript
// Add debug logs
console.log('Current location:', currentLocation);

// Use debugger
debugger;

// Check network requests in DevTools
```

## Questions?

Feel free to:
- Open an issue with the `question` label
- Email: dev@animalrescue.org
- Join our community chat (coming soon)

## Recognition

Contributors will be:
- Listed in the README
- Acknowledged in release notes
- Invited to the contributors team

Thank you for contributing to saving animal lives! 🐾
