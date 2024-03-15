// Assuming the API response contains the is_active field along with other student details

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { setAuth } from './redux/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import "../App.css"
import { useDispatch } from 'react-redux';
import Sidebar from './Sidebar';

interface Student {
    id: number;
    name: string;
    email: string;
    course: string;
    nationalId: string;
    date_reg: string;
    is_active: boolean;
}

export default function DetailStudent(){
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '' });
    const auth = useSelector((state: RootState) => state.auth.value);

    const [student, setStudent] = useState<Student>({} as Student);
    const { id } = useParams();

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

    useEffect(() => {
        getSingleStudent();
    }, []);
    const getSingleStudent = async () => {
        try {
            const { data } = await axios.get<Student>(`http://127.0.0.1:8000/students/${id}/`);
            setStudent(data);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this student?")){
            try {
                await axios.delete(`http://127.0.0.1:8000/students/${id}/`);
                window.location.href = '/';
                alert(`You have deleted ${student.name}`)
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    }

    return (
        <div className="container mt-5">
            {auth ? (
                <div>
                    <Sidebar userName={`${userInfo.firstName} ${userInfo.lastName}`} />
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body text-center">
                                    <h2 className="card-title">Student Details</h2>
                                    <hr />
                                    <p className="card-text"><strong>ID:</strong> {student.id}</p>
                                    <p className="card-text"><strong>Name:</strong> {student.name}</p>
                                    <p className="card-text"><strong>Email:</strong> {student.email}</p>
                                    <p className="card-text"><strong>Course:</strong> {student.course}</p>
                                    <p className="card-text"><strong>National ID:</strong> {student.nationalId}</p>
                                    <p className="card-text"><strong>Date Registered:</strong> {student.date_reg}</p>
                                    <div className="d-flex justify-content-center">
                                        <Link className="btn btn-outline-primary mr-2" to={`/${id}/update`}>Update</Link>
                                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h3>You are not authenticated</h3>
                </div>
            )}
        </div>
    );
}
