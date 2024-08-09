import React, { useState, useEffect } from "react";
import Nav from "./Nav.jsx";
import axios from "axios";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data...");

        const response = await axios.get("http://localhost:5000/user/get", {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        setName(response.data.name);
        setEmail(response.data.email);
        setPassword(response.data.password);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

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

  return (
    <>
      <Nav />
      <div className="profile-container">
        <h1>Profile Page</h1>

        <div className="profile-info">
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
    </>
  );
};

export default ProfilePage;
