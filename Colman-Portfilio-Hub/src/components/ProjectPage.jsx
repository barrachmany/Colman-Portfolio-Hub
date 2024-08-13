import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProjectPage = () => {

    const { id } = useParams();
    const [project, setProject] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/project/get/${id}`)
            .then((response) => {
                setProject(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [id]);

    return (
        <div className="project-page">
            <h1>Project Page</h1>

        </div>
    )
}

export default ProjectPage;