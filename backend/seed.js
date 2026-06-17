const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load models
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');
const Cart = require('./models/Cart');

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const products = [
    { name: 'Wireless Headphones', description: 'High quality noise canceling headphones', category: 'Electronics', brand: 'Sony', price: 199.99, stock: 50 },
    { name: 'Gaming Mouse', description: 'RGB gaming mouse with high precision', category: 'Electronics', brand: 'Logitech', price: 49.99, stock: 100 },
    { name: 'Cotton T-Shirt', description: 'Comfortable everyday wear', category: 'Fashion', brand: 'Levi', price: 19.99, stock: 200 },
    { name: 'Running Shoes', description: 'Lightweight running shoes', category: 'Fashion', brand: 'Nike', price: 89.99, stock: 150 },
    { name: 'Smart Watch', description: 'Feature rich smartwatch with fitness tracking', category: 'Electronics', brand: 'Apple', price: 299.99, stock: 30 },
    { name: 'Coffee Maker', description: 'Programmable coffee maker', category: 'Home', brand: 'Keurig', price: 79.99, stock: 40 },
    { name: 'Desk Lamp', description: 'LED desk lamp with adjustable brightness', category: 'Home', brand: 'Philips', price: 29.99, stock: 60 },
    { name: 'Yoga Mat', description: 'Non-slip yoga mat', category: 'Sports', brand: 'Lululemon', price: 59.99, stock: 80 },
    { name: 'Dumbbell Set', description: 'Adjustable dumbbell set', category: 'Sports', brand: 'Bowflex', price: 199.99, stock: 20 },
    { name: 'Fiction Book', description: 'Bestselling fiction novel', category: 'Books', brand: 'Penguin', price: 14.99, stock: 300 },
    { name: 'Cookbook', description: 'Healthy recipes cookbook', category: 'Books', brand: 'HarperCollins', price: 24.99, stock: 120 },
    { name: 'Bluetooth Speaker', description: 'Portable waterproof speaker', category: 'Electronics', brand: 'JBL', price: 89.99, stock: 75 },
    { name: 'Jeans', description: 'Classic blue denim jeans', category: 'Fashion', brand: 'Wrangler', price: 39.99, stock: 110 },
    { name: 'Blender', description: 'High-speed blender for smoothies', category: 'Home', brand: 'Ninja', price: 99.99, stock: 50 },
    { name: 'Tennis Racket', description: 'Professional tennis racket', category: 'Sports', brand: 'Wilson', price: 129.99, stock: 25 },
    { name: 'Sci-Fi Book', description: 'Award-winning science fiction', category: 'Books', brand: 'Tor', price: 16.99, stock: 90 },
    { name: 'Laptop', description: 'Powerful laptop for work and play', category: 'Electronics', brand: 'Dell', price: 999.99, stock: 15 },
    { name: 'Jacket', description: 'Warm winter jacket', category: 'Fashion', brand: 'North Face', price: 149.99, stock: 45 },
    { name: 'Vacuum Cleaner', description: 'Cordless stick vacuum', category: 'Home', brand: 'Dyson', price: 299.99, stock: 35 },
    { name: 'Soccer Ball', description: 'Official size soccer ball', category: 'Sports', brand: 'Adidas', price: 29.99, stock: 150 }
];

// Import data
const importData = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

// Destroy data
const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();
        await Cart.deleteMany();
        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
