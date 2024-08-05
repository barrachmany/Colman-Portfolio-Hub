import PhotoCarousel from "./PhotoCarousel";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Nav />
      <SearchBar />
      <div className="main-container">
        <button
          className="add-project-btn"
          onClick={() => {
            navigate("/createproject");
          }}>
          Add Project
        </button>
        <PhotoCarousel />
      </div>
    </>
  );
};

export default MainPage;
