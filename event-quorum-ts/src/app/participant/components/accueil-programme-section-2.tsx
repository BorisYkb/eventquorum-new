// src/app/participant/components/accueil-programme-section-2.tsx
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
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import { CONFIG } from 'src/global-config';

import { usePopover } from 'minimal-shared/hooks';

import { Iconify } from 'src/components/iconify';
import { CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

/**
 * Données du programme pour les pages d'accueil
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
 * Section programme pour les pages d'accueil - Version avec tailles de police responsives
 */
export default function AccueilProgrammeSection2() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const infoPopover = usePopover();

    /**
     * Fonction pour calculer les tailles de police responsives
     */
    const getResponsiveFontSizes = () => {
        if (isMobile) {
            return {
                // Titre principal
                h5: { fontSize: '1rem', fontWeight: 600 },
                // Titre d'accordéon
                subtitle2: { fontSize: '0.75rem', fontWeight: 500 },
                // Texte descriptif
                body2: { fontSize: '0.7rem', fontWeight: 400 },
                // Informations pratiques - titre
                h6: { fontSize: '0.875rem', fontWeight: 600 },
                // Informations pratiques - sous-titre
                infoSubtitle: { fontSize: '0.75rem', fontWeight: 600 },
                // Informations pratiques - corps
                infoBody: { fontSize: '0.65rem', fontWeight: 400 },
                // Boutons
                button: { fontSize: '0.625rem' },
                // Chips
                chip: { fontSize: '0.625rem' },
                // Icône du calendrier
                iconSize: { width: 20, height: 20 }
            };
        }

        if (isTablet) {
            return {
                h5: { fontSize: '1.125rem', fontWeight: 600 },
                subtitle2: { fontSize: '0.8125rem', fontWeight: 500 },
                body2: { fontSize: '0.75rem', fontWeight: 400 },
                h6: { fontSize: '1rem', fontWeight: 600 },
                infoSubtitle: { fontSize: '0.8125rem', fontWeight: 600 },
                infoBody: { fontSize: '0.75rem', fontWeight: 400 },
                button: { fontSize: '0.6875rem' },
                chip: { fontSize: '0.6875rem' },
                iconSize: { width: 22, height: 22 }
            };
        }

        // Desktop - tailles par défaut
        return {
            h5: { fontSize: '1.25rem', fontWeight: 600 },
            subtitle2: { fontSize: '0.875rem', fontWeight: 500 },
            body2: { fontSize: '0.875rem', fontWeight: 400 },
            h6: { fontSize: '1.125rem', fontWeight: 600 },
            infoSubtitle: { fontSize: '0.875rem', fontWeight: 600 },
            infoBody: { fontSize: '0.8125rem', fontWeight: 400 },
            button: { fontSize: '0.75rem' },
            chip: { fontSize: '0.75rem' },
            iconSize: { width: 25, height: 25 }
        };
    };

    const fontSizes = getResponsiveFontSizes();

    return (
        <Grid size={12}>
            <Card sx={{ borderRadius: { xs: 1, md: 2 }, overflow: 'hidden', height: 'fit-content' }}>
                <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    {/* Header avec titre et popover info */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Typography
                                variant="h5"
                                sx={fontSizes.h5}
                            >
                                PROGRAMME SARA 2023
                            </Typography>

                            <IconButton
                                onClick={infoPopover.onOpen}
                                sx={{ color: 'primary.main' }}
                            >
                                <Iconify
                                    icon="solar:calendar-bold-duotone"
                                    sx={fontSizes.iconSize}
                                />
                            </IconButton>
                        </Box>
                    </Box>

                    {/* Liste des activités */}
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
                                                bgcolor: 'primary.main',
                                                color: 'primary.contrastText',
                                                ...fontSizes.chip,
                                                fontWeight: 600
                                            }}
                                        />

                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                flex: 1,
                                                ...fontSizes.subtitle2
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
                                                ...fontSizes.chip,
                                                fontWeight: 500
                                            }}
                                        />
                                    </Stack>
                                </AccordionSummary>

                                <AccordionDetails sx={{ px: { xs: 1.5, md: 2 }, pb: 2 }}>
                                    <Stack spacing={1}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'text.secondary',
                                                ...fontSizes.body2
                                            }}
                                        >
                                            Type d'activité: <strong>{item.type}</strong>
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                ...fontSizes.body2,
                                                lineHeight: { xs: 1.4, md: 1.5 }
                                            }}
                                        >
                                            {item.description}
                                        </Typography>

                                        {(item.hasDocument || item.hasVideo) && (
                                            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                                {item.hasDocument && (
                                                    <Button
                                                        size="small"
                                                        startIcon={
                                                            <Box
                                                                component="img"
                                                                src={`${CONFIG.assetsDir}/assets/icons/files/ic-document.svg`}
                                                                sx={{
                                                                    width: 18,
                                                                    height: 18,
                                                                }}
                                                            />
                                                        }
                                                        sx={{
                                                            ...fontSizes.button,
                                                            borderRadius: 1,
                                                            border: 1.5,
                                                            borderColor: 'divider'
                                                        }}
                                                    >
                                                        Document
                                                    </Button>
                                                )}
                                                {item.hasVideo && (
                                                    <Button
                                                        size="small"
                                                        startIcon={
                                                            <Box
                                                                component="img"
                                                                src={`${CONFIG.assetsDir}/assets/icons/files/ic-video.svg`}
                                                                sx={{
                                                                    width: 18,
                                                                    height: 18,
                                                                }}
                                                            />
                                                        }
                                                        sx={{
                                                            ...fontSizes.button,
                                                            borderRadius: 1,
                                                            border: 1.5,
                                                            borderColor: 'divider'
                                                        }}
                                                    >
                                                        Voir la vidéo
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
                                ...fontSizes.h6
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
                                        mb: 0.5,
                                        ...fontSizes.infoSubtitle
                                    }}
                                >
                                    📅 Dates
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        ...fontSizes.infoBody
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
                                        mb: 0.5,
                                        ...fontSizes.infoSubtitle
                                    }}
                                >
                                    📍 Lieu
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        ...fontSizes.infoBody
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