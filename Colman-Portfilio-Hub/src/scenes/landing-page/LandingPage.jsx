import React, { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.css";
import FlowerImg from "./../../../public/Images/file.png";
import AppContext from "./../../AppContext.jsx";

const LandingPage = () => {

  const { updateTokens, accessToken, refreshToken } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      updateTokens(accessToken, refreshToken);
      navigate("/main");
    }
  }, []);



  return (
    <div className="login-container with-main-background">
      <div className="login-inner-container">
        <div className="header-h1">
          <h1 className="h1-login">Colman Portfilio Hub</h1>
          <img src={FlowerImg} className="Flower" />
        </div>
        <div className="login-btns">
          <Link to="/login">
            <button className="button-login button-login-1">Login as a student</button>
          </Link>
          <Link to="/login">
            <button className="button-login button-login-2">Login as a lecturer</button>
          </Link>
          <Link to="/register">
            <button className="button-login button-login-3">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
