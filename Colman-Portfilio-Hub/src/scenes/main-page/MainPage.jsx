import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import AppContext from "../../AppContext";
import axios from "axios";
import './MainPage.css';
import './../../App.css';
import Carousel from "../../components/carousel/Carousel";
import ProjectsList from "../../components/projectslist/ProjectsList";

const MainPage = () => {
  const images = [
    '/Images/1.jpg',
    '/Images/2.jpg',
    '/Images/3.jpg',
    '/Images/4.jpg',
    '/Images/5.jpg',
    '/Images/6.jpg',
    '/Images/7.jpg',
    '/Images/8.jpg',
    '/Images/9.jpg',
  ];

  const videos = [
    { url: './../../../public/Videos/2012.mp4', name: '2012' },
    { url: './../../../public/Videos/2013.mp4', name: '2013' },
    { url: './../../../public/Videos/2014.mp4', name: '2014' },
    { url: './../../../public/Videos/2016.mp4', name: '2016' },
    { url: './../../../public/Videos/2017.mp4', name: '2017' },
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
        <Carousel videos={videos} />
        <ProjectsList images={images} />
      </div>
    </>
  );
};

export default MainPage;
