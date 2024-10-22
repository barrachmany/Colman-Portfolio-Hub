import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import Tooltip from "@mui/material/Tooltip";

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

  const navigate = useNavigate();

  const { user, setUser } = useContext(AppContext);
  const projectIamge = project.image ? project.image : "/images/1.jpg";

  console.log("Project prop:", project);

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/user/get", {
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
    if (user && project.idLikes.includes(user.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [project.idLikes, user.id]);

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(`/project/like/${project._id}`, {
        userId: user.id,
      });
      setIsFavorite(!isFavorite);
      setLikesCount(response.data.likes);
    } catch (error) {
      console.error("Error liking the project:", error);
    }
  };

  const handleFullscreenClick = () => {
    navigate(`/project/${project._id}`);
  };

  return (
    <Card sx={{ width: 300, borderRadius: "4px" }}>
      <CardMedia component="img" height="194" image={projectIamge} alt={project.name} />
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
        <Tooltip title="Like">
          <IconButton onClick={handleLikeClick}>
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" variant="middle" flexItem />
        <Tooltip title="Project Page">
          <IconButton onClick={handleFullscreenClick}>
            <FullscreenIcon />
          </IconButton>
        </Tooltip>
        <ExpandMore
          expand={isExpanded}
          onClick={onExpandClick}
          aria-expanded={isExpanded}
          aria-label="show more">
          <Tooltip title="Description">
            <ExpandMoreIcon />
          </Tooltip>
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
