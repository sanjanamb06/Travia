# 🤝 Contributing to Travia

Thank you for your interest in contributing to Travia! This guide will help you get started with contributing to this travel booking platform.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or Atlas)
- Git

### Development Setup

1. **Fork the repository**
   ```bash
   # Click the Fork button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/Travia.git
   cd Travia
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env with your values:
   # - ATLASDB_URL: Your MongoDB connection string
   # - SECRET: Session secret key
   # - CLOUD_NAME: Cloudinary cloud name
   # - API_KEY: Cloudinary API key
   # - API_SECRET: Cloudinary API secret
   # - MAP_TOKEN: Mapbox access token
   ```

4. **Initialize the database**
   ```bash
   node init/index.js
   ```

5. **Start the development server**
   ```bash
   npm start
   # Server will run on http://localhost:8080
   ```

## 🎯 Contribution Areas

### 🐛 Bug Fixes (Great for beginners!)
- Fix the variable naming bug in `middleware.js:36`
- Improve error handling in controllers
- Fix responsive design issues
- Resolve console warnings

### ✨ Feature Development
- Add search and filter functionality
- Implement booking system
- Create user dashboard
- Add messaging between hosts and guests
- Implement favorites/wishlist

### 🎨 UI/UX Improvements
- Convert EJS templates to React components
- Add dark mode
- Improve mobile responsiveness
- Add loading states and animations
- Enhance the overall design

### 🔧 Backend Enhancements
- Create REST API endpoints
- Add comprehensive validation
- Implement rate limiting
- Add caching with Redis
- Improve security

### 🧪 Testing & Quality
- Write unit tests
- Add integration tests
- Set up E2E testing
- Improve code coverage
- Add linting and formatting

## 📝 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments where necessary
   - Test your changes thoroughly

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```
   
   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Provide a clear title and description
   - Reference any related issues

## 🏷️ Issue Labels

- `good first issue` - Perfect for newcomers
- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `documentation` - Documentation needs
- `help wanted` - Extra attention needed
- `priority: high` - High priority issues

## 💡 Coding Guidelines

### JavaScript Style
- Use ES6+ features
- Use meaningful variable names
- Add error handling
- Write modular, reusable code

### Database
- Use proper validation schemas
- Implement proper error handling
- Use transactions for complex operations

### Security
- Validate all inputs
- Use parameterized queries
- Implement proper authentication
- Don't expose sensitive data

## 🤝 Community Guidelines

- Be respectful and inclusive
- Help others learn and grow
- Provide constructive feedback
- Follow the Code of Conduct
- Ask questions if you're unsure

## 🆘 Getting Help

- Check existing issues and discussions
- Join our community discussions
- Ask questions in your PR
- Tag maintainers for help

## 🎉 Recognition

All contributors will be recognized in our README file and release notes!

---

**Happy Contributing! 🚀**