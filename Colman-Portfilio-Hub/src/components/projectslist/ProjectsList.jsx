import React, { useState, useEffect, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import CaroProject from "./../caro-peoject/CaroProject";
import Paper from "@mui/material/Paper";
import SearchBar from "./../../components/SearchBar.jsx";
import axios from "axios";
import AppContext from "../../AppContext.jsx";

const ProjectsList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const { accessToken, projects, setProjects } = useContext(AppContext);

  const theme = useTheme();
  const isXl = useMediaQuery("(min-width:1941px)");
  const isLg = useMediaQuery("(min-width:1551px) and (max-width:1940px)");
  const isMd = useMediaQuery("(min-width:1161px) and (max-width:1550px)");
  const isSm = useMediaQuery("(min-width:770px) and (max-width:1160px)");
  const isXs = useMediaQuery("(max-width:769px)");

  let cols = 1;
  if (isXl) {
    cols = 5;
  } else if (isLg) {
    cols = 4;
  } else if (isMd) {
    cols = 3;
  } else if (isSm) {
    cols = 2;
  } else if (isXs) {
    cols = 1;
  }

  useEffect(() => {
    axios.get("http://localhost:5000/project/get", {
      headers: { Authorization: `Bearer ${accessToken}` },
    }).then((res) => {
      setProjects(res.data);
      setLoading(false);
    }).catch((err) => {
      setError(err);
      setLoading(false);
    });

  }, [accessToken]);

  const handleExpandClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Paper
      elevation={3}
      sx={{
        bgcolor: "#b0d5d68c",
        width: "90%",
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
        marginBottom: "40px",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <SearchBar />
      <ImageList
        sx={{
          marginTop: "30px",
          marginBottom: "20px",
          width: "90%",
          height: "100%",
          transform: "translateZ(0)",
        }}
        cols={cols}
        gap={1}>
        {projects.map((project, index) => (
          <ImageListItem
            key={index}
            cols={1}
            rows={1}
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "15px",
              width: 300,
            }}>
            <CaroProject
              project={project}
              isExpanded={expandedIndex === index}
              onExpandClick={() => handleExpandClick(index)}
              sx={{
                height: "100%",
                borderRadius: "4px",
              }}
            />
            <ImageListItemBar
              sx={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                borderRadius: "4px",
              }}
              title={project.name}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: "black", borderRadius: "4px" }}
                  aria-label={`star ${project.name}`}></IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Paper>
  );
};

export default ProjectsList;
