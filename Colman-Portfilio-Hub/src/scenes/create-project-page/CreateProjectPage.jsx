import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "../../components/Nav";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "./CreateProject.css";

const CreateProjectPage = () => {
  const [Internship, setInternship] = useState("");
  const navigate = useNavigate();

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    creator: "",
    members: "",
    gitrepo: "",
    image: "",
    category: "",
    idMembers: [],
    likes: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "idMembers") {
      setNewProject({
        ...newProject,
        [name]: value.split(/[\s,]+/).map((id) => id.trim()),
      });
      console.log(newProject);
    } else if (name === "category") {
      setInternship(value);
      setNewProject({ ...newProject, [name]: value });
      console.log(newProject);
    } else {
      setNewProject({ ...newProject, [name]: value });
      console.log(newProject);
    }
  };

  const validateInputs = () => {
    const requiredFields = [
      "name",
      "description",
      "creator",
      "members",
      "gitrepo",
      "category",
      "idMembers",
    ];
    for (let field of requiredFields) {
      if (newProject[field] === "" || newProject[field].length === 0) {
        alert("Please fill all the fields!!!");
        return false;
      }
    }
    return true;
  };

  const handleCreate = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!validateInputs()) {
      console.log("invalid inputs");
      return;
    }
    axios.post("http://localhost:5000/api/delle", newProject).then((response) => {
      console.log(response);
      axios.post("http://localhost:5000/project/create", newProject, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          console.log(response);
          navigate("/main");
        })
        .catch((error) => {
          console.log(error);
          alert(error.response.statusText);
        });
    }).catch((error) => {
      console.log(error);
      alert(error.response.statusText);
    });
  };

  return (
    <>
      <div className="create-project-container">
        <Nav />
        <div className="login-container create-project-container">
          <div className="login-inner-container">
            <Paper
              elevation={3}
              style={{ width: "800px", height: "850px", borderRadius: '15px', marginTop: '100px' }}
              className="create-project-paper">
              <div className="paper-inner-container">
                <h2 className="h2-login" sx={{ color: "#255366", fontSize: "6rem" }}>
                  Add Project
                </h2>
                <div className="form-names">
                  <TextField
                    label="Owner"
                    id="standard-start-adornment"
                    sx={{ m: 1, width: "30ch", fontSize: "1.5rem" }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"></InputAdornment>,
                      sx: { fontSize: "1.5rem" }, // Increase input text size
                    }}
                    InputLabelProps={{
                      sx: { fontSize: "2rem" }, // Increase label text size
                    }}
                    variant="standard"
                    name="creator"
                    onChange={handleChange}
                  />
                  <TextField
                    label="Project Name"
                    id="standard-start-adornment"
                    sx={{ m: 1, width: "40ch", fontSize: "1.5rem" }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"></InputAdornment>,
                      sx: { fontSize: "1.5rem" },
                    }}
                    InputLabelProps={{
                      sx: { fontSize: "2rem" },
                    }}
                    variant="standard"
                    name="name"
                    onChange={handleChange}
                  />
                </div>
                <TextField
                  label="Members"
                  id="standard-start-adornment"
                  sx={{ m: 1, width: "90%", fontSize: "1.5rem", marginBottom: "40px" }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                    sx: { fontSize: "1.5rem" },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: "2rem" },
                  }}
                  variant="standard"
                  name="members"
                  onChange={handleChange}
                />
                <TextField
                  label="ID-Members"
                  id="standard-start-adornment"
                  name="idMembers"
                  sx={{ m: 1, width: "90%", fontSize: "1.5rem", marginBottom: "40px" }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                    sx: { fontSize: "1.5rem" },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: "2rem" },
                  }}
                  variant="standard"
                  onChange={handleChange}
                />
                <TextField
                  label="Description"
                  id="standard-start-adornment"
                  name="description"
                  sx={{ m: 1, width: "90%", fontSize: "1.5rem", marginBottom: "40px" }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                    sx: { fontSize: "1.5rem" },
                  }}
                  InputLabelProps={{
                    sx: { fontSize: "2rem" },
                  }}
                  variant="standard"
                  onChange={handleChange}
                />
                <FormControl
                  fullWidth
                  sx={{ m: 1, width: "90%", fontSize: "1.5rem", marginBottom: "40px" }}
                  variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount" sx={{ fontSize: "2rem" }}>
                    Repository Link
                  </InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                    sx={{ fontSize: "1.5rem" }}
                    name="gitrepo"
                    onChange={handleChange}
                  />
                </FormControl>
                <div className="choose-create-button">
                  <FormControl
                    variant="standard"
                    sx={{
                      m: 1,
                      minWidth: 120,
                      width: "28ch",
                      fontSize: "1.5rem",
                      marginBottom: "40px",
                    }}>
                    <InputLabel id="demo-simple-select-standard-label" sx={{ fontSize: "1.5rem" }}>
                      Internship
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      name="category"
                      value={Internship}
                      onChange={handleChange}
                      label="Internship"
                      sx={{ fontSize: "1.5rem" }}>
                      <MenuItem value={"Full-Stack"} sx={{ fontSize: "1.5rem" }}>
                        Full-Stack
                      </MenuItem>
                      <MenuItem value={"Deep Learning"} sx={{ fontSize: "1.5rem" }}>
                        Deep Learning
                      </MenuItem>
                      <MenuItem value={"Data Science"} sx={{ fontSize: "1.5rem" }}>
                        Data Science
                      </MenuItem>
                      <MenuItem value={"Cyber"} sx={{ fontSize: "1.5rem" }}>
                        Cyber
                      </MenuItem>
                      <MenuItem value={"Fintech"} sx={{ fontSize: "1.5rem" }}>
                        Fintech
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Fab
                    aria-label="add"
                    sx={{
                      backgroundColor: "#255366",
                      width: "35px",
                      height: "35px",
                      margin: "15px",
                      "&:hover": {
                        backgroundColor: "#b0d5d6",
                      },
                    }}
                    onClick={handleCreate}>
                    <AddIcon
                      sx={{
                        color: "white",
                      }}
                    />
                  </Fab>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProjectPage;
