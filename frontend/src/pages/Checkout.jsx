import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';

const Checkout = () => {
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const total = cart?.products?.reduce((acc, item) => acc + item.productId.price * item.quantity, 0) || 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const orderData = {
                products: cart.products.map(item => ({
                    productId: item.productId._id,
                    quantity: item.quantity,
                    price: item.productId.price
                })),
                totalAmount: total,
                shippingAddress: { address, city, state, postalCode, phone }
            };

            await api.post('/orders', orderData);
            
            // Clear cart
            cart.products.forEach(async (item) => {
                await api.delete(`/cart/remove/${item.productId._id}`);
            });
            clearCart();

            navigate('/orders');
        } catch (err) {
            setError('Error placing order');
        }
    };

    if (!cart || !cart.products || cart.products.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="container mt-5 mb-5">
            <h2 className="fw-bold mb-4">Checkout</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="row">
                <div className="col-md-8">
                    <div className="card p-4 mb-4">
                        <h4 className="mb-3">Shipping Address</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Address</label>
                                <input type="text" required className="form-control" value={address} onChange={e => setAddress(e.target.value)} />
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">City</label>
                                    <input type="text" required className="form-control" value={city} onChange={e => setCity(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">State</label>
                                    <input type="text" required className="form-control" value={state} onChange={e => setState(e.target.value)} />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Postal Code</label>
                                    <input type="text" required className="form-control" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Phone Number</label>
                                    <input type="text" required className="form-control" value={phone} onChange={e => setPhone(e.target.value)} />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 fw-bold mt-3">Place Order</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-4">
                        <h4 className="fw-bold mb-3">Order Summary</h4>
                        {cart.products.map(item => (
                            <div key={item.productId._id} className="d-flex justify-content-between mb-2">
                                <span>{item.productId.name} x {item.quantity}</span>
                                <span>${(item.productId.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <hr />
                        <div className="d-flex justify-content-between mb-2">
                            <span className="fw-bold">Total</span>
                            <span className="fw-bold text-primary">${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
