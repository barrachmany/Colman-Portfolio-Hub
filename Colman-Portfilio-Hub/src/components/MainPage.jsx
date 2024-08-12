import PhotoCarousel from "./PhotoCarousel";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const MainPage = () => {
  const navigate = useNavigate();

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
