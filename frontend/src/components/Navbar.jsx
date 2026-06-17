import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const cartCount = cart?.products?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <nav className="navbar navbar-expand-lg navbar-light sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold text-primary" to="/">ShopEZ</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {user ? (
                            <>
                                {user.role === 'ADMIN' && (
                                    <li className="nav-item">
                                        <Link className="nav-link text-danger fw-bold" to="/admin">Admin Dashboard</Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/orders">Orders</Link>
                                </li>
                                <li className="nav-item me-3 position-relative">
                                    <Link className="nav-link" to="/cart">
                                        Cart
                                        {cartCount > 0 && (
                                            <span className="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger btn-sm mt-1" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="btn btn-primary btn-sm mt-1 ms-2" to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
