// File: src/sections/gestionEnquete/components/EnqueteStatsWidgets.tsx

'use client'

import React from 'react';
import Grid from '@mui/material/Grid2';
import { GuichetWidgetSummary } from 'src/sections/overview/e-commerce/guichet/guichet-widget-summary-2';

interface EnqueteStatsWidgetsProps {
    totalEnquetes: number;
    enquetesEnCours: number;
    enquetesNonDemarrees: number;
    enquetesTerminees: number;
}

/**
 * Composant des widgets de statistiques pour le dashboard des enquêtes
 * Affiche 4 cartes avec les statistiques principales
 */
const EnqueteStatsWidgets: React.FC<EnqueteStatsWidgetsProps> = ({
    totalEnquetes,
    enquetesEnCours,
    enquetesNonDemarrees,
    enquetesTerminees
}) => {
    /**
     * Formatage des nombres pour l'affichage avec séparateurs de milliers
     */
    const formatNumber = (num: number) => {
        return new Intl.NumberFormat('fr-FR').format(num);
    };

    /**
     * Couleurs alternées pour les widgets de statistiques
     */
    const getWidgetColor = (index: number): 'primary' | 'warning' | 'error' | 'success' => {
        const colors: Array<'primary' | 'warning' | 'error' | 'success'> = ['primary', 'warning', 'error', 'success'];
        return colors[index % colors.length];
    };

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Widget Total des enquêtes */}
            <Grid size={{ xs: 12, md: 3 }}>
                <GuichetWidgetSummary
                    title="Nombre d'enquêtes"
                    total={formatNumber(totalEnquetes)}
                    color={getWidgetColor(0)}
                    sx={{ height: 170 }}
                />
            </Grid>

            {/* Widget Enquêtes en cours */}
            <Grid size={{ xs: 12, md: 3 }}>
                <GuichetWidgetSummary
                    title="Enquêtes en cours"
                    total={formatNumber(enquetesEnCours)}
                    color={getWidgetColor(1)}
                    sx={{ height: 170 }}
                />
            </Grid>

            {/* Widget Enquêtes non démarrées */}
            <Grid size={{ xs: 12, md: 3 }}>
                <GuichetWidgetSummary
                    title="Enquêtes non démarrées"
                    total={formatNumber(enquetesNonDemarrees)}
                    color={getWidgetColor(2)}
                    sx={{ height: 170 }}
                />
            </Grid>

            {/* Widget Enquêtes terminées */}
            <Grid size={{ xs: 12, md: 3 }}>
                <GuichetWidgetSummary
                    title="Enquêtes terminées"
                    total={formatNumber(enquetesTerminees)}
                    color={getWidgetColor(3)}
                    sx={{ height: 170 }}
                />
            </Grid>
        </Grid>
    );
};

export default EnqueteStatsWidgets;