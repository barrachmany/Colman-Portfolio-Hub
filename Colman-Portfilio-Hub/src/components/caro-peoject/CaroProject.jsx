import { useState, useContext } from "react";
import "./CaroProject.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AppContext from "../../AppContext";
import axios from "axios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CaroProject({ project }) {
  const { projects, setProjects } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Handle Like button click
  const handleLikeClick = async (projectId) => {
    setIsFavorite(!isFavorite);
    console.log("Project liked:", projectId);

    // Update likes on the server
    try {
      const response = await axios.post(
        `http://localhost:5000/project/like/${projectId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        }
      );
      console.log("Project liked:", response.data);

      setProjects(
        projects.map((p) => {
          if (p._id === projectId) {
            return { ...p, likes: p.likes + 1 };
          }
          return p;
        })
      );
    } catch (error) {
      console.error("Error liking project:", error);
    }
  };

<<<<<<< HEAD
  // Handle Expand button click
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
=======
    return (
        <Card sx={{ width: 300, borderRadius: '4px' }}>
            <CardMedia
                component="img"
                height="194"
                image={project.img}
                alt={project.name}
            />
>>>>>>> origin/main

  return (
    <Card sx={{ maxWidth: 345, borderRadius: "4px" }}>
      <CardMedia component="img" height="194" image={project.img} alt={project.name} />

      <CardActions disableSpacing sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="body2" color="text.primary" sx={{ marginLeft: 1 }}>
          {project.name}
        </Typography>
        <div>
          <IconButton onClick={() => handleLikeClick(project._id)}>
            {isFavorite ? <FavoriteIcon sx={{ color: "red" }} /> : <FavoriteBorderIcon />}
          </IconButton>

          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {project.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {project.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {project.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Created by: {project.creator}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Members: {project.members.join(", ")}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
