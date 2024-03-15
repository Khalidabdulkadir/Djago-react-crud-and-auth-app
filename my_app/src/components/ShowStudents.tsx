import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { setAuth } from './redux/authSlice';
import { RootState } from './redux/store';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

interface Student {
    id: number;
    name: string;
    email: string;
    course: string;
    nationalId: string;
    date_reg: string;
}

export default function ShowStudents(): JSX.Element {
    const [students, setStudents] = useState<Student[]>([]);

    const getStudents = async (): Promise<void> => {
        try {
            const response = await axios.get<{ results: Student[] }>("http://127.0.0.1:8000/students/");
            const studentsData = response.data.results;
            setStudents(studentsData);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    useEffect(() => {
        getStudents();
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
                        <table className='student-table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Course</th>
                                    <th>National Id</th>
                                    <th>Date_reg</th>
                                    <th>Action</th> {/* Added a new header for the action */}
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.course}</td>
                                        <td>{student.nationalId}</td>
                                        <td>{student.date_reg}</td>
                                        <td> {/* Actions column */}
                                            <Link className="btn btn-outline-primary btn-sm" to={`/${student.id}/`}>details </Link>
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
