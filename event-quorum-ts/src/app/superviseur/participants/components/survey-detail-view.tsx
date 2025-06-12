// src/app/superviseur/participants/components/survey-detail-view.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/superviseur';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';
import { ISurveyItem } from 'src/types/survey';
import { IParticipantItem } from 'src/types/participant';
import { _surveyList } from 'src/_mock/_surveys';

// ----------------------------------------------------------------------

interface SurveyDetailViewProps {
  survey: ISurveyItem;
  participant: IParticipantItem;
}

// Données mock pour les résultats des différentes enquêtes
const getSurveyQuestions = (surveyId: string) => {
  const baseQuestions = [
    {
      id: 1,
      question: 'QUESTION 1',
      description: 'Êtes-vous satisfait de l\'activité panel de haut niveau ?',
      bonneReponse: '------------------------',
      reponse: 'OUI',
      isCorrect: true
    },
    {
      id: 2,
      question: 'QUESTION 2',
      description: 'Êtes-vous satisfait de l\'activité panel de haut niveau ?',
      bonneReponse: '------------------------',
      reponse: 'NON',
      isCorrect: false
    },
    {
      id: 3,
      question: 'QUESTION 3',
      description: 'Êtes-vous satisfait de l\'activité panel de haut niveau ?',
      bonneReponse: '------------------------',
      reponse: '----',
      isCorrect: null
    },
    {
      id: 4,
      question: 'QUESTION 4',
      description: 'Êtes-vous satisfait de l\'activité panel de haut niveau ?',
      bonneReponse: '------------------------',
      reponse: 'OUI',
      isCorrect: true
    }
  ];

  // Varier les données selon l'enquête
  switch (surveyId) {
    case '1': // Satisfaction
      return baseQuestions.map(q => ({
        ...q,
        description: `Êtes-vous satisfait de l'organisation générale de l'événement ?`
      }));
    
    case '2': // Evaluation
      return baseQuestions.map(q => ({
        ...q,
        description: `L'évaluation des compétences vous semble-t-elle pertinente ?`,
        reponse: q.id === 2 ? 'OUI' : q.reponse,
        isCorrect: q.id === 2 ? true : q.isCorrect
      }));
    
    case '3': // Evaluation (terminée)
      return baseQuestions.map(q => ({
        ...q,
        description: `Le contenu de la formation répond-il à vos attentes ?`,
        reponse: q.id === 3 ? 'OUI' : q.reponse,
        isCorrect: q.id === 3 ? true : q.isCorrect
      }));
    
    case '4': // Evaluation (non démarrée)
      return baseQuestions.map(q => ({
        ...q,
        description: `Cette enquête d'amélioration vous paraît-elle utile ?`,
        reponse: '----',
        isCorrect: null
      }));
    
    default:
      return baseQuestions;
  }
};

export function SurveyDetailView({ survey, participant }: SurveyDetailViewProps) {
  const theme = useTheme();
  const router = useRouter();
  const [selectedSurvey, setSelectedSurvey] = useState(survey.id);

  const handleRetour = () => {
    router.push(`/superviseur/participants/${participant.id}?tab=enquete`);
  };

  const handleSurveyChange = (newSurveyId: string) => {
    setSelectedSurvey(newSurveyId);
    // Naviguer vers la nouvelle enquête
    router.push(`/superviseur/participants/${participant.id}/surveys/${newSurveyId}`);
  };

  const getReponseColor = (isCorrect: boolean | null) => {
    if (isCorrect === null) return 'warning';
    return isCorrect ? 'success' : 'error';
  };

  const getReponseLabel = (reponse: string, isCorrect: boolean | null) => {
    if (reponse === '----') return '----';
    return reponse;
  };

  const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' => {
    switch (status?.toLowerCase()) {
      case 'terminé':
      case 'terminée':
        return 'success';
      case 'en cours':
        return 'warning';
      case 'non participé':
      case 'non démarré':
        return 'error';
      default:
        return 'info';
    }
  };

  // Obtenir l'enquête actuellement sélectionnée
  const currentSurvey = _surveyList.find(s => s.id === selectedSurvey) || survey;
  
  // Obtenir les questions pour l'enquête sélectionnée
  const surveyQuestions = getSurveyQuestions(selectedSurvey);

  return (
    <DashboardContent maxWidth="xl">
      {/* En-tête avec breadcrumbs et bouton retour */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <CustomBreadcrumbs
            heading="Détail du participant"
          />
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

      <Card sx={{ p: 3 }}>
        {/* Section sélection d'enquête */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            p: 2,
            border: 1,
            borderColor: 'divider',
            borderRadius: 2
          }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Enquête concernée
            </Typography>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={selectedSurvey}
                onChange={(e) => handleSurveyChange(e.target.value)}
                displayEmpty
              >
                {_surveyList.map((surveyOption) => (
                  <MenuItem key={surveyOption.id} value={surveyOption.id}>
                    {surveyOption.titre_enquete}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Section titre et statuts redesignée */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            Détails de l'enquête
          </Typography>
          
          <Paper
            sx={{
              p: 3,
              backgroundColor: 'background.neutral',
              borderLeft: (theme) => `6px solid ${
                currentSurvey.statut === 'Terminé' ? theme.palette.success.main :
                currentSurvey.statut === 'En cours' ? theme.palette.warning.main :
                theme.palette.error.main
              }`
            }}
          >
            <Grid container spacing={3} alignItems="center">
              {/* Section titre de l'enquête */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={2}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                    Titre de l'enquête
                  </Typography>
                  <Label variant="soft" color="primary" sx={{ alignSelf: 'flex-start', px: 2, py: 1, fontSize: '0.875rem' }}>
                    {currentSurvey.titre_enquete}
                  </Label>
                </Stack>
              </Grid>

              {/* Section note et statut de participation */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', minWidth: 120 }}>
                      Note obtenue :
                    </Typography>
                    <Label variant="soft" color="info" sx={{ px: 2, py: 0.5, fontSize: '0.875rem' }}>
                      {currentSurvey.note}
                    </Label>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.secondary', minWidth: 120 }}>
                      Statut de participation :
                    </Typography>
                    <Label variant="soft" color={getStatusColor(currentSurvey.statut_participation)} sx={{ px: 2, py: 0.5, fontSize: '0.875rem' }}>
                      {currentSurvey.statut_participation}
                    </Label>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Tableau des résultats */}
        <Box>
          <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
            Détail des réponses
          </Typography>
          
          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Scrollbar>
              <Table sx={{ minWidth: 800 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.100' }}>
                    <TableCell sx={{ fontWeight: 600, width: 120 }}>Question</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: 300 }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: 200, textAlign: 'center' }}>La bonne réponse</TableCell>
                    <TableCell sx={{ fontWeight: 600, width: 120, textAlign: 'center' }}>Réponses</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {surveyQuestions.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {row.question}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {row.description}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="body2" color="text.secondary">
                          {row.bonneReponse}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Label
                          variant="soft"
                          color={getReponseColor(row.isCorrect)}
                        >
                          {getReponseLabel(row.reponse, row.isCorrect)}
                        </Label>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        </Box>
      </Card>
    </DashboardContent>
  );
}