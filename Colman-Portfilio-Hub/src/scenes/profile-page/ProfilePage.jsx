import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../../AppContext.jsx";
import ReactCardFlip from "react-card-flip";
import "./ProfilePage.css";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const ProfilePage = () => {
  const { user, setUser, projects, setProjects } = useContext(AppContext);
  const [isEditingField, setIsEditingField] = useState({ name: false, email: false, password: false });
  const [isFlipped, setIsFlipped] = useState({});

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
        "http://localhost:5000/user/update",
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
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
      const response = await axios.get(`http://localhost:5000/project/get/member/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
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

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`http://localhost:5000/project/delete/${projectId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleFlip = (projectId) => {
    setIsFlipped((prevState) => ({
      ...prevState,
      [projectId]: !prevState[projectId],
    }));
  };

  return (
    <>
      <div className="profile-container">
        <h1>Profile</h1>
        <div className="profile-info">
          <h2 className="user-name">Bar Rachmany</h2>
          <h1 className="h1-info">Information</h1>
          <div className="user-inner-information">
            <div className="two-parts-info-user">
              <h2 className="user-inner-info">ID</h2>
              <p>{user.id} 211521166</p>
              <div>
                <h2 className="user-inner-info">Username</h2>
                {isEditingField.name ? (
                  <>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                    <CheckIcon sx={{ marginTop: '28px', cursor: 'pointer' }} onClick={() => handleSave("name")} />
                  </>
                ) : (
                  <>
                    <div className="info-user-edit">
                      <p>{user.name} barrachmany</p>
                      <EditIcon
                        sx={{
                          marginBottom: '28px',
                          cursor: 'pointer'
                        }}
                        onClick={() => setIsEditingField({ ...isEditingField, name: true })} />
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
                    <CheckIcon sx={{ marginTop: '28px', cursor: 'pointer' }} onClick={() => handleSave("email")} />
                  </>
                ) : (
                  <>
                    <div className="info-user-edit">
                      <p>{user.email} rachmanybar@gmail.com</p>
                      <EditIcon
                        sx={{
                          marginBottom: '28px',
                          cursor: 'pointer'
                        }}
                        onClick={() => setIsEditingField({ ...isEditingField, email: true })} />
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
                    <CheckIcon sx={{ marginTop: '28px', cursor: 'pointer' }} onClick={() => handleSave("password")} />
                  </>
                ) : (
                  <>
                    <div className="info-user-edit">
                      <p>{"●●●●●●●●"}</p>
                      <EditIcon
                        sx={{
                          marginBottom: '28px',
                          cursor: 'pointer'
                        }}
                        onClick={() => setIsEditingField({ ...isEditingField, password: true })} />
                    </div>

                  </>
                )}

              </div>

            </div>
          </div>
          <h1 className="h1-info">Projects</h1>
        </div>
      </div>
      <div className="project-container">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ReactCardFlip
              key={project._id}
              isFlipped={isFlipped[project._id]}
              flipDirection="horizontal"
              containerStyle={{ width: "100%", height: "300px", position: "relative" }}>
              <div className="card" onClick={() => handleFlip(project._id)}>
                <h2>Project Name: {project.name}</h2>
                <p>Members: {project.members.join(", ")}</p>
              </div>

              <div className="card card-back" onClick={() => handleFlip(project._id)}>
                <h2>Description: {project.description}</h2>
                <p>Creator: {project.creator}</p>
                <p>Category: {project.category}</p>
                <a href={project.gitRepo} target="_blank" rel="noopener noreferrer">
                  Github Repo
                </a>
                {project.image && <img src={project.image} alt="Project" />}
                <button onClick={() => handleDeleteProject(project._id)}>Delete Project</button>
              </div>
            </ReactCardFlip>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
