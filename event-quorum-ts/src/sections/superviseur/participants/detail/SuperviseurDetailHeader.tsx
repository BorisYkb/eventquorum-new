// src/sections/superviseur/participants/detail/SuperviseurDetailHeader.tsx

'use client';

import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import {
    Box,
    Typography,
    IconButton,
    Breadcrumbs,
    Link,
} from '@mui/material';

/**
 * Props du composant SuperviseurDetailHeader
 */
interface SuperviseurDetailHeaderProps {
    /** Callback pour retourner à la liste */
    onBack: () => void;
}

/**
 * Composant SuperviseurDetailHeader
 * En-tête de la page de détails avec breadcrumbs (lecture seule)
 */
const SuperviseurDetailHeader: React.FC<SuperviseurDetailHeaderProps> = ({ onBack }) => {
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                {/* Bouton retour */}
                <IconButton
                    onClick={onBack}
                    sx={{
                        backgroundColor: 'grey.100',
                        '&:hover': { backgroundColor: 'grey.200' },
                        borderRadius: 1,
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>

                {/* Titre et breadcrumbs */}
                <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                        Information sur l'invité
                    </Typography>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            component="button"
                            variant="body2"
                            onClick={onBack}
                            sx={{
                                textDecoration: 'none',
                                fontWeight: 500,
                                cursor: 'pointer',
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
                            Liste des invités
                        </Link>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            Détail de l'invité
                        </Typography>
                    </Breadcrumbs>
                </Box>

                {/* Note: Pas de bouton "Modifier" pour le superviseur (lecture seule) */}
            </Box>
        </Box>
    );
};

export default SuperviseurDetailHeader;