//src/app/superviseur/participants/components/details-participant.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/superviseur';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { IParticipantItem } from 'src/types/participant';
import { SurveyResultsTab } from 'src/sections/survey/survey-results-tab';

// ----------------------------------------------------------------------

interface DetailParticipantProps {
  participant: IParticipantItem;
}

// Onglets pour les détails du participant
const DETAIL_TABS = [
  { label: 'Profil', value: 'profil' },
  { label: 'Résultat enquête', value: 'enquete' },
  { label: 'Avis', value: 'avis' },
];

// Liste des activités disponibles (selon la maquette)
const ACTIVITES_DISPONIBLES = [
  'Activité 1',
  'Activité 2',
  'Activité 3',
  'Activité 4'
];

export function DetailParticipant({ participant }: DetailParticipantProps) {
  const theme = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profil');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleRetour = () => {
    // Retourner à l'onglet participants spécifiquement
    router.push('/superviseur/participants?tab=participants');
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'en ligne':
        return 'warning';
      case 'en présentiel':
        return 'info';
      default:
        return 'default';
    }
  };

  const getConnectedStatus = (connecte: string) => {
    return connecte === 'connecté' ? 'success' : 'error';
  };

  return (
    <DashboardContent maxWidth="xl">
      {/* En-tête avec breadcrumbs et bouton retour */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <CustomBreadcrumbs
          heading="Détail du participant"
          
        />

        <Button
          variant="contained"
          onClick={handleRetour}
          startIcon={<Iconify icon="eva:arrow-back-fill" />}
          sx={{
            bgcolor: '#ff9800',
            color: 'white',
            '&:hover': { bgcolor: '#f57c00' }
          }}
        >
          Retour
        </Button>
      </Box>

      {/* Onglets */}
      <Card sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ px: 2.5, py: 2 }}
        >
          {DETAIL_TABS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
            />
          ))}
        </Tabs>
      </Card>

      {/* Contenu selon l'onglet actif */}
      {activeTab === 'profil' && (
        <Card sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Section gauche - Informations personnelles */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Profil
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Nom
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.nom}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Prénom
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.prenom}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.email}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Téléphone
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.telephone}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Connecté
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: participant.connecte === 'connecté' ? 'success.main' : 'error.main'
                        }}
                      />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {participant.connecte}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Date de connexion
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.premiere_connexion || '10/06/2024'}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Statut
                    </Typography>
                    <Chip
                      label={participant.statut}
                      color={getStatusColor(participant.statut)}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Émargement
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.emargement || 'En ligne'}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Date d'émargement
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      10/06/2024
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            {/* Section droite - Activités suivies */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Activités suivies
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {ACTIVITES_DISPONIBLES.map((activite, index) => (
                    <Box
                      key={index}
                      sx={{
                        p: 1,
                        bgcolor: 'grey.100',
                        borderRadius: 0.5,
                        fontSize: '0.875rem'
                      }}
                    >
                      {activite}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      )}

      {/* Onglets futurs - Placeholders */}
      {activeTab === 'enquete' && (
        <SurveyResultsTab />
      )}

      {activeTab === 'avis' && (
        <Card sx={{ p: 3, textAlign: 'center', minHeight: 200 }}>
          <Typography variant="h6" color="text.secondary">
            Avis du participant
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Cette section sera développée prochainement
          </Typography>
        </Card>
      )}
    </DashboardContent>
  );
}