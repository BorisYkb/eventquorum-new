// File: src/sections/guichet/GuichetActivitesSummary.tsx

'use client';

/**
 * COMPOSANT: GuichetActivitesSummary
 * 
 * Version spécifique au guichet du résumé des activités
 * Affiche les activités déjà payées avec un prix de 0
 * Calcule le total uniquement sur les nouvelles activités
 */

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import type { Activite, SelectedActivite } from './activites-selection';

// ============================================
// TYPES
// ============================================
interface GuichetActivitesSummaryProps {
    /** Liste complète des activités disponibles */
    activites: Activite[];

    /** Activités sélectionnées par l'utilisateur */
    selectedActivites: SelectedActivite[];

    /** IDs des activités déjà payées (à afficher avec prix = 0) */
    disabledActivities?: string[];
}

// ============================================
// COMPOSANT
// ============================================
export function GuichetActivitesSummary({
    activites,
    selectedActivites,
    disabledActivities = [],
}: GuichetActivitesSummaryProps) {

    /**
     * Récupère les détails d'une activité sélectionnée
     */
    const getActiviteDetails = (selection: SelectedActivite) => {
        const activite = activites.find((a) => a.id === selection.activityId);
        if (!activite) return null;

        // Si priceOptions === null, l'activité n'a pas de prix
        const hasNoPriceOptions = !activite.priceOptions || activite.priceOptions.length === 0;

        if (hasNoPriceOptions) {
            return {
                title: activite.title,
                time: activite.time,
                standing: null,
                price: null,
            };
        }

        const standingOption = activite.priceOptions?.find((p) => p.id === selection.selectedStanding);
        const resolvedOption =
            standingOption ||
            (selection.selectedStanding === 'gratuit'
                ? { id: 'gratuit', label: 'Gratuit', price: 0, currency: 'FCFA' }
                : undefined);

        if (!resolvedOption) return null;

        return {
            title: activite.title,
            time: activite.time,
            standing: resolvedOption.label,
            price: resolvedOption.price,
        };
    };

    /**
     * Calcule le montant total des nouvelles activités uniquement
     */
    const calculateTotal = () => {
        return newActivities.reduce((sum, selection) => {
            const details = getActiviteDetails(selection);
            if (!details) return sum;
            return sum + (details.price || 0);
        }, 0);
    };

    /**
     * Filtre les activités pour ne garder que les NOUVELLES
     * (exclut les activités déjà payées)
     */
    const getNewActivitiesOnly = () => {
        return selectedActivites.filter(
            (selection) => !disabledActivities.includes(selection.activityId)
        );
    };

    const newActivities = getNewActivitiesOnly();
    const total = calculateTotal();

    // ============================================
    // RENDER
    // ============================================
    return (
        <Card sx={{ p: { xs: 2, md: 3 }, bgcolor: 'background.neutral' }}>
            <Typography
                variant="h6"
                sx={{
                    mb: 2,
                    fontWeight: 600,
                    fontSize: { xs: '1rem', md: '1.25rem' },

                }}
            >
                Résumé des activités sélectionnées
            </Typography>

            {/* Affiche le nombre d'activités sélectionnées (uniquement les nouvelles) */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 2,
                }}
            >
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                >
                    Activités sélectionnées
                </Typography>
                <Box
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: '50%',
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                    }}
                >
                    {newActivities.length}
                </Box>
            </Box>

            {newActivities.length === 0 ? (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        textAlign: 'center',
                        py: 3,
                        fontSize: { xs: '0.875rem', md: '1rem' },
                    }}
                >
                    Aucune activité sélectionnée
                </Typography>
            ) : (
                <Stack spacing={1.5}>
                    {/* Affiche UNIQUEMENT les nouvelles activités (non désactivées) */}
                    {newActivities.map((selection) => {
                        const details = getActiviteDetails(selection);
                        if (!details) return null;

                        return (
                            <Box
                                key={selection.activityId}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    p: 1.5,
                                    // bgcolor: 'background.neutral',
                                    borderRadius: 1,
                                }}
                            >
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontWeight: 500,
                                            fontSize: { xs: '0.8125rem', md: '0.875rem' },
                                        }}
                                    >
                                        {details.title}
                                    </Typography>
                                    {details.standing && (
                                        <Typography
                                            variant="caption"
                                            color="primary.main"
                                            sx={{
                                                fontSize: { xs: '0.7rem', md: '0.75rem' },
                                            }}
                                        >
                                            {details.standing}
                                        </Typography>
                                    )}
                                </Box>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontWeight: 600,
                                        ml: 1,
                                        fontSize: { xs: '0.8125rem', md: '0.875rem' },
                                        color: details.price === 0 ? 'success.main' : 'text.primary',
                                    }}
                                >
                                    {details.price === null
                                        ? '—' // ✅ activité sans prix
                                        : details.price === 0
                                            ? 'Gratuit' // ✅ activité gratuite
                                            : `${details.price.toLocaleString()} FCFA` // ✅ activité payante
                                    }

                                </Typography>
                            </Box>
                        );
                    })}

                    <Divider sx={{ my: 1 }} />

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 1.5,
                            bgcolor: 'primary.lighter',
                            borderRadius: 1,
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 600,
                                fontSize: { xs: '0.9375rem', md: '1rem' },
                            }}
                        >
                            Total
                        </Typography>
                        <Typography
                            variant="h6"
                            color="primary"
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '1.125rem', md: '1.25rem' },
                            }}
                        >
                            {total.toLocaleString()} FCFA
                        </Typography>
                    </Box>
                </Stack>
            )}
        </Card>
    );
}