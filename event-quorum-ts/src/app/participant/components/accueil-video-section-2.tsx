'use client';

import { useState } from 'react';
import { varAlpha } from 'minimal-shared/utils';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface AccueilVideoSection2Props {
    /** URL de la vidéo YouTube (format: https://www.youtube.com/watch?v=VIDEO_ID) */
    youtubeUrl?: string;
}

/**
 * Section vidéo hero pour les pages d'accueil
 */
export function AccueilVideoSection2({
    youtubeUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ" // URL par défaut
}: AccueilVideoSection2Props) {
    const theme = useTheme();
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const coverUrl = "/assets/images/mock/cover/cover-18.webp";

    // Extraire l'ID de la vidéo YouTube
    const getYouTubeVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const videoId = getYouTubeVideoId(youtubeUrl);
    const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : '';

    const handlePlayVideo = () => {
        setIsVideoOpen(true);
    };

    const handleCloseVideo = () => {
        setIsVideoOpen(false);
    };

    return (
        <>
            <Grid size={12}>
                <Box
                    sx={{
                        ...theme.mixins.bgGradient({
                            images: [
                                `linear-gradient(0deg, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.64)}, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.64)})`,
                                `url(${coverUrl})`,
                            ],
                        }),
                        height: { xs: 300, md: 480 },
                        overflow: 'hidden',
                        borderRadius: { xs: 1, md: 2 },
                        position: 'relative',
                        mb: 4,
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.02)',
                        },
                    }}
                    onClick={handlePlayVideo}
                >
                    <Container sx={{ height: 1, position: 'relative' }}>
                        {/* Titre central */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                textAlign: 'center',
                                color: 'common.white',
                                zIndex: 2,
                                width: '100%',
                                px: 2,
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    fontWeight: 'bold',
                                    mb: 2,
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                                    fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
                                    lineHeight: { xs: 1.2, md: 1.1 },
                                }}
                            >
                                LE SARA, UN ÉVÉNEMENT INCONTOURNABLE
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                sx={{
                                    opacity: 0.9,
                                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                                    fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
                                    maxWidth: 600,
                                    mx: 'auto',
                                    mb: 3,
                                }}
                            >
                                Du 29 sept. au 08 oct. 2023
                            </Typography>

                            {/* Bouton Play vidéo - centré */}
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation(); // Empêche la propagation du clic
                                    handlePlayVideo();
                                }}
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'common.white',
                                    width: { xs: 64, md: 80 },
                                    height: { xs: 64, md: 80 },
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        bgcolor: 'primary.dark',
                                        transform: 'scale(1.1)',
                                        boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
                                    },
                                    '&:active': {
                                        transform: 'scale(1.05)',
                                    },
                                }}
                            >
                                <Iconify
                                    icon="solar:play-bold"
                                    width={40}
                                    sx={{ ml: 0.5 }} // Petit décalage pour centrer visuellement le triangle
                                />
                            </IconButton>
                        </Box>

                        {/* Overlay pour indiquer que c'est cliquable */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                bgcolor: 'transparent',
                                zIndex: 1,
                            }}
                        />
                    </Container>
                </Box>
            </Grid>

            {/* Modal vidéo YouTube */}
            <Modal
                open={isVideoOpen}
                onClose={handleCloseVideo}
                closeAfterTransition
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                }}
            >
                <Fade in={isVideoOpen}>
                    <Box
                        sx={{
                            position: 'relative',
                            width: { xs: '100%', sm: '90%', md: '80%' },
                            maxWidth: 1200,
                            bgcolor: 'common.black',
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
                            outline: 'none',
                        }}
                    >
                        {/* Bouton fermer */}
                        <IconButton
                            onClick={handleCloseVideo}
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                zIndex: 10,
                                bgcolor: 'rgba(0,0,0,0.7)',
                                color: 'common.white',
                                '&:hover': {
                                    bgcolor: 'rgba(0,0,0,0.9)',
                                },
                            }}
                        >
                            <Iconify icon="mingcute:close-line" width={24} />
                        </IconButton>

                        {/* Iframe YouTube */}
                        {embedUrl && (
                            <Box
                                sx={{
                                    position: 'relative',
                                    paddingBottom: '56.25%', // Ratio 16:9
                                    height: 0,
                                    overflow: 'hidden',
                                }}
                            >
                                <iframe
                                    src={embedUrl}
                                    title="Vidéo SARA"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        border: 'none',
                                    }}
                                />
                            </Box>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}