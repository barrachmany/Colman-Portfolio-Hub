import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
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
              <button> Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
