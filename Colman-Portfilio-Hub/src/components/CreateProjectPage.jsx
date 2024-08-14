import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const CreateProjectPage = () => {
  const [Internship, setInternship] = useState('');

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
  });

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleInternshipChange = (event) => {
    setInternship(event.target.value);
    const { name, value } = e.target;

    if (name === "idMembers") {
      setNewProject({
        ...newProject,
        [name]: value.split(/[\s,]+/).map((id) => id.trim()),
      });
    } else {
      setNewProject({ ...newProject, [name]: value });
    }
  };
  const validateInputs = () => {
    if (
      newProject.name === "" ||
      newProject.description === "" ||
      newProject.creator === "" ||
      newProject.members === "" ||
      newProject.gitrepo === "" ||
      newProject.image === "" ||
      newProject.category === ""
    ) {
      alert("Please fill all the fields!!!");
      return false;
    }
    return true;
  };

  const handleCreate = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!validateInputs()) {
      console.log("invalid inputs");
      return;
    }
    axios
      .post("http://localhost:5000/project/create", newProject, {
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
  };

  return (
    <>
      <div className="create-project-container">
        <Nav />

        <div className="login-container create-project-container">
          <div className="login-inner-container">
            <Paper elevation={3} style={{ width: '110%', height: '75vh' }} className="create-project-paper">
              <div className="paper-inner-container">
                <h2 className="h2-login" sx={{ color: "#255366" }}>Add Project</h2>
                <div className="form-names">
                  <TextField
                    label="Owner"
                    id="standard-start-adornment"
                    sx={{ m: 1, width: '28ch' }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}
                    variant="standard"
                    onChange={handleChange}
                  />
                  <TextField
                    label="Project Name"
                    id="standard-start-adornment"
                    sx={{ m: 1, width: '28ch' }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"></InputAdornment>,
                    }}
                    variant="standard"
                    onChange={handleChange}
                  />
                </div>
                <TextField
                  label="Members"
                  id="standard-start-adornment"
                  sx={{ m: 1, width: '90%' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                  variant="standard"
                  onChange={handleChange}
                />
                <FormControl fullWidth sx={{ m: 1, width: '90%' }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-amount">Repository Link</InputLabel>
                  <Input
                    id="standard-adornment-amount"
                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                    onChange={handleChange}
                  />
                </FormControl>
                <div className="choose-create-button">
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120, width: '28ch' }}>
                    <InputLabel id="demo-simple-select-standard-label">Internship</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={Internship}
                      onChange={handleInternshipChange}
                      label="Internship"
                    >
                      <MenuItem value={'Full-Stack'}>Full-Stack</MenuItem>
                      <MenuItem value={'Deep Learning'}>Deep Learning</MenuItem>
                      <MenuItem value={'Data Science'}>Data Science</MenuItem>
                      <MenuItem value={'Cyber'}>Cyber</MenuItem>
                      <MenuItem value={'Fintech'}>Fintech</MenuItem>
                    </Select>
                  </FormControl>
                  <Fab aria-label="add" sx={{
                    backgroundColor: "#255366",
                    width: "35px",
                    height: "35px",
                    margin: "15px",
                    '&:hover': {
                      backgroundColor: '#b0d5d6'
                    }
                  }} onClick={handleCreate}>
                    <AddIcon sx={{
                      color: 'white'
                    }} />
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
