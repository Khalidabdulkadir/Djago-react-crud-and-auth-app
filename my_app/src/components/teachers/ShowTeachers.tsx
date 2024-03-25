import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
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

export default function ShowTeachers(): JSX.Element {
    const [teachers, setTeachers] = useState<Teacher[]>([]);

    const getTeacher = async (): Promise<void> => {
        try {
            const response = await axios.get<{ results: Teacher[] }>("http://127.0.0.1:8000/teachers/");
            const TeachersData = response.data.results;
            setTeachers(TeachersData);
        } catch (error) {
            console.error("Error fetching Teachers:", error);
        }
    };

    useEffect(() => {
        getTeacher();
    }, []);


    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '' });
    const auth = useSelector((state: RootState) => state.auth.value);
    

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
        <div className="container mt-5 text-center">
            {auth ? (
                <div>
                    <Sidebar userName={`${userInfo.firstName} ${userInfo.lastName}`} />
                    <div>
                        <table className='teacher-table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Course</th>
                                    <th>Mode</th>
                                    <th>Date_reg</th>
                                    <th>Action</th> {/* Added a new header for the action */}
                                </tr>
                            </thead>
                            <tbody>
                                {teachers.map((teacher, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                        <td>{teacher.name}</td>
                                        <td>{teacher.email}</td>
                                        <td>{teacher.course}</td>
                                        <td>{teacher.mode}</td>
                                        <td>{teacher.date_reg}</td>
                                        <td> {/* Actions column */}
                                            <Link className="btn btn-outline-primary btn-sm" to={`/teacher/${teacher.id}/`}>details </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
