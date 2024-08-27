import Paper from "@mui/material/Paper";
import './AboutPage.css';

const AboutPage = () => {
    return (
        <div className="about-container">
            <Paper className="about-paper" sx={{ borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 className="h1-about">About</h1>
                <p className="p-about">Colman Portfolio Hub is a digital showcase platform dedicated to presenting the creative and technical projects developed by students and alumni of the Colman College of Management. Our goal is to provide a space where users can explore a diverse range of projects spanning across various fields like software development, design, data science, cybersecurity, and more.</p>
                <br />
                <p className="p-about">Through the Colman Portfolio Hub, we aim to highlight the skills and innovations of our community, offering insights into their academic and professional achievements. Whether you are looking to get inspired, connect with talent, or simply explore new ideas, the Colman Portfolio Hub serves as your gateway to discovering the amazing work of our vibrant community.</p>
            </Paper>
        </div>
    );
}

export default AboutPage;