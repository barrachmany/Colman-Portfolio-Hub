import { useState } from "react";


const CaroProject = ({ project }) => {
    const [active, setActive] = useState(false);

    return (
        <div className="caro-project">
            <div className="caro-project__img">
                <img src={project.img} alt={project.title} />
            </div>
            <div className="caro-project__info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a href={project.link} target="_blank" rel="noreferrer">View Project</a>
            </div>
        </div>
    );
}

export default CaroProject;