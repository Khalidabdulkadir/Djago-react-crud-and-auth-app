import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [formInvalid, setFormInvalid] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        // Check if any required field is empty
        if (!firstName || !lastName || !email || !password || !passwordConfirm) {
            setFormInvalid(true);
            return;
        }

        // Check if password and password confirmation match
        if (password !== passwordConfirm) {
            alert('Password and password confirmation do not match.');
            return;
        }

        await axios.post('register', {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            password_confirm: passwordConfirm
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={submit} className="mt-5">
                        <h1 className="h3 mb-3 fw-normal text-center">Please register</h1>

                        {formInvalid && (
                            <div className="alert alert-danger" role="alert">
                                Please fill in all the required fields.
                            </div>
                        )}

                        <div className="mb-3">
                            <div className="form-floating">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="firstName" 
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    required
                                />
                                <label htmlFor="firstName">First Name</label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-floating">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="lastName" 
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    required
                                />
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-floating">
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="email" 
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="email">Email address</label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-floating">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>

                        <div className="mb-3">
                            <div className="form-floating">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="passwordConfirm" 
                                    placeholder="Password Confirm"
                                    value={passwordConfirm}
                                    onChange={e => setPasswordConfirm(e.target.value)}
                                    required
                                />
                                <label htmlFor="passwordConfirm">Password Confirm</label>
                            </div>
                        </div>

                        <button className="w-100 btn btn-lg btn-primary mt-3" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
