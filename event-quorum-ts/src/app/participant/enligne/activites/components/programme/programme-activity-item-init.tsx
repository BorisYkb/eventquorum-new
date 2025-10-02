// src/app/participant/enpresentiel/components/programme/programme-activity-item-init.tsx
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
import { _mock } from 'src/_mock';

import type { Activite } from 'src/app/participant/components/data/activite-data';

// ----------------------------------------------------------------------

interface ProgrammeActivityItemInitProps {
    activity: Activite;
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
 * Composant pour afficher un item d'activité disponible du programme initial
 */
export function ProgrammeActivityItemInit({ activity, fontSizes }: ProgrammeActivityItemInitProps) {
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
        // Navigation vers la page de détail des activités en présentiel
        router.push(`/participant/enligne/activites/${activity.id}`);
    };

    /**
     * Vérifier si l'activité a des prix null (paiement unique)
     */
    const hasNullPrices = () => {
        return activity.priceOptions.every(option => option.price === null);
    };

    /**
     * Obtenir les types de places disponibles ou "Paiement unique" ou "Gratuit"
     */
    const getAvailablePlaces = () => {
        if (hasNullPrices()) {
            return '';
        }

        // Vérifier si toutes les options sont gratuites
        const allFree = activity.priceOptions.every(option => option.price === 0);
        if (allFree) {
            return 'Gratuit';
        }

        return activity.priceOptions.map(option => option.label).join(', ');
    };

    /**
 * Vérifier si l'activité est entièrement gratuite
 */
    const hasAllFreePrices = () => {
        return activity.priceOptions.every(option => option.price === 0);
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
                        {/* Section gauche : Horaire + Date + Statut sur mobile */}
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

                        {/* Section centrale : Titre + Description courte */}
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
                                {getAvailablePlaces()}
                            </Typography>
                        </Box>

                        {/* Section droite : Chip de statut (masqué sur mobile car affiché dans section gauche) */}
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

                        {/* Informations sur les places */}
                        <Box>
                            {/* Options de prix */}
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                {!hasNullPrices() && !hasAllFreePrices() && (
                                    <>
                                        {activity.priceOptions.map((option) => (
                                            <Chip
                                                key={option.id}
                                                label={`${option.label}: ${option.price === 0
                                                    ? 'Gratuit'
                                                    : option.price != null
                                                        ? `${option.price.toLocaleString()} ${option.currency}`
                                                        : '----'
                                                    }`}
                                                size="small"
                                                variant="outlined"
                                                sx={{ ...fontSizes.chip, mb: 0.5, borderRadius: 0.5 }}
                                            />
                                        ))}
                                    </>
                                )}


                            </Stack>
                        </Box>

                        {/* Informations pratiques */}
                        <Box sx={{ pt: 1 }}>
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
                                    {activity.lieu}
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
                                    <Iconify icon="solar:users-group-rounded-bold" width={16} />
                                    <strong>Capacité:</strong> 200 places disponibles
                                </Typography>
                            </Stack>
                        </Box>

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