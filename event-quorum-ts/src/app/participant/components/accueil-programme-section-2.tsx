// src/app/participant/components/accueil-programme-section-2.tsx

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

import { PROGRAMME_DAYS } from './programme/programme-data';
import { ProgrammeActivityItem } from './programme/programme-activity-item';

// ----------------------------------------------------------------------

/**
 * Section programme pour les pages d'accueil - Version avec navigation par jours
 */
export default function AccueilProgrammeSection2() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const infoPopover = usePopover();

    // État pour gérer l'onglet actif
    const [currentDay, setCurrentDay] = useState(PROGRAMME_DAYS[0].id);

    /**
     * Fonction pour calculer les tailles de police responsives
     */
    const getResponsiveFontSizes = () => {
        if (isMobile) {
            return {
                h5: { fontSize: '1rem', fontWeight: 600 },
                subtitle2: { fontSize: '0.75rem', fontWeight: 500 },
                body2: { fontSize: '0.7rem', fontWeight: 400 },
                h6: { fontSize: '0.875rem', fontWeight: 600 },
                infoSubtitle: { fontSize: '0.75rem', fontWeight: 600 },
                infoBody: { fontSize: '0.65rem', fontWeight: 400 },
                button: { fontSize: '0.625rem' },
                chip: { fontSize: '0.625rem' },
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

    /**
     * Gestionnaire de changement d'onglet
     */
    const handleDayChange = (event: React.SyntheticEvent, newValue: string) => {
        setCurrentDay(newValue);
    };

    /**
     * Récupération des données du jour actuel
     */
    const currentDayData = PROGRAMME_DAYS.find(day => day.id === currentDay) || PROGRAMME_DAYS[0];

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

                    {/* Navigation par jours avec CustomTabs */}
                    <Box sx={{ mb: 3 }}>
                        <CustomTabs
                            value={currentDay}
                            onChange={handleDayChange}
                            // variant={isMobile ? 'scrollable' : 'standard'}
                            sx={{
                                borderRadius: 1,
                                width: {
                                    md: '450px',  // à partir de "md" (tablette/desktop)
                                    lg: '455px', // à partir de "lg" (grands écrans)
                                },
                                '& .MuiTab-root': {
                                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    minHeight: { xs: '36px', sm: '40px' },
                                    px: { xs: 2, sm: 3 },
                                }
                                
                                // minWidth: 'fit-content'
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

                    {/* Liste des activités du jour sélectionné */}
                    <Box>
                        {currentDayData.activities.length > 0 ? (
                            currentDayData.activities.map((activity) => (
                                <ProgrammeActivityItem
                                    key={activity.id}
                                    activity={activity}
                                    fontSizes={fontSizes}
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
    );
}