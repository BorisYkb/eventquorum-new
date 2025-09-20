// src/app/participant/components/programme/programme-activity-item.tsx
'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';

import type { ProgrammeActivity } from './programme-data';

// ----------------------------------------------------------------------

interface ProgrammeActivityItemProps {
    activity: ProgrammeActivity;
    fontSizes: any;
}

/**
 * Composant pour afficher un item d'activité du programme
 */
export function ProgrammeActivityItem({ activity, fontSizes }: ProgrammeActivityItemProps) {
    return (
        <Accordion
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
                        label={activity.time}
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
                        {activity.title}
                    </Typography>

                    <Chip
                        label={activity.status}
                        size="small"
                        color={activity.statusColor}
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
                        Type d'activité: <strong>{activity.type}</strong>
                    </Typography>

                    {/* Nouvelle ligne pour la localisation */}
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            ...fontSizes.body2,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                        }}
                    >
                        <Iconify icon="solar:map-point-bold" width={16} />
                        Lieu: <strong>{activity.location}</strong>
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            ...fontSizes.body2,
                            lineHeight: { xs: 1.4, md: 1.5 }
                        }}
                    >
                        {activity.description}
                    </Typography>

                    {(activity.hasDocument || activity.hasVideo) && (
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                            {activity.hasDocument && (
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
                            {activity.hasVideo && (
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
    );
}