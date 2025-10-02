// src/app/participant/enpresentiel/payer/mesinteractions/[id]/components/header-section.tsx

'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { SurveyStatusAnalytic } from 'src/app/participant/components/survey-status-analytic';

import type { SurveyData, FontSizes } from './types';

// ----------------------------------------------------------------------

interface HeaderSectionProps {
    surveyData: SurveyData;
    fontSizes: FontSizes;
    isMobile: boolean;
    onGoBack: () => void;
}

/**
 * Composant en-tête avec navigation et statistiques
 */
export function HeaderSection({ surveyData, fontSizes, isMobile, onGoBack }: HeaderSectionProps) {
    const theme = useTheme();

    return (
        <Box sx={{ mb: 3 }}>
            <Stack direction="column" spacing={2} sx={{ mb: 3 }}>
                {/* Titre et bouton retour */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        alignItems: isMobile ? 'flex-start' : 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            ...fontSizes.h4,
                            color: 'black',
                        }}
                    >
                        Titre de l'enquête: {surveyData.description}
                    </Typography>

                    {/* Bouton retour */}
                    <Button
                        variant="contained"
                        onClick={onGoBack}
                        sx={{
                            color: 'white',
                            backgroundColor: 'black',
                            textTransform: 'none',
                            alignSelf: isMobile ? 'flex-end' : 'auto',
                        }}
                    >
                        <Iconify icon="solar:arrow-left-linear" sx={fontSizes.iconSize} /> Retour
                    </Button>
                </Box>

                {/* Statistiques */}
                <Card
                    sx={{
                        maxWidth: '800px',
                        minWidth: { xs: '100%', sm: '300px' },
                        boxShadow: 1
                    }}
                >
                    <Scrollbar sx={{ minHeight: { xs: 80, sm: 100 } }}>
                        <Stack
                            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                            sx={{ py: 2, flexDirection: 'row' }}
                        >
                            <SurveyStatusAnalytic
                                title="Note obtenue"
                                value={surveyData.totalScore}
                                icon="solar:medal-star-bold-duotone"
                                color={theme.vars.palette.warning.main}
                                subtitle="Score final"
                            />
                            <SurveyStatusAnalytic
                                title="Statut de enquête"
                                value={surveyData.status}
                                icon="solar:check-circle-bold-duotone"
                                color={surveyData.statusColor}
                                subtitle="État actuel"
                            />
                        </Stack>
                    </Scrollbar>
                </Card>
            </Stack>
        </Box>
    );
}