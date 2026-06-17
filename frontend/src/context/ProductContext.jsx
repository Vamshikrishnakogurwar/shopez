import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProducts = async (category = '', keyword = '') => {
        setLoading(true);
        try {
            let url = '/products';
            if (keyword) {
                url = `/products/search?q=${keyword}`;
            } else if (category) {
                url = `/products/category/${category}`;
            }
            const res = await api.get(url);
            setProducts(res.data.data);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Error fetching products');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, error, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
