// src/app/participant/enligne/payer/activites/[id]/page.tsx

'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useTheme, useMediaQuery, IconButton } from '@mui/material';

import { DashboardContent } from 'src/layouts/dashboard';
import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { Image } from 'src/components/image';
import { Lightbox, useLightBox } from 'src/components/lightbox';

import { ACTIVITES_PAYEES } from '../components/activites-payees-data';

import type { ActivitePayee } from '../components/activites-payees-data';

// ----------------------------------------------------------------------

/**
 * Données statiques des photos pour la galerie
 */
const ACTIVITY_PHOTOS = [
    { imageUrl: `${CONFIG.assetsDir}/assets/background/background-3.webp` },
    { imageUrl: `${CONFIG.assetsDir}/assets/background/background-7.webp` },
    { imageUrl: `${CONFIG.assetsDir}/assets/background/background-3.webp` },
    { imageUrl: `${CONFIG.assetsDir}/assets/background/background-5.webp` },
    { imageUrl: `${CONFIG.assetsDir}/assets/background/background-5.webp` },
    { imageUrl: `${CONFIG.assetsDir}/assets/background/background-6.webp` },
    { imageUrl: `${CONFIG.assetsDir}/assets/background/background-7.webp` },
];

/**
 * Données statiques des intervenants
 */
const INTERVENANTS = [
    {
        id: '1',
        nom: 'Kendra Cremin',
        poste: 'Expert Agricole',
        avatar: 'KC',
        color: 'primary.main'
    },
    {
        id: '2',
        nom: 'Dennis Jacobson',
        poste: 'Directeur Technique',
        avatar: 'DJ',
        color: 'secondary.main'
    },
    {
        id: '3',
        nom: 'Patricia Wilkinson',
        poste: 'Chercheur Innovation',
        avatar: 'PW',
        color: 'info.main'
    },
    {
        id: '4',
        nom: 'Marie Laurent',
        poste: 'Spécialiste Financement',
        avatar: 'ML',
        color: 'warning.main'
    }
];

/**
 * Page de détail d'une activité spécifique
 */
export default function ActivityDetailPage() {
    const params = useParams();
    const router = useRouter();
    const theme = useTheme();

    // Récupération de l'ID depuis l'URL
    const activityId = params.id as string;
    const activity = ACTIVITES_PAYEES.find(act => act.id === activityId);

    // Hooks pour la responsivité
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    // Gestion de la galerie photos
    const slides = ACTIVITY_PHOTOS.map((photo) => ({ src: photo.imageUrl }));
    const {
        selected: selectedImage,
        open: openLightbox,
        onOpen: handleOpenLightbox,
        onClose: handleCloseLightbox,
    } = useLightBox(slides);

    /**
     * Calcule les tailles de police responsives
     */
    const getResponsiveFontSizes = () => {
        if (isMobile) {
            return {
                h3: { fontSize: '1.375rem', fontWeight: 700 },
                h5: { fontSize: '1.125rem', fontWeight: 600 },
                h6: { fontSize: '1rem', fontWeight: 600 },
                subtitle1: { fontSize: '0.875rem', fontWeight: 500 },
                body1: { fontSize: '0.875rem', fontWeight: 400 },
                body2: { fontSize: '0.75rem', fontWeight: 400 },
                caption: { fontSize: '0.6875rem', fontWeight: 400 },
                chip: { fontSize: '0.625rem', fontWeight: 500 },
                button: { fontSize: '0.75rem' },
                iconSize: { width: 18, height: 18 }
            };
        }

        if (isTablet) {
            return {
                h3: { fontSize: '2rem', fontWeight: 700 },
                h5: { fontSize: '1.25rem', fontWeight: 600 },
                h6: { fontSize: '1.125rem', fontWeight: 600 },
                subtitle1: { fontSize: '1rem', fontWeight: 500 },
                body1: { fontSize: '1rem', fontWeight: 400 },
                body2: { fontSize: '0.875rem', fontWeight: 400 },
                caption: { fontSize: '0.75rem', fontWeight: 400 },
                chip: { fontSize: '0.6875rem', fontWeight: 500 },
                button: { fontSize: '0.875rem' },
                iconSize: { width: 20, height: 20 }
            };
        }

        // Desktop
        return {
            h3: { fontSize: '2.25rem', fontWeight: 700 },
            h5: { fontSize: '1.5rem', fontWeight: 600 },
            h6: { fontSize: '1.25rem', fontWeight: 600 },
            subtitle1: { fontSize: '1.125rem', fontWeight: 500 },
            body1: { fontSize: '1.125rem', fontWeight: 400 },
            body2: { fontSize: '1rem', fontWeight: 400 },
            caption: { fontSize: '0.875rem', fontWeight: 400 },
            chip: { fontSize: '0.75rem', fontWeight: 500 },
            button: { fontSize: '0.875rem' },
            iconSize: { width: 22, height: 22 }
        };
    };

    const fontSizes = getResponsiveFontSizes();

    /**
     * Gestion du retour
     */
    const handleGoBack = () => {
        router.back();
    };

    /**
     * Gestion du téléchargement de document
     */
    const handleDownloadDocument = () => {
        if (!activity?.hasDocument || !activity?.documentUrl) return;
        console.log(`Download document: ${activity.documentUrl}`);
        // TODO: Implémenter téléchargement
    };

    /**
     * Gestion de la lecture vidéo
     */
    const handleWatchVideo = () => {
        if (!activity?.hasVideo || !activity?.videoUrl) return;
        console.log(`Watch video: ${activity.videoUrl}`);
        // TODO: Implémenter lecture vidéo
    };

    /**
     * Rendu de la galerie photos
     */
    /**
 * Rendu de la galerie photos
 */
    const renderGallery = () => (
        <>
            <Box
                sx={{
                    gap: 1,
                    display: 'grid',
                    mb: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                    height: { xs: 'auto', sm: 400, md: 550 }
                }}
            >
                {/* Image principale */}
                <Image
                    alt="Activity main"
                    src={slides[0]?.src}
                    ratio={isMobile ? "16/9" : "1/1"}
                    onClick={() => handleOpenLightbox(slides[0]?.src)}
                    sx={[
                        (theme) => ({
                            borderRadius: 2,
                            cursor: 'pointer',
                            transition: theme.transitions.create('opacity'),
                            '&:hover': { opacity: 0.4 },
                            position: 'relative',
                            // Badge pour mobile
                            ...(isMobile && {
                                '&::after': {
                                    content: `"+${slides.length - 1} photos"`,
                                    position: 'absolute',
                                    bottom: 8,
                                    right: 8,
                                    backgroundColor: 'rgba(0,0,0,0.7)',
                                    color: 'white',
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 1,
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                }
                            })
                        }),
                    ]}
                />

                {/* Grille des images secondaires - masquée sur mobile */}
                <Box sx={{
                    gap: 1,
                    display: { xs: 'none', sm: 'grid' },
                    gridTemplateColumns: 'repeat(2, 1fr)'
                }}>
                    {slides.slice(1, 4).map((slide, index) => (
                        <Image
                            key={slide.src}
                            alt={`Activity ${index + 1}`}
                            src={slide.src}
                            ratio="1/1"
                            onClick={() => handleOpenLightbox(slide.src)}
                            sx={[
                                (theme) => ({
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    transition: theme.transitions.create('opacity'),
                                    '&:hover': { opacity: 0.8 },
                                    position: 'relative',
                                    ...(index === 2 && {
                                        '&::after': {
                                            content: '"+7 photos"',
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'rgba(0,0,0,0.6)',
                                            color: 'white',
                                            fontSize: '0.875rem',
                                            fontWeight: 600,
                                            borderRadius: 2,
                                        }
                                    })
                                }),
                            ]}
                        />
                    ))}
                </Box>
            </Box>

            <Lightbox
                index={selectedImage}
                slides={slides}
                open={openLightbox}
                close={handleCloseLightbox}
            />
        </>
    );

    /**
     * Rendu de l'en-tête avec informations clés
     */
    const renderHeader = () => (
        <Box sx={{ mb: 4 }}>
            {/* Méta-informations */}
            <Stack direction="row" spacing={2} sx={{ mb: 2 }} flexWrap="wrap">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Iconify icon="solar:calendar-date-bold" sx={{ color: 'primary.main', ...fontSizes.iconSize }} />
                    <Typography variant="body2" sx={fontSizes.body2}>15-17 Février 2025</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Iconify icon="solar:clock-circle-outline" sx={{ color: 'info.main', ...fontSizes.iconSize }} />
                    <Typography variant="body2" sx={fontSizes.body2}>{activity?.time}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Iconify icon="solar:map-point-outline" sx={{ color: 'error.main', ...fontSizes.iconSize }} />
                    <Typography variant="body2" sx={fontSizes.body2}>Palais de la Culture</Typography>
                </Box>
                {/* Statut de l'activité */}
                <Box sx={{ textAlign: 'center' }}>
                    <Chip
                        label={activity?.status}
                        size="medium"
                        color={activity?.statusColor}
                        variant="soft"
                        sx={{
                            ...fontSizes.chip,
                            fontWeight: 600,
                            px: 2
                        }}
                    />
                </Box>
            </Stack>

            {/* Titre principal */}
            <Typography variant="h3" sx={{ ...fontSizes.h3, mb: 2 }}>
                Technologies Innovantes pour l'Agriculture Africaine Durable
            </Typography>

            {/* Description */}
            <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                    ...fontSizes.body1,
                    lineHeight: 1.6,
                    mb: 3
                }}
            >
                Le SARA 2025 présente une session révolutionnaire dédiée aux technologies agricoles de pointe adaptées au contexte africain. Cette activité phare rassemble les meilleurs experts en agrotechnologie, chercheurs et entrepreneurs agricoles pour explorer les solutions innovantes qui transformeront l'agriculture africaine.
            </Typography>

            {/* Objectifs */}
            <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Iconify icon="solar:target-bold" sx={{ color: 'success.main', ...fontSizes.iconSize }} />
                    <Typography variant="h6" sx={fontSizes.h6}>
                        Objectifs de l'Activité
                    </Typography>
                </Box>

                <Typography
                    variant="body2"
                    sx={{
                        ...fontSizes.body2,
                        color: 'text.secondary',
                        lineHeight: 1.5
                    }}
                >
                    <strong>Présentation des Technologies Émergentes :</strong> Découvrez les dernières innovations en agriculture de précision, intelligence artificielle et biotechnologies adaptées aux conditions climatiques africaines.
                </Typography>
            </Box>
        </Box>
    );

    /**
     * Rendu du carousel des intervenants
     */
    /**
 * Rendu du carousel des intervenants
 */
    const renderIntervenants = () => (
        <Box sx={{ mt: 5, mb: 3 }}>
            <Typography variant="h5" sx={{ ...fontSizes.h5, mb: 3, textAlign: 'center' }}>
                Intervenants de l'activité
            </Typography>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(4, 1fr)'
                },
                gap: 2
            }}>
                {INTERVENANTS.map((intervenant, index) => (
                    <Card
                        key={intervenant.id}
                        sx={{
                            textAlign: 'center',
                            p: 2,
                            height: 'fit-content',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 4,
                                '& .intervenant-details': {
                                    opacity: 1,
                                    visibility: 'visible'
                                }
                            }
                        }}
                    >
                        {/* Photo de l'intervenant */}
                        <Image
                            alt={intervenant.nom}
                            src={ACTIVITY_PHOTOS[index % ACTIVITY_PHOTOS.length].imageUrl}
                            ratio="1/1"
                            sx={{
                                width: { xs: 80, md: 100 },
                                height: { xs: 80, md: 100 },
                                borderRadius: '50%',
                                mx: 'auto',
                                mb: 2
                            }}
                        />

                        <Typography variant="subtitle1" sx={{ ...fontSizes.subtitle1, fontWeight: 600 }}>
                            {intervenant.nom}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={fontSizes.body2}>
                            {intervenant.poste}
                        </Typography>

                        {/* Détails au survol */}
                        <Box
                            className="intervenant-details"
                            sx={{
                                position: 'absolute',
                                bottom: -80,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: 'calc(100% + 40px)',
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider',
                                boxShadow: 3,
                                p: 2,
                                borderRadius: 2,
                                opacity: 0,
                                visibility: 'hidden',
                                transition: 'all 0.3s ease-in-out',
                                zIndex: 10,
                                fontSize: { xs: '0.75rem', md: '0.8125rem' },
                                lineHeight: 1.4,
                                textAlign: 'left',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: -8,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: 0,
                                    height: 0,
                                    borderLeft: '8px solid transparent',
                                    borderRight: '8px solid transparent',
                                    borderBottom: '8px solid',
                                    borderBottomColor: 'background.paper'
                                }
                            }}
                        >
                            <Typography variant="body2" sx={{ mb: 1.5, ...fontSizes.body2 }}>
                                Lorem ipsum dolor sit amet consectetur adipiscing elit. Blanditiis voluptatibus! Natus amet voluptatem est dolor, alias fugiat sed praesentium molestias.
                            </Typography>

                            {/* Icônes sociales */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                <Box sx={{
                                    width: 28,
                                    height: 28,
                                    bgcolor: '#1877F2',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    '&:hover': { transform: 'scale(1.1)' }
                                }}>
                                    <Iconify icon="ic:baseline-facebook" sx={{ color: 'white', fontSize: '16px' }} />
                                </Box>

                                <Box sx={{
                                    width: 28,
                                    height: 28,
                                    bgcolor: '#0A66C2',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    '&:hover': { transform: 'scale(1.1)' }
                                }}>
                                    <Iconify icon="mdi:linkedin" sx={{ color: 'white', fontSize: '16px' }} />
                                </Box>

                                <Box sx={{
                                    width: 28,
                                    height: 28,
                                    bgcolor: '#1DA1F2',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    '&:hover': { transform: 'scale(1.1)' }
                                }}>
                                    <Iconify icon="mdi:twitter" sx={{ color: 'white', fontSize: '16px' }} />
                                </Box>

                                <Box sx={{
                                    width: 28,
                                    height: 28,
                                    bgcolor: '#FF0000',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    '&:hover': { transform: 'scale(1.1)' }
                                }}>
                                    <Iconify icon="mdi:youtube" sx={{ color: 'white', fontSize: '16px' }} />
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    );
    // Activité non trouvée
    if (!activity) {
        return (
            <DashboardContent>
                <Container sx={{ py: 4 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color="error" gutterBottom>
                            Activité non trouvée
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            L'activité demandée n'existe pas ou a été supprimée.
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon="solar:arrow-left-linear" />}
                            onClick={handleGoBack}
                        >
                            Retour
                        </Button>
                    </Box>
                </Container>
            </DashboardContent>
        );
    }

    return (
        <DashboardContent>
            <Container sx={{ py: { xs: 1, md: 2 } }}>
                {/* Bouton retour */}
                <Box sx={{ mb: 3 }}>
                    <Button
                        variant="outlined"
                        startIcon={<Iconify icon="solar:arrow-left-linear" sx={fontSizes.iconSize} />}
                        onClick={handleGoBack}
                        sx={{
                            textTransform: 'none',
                            ...fontSizes.button
                        }}
                    >
                        Retour
                    </Button>
                </Box>

                {/* En-tête avec informations clés */}
                {renderHeader()}

                {/* Galerie photos */}
                {renderGallery()}

                <Grid container spacing={{ xs: 3, md: 4 }}>
                    {/* Colonne principale */}
                    <Grid size={{ xs: 12, lg: 8 }}>
                        {/* Informations de paiement */}
                        <Card sx={{ mb: 3 }}>
                            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                <Typography variant="h6" sx={{ ...fontSizes.h6, mb: 3 }}>
                                    Informations de paiement
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Iconify icon="solar:calendar-add-outline" sx={{ color: 'primary.main', ...fontSizes.iconSize }} />
                                            <Box>
                                                <Typography variant="subtitle2" sx={fontSizes.subtitle1}>
                                                    Date de paiement
                                                </Typography>
                                                <Typography variant="body2" sx={fontSizes.body2}>
                                                    {activity.datePaiement}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Iconify icon="solar:ticket-outline" sx={{ color: 'primary.main', ...fontSizes.iconSize }} />
                                            <Box>
                                                <Typography variant="subtitle2" sx={fontSizes.subtitle1}>
                                                    Type d'accès
                                                </Typography>
                                                <Typography variant="body2" sx={fontSizes.body2}>
                                                    {activity.standing}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid size={{ xs: 12, sm: 4 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Iconify icon="solar:wallet-outline" sx={{ color: 'success.main', ...fontSizes.iconSize }} />
                                            <Box>
                                                <Typography variant="subtitle2" sx={fontSizes.subtitle1}>
                                                    Prix payé
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        ...fontSizes.body2,
                                                        color: 'success.main',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    {activity.prix === 0 ? 'Gratuit' : `${activity.prix.toLocaleString()} FCFA`}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Sidebar */}
                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Card>
                            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                <Typography variant="h6" sx={{ ...fontSizes.h6, mb: 2 }}>
                                    Infmations pratiques
                                </Typography>

                                <Stack spacing={2}>

                                    {/* Ressources disponibles */}
                                    {(activity.hasDocument || activity.hasVideo) && (
                                        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                                            <Typography variant="subtitle1" sx={{ ...fontSizes.subtitle1, mb: 2 }}>
                                                Ressources disponibles
                                            </Typography>

                                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                                                {activity.hasDocument && (
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        startIcon={
                                                            <Box
                                                                component="img"
                                                                src={`${CONFIG.assetsDir}/assets/icons/files/ic-document.svg`}
                                                                sx={{ width: 16, height: 16 }}
                                                            />
                                                        }
                                                        onClick={handleDownloadDocument}
                                                        disabled={activity.status === 'Non démarré'}
                                                        sx={{
                                                            textTransform: 'none',
                                                            ...fontSizes.button
                                                        }}
                                                    >
                                                        Document
                                                    </Button>
                                                )}

                                                {activity.hasVideo && (
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        size="small"
                                                        startIcon={
                                                            <Box
                                                                component="img"
                                                                src={`${CONFIG.assetsDir}/assets/icons/files/ic-video.svg`}
                                                                sx={{ width: 16, height: 16 }}
                                                            />
                                                        }
                                                        onClick={handleWatchVideo}
                                                        disabled={activity.status === 'Non démarré'}
                                                        sx={{
                                                            textTransform: 'none',
                                                            ...fontSizes.button
                                                        }}
                                                    >
                                                        Vidéo
                                                    </Button>
                                                )}
                                            </Stack>
                                        </Box>
                                    )}

                                    {/* Actions rapides */}
                                    <Stack spacing={1} >

                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            fullWidth
                                            size="small"
                                            startIcon={<Iconify icon="solar:share-outline" />}
                                            sx={{
                                                textTransform: 'none',
                                                ...fontSizes.button
                                            }}
                                        >
                                            Partager
                                        </Button>
                                    </Stack>

                                    {/* Informations pratiques */}
                                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                                        <Typography variant="subtitle2" sx={{ ...fontSizes.subtitle1, mb: 1 }}>
                                            À savoir
                                        </Typography>

                                        <Stack
                                            spacing={1}
                                            direction={{ xs: 'row', sm: 'row', md: 'column' }} // responsive
                                            alignItems="flex-start" // garde l’alignement correct
                                            flexWrap="wrap" // permet le retour à la ligne sur mobile si nécessaire
                                        >
                                            <Typography variant="caption" color="text.secondary" sx={fontSizes.caption}>
                                                • Arrivée 15min avant le début
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={fontSizes.caption}>
                                                • Badge participant obligatoire
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={fontSizes.caption}>
                                                • Supports fournis sur place
                                            </Typography>
                                        </Stack>
                                    </Box>

                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Carousel des intervenants */}
                {renderIntervenants()}
            </Container>
        </DashboardContent>
    );
}