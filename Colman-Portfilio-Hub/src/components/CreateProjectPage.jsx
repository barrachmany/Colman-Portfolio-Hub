import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";

const CreateProjectPage = () => {
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
    const { name, value } = e.target;

    if (name === "idMembers") {
      setNewProject({ ...newProject, [name]: value.split(",").map((id) => id.trim()) });
    } else {
      setNewProject({ ...newProject, [name]: value });
    }
  };
  const validateInputs = () => {
    if (
      newProject.name == "" ||
      newProject.description == "" ||
      newProject.creator == "" ||
      newProject.members == "" ||
      newProject.gitrepo == "" ||
      newProject.img == "" ||
      newProject.category == ""
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
      <Nav />
      <div className="login-container">
        <div className="login-inner-container">
          <h2 className="h2-login">Add Project</h2>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="login-input"
            onChange={handleChange}
          />
          <input
            name="description"
            type="text"
            placeholder="Description"
            className="login-input"
            onChange={handleChange}
          />
          <input
            name="creator"
            type="text"
            placeholder="Creator"
            className="login-input"
            onChange={handleChange}
          />
          <input
            name="members"
            type="text"
            placeholder="Members"
            className="login-input"
            onChange={handleChange}
          />
          <input
            name="idMembers"
            type="text"
            placeholder="ID-Members"
            className="login-input"
            onChange={handleChange}
          />
          <input
            name="gitrepo"
            type="text"
            placeholder="Git Repository"
            className="login-input"
            onChange={handleChange}
          />
          <input
            name="image"
            type="text"
            placeholder="Image"
            className="login-input"
            onChange={handleChange}
          />

          <select
            name="category"
            className="login-input"
            onChange={handleChange}
            defaultValue={"Select Category"}>
            <option value="Select Category" disabled hidden>
              Select Category
            </option>
            <option value="Full-Stack">Full-Stack</option>
            <option value="Deep Learning">Deep Learning</option>
            <option value="Data Science">Data Science</option>
            <option value="Cyber">Cyber</option>
          </select>
          <button className="button-login" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateProjectPage;
