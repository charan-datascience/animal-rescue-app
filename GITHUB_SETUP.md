# 📦 GitHub Repository Setup Guide

This guide will help you create a GitHub repository for your Animal Rescue Application.

## Step 1: Create GitHub Account

If you don't have a GitHub account:
1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Follow the registration process
4. Verify your email address

## Step 2: Install Git

### Windows
Download from [git-scm.com](https://git-scm.com/download/win)

### macOS
```bash
# Using Homebrew
brew install git

# Or download from git-scm.com
```

### Linux
```bash
# Ubuntu/Debian
sudo apt-get install git

# Fedora
sudo dnf install git
```

### Verify Installation
```bash
git --version
```

## Step 3: Configure Git

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

## Step 4: Create GitHub Repository

### Option A: Via GitHub Website

1. **Go to GitHub**
   - Navigate to [github.com](https://github.com)
   - Log in to your account

2. **Create New Repository**
   - Click the "+" icon in top right
   - Select "New repository"

3. **Repository Settings**
   - **Repository name:** `animal-rescue-app`
   - **Description:** `A compassionate web application for reporting and rescuing street animals in distress`
   - **Visibility:** Choose Public or Private
   - **DO NOT** initialize with README (we already have one)
   - Click "Create repository"

### Option B: Via GitHub CLI (gh)

```bash
# Install GitHub CLI first
# macOS: brew install gh
# Windows: Download from cli.github.com

# Authenticate
gh auth login

# Create repository
gh repo create animal-rescue-app --public --description "A compassionate web application for reporting and rescuing street animals in distress"
```

## Step 5: Initialize Local Repository

Navigate to your project directory:

```bash
cd animal-rescue-app
```

Initialize git repository:

```bash
# Initialize git
git init

# Check status
git status
```

## Step 6: Add Files to Git

```bash
# Add all files
git add .

# Check what will be committed
git status

# You should see all your files listed in green
```

## Step 7: Create First Commit

```bash
git commit -m "Initial commit: Complete animal rescue application

- Flask backend with SQLAlchemy
- 5 main pages: Home, Report, Status, Register, Donate
- Camera integration with geolocation
- Email notification system
- Responsive design with beautiful UI
- Complete documentation
- Ready for deployment"
```

## Step 8: Connect to GitHub

Copy the commands from your GitHub repository page, or use:

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/animal-rescue-app.git

# Verify remote
git remote -v
```

## Step 9: Push to GitHub

```bash
# Push to main branch
git push -u origin main

# If you get an error about 'main' not existing, try:
git branch -M main
git push -u origin main
```

## Step 10: Verify Upload

1. Go to your repository on GitHub
2. You should see all your files
3. The README.md will be displayed automatically

## Additional Setup

### Add Topics/Tags

On your GitHub repository:
1. Click "Add topics"
2. Add relevant topics:
   - `animal-rescue`
   - `flask`
   - `python`
   - `animal-welfare`
   - `ngo`
   - `geolocation`
   - `web-application`
   - `animal-care`

### Add Repository Details

1. **Website:** Add your deployed URL (once deployed)
2. **Topics:** Add relevant tags as above
3. **About:** Update the description

### Enable GitHub Pages (Optional)

If you want to host documentation:
1. Go to Settings → Pages
2. Select source branch
3. Select folder (usually /docs or /root)
4. Save

### Set Up GitHub Actions (Optional)

Create `.github/workflows/tests.yml` for automated testing:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: '3.11'
    
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
    
    - name: Run tests
      run: |
        python -m pytest
```

### Protect Main Branch

1. Go to Settings → Branches
2. Add rule for `main`
3. Enable:
   - Require pull request reviews
   - Require status checks
   - Include administrators

## Making Updates

### After Making Changes

```bash
# Check what changed
git status

# Add changed files
git add .

# Or add specific files
git add file1.py file2.html

# Commit with meaningful message
git commit -m "feat: add email notification feature"

# Push to GitHub
git push
```

### Commit Message Best Practices

Use conventional commits format:

```bash
# New feature
git commit -m "feat(report): add photo compression"

# Bug fix
git commit -m "fix(donate): correct amount validation"

# Documentation
git commit -m "docs: update deployment guide"

# Styling
git commit -m "style: improve mobile responsiveness"

# Refactoring
git commit -m "refactor(database): optimize queries"
```

## Creating Branches

For new features:

```bash
# Create and switch to new branch
git checkout -b feature/sms-notifications

# Make changes...

# Commit changes
git add .
git commit -m "feat: add SMS notification system"

# Push branch to GitHub
git push -u origin feature/sms-notifications

# Create pull request on GitHub
```

## Common Git Commands

```bash
# View commit history
git log

# View changes
git diff

# Undo changes (before commit)
git checkout -- filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Pull latest changes
git pull origin main

# Create tag/release
git tag -a v1.0.0 -m "First stable release"
git push origin v1.0.0
```

## Troubleshooting

### Authentication Issues

If you get authentication errors:

```bash
# Use personal access token instead of password
# GitHub Settings → Developer settings → Personal access tokens
# Generate new token with 'repo' scope
# Use token as password when prompted
```

### Large Files

If you have large files:

```bash
# Install Git LFS
git lfs install

# Track large files
git lfs track "*.jpg"
git lfs track "*.png"

# Add .gitattributes
git add .gitattributes
git commit -m "chore: add Git LFS tracking"
```

### Merge Conflicts

If you encounter merge conflicts:

```bash
# Pull latest changes
git pull origin main

# Resolve conflicts in files (look for <<< === >>>)
# Edit files to resolve

# Add resolved files
git add .

# Commit merge
git commit -m "merge: resolve conflicts with main"

# Push
git push
```

## Creating a Release

1. **Tag the Release**
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin v1.0.0
   ```

2. **Create Release on GitHub**
   - Go to Releases
   - Click "Create a new release"
   - Select your tag
   - Write release notes
   - Attach any binaries (optional)
   - Publish

## Next Steps

After setting up GitHub:

1. ✅ Set up continuous integration (GitHub Actions)
2. ✅ Add badges to README (build status, coverage)
3. ✅ Enable issue templates
4. ✅ Create pull request template
5. ✅ Set up project board for task management
6. ✅ Configure webhooks (if needed)
7. ✅ Deploy to production

## Resources

- [GitHub Docs](https://docs.github.com)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [Conventional Commits](https://www.conventionalcommits.org)

## Getting Help

- [GitHub Community](https://github.community)
- [Stack Overflow - Git](https://stackoverflow.com/questions/tagged/git)
- [Git Official Support](https://git-scm.com/community)

---

**Your repository is now live on GitHub! 🎉**

Share it with:
- Animal welfare organizations
- Fellow developers
- Potential contributors
- NGOs looking for solutions

Remember to:
- Keep your repository updated
- Respond to issues and pull requests
- Welcome contributors
- Celebrate milestones

Together, we can save more animal lives! 🐾
