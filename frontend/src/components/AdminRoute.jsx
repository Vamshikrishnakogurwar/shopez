import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;

    return (user && user.role === 'ADMIN') ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
