import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import MainPage from './MainPage'

const LoginPage = () => {
    return (
        <div>
            <h1>Welcome To Colman Portfilio Hub</h1>
            <input type="text" placeholder="Enter your ID" />
            <Link to="/MainPage"><button>Connect</button></Link>
        </div>
    );
};

export default LoginPage;