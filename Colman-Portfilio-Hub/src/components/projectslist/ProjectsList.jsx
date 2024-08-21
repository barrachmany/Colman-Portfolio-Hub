import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CaroProject from './../caro-peoject/CaroProject';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Paper from '@mui/material/Paper';

const ProjectsList = ({ images }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                bgcolor: '#b0d5d68c',
                width: '800px',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '50px'
            }}>
            <ImageList
                sx={{
                    marginTop: '30px',
                    width: 750,
                    height: '100%',
                    transform: 'translateZ(0)',
                }}
                cols={3}
                gap={1}
            >
                {images.map((img, index) => (
                    <ImageListItem
                        key={index}
                        cols={1}
                        rows={1}
                        sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '10px',

                        }}
                    >
                        <CaroProject
                            project={{
                                img: img,
                                name: `Project ${index + 1}`,
                                title: `Project ${index + 1}`,
                                description: `This is project ${index + 1}`,
                                link: 'https://www.google.com'
                            }}
                            sx={{
                                height: '100%',
                                borderRadius: '4px'
                            }}
                        />
                        <ImageListItemBar
                            sx={{
                                background:
                                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                borderRadius: '4px'
                            }}
                            title={`Project ${index + 1}`}
                            position="top"
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'black', borderRadius: '4px' }}
                                    aria-label={`star Project ${index + 1}`}
                                >
                                </IconButton>
                            }
                            actionPosition="left"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Paper>
    );
}

export default ProjectsList;
