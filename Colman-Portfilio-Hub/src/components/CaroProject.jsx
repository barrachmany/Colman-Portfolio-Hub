import { useState, useEffect } from "react";


const CaroProject = ({ project }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        console.log(project);
    }, []);

    return (
        <div className="caro-project">
            <div className="caro-project__img">
                <img src={project.image} alt={project.name} />
            </div>
            <div className="caro-project__info">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <a href={project.link} target="_blank" rel="noreferrer">View Project</a>
            </div>
        </div>
    );
}

export default CaroProject;