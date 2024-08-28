import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./scenes/main-page/MainPage.jsx";
import LandingPage from "./scenes/landing-page/LandingPage.jsx";
import LoginPage from "./scenes/login-page/LoginPage.jsx";
import RegisterPage from "./scenes/register-page/RegisterPage.jsx";
import CreateProjectPage from "./scenes/create-project-page/CreateProjectPage.jsx";
import AppContext from "./AppContext.jsx";
import ProfilePage from "./scenes/profile-page/ProfilePage.jsx";
import ProjectPage from "./scenes/project-page/ProjectPage.jsx";
import Nav from "./components/Nav.jsx";
import AboutPage from "./scenes/about-page/AboutPage.jsx";
import SmartSearchPage from "./scenes/smart-search-page/SmartSearchPage.jsx";

function App() {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState({});

  return (
    <>
      <AppContext.Provider value={{ projects, setProjects, user, setUser }}>
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
