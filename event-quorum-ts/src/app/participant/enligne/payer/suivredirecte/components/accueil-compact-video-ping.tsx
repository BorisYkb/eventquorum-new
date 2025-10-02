// src/app/participant/enligne/payer/suivredirecte/components/accueil-compact-video-ping.tsx
'use client';

import { useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';

import { Iconify } from 'src/components/iconify';

import type { ProgrammeActivity } from './programme/programme-data';

// ----------------------------------------------------------------------

interface AccueilCompactVideoProps {
    pinnedActivity: ProgrammeActivity | null;
    onWatchLive?: () => void;
}

/**
 * Section activité épinglée compacte pour les pages /payer/ (accueil3)
 * Affiche l'activité épinglée du programme avec un design simplifié
 * Intègre un player vidéo YouTube qui se lit automatiquement
 */
export function AccueilCompactVideo({ pinnedActivity, onWatchLive }: AccueilCompactVideoProps) {
    // Référence pour le conteneur iframe YouTube
    const iframeRef = useRef<HTMLIFrameElement>(null);
    // Référence pour le conteneur de la vidéo (pour le scroll automatique)
    const videoSectionRef = useRef<HTMLDivElement>(null);

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

    /**
     * Fonction pour scroller automatiquement vers la section vidéo
     * Se déclenche quand une nouvelle activité est épinglée
     */
    useEffect(() => {
        if (pinnedActivity && videoSectionRef.current) {
            // Scroll vers la section vidéo avec un petit délai pour l'animation
            setTimeout(() => {
                videoSectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }, [pinnedActivity?.id]);

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

    return (
        <Grid size={12}>
            <Box
                ref={videoSectionRef}
                sx={{
                    borderRadius: 2,
                    overflow: 'hidden'
                }}
            >
                {/* PREMIÈRE SECTION : Badge + Titre + Infos */}
                <Box
                    sx={{
                        mb: 3,
                        width: '100%'
                    }}
                >
                    {/* Badge de statut avec animation */}
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 1,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: pinnedActivity.status === 'En cours' ? 'transparent' :
                                pinnedActivity.status === 'Terminé' ? 'transparent' : 'grey.200',
                        }}
                    >
                        {/* Icône avec animation selon le statut */}
                        {pinnedActivity.status === 'En cours' && (
                            <Box
                                sx={{
                                    position: 'relative',
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    bgcolor: 'error.main',
                                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                                    '@keyframes pulse': {
                                        '0%, 100%': {
                                            opacity: 1,
                                        },
                                        '50%': {
                                            opacity: 0.5,
                                        },
                                    },
                                    '&::before': {
                                        content: '""',
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '50%',
                                        bgcolor: 'error.main',
                                        animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                                    },
                                    '@keyframes ping': {
                                        '75%, 100%': {
                                            transform: 'translate(-50%, -50%) scale(2)',
                                            opacity: 0,
                                        },
                                    },
                                }}
                            />
                        )}

                        {pinnedActivity.status === 'Terminé' && (
                            <Iconify
                                icon="solar:restart-bold"
                                width={16}
                                sx={{ color: 'info.main' }}
                            />
                        )}

                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '0.75rem', md: '0.875rem' },
                                color: pinnedActivity.status === 'En cours' ? 'error.main' :
                                    pinnedActivity.status === 'Terminé' ? 'info.main' : 'text.secondary',
                            }}
                        >
                            {pinnedActivity.status === 'En cours' ? 'En direct' :
                                pinnedActivity.status === 'Terminé' ? 'Replay' : pinnedActivity.status}
                        </Typography>
                    </Box>

                    {/* Titre et Informations complémentaires sur la même ligne */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 2
                        }}
                    >
                        {/* Titre de l'activité */}
                        <Typography
                            variant="h4"
                            sx={{
                                fontSize: { xs: '0.875rem', sm: '1.25rem', md: '1.5rem' },
                                fontWeight: 600,
                                lineHeight: 1.3,
                                color: 'text.primary',
                                flex: 1,
                                minWidth: 0,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: { xs: 'nowrap', sm: 'normal' }
                            }}
                        >
                            {pinnedActivity.title}
                        </Typography>

                        {/* Informations complémentaires */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                flexShrink: 0
                            }}
                        >
                            <Iconify
                                icon="solar:clock-circle-bold"
                                width={16}
                                sx={{ color: 'text.secondary' }}
                            />
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: { xs: '0.75rem', md: '1rem' },
                                    fontWeight: 500,
                                    color: 'text.secondary',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {pinnedActivity.time}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                {/* DEUXIÈME SECTION : Player vidéo YouTube ou Message selon le statut */}
                {pinnedActivity.status === 'Non démarré' ? (
                    /* Message si pas de vidéo disponible pour "Non démarré" */
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%'
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: { xs: 250, sm: 350, md: 300 },
                                borderRadius: 2,
                                bgcolor: 'grey.100',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid',
                                borderColor: 'divider'
                            }}
                        >
                            <Box sx={{ textAlign: 'center' }}>
                                <Iconify
                                    icon="solar:videocamera-record-outline"
                                    width={48}
                                    sx={{ color: 'grey.500', mb: 2 }}
                                />
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: { xs: '0.875rem', md: '1rem' }
                                    }}
                                >
                                    La diffusion démarrera prochainement
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                ) : pinnedActivity.youtubeVideoId && (
                    /* Player vidéo YouTube pour "En cours" et "Terminé" */
                    <Box
                        sx={{
                            width: '100%',
                            height: { xs: 250, sm: 400, md: 500 },
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: 3,
                            bgcolor: 'grey.900',
                            border: '1px solid',
                            borderColor: 'divider'
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
        </Grid>
    );
}