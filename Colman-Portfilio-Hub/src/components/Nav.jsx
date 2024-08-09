import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { IoAdd } from "react-icons/io5";
import { IoAccessibilityOutline } from "react-icons/io5";
import { CgHome } from "react-icons/cg";

const Nav = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="/main">Colman Portfolio Hub</a>
        </div>
        <div className="nav-links">
          <SearchBar />
          <ul>
            <li>
              <a href="/main"><CgHome /></a>
            </li>
            <li>
              <a href="/myProfile"><IoAccessibilityOutline /></a>
            </li>
            <li>
              <a href="/createproject"><IoAdd /></a>
            </li>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <FontAwesomeIcon icon={faSignOutAlt} style={{ color: 'white', fontSize: '15px' }} />
            </button>
          </ul>
        </div>
      </div>
    </nav >
  );
};

export default Nav;
