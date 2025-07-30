
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import QuestionDetailModal from '../components/QuestionDetailModal';

// Types
interface Question {
  id: number;
  question: string;
  type: 'choix_multiple' | 'echelle_appreciation' | 'zone_saisie' | 'choix_unique' | 'liste_deroulante' | 'note_etoile';
  reponses: string[];
  enqueteConcernee: string;
  nombrePoints: number;
  bonneReponse: number;
  required: boolean;
}

interface EnqueteDetail {
  id: number;
  titre: string;
  activite: string;
  code: string;
  nombreParticipants: number;
  statut: 'Terminé' | 'En cours' | 'Non démarré';
  typeEnquete: 'live' | 'asynchrone';
  enqueteAnonymat: boolean;
  authentificationNumerique: boolean;
  createdAt: string;
  questions: Question[];
}

// Données d'exemple - remplacez par vos vraies données
const sampleEnqueteData: EnqueteDetail = {
  id: 1,
  titre: "Satisfaction des participants",
  activite: "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
  code: "ENQ-001",
  nombreParticipants: 156,
  statut: "En cours",
  typeEnquete: "live",
  enqueteAnonymat: true,
  authentificationNumerique: false,
  createdAt: "2024-01-15",
  questions: [
    {
      id: 1,
      question: "Comment évaluez-vous la qualité de l'organisation de cet événement ?",
      type: "choix_unique",
      reponses: ["Excellent", "Très bien", "Bien", "Moyen", "Insuffisant"],
      enqueteConcernee: "Enquête 1",
      nombrePoints: 10,
      bonneReponse: 0,
      required: true
    },
    {
      id: 2,
      question: "Quels aspects de l'événement avez-vous le plus appréciés ?",
      type: "choix_multiple",
      reponses: ["Les intervenants", "Le contenu", "L'organisation", "Les pauses", "Le lieu"],
      enqueteConcernee: "Enquête 1",
      nombrePoints: 15,
      bonneReponse: 0,
      required: false
    },
    {
      id: 3,
      question: "Avez-vous des suggestions d'amélioration ?",
      type: "zone_saisie",
      reponses: [],
      enqueteConcernee: "Enquête 1",
      nombrePoints: 5,
      bonneReponse: 0,
      required: false
    }
  ]
};

const EnqueteDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const theme = useTheme();

  const [enqueteData, setEnqueteData] = useState<EnqueteDetail | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);

  // État pour le modal de détail de question
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedQuestionForView, setSelectedQuestionForView] = useState<Question | null>(null);

  const enqueteId = params.id as string;

  useEffect(() => {
    // Simuler le chargement des données de l'enquête
    // Remplacez par votre appel API réel
    const loadEnqueteData = async () => {
      try {
        // TODO: Remplacer par votre appel API réel
        // const response = await fetch(`/api/enquetes/${enqueteId}`);
        // const data = await response.json();
        // setEnqueteData(data);

        // Pour la démo, on utilise les données d'exemple
        setEnqueteData(sampleEnqueteData);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'enquête:', error);
      }
    };

    loadEnqueteData();
  }, [enqueteId]);

  const handleBack = () => {
    router.push('/organisateur/gestionenquetes');
  };

  const handleStartSurvey = () => {
    console.log('Démarrage de l\'enquête:', enqueteId);
    // Logique pour démarrer l'enquête
  };

  const handleSuspendSurvey = () => {
    console.log('Suspension de l\'enquête:', enqueteId);
    // Logique pour suspendre l'enquête
  };

  const handleEndSurvey = () => {
    console.log('Fin de l\'enquête:', enqueteId);
    // Logique pour terminer l'enquête
  };

  const handleViewResults = () => {
    console.log('Consultation des résultats pour l\'enquête:', enqueteId);
    router.push(`/organisateur/gestionenquetes/${enqueteId}/resultats`);
  };

  const handleEditEnquete = () => {
    router.push(`/organisateur/gestionenquetes/${enqueteId}/modifier`);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked && enqueteData) {
      const newSelected = enqueteData.questions.map((_, index) => index);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, index: number) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewQuestion = (questionId: number) => {
    if (enqueteData) {
      const question = enqueteData.questions.find(q => q.id === questionId);
      if (question) {
        setSelectedQuestionForView(question);
        setDetailModalOpen(true);
      }
    }
  };

  const isSelected = (index: number) => selected.indexOf(index) !== -1;

  const getStatutColor = (statut: string): 'default' | 'success' | 'warning' | 'error' => {
    switch (statut) {
      case 'Terminé':
        return 'success';
      case 'En cours':
        return 'warning';
      case 'Non démarré':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeQuestionLabel = (type: string) => {
    const typeQuestions = [
      { value: 'choix_multiple', label: 'Choix multiple' },
      { value: 'echelle_appreciation', label: 'Échelle d\'appréciation' },
      { value: 'zone_saisie', label: 'Zone de saisie' },
      { value: 'choix_unique', label: 'Choix unique' },
      { value: 'liste_deroulante', label: 'Liste déroulante' },
      { value: 'note_etoile', label: 'Note étoile' }
    ];
    return typeQuestions.find(t => t.value === type)?.label || type;
  };

  if (!enqueteData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Chargement...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      {/* En-tête avec titre et bouton retour */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 4,
        pb: 2,
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Typography variant="h4" component="h1" sx={{
          fontWeight: 700,
          color: '#1a1a1a',
          fontSize: '2rem'
        }}>
          Détail de l'enquête
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleEditEnquete}
            startIcon={<Iconify icon="solar:pen-bold" />}
            sx={{
              borderColor: '#1976d2',
              color: '#1976d2',
              '&:hover': {
                borderColor: '#1565c0',
                bgcolor: 'rgba(25, 118, 210, 0.04)'
              }
            }}
          >
            Modifier
          </Button>
          <Button
            variant="contained"
            onClick={handleBack}
            startIcon={<Iconify icon="eva:arrow-back-fill" />}
            sx={{
              bgcolor: '#2c2c2c',
              color: 'white',
              '&:hover': { bgcolor: '#1a1a1a' }
            }}
          >
            Retour
          </Button>
        </Box>
      </Box>

      <Card sx={{
        p: 4,
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #f0f0f0'
      }}>
        {/* Titre de l'enquête avec options */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#333' }}>
            Titre de l'enquête
          </Typography>
          <Card sx={{
            p: 3,
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" sx={{
                color: '#333',
                fontWeight: 600
              }}>
                {enqueteData.titre}
              </Typography>

              {/* Options à droite */}
              <Box sx={{ display: 'flex', gap: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={enqueteData.enqueteAnonymat || false}
                      disabled
                      sx={{ color: '#666' }}
                    />
                  }
                  label="Enquête avec notation"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: '0.875rem',
                      color: '#555'
                    }
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={enqueteData.authentificationNumerique || false}
                      disabled
                      sx={{ color: '#666' }}
                    />
                  }
                  label="Autoriser plusieurs réponses"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: '0.875rem',
                      color: '#555'
                    }
                  }}
                />
              </Box>
            </Box>
          </Card>
        </Box>

        {/* Statistiques avec SuperviseurWidgetSummary */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
              bgcolor: 'primary.lighter'
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
                {new Date(enqueteData.createdAt).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </Typography>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
              bgcolor: 'secondary.lighter'
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
                {enqueteData.typeEnquete === 'live' ? 'Synchrone' : 'Asynchrone'}
              </Typography>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
              bgcolor: 'success.lighter'
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
                lineHeight: 1.3
              }}>
                {enqueteData.activite}
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Boutons d'action de l'enquête */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#333' }}>
            Actions sur l'enquête
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Tooltip title="Démarrer l'enquête" placement="top" arrow>
              <Button
                variant="outlined"
                onClick={handleStartSurvey}
                startIcon={<Iconify icon="solar:play-bold" />}
                sx={{
                  borderColor: '#4caf50',
                  color: '#4caf50',
                  px: 3,
                  py: 1,
                  '&:hover': {
                    backgroundColor: '#4caf50',
                    color: 'white',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Démarrer
              </Button>
            </Tooltip>

            <Tooltip title="Suspendre l'enquête" placement="top" arrow>
              <Button
                variant="outlined"
                onClick={handleSuspendSurvey}
                startIcon={<Iconify icon="solar:pause-bold" />}
                sx={{
                  borderColor: '#2196f3',
                  color: '#2196f3',
                  px: 3,
                  py: 1,
                  '&:hover': {
                    backgroundColor: '#2196f3',
                    color: 'white',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Suspendre
              </Button>
            </Tooltip>

            <Tooltip title="Terminer l'enquête" placement="top" arrow>
              <Button
                variant="outlined"
                onClick={handleEndSurvey}
                startIcon={<Iconify icon="solar:stop-bold" />}
                sx={{
                  borderColor: '#f44336',
                  color: '#f44336',
                  px: 3,
                  py: 1,
                  '&:hover': {
                    backgroundColor: '#f44336',
                    color: 'white',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Terminer
              </Button>
            </Tooltip>
          </Stack>
        </Box>

        {/* Section des questions */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
              Liste des questions ({enqueteData.questions.length})
            </Typography>
            <Tooltip title="Consulter les résultats de l'enquête" placement="top" arrow>
              <Button
                variant="contained"
                onClick={handleViewResults}
                startIcon={<Iconify icon="solar:chart-bold" />}
                sx={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  px: 3,
                  '&:hover': {
                    backgroundColor: '#1565c0',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(25,118,210,0.3)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                Consulter les résultats
              </Button>
            </Tooltip>
          </Box>

          {/* Tableau des questions */}
          <Card sx={{
            backgroundColor: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            <TableContainer>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        indeterminate={selected.length > 0 && selected.length < enqueteData.questions.length}
                        checked={enqueteData.questions.length > 0 && selected.length === enqueteData.questions.length}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#555', width: '60px', textAlign: 'center' }}>
                      N°
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#555' }}>
                      Question
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600, color: '#555', width: '100px' }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {enqueteData.questions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((question, index) => {
                      const isItemSelected = isSelected(index);
                      const actualIndex = page * rowsPerPage + index;

                      return (
                        <TableRow
                          key={question.id}
                          hover
                          onClick={(event) => handleClick(event, index)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          selected={isItemSelected}
                          sx={{ cursor: 'pointer' }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#666' }}>
                              {actualIndex + 1}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{
                              color: '#333',
                              fontWeight: 500,
                              mb: 0.5
                            }}>
                              {question.question}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#666' }}>
                              {getTypeQuestionLabel(question.type)} •
                              {question.required ? ' Obligatoire' : ' Facultative'} •
                              {question.nombrePoints} points
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title="Voir détails" placement="top" arrow>
                              <IconButton
                                color="info"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewQuestion(question.id);
                                }}
                                size="small"
                                sx={{
                                  width: 32,
                                  height: 32,
                                  '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.08)' }
                                }}
                              >
                                <Iconify icon="solar:eye-bold" width={16} />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Footer avec Dense et Pagination */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              borderTop: '1px solid #e0e0e0',
              backgroundColor: '#f8f9fa'
            }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={dense}
                    onChange={(e) => setDense(e.target.checked)}
                  />
                }
                label="Dense"
              />

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={enqueteData.questions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Rows per page:"
                labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
              />
            </Box>
          </Card>
        </Box>
      </Card>

      {/* Modal de détail de question */}
      <QuestionDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        question={selectedQuestionForView}
        getTypeQuestionLabel={getTypeQuestionLabel}
      />
    </Box>
  );
};

export default EnqueteDetailPage;
