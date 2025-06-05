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
import Rating from '@mui/material/Rating';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/superviseur';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';
import { IParticipantItem } from 'src/types/participant';
import { SurveyResultsTab } from 'src/sections/survey/survey-results-tab';

// ----------------------------------------------------------------------

interface DetailParticipantProps {
  participant: IParticipantItem;
}

// Onglets pour les détails du participant
const DETAIL_TABS = [
  { label: 'Informations personnelles', value: 'profil' },
  { label: 'Résultats enquête', value: 'enquete' },
  { label: 'Avis', value: 'avis' },
];

// Liste des activités disponibles
const ACTIVITES_DISPONIBLES = [
  'Activité 1',
  'Activité 2',
  'Activité 3',
  'Activité 4'
];

// Données mock pour les avis
const AVIS_PARTICIPANT = [
  {
    id: 1,
    evenementActivite: 'Activité 1',
    appreciation: 3,
    commentaire: 'Certaines parties de l\'activité manquaient d\'interaction, ce qui aurait pu rendre l\'expérience plus engageante.',
    date: '12/05/2024 10H00'
  },
  {
    id: 2,
    evenementActivite: 'Évènement',
    appreciation: 5,
    commentaire: 'Je tiens à exprimer ma profonde satisfaction',
    date: '12/05/2024 10H00'
  }
];

export function DetailParticipant({ participant }: DetailParticipantProps) {
  const theme = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profil');

  // Couleur alternée pour les cartes
  const alternateColor = '#BCDFFB';

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleRetour = () => {
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

  return (
    <DashboardContent maxWidth="xl">
      {/* En-tête avec breadcrumbs et bouton retour */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <CustomBreadcrumbs
            heading="Détail du participant"
          />
          {/* Nom du participant sous le titre */}
          <Typography variant="h5" sx={{ mt: 1, fontWeight: 600, color: 'text.primary' }}>
            {participant.nom_prenom || `${participant.nom} ${participant.prenom}`}
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleRetour}
          startIcon={<Iconify icon="eva:arrow-back-fill" />}
          sx={{
            bgcolor: '#000',
            color: 'white',
            '&:hover': { bgcolor: '#333' }
          }}
        >
          Retour
        </Button>
      </Box>

      {/* Onglets SANS shadow comme la page d'accueil */}
      <Card sx={{ mb: 3, boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
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

      {/* Onglet Informations personnelles */}
      {activeTab === 'profil' && (
        <Grid container spacing={3}>
          {/* Carte principale des informations */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Profil
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Nom
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.nom || participant.nom_prenom?.split(' ')[0] || '-'}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Prénom
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.prenom || participant.nom_prenom?.split(' ').slice(1).join(' ') || '-'}
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
                    {/* Juste un point coloré sans texte */}
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        bgcolor: participant.connecte === 'connecté' ? 'success.main' : 'error.main'
                      }}
                    />
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Date de connexion
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.date || '10/06/2024'}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Statut
                    </Typography>
                    <Label
                      variant="soft"
                      color={getStatusColor(participant.statut)}
                    >
                      {participant.statut}
                    </Label>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Émargement
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {participant.emargement === 'signé' ? 'Signé' : 'Non signé'}
                    </Typography>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Date d'émargement
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      10/06/2024
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          {/* Carte des activités suivies */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ p: 3, backgroundColor: alternateColor }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Activités suivies
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {ACTIVITES_DISPONIBLES.map((activite, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      bgcolor: 'grey.100',
                      borderRadius: 2,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      border: 1,
                      borderColor: 'grey.300'
                    }}
                  >
                    {activite}
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Onglet Résultats enquête - Utilise SurveyResultsTab */}
      {activeTab === 'enquete' && (
        <SurveyResultsTab />
      )}

      {/* Onglet Avis */}
      {activeTab === 'avis' && (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
            Liste des avis
          </Typography>

          {/* Tableau des avis */}
          <TableContainer>
            <Scrollbar>
              <Table sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell sx={{ fontWeight: 600, width: 200 }}>Événement/Activité</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: 150, textAlign: 'center' }}>Appréciation</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: 400 }}>Commentaire</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: 150, textAlign: 'center' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {AVIS_PARTICIPANT.map((avis) => (
                    <TableRow key={avis.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {avis.evenementActivite}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Rating
                          value={avis.appreciation}
                          readOnly
                          size="small"
                          sx={{ color: '#ffc107' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {avis.commentaire}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" color="text.secondary">
                          {avis.date}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </Card>
      )}
    </DashboardContent>
  );
}