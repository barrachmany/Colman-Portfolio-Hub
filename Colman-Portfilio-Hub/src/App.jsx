import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import MainPage from './components/MainPage.jsx'

function App() {
  return (
    <>
      <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/main" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </div>

    </>
  );
}

export default App;
