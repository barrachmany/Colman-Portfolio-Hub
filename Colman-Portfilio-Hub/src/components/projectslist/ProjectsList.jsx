import React, { useState, useEffect, useContext } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InfoIcon from "@mui/icons-material/Info";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import CaroProject from "./../caro-peoject/CaroProject";
import Paper from "@mui/material/Paper";
import AppContext from "../../AppContext";
import axios from "axios";

const ProjectsList = () => {
  const { projects, setProjects } = useContext(AppContext);
  const [expanded, setExpanded] = useState({}); // Track which project is expanded
  const [likes, setLikes] = useState({}); // Track likes for each project

  const defaultImage = "/Images/1.jpg";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/projects", {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [setProjects]);

  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: "#b0d5d68c",
        width: "95%",
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
        marginBottom: "40px",
      }}>
      <ImageList
        sx={{
          marginTop: "30px",
          marginBottom: "20px",
          width: "93%",
          height: "100%",
          transform: "translateZ(0)",
        }}
        cols={4}
        gap={1}>
        {projects.map((project) => (
          <ImageListItem
            key={project._id}
            cols={1}
            rows={1}
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "15px",
              position: "relative",
            }}>
            <CaroProject
              project={{
                img: project.image || defaultImage, // Use default image if no project image
                name: project.name,
                title: project.title,
                description: project.description,
                link: project.gitRepo,
                creator: project.creator,
                category: project.category,
                members: project.members,
              }}
              sx={{
                height: "100%",
                borderRadius: "4px",
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Paper>
  );
};

export default ProjectsList;
