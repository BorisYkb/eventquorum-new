// src/app/participant/enligne/payer/suivredirecte/components/accueil-compact-video-ping.tsx
'use client';

import { useEffect, useRef } from 'react';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';

import { CONFIG } from 'src/global-config';
import { Iconify } from 'src/components/iconify';

import type { ProgrammeActivity } from './programme/programme-data';

// ----------------------------------------------------------------------

interface AccueilCompactVideoProps {
    pinnedActivity: ProgrammeActivity | null;
    onWatchLive?: () => void;
}

/**
 * Section activité épinglée compacte pour les pages /payer/ (accueil3)
 * Affiche l'activité épinglée du programme avec le style AppWelcome
 * Intègre un player vidéo YouTube qui se lit automatiquement
 */
export function AccueilCompactVideo({ pinnedActivity, onWatchLive }: AccueilCompactVideoProps) {
    // Référence pour le conteneur iframe YouTube
    const iframeRef = useRef<HTMLIFrameElement>(null);

    /**
     * Effect pour recharger la vidéo quand l'activité épinglée change
     * Ceci permet de redémarrer la vidéo automatiquement
     */
    useEffect(() => {
        if (pinnedActivity && iframeRef.current) {
            // Recharger l'iframe pour forcer le redémarrage de la vidéo
            const iframe = iframeRef.current;
            const currentSrc = iframe.src;
            iframe.src = '';
            setTimeout(() => {
                iframe.src = currentSrc;
            }, 10);
        }
    }, [pinnedActivity?.id]); // Se déclenche quand l'ID de l'activité épinglée change

    if (!pinnedActivity) {
        return null;
    }

    /**
     * Détermine si la vidéo doit être lue automatiquement
     * - "En cours" : oui (direct)
     * - "Terminé" : oui (replay)
     * - "Non démarré" : non
     */
    const shouldAutoplay = pinnedActivity.status === 'En cours' || pinnedActivity.status === 'Terminé';

    /**
     * Construit l'URL d'embed YouTube avec les paramètres appropriés
     */
    const getYoutubeEmbedUrl = () => {
        if (!pinnedActivity.youtubeVideoId) return '';

        const baseUrl = `https://www.youtube.com/embed/${pinnedActivity.youtubeVideoId}`;
        const params = new URLSearchParams({
            autoplay: shouldAutoplay ? '1' : '0',
            mute: '1', // Désactivé par défaut pour éviter les problèmes d'autoplay
            controls: '1',
            rel: '0', // Ne pas afficher les vidéos suggérées
            modestbranding: '1', // Logo YouTube plus discret
            enablejsapi: '1' // Activer l'API JavaScript
        });

        return `${baseUrl}?${params.toString()}`;
    };

    const handleWatchLive = () => {
        if (onWatchLive) {
            onWatchLive();
        }
        console.log('Watch live activity:', pinnedActivity.title);
    };

    return (
        <Grid size={12}>
            <Box
                sx={[
                    (theme) => ({
                        ...theme.mixins.bgGradient({
                            images: [
                                `linear-gradient(to right, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.88)} 0%, ${theme.vars.palette.grey[900]} 75%)`,
                                `url(${CONFIG.assetsDir}/assets/background/background-5.webp)`,
                            ],
                        }),
                        pt: { xs: 3, md: 4 },
                        pb: { xs: 3, md: 4 },
                        pr: 3,
                        gap: { xs: 2, md: 3 },
                        borderRadius: 2,
                        display: 'flex',
                        position: 'relative',
                        pl: { xs: 3, md: 5 },
                        alignItems: 'flex-start',
                        color: 'common.white',
                        textAlign: { xs: 'center', md: 'left' },
                        flexDirection: { xs: 'column', md: 'row' },
                        border: `solid 1px ${theme.vars.palette.grey[800]}`,
                    })
                ]}
            >
                {/* Section gauche : Contenu de l'activité */}
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        alignItems: { xs: 'center', md: 'flex-start' },
                        gap: 1
                    }}
                >
                    {/* Badge de statut */}
                    <Chip
                        label={pinnedActivity.status}
                        size="small"
                        sx={{
                            bgcolor: pinnedActivity.statusColor === 'success' ? 'success.main' :
                                pinnedActivity.statusColor === 'warning' ? 'warning.main' : 'grey.500',
                            color: 'common.white',
                            fontSize: { xs: '0.625rem', md: '0.75rem' },
                            fontWeight: 600,
                            mb: 0.5
                        }}
                    />

                    {/* Titre de l'activité */}
                    <Typography
                        variant="h4"
                        sx={{
                            whiteSpace: 'pre-line',
                            mb: 1,
                            fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.4rem' },
                            fontWeight: 600,
                            lineHeight: 1.3
                        }}
                    >
                        {pinnedActivity.title}
                    </Typography>

                    {/* Informations complémentaires */}
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 0.5, sm: 4 }, alignItems: { xs: 'center', sm: 'flex-start' } }}>
                        <Typography
                            variant="body2"
                            sx={{
                                opacity: 0.8,
                                fontSize: { xs: '0.75rem', md: '0.875rem' },
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5
                            }}
                        >
                            <Iconify icon="solar:clock-circle-bold" width={16} />
                            {pinnedActivity.time}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                opacity: 0.8,
                                fontSize: { xs: '0.75rem', md: '0.875rem' },
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5
                            }}
                        >
                            <Iconify icon="solar:map-point-bold" width={16} />
                            {pinnedActivity.location}
                        </Typography>
                    </Box>

                    {/* Description courte */}
                    {/* <Typography
                        variant="body2"
                        sx={{
                            opacity: 0.7,
                            maxWidth: { xs: 280, md: 800 },
                            fontSize: { xs: '0.75rem', md: '0.875rem' },
                            lineHeight: 1.4,
                            mt: 0.5
                        }}
                    >
                        {pinnedActivity.description.length > 200
                            ? `${pinnedActivity.description.slice(0, 200)}...`
                            : pinnedActivity.description
                        }
                    </Typography> */}

                    {/* Player vidéo YouTube ou Message selon le statut */}
                    {pinnedActivity.status === 'Non démarré' ? (
                        /* Message si pas de vidéo disponible pour "Non démarré" */
                        <Box
                            sx={{
                                width: { xs: '100%', sm: 670, lg: 800 },
                                height: { xs: '100%', sm: 370 },
                                maxWidth: '100%',
                                mt: 2,
                                mx: 'auto',
                                p: 3,
                                borderRadius: 2,
                                bgcolor: 'grey.800',
                                textAlign: 'center',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Box>
                                <Iconify
                                    icon="solar:videocamera-record-outline"
                                    width={48}
                                    sx={{ color: 'grey.500', mb: 1 }}
                                />
                                <Typography variant="body2" sx={{ color: 'grey.400' }}>
                                    La diffusion démarrera prochainement
                                </Typography>
                            </Box>
                        </Box>
                    ) : pinnedActivity.youtubeVideoId && (
                        /* Player vidéo YouTube pour "En cours" et "Terminé" */
                        <Box
                            sx={{
                                width: { xs: '100%', sm: 670, lg: 800 },
                                height: { xs: '100%', sm: 370 },
                                maxWidth: '100%',
                                mt: 2,
                                mx: 'auto',
                                borderRadius: 2,
                                overflow: 'hidden',
                                boxShadow: 3,
                                bgcolor: 'grey.900'
                            }}
                        >
                            <iframe
                                ref={iframeRef}
                                width="100%"
                                height="100%"
                                src={getYoutubeEmbedUrl()}
                                title={`Vidéo: ${pinnedActivity.title}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{
                                    display: 'block',
                                    border: 'none'
                                }}
                            />
                        </Box>
                    )}
                </Box>

                {/* Section droite : Bouton Live - Conservé mais maintenant la vidéo joue automatiquement
                {pinnedActivity.status === 'En cours' && (
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1
                    }}>
                        <IconButton
                            onClick={handleWatchLive}
                            sx={{
                                bgcolor: 'error.main',
                                color: 'common.white',
                                width: { xs: 46, md: 55 },
                                height: { xs: 46, md: 55 },
                                position: 'relative',
                                '&:hover': {
                                    bgcolor: 'error.dark',
                                    transform: 'scale(1.05)'
                                },
                                transition: 'all 0.2s ease-in-out',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    border: '2px solid',
                                    borderColor: 'error.main',
                                    animation: 'pulse 2s infinite',
                                },
                                '@keyframes pulse': {
                                    '0%': {
                                        transform: 'scale(1)',
                                        opacity: 1,
                                    },
                                    '100%': {
                                        transform: 'scale(1.3)',
                                        opacity: 0,
                                    },
                                },
                            }}
                        >
                            <Iconify icon="solar:play-circle-bold" width={28} />
                        </IconButton>
                    </Box>
                )} */}
            </Box>
        </Grid>
    );
}