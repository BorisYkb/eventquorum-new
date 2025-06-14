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
import Stack from '@mui/material/Stack';
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

  // Fonction pour afficher les points colorés au lieu de Oui/Non
  const renderConnectionDot = (value: boolean | string) => {
    const isConnected = typeof value === 'boolean' ? value : (value === 'oui' || value === 'Oui' || value === 'connecté');
    
    return (
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: isConnected ? '#22c55e' : '#ef4444', // vert ou rouge
        }}
      />
    );
  };

  const renderInfoBox = (label: string, value: string | undefined, showIcon?: boolean, iconValue?: string | boolean) => (
    <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
      <Typography 
        sx={{ 
          minWidth: 180, 
          fontWeight: 'medium', 
          color: 'text.secondary',
          fontSize: '0.9rem',
          mr: 3
        }}
      >
        {label}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        {showIcon && iconValue !== undefined && (
          <Box sx={{ mr: 1.5 }}>
            {renderConnectionDot(iconValue)}
          </Box>
        )}
        <Typography sx={{ fontWeight: 'medium', fontSize: '0.9rem' }}>
          {value || '-'}
        </Typography>
      </Box>
    </Box>
  );

  const renderPersonalInfo = () => (
    <Card sx={{ p: 3, height: 450, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
        INFORMATIONS PERSONNELLES
      </Typography>
      <Stack spacing={1.5} sx={{ flex: 1 }}>
        {renderInfoBox("Nom", participant.nom || participant.nom_prenom?.split(' ')[0])}
        {renderInfoBox("Prénom", participant.prenom || participant.nom_prenom?.split(' ').slice(1).join(' '))}
        {renderInfoBox("Email", participant.email)}
        {renderInfoBox("Téléphone", participant.telephone)}
        {renderInfoBox("Date d'inscription", participant.date)}
      </Stack>
    </Card>
  );

  const renderConnectionInfo = () => (
    <Card sx={{ p: 3, height: 450, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
        STATUT & CONNEXION
      </Typography>
      <Stack spacing={1.5} sx={{ flex: 1 }}>
        {renderInfoBox(
          "Connecté", 
          participant.connecte === 'connecté' ? 'Oui' : 'Non',
          true,
          participant.connecte === 'connecté'
        )}
        {renderInfoBox("Date de connexion", participant.date || '10/06/2024')}
        {renderInfoBox("Statut de participation", participant.statut)}
        {renderInfoBox("Mode de participation", participant.statut === 'en ligne' ? 'En ligne' : 'En présentiel')}
        {renderInfoBox("Dernière activité", "Aujourd'hui 15:30")}
        {renderInfoBox("Temps de connexion", "2h 45min")}
      </Stack>
    </Card>
  );

  const renderParticipationInfo = () => (
    <Card sx={{ p: 3, height: 450, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
        ÉMARGEMENT & PARTICIPATION
      </Typography>
      <Stack spacing={1.5} sx={{ flex: 1 }}>
        {renderInfoBox(
          "Émargement", 
          participant.emargement === 'signé' ? 'Signé' : 'Non signé',
          true,
          participant.emargement === 'signé'
        )}
        {renderInfoBox("Date d'émargement", participant.emargement === 'signé' ? '10/06/2024' : '-')}
        {renderInfoBox("Heure d'émargement", participant.emargement === 'signé' ? '08:30' : '-')}
        {renderInfoBox("Activité sélectionnée", participant.activite_selectionnee || '-')}
        {renderInfoBox("Présence confirmée", participant.emargement === 'signé' ? 'Oui' : 'Non')}
        {renderInfoBox("Taux de participation", "85%")}
      </Stack>
    </Card>
  );

  const renderActivitiesCard = () => (
    <Card sx={{ p: 3, height: 450, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
        ACTIVITÉS SUIVIES
      </Typography>
      <Stack spacing={2} sx={{ flex: 1, overflow: 'auto' }}>
        {ACTIVITES_DISPONIBLES.map((activite, index) => (
          <Box
            key={index}
            sx={{
              p: 2.5,
              bgcolor: 'grey.50',
              borderRadius: 2,
              fontSize: '0.875rem',
              fontWeight: 500,
              border: 1,
              borderColor: 'grey.200',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              '&:hover': {
                bgcolor: 'grey.100',
                borderColor: 'primary.light'
              }
            }}
          >
            <Typography sx={{ fontWeight: 500 }}>{activite}</Typography>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: index < 2 ? 'success.main' : 'grey.400', // 2 premières activités "suivies"
              }}
            />
          </Box>
        ))}
      </Stack>
    </Card>
  );

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

      {/* Onglet Informations personnelles redesigné */}
      {activeTab === 'profil' && (
        <Box sx={{ bgcolor: 'grey.50', p: 4, borderRadius: 2 }}>
          <Grid container spacing={3}>
            {/* Première ligne */}
            <Grid size={{ xs: 12, md: 6 }}>
              {renderPersonalInfo()}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              {renderConnectionInfo()}
            </Grid>
            
            {/* Deuxième ligne */}
            <Grid size={{ xs: 12, md: 6 }}>
              {renderParticipationInfo()}
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              {renderActivitiesCard()}
            </Grid>
          </Grid>
        </Box>
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