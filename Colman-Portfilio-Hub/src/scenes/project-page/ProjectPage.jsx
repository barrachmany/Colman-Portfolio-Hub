import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./ProjectPage.css";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CheckIcon from "@mui/icons-material/Check";

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const years = Array.from({ length: 5 }, (_, i) => 2020 + i);
  const categories = ["Full-Stack", "Deep Learning", "Data Science", "Cyber", "Fintech"];

  useEffect(() => {
    console.log(id);
    axios
      .get(`http://localhost:5000/project/get/${id}`)
      .then((response) => {
        setProject(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:5000/project/update/${id}`, project)
      .then((response) => {
        setIsEditing(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  return (
    <div className="project-page">
      <Paper
        elevation={3}
        style={{
          width: "1150px",
          height: "auto",
          borderRadius: "15px",
          display: "flex",
        }}>
        <div className="project-page-image-container">
          <img className="project-page-image" src={project.image} alt="project" />
        </div>
        <div className="project-details">
          <div className="project-header">
            {isEditing ? (
              <TextField
                label="Project Name"
                name="name"
                value={project.name}
                onChange={handleChange}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            ) : (
              <h1 style={{ color: "#255366", fontSize: "67" }}>{project.name}</h1>
            )}
            {isEditing ? (
              <TextField
                label="Description"
                name="description"
                value={project.description}
                onChange={handleChange}
                fullWidth
                multiline
                style={{ marginBottom: "10px" }}
              />
            ) : (
              <p style={{ color: "#646464" }}>{project.description}</p>
            )}
          </div>
          <div className="project-section">
            <h2>Members:</h2>
            <ul>
              {project.members &&
                project.members.map((member, index) => {
                  return (
                    <li key={index} className="project-p">
                      {member}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="project-section">
            <h2>Category:</h2>
            {isEditing ? (
              <Select
                name="category"
                value={project.category}
                onChange={handleChange}
                fullWidth
                style={{ marginBottom: "10px" }}>
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <p className="project-p">{project.category}</p>
            )}
          </div>
          <div className="project-section">
            <h2>Creator:</h2>
            <p className="project-p">{project.creator}</p>
          </div>
          <div className="project-section">
            <h2>Year</h2>
            {isEditing ? (
              <Select
                name="year"
                value={project.year}
                onChange={handleChange}
                fullWidth
                style={{ marginBottom: "10px" }}>
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <p>{project.year}</p>
            )}
          </div>
          <div className="project-section">
            <h2>Git Repo:</h2>
            {isEditing ? (
              <TextField
                label="Git Repo"
                name="gitRepo"
                value={project.gitRepo}
                onChange={handleChange}
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            ) : (
              <a href={project.gitRepo}>{project.gitRepo}</a>
            )}
          </div>
          <div>
            <Tooltip title={isEditing ? "Save" : "Edit"}>
              {isEditing ? (
                <CheckIcon sx={{ marginTop: "28px", cursor: "pointer" }} onClick={handleSave} />
              ) : (
                <IconButton
                  onClick={isEditing ? handleSave : handleEdit}
                  sx={{ width: "3rem", height: "3rem", margin: "5px" }}>
                  <EditIcon sx={{ fontSize: "2.5rem" }} />
                </IconButton>
              )}
            </Tooltip>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ProjectPage;
