import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { IoAdd } from "react-icons/io5";
import { IoAccessibilityOutline } from "react-icons/io5";
import { CgHome } from "react-icons/cg";
import Tooltip from "@mui/material/Tooltip";
import TroubleshootIcon from "@mui/icons-material/Troubleshoot";

const Nav = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-logo">
          <a href="/main">Colman Portfolio Hub</a>
          <img src="/public/Images/navBarFlower.png" class="Flower-nav-logo"></img>
        </div>
        <div className="nav-links">
          <ul>
            <Tooltip title="Home">
              <li>
                <a href="/main">
                  <CgHome />
                </a>
              </li>
            </Tooltip>
            <Tooltip title="AI Search">
              <li>
                <a href="/smartsearch">
                  <div className="nav-search">
                    <TroubleshootIcon fontSize="large" color="white" />
                  </div>
                </a>
              </li>
            </Tooltip>
            <Tooltip title="My profile">
              <li>
                <a href="/myProfile">
                  <IoAccessibilityOutline />
                </a>
              </li>
            </Tooltip>
            <Tooltip title="Add project">
              <li>
                <a href="/createproject">
                  <IoAdd />
                </a>
              </li>
            </Tooltip>
            <Tooltip title="Log out">
              <button style={{ background: "none", border: "none", cursor: "pointer" }}>
                <FontAwesomeIcon
                  onClick={handleLogout}
                  icon={faSignOutAlt}
                  style={{ color: "white", fontSize: "15px", margin: "0 7px 0 7px" }}
                />
              </button>
            </Tooltip>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
