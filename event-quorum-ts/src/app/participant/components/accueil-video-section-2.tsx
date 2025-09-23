// src/app/participant/components/accueil-video-section-2.tsx

'use client';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import SpeedDial from '@mui/material/SpeedDial';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * Section vidéo hero pour les pages d'accueil
 */
export function AccueilVideoSection2() {
    const theme = useTheme();
    const smUp = useMediaQuery(theme.breakpoints.up('sm'));
    const coverUrl = "/assets/images/mock/cover/cover-18.webp"; // Placeholder

    return (
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
                }}
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
                            }}
                        >
                            Du 29 sept. au 08 oct. 2023
                        </Typography>
                    </Box>

                    {/* Bouton Play vidéo */}
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: { xs: 20, md: 40 },
                            right: { xs: 20, md: 40 },
                            zIndex: 3,
                        }}
                    >
                        <SpeedDial
                            ariaLabel="Actions vidéo"
                            icon={<Iconify icon="solar:play-circle-bold" width={32} />}
                            direction={smUp ? 'left' : 'up'}
                            sx={{
                                '& .MuiSpeedDial-fab': {
                                    bgcolor: 'primary.main',
                                    '&:hover': { bgcolor: 'primary.dark' },
                                    width: { xs: 48, md: 56 },
                                    height: { xs: 48, md: 56 },
                                },
                            }}
                        >
                            <SpeedDialAction
                                icon={<Iconify icon="solar:video-library-bold-duotone" sx={{ color: '#FF0000' }} />}
                                tooltipTitle="Voir la vidéo d'illustration"
                                sx={{
                                    bgcolor: 'background.paper',
                                    '&:hover': { bgcolor: 'action.hover' }
                                }}
                                onClick={() => {
                                    console.log('Play video');
                                }}
                            />

                            <SpeedDialAction
                                icon={<Iconify icon="material-symbols:download-rounded" color="#4CAF50" width={24} /> }
                                tooltipTitle="Télécharger"
                                sx={{
                                    bgcolor: 'background.paper',
                                    '&:hover': { bgcolor: 'action.hover' }
                                }}
                                onClick={() => {
                                    console.log('Download resources');
                                }}
                            />
                        </SpeedDial>
                    </Box>
                </Container>
            </Box>
        </Grid>
    );
}