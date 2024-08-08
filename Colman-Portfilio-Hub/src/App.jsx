import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage.jsx'
import LandingPage from './components/LandingPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import CreateProjectPage from './components/CreateProjectPage.jsx';
import PhotoCarousel from './components/PhotoCarousel.jsx';

function App() {
  return (
    <>
      <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/createproject" element={<CreateProjectPage />} />
          </Routes>
        </BrowserRouter>
      </div>

    </>
  );
}

export default App;
