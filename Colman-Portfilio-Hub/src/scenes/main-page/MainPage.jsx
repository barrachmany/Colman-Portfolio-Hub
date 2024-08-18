import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import AppContext from "../../AppContext";
import axios from "axios";
import './MainPage.css';
import './../../App.css';
import ProjectCarousel from "../../components/carousel/ProjectCarousel";

const MainPage = () => {
   const images = [
    '/Images/1.jpg',
    '/Images/2.jpg',
    '/Images/3.jpg',
    '/Images/4.jpg',
    '/Images/5.jpg',
  ];

  const navigate = useNavigate();

  const { user, setUser, projects, setProjects } = useContext(AppContext);

  useEffect(() => {
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
        <h1 className="h1-main-projects">Projects</h1>
        <ProjectCarousel images={images}/>
      </div>
    </>
  );
};

export default MainPage;
