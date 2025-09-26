// src/app/participant/enligne/payer/suivredirecte/components/programme/programme-activity-item-with-pin.tsx
'use client';

import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';

import type { ProgrammeActivity } from './programme-data';

// ----------------------------------------------------------------------

interface ProgrammeActivityItemWithPinProps {
    activity: ProgrammeActivity;
    fontSizes: any;
    isPinned: boolean;
    onPin: () => void;
}

/**
 * Composant pour afficher un item d'activité du programme avec système d'épinglage
 */
export function ProgrammeActivityItemWithPin({ activity, fontSizes, isPinned, onPin }: ProgrammeActivityItemWithPinProps) {
    const router = useRouter();

    /**
     * Détermine la couleur du Paper selon le statut
     */
    const getStatusColor = () => {
        switch (activity.statusColor) {
            case 'success': return 'success.main';
            case 'warning': return 'warning.main';
            default: return 'error.main';
        }
    };

    /**
     * Gestionnaire de navigation vers la page de détail
     */
    const handleViewDetail = () => {
        router.push(`/participant/enligne/payer/suivredirecte/activites/${activity.id}`);
    };

    return (
        <Accordion
            sx={{
                mb: 1,
                borderRadius: '8px !important',
                position: 'relative',
                boxShadow: 'none',
                border: 'none',
                '&:before': { display: 'none' }
            }}
        >
            {/* Paper au niveau Summary avec style de l'image */}
            <Paper
                variant="outlined"
                sx={{
                    borderLeft: `4px solid`,
                    borderLeftColor: getStatusColor(),
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    position: 'relative'
                }}
            >
                <AccordionSummary
                    expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                    sx={{
                        px: { xs: 1, sm: 2, md: 3 },  // Padding réduit sur mobile
                        py: { xs: 1.5, sm: 2 },
                        minHeight: { xs: 50, sm: 60, md: 70 },
                        '& .MuiAccordionSummary-content': {
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            margin: 0
                        },
                    }}
                >
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={{ xs: 1, sm: 2 }}
                        sx={{ width: '100%' }}
                    >
                        {/* Section gauche : Horaire + Durée */}
                        <Box sx={{ minWidth: { xs: 80, md: 120 } }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    ...fontSizes.infoBody,
                                    fontWeight: 700,
                                    mb: 0.5,
                                    color: 'text.primary'
                                }}
                            >
                                {activity.time}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    ...fontSizes.caption,
                                    color: 'text.secondary'
                                }}
                            >
                                Durée: 30min
                            </Typography>
                        </Box>

                        {/* Section centrale : Titre + Intervenant */}
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    ...fontSizes.subtitle2,
                                    fontWeight: 600,
                                    mb: 0.5,
                                    color: 'text.primary'
                                }}
                            >
                                {activity.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    ...fontSizes.body2,
                                    color: 'text.secondary'
                                }}
                            >
                                Intervenant: Marie Laurent
                            </Typography>
                        </Box>

                        {/* Section droite : Chip de statut */}
                        <Chip
                            label={activity.status}
                            size="small"
                            color={activity.statusColor}
                            variant="soft"
                            sx={{
                                ...fontSizes.chip,
                                fontWeight: 600
                            }}
                        />
                    </Stack>
                </AccordionSummary>

                {/* Bouton d'épinglage */}
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation();
                        onPin();
                    }}
                    sx={{
                        position: 'absolute',
                        bottom: 8,
                        right: 8,
                        width: 28,
                        height: 28,
                        bgcolor: isPinned ? 'primary.main' : 'grey.300',
                        color: isPinned ? 'primary.contrastText' : 'grey.600',
                        '&:hover': {
                            bgcolor: isPinned ? 'primary.dark' : 'grey.400',
                            transform: 'scale(1.1)'
                        },
                        transition: 'all 0.2s ease-in-out',
                        zIndex: 1
                    }}
                >
                    <Iconify
                        icon={isPinned ? "solar:pin-bold" : "solar:pin-outline"}
                        width={12}
                    />
                </IconButton>
            </Paper>

            <AccordionDetails sx={{ px: { xs: 1.5, md: 2 }, pb: 2, pt: 0 }}>
                <Box sx={{ p: 2 }}>
                    <Stack spacing={1.5}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                ...fontSizes.body2
                            }}
                        >
                            Type d'activité: <strong>{activity.type}</strong>
                        </Typography>

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
                                        Vidéo
                                    </Button>
                                )}
                            </Stack>
                        )}
                        <Button
                            size="small"
                            variant="contained"
                            startIcon={
                                <Iconify icon="solar:eye-bold" width={18} />
                            }
                            onClick={handleViewDetail}
                            sx={{
                                ...fontSizes.button,
                                borderRadius: 1,
                                bgcolor: 'common.black',
                                color: 'common.white',
                                '&:hover': {
                                    bgcolor: 'grey.800'
                                }
                            }}
                        >
                            Consulter le detail de l'activité
                        </Button>
                    </Stack>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}