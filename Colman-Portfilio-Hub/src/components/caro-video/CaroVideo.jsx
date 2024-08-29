import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import SchoolIcon from '@mui/icons-material/School';
import './CaroVideo.css';

const CaroVideo = ({ video }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <div className='video-container'>
            <ImageListItem sx={{ width: '100%' }}>
                <video
                    src={video.video}
                    autoPlay
                    muted
                    controls
                    loop
                    style={{ width: '100%', height: 'auto', borderRadius: '4px', }}></video>
                <ImageListItemBar
                    sx={{
                        background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                        borderRadius: '4px'
                    }}
                    title={video.title}
                    position="top"
                    actionIcon={
                        <IconButton
                            sx={{ color: 'white', marginLeft: "5px",
                                marginRight: "-10px",
                                marginBottom: "2px"
                            } }
                            aria-label={`star ${video.title}`}
                        >
                            <SchoolIcon />
                        </IconButton>
                    }
                    actionPosition="left"
                />
            </ImageListItem>
        </div>
    );
};

export default CaroVideo;
