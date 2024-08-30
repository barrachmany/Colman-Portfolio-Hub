import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import "./ProjectPage.css";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CheckIcon from "@mui/icons-material/Check";
import Nav from "../../components/Nav";
import RefreshIcon from '@mui/icons-material/Refresh';

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isImageRegenerated, setIsImageRegenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");  // State for the selected image

  const years = Array.from({ length: 5 }, (_, i) => 2020 + i);
  const categories = ["Full-Stack", "Deep Learning", "Data Science", "Cyber", "Fintech"];

  useEffect(() => {
    console.log(id);
    setIsImageRegenerated(false);
    setIsLoading(false);
    axios
      .get(`/project/get/${id}`)
      .then((response) => {
        setProject(response.data);
        setSelectedImage(response.data.image);  // Set initial selected image
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, isImageRegenerated, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    axios
      .put(`/project/update/${id}`, project)
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

  const regenrateImage = () => {
    setIsLoading(true);
    axios
      .post("/api/regenerate", { id: project._id, name: project.name, description: project.description })
      .then((response) => {
        console.log(response.data);
        alert("Image Regenerated Successfully, Please refresh the page to see the changes");
        setIsImageRegenerated(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleThumbnailClick = (image) => {
    setSelectedImage(image); // Update the selected image when a thumbnail is clicked
  };

  return (
    <div className="project-page with-main-background">
      <Nav />
      <Paper
        elevation={3}
        style={{
          width: "80vw",
          borderRadius: "15px",
          display: "flex",
          position: "relative",
          maxHeight: "67vh"
        }}
      >
        {isLoading ? (
          <React.Fragment>
            <svg width={0} height={0}>
              <defs>
                <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#b0d5d6" />
                  <stop offset="100%" stopColor="#255366" />
                </linearGradient>
              </defs>
            </svg>
            <CircularProgress
              variant="indeterminate"
              disableShrink
              sx={{
                animationDuration: "550ms",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                "svg circle": { stroke: "url(#my_gradient)" },

              }}
              size={100}
            />
          </React.Fragment>
        ) : (
          <>
            <div className="project-page-image-container">
              <img className="project-page-image" src={selectedImage} alt="project" />
              <div className="project-thumbnails" style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                {[project.image, project.image, project.image, project.image].map((thumb, index) => (
                  <img
                    key={index}
                    src={thumb}
                    alt={`thumbnail-${index}`}
                    className="thumbnail"
                    onClick={() => handleThumbnailClick(thumb)}
                    style={{ width: "6.5vw", height: "100%", cursor: "pointer", margin: "0 5px", borderRadius: "8px" }}
                  />
                ))}
              </div>
            </div>
            <Tooltip title="Regenerate Image">
              <IconButton onClick={regenrateImage} sx={{ cursor: "pointer", width: "3rem", height: "3rem", marginTop: '5px' }}>
                <RefreshIcon sx={{ width: '2.2rem', height: '2.2rem' }} />
              </IconButton>
            </Tooltip>

            {/* Thumbnail Images */}

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
                  <p style={{ color: "#646464", textAlign: "center", marginTop: "15px", fontSize: '1.5rem' }}>{project.description}</p>
                )}
              </div>
              <div className="project-section">
                <h2 className="h2-info">Members: </h2>
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
                {isEditing ? (
                  <TextField
                    label="Category"
                    name="category"
                    select
                    value={project.category}
                    onChange={handleChange}
                    fullWidth
                    style={{ marginBottom: "10px" }}
                  >
                    {categories.map((category, index) => (
                      <MenuItem key={index} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <>
                    <h2 className="h2-info">Category:</h2>
                    <p className="project-p">{project.category}</p>
                  </>
                )}
              </div>
              <div className="project-section">
                <h2 className="h2-info">Creator:</h2>
                <p className="project-p">{project.creator}</p>
              </div>
              <div className="project-section">
                {isEditing ? (
                  <TextField
                    label="Year"
                    name="year"
                    select
                    value={project.year}
                    onChange={handleChange}
                    fullWidth
                    style={{ marginBottom: "10px" }}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <>
                    <h2 className="h2-info">Year:</h2>
                    <p className="project-p">{project.year}</p>
                  </>
                )}
              </div>
              <div className="project-section">
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
                  <>
                    <h2 className="h2-info">Git Repo:</h2>
                    <a className="project-p" href={project.gitRepo}>
                      {project.gitRepo}
                    </a>
                  </>
                )}
              </div>
              <div></div>
            </div>
            <Tooltip title={isEditing ? "Save" : "Edit"}>
              {isEditing ? (
                <IconButton
                  onClick={handleSave}
                  sx={{ cursor: "pointer", width: "3rem", height: "3rem", margin: "5px" }}
                >
                  <CheckIcon sx={{ fontSize: "2.5rem" }} />
                </IconButton>
              ) : (
                <IconButton
                  onClick={isEditing ? handleSave : handleEdit}
                  sx={{ width: "3rem", height: "3rem", margin: "5px" }}
                >
                  <EditIcon sx={{ fontSize: "2.5rem" }} />
                </IconButton>
              )}
            </Tooltip>
          </>
        )}
      </Paper>
    </div>
  );
};

export default ProjectPage;
