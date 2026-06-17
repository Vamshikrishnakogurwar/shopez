import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';

const ProductListing = () => {
    const { products, loading, fetchProducts } = useContext(ProductContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts('', searchTerm);
    };

    const handleCategoryChange = (e) => {
        const cat = e.target.value;
        setCategory(cat);
        fetchProducts(cat, '');
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="fw-bold mb-4">All Products</h2>
            
            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <form onSubmit={handleSearch} className="d-flex">
                        <input 
                            type="text" 
                            className="form-control me-2" 
                            placeholder="Search products..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">Search</button>
                    </form>
                </div>
                <div className="col-md-6 mb-3">
                    <select className="form-select" value={category} onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Home">Home</option>
                        <option value="Books">Books</option>
                        <option value="Sports">Sports</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center"><div className="spinner-border text-primary"></div></div>
            ) : (
                <div className="row g-4">
                    {products.length === 0 && <p>No products found.</p>}
                    {products.map((product) => (
                        <div className="col-md-4 col-sm-6" key={product._id}>
                            <div className="card h-100 p-3">
                                <img src={product.image} alt={product.name} className="img-fluid" style={{height: '200px', objectFit: 'cover', borderRadius: '8px 8px 0 0', width: '100%'}} />
                                <div className="card-body p-0">
                                    <h5 className="card-title fw-bold">{product.name}</h5>
                                    <p className="card-text text-muted mb-2">{product.category}</p>
                                    <h6 className="fw-bold text-primary">₹{product.price.toFixed(2)}</h6>
                                    <Link to={`/products/${product._id}`} className="btn btn-outline-primary btn-sm w-100 mt-2">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductListing;
