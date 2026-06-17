import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get('/orders/myorders');
                setOrders(res.data.data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container mt-5 mb-5">
            <h2 className="fw-bold mb-4">My Orders</h2>
            {orders.length === 0 ? (
                <p>You have no orders yet.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>${order.totalAmount.toFixed(2)}</td>
                                    <td>
                                        <span className={`badge ${order.orderStatus === 'Delivered' ? 'bg-success' : 'bg-warning text-dark'}`}>
                                            {order.orderStatus}
                                        </span>
                                    </td>
                                    <td>{order.paymentStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Orders;
