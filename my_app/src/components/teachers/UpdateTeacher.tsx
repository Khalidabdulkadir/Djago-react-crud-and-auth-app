import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Teacher {
    id: number;
    name: string;
    email: string;
    course: string;
    mode: string;
    date_reg: string;
}
const UpdateTeachers: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [course, setCourse] = useState<string>('');
    const [mode, setMode] = useState<string>('');
    const [date_reg, setDate_reg] = useState<string>('');

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        loadStudent();
    }, [id]);

    const loadStudent = async () => {
        try {
            const result = await axios.get<Teacher>(`http://127.0.0.1:8000/teachers/${id}`);
            const { data } = result;
            setName(data.name);
            setEmail(data.email);
            setCourse(data.course);
            setMode(data.mode);
            setDate_reg(data.date_reg);
        } catch (error) {
            console.error('Error loading teacher:', error);
        }
    };

const updateSingleTeacher = async () => {
    try {
        const formField = new FormData();
        formField.append('name', name);
        formField.append('email', email);
        formField.append('course', course);
        formField.append('mode', mode);
        formField.append('date_reg', date_reg);

        const response = await axios.put(`http://127.0.0.1:8000/teachers/${id}/`, formField);
        alert('Teachers updated');
        window.location.href = '/teachers';
    } catch (error) {
        console.error('Error updating Teachers:', error);
    }
};


    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Update A Teacher</h2>
               
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter National ID"
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        className="form-control form-control-lg"
                        placeholder="Enter Date of Registration"
                        value={date_reg}
                        onChange={(e) => setDate_reg(e.target.value)}
                    />
                </div>
                <button onClick={updateSingleTeacher} className="btn btn-primary btn-block">Update Student</button>
            </div>
        </div>
    );
};

export default UpdateTeachers;
