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
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const CreateProjectPage = () => {
  const [Internship, setInternship] = useState("");
  const [Year, setYear] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
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

    setIsLoading(true); // Set loading state to true

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
        })
        .finally(() => {
          setIsLoading(false); // Reset loading state
        });
    }).catch((error) => {
      console.log(error);
      alert(error.response.statusText);
    }).finally(() => {
      setIsLoading(false); // Reset loading state
    });
  };

  return (
    <>
      <div className="create-project-container with-main-background">
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

                {isLoading ? (
                  // Display CircularProgress with gradient while loading
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
                        animationDuration: '550ms',
                        top: '50%',         // Center vertically
                        left: '50%',        // Center horizontally
                        transform: 'translate(-50%, -50%)',  // Center the element
                        width: '50vw', // Set to 50% of viewport width
                        height: '50vh', // Set to 50% of viewport height
                        'svg circle': { stroke: 'url(#my_gradient)' }, // Apply gradient to stroke
                        marginTop: '20%'
                      }}
                      size={150}

                    />
                  </React.Fragment>
                ) : (
                  // Show form when not loading
                  <>
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
                      <div>

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
                        <FormControl
                          variant="standard"
                          sx={{
                            m: 1,
                            minWidth: 120,
                            width: "28ch",
                            fontSize: "1.5rem",
                            marginBottom: "40px",
                            marginLeft: "50px"
                          }}>
                          <InputLabel id="demo-simple-select-standard-label" sx={{ fontSize: "1.5rem" }}>
                            Year
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            name="category"
                            value={Year}
                            onChange={handleChange}
                            label="Year"
                            sx={{ fontSize: "1.5rem" }}>
                            <MenuItem value={2024} sx={{ fontSize: "1.5rem" }}>
                              2024
                            </MenuItem>
                            <MenuItem value={2023} sx={{ fontSize: "1.5rem" }}>
                              2023
                            </MenuItem>
                            <MenuItem value={2022} sx={{ fontSize: "1.5rem" }}>
                              2022
                            </MenuItem>
                            <MenuItem value={2021} sx={{ fontSize: "1.5rem" }}>
                              2021
                            </MenuItem>
                            <MenuItem value={2020} sx={{ fontSize: "1.5rem" }}>
                              2020
                            </MenuItem>
                          </Select>
                        </FormControl>
                        <Tooltip title='Add Photos'>
                          <AddAPhotoIcon
                            sx={{
                              width: "30px",
                              height: "30px",
                              cursor: "pointer",
                              margin: '20px',
                              paddingLeft: '20px'
                            }} />
                        </Tooltip>
                      </div>
                      <Tooltip title='Add'>
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
                      </Tooltip>
                    </div>
                  </>
                )}
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProjectPage;
