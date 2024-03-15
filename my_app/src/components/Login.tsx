import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

// Forgot Password Component
const ForgotPassword = () => {
    return (
        <div className="container rounded-lg border p-4">
            <h1 className="h3 mb-3 fw-normal text-center">Forgot Password</h1>
            {/* Add your forgot password form here */}
        </div>
    );
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password
            }, { withCredentials: true });

            // Store the user's name in state
            setUserName(`${data.first_name} ${data.last_name}`);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            setRedirect(true);
        } catch (error) {
            setError('Login failed:');
        }
    };

    if (redirect) {
        // If redirect is true, navigate to the homepage
        return <Navigate to="/dashboard" />;
    }

    return (
        <div className="container rounded-lg border p-4 bg-white">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={submit} style={{ maxWidth: '400px', margin: 'auto' }}>
                        <h1 className="h3 mb-3 fw-normal text-center">Please login</h1>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="row mb-3">
                            <div className="col">
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        className="form-control form-control-sm"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className="form-control form-control-sm"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <Link to="/forgot">Forgot Password?</Link>
                            </div>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Submit</button>
                    </form>

                    {/* Conditionally render the user's name if it's available */}
                    {userName && <p className="mt-3 text-center">Welcome, {userName}!</p>}
                </div>
            </div>
        </div>
    );
}
