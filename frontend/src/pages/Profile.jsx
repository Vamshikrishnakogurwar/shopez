import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [message, setMessage] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await api.put('/auth/profile', { name, email });
            setMessage('Profile updated successfully');
        } catch (err) {
            setMessage('Error updating profile');
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4">
                        <h2 className="fw-bold mb-4 text-center">My Profile</h2>
                        {message && <div className="alert alert-info">{message}</div>}
                        <form onSubmit={handleUpdate}>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Name</label>
                                <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Email</label>
                                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fw-bold">Role</label>
                                <input type="text" className="form-control" value={user.role} disabled />
                            </div>
                            <button type="submit" className="btn btn-primary w-100 fw-bold">Update Profile</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
