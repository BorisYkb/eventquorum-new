// src/sections/superviseur/participants/detail/SuperviseurConnectionSection.tsx

'use client';

import { Box, Stack, Typography, Chip } from '@mui/material';

/**
 * Props du composant SuperviseurConnectionSection
 */
interface SuperviseurConnectionSectionProps {
    /** Type de connexion */
    typeConnexion: 'en ligne' | 'en présentiel';
    /** Date de première connexion */
    datePremiereConnexion?: string;
}

/**
 * Composant SuperviseurConnectionSection
 * Section affichant le type de connexion et la date d'émargement
 */
const SuperviseurConnectionSection: React.FC<SuperviseurConnectionSectionProps> = ({
    typeConnexion,
    datePremiereConnexion,
}) => {
    /**
     * Formate une date ISO en format lisible
     */
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 3, md: 10 } }}>
            {/* Type de connexion */}
            <Box sx={{ flex: 1 }}>
                <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                        Type de connexion
                    </Typography>
                    <Box
                        sx={{
                            p: 2,
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 1,
                            backgroundColor: 'grey.50',
                        }}
                    >
                        <Chip
                            label={typeConnexion === 'en ligne' ? 'En ligne' : 'En présentiel'}
                            size="small"
                            sx={{
                                backgroundColor:
                                    typeConnexion === 'en ligne' ? 'success.lighter' : 'warning.lighter',
                                color: typeConnexion === 'en ligne' ? 'success.main' : 'warning.main',
                                fontWeight: 700,
                                textTransform: 'capitalize',
                                cursor: 'default',
                                '&:hover': {
                                    backgroundColor:
                                        typeConnexion === 'en ligne' ? 'success.lighter' : 'warning.lighter',
                                },
                                boxShadow: 'none',
                            }}
                        />
                    </Box>
                </Stack>
            </Box>

            {/* Date d'émargement */}
            <Box sx={{ flex: 1 }}>
                <Stack spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                        Date d'émargement
                    </Typography>
                    <Box
                        sx={{
                            p: 2,
                            border: 1,
                            borderColor: 'divider',
                            borderRadius: 1,
                            backgroundColor: 'grey.50',
                        }}
                    >
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {datePremiereConnexion ? formatDate(datePremiereConnexion) : 'Non émargé'}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};

export default SuperviseurConnectionSection;