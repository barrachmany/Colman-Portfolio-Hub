import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./CaroProject.css";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import AppContext from "../../AppContext";

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

export default function CaroProject({ project, isExpanded, onExpandClick }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [likesCount, setLikesCount] = useState(project.likes);
  const { user, setUser } = useContext(AppContext);
  const imgPath = "./public/images/1.jpg";

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/get", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });

      setUser({
        name: response.data.name,
        email: response.data.email,
        id: response.data.id,
        password: response.data.password,
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    // Check if the current user has liked the project whenever user or project changes
    if (user && project.idLikes.includes(user.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [user, project.idLikes]);

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/project/like/${project._id}`, {
        userId: user.id,
      });

      // Toggle isFavorite based on response
      setIsFavorite(!isFavorite);
      // Update likes count
      setLikesCount(response.data.likes);
    } catch (error) {
      console.error("Error liking the project:", error);
    }
  };

  return (
    <Card sx={{ width: 300, borderRadius: "4px" }}>
      <CardMedia component="img" height="194" image={imgPath} alt={project.name} />
      <CardContent>
        <Typography variant="h6" component="div">
          {project.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Members: {project.members.join(", ")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {project.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Likes: {likesCount}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleLikeClick}>
          {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <Divider orientation="vertical" variant="middle" flexItem />
        <IconButton>
          <FullscreenIcon />
        </IconButton>
        <ExpandMore
          expand={isExpanded}
          onClick={onExpandClick}
          aria-expanded={isExpanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ textDecoration: "underline" }}>
            Description:
          </Typography>
          <Typography paragraph>{project.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
