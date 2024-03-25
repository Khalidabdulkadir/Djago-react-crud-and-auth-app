// App.js
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Forgot } from './components/Forgot';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Projects from './components/authenticated User/Projects';
import ShowStudents from './components/ShowStudents';
import AddStudents from './components/AddStudent';
import DetailStudent from './components/DetailStudent';
import UpdateStudents from './components/UpdateStudents';
import ShowTeachers from './components/teachers/ShowTeachers';
import DetailTeachers from './components/teachers/DetailTeacher';
import UpdateTeachers from './components/teachers/UpdateTeacher';
import AddTeachers from './components/teachers/AddTeachers';

function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/students" element={<ShowStudents />} />
                <Route path="/add-students" element={<AddStudents />} />
                <Route path="/teachers" element={<ShowTeachers />} />
                <Route path='/student/:id' element={<DetailStudent />} />
                <Route path="/add-teachers" element={<AddTeachers />} />
                <Route path='/teacher/:id' element={<DetailTeachers />} />
                <Route path='/:id/update-student' element={<UpdateStudents />} />
                <Route path='/:id/update-Teacher' element={<UpdateTeachers />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
