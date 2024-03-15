import React from 'react'
import "../../components/authenticated User/proj.css"

const projects = [
    { id: 1, name: "Project 1", description: "Description of Project 1" },
    { id: 2, name: "Project 2", description: "Description of Project 2" },
    { id: 3, name: "Project 3", description: "Description of Project 3" },
    // Add more projects as needed
];
export default function Proj() {
  return (
    <div className='project-container'>
        <div className="projects-container">
            <h2>Projects</h2>
            <div className="project-list">
                {projects.map(project => (
                    <div key={project.id} className="project-card">
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="projects-container">
            <div className="project-list">
                {projects.map(project => (
                    <div key={project.id} className="project-card">
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                    </div>
                ))}
                
            </div>
        </div>
        </div>
    );
}
