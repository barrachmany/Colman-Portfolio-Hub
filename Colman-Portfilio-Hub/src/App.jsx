import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./scenes/main-page/MainPage.jsx";
import LandingPage from "./scenes/landing-page/LandingPage.jsx";
import LoginPage from "./scenes/login-page/LoginPage.jsx";
import RegisterPage from "./scenes/register-page/RegisterPage.jsx";
import CreateProjectPage from "./scenes/create-project-page/CreateProjectPage.jsx";
import AppContext from "./AppContext.jsx";
import ProfilePage from "./scenes/profile-page/ProfilePage.jsx";
import ProjectPage from "./scenes/project-page/ProjectPage.jsx";
import AboutPage from "./scenes/about-page/AboutPage.jsx";
import SmartSearchPage from "./scenes/smart-search-page/SmartSearchPage.jsx";
import axios from "axios";

function App() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const updateTokens = (accessToken, refreshToken) => {
    setAccessToken(accessToken);
    localStorage.setItem("accessToken", accessToken);
    setRefreshToken(refreshToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  const refreshTokens = async (refreshToken) => {
    const response = await axios.post("http://localhost:5000/user/refreshtokens", { refreshToken });
    const newAccessToken = response.data.accessToken;
    const newRefreshToken = response.data.refreshToken;
    updateTokens(newAccessToken, newRefreshToken);
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken && refreshToken) {
      updateTokens(accessToken, refreshToken);

      const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
      const accessTokenExpirationTime = decodedToken.exp - Date.now() / 1000;
      console.log(accessTokenExpirationTime + " seconds until access token expiration");

      const timeOut = setTimeout(() => {
        refreshTokens(refreshToken);
      }, accessTokenExpirationTime * 1000);


      return () => clearTimeout(timeOut);
    }
  }, []);

  return (
    <>
      <AppContext.Provider value={{ projects, setProjects, user, setUser, accessToken, refreshToken, updateTokens }}>
        <div className="app">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/createproject" element={<CreateProjectPage />} />
              <Route path="/myProfile" element={<ProfilePage />} />
              <Route path="/project/:id" element={<ProjectPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/smartsearch" element={<SmartSearchPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
