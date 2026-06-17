import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="container mt-5 mb-5">
            <h2 className="fw-bold mb-4">User Dashboard</h2>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card text-center p-4 h-100">
                        <h4 className="fw-bold">My Profile</h4>
                        <p className="text-muted">Manage your personal details</p>
                        <Link to="/profile" className="btn btn-outline-primary mt-auto">Go to Profile</Link>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card text-center p-4 h-100">
                        <h4 className="fw-bold">My Orders</h4>
                        <p className="text-muted">View your order history and status</p>
                        <Link to="/orders" className="btn btn-outline-primary mt-auto">View Orders</Link>
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card text-center p-4 h-100">
                        <h4 className="fw-bold">My Cart</h4>
                        <p className="text-muted">Checkout your pending items</p>
                        <Link to="/cart" className="btn btn-outline-primary mt-auto">View Cart</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
