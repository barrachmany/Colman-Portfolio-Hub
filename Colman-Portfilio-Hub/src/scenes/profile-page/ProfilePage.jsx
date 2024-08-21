import React, { useState, useEffect, useContext } from "react";
import Nav from "../../components/Nav.jsx";
import axios from "axios";
import AppContext from "../../AppContext.jsx";
import ReactCardFlip from "react-card-flip";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, setUser, projects, setProjects } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
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
      setIsEditing(false);
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
        <h1>Profile Page</h1>

        <div className="profile-info">
          <h2>ID:</h2>
          <p>{user.id}</p>
          <h2>Username:</h2>
          {isEditing ? (
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          ) : (
            <p>{user.name}</p>
          )}

          <h2>Email:</h2>
          {isEditing ? (
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          ) : (
            <p>{user.email}</p>
          )}

          <h2>Password:</h2>
          {isEditing ? (
            <input
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          ) : (
            <p>{"●●●●●●●●"}</p>
          )}
        </div>

        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit Profile</button>
        )}
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
