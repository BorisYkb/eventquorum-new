// src/app/participant/enpresentiel/payer/page.tsx
'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { CONFIG } from 'src/global-config';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';

import { usePopover } from 'minimal-shared/hooks';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';
import { DashboardContent } from 'src/layouts/dashboard';

import { AccueilWelcomePayer } from './components/accueil-welcome-payer';
import { AccueilCompactVideo } from './components/accueil-compact-video';
import { IntervenantCarousel } from '../../components/intervenant-carousel';
import { Footer } from '../../components/footer';

// ----------------------------------------------------------------------

/**
 * Données du programme pour les participants ayant payé
 */
const programmeData = [
    {
        id: '1',
        time: '08H00 - 9H00',
        title: 'OUVERTURE DU SALON ET DU SARA MARKET AU PUBLIC',
        description: 'Ouverture officielle du salon avec accueil des participants et découverte des espaces d\'exposition.',
        type: 'Ouverture',
        status: 'Terminé',
        statusColor: 'success' as const,
        hasDocument: true,
        hasVideo: true,
    },
    {
        id: '2',
        time: '09H00 - 12H00',
        title: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
        description: 'SOUS LA PRÉSIDENCE DE S.E.M. ALASSANE OUATTARA, À LA SALLE PLÉNIÈRE DU SITE DU SARA. REMISE DE KITS AUX JEUNES ENTREPRENEURS ET AUX FILIÈRES PAR LE PRÉSIDENT DE LA RÉPUBLIQUE.',
        type: 'Cérémonie',
        status: 'En cours',
        statusColor: 'warning' as const,
        hasDocument: true,
        hasVideo: true,
    },
    {
        id: '3',
        time: '09H00 - 12H00',
        title: 'POINT DE PRESSE',
        description: 'Conférence de presse avec les organisateurs et les personnalités présentes.',
        type: 'Conférence',
        status: 'Non démarré',
        statusColor: 'default' as const,
        hasDocument: true,
        hasVideo: true,
    },
    {
        id: '4',
        time: '09H00 - 12H00',
        title: 'PANEL DE HAUT NIVEAU (LES ASSISES DU SARA 2023)',
        description: 'Table ronde avec les experts du secteur agricole sur les enjeux et perspectives.',
        type: 'Panel',
        status: 'En cours',
        statusColor: 'warning' as const,
        hasDocument: true,
        hasVideo: true,
    },
    {
        id: '5',
        time: '19H00',
        title: 'FERMETURE DU SALON ET DU SARA MARKET AU PUBLIC',
        description: 'Fermeture des espaces d\'exposition au grand public.',
        type: 'Fermeture',
        status: 'Non démarré',
        statusColor: 'default' as const,
        hasDocument: true,
        hasVideo: true,
    },
    {
        id: '6',
        time: '19H00 - 22H00',
        title: 'NOCTURNES AU SARA VILLAGE (CONCERTS ET ANIMATIONS)',
        description: 'Soirée culturelle avec concerts et animations dans l\'espace village.',
        type: 'Animation',
        status: 'En cours',
        statusColor: 'warning' as const,
        hasVideo: true,
        hasDocument: true,
    },
];

// ----------------------------------------------------------------------

/**
 * Section programme pour participants ayant payé (accueil3)
 */
function AccueilProgrammePayer() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const infoPopover = usePopover();

    return (
        <Grid size={12}>
            <Card sx={{ borderRadius: { xs: 1, md: 2 }, overflow: 'hidden', height: 'fit-content' }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    {/* Header avec titre et popover info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem', lg: '1.5rem' }
                                }}
                            >
                                PROGRAMME SARA 2023
                            </Typography>

                            <IconButton
                                onClick={infoPopover.onOpen}
                                sx={{ color: 'primary.main' }}
                            >
                                <Iconify icon="solar:calendar-bold-duotone" />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Liste des activités avec accès amélioré */}
                    <Box>
                        {programmeData.map((item) => (
                            <Accordion
                                key={item.id}
                                sx={{
                                    mb: 1,
                                    borderRadius: '8px !important',
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                                    sx={{
                                        px: { xs: 1.5, md: 2 },
                                        py: 1,
                                        minHeight: { xs: 48, md: 60 },
                                        '& .MuiAccordionSummary-content': {
                                            alignItems: 'center',
                                        },
                                    }}
                                >
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                                        spacing={{ xs: 1, sm: 2 }}
                                        sx={{ width: '100%' }}
                                    >
                                        <Chip
                                            label={item.time}
                                            size="small"
                                            sx={{
                                                minWidth: { xs: 50, md: 60 },
                                                fontWeight: 600,
                                                bgcolor: 'primary.main',
                                                color: 'primary.contrastText',
                                                fontSize: { xs: '0.625rem', md: '0.75rem' }
                                            }}
                                        />

                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                flex: 1,
                                                fontWeight: 500,
                                                fontSize: { xs: '0.75rem', sm: '0.825rem', md: '0.875rem', lg: '1rem' }
                                            }}
                                        >
                                            {item.title}
                                        </Typography>

                                        <Chip
                                            label={item.status}
                                            size="small"
                                            color={item.statusColor}
                                            variant="soft"
                                            sx={{
                                                fontWeight: 500,
                                                fontSize: { xs: '0.625rem', md: '0.75rem' }
                                            }}
                                        />

                                        {/* Badge d'accès payé */}
                                        <Chip
                                            icon={<Iconify icon="solar:check-circle-bold" width={14} />}
                                            label="Accès"
                                            color="success"
                                            variant="filled"
                                            size="small"
                                            sx={{ fontSize: '0.625rem', fontWeight: 600 }}
                                        />
                                    </Stack>
                                </AccordionSummary>

                                <AccordionDetails sx={{ px: { xs: 1.5, md: 2 }, pb: 2 }}>
                                    <Stack spacing={1}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: { xs: '0.7rem', md: '0.875rem' }
                                            }}
                                        >
                                            Type d'activité: <strong>{item.type}</strong>
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' },
                                                lineHeight: { xs: 1.4, md: 1.5 }
                                            }}
                                        >
                                            {item.description}
                                        </Typography>

                                        {/* Actions pour participants payés */}
                                        {(item.hasDocument || item.hasVideo) && (
                                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                                {item.hasDocument && (
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        startIcon={<Box component="img" src={`${CONFIG.assetsDir}/assets/icons/files/ic-document.svg`}
                                                            sx={{
                                                                width: 18,  // 👈 taille fixe
                                                                height: 18, // 👈 taille fixe
                                                            }}
                                                        />}
                                                        sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}
                                                    >
                                                        Document
                                                    </Button>
                                                )}
                                                {item.hasVideo && (
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        startIcon={<Box component="img" src={`${CONFIG.assetsDir}/assets/icons/files/ic-video.svg`}
                                                            sx={{
                                                                width: 18,  // 👈 taille fixe
                                                                height: 18, // 👈 taille fixe
                                                            }}
                                                        />}
                                                        sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' } }}
                                                    >
                                                        Voir la vidéo
                                                    </Button>
                                                )}

                                                {item.status === 'En cours' && (
                                                    <Button
                                                        size="small"
                                                        variant="contained"
                                                        color="success"
                                                        startIcon={<Iconify icon="solar:login-3-bold" />}
                                                        sx={{
                                                            fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                                                            ml: 'auto'
                                                        }}
                                                    >
                                                        Rejoindre maintenant
                                                    </Button>
                                                )}
                                            </Stack>
                                        )}
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                </CardContent>

                {/* Popover informations pratiques */}
                <CustomPopover
                    open={infoPopover.open}
                    onClose={infoPopover.onClose}
                    anchorEl={infoPopover.anchorEl}
                    slotProps={{ arrow: { placement: 'top-center' } }}
                >
                    <Card sx={{ p: 3, borderRadius: 2, height: 'fit-content', minWidth: 300 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                                fontWeight: 600,
                                fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
                            }}
                        >
                            Informations pratiques
                        </Typography>

                        <Stack
                            direction={{ xs: 'row', md: 'column' }}
                            spacing={{ xs: 2, md: 2 }}
                            sx={{
                                overflowX: { xs: 'auto', md: 'visible' },
                                pb: { xs: 1, md: 0 }
                            }}
                        >
                            <Box sx={{ minWidth: { xs: 120, md: 'auto' } }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 0.5,
                                        fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.9375rem' }
                                    }}
                                >
                                    📅 Dates
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' }
                                    }}
                                >
                                    Du 29 septembre au 08 octobre 2023
                                </Typography>
                            </Box>

                            <Divider
                                orientation={isMobile ? 'vertical' : 'horizontal'}
                                flexItem
                                sx={{
                                    mx: { xs: 1, md: 0 },
                                    my: { xs: 0, md: 1 }
                                }}
                            />

                            <Box sx={{ minWidth: { xs: 120, md: 'auto' } }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        fontWeight: 600,
                                        mb: 0.5,
                                        fontSize: { xs: '0.75rem', sm: '0.875rem', md: '0.9375rem' }
                                    }}
                                >
                                    📍 Lieu
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' }
                                    }}
                                >
                                    Parc des Expositions d'Abidjan
                                </Typography>
                            </Box>
                        </Stack>
                    </Card>
                </CustomPopover>
            </Card>
        </Grid>
    );
}

// ----------------------------------------------------------------------

/**
 * Page principale /participant/enpresentiel/payer/ (accueil3)
 */
export default function EnPresentielPayerPage() {
    return (
        <DashboardContent>
            <Grid container spacing={3}>
                {/* Section 1 - Welcome personnalisé pour participants payés */}
                <AccueilWelcomePayer />

                {/* Section 2 - Vidéo compacte avec boutons d'action */}
                <AccueilCompactVideo />

                {/* Section 3 - Programme avec accès amélioré */}
                <AccueilProgrammePayer />

                {/* Section 4 - Sponsors/Footer */}

                <Grid size={12}>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <IntervenantCarousel />
                    </Box>
                </Grid>

                <Grid size={12}>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Footer />
                    </Box>
                </Grid>
            </Grid>
        </DashboardContent>
    );
}