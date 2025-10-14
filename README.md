# 🧳 Travia – Full Stack Travel Booking Web Application

A minimalistic platform to book unique homes and spaces from local hosts — or create your own listing and earn by hosting. Simple, seamless, and accessible for every traveler and host.

[🌍 Live Demo](https://travia-408o.onrender.com/listings)

---

## ✨ Features

- 🔐 **User Authentication** - Complete register/login/logout system with Passport.js
- 🏡 **Property Listings** - Add, edit, and manage your own property listings
- 🗺️ **Interactive Maps** - Mapbox integration for location visualization
- 📝 **Reviews & Ratings** - Comprehensive review system for properties
- 📱 **Responsive Design** - Mobile-first responsive UI
- 🖼️ **Image Upload** - Cloudinary integration for property images
- 🔒 **Session Management** - Secure session handling with MongoDB store
- ⚡ **Flash Messages** - User feedback with connect-flash
- 🛡️ **Input Validation** - Server-side validation with Joi

---

## 🛠️ Tech Stack

**Frontend:**
- EJS (Embedded JavaScript Templates)
- CSS3 & Bootstrap (Responsive Design)
- JavaScript (Client-side interactions)

**Backend:**
- Node.js (Runtime Environment)
- Express.js (Web Framework)
- Passport.js (Authentication)
- Mongoose (MongoDB Object Modeling)

**Database:**
- MongoDB Atlas (Cloud Database)

**Third-Party Services:**
- Mapbox (Maps & Geocoding)
- Cloudinary (Image Storage & Processing)

**Development Tools:**
- Nodemon (Development Server)
- Method Override (HTTP Verbs)
- Connect Flash (Flash Messages)

---

## 🚀 Getting Started (Run Locally)

### Prerequisites
- **Node.js** (v20.18.0 or higher)
- **npm** (Node Package Manager)
- **MongoDB Atlas** account (for database)

### 1. Clone the Repository
```bash
git clone https://github.com/itsdevansh5/Travia.git
cd Travia
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
PORT=3000
ATLASDB_URL=your_mongodb_atlas_connection_string
SESSION_SECRET=your_session_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_access_token
```

### 4. Run the Application

**For Development:**
```bash
npm run dev
```

**For Production:**
```bash
npm start
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

### 5. Default Route
The app automatically redirects from `/` to `/listings` where you can view all property listings.

---

## � Project Structure

```
Travia/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── cloudConfig.js         # Cloudinary configuration
├── schema.js             # Joi validation schemas
├── middleware.js         # Custom middleware functions
├── controller/           # Route controllers
│   ├── listing.js        # Listing controller
│   ├── review.js         # Review controller
│   └── user.js           # User controller
├── models/               # Database models
│   ├── listing.js        # Listing model
│   ├── review.js         # Review model
│   └── user.js           # User model
├── routes/               # Express routes
│   ├── listing.js        # Listing routes
│   ├── review.js         # Review routes
│   └── user.js           # User routes
├── views/                # EJS templates
│   ├── layouts/          # Layout templates
│   ├── listings/         # Listing templates
│   ├── users/            # User templates
│   └── includes/         # Partial templates
├── public/               # Static files
│   ├── css/              # Stylesheets
│   └── js/               # Client-side JavaScript
└── utils/                # Utility functions
    ├── ExpressError.js   # Custom error class
    └── wrapAsync.js      # Async error handler
```

---

## � API Endpoints

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Show create listing form
- `POST /listings` - Create new listing
- `GET /listings/:id` - View specific listing
- `GET /listings/:id/edit` - Show edit listing form
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Reviews
- `POST /listings/:id/reviews` - Add review to listing
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

### Users
- `GET /signup` - Show signup form
- `POST /signup` - Register new user
- `GET /login` - Show login form
- `POST /login` - Login user
- `GET /logout` - Logout user

---

## 📌 Status

- ✅ **Production Ready** – All core features implemented and working
- 🚀 **Deployed** – Live on Render platform
- 🔒 **Secure** – Authentication and authorization implemented

---

## 🧠 Future Enhancements

- 🤖 AI-powered travel recommendations
- 💬 Real-time messaging between hosts and guests
- 📆 Advanced booking calendar system
- 🔍 Enhanced search and filtering options
- 💳 Payment gateway integration
- 📊 Analytics dashboard for hosts
- 🌐 Multi-language support

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 🙋‍♂️ Author

- **Devansh**
- [GitHub](https://github.com/itsdevansh5)
- Repository: [Travia](https://github.com/itsdevansh5/Travia)

---

## 🙏 Acknowledgments

- **Express.js** community for the excellent web framework
- **Mapbox** for mapping services
- **Cloudinary** for image management
- **MongoDB Atlas** for database hosting
- **Render** for deployment platform

---

*Feel free to ⭐ star this repository if you found it helpful!*
