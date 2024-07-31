import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage.jsx'
import LandingPage from './components/LandingPage.jsx';
import LoginPage from './components/LoginPage.jsx';

function App() {
  return (
    <>
      <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </div>

    </>
  );
}

export default App;
