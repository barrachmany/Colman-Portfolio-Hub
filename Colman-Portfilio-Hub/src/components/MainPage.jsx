import PhotoCarousel from './PhotoCarousel';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {

    const navigate = useNavigate();

    return (
        <>
            <NavBar />
            <div className='main-container'>
                <button className='add-project-btn' onClick={()=>{navigate("/createproject")}}>Add Project</button>
                <PhotoCarousel />
            </div>
        </>
    );
};

export default MainPage;