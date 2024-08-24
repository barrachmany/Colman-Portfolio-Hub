import React from "react";
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
  const [isFavorite, setIsFavorite] = React.useState(false);
  const imgPath = "./public/images/1.jpg";

  const handleIconClick = () => {
    setIsFavorite(!isFavorite);
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
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleIconClick}>
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
          <Typography paragraph>{project.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
