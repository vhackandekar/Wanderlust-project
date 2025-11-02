Project Overview
Wonderlust is a web application built with the MERN stack (MongoDB, Express.js, Node.js) that functions as a vacation rental platform similar to Airbnb. Users can browse, create, and review listings for various properties.
Technology Stack
Backend: Node.js with Express.js framework (v5.1.0)
Database: MongoDB with Mongoose ODM (v8.18.0)
Frontend: EJS templating engine with ejs-mate for layouts
Authentication: Passport.js with passport-local and passport-local-mongoose
Styling: Bootstrap 5.3.8, Font Awesome icons, custom CSS
Image Handling: Cloudinary integration via multer-storage-cloudinary
Session Management: express-session with connect-mongo for MongoDB session storage
Form Validation: Joi validation library
Environment Variables: dotenv package
Error Handling: Custom error handling middleware
Flash Messages: connect-flash for user notifications
Project Structure
project1/
├── controller/           # Business logic for routes
├── model/                # MongoDB schemas and models
├── routes/               # HTTP route definitions
├── views/                # EJS templates and layouts
├── public/               # Static assets (CSS, JS, images)
├── utils/                # Utility functions
├── init/                 # Initialization scripts and sample data
├── middleware/           # Custom middleware functions
└── index.js              # Main application entry point
Core Features
1. User Authentication System
Registration: Users can create accounts with email and password
Login/Logout: Secure authentication with session management
Passport Integration: Uses passport-local-mongoose for user authentication
2. Listing Management
Browse Listings: View all available properties with filtering by category
Search Functionality: Search listings by title, location, or country
Create Listings: Authenticated users can add new property listings
Edit/Delete: Owners can modify or remove their own listings
Categories: Properties organized by categories (Rooms, Mountains, Pools, etc.)
3. Review System
Add Reviews: Logged-in users can rate and comment on listings
Star Ratings: 1-5 star rating system
Review Management: Users can delete their own reviews
4. Responsive Design
Mobile-first approach with Bootstrap grid system
Responsive navigation with collapsible menu
Touch-friendly interface elements
Data Models
1. User Model
Email (unique, required)
Username
Password (hashed with passport-local-mongoose)
2. Listing Model
Title (required)
Description (required)
Image (URL and filename)
Price (required)
Location (required)
Country (required)
Category (enum with predefined options)
Reviews (array of references)
Owner (reference to User)
3. Review Model
Comment (required)
Rating (1-5, required)
CreatedAt (timestamp)
Author (reference to User)
Key Routes
Listing Routes
GET /listing - Display all listings
GET /listing/new - Show create listing form (authenticated)
POST /listing/new - Create new listing (authenticated)
GET /listing/search - Search listings
GET /listing/filter - Filter listings by category (AJAX)
GET /listing/:id - Show individual listing details
GET /listing/:id/edit - Show edit form (owner only)
PUT /listing/:id/edit - Update listing (owner only)
DELETE /listing/:id/delete - Delete listing (owner only)
POST /listing/:id/review - Add review (authenticated)
DELETE /listing/:id/review/:reviewId - Delete review (author only)
User Routes
GET /register - Show registration form
POST /register - Register new user
GET /login - Show login form
POST /login - Authenticate user
GET /logout - Log out user
Frontend Components
Layout System
Main Layout: Boilerplate template with header, footer, and flash messages
Header: Navigation bar with search functionality
Footer: Company information and links
Views
Show Listings: Grid view of all properties with category filters
Individual Listing: Detailed view with description, reviews, and actions
Create/Edit Forms: Forms for adding/modifying listings
Authentication Pages: Login and registration forms
Key Functionality
1. Category Filtering
Horizontal scrollable filter bar with categories
AJAX-based filtering without page reload
"Trending" algorithm based on ratings and recency
2. Image Management
Cloudinary integration for image storage
Automatic image upload during listing creation
Image display on listing cards and detail pages
3. Responsive Design
Mobile-first CSS with media queries
Flexible grid system for different screen sizes
Touch-friendly navigation and form elements
4. Session Management
Persistent user sessions with MongoDB storage
Flash messages for user feedback
Protected routes for authenticated actions
Security Features
Password hashing with passport-local-mongoose
Session-based authentication
Authorization middleware for protected routes
Input validation with Joi
Method override for RESTful operations
Environment Configuration
The application uses environment variables for:
MongoDB connection string (ATLAS_URI)
Cloudinary credentials
Session secret key
Port configuration
Error Handling
Custom error handling middleware
Flash messages for user feedback
Graceful error recovery
