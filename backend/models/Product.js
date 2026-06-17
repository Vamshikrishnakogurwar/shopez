const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    category: {
        type: String,
        required: [true, 'Please select a category']
    },
    brand: {
        type: String,
        required: [true, 'Please add a brand']
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    stock: {
        type: Number,
        required: [true, 'Please add stock quantity']
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', ProductSchema);
