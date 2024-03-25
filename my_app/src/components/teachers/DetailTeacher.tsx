import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { setAuth } from '../redux/authSlice';
import Sidebar from '../Sidebar';

interface Teacher {
    id: number;
    name: string;
    email: string;
    course: string;
    mode: string;
    date_reg: string;
}

export default function DetailTeachers(){
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '' });
    const auth = useSelector((state: RootState) => state.auth.value);

    const [teachers, setTeachers] = useState<Teacher>({} as Teacher);
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
        getSingleTeacher();
    }, []);
    const getSingleTeacher = async () => {
        try {
            const { data } = await axios.get<Teacher>(`http://127.0.0.1:8000/teachers/${id}/`);
            setTeachers(data);
        } catch (error) {
            console.error('Error fetching Teachers:', error);
        }
    }
    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this teacher?")){
            try {
                await axios.delete(`http://127.0.0.1:8000/teachers/${id}/`);
                window.location.href = '/';
                alert(`You have deleted ${teachers.name}`)
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
                                    <h2 className="card-title">Teachers Detail's</h2>
                                    <hr />
                                    <p className="card-text"><strong>ID:</strong> {teachers.id}</p>
                                    <p className="card-text"><strong>Name:</strong> {teachers.name}</p>
                                    <p className="card-text"><strong>Email:</strong> {teachers.email}</p>
                                    <p className="card-text"><strong>Course:</strong> {teachers.course}</p>
                                    <p className="card-text"><strong>National ID:</strong> {teachers.mode}</p>
                                    <p className="card-text"><strong>Date Registered:</strong> {teachers.date_reg}</p>
                                    <div className="d-flex justify-content-center">
                                        <Link className="btn btn-outline-primary mr-2" to={`/${id}/update-Teacher`}>Update</Link>
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
