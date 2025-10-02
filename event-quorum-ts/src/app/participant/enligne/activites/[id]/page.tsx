// src/app/participant/enpresentiel/activites/[id]/page.tsx

'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { useTheme, useMediaQuery, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import { DashboardContent } from 'src/layouts/dashboard';
import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { Image } from 'src/components/image';
import { Lightbox, useLightBox } from 'src/components/lightbox';

import { ACTIVITES_DISPONIBLES } from 'src/app/participant/components/data/activite-data';

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
const INTERVENANTS_EXTENDED = [
    {
        id: '1',
        nom: 'Dr. Kouakou',
        poste: 'Expert Agricole',
        specialty: 'Agronomie',
        bio: 'Spécialiste en développement agricole durable avec 15 ans d\'expérience en Afrique de l\'Ouest. Expert reconnu dans l\'amélioration des rendements agricoles et la gestion durable des ressources.',
        email: 'kouakou@sara2023.ci',
        phone: '+225 07 00 00 00',
        organisation: 'Institut Agricole de Côte d\'Ivoire',
        experience: '15 ans',
        domaines: ['Agriculture durable', 'Gestion des sols', 'Irrigation']
    },
    {
        id: '2',
        nom: 'Prof. Diallo',
        poste: 'Directeur Innovation',
        specialty: 'Innovation',
        bio: 'Pionnier des technologies agricoles intelligentes et de l\'agriculture de précision. Leader dans l\'intégration des nouvelles technologies au service de l\'agriculture africaine.',
        email: 'diallo@sara2023.ci',
        phone: '+225 07 11 11 11',
        organisation: 'Centre de Recherche Technologique',
        experience: '12 ans',
        domaines: ['AgriTech', 'Intelligence artificielle', 'Agriculture de précision']
    },
    {
        id: '3',
        nom: 'Mme Traoré',
        poste: 'Analyste Financier',
        specialty: 'Finance',
        bio: 'Experte en financement de projets agricoles et en microfinance rurale. Spécialisée dans l\'accompagnement financier des petits exploitants et des coopératives agricoles.',
        email: 'traore@sara2023.ci',
        phone: '+225 07 22 22 22',
        organisation: 'Banque de Développement Agricole',
        experience: '10 ans',
        domaines: ['Microfinance', 'Financement agricole', 'Gestion de projets']
    },
    {
        id: '4',
        nom: 'M. Bamba',
        poste: 'Tech Lead',
        specialty: 'Tech',
        bio: 'Développeur de solutions numériques pour l\'agriculture et la traçabilité. Expert en création de plateformes digitales pour améliorer la chaîne de valeur agricole.',
        email: 'bamba@sara2023.ci',
        phone: '+225 07 33 33 33',
        organisation: 'AgriTech Solutions CI',
        experience: '8 ans',
        domaines: ['Blockchain', 'Traçabilité', 'Applications mobiles']
    }
];

/**
 * Page de détail d'une activité disponible en présentiel
 */
export default function ActivityDetailPagePresentiel() {
    const params = useParams();
    const router = useRouter();
    const theme = useTheme();

    // Récupération de l'ID depuis l'URL
    const activityId = params.id as string;
    const activity = ACTIVITES_DISPONIBLES.find(act => act.id === activityId);

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

    // État pour la sélection de place
    const [selectedPriceOption, setSelectedPriceOption] = useState(activity?.priceOptions[0]?.id || '');
    // Ajouter ces états au début du composant (après les hooks isMobile, isTablet)
    const [selectedIntervenant, setSelectedIntervenant] = useState<typeof INTERVENANTS_EXTENDED[0] | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    // Handlers pour le dialog
    const handleOpenDialog = (intervenant: typeof INTERVENANTS_EXTENDED[0]) => {
        setSelectedIntervenant(intervenant);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setTimeout(() => setSelectedIntervenant(null), 300);
    };
    /**
     * Calcule les tailles de police responsives
     */
    const getResponsiveFontSizes = () => {
        if (isMobile) {
            return {
                h3: { fontSize: '1.375rem', fontWeight: 700 },
                h5: { fontSize: '1.125rem', fontWeight: 600 },
                h6: { fontSize: '1rem', fontWeight: 600 },
                subtitle1: { fontSize: '0.8rem', fontWeight: 500 },
                body1: { fontSize: '0.6rem', fontWeight: 400 },
                body2: { fontSize: '0.75rem', fontWeight: 400 },
                caption: { fontSize: '0.6875rem', fontWeight: 400 },
                chip: { fontSize: '0.625rem', fontWeight: 500 },
                button: { fontSize: '0.75rem' },
                iconSize: { width: 15, height: 15 }
            };
        }

        if (isTablet) {
            return {
                h3: { fontSize: '2rem', fontWeight: 700 },
                h5: { fontSize: '1.25rem', fontWeight: 600 },
                h6: { fontSize: '1.125rem', fontWeight: 600 },
                subtitle1: { fontSize: '1rem', fontWeight: 500 },
                body1: { fontSize: '0.7rem', fontWeight: 400 },
                body2: { fontSize: '0.875rem', fontWeight: 400 },
                caption: { fontSize: '0.75rem', fontWeight: 400 },
                chip: { fontSize: '0.6875rem', fontWeight: 500 },
                button: { fontSize: '0.875rem' },
                iconSize: { width: 17, height: 17 }
            };
        }

        // Desktop
        return {
            h3: { fontSize: '2.25rem', fontWeight: 700 },
            h5: { fontSize: '1.5rem', fontWeight: 600 },
            h6: { fontSize: '1.25rem', fontWeight: 600 },
            subtitle1: { fontSize: '1.125rem', fontWeight: 500 },
            body1: { fontSize: '0.8rem', fontWeight: 400 },
            body2: { fontSize: '1rem', fontWeight: 400 },
            caption: { fontSize: '0.875rem', fontWeight: 400 },
            chip: { fontSize: '0.75rem', fontWeight: 500 },
            button: { fontSize: '0.875rem' },
            iconSize: { width: 19, height: 19 }
        };
    };

    const fontSizes = getResponsiveFontSizes();

    /**
     * Vérifier si l'activité a des prix null (paiement unique)
     */
    const hasNullPrices = () => {
        return activity?.priceOptions.every(option => option.price === null) || false;
    };

    /**
     * Gestion du retour
     */
    const handleGoBack = () => {
        router.back();
    };

    /** Toutes les options sont gratuites ? */
    const hasAllFreePrices = () => {
        return activity?.priceOptions.length
            ? activity.priceOptions.every((o) => o.price === 0)
            : false;
    };



    /**
     * Obtenir la couleur du statut
     */
    const getStatusColor = () => {
        if (!activity) return 'default';
        switch (activity.statusColor) {
            case 'success': return 'success';
            case 'warning': return 'warning';
            case 'error': return 'error';
            case 'info': return 'info';
            default: return 'default';
        }
    };

    /**
     * Rendu de la galerie photos - Version horizontale en ligne
     */
    // --- Gallery : 3 cadres en ligne ---
    const renderGallery = () => (
        <>
            <Grid container spacing={1} sx={{ mb: 3 }}>
                {slides.slice(0, 3).map((slide, idx) => (
                    <Grid key={slide.src} size={{ xs: 12, sm: 4 }}>
                        <Image
                            alt={`Activity ${idx + 1}`}
                            src={slide.src}
                            ratio="1/1"
                            onClick={() => handleOpenLightbox(slide.src)}
                            sx={[
                                (theme) => ({
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    transition: theme.transitions.create('opacity'),
                                    '&:hover': { opacity: 0.85 },
                                    position: 'relative',
                                    ...(idx === 2 &&
                                        slides.length > 3 && {
                                        '&::after': {
                                            content: `"+" '${slides.length - 3}' " photos"`,
                                            position: 'absolute',
                                            inset: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: 'rgba(0,0,0,0.45)',
                                            color: 'white',
                                            fontWeight: 700,
                                            borderRadius: 2,
                                        },
                                    }),
                                }),
                            ]}
                        />
                    </Grid>
                ))}
            </Grid>

            <Lightbox index={selectedImage} slides={slides} open={openLightbox} close={handleCloseLightbox} />
        </>
    );


    /**
     * Rendu des intervenants - Version ligne complète en bas
     */
    const renderIntervenants = () => (
        <>
            <Box sx={{ mt: 6, mb: 3 }}>
                <Typography variant="h5" sx={{ ...fontSizes.h5, mb: 3, textAlign: 'center' }}>
                    Intervenants de l'activité
                </Typography>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)'
                    },
                    gap: { xs: 2, sm: 2, md: 3 }
                }}>
                    {INTERVENANTS_EXTENDED.map((intervenant, index) => (
                        <Card
                            key={intervenant.id}
                            onClick={() => handleOpenDialog(intervenant)}
                            sx={{
                                textAlign: 'center',
                                p: { xs: 2.5, md: 3 },
                                cursor: 'pointer',
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                    boxShadow: 6,
                                }
                            }}
                        >
                            <Avatar
                                alt={intervenant.nom}
                                src={`${CONFIG.assetsDir}/assets/images/mock/avatar/avatar-${index + 1}.webp`}
                                sx={{
                                    width: { xs: 80, sm: 90, md: 100 },
                                    height: { xs: 80, sm: 90, md: 100 },
                                    mx: 'auto',
                                    mb: 2,
                                    border: '3px solid',
                                    borderColor: 'primary.lighter'
                                }}
                            />

                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 600,
                                    mb: 0.5,
                                    fontSize: { xs: '0.9375rem', sm: '1rem', md: '1.125rem' }
                                }}
                            >
                                {intervenant.nom}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    mb: 0.5,
                                    fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.9375rem' }
                                }}
                            >
                                {intervenant.poste}
                            </Typography>

                            <Chip
                                label={intervenant.specialty}
                                size="small"
                                color="primary"
                                variant="soft"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: { xs: '0.75rem', sm: '0.8125rem' }
                                }}
                            />

                            <Typography
                                variant="caption"
                                color="primary.main"
                                sx={{
                                    display: 'block',
                                    mt: 1.5,
                                    fontWeight: 600,
                                    fontSize: { xs: '0.75rem', sm: '0.8125rem' }
                                }}
                            >
                                Cliquez pour voir le profil
                            </Typography>
                        </Card>
                    ))}
                </Box>
            </Box>

            {/* Dialog avec les détails de l'intervenant */}
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                fullScreen={isMobile}
            >
                {selectedIntervenant && (
                    <>
                        <DialogTitle sx={{ pb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Avatar
                                    alt={selectedIntervenant.nom}
                                    src={`${CONFIG.assetsDir}/assets/images/mock/avatar/avatar-${INTERVENANTS_EXTENDED.findIndex(i => i.id === selectedIntervenant.id) + 1}.webp`}
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        border: '2px solid',
                                        borderColor: 'primary.main'
                                    }}
                                />
                                <Box sx={{ flex: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        {selectedIntervenant.nom}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {selectedIntervenant.poste}
                                    </Typography>
                                </Box>
                                <IconButton
                                    onClick={handleCloseDialog}
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8
                                    }}
                                >
                                    <Iconify icon="solar:close-circle-bold" />
                                </IconButton>
                            </Box>
                        </DialogTitle>

                        <Divider />

                        <DialogContent sx={{ py: 3 }}>
                            <Stack spacing={3}>
                                {/* Spécialité */}
                                <Box>
                                    <Chip
                                        label={selectedIntervenant.specialty}
                                        color="primary"
                                        variant="soft"
                                        sx={{ fontWeight: 600 }}
                                    />
                                </Box>

                                {/* Bio */}
                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                        À propos
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                                        {selectedIntervenant.bio}
                                    </Typography>
                                </Box>

                                {/* Expérience */}
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                        <Iconify icon="solar:case-round-bold" sx={{ color: 'info.main', width: 20, height: 20 }} />
                                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                            Expérience
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2" color="text.secondary">
                                        {selectedIntervenant.experience} d'expérience professionnelle
                                    </Typography>
                                </Box>

                                {/* Domaines d'expertise */}
                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                        Domaines d'expertise
                                    </Typography>
                                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                        {selectedIntervenant.domaines.map((domaine, idx) => (
                                            <Chip
                                                key={idx}
                                                label={domaine}
                                                size="small"
                                                variant="outlined"
                                                sx={{ mb: 1 }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>

                                <Divider />

                                {/* Organisation */}
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                    <Iconify icon="solar:buildings-2-bold" sx={{ color: 'info.main', width: 22, height: 22, mt: 0.25 }} />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
                                            Organisation
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {selectedIntervenant.organisation}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Email */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Iconify icon="solar:letter-bold" sx={{ color: 'success.main', width: 22, height: 22 }} />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
                                            Email
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {selectedIntervenant.email}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Téléphone */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Iconify icon="solar:phone-bold" sx={{ color: 'warning.main', width: 22, height: 22 }} />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.25 }}>
                                            Téléphone
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {selectedIntervenant.phone}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </DialogContent>

                        <DialogActions sx={{ px: 3, pb: 2 }}>
                            <Button onClick={handleCloseDialog} variant="contained" fullWidth>
                                Fermer
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
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
                            L'activité demandée n'existe pas ou n'est plus disponible.
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
                {/* PREMIÈRE LIGNE : Titre + Bouton retour */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    flexDirection: { xs: 'column-reverse', sm: 'row' },
                    gap: 2,
                    mb: 3
                }}>
                    <Typography variant="h3" sx={{ ...fontSizes.h3, flex: 1 }}>
                        Activité :
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<Iconify icon="solar:arrow-left-linear" sx={fontSizes.iconSize} />}
                        onClick={handleGoBack}
                        sx={{
                            textTransform: 'none',
                            ...fontSizes.button,
                            flexShrink: 0
                        }}
                    >
                        Retour
                    </Button>
                </Box>

                {/* TITRE DE L'ACTIVITÉ */}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={3}
                    sx={{ mb: 1 }}
                    flexWrap="wrap"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                >
                    <Typography variant="h3" sx={{ ...fontSizes.h3, flex: 1 }}>
                        {activity.title}
                    </Typography>

                </Stack>

                {/* DEUXIÈME LIGNE : Méta-informations */}
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={3}
                    sx={{ mb: 4 }}
                    flexWrap="wrap"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Iconify icon="solar:calendar-date-bold" sx={{ color: 'primary.main', ...fontSizes.iconSize }} />
                        <Typography variant="body1" sx={fontSizes.body1}>{activity.date}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Iconify icon="solar:clock-circle-outline" sx={{ color: 'info.main', ...fontSizes.iconSize }} />
                        <Typography variant="body1" sx={fontSizes.body1}>{activity.time}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Iconify icon="solar:map-point-outline" sx={{ color: 'error.main', ...fontSizes.iconSize }} />
                        <Typography variant="body1" sx={fontSizes.body1}>{activity.lieu}</Typography>
                    </Box>

                </Stack>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={3}
                    sx={{ mb: 4 }}
                    flexWrap="wrap"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                >

                    <Chip
                        label={activity.status}
                        size="medium"
                        color={getStatusColor()}
                        variant="soft"
                        sx={{
                            ...fontSizes.chip,
                            fontWeight: 600,
                            px: 2
                        }}
                    />
                </Stack>

                {/* SECTION PRINCIPALE : 2/3 + 1/3 pour plus d'espace à la sidebar */}
                <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mb: 4 }}>
                    {/* 2/3 : Contenu principal */}
                    <Grid size={{ xs: 12, lg: 8 }}>
                        <Stack spacing={4}>
                            {/* Description */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Iconify icon="solar:tag-outline" sx={{ color: 'warning.main', ...fontSizes.iconSize }} />
                                <Typography variant="body1" sx={fontSizes.body1}>Type de l'actiité: Conférence</Typography>
                            </Box>
                            {/* <Box>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        ...fontSizes.body1,
                                        lineHeight: 1.6,
                                        color: 'text.primary'
                                    }}
                                >
                                    {activity.description}
                                </Typography>
                            </Box> */}

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
                                    Cette activité vise à présenter les dernières innovations et techniques adaptées au contexte ivoirien.
                                    Les participants découvriront des solutions pratiques et des méthodes éprouvées pour améliorer leur pratique professionnelle.
                                </Typography>
                            </Box>

                            {/* Galerie photos - En ligne */}
                            <Box>
                                <Typography variant="h6" sx={{ ...fontSizes.h6, mb: 2 }}>
                                    Galerie photos
                                </Typography>
                                {renderGallery()}
                            </Box>
                        </Stack>
                    </Grid>

                    {/* 1/4 : Sidebar - Type d'accès */}
                    <Grid size={{ xs: 12, lg: 4 }}>
                        <Card sx={{ position: 'sticky', top: 20 }}>
                            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                                <Typography variant="h6" sx={{ ...fontSizes.h6, mb: 2 }}>
                                    Type d'accès
                                </Typography>

                                <Stack spacing={2}>
                                    {/* Affichage du type de paiement */}
                                    {hasNullPrices() ? (
                                        // Paiement unique pour l'événement (tous les prix === null)
                                        <Box
                                            sx={{
                                                p: 2,
                                                borderRadius: 1,
                                                bgcolor: 'primary.lighter',
                                                border: '1px solid',
                                                borderColor: 'primary.light',
                                                textAlign: 'center'
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    ...fontSizes.subtitle1,
                                                    fontWeight: 600,
                                                    color: 'primary.main',
                                                    mb: 0.5
                                                }}
                                            >
                                                Accès à toutes les activités
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    ...fontSizes.h6,
                                                    fontWeight: 700,
                                                    color: 'primary.main'
                                                }}
                                            >
                                                20 000 FCFA
                                            </Typography>
                                        </Box>
                                    ) : hasAllFreePrices() ? (
                                        // Tous les types d'accès sont gratuits → afficher seulement "Gratuit" en vert
                                        <Box
                                            sx={{
                                                p: 2,
                                                bgcolor: 'success.lighter',
                                                borderRadius: 1,
                                                border: '1px solid',
                                                borderColor: 'success.light',
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                sx={{ ...fontSizes.subtitle1, mb: 1, textAlign: 'center', color: 'success.main', }}
                                            >
                                                Gratuit
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    ...fontSizes.h6,
                                                    color: 'success.main',
                                                    fontWeight: 700,
                                                    textAlign: 'center',
                                                }}
                                            >
                                                0 FCFA
                                            </Typography>
                                        </Box>

                                    ) : (
                                        // Cas normal : on liste les types avec leur prix
                                        <Box>
                                            <Stack spacing={1}>
                                                {activity.priceOptions.map((option) => (
                                                    <Box
                                                        key={option.id}
                                                        sx={{
                                                            p: 1.5,
                                                            border: '1px solid',
                                                            borderColor: 'divider',
                                                            borderRadius: 1,
                                                            bgcolor: 'grey.50',
                                                            textAlign: 'center',
                                                        }}
                                                    >
                                                        <Typography variant="body2" sx={{ ...fontSizes.body2, fontWeight: 600 }}>
                                                            {option.label}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                ...fontSizes.body2,
                                                                color: option.price === 0 ? 'success.main' : 'primary.main',
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {option.price === 0
                                                                ? 'Gratuit'
                                                                : option.price != null
                                                                    ? `${option.price.toLocaleString()} ${option.currency}`
                                                                    : '----'}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Stack>
                                        </Box>
                                    )}


                                    {/* Informations pratiques */}
                                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                                        <Typography variant="subtitle2" sx={{ ...fontSizes.subtitle1, mb: 1 }}>
                                            À savoir
                                        </Typography>

                                        <Stack spacing={0.5}>
                                            <Typography variant="caption" color="text.secondary" sx={fontSizes.caption}>
                                                • Arrivée 15min avant le début
                                            </Typography>
                                            {/* <Typography variant="caption" color="text.secondary" sx={fontSizes.caption}>
                                                • Présentation du badge obligatoire
                                            </Typography> */}
                                            <Typography variant="caption" color="text.secondary" sx={fontSizes.caption}>
                                                • Supports fournis sur place
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={fontSizes.caption}>
                                                • Capacité limitée à 200 participants
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* DERNIÈRE LIGNE : Intervenants sur toute la largeur */}
                {renderIntervenants()}
            </Container>
        </DashboardContent>
    );
}