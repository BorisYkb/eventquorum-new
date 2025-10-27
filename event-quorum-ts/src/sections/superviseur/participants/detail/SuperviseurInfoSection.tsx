// src/sections/superviseur/participants/detail/SuperviseurInfoSection.tsx

'use client';

import { Box, Stack, Typography, Grid } from '@mui/material';

/**
 * Props du composant SuperviseurInfoSection
 */
interface SuperviseurInfoSectionProps {
    /** Nom du participant */
    nom: string;
    /** Prénom du participant */
    prenom: string;
    /** Téléphone du participant */
    telephone: string;
    /** Email du participant */
    email: string;
}

/**
 * Composant InfoField
 * Affiche un champ d'information en lecture seule
 */
const InfoField: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <Stack spacing={1}>
        <Typography variant="body2" color="text.secondary">
            {label}
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
                {value}
            </Typography>
        </Box>
    </Stack>
);

/**
 * Composant SuperviseurInfoSection
 * Section des informations personnelles (lecture seule)
 */
const SuperviseurInfoSection: React.FC<SuperviseurInfoSectionProps> = ({
    nom,
    prenom,
    telephone,
    email,
}) => {
    return (
        <Grid container spacing={3}>
            {/* Nom */}
            <Grid item xs={12} md={4}>
                <InfoField label="Nom" value={nom} />
            </Grid>

            {/* Prénom */}
            <Grid item xs={12} md={4}>
                <InfoField label="Prénom" value={prenom} />
            </Grid>

            {/* Téléphone */}
            <Grid item xs={12} md={4}>
                <InfoField label="Téléphone" value={telephone} />
            </Grid>

            {/* Email - Prend toute la largeur */}
            <Grid item xs={12}>
                <InfoField label="Email" value={email} />
            </Grid>
        </Grid>
    );
};

export default SuperviseurInfoSection;