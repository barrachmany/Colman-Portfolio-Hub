import React from "react";
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="login-inner-container">
                <h2 className="h2-login">Welcome To</h2>
                <h1 className="h1-login">Colman Portfilio Hub</h1>
                <input className="input-login" type="text" placeholder="Enter your ID" />
                <Link to="/main"><button className="button-login">Connect</button></Link>
            </div>

        </div>
    );
};

export default LoginPage;
