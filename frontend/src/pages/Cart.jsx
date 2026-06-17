import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cart, updateCart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    if (!cart || !cart.products || cart.products.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2>Your Cart is Empty</h2>
                <Link to="/products" className="btn btn-primary mt-3">Continue Shopping</Link>
            </div>
        );
    }

    const total = cart.products.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);

    return (
        <div className="container mt-5 mb-5">
            <h2 className="fw-bold mb-4">Shopping Cart</h2>
            <div className="row">
                <div className="col-md-8">
                    {cart.products.map(item => (
                        <div className="card mb-3 p-3" key={item.productId._id}>
                            <div className="row align-items-center">
                                <div className="col-md-3">
                                    <img src={item.productId.image} alt={item.productId.name} className="img-fluid rounded" style={{height: '80px', width: '100%', objectFit: 'cover'}} />
                                </div>
                                <div className="col-md-4">
                                    <h5 className="fw-bold">{item.productId.name}</h5>
                                    <p className="text-muted mb-0">₹{item.productId.price.toFixed(2)}</p>
                                </div>
                                <div className="col-md-3">
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        value={item.quantity} 
                                        min="1"
                                        onChange={(e) => updateCart(item.productId._id, parseInt(e.target.value))}
                                    />
                                </div>
                                <div className="col-md-2 text-end">
                                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.productId._id)}>Remove</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-4">
                    <div className="card p-4">
                        <h4 className="fw-bold mb-3">Order Summary</h4>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between mb-4">
                            <span className="fw-bold">Total</span>
                            <span className="fw-bold text-primary">₹{total.toFixed(2)}</span>
                        </div>
                        <button className="btn btn-primary w-100 fw-bold" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
