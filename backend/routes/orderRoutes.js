const express = require('express');
const { createOrder, getMyOrders, getOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/')
    .post(createOrder)
    .get(authorize('ADMIN'), getOrders);

router.get('/myorders', getMyOrders);

router.route('/:id')
    .put(authorize('ADMIN'), updateOrder)
    .delete(authorize('ADMIN'), deleteOrder);

module.exports = router;
