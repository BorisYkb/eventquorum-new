// src/app/participant/enligne/payer/suivredirecte/components/accueil-programme-section-2-ping.tsx

'use client';

import { useState } from 'react';
import { usePopover } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Iconify } from 'src/components/iconify';
import { CustomTabs } from 'src/components/custom-tabs';
import { CustomPopover } from 'src/components/custom-popover';

import { PROGRAMME_DAYS, ProgrammeActivity } from './programme/programme-data';
import { ProgrammeActivityItemWithPin } from './programme/programme-activity-item-with-pin';

// ----------------------------------------------------------------------

interface AccueilProgrammeSection2Props {
    pinnedActivity: ProgrammeActivity | null;
    onPinActivity: (activity: ProgrammeActivity | null) => void;
}

/**
 * Composant Sidebar pour les types de paiement
 * Identique à celui de AccueilProgrammeSection2
 */
function PaymentTypesSidebar({ fontSizes }: { fontSizes: any }) {
    return (
        <Card sx={{ borderRadius: { xs: 1, md: 2 }, overflow: 'hidden', height: 'fit-content' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography
                    variant="h6"
                    sx={{
                        ...fontSizes.h6,
                        mb: 2,
                        fontWeight: 600,
                        color: 'text.primary'
                    }}
                >
                    Type d'accès à l'évènement
                </Typography>

                <Stack spacing={2}>
                    {/* Section Gratuit */}
                    <Box
                        sx={{
                            p: 2,
                            borderRadius: 1,
                            bgcolor: 'success.lighter',
                            border: '1px solid',
                            borderColor: 'success.light'
                        }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{
                                ...fontSizes.subtitle2,
                                fontWeight: 600,
                                color: 'success.main',
                                textAlign: 'center'
                            }}
                        >
                            Gratuit
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                ...fontSizes.h6,
                                fontWeight: 700,
                                color: 'success.main',
                                textAlign: 'center'
                            }}
                        >
                            0 FCFA
                        </Typography>
                    </Box>

                    {/* Section Prix unique */}
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
                                ...fontSizes.subtitle2,
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

                    <Box
                        sx={{
                            p: 2,
                            borderRadius: 1,
                            bgcolor: 'warning.lighter',     // ✅ fond "warning"
                            border: '1px solid',
                            borderColor: 'warning.light',   // ✅ bordure assortie
                            textAlign: 'center',
                            color: 'text.primary',          // ✅ texte par défaut en noir
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                ...fontSizes.h6,
                                fontWeight: 700,
                                color: 'text.primary',        // ✅ noir
                            }}
                        >
                            PAYANT
                        </Typography>

                        <Typography
                            variant="subtitle2"
                            sx={{
                                ...fontSizes.subtitle2,
                                fontWeight: 600,
                                color: 'text.primary',        // ✅ noir
                                mb: 0.5,
                            }}
                        >
                            Pour certaines activités
                        </Typography>
                    </Box>


                    {/* Section Types d'entrée */}
                    <Box
                        sx={{
                            p: 2,
                            borderRadius: 1,
                            bgcolor: 'grey.50',
                            border: '1px solid',
                            borderColor: 'grey.300'
                        }}
                    >

                        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
                            <Box sx={{ textAlign: 'center', minWidth: 60 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        ...fontSizes.subtitle2,
                                        fontWeight: 600,
                                        color: 'text.secondary'
                                    }}
                                >
                                    Standard
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        ...fontSizes.h6,
                                        fontWeight: 700,
                                        color: 'text.primary'
                                    }}
                                >
                                    5 000 FCFA
                                </Typography>
                            </Box>

                        </Stack>

                    </Box>
                    {/* Section Types d'entrée */}
                    <Box
                        sx={{
                            p: 2,
                            borderRadius: 1,
                            bgcolor: 'grey.50',
                            border: '1px solid',
                            borderColor: 'grey.300'
                        }}
                    >

                        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">

                            <Box sx={{ textAlign: 'center', minWidth: 60 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        ...fontSizes.subtitle2,
                                        fontWeight: 600,
                                        color: 'text.secondary'
                                    }}
                                >
                                    VIP
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        ...fontSizes.h6,
                                        fontWeight: 700,
                                        color: 'text.primary'
                                    }}
                                >
                                    10 000 FCFA
                                </Typography>
                            </Box>

                        </Stack>
                    </Box>
                    {/* Section Types d'entrée */}
                    <Box
                        sx={{
                            p: 2,
                            borderRadius: 1,
                            bgcolor: 'grey.50',
                            border: '1px solid',
                            borderColor: 'grey.300'
                        }}
                    >

                        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">

                            <Box sx={{ textAlign: 'center', minWidth: 60 }}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        ...fontSizes.subtitle2,
                                        fontWeight: 600,
                                        color: 'text.secondary'
                                    }}
                                >
                                    VVIP
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        ...fontSizes.h6,
                                        fontWeight: 700,
                                        color: 'text.primary'
                                    }}
                                >
                                    15 000 FCFA
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
}

/**
 * Section programme pour les pages d'accueil - Version avec navigation par jours et système d'épinglage
 * Maintenant avec sidebar identique à AccueilProgrammeSection2
 */
export default function AccueilProgrammeSection2Ping({ pinnedActivity, onPinActivity }: AccueilProgrammeSection2Props) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const infoPopover = usePopover();

    // État pour gérer l'onglet actif
    const [currentDay, setCurrentDay] = useState(PROGRAMME_DAYS[0].id);

    /**
     * Fonction pour calculer les tailles de police responsives
     * Identique à AccueilProgrammeSection2
     */
    const getResponsiveFontSizes = () => {
        if (isMobile) {
            return {
                h5: { fontSize: '0.9rem', fontWeight: 600 },
                h6: { fontSize: '0.8rem', fontWeight: 600 },
                subtitle2: { fontSize: '0.7rem', fontWeight: 500 },
                body2: { fontSize: '0.7rem', fontWeight: 400 },
                infoSubtitle: { fontSize: '0.7rem', fontWeight: 600 },
                infoBody: { fontSize: '0.6rem', fontWeight: 400 },
                button: { fontSize: '0.6rem' },
                chip: { fontSize: '0.6rem' },
                caption: { fontSize: '0.6rem' },
                iconSize: { width: 20, height: 20 }
            };
        }

        if (isTablet) {
            return {
                h5: { fontSize: '1.125rem', fontWeight: 600 },
                h6: { fontSize: '1rem', fontWeight: 600 },
                subtitle2: { fontSize: '0.8125rem', fontWeight: 500 },
                body2: { fontSize: '0.75rem', fontWeight: 400 },
                infoSubtitle: { fontSize: '0.8125rem', fontWeight: 600 },
                infoBody: { fontSize: '0.75rem', fontWeight: 400 },
                button: { fontSize: '0.6875rem' },
                chip: { fontSize: '0.6875rem' },
                caption: { fontSize: '0.6875rem' },
                iconSize: { width: 22, height: 22 }
            };
        }

        // Desktop - tailles par défaut
        return {
            h5: { fontSize: '1.25rem', fontWeight: 600 },
            h6: { fontSize: '1.125rem', fontWeight: 600 },
            subtitle2: { fontSize: '0.875rem', fontWeight: 500 },
            body2: { fontSize: '0.875rem', fontWeight: 400 },
            infoSubtitle: { fontSize: '0.875rem', fontWeight: 600 },
            infoBody: { fontSize: '0.8125rem', fontWeight: 400 },
            button: { fontSize: '0.75rem' },
            chip: { fontSize: '0.75rem' },
            caption: { fontSize: '0.75rem' },
            iconSize: { width: 25, height: 25 }
        };
    };

    const fontSizes = getResponsiveFontSizes();

    /**
     * Gestionnaire de changement d'onglet
     */
    const handleDayChange = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentDay(newValue);
    };

    /**
     * Gestionnaire d'épinglage d'une activité
     * IMPORTANT : Ce système d'épinglage ne doit PAS être modifié
     */
    const handlePinActivity = (activity: ProgrammeActivity) => {
        // Si l'activité est déjà épinglée, la désépingler
        if (pinnedActivity?.id === activity.id) {
            onPinActivity(null);
        } else {
            onPinActivity(activity);
        }
    };

    /**
     * Récupération des données du jour actuel
     */
    const currentDayData = PROGRAMME_DAYS.find(day => day.id === currentDay) || PROGRAMME_DAYS[0];

    return (
        <Grid container spacing={2} sx={{ width: '100%' }}>
            {/* Colonne principale - Programme */}
            <Grid size={{ xs: 12, lg: 8 }}>
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

                        {/* Navigation par jours avec CustomTabs */}
                        <Box sx={{ mb: 3 }}>
                            <CustomTabs
                                value={currentDay}
                                onChange={handleDayChange}
                                sx={{
                                    borderRadius: 1,
                                    width: {
                                        md: '350px',
                                        lg: '400px',
                                    },
                                    '& .MuiTab-root': {
                                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        minHeight: { xs: '36px', sm: '40px' },
                                    }
                                }}
                            >
                                {PROGRAMME_DAYS.map((day) => (
                                    <Tab
                                        key={day.id}
                                        value={day.id}
                                        label={
                                            <Box sx={{ textAlign: 'center' }}>
                                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                    {day.label}
                                                </Typography>
                                                <Typography variant="caption" sx={{ fontSize: '0.7rem', opacity: 0.7 }}>
                                                    {day.date}
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                ))}
                            </CustomTabs>
                        </Box>

                        {/* Liste des activités du jour sélectionné avec système d'épinglage */}
                        <Box>
                            {currentDayData.activities.length > 0 ? (
                                currentDayData.activities.map((activity) => (
                                    <ProgrammeActivityItemWithPin
                                        key={activity.id}
                                        activity={activity}
                                        fontSizes={fontSizes}
                                        isPinned={pinnedActivity?.id === activity.id}
                                        onPin={() => handlePinActivity(activity)}
                                    />
                                ))
                            ) : (
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        Aucune activité programmée pour ce jour
                                    </Typography>
                                </Box>
                            )}
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

            {/* Sidebar - Types de paiement (ajouté pour correspondre à AccueilProgrammeSection2) */}
            <Grid size={{ xs: 12, lg: 4 }}>
                <PaymentTypesSidebar fontSizes={fontSizes} />
            </Grid>
        </Grid>
    );
}