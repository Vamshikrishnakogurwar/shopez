import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

const Home = () => {
    const { products, loading } = useContext(ProductContext);

    const featuredProducts = products.slice(0, 4);

    return (
        <div>
            {/* Hero Section */}
            <div className="hero-section text-center">
                <div className="container">
                    <h1 className="display-4 fw-bold">Welcome to ShopEZ</h1>
                    <p className="lead mt-3">Discover the best products at unbeatable prices.</p>
                    <Link to="/products" className="btn btn-light btn-lg mt-4 fw-bold">Shop Now</Link>
                </div>
            </div>

            {/* Featured Products */}
            <div className="container mb-5">
                <h2 className="text-center fw-bold mb-4">Featured Products</h2>
                {loading ? (
                    <div className="text-center"><div className="spinner-border text-primary"></div></div>
                ) : (
                    <div className="row g-4">
                        {featuredProducts.map((product) => (
                            <div className="col-md-3 col-sm-6" key={product._id}>
                                <div className="card h-100 p-3">
                                    <div style={{height: '200px', backgroundColor: '#e9ecef', borderRadius: '8px'}} className="d-flex align-items-center justify-content-center mb-3">
                                        <span className="text-muted">{product.name} Image</span>
                                    </div>
                                    <div className="card-body p-0">
                                        <h5 className="card-title fw-bold">{product.name}</h5>
                                        <p className="card-text text-muted mb-2">{product.category}</p>
                                        <h6 className="fw-bold text-primary">${product.price.toFixed(2)}</h6>
                                        <Link to={`/products/${product._id}`} className="btn btn-outline-primary btn-sm w-100 mt-2">View Details</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
