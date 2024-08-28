import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import "./ProjectPage.css";
import axios from "axios";

const ProjectPage = () => {

    const { id } = useParams();
    const [project, setProject] = useState({});

    useEffect(() => {
        console.log(id);
        axios.get(`http://localhost:5000/project/get/${id}`)
            .then((response) => {
                setProject(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id]);

    return (
        <div className="project-page" >
            <Paper elevation={3} style={{ width: "85%", height: "auto", borderRadius: '15px', display: 'flex' }}>
                <div className="project-page-image-container">
                    <img className="project-page-image" src={project.image} alt="project" />
                </div>
                <div className="project-details">
                    <div className="project-header">
                        <h1 style={{ color: '#255366', fontSize: '67' }}>{project.name}</h1>
                        <p style={{ color: '#646464' }}>{project.description}</p>


                    </div>
                    <div className="project-section">
                        <h2>Members:</h2>
                        <ul>
                            {project.members && project.members.map((member, index) => {
                                return <li key={index} className="project-p">{member}</li>
                            })}
                        </ul>
                    </div>
                    <div className="project-section">
                        <h2>Category:</h2>
                        <p className="project-p">{project.category}</p>
                    </div>
                    <div className="project-section">
                        <h2>Creator:</h2>
                        <p className="project-p">{project.creator}</p>
                    </div>
                    <div className="project-section">
                        <h2>Git Repo:</h2>
                        <a href={project.gitRepo}>{project.gitRepo}</a>
                    </div>

                </div>
            </Paper>

        </div>
    )
}

export default ProjectPage;