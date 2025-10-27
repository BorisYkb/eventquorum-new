// src/sections/superviseur/participants/detail/SuperviseurEmargementSection.tsx

'use client';

import { Box, Typography } from '@mui/material';

/**
 * Props du composant SuperviseurEmargementSection
 */
interface SuperviseurEmargementSectionProps {
    /** Type de connexion */
    typeConnexion: 'en ligne' | 'en présentiel';
    /** URL de la signature (si émargé) */
    emargement: string | null;
}

/**
 * Composant SuperviseurEmargementSection
 * Section affichant l'émargement (signature ou statut en ligne)
 */
const SuperviseurEmargementSection: React.FC<SuperviseurEmargementSectionProps> = ({
    typeConnexion,
    emargement,
}) => {
    return (
        <Box>
            <Typography
                variant="body1"
                sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}
            >
                Émargement
            </Typography>

            {typeConnexion === 'en ligne' ? (
                // Affichage pour connexion en ligne
                <Box
                    sx={{
                        p: 3,
                        border: 1,
                        borderColor: 'success.main',
                        borderRadius: 1,
                        backgroundColor: 'success.lighter',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                        En ligne
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Ce participant suit l'événement en ligne
                    </Typography>
                </Box>
            ) : (
                // Affichage pour connexion en présentiel (signature)
                <Box>
                    {emargement ? (
                        <Box
                            sx={{
                                width: { xs: '100%', sm: 200 },
                                height: 100,
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1,
                                backgroundColor: 'grey.50',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                component="img"
                                src={emargement}
                                alt="Signature"
                                sx={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="100"%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3ESignature%3C/text%3E%3C/svg%3E';
                                }}
                            />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                width: { xs: '100%', sm: 200 },
                                height: 100,
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1,
                                backgroundColor: 'grey.50',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography variant="body2" color="text.secondary" fontStyle="italic">
                                Pas de signature
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default SuperviseurEmargementSection;