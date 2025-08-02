# 🧳 Travia – Full Stack Travel Booking Web Application

A minimalistic platform to book unique homes and spaces from local hosts — or create your own listing and earn by hosting. Simple, seamless, and accessible for every traveler and host.

[🌍 Live Demo](https://travia-408o.onrender.com/listings)

---

## ✨ Features

- 🔐 User Authentication (Register / Login / Logout)
- 🏡 Add Your Own Listings (as a host)
- 🗺️ Map Integration for Each Property
- 📝 Reviews & Ratings by Travelers
- 📱 Responsive UI for all devices

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Other Tools**: Mapbox, JWT Auth, Cloudinary (if used for images)

---

## 🚀 Getting Started (Run Locally)

> Make sure you have **Node.js**, **npm**, and **MongoDB** installed.

### 1. Clone the Repository
git clone https://github.com/sanjanamb06/travia.git
cd travia

### 1. Install Frontend and Backend Dependencies

cd client
npm install

cd ../server
npm install

### 2. Set Up Environment Variables

Create a `.env` file inside the `/server` folder with the following content:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_URL=your_cloudinary_url # (if applicable)

### 3. Run the Application

**In `/server`:**
npm start

**In another terminal, go to `/client`:**
npm start

Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

---

## 📌 Status

- 🟡 **MVP Stage** – Core features working

---

## 🧠 Future Plans

- 🤖 AI-powered Travel Recommendation System  
- 💬 In-app messaging between hosts and travelers  
- 📆 Booking calendar with availability tracking  
- 📍 Smart filtering using user preferences  

---

## 🙋‍♀️ Author

- **Sanjana MB**
- [GitHub](https://github.com/your-github-username) <!-- Replace with your GitHub profile link -->

---

*Feel free to contribute or raise issues!*
