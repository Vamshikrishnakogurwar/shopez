# ShopEZ E-Commerce MERN Application

A complete production-ready MERN stack e-commerce application.

## Features
- User Authentication (JWT)
- Role-based Access (Admin / User)
- Browse and Search Products
- Category Filtering
- Shopping Cart
- Order Placement & History
- Admin Dashboard with Chart.js Analytics
- Responsive UI using Bootstrap 5

## Tech Stack
**Frontend:** React, Vite, React Router DOM, Axios, Bootstrap 5, Chart.js, Context API
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs

## Folder Structure
```
shopEZ/
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components (Navbar, Footer, Protected routes)
│   │   ├── pages/       # Page components (Home, Login, AdminDashboard, etc.)
│   │   ├── context/     # Context API state management
│   │   ├── services/    # Axios API configuration
│   │   ├── App.jsx      # Main application router
│   │   ├── main.jsx     # Entry point
│   │   └── index.css    # Custom styles
│   └── package.json
│
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route logic
│   ├── middleware/      # Auth and Admin middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routers
│   ├── .env             # Environment variables
│   ├── server.js        # Entry point
│   └── seed.js          # Database seed script
```

## Installation Guide

### Prerequisites
- Node.js (v14 or higher)
- MongoDB account (Atlas or local)

### Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your connection details:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_string
   JWT_SECRET=supersecretkey
   ```
4. Seed the database with sample products:
   ```bash
   node seed.js
   ```
5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Default Admin Access
After registering a user, you can update their role to `'ADMIN'` directly in your MongoDB database to access the Admin Dashboard features.

## API Testing Guide
For testing the API, you can use Postman.
- **Base URL:** `http://localhost:5000/api`
- **Auth:** Send `POST` to `/api/auth/login` to get a JWT token.
- **Protected Routes:** Add `Authorization: Bearer <your_token>` to the Headers.

Sample endpoints:
- `GET /api/products` - Fetch all products
- `POST /api/orders` - Place a new order (requires Auth)
- `GET /api/cart` - View user cart (requires Auth)
