// File: src/app/organisateur/gestionenquetes/[id]/resultats/components/EnqueteResultsHeader.tsx

'use client'

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { WidgetSummary } from '../../../components/WidgetSummary';

interface EnqueteResultsHeaderProps {
    enqueteTitre: string;
    activiteTitre: string;
    nombreParticipants: number;
    nombreQuestions: number;
    tauxParticipation: number;
    onExport: () => void;
    onBack: () => void;
}

/**
 * Composant en-tête des résultats d'enquête selon la maquette
 * Titre + 3 widgets oranges + boutons Exporter/Retour
 */
const EnqueteResultsHeader: React.FC<EnqueteResultsHeaderProps> = ({
    enqueteTitre,
    activiteTitre,
    nombreParticipants,
    nombreQuestions,
    tauxParticipation,
    onExport,
    onBack
}) => {
    /**
     * Fonction utilitaire pour formater les nombres
     */
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('fr-FR').format(num);
    };

    return (
        <Box sx={{ mb: 4 }}>
            {/* Ligne 1: Titre et boutons selon la maquette */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3,
                flexWrap: 'wrap',
                gap: 2
            }}>
                {/* Titre exactement comme la maquette */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: '#333',
                        fontSize: '1.1rem',
                        letterSpacing: '0.5px'
                    }}
                >
                    {enqueteTitre} &gt; {activiteTitre}
                </Typography>

                {/* Boutons selon la maquette */}
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                    {/* Bouton Exporter - Style noir */}
                    <Button
                        variant="contained"
                        onClick={onExport}
                        sx={{
                            bgcolor: '#000000', // Noir pour le bouton exporter
                            color: 'white',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            px: 3,
                            py: 1,
                            borderRadius: '6px',
                            boxShadow: 'none',
                            '&:hover': {
                                bgcolor: '#333333', // Gris foncé au survol
                                boxShadow: 'none'
                            }
                        }}
                    >
                        Exporter
                    </Button>

                    {/* Bouton Retour - Style blanc avec bordure */}
                    <Button
                        variant="outlined"
                        onClick={onBack}
                        sx={{
                            bgcolor: 'white', // Fond blanc pour le bouton retour
                            color: '#000000', // Texte noir
                            border: '1px solid #e0e0e0', // Bordure grise claire
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            px: 3,
                            py: 1,
                            borderRadius: '6px',
                            boxShadow: 'none',
                            '&:hover': {
                                bgcolor: '#f5f5f5', // Gris très clair au survol
                                border: '1px solid #d0d0d0', // Bordure légèrement plus foncée au survol
                                boxShadow: 'none'
                            }
                        }}
                    >
                        Retour
                    </Button>
                </Box>
            </Box>

            {/* Ligne 2: Widgets de statistiques oranges selon la maquette */}
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <WidgetSummary
                        title="Nombre de participants"
                        total={formatNumber(nombreParticipants)} // ✅ String formatée
                        color="warning"
                    // sx={{ height: 120 }} 
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <WidgetSummary
                        title="Nombre de questions"
                        total={formatNumber(nombreQuestions)} // ✅ String formatée
                        color="success"
                    // sx={{ height: 120 }} 
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <WidgetSummary
                        title="Taux de participation"
                        total={`${tauxParticipation}%`} // ✅ String avec pourcentage
                        color="error"
                    // sx={{ height: 120 }} 
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default EnqueteResultsHeader;