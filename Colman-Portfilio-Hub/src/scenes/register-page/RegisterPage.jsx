import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './RegisterPage.css'

const RegisterPage = () => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    id: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
    console.log(newUser);
  };

  const validateInputs = () => {
    if (newUser.password == "" || newUser.email == "" || newUser.id == "" || newUser.name == "") {
      alert("Please fill all the fields");
      return false;
    }
  };

  const handleRegister = async () => {
    if (validateInputs()) {
      return;
    }
    axios
      .post("http://localhost:5000/user/register", newUser)
      .then((response) => {
        console.log(response);
        // remove the old tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // set the new tokens
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        navigate("/main");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="login-container with-main-background">
      <div className="login-inner-container">
        <h2 className="h2-login">Register</h2>
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="login-input"
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="login-input"
          onChange={handleChange}
        />
        <input
          name="id"
          type="number"
          placeholder="ID"
          className="login-input"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="login-input"
          onChange={handleChange}
        />
        <button className="inside-page-login" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
