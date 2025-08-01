// File: src/app/organisateur/gestionenquetes/components/EnqueteStatsCards.tsx

import React from 'react';
import { Card, Typography, Grid } from '@mui/material';

interface EnqueteStatsCardsProps {
  createdAt: string;
  typeEnquete: 'live' | 'asynchrone';
  activite: string;
}

/**
 * Composant Cartes de statistiques de l'enquête
 * Affiche les informations clés sous forme de cartes colorées
 */
const EnqueteStatsCards: React.FC<EnqueteStatsCardsProps> = ({
  createdAt,
  typeEnquete,
  activite
}) => {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {/* Carte Date de création */}
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{
          p: 3,
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #f0f0f0',
          height: 140,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'primary.lighter',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            bgcolor: 'primary.main'
          }
        }}>
          <Typography variant="body2" sx={{
            fontWeight: 600,
            color: 'text.secondary',
            mb: 1,
            textAlign: 'center'
          }}>
            Date de création
          </Typography>
          <Typography variant="h6" sx={{
            fontWeight: 700,
            color: 'primary.main',
            textAlign: 'center'
          }}>
            {new Date(createdAt).toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}
          </Typography>
        </Card>
      </Grid>

      {/* Carte Type d'enquête */}
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{
          p: 3,
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #f0f0f0',
          height: 140,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'secondary.lighter',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            bgcolor: 'secondary.main'
          }
        }}>
          <Typography variant="body2" sx={{
            fontWeight: 600,
            color: 'text.secondary',
            mb: 1,
            textAlign: 'center'
          }}>
            Option de l'enquête
          </Typography>
          <Typography variant="h6" sx={{
            fontWeight: 700,
            color: 'secondary.main',
            textAlign: 'center'
          }}>
            {typeEnquete === 'live' ? 'Synchrone' : 'Asynchrone'}
          </Typography>
        </Card>
      </Grid>

      {/* Carte Activité concernée */}
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{
          p: 3,
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: '1px solid #f0f0f0',
          height: 140,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'success.lighter',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            bgcolor: 'success.main'
          }
        }}>
          <Typography variant="body2" sx={{
            fontWeight: 600,
            color: 'text.secondary',
            mb: 1,
            textAlign: 'center'
          }}>
            Activité concernée
          </Typography>
          <Typography variant="body1" sx={{
            fontWeight: 600,
            color: 'success.main',
            textAlign: 'center',
            fontSize: '0.95rem',
            lineHeight: 1.3,
            px: 1
          }}>
            {activite}
          </Typography>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EnqueteStatsCards;