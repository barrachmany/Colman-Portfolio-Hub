import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../../AppContext.jsx";
import "./ProfilePage.css";
import CaroProject from "./../../components/caro-peoject/CaroProject.jsx";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Nav from "../../components/Nav";
import secBackImage from "./../../../public/Images/sec-back.png";
import Footer from "./../../components/footer/Footer.jsx";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const ProfilePage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { user, setUser, projects, setProjects } = useContext(AppContext);
  const [isEditingField, setIsEditingField] = useState({
    name: false,
    email: false,
    password: false,
  });

  const fetchUserData = async () => {
    try {
      const response = await axios.get("/user/get", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setUser({
        name: response.data.name,
        email: response.data.email,
        id: response.data.id,
        password: response.data.password,
      });
      handleProject(response.data.id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSave = async (field) => {
    try {
      const response = await axios.put(
        "/user/update",
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      setIsEditingField((prevState) => ({ ...prevState, [field]: false }));
    } catch (error) {
      if (error.response.status === 406) {
        alert("Email already exists");
      }
      console.error("Error updating profile:", error);
    }
  };

  const handleProject = async (id) => {
    try {
      const response = await axios.get(`/project/get/member/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (Array.isArray(response.data)) {
        setProjects(response.data);
      } else {
        setProjects([response.data]);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };
  const handleExpandClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await axios.delete(`/project/delete/${projectId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId));
        console.log(response);
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };
  return (
    <>
      <div className="outter-profile-container">
        <Nav />
        <div className="profile-container">
          <h1>Profile</h1>
          <div className="profile-info">
            <h2 className="user-name">{user.name}</h2>
            <h1 className="h1-info">Information</h1>
            <div className="user-inner-information">
              <div className="two-parts-info-user">
                <h2 className="user-inner-info">ID</h2>
                <p>{user.id}</p>
                <div>
                  <h2 className="user-inner-info">Name</h2>
                  {isEditingField.name ? (
                    <>
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                      />
                      <CheckIcon
                        sx={{ marginTop: "28px", cursor: "pointer" }}
                        onClick={() => handleSave("name")}
                      />
                    </>
                  ) : (
                    <>
                      <div className="info-user-edit">
                        <p>{user.name}</p>
                        <EditIcon
                          sx={{
                            marginBottom: "28px",
                            cursor: "pointer",
                          }}
                          onClick={() => setIsEditingField({ ...isEditingField, name: true })}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="two-parts-info-user">
                <div>
                  <h2 className="user-inner-info">Email</h2>
                  {isEditingField.email ? (
                    <>
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                      />
                      <CheckIcon
                        sx={{ marginTop: "28px", cursor: "pointer" }}
                        onClick={() => handleSave("email")}
                      />
                    </>
                  ) : (
                    <>
                      <div className="info-user-edit">
                        <p>{user.email}</p>
                        <EditIcon
                          sx={{
                            marginBottom: "28px",
                            cursor: "pointer",
                          }}
                          onClick={() => setIsEditingField({ ...isEditingField, email: true })}
                        />
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <h2 className="user-inner-info">Password</h2>
                  {isEditingField.password ? (
                    <>
                      <input
                        type="password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                      />
                      <CheckIcon
                        sx={{ marginTop: "28px", cursor: "pointer" }}
                        onClick={() => handleSave("password")}
                      />
                    </>
                  ) : (
                    <>
                      <div className="info-user-edit">
                        <p>{"●●●●●●●●"}</p>
                        <EditIcon
                          sx={{
                            marginBottom: "28px",
                            cursor: "pointer",
                          }}
                          onClick={() =>
                            setIsEditingField({
                              ...isEditingField,
                              password: true,
                            })
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <h1 className="h1-info">Projects</h1>
          </div>

          <ImageList
            sx={{
              marginTop: "30px",
              marginBottom: "20px",
              width: "100%",
              transform: "translateZ(0)",
            }}
            cols={2}
            gap={1}>
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <ImageListItem
                  key={project._id}
                  sx={{
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "15px",
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

                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => handleDelete(project._id)} // Pass the project ID here
                      sx={{ width: "3rem", height: "3rem", margin: "5px", color: "red" }}>
                      <DeleteIcon sx={{ fontSize: "2.5rem" }} />
                    </IconButton>
                  </Tooltip>
                </ImageListItem>
              ))
            ) : (
              <p>No projects found.</p>
            )}
          </ImageList>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
