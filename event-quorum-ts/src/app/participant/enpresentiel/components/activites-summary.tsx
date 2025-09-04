// src/app/participant/enligne/components/activites-summary.tsx
'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { Label } from 'src/components/label';

import type { Activite, SelectedActivite } from './activites-selection';

// ----------------------------------------------------------------------

interface ActivitesSummaryProps {
    activites: Activite[];
    selectedActivites: SelectedActivite[];
}

export function ActivitesSummary({ activites, selectedActivites }: ActivitesSummaryProps) {
    const activitesSelectionnees = selectedActivites.map(selection => {
        const activite = activites.find(a => a.id === selection.activityId);
        const standingOption = activite?.priceOptions.find(p => p.id === selection.selectedStanding);

        if (!activite || !standingOption) return null;

        return {
            id: activite.id,
            title: activite.title,
            time: activite.time,
            selectedStanding: standingOption,
            prix: standingOption.price
        };
    }).filter((item): item is NonNullable<typeof item> => item !== null);

    const totalPrix = activitesSelectionnees.reduce((sum, activite) => sum + activite.prix, 0);

    return (
        <Box
            sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: 'background.neutral',
                height: 'fit-content'
            }}
        >
            <Typography variant="h6" sx={{ mb: 3 }}>
                Résumé des activités sélectionnées
            </Typography>

            <Stack spacing={2.5}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Activités sélectionnées
                    </Typography>
                    <Label color="primary">{activitesSelectionnees.length}</Label>
                </Box>

                {/* Liste des activités sélectionnées */}
                <Stack spacing={1.5}>
                    {activitesSelectionnees.map((activite) => (
                        <Box
                            key={activite.id}
                            sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
                        >
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {activite.title}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {activite.time}
                                </Typography>
                                <Typography variant="caption" color="primary.main" sx={{ display: 'block' }}>
                                    {activite.selectedStanding.label}
                                </Typography>
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 600,
                                    color: activite.prix === 0 ? 'success.main' : 'text.primary',
                                    ml: 1
                                }}
                            >
                                {activite.prix === 0 ? 'Gratuit' : `${activite.prix.toLocaleString()} FCFA`}
                            </Typography>
                        </Box>
                    ))}
                </Stack>

                {activitesSelectionnees.length > 0 && (
                    <>
                        <Divider sx={{ borderStyle: 'dashed' }} />

                        {/* Total */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="subtitle1">Total</Typography>
                            <Typography variant="h6" color="primary">
                                {totalPrix.toLocaleString()} FCFA
                            </Typography>
                        </Box>

                        <Divider sx={{ borderStyle: 'dashed' }} />
                    </>
                )}
            </Stack>

            {selectedActivites.length === 0 && (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                    Aucune activité sélectionnée
                </Typography>
            )}
        </Box>
    );
}