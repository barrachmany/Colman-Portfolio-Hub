import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './LoginPage'

const LoginPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    axios
      .post("http://localhost:5000/user/login", user)
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
        alert("email or password incorrect");
      });
  };

  return (
    <div className="login-container with-main-background">
      <div className="login-inner-container">
        <h2 className="h2-login">Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
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
        <button className="inside-page-login" onClick={handleLogin}>
          Login
        </button>
        <a href="/register"> Register</a>
      </div>
    </div>
  );
};

export default LoginPage;
