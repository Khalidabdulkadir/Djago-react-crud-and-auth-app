import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Student {
    id: number;
    name: string;
    email: string;
    course: string;
    nationalId: string;
    date_reg: string;
    is_active: boolean;
}

const UpdateStudents: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [course, setCourse] = useState<string>('');
    const [nationalId, setNationalId] = useState<string>('');
    const [date_reg, setDate_reg] = useState<string>('');
    const [is_active, setIsActive] = useState<boolean>(false);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        loadStudent();
    }, [id]);

    const loadStudent = async () => {
        try {
            const result = await axios.get<Student>(`http://127.0.0.1:8000/students/${id}`);
            const { data } = result;
            setName(data.name);
            setEmail(data.email);
            setCourse(data.course);
            setNationalId(data.nationalId);
            setDate_reg(data.date_reg);
            setIsActive(data.is_active);
        } catch (error) {
            console.error('Error loading student:', error);
        }
    };

const updateSingleStudent = async () => {
    try {
        const formField = new FormData();
        formField.append('name', name);
        formField.append('email', email);
        formField.append('course', course);
        formField.append('nationalId', nationalId);
        formField.append('date_reg', date_reg);
        formField.append('isactive', String(is_active));

        const response = await axios.put(`http://127.0.0.1:8000/students/${id}/`, formField);
        alert('Student updated');
        window.location.href = '/students';
    } catch (error) {
        console.error('Error updating student:', error);
    }
};


    return (
        <div className="container">
            <div className="w-75 mx-auto shadow p-5">
                <h2 className="text-center mb-4">Update A Student</h2>
               
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
                        value={nationalId}
                        onChange={(e) => setNationalId(e.target.value)}
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
                <button onClick={updateSingleStudent} className="btn btn-primary btn-block">Update Student</button>
            </div>
        </div>
    );
};

export default UpdateStudents;
