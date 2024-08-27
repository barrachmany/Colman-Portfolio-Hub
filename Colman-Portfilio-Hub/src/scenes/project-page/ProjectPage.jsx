import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
            <div className="project-page-image-container">
                <img className="project-page-image" src={project.image} alt="project" />
            </div>
            <div className="project-details">
                <h1>{project.name}</h1>
                <p>{project.description}</p>
                <h2>Members</h2>
                <ul>
                    {project.members && project.members.map((member, index) => {
                        return <li key={index}>{member}</li>
                    })}
                </ul>
                <h2>Category</h2>
                <p>{project.category}</p>
                <h2>Creator</h2>
                <p>{project.creator}</p>
                <h2>Git Repo</h2>
                <a href={project.gitRepo}>{project.gitRepo}</a>
            </div>
        </div>
    )
}

export default ProjectPage;