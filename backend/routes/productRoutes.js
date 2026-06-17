const express = require('express');
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductsByCategory
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/search', searchProducts);
router.get('/category/:category', getProductsByCategory);

router.route('/')
    .get(getProducts)
    .post(protect, authorize('ADMIN'), createProduct);

router.route('/:id')
    .get(getProduct)
    .put(protect, authorize('ADMIN'), updateProduct)
    .delete(protect, authorize('ADMIN'), deleteProduct);

module.exports = router;
