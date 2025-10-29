// File: src/app/superviseur/enquetes/components/MuiSurveyDetail.tsx

'use client';

/**
 * COMPOSANT: MuiSurveyDetail
 * 
 * Page de détail d'une enquête pour le superviseur.
 * Affiche:
 * - Les informations clés de l'enquête (code, option, activité, participants, date)
 * - La liste des questions avec pagination et sélection multiple
 * - Actions: Consulter les résultats, voir les détails d'une question
 * 
 * Ce composant est un front fonctionnel en attendant les API du backend.
 */

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
import { ArrowBack, Assignment, Settings, Work, People, CalendarToday } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import InfoCard from 'src/sections/superviseur/enquetes/InfoCard';
import { Survey, Question } from '../types/survey';

// ============================================
// TYPES
// ============================================
interface MuiSurveyDetailProps {
  /** Données de l'enquête */
  survey: Survey;

  /** Liste des questions de l'enquête */
  questions: Question[];
}

// ============================================
// COMPOSANT PRINCIPAL
// ============================================
const MuiSurveyDetail: React.FC<MuiSurveyDetailProps> = ({ survey, questions }) => {
  // ============================================
  // HOOKS
  // ============================================
  const router = useRouter();
  const theme = useTheme();

  // ============================================
  // ÉTATS
  // ============================================

  /** Questions sélectionnées (indices) */
  const [selected, setSelected] = useState<number[]>([]);

  /** Page actuelle de la pagination */
  const [page, setPage] = useState(0);

  /** Nombre de lignes par page */
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /** Mode dense du tableau */
  const [dense, setDense] = useState(false);

  // ============================================
  // LOGS DE DEBUG (à retirer en production)
  // ============================================
  console.log('Survey data:', survey);
  console.log('Questions data:', questions);
  console.log('Survey code:', survey.code);
  console.log('Survey option:', survey.option);

  // ============================================
  // HANDLERS - NAVIGATION
  // ============================================

  /**
   * Navigation vers la page des résultats de l'enquête
   * TODO: Implémenter l'appel API pour récupérer les résultats
   */
  const handleViewResults = () => {
    console.log('Navigating to results for survey:', survey.id);
    router.push(`/superviseur/enquetes/${survey.id}/resultats`);
  };

  /**
   * Retour à la liste des enquêtes
   */
  const handleBack = () => {
    router.push('/superviseur/enquetes');
  };

  /**
   * Navigation vers le détail d'une question
   * @param questionId - ID de la question à consulter
   * TODO: Implémenter l'appel API pour récupérer les détails de la question
   */
  const handleViewQuestion = (questionId: number) => {
    console.log('Viewing question:', questionId);
    router.push(`/superviseur/enquetes/${survey.id}/questions/${questionId}`);
  };

  // ============================================
  // HANDLERS - SÉLECTION
  // ============================================

  /**
   * Sélectionne ou désélectionne toutes les questions
   * @param event - Événement de changement de la checkbox
   */
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Sélectionner toutes les questions
      const newSelected = questions.map((_, index) => index);
      setSelected(newSelected);
      return;
    }
    // Désélectionner tout
    setSelected([]);
  };

  /**
   * Toggle la sélection d'une question
   * @param event - Événement de clic
   * @param index - Index de la question dans le tableau
   */
  const handleClick = (event: React.MouseEvent<unknown>, index: number) => {
    const selectedIndex = selected.indexOf(index);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      // Ajouter à la sélection
      newSelected = newSelected.concat(selected, index);
    } else if (selectedIndex === 0) {
      // Retirer le premier élément
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      // Retirer le dernier élément
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      // Retirer un élément au milieu
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  // Types de questions disponibles pour l'affichage - Updated to match new types
  const typeQuestions = [
    { value: 'liste_deroulante', label: 'Liste déroulante' },
    { value: 'case_a_cocher', label: 'Case à cocher' },
    { value: 'question_libre', label: 'Question libre' },
    { value: 'echelle_lineaire', label: 'Échelle linéaire' },
    { value: 'choix_multiple', label: 'Choix multiple' }
  ];

  /**
   * Obtient le label d'un type de question
   */
  const getTypeQuestionLabel = (type: string) => typeQuestions.find(t => t.value === type)?.label || type;

  /**
   * Vérifie si une question est sélectionnée
   * @param index - Index de la question
   */
  const isSelected = (index: number) => selected.indexOf(index) !== -1;

  // ============================================
  // HANDLERS - PAGINATION
  // ============================================

  /**
   * Change de page
   * @param event - Événement
   * @param newPage - Nouvelle page
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * Change le nombre de lignes par page
   * @param event - Événement de changement
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Revenir à la première page
  };

  // ============================================
  // DONNÉES DES STATISTIQUES
  // ============================================
  const surveyStats = [
    {
      title: "Code d'enquête",
      value: survey.code,
      icon: <Assignment sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem' } }} />,
      color: "#1976d2"
    },
    {
      title: "Option",
      value: survey.option,
      icon: <Settings sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem' } }} />,
      color: "#9c27b0"
    },
    {
      title: "Activité",
      value: survey.activity,
      icon: <Work sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem' } }} />,
      color: "#2e7d32"
    },
    {
      title: "Participants",
      value: survey.participants,
      icon: <People sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem' } }} />,
      color: "#ed6c02"
    },
    {
      title: "Date de création",
      value: survey.dateCreation,
      icon: <CalendarToday sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem', lg: '2.25rem' } }} />,
      color: "#0288d1"
    }
  ];

  // ============================================
  // RENDER
  // ============================================
  return (
    <Box sx={{ minHeight: '100vh', p: { xs: 2, md: 3 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>

        {/* ========== EN-TÊTE ========== */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: { xs: 3, md: 4 },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}>
          {/* Titre */}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.875rem', lg: '2.125rem' }
            }}
          >
            Détail de l'enquête
          </Typography>

          {/* Bouton retour */}
          <Button
            variant="contained"
            onClick={handleBack}
            startIcon={<ArrowBack sx={{ fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }} />}
            sx={{
              bgcolor: '#000',
              color: 'white',
              '&:hover': { bgcolor: '#333' },
              fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem', lg: '1rem' },
              px: { xs: 2, md: 3 }
            }}
          >
            Retour
          </Button>
        </Box>

        <Card sx={{ p: { xs: 2, sm: 2.5, md: 3, lg: 4 } }}>

          {/* ========== TITRE DE L'ENQUÊTE ========== */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.125rem', lg: '1.25rem' }
              }}
            >
              Titre de l'enquête
            </Typography>
            <Card
              sx={{
                p: { xs: 1.5, sm: 1.75, md: 2 },
                backgroundColor: '#f8f9fa',
                display: 'inline-block',
                minWidth: 'fit-content'
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.primary,
                  textAlign: 'center',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.125rem', lg: '1.25rem' }
                }}
              >
                {survey.title}
              </Typography>
            </Card>
          </Box>

          {/* ========== STATISTIQUES AVEC INFOCARDS ========== */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {surveyStats.map((stat, index) => (
                <Grid
                  key={index}
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 3  // 4 colonnes sur desktop (12/4 = 3)
                  }}
                >
                  <InfoCard
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    color={stat.color}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* ========== SECTION DES QUESTIONS ========== */}
          <Box>
            {/* En-tête de la section */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.125rem', lg: '1.25rem' }
                }}
              >
                Liste des questions
              </Typography>

              {/* Bouton Consulter les résultats */}
              <Tooltip title="Consulter les résultats de l'enquête" placement="top" arrow>
                <Button
                  variant="contained"
                  onClick={handleViewResults}
                  sx={{
                    backgroundColor: '#000',
                    color: 'white',
                    '&:hover': { backgroundColor: '#333' },
                    minWidth: { xs: '100%', sm: 120 },
                    fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem', lg: '1rem' }
                  }}
                >
                  Consulter
                </Button>
              </Tooltip>
            </Box>

            {/* Tableau des questions */}
            <Card
              sx={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <TableContainer>
                <Table size={dense ? 'small' : 'medium'}>

                  {/* En-tête du tableau */}
                  <TableHead sx={{ backgroundColor: '#fafafa' }}>
                    <TableRow>
                      {/* Checkbox de sélection globale */}
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          indeterminate={selected.length > 0 && selected.length < questions.length}
                          checked={questions.length > 0 && selected.length === questions.length}
                          onChange={handleSelectAllClick}
                        />
                      </TableCell>

                      {/* Numéro de la question */}
                      <TableCell
                        sx={{
                          fontWeight: 'medium',
                          color: '#666',
                          fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8125rem', lg: '0.875rem' }
                        }}
                      >
                        N°
                      </TableCell>

                      {/* Texte de la question */}
                      <TableCell
                        sx={{
                          fontWeight: 'medium',
                          color: '#666',
                          fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8125rem', lg: '0.875rem' }
                        }}
                      >
                        Question
                      </TableCell>

                      {/* Actions */}
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: 'medium',
                          color: '#666',
                          width: 80,
                          fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8125rem', lg: '0.875rem' }
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  {/* Corps du tableau */}
                  <TableBody>
                    {questions
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
                            {/* Checkbox de sélection */}
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                              />
                            </TableCell>

                            {/* Numéro */}
                            <TableCell align="center">
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 'bold',
                                  fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.8125rem', lg: '0.875rem' }
                                }}
                              >
                                {actualIndex + 1}
                              </Typography>
                            </TableCell>

                            {/* Question */}
                            <TableCell>
                              <Typography
                                variant="body2"
                                sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.8125rem', lg: '0.875rem' } }}
                              >
                                {question.question}
                              </Typography>
                              <Typography variant="caption" sx={{
                                color: '#666',
                                fontSize: '0.75rem'
                              }}>
                                {getTypeQuestionLabel(question.type)} 
                              </Typography>
                            </TableCell>

                            {/* Actions */}
                            <TableCell align="center">
                              <Tooltip title="Voir détails" placement="top" arrow>
                                <IconButton
                                  color="info"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Empêcher la sélection de la ligne
                                    handleViewQuestion(question.id);
                                  }}
                                  size="small"
                                >
                                  <Iconify
                                    icon="solar:eye-bold"
                                    sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.375rem' } }}
                                  />
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 2,
                  borderTop: '1px solid #e0e0e0',
                  backgroundColor: '#fafafa',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2
                }}
              >
                {/* Switch Dense */}
                <FormControlLabel
                  control={
                    <Switch
                      checked={dense}
                      onChange={(e) => setDense(e.target.checked)}
                    />
                  }
                  label="Dense"
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.8125rem', lg: '0.875rem' }
                    }
                  }}
                />

                {/* Pagination */}
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={questions.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Lignes par page:"
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
                  sx={{
                    '& .MuiTablePagination-toolbar': {
                      fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.8125rem', lg: '0.875rem' }
                    },
                    '& .MuiTablePagination-selectLabel': {
                      fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.8125rem', lg: '0.875rem' }
                    },
                    '& .MuiTablePagination-displayedRows': {
                      fontSize: { xs: '0.75rem', sm: '0.8rem', md: '0.8125rem', lg: '0.875rem' }
                    }
                  }}
                />
              </Box>
            </Card>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default MuiSurveyDetail;