import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ products: [] });
    const { user } = useContext(AuthContext);

    const fetchCart = async () => {
        if (!user) return;
        try {
            const res = await api.get('/cart');
            setCart(res.data.data);
        } catch (err) {
            console.error('Error fetching cart', err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, [user]);

    const addToCart = async (productId, quantity = 1) => {
        if (!user) return alert('Please login to add to cart');
        try {
            await api.post('/cart/add', { productId, quantity });
            fetchCart();
        } catch (err) {
            console.error('Error adding to cart', err);
        }
    };

    const updateCart = async (productId, quantity) => {
        try {
            await api.put('/cart/update', { productId, quantity });
            fetchCart();
        } catch (err) {
            console.error('Error updating cart', err);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await api.delete(`/cart/remove/${productId}`);
            fetchCart();
        } catch (err) {
            console.error('Error removing from cart', err);
        }
    };

    const clearCart = () => setCart({ products: [] });

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCart, removeFromCart, fetchCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
