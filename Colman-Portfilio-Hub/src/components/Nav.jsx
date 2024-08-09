import { useNavigate } from "react-router-dom";
import axios from "axios";

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="/main">Colman Portfolio Hub</a>
        </div>
        <div className="nav-links">
          <ul>
            <li>
              <a href="/main">Home</a>
            </li>
            <li>
              <a href="/myProfile">My Profile</a>
            </li>
            <li>
              <a href="/myProject">My Project</a>
            </li>
            <li></li>
            <a href="/createproject">Add Project</a>
            <li>
              <button onClick={handleLogout}> Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
