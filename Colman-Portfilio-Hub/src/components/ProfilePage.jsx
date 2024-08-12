import React, { useState, useEffect, useLayoutEffect } from "react";
import Nav from "./Nav.jsx";
import axios from "axios";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCreator, setProjectCreator] = useState("");
  const [projectMembers, setProjectMembers] = useState([]);
  const [projectCategory, setProjectCategory] = useState("");
  const [projectGitRepo, setProjectGitRepo] = useState("");
  const [projectImage, setProjectImage] = useState("");

  const fetchUserData = async () => {
    try {
      console.log("Fetching user data...");

      const response = await axios.get("http://localhost:5000/user/get", {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      setName(response.data.name);
      setEmail(response.data.email);
      setPassword(response.data.password);
      setId(response.data.id);
      handleProject(response.data.id);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useLayoutEffect(() => {
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
          name,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      setIsEditing(false);
      console.log("Profile updated:", response.data);
    } catch (error) {
      if (error.response.status == 406) {
        alert("Email already exists");
      }
      console.error("Error updating profile:", error);
    }
  };

  const handleProject = async (id) => {
    try {
      console.log("Fetching project data...");
      const response = await axios.get(`http://localhost:5000/project/get/member/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });

      setProjectName(response.data.name);
      setProjectDescription(response.data.description);
      setProjectCreator(response.data.creator);
      setProjectMembers(response.data.members);
      setProjectCategory(response.data.category);
      setProjectGitRepo(response.data.gitRepo);
      setProjectImage(response.data.image);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="profile-container">
        <h1>Profile Page</h1>

        <div className="profile-info">
          <h2>ID:</h2>
          <p>{id}</p>
          <h2>Username:</h2>
          {isEditing ? (
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          ) : (
            <p>{name}</p>
          )}

          <h2>Email:</h2>
          {isEditing ? (
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          ) : (
            <p>{email}</p>
          )}

          <h2>Password:</h2>
          {isEditing ? (
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
          ) : (
            <p>{}</p>
          )}
        </div>

        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit Profile</button>
        )}
      </div>

      <div className="project-container">
        <div className="project">
          <h2 value="projectName">Project:</h2>
          <p value="projectDescription">Description: </p>
          <p value="projectCreator">Creator:</p>
          <p value="projectMembers">Members: </p>
          <p value="projectCategory">Category: </p>
          <a value="projectGitRepo" href="#">
            Github Repo
          </a>

          <button>View Project</button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
