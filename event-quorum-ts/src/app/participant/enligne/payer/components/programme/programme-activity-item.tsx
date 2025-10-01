// src/app/participant/components/programme/programme-activity-item.tsx
'use client';

import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Paper from '@mui/material/Paper';

import { Iconify } from 'src/components/iconify';
import { CONFIG } from 'src/global-config';
import { _mock } from 'src/_mock';

import type { ProgrammeActivity } from './programme-data';

// ----------------------------------------------------------------------

interface ProgrammeActivityItemProps {
    activity: ProgrammeActivity;
    fontSizes: any;
}

/**
 * Données simulées des intervenants
 */
const MOCK_SPEAKERS = [
    { name: 'Dr. Kouakou', specialty: 'Agronomie' },
    { name: 'Prof. Diallo', specialty: 'Innovation' },
    { name: 'M. Bamba', specialty: 'Tech' },
];

/**
 * Composant pour afficher un item d'activité du programme payée
 */
export function ProgrammeActivityItem({ activity, fontSizes }: ProgrammeActivityItemProps) {
    const router = useRouter();

    /**
     * Fonction pour obtenir la couleur du statut
     */
    const getStatusColor = () => {
        switch (activity.statusColor) {
            case 'success': return 'success.main';
            case 'warning': return 'warning.main';
            case 'error': return 'error.main';
            default: return 'error.main';
        }
    };

    /**
     * Gestion de la navigation vers le détail de l'activité
     */
    const handleViewDetails = () => {
        // Navigation vers la page de détail des activités payées
        router.push(`/participant/enligne/payer/activites/${activity.id}`);
    };

    /**
     * Gestion du téléchargement de document
     */
    const handleDownloadDocument = (e: React.MouseEvent) => {
        e.stopPropagation(); // Empêche la propagation vers l'accordion
        if (!activity.hasDocument) return;
        console.log(`Download document for activity: ${activity.id}`);
        // TODO: Implémenter la logique de téléchargement
    };

    /**
     * Gestion de la lecture vidéo
     */
    const handleWatchVideo = (e: React.MouseEvent) => {
        e.stopPropagation(); // Empêche la propagation vers l'accordion
        if (!activity.hasVideo) return;
        console.log(`Watch video for activity: ${activity.id}`);
        // TODO: Implémenter la logique de lecture vidéo
    };

    /**
     * Obtenir le type d'accès et prix payé
     */
    const getPaidAccessInfo = () => {
        if (activity.prix === null) {
            return '';
        }
        if (activity.prix === 0) {
            return 'Gratuit';
        }
        return `${activity.standing}: ${activity.prix.toLocaleString()} FCFA`;
    };

    return (
        <Accordion
            sx={{
                mb: 1,
                borderRadius: '8px !important',
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
                        {/* Section gauche : Horaire + Durée + Statut sur mobile */}
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
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    ...fontSizes.body2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5
                                }}
                            >
                                <Iconify icon="solar:clock-circle-outline" width={16} />
                                1 heure
                            </Typography>
                            {/* Statut affiché sur mobile */}
                            <Box sx={{ display: { xs: 'block', sm: 'none' }, mt: 0.5 }}>
                                <Chip
                                    label={activity.status}
                                    size="small"
                                    color={activity.statusColor}
                                    variant="soft"
                                    sx={{
                                        ...fontSizes.chip,
                                        fontWeight: 600,
                                        height: 20
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Section centrale : Titre + Type d'accès payé */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
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
                                    color: 'text.secondary',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {getPaidAccessInfo()}
                            </Typography>
                        </Box>

                        {/* Section droite : Chip de statut (masqué sur mobile) */}
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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
                        </Box>
                    </Stack>
                </AccordionSummary>
            </Paper>

            <AccordionDetails sx={{ px: { xs: 1.5, md: 2 }, pb: 2, pt: 0 }}>
                <Box sx={{ p: 2 }}>
                    <Stack spacing={2}>
                        {/* Informations pratiques */}
                        <Box sx={{ pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                            <Stack direction="column" spacing={1}>
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
                                    {activity.location}
                                </Typography>

                                {/* <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        ...fontSizes.body2
                                    }}
                                >
                                    Type d'activité: <strong>{activity.type}</strong>
                                </Typography> */}
                            </Stack>
                        </Box>

                        {/* Ressources disponibles */}
                        {(activity.hasDocument || activity.hasVideo) && (
                            <Box sx={{ pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{
                                        ...fontSizes.subtitle2,
                                        fontWeight: 600,
                                        mb: 1.5,
                                        color: 'text.primary'
                                    }}
                                >
                                    Ressources disponibles
                                </Typography>
                                <Stack direction="row" spacing={1} flexWrap="wrap">
                                    {activity.hasDocument && (
                                        <Button
                                            size="small"
                                            onClick={handleDownloadDocument}
                                            startIcon={
                                                <Box
                                                    component="img"
                                                    src={`${CONFIG.assetsDir}/assets/icons/files/ic-document.svg`}
                                                    sx={{ width: 18, height: 18 }}
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
                                            onClick={handleWatchVideo}
                                            startIcon={
                                                <Box
                                                    component="img"
                                                    src={`${CONFIG.assetsDir}/assets/icons/files/ic-video.svg`}
                                                    sx={{ width: 18, height: 18 }}
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
                            </Box>
                        )}

                        {/* Section Intervenants */}
                        <Box sx={{ pt: 1, borderTop: '1px solid', borderColor: 'divider' }}>
                            <Typography
                                variant="subtitle2"
                                sx={{
                                    ...fontSizes.subtitle2,
                                    fontWeight: 600,
                                    mb: 1.5,
                                    color: 'text.primary'
                                }}
                            >
                                Intervenants
                            </Typography>
                            <Stack direction="row" spacing={{ xs: 1, sm: 2 }} flexWrap="wrap">
                                {MOCK_SPEAKERS.slice(0, 4).map((speaker, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            minWidth: { xs: 60, sm: 80 }
                                        }}
                                    >
                                        <Avatar
                                            alt={speaker.name}
                                            src={_mock.image.avatar(index + 1)}
                                            sx={{
                                                width: { xs: 32, sm: 40 },
                                                height: { xs: 32, sm: 40 },
                                                mb: 0.5
                                            }}
                                        />
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                ...fontSizes.caption,
                                                fontWeight: 600,
                                                textAlign: 'center',
                                                color: 'text.primary',
                                                lineHeight: 1.2
                                            }}
                                        >
                                            {speaker.name}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                ...fontSizes.caption,
                                                textAlign: 'center',
                                                color: 'text.secondary',
                                                fontSize: { xs: '0.65rem', sm: '0.7rem' }
                                            }}
                                        >
                                            {speaker.specialty}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>

                        {/* Actions - Bouton en dernier */}
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ pt: 1 }}>
                            {/* Bouton pour consulter le détail */}
                            <Button
                                size="small"
                                variant="contained"
                                onClick={handleViewDetails}
                                startIcon={
                                    <Iconify icon="solar:eye-bold" width={18} />
                                }
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
                                Consulter le détail de l'activité
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}