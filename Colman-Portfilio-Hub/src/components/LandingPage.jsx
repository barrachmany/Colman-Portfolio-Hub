import React from "react";
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="login-container">
            <div className="login-inner-container">
                <h2 className="h2-login">Welcome To</h2>
                <h1 className="h1-login">Colman Portfilio Hub</h1>
                <div className="login-btns">
                    <Link to="/login"><button className="button-login">Login as a student</button></Link>
                    <Link to="/login"><button className="button-login">Login as a lecturer</button></Link>
                    <Link to="/register"><button className="button-login">Sign Up</button></Link>
                </div>
            </div>

        </div>
    );
};

export default LandingPage;
