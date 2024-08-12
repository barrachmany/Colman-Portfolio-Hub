import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage.jsx";
import LandingPage from "./components/LandingPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import CreateProjectPage from "./components/CreateProjectPage.jsx";
import PhotoCarousel from "./components/PhotoCarousel.jsx";
import AppContext from "./AppContext.jsx";
import ProfilePage from "./components/ProfilePage.jsx";

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
            </Routes>
          </BrowserRouter>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
