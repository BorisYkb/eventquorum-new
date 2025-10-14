// File: src/app/organisateur/gestionenquetes/components/EnqueteStatsCards.tsx

import React from 'react';
import { Grid } from '@mui/material';
import { WidgetSummary } from './WidgetSummary';

interface EnqueteStatsCardsProps {
  createdAt: string;
  typeEnquete: 'live' | 'asynchrone';
  activite: string | string[]; // ✅ Accepte string OU string[]
}

/**
 * Composant Cartes de statistiques de l'enquête
 * Utilise WidgetSummary pour un style cohérent avec minimals.cc
 */
const EnqueteStatsCards: React.FC<EnqueteStatsCardsProps> = ({
  createdAt,
  typeEnquete,
  activite
}) => {
  // Formatage de la date de création
  const formattedDate = new Date(createdAt).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  // Formatage du type d'enquête pour l'affichage
  const typeEnqueteDisplay = typeEnquete === 'live' ? 'Synchrone' : 'Asynchrone';

  /**
   * ✅ Formatage des activités
   * Si string → retourne tel quel
   * Si string[] → joint avec des virgules
   */
  const activitesDisplay = Array.isArray(activite)
    ? activite.join(' ⦁ ')
    : activite;

  /**
   * ✅ Titre dynamique selon le nombre d'activités
   */
  const activitesTitle = Array.isArray(activite) && activite.length > 1
    ? 'Activités concernées'
    : 'Activité concernée';

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {/* Widget Date de création */}
      <Grid item xs={12} sm={6} md={4}>
        <WidgetSummary
          title="Date de création"
          total={formattedDate}
          color="primary"
          icon="solar:calendar-bold-duotone"
          sx={{
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0',
            // Réduction de la taille de police pour le total
            '& .MuiBox-root': {
              '&:has(> .MuiBox-root)': {
                '& .MuiBox-root:first-of-type': {
                  fontSize: '1.2rem !important',
                  fontWeight: 600
                }
              }
            }
          }}
        />
      </Grid>

      {/* Widget Type d'enquête */}
      <Grid item xs={12} sm={6} md={4}>
        <WidgetSummary
          title="Option de l'enquête"
          total={typeEnqueteDisplay}
          color="secondary"
          icon="solar:settings-bold-duotone"
          sx={{
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0',
            // Réduction de la taille de police pour le total
            '& .MuiBox-root': {
              '&:has(> .MuiBox-root)': {
                '& .MuiBox-root:first-of-type': {
                  fontSize: '1.2rem !important',
                  fontWeight: 600
                }
              }
            }
          }}
        />
      </Grid>

      {/* Widget Activité(s) concernée(s) - ✅ Avec liste d'activités */}
      <Grid item xs={12} sm={6} md={4}>
        <WidgetSummary
          title={activitesTitle}
          total={activitesDisplay}
          color="success"
          icon="solar:target-bold-duotone"
          sx={{
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: '1px solid #f0f0f0',
            // Réduction de la taille de police pour le total
            '& .MuiBox-root': {
              '&:has(> .MuiBox-root)': {
                '& .MuiBox-root:first-of-type': {
                  fontSize: '1rem !important', // Plus petit pour accommoder plusieurs activités
                  fontWeight: 600,
                  lineHeight: 1.3 // Meilleur espacement pour le texte long
                }
              }
            }
          }}
        />
      </Grid>
    </Grid>
  );
};

export default EnqueteStatsCards;