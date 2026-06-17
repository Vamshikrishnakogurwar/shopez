import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data.data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;
    if (!product) return <div className="text-center mt-5"><h3>Product not found</h3></div>;

    return (
        <div className="container mt-5 mb-5">
            <Link to="/products" className="btn btn-outline-secondary mb-4">Back to Products</Link>
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div style={{height: '400px', backgroundColor: '#e9ecef', borderRadius: '12px'}} className="d-flex align-items-center justify-content-center">
                        <h4 className="text-muted">{product.name} Image</h4>
                    </div>
                </div>
                <div className="col-md-6">
                    <h2 className="fw-bold mb-3">{product.name}</h2>
                    <span className="badge bg-primary mb-3">{product.category}</span>
                    <h3 className="text-primary fw-bold mb-3">${product.price.toFixed(2)}</h3>
                    <p className="lead">{product.description}</p>
                    <hr />
                    <p><strong>Brand:</strong> {product.brand}</p>
                    <p><strong>Status:</strong> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
                    <button 
                        className="btn btn-primary btn-lg mt-3 w-100 fw-bold"
                        onClick={() => addToCart(product._id)}
                        disabled={product.stock === 0}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
