import React from 'react';
import './App.css';
import {Register} from "./components/Register";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Nav } from './components/Nav';
import { Reset } from './components/Reset';
import { Forgot } from './components/Forgot';

function App() {
    return <BrowserRouter>
        <Nav/>
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/forgot" element={<Forgot/>}/>
            <Route path="/reset/:token" element={<Reset/>}/>
        </Routes>
    </BrowserRouter>;
}

export default App;