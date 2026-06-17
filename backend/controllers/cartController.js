const Cart = require('../models/Cart');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
exports.getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.id }).populate('products.productId');
        if (!cart) {
            cart = await Cart.create({ userId: req.user.id, products: [] });
        }
        res.status(200).json({ success: true, data: cart });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
exports.addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = await Cart.create({
                userId: req.user.id,
                products: [{ productId, quantity }]
            });
        } else {
            const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);
            if (itemIndex > -1) {
                let productItem = cart.products[itemIndex];
                productItem.quantity += quantity;
                cart.products[itemIndex] = productItem;
            } else {
                cart.products.push({ productId, quantity });
            }
            await cart.save();
        }

        cart = await cart.populate('products.productId');
        res.status(200).json({ success: true, data: cart });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
exports.updateCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (itemIndex > -1) {
            let productItem = cart.products[itemIndex];
            productItem.quantity = quantity;
            cart.products[itemIndex] = productItem;
            await cart.save();
            await cart.populate('products.productId');
            res.status(200).json({ success: true, data: cart });
        } else {
            res.status(404).json({ success: false, message: 'Item not found in cart' });
        }
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:id
// @access  Private
exports.removeFromCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.products = cart.products.filter(p => p.productId.toString() !== req.params.id);
        await cart.save();
        await cart.populate('products.productId');
        res.status(200).json({ success: true, data: cart });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
