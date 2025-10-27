// src/sections/superviseur/participants/detail/SuperviseurActivitiesSection.tsx

'use client';

import { Box, Typography, Stack, Chip } from '@mui/material';

/**
 * Props du composant SuperviseurActivitiesSection
 */
interface SuperviseurActivitiesSectionProps {
    /** Liste des activités du participant */
    activites: string[];
}

/**
 * Composant SuperviseurActivitiesSection
 * Section affichant les activités de l'invité (lecture seule)
 */
const SuperviseurActivitiesSection: React.FC<SuperviseurActivitiesSectionProps> = ({
    activites,
}) => {
    return (
        <Box>
            <Typography
                variant="body1"
                sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}
            >
                Activités de l'invité
            </Typography>

            {activites.length > 0 ? (
                <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                    {activites.map((activite, index) => (
                        <Chip
                            key={index}
                            label={activite}
                            sx={{
                                backgroundColor: '#212B36',
                                color: 'white',
                                fontWeight: 500,
                                cursor: 'default',
                                '&:hover': {
                                    backgroundColor: '#212B36',
                                },
                            }}
                        />
                    ))}
                </Stack>
            ) : (
                <Box
                    sx={{
                        p: 3,
                        border: 1,
                        borderColor: 'divider',
                        borderRadius: 1,
                        backgroundColor: 'grey.50',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="body2" color="text.secondary" fontStyle="italic">
                        Aucune activité enregistrée
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default SuperviseurActivitiesSection;