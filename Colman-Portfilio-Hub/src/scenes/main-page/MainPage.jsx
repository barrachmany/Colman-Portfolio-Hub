import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import AppContext from "../../AppContext";
import axios from "axios";
import "./MainPage.css";
import "./../../App.css";
import Carousel from "../../components/carousel/Carousel";
import ProjectsList from "../../components/projectslist/ProjectsList";
import Footer from "../../components/footer/Footer";
import FlowerImg from './../../../public/Images/file.png';

const MainPage = () => {
  const images = [
    "/Images/1.jpg",
    "/Images/2.jpg",
    "/Images/3.jpg",
    "/Images/4.jpg",
    "/Images/5.jpg",
    "/Images/6.jpg",
    "/Images/7.jpg",
    "/Images/8.jpg",
    "/Images/9.jpg",
  ];

  const videos = [
    { url: "/Videos/2012.mp4", name: "2012" },
    { url: "/Videos/2013.mp4", name: "2013" },
    { url: "/Videos/2014.mp4", name: "2014" },
    { url: "/Videos/2016.mp4", name: "2016" },
    { url: "/Videos/2017.mp4", name: "2017" },
    { url: "/Videos/2018.mp4", name: "2018" }
  ];

  const navigate = useNavigate();

  const { user, setUser, projects, setProjects } = useContext(AppContext);

  useEffect(() => {
    axios
      .get("/project/get")
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
        <div className="header-h1">
          <h1 className="h1-main-cph">Colman Portfilio Hub</h1>
          <img src={FlowerImg} className="Flower-main" />
        </div>
        <h4 className="h4-main">Past Years Conferences</h4>
        <Carousel videos={videos} />
        <h4 className="h4-main project-h4">Projects</h4>
        <ProjectsList images={images} />
        <Footer />
      </div>
    </>
  );
};

export default MainPage;
