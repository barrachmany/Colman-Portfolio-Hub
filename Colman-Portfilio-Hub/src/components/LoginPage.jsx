import React from "react";
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div>
            <h1>Welcome To Colman Portfilio Hub</h1>
            <input type="text" placeholder="Enter your ID" />
            <Link to="/main"><button>Connect</button></Link>
        </div>
    );
};

export default LoginPage;
