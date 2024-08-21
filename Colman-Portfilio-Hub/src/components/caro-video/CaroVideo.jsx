import * as React from 'react';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
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
                    style={{ width: '390px', height: 'auto' }}></video>
                <ImageListItemBar
                    sx={{
                        background:
                            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    }}
                    title={video.title}
                    position="top"
                    actionIcon={
                        <IconButton
                            sx={{ color: 'white' }}
                            aria-label={`star ${video.title}`}
                        >
                            <StarBorderIcon />
                        </IconButton>
                    }
                    actionPosition="left"
                />
            </ImageListItem>
        </div>
    );
};

export default CaroVideo;
