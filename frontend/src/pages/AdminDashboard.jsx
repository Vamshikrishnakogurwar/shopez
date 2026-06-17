import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import api from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        usersCount: 0,
        productsCount: 0,
        ordersCount: 0,
        revenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Mocking stats for the sake of UI, in real app, fetch from separate admin API endpoints
                const productsRes = await api.get('/products');
                const ordersRes = await api.get('/orders');
                
                const productsCount = productsRes.data.count;
                const ordersCount = ordersRes.data.count;
                const orders = ordersRes.data.data;
                const revenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

                setStats({
                    usersCount: 15, // Mock data
                    productsCount,
                    ordersCount,
                    revenue
                });
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchStats();
    }, []);

    const barData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales ($)',
                data: [1200, 1900, 3000, 5000, 2000, 3000],
                backgroundColor: 'rgba(79, 70, 229, 0.6)',
            }
        ]
    };

    const pieData = {
        labels: ['Electronics', 'Fashion', 'Home', 'Books', 'Sports'],
        datasets: [
            {
                data: [30, 20, 15, 10, 25],
                backgroundColor: [
                    '#4f46e5',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6'
                ]
            }
        ]
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container mt-5 mb-5">
            <h2 className="fw-bold mb-4">Admin Dashboard</h2>
            
            <div className="row mb-5">
                <div className="col-md-3 mb-3">
                    <div className="card text-center p-4 bg-primary text-white">
                        <h3>{stats.usersCount}</h3>
                        <p className="mb-0">Total Users</p>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card text-center p-4 bg-success text-white">
                        <h3>{stats.productsCount}</h3>
                        <p className="mb-0">Total Products</p>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card text-center p-4 bg-warning text-dark">
                        <h3>{stats.ordersCount}</h3>
                        <p className="mb-0">Total Orders</p>
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="card text-center p-4 bg-danger text-white">
                        <h3>${stats.revenue.toFixed(2)}</h3>
                        <p className="mb-0">Total Revenue</p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-md-8 mb-4">
                    <div className="card p-4">
                        <h4 className="fw-bold mb-3">Sales Overview</h4>
                        <Bar data={barData} />
                    </div>
                </div>
                <div className="col-md-4 mb-4">
                    <div className="card p-4">
                        <h4 className="fw-bold mb-3">Products by Category</h4>
                        <Pie data={pieData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
