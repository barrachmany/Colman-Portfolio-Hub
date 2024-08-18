import { useContext, useEffect } from "react";
import PhotoCarousel from "../../components/PhotoCarousel";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import AppContext from "../../AppContext";
import axios from "axios";
import './MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();

  const { user, setUser, projects, setProjects } = useContext(AppContext);

  useEffect(() => {
    // fetch projects from the server
    axios
      .get("http://localhost:5000/project/get")
      .then((response) => {
        setProjects(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Nav />
      <div className="main-container">
        <PhotoCarousel />
      </div>
    </>
  );
};

export default MainPage;
