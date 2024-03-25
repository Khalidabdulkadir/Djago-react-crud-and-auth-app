import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setAuth } from '../redux/authSlice';
import Sidebar from '../Sidebar';

export default function AddTeachers() {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '' });
    const auth = useSelector((state: RootState) => state.auth.value);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');
    const [mode, setMode] = useState('');
    const [date_reg, setDate_reg] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const addNewTeacher = async () => {
        if (!name || !email || !course || !mode || !date_reg) {
            setErrorMessage('Please fill in all the required fields.');
            return;
        }
        
        try {
            const formField = new FormData();
            formField.append('name', name);
            formField.append('email', email);
            formField.append('course', course);
            formField.append('mode', mode);
            formField.append('date_reg', date_reg);

            await axios.post('http://localhost:8000/teachers/', formField);
            alert('Teacher added successfully');
        } catch (error) {
            console.error('Error adding teacher:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('user');
                setUserInfo({ firstName: data.first_name, lastName: data.last_name });
                dispatch(setAuth(true));
            } catch (e) {
                dispatch(setAuth(false));
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <div className="container text-center">
            <div className="mt-5">
                {auth ? (
                    <div>
                        <Sidebar userName={`${userInfo.firstName} ${userInfo.lastName}`} />
                    </div>
                ) : (
                    <div>
                        <h3>You are not authenticated</h3>
                    </div>
                )}
            </div>
            <div className="w-50 mx-auto shadow p-5">
                <h2 className="mb-4">Add A Teacher</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form>
                    <div className="form-group mb-3">
                        <input type="text" className="form-control p-3" placeholder="Enter Teacher's Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group mb-3">
                        <input type="email" className="form-control p-3" placeholder="Enter teacher's E-mail Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" className="form-control p-3" placeholder="Enter teacher's Course" value={course} onChange={(e) => setCourse(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" className="form-control p-3" placeholder="Enter teacher's National ID" value={mode} onChange={(e) => setMode(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <input type="date" className="form-control p-3" value={date_reg} onChange={(e) => setDate_reg(e.target.value)} />
                    </div>
                    <button type="button" className="btn btn-primary btn-block" onClick={addNewTeacher}>Add Teacher</button>
                </form>
            </div>
        </div>
    );
}
