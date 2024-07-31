import React from "react";
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className="login-container">
            <div className="login-inner-container">
                <h2 className="h2-login">Login</h2>
                <input type="text" placeholder="Username" className="login-input" />
                <input type="password" placeholder="Password" className="login-input" />
                <Link to="/main"><button className="button-login">Login</button></Link>
            </div>
        </div>
    );
};

export default LoginPage;
