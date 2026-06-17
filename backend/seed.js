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
    { name: 'Wireless Headphones', description: 'High quality noise canceling headphones', category: 'Electronics', brand: 'Sony', price: 199.99, stock: 50, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop' },
    { name: 'Gaming Mouse', description: 'RGB gaming mouse with high precision', category: 'Electronics', brand: 'Logitech', price: 49.99, stock: 100, image: 'https://images.unsplash.com/photo-1527814050087-379381547969?w=400&h=400&fit=crop' },
    { name: 'Cotton T-Shirt', description: 'Comfortable everyday wear', category: 'Fashion', brand: 'Levi', price: 19.99, stock: 200, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop' },
    { name: 'Running Shoes', description: 'Lightweight running shoes', category: 'Fashion', brand: 'Nike', price: 89.99, stock: 150, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop' },
    { name: 'Smart Watch', description: 'Feature rich smartwatch with fitness tracking', category: 'Electronics', brand: 'Apple', price: 299.99, stock: 30, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop' },
    { name: 'Coffee Maker', description: 'Programmable coffee maker', category: 'Home', brand: 'Keurig', price: 79.99, stock: 40, image: 'https://images.unsplash.com/photo-1495474472201-44754eb5e7d1?w=400&h=400&fit=crop' },
    { name: 'Desk Lamp', description: 'LED desk lamp with adjustable brightness', category: 'Home', brand: 'Philips', price: 29.99, stock: 60, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop' },
    { name: 'Yoga Mat', description: 'Non-slip yoga mat', category: 'Sports', brand: 'Lululemon', price: 59.99, stock: 80, image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400&h=400&fit=crop' },
    { name: 'Dumbbell Set', description: 'Adjustable dumbbell set', category: 'Sports', brand: 'Bowflex', price: 199.99, stock: 20, image: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?w=400&h=400&fit=crop' },
    { name: 'Fiction Book', description: 'Bestselling fiction novel', category: 'Books', brand: 'Penguin', price: 14.99, stock: 300, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop' },
    { name: 'Cookbook', description: 'Healthy recipes cookbook', category: 'Books', brand: 'HarperCollins', price: 24.99, stock: 120, image: 'https://images.unsplash.com/photo-1589998059171-989d887dda6e?w=400&h=400&fit=crop' },
    { name: 'Bluetooth Speaker', description: 'Portable waterproof speaker', category: 'Electronics', brand: 'JBL', price: 89.99, stock: 75, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop' },
    { name: 'Jeans', description: 'Classic blue denim jeans', category: 'Fashion', brand: 'Wrangler', price: 39.99, stock: 110, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop' },
    { name: 'Blender', description: 'High-speed blender for smoothies', category: 'Home', brand: 'Ninja', price: 99.99, stock: 50, image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=400&fit=crop' },
    { name: 'Tennis Racket', description: 'Professional tennis racket', category: 'Sports', brand: 'Wilson', price: 129.99, stock: 25, image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a631d6?w=400&h=400&fit=crop' },
    { name: 'Sci-Fi Book', description: 'Award-winning science fiction', category: 'Books', brand: 'Tor', price: 16.99, stock: 90, image: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=400&h=400&fit=crop' },
    { name: 'Laptop', description: 'Powerful laptop for work and play', category: 'Electronics', brand: 'Dell', price: 999.99, stock: 15, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop' },
    { name: 'Jacket', description: 'Warm winter jacket', category: 'Fashion', brand: 'North Face', price: 149.99, stock: 45, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop' },
    { name: 'Vacuum Cleaner', description: 'Cordless stick vacuum', category: 'Home', brand: 'Dyson', price: 299.99, stock: 35, image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop' },
    { name: 'Soccer Ball', description: 'Official size soccer ball', category: 'Sports', brand: 'Adidas', price: 29.99, stock: 150, image: 'https://images.unsplash.com/photo-1614632537190-23e4146777db?w=400&h=400&fit=crop' }
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
