# 🧳 Travia – Full Stack Travel Booking Web Application

A minimalistic platform to book unique homes and spaces from local hosts — or create your own listing and earn by hosting. Simple, seamless, and accessible for every traveler and host.

[🌍 Live Demo](https://travia-408o.onrender.com/listings) | [📋 Contributing Guide](./CONTRIBUTING.md) | [🎯 Contribution Roadmap](./CONTRIBUTION_ROADMAP.md)

[![GitHub issues](https://img.shields.io/github/issues/sanjanamb06/Travia)](https://github.com/sanjanamb06/Travia/issues)
[![GitHub forks](https://img.shields.io/github/forks/sanjanamb06/Travia)](https://github.com/sanjanamb06/Travia/network)
[![GitHub stars](https://img.shields.io/github/stars/sanjanamb06/Travia)](https://github.com/sanjanamb06/Travia/stargazers)

---

## ✨ Features

- 🔐 **User Authentication** (Register / Login / Logout)
- 🏡 **Host Listings** (Add your own properties)
- 🗺️ **Map Integration** (Mapbox for property locations)
- 📝 **Reviews & Ratings** (Guest feedback system)
- 📱 **Responsive Design** (Mobile-friendly interface)
- �️ **Image Upload** (Cloudinary integration)
- 🔒 **Secure Sessions** (Passport.js authentication)

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS Templates, CSS3, JavaScript
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js (Local Strategy)
- **File Upload**: Multer + Cloudinary
- **Maps**: Mapbox GL JS
- **Session Management**: Express-session with MongoDB store
- **Validation**: Joi schema validation

---

## 🚀 Getting Started (Run Locally)

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/sanjanamb06/Travia.git
cd Travia
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file:
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```env
ATLASDB_URL=mongodb://127.0.0.1:27017/wanderlust
SECRET=your_super_secret_key_here
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_access_token
NODE_ENV=development
```

### 4. Initialize Database (Optional)
```bash
node init/index.js
```

### 5. Start the Application
```bash
npm start
# or for development with auto-restart:
npm run dev
```

Open your browser and navigate to [http://localhost:8080](http://localhost:8080).

---

## � Project Structure

```
Travia/
├── controller/          # Route controllers
├── models/             # Database models
├── routes/             # Express routes
├── views/              # EJS templates
├── public/             # Static files (CSS, JS, images)
├── utils/              # Utility functions
├── init/               # Database initialization
├── middleware.js       # Custom middleware
├── schema.js          # Joi validation schemas
├── app.js             # Main application file
└── package.json       # Dependencies and scripts
```

---

## � Contributing

We welcome contributions from the community! This project is perfect for:

- 🔰 **Beginners** - Start with good first issues
- 🎓 **Students** - Great for learning full-stack development
- 🏆 **GSSoC Participants** - Multiple contribution opportunities

### Quick Start for Contributors

1. **Fork** the repository
2. **Read** our [Contributing Guide](./CONTRIBUTING.md)
3. **Check** the [Contribution Roadmap](./CONTRIBUTION_ROADMAP.md) for ideas
4. **Pick** an issue and start coding!

### 🏷️ Good First Issues
- Fix documentation inconsistencies
- Improve error handling
- Add form validation
- Enhance mobile responsiveness
- Create reusable components

### 🚀 Advanced Contributions
- Implement booking system
- Add search & filter functionality
- Create REST API
- Convert to React frontend
- Add payment integration

---

## 📌 Current Status

- 🟡 **MVP Stage** – Core features working
- 🔍 **9 Open Issues** – Ready for contributions
- � **2 Contributors** – Growing community
- 🎯 **GSSoC 2025** – Actively participating

---

## 🧠 Roadmap & Future Plans

### 🎯 Short Term Goals
- [ ] Complete booking system with calendar
- [ ] Advanced search and filtering
- [ ] User dashboard (host/guest)
- [ ] Mobile app development
- [ ] Payment integration

### 🚀 Long Term Vision
- [ ] 🤖 AI-powered travel recommendations
- [ ] � Real-time messaging system
- [ ] 📱 Mobile applications (iOS/Android)
- [ ] 🌐 Multi-language support
- [ ] 📊 Advanced analytics dashboard

---

## 🏆 Contributors

Thanks to all our amazing contributors! 🎉

<a href="https://github.com/sanjanamb06/Travia/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sanjanamb06/Travia" />
</a>

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

## 🙋‍♀️ Author & Maintainer

**Sanjana MB**
- 🐙 [GitHub](https://github.com/sanjanamb06)
- 💼 [LinkedIn](https://linkedin.com/in/sanjanamb06) <!-- Update with actual link -->

---

## 📞 Support & Community

- 🐛 **Found a bug?** [Open an issue](https://github.com/sanjanamb06/Travia/issues)
- 💡 **Have an idea?** [Start a discussion](https://github.com/sanjanamb06/Travia/discussions)
- 🤝 **Want to contribute?** Check our [Contributing Guide](./CONTRIBUTING.md)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

*Built with ❤️ for the travel community*

</div>
