# Wonderlust - Interactive Vacation Rental Platform

A full-featured vacation rental platform built with the MERN stack that allows users to browse, create, and review property listings.

## 🌟 Key Features

- 🔐 **User Authentication**: Secure registration and login system
- 🏠 **Listing Management**: Create, browse, edit, and delete property listings
- 🔍 **Search & Filter**: Find listings by location, title, or category
- ⭐ **Review System**: Rate and review properties with star ratings
- 📱 **Responsive Design**: Mobile-friendly interface that works on all devices
- ☁️ **Image Upload**: Cloudinary integration for property photos
- 🏷️ **Category Filtering**: Browse properties by categories like "Trending", "Mountains", "Beach", etc.

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js v5.1.0
- **Database**: MongoDB with Mongoose ODM v8.18.0
- **Frontend**: EJS templating, Bootstrap 5.3.8
- **Authentication**: Passport.js with passport-local-mongoose
- **Image Storage**: Cloudinary integration
- **Session Management**: express-session with connect-mongo
- **Validation**: Joi validation library
- **Styling**: Custom CSS with responsive design

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or higher)
- MongoDB database (local or Atlas)
- Cloudinary account for image storage

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   ATLAS_URI=your_mongodb_connection_string
   SECRET_KEY=your_session_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Visit the application**
   Open your browser and go to `http://localhost:3000`

## 📁 Project Structure

```
project1/
├── controller/           # Business logic for routes
│   ├── listingcontrol.js # Listing operations
│   └── usercontrol.js    # User operations
├── model/                # MongoDB schemas
│   ├── listing.js        # Property listings
│   ├── review.js         # User reviews
│   └── user.js           # User accounts
├── routes/               # HTTP route definitions
│   ├── listing_route.js  # Listing routes
│   └── user_routes.js    # User routes
├── views/                # EJS templates
│   ├── includes/         # Header/footer components
│   ├── layouts/          # Page layouts
│   ├── user/             # Auth pages
│   └── *.ejs             # Page templates
├── public/               # Static assets
│   ├── css/              # Stylesheets
│   └── javascript/       # Client-side scripts
├── utils/                # Utility functions
├── init/                 # Sample data
└── index.js              # Main application entry point
```

## 🎯 Key Components

### Models
- **User**: Email, username, and hashed password
- **Listing**: Property details including title, description, price, location, and images
- **Review**: User ratings and comments with star-based system

### Routes
- **Listing Routes**: Browse, search, create, edit, and delete listings
- **User Routes**: Registration, login, and logout functionality
- **Review Routes**: Add and remove property reviews

### Views
- **Homepage**: Grid view of all listings with category filters
- **Listing Details**: Individual property page with reviews
- **Forms**: Create/edit listing forms and authentication pages

## 🖱️ User Workflow

1. **Register/Login** 🔐
   - Create an account or log in to access all features
   - Secure authentication with session management

2. **Browse Listings** 🏠
   - View all properties on the homepage
   - Use category filters to find specific types of properties
   - "Trending" algorithm shows popular listings

3. **Search Properties** 🔍
   - Use the search bar to find properties by location or title
   - Real-time search results

4. **Create Listing** ➕
   - Click "Airbnb Your Home" to add a new property
   - Upload images via Cloudinary integration
   - Set price, location, and category

5. **Review Properties** ⭐
   - Logged-in users can rate and review listings
   - 1-5 star rating system
   - Written comments for detailed feedback

6. **Manage Listings** 🛠️
   - Owners can edit or delete their own properties
   - Update property details and images

## 🧪 Development

- **Testing**: Uses Mocha and Chai for testing with Supertest for API testing
- **Development Server**: Nodemon for auto-restarting during development
- **Code Structure**: MVC-like architecture with separation of concerns
- **Test Script**: `npm test` runs `mocha --exit --recursive test/**/*.test.js`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## 📄 License

ISC License

## 👨‍💻 Author

Built with Node.js, Express, MongoDB, and EJS.

---

### 🆘 Need Help?

- **Issues**: Check the issues tab for known problems
- **Documentation**: Refer to the code comments for detailed explanations
- **Support**: Contact the development team for assistance

### 🔄 Updates

To update the application:
```bash
git pull origin main
npm install
```

### 🧹 Maintenance

To clear the database and start fresh:
1. Delete the MongoDB collection
2. Restart the server
3. The application will reinitialize with sample data