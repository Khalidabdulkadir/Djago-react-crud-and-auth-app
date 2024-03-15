import React from 'react';
import { Link } from 'react-router-dom'; 
import "../App.css";

interface SidebarProps {
    userName: string;
}

const Sidebar: React.FC<SidebarProps> = ({ userName }) => {
    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <div className="logo">
                    <svg className="logoIcon" width="40" height="32">
                    </svg>
                    <span className="logoText">Sidebar</span>
                </div>
                <hr className="separator"/>
                <ul className="navList">
                    <li className="navItem">
                    <i className="fa-solid fa-house"></i>
                        <Link to="/" className="navLink">Home</Link> 
                    </li>
                    <li className="navItem">
                    <i className="fa-solid fa-desktop"></i>
                        <Link to="/dashboard" className="navLink">Dashboard</Link> 
                    </li>
                    <li className="navItem">
                    <i className="fa-solid fa-diagram-project"></i>
                        <Link to="/projects" className="navLink">Projects</Link> 
                    </li>
                    <li className="navItem">
                    <i className="fa-solid fa-school"></i>
                        <Link to="/students" className="navLink">Students</Link> 
                    </li>
                    <li className="navItem">
                    <i className="fa-solid fa-building-columns"></i>
                        <Link to="/add-students" className="navLink">Add Students</Link> 
                    </li>
                </ul>
                <hr className="separator" />
                <div className="userDropdown">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVhtFJc9v3hEBfhJiOhYMS_60ieEbiOjPJyxl8F2dIBw&s" alt="" className="userAvatar" />
                    <strong className="userName">{userName}</strong>
                    <ul className="dropdownMenu">
                        <li><Link to="/new-project" className="dropdownItem">New project..</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
