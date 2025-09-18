'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  ArrowBack,
  PlayArrow,
  Pause,
  Stop,
  Assignment,
  Settings,
  Work
} from '@mui/icons-material';

import { Iconify } from 'src/components/iconify'; // Ajustez le chemin selon votre structure

import { Survey, Question } from '../types/survey';


interface MuiSurveyDetailProps {
  survey: Survey;
  questions: Question[];
}

// Composant personnalisé pour les cards d'information
const InfoCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, icon, color }) => {
  return (
    <Card sx={{
      p: 3,
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
      border: `1px solid ${color}30`,
      borderRadius: 2,
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: `0 8px 25px ${color}20`,
      }
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 56,
        height: 56,
        borderRadius: '50%',
        bgcolor: `${color}15`,
        color: color,
        mr: 2,
        flexShrink: 0
      }}>
        {icon}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography variant="body2" sx={{
          color: 'text.secondary',
          fontWeight: 500,
          mb: 0.5,
          fontSize: '0.875rem'
        }}>
          {title}
        </Typography>
        <Typography variant="h6" sx={{
          fontWeight: 'bold',
          color: 'text.primary',
          wordBreak: 'break-word',
          lineHeight: 1.2
        }}>
          {value || 'Non défini'}
        </Typography>
      </Box>
    </Card>
  );
};


const MuiSurveyDetail: React.FC<MuiSurveyDetailProps> = ({ survey, questions }) => {
  const router = useRouter();
  const theme = useTheme();
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);


  console.log('Survey data:', survey);
  console.log('Questions data:', questions);
  console.log('Survey code:', survey.code);
  console.log('Survey option:', survey.option);

  const handleViewResults = () => {
    console.log('Navigating to results for survey:', survey.id);
    router.push(`/intervenant/enquetes/${survey.id}/resultats`);
  };

  const handleBack = () => {
    router.push('/intervenant/enquetes');
  };

  const handleStartSurvey = () => {
    console.log('Démarrage de l\'enquête:', survey.id);
    // Logique pour démarrer l'enquête
  };

  const handleSuspendSurvey = () => {
    console.log('Suspension de l\'enquête:', survey.id);
    // Logique pour suspendre l'enquête
  };

  const handleEndSurvey = () => {
    console.log('Fin de l\'enquête:', survey.id);
    // Logique pour terminer l'enquête
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = questions.map((_, index) => index);
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
    // Logique pour voir les détails de la question
    // Naviguer vers la page de détail de la question
    router.push(`/intervenant/enquetes/${survey.id}/questions/${questionId}`);
    console.log('Viewing question:', questionId);
  };

  const isSelected = (index: number) => selected.indexOf(index) !== -1;

  return (
    <Box sx={{ minHeight: '100vh', p: 3 }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>

        <div className='flex items-center justify-between mb-6'>

          {/* Titre */}
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
            Détail de l'enquête
          </Typography>
          {/* Bouton retour */}
          <Button
            variant="contained"
            onClick={handleBack}
            startIcon={<ArrowBack />}
            sx={{
              bgcolor: '#000',
              color: 'white',
              '&:hover': { bgcolor: '#333' },
              mb: 3
            }}
          >
            Retour
          </Button>
        </div>

        <Card sx={{ p: 3 }}>
          {/* Titre de l'enquête */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Titre de l'enquête
            </Typography>
            <Card sx={{
              p: 3,
              backgroundColor: '#f8f9fa',
              display: 'inline-block',
              minWidth: 'fit-content',
              borderRadius: 2,
              border: '1px solid #e0e0e0'
            }}>
              <Typography variant="h6" sx={{
                color: theme.palette.text.primary,
                textAlign: 'center',
                fontWeight: 600
              }}>
                {survey.title}
              </Typography>
            </Card>
          </Box>

          {/* Cards d'informations améliorées */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Informations de l'enquête
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <InfoCard
                  title="Code d'enquête"
                  value={survey.code}
                  icon={<Assignment fontSize="large" />}
                  color="#1976d2"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <InfoCard
                  title="Option"
                  value={survey.option}
                  icon={<Settings fontSize="large" />}
                  color="#9c27b0"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <InfoCard
                  title="Activité"
                  value={survey.activity}
                  icon={<Work fontSize="large" />}
                  color="#2e7d32"
                />
              </Grid>
            </Grid>
          </Box>

          {/* Boutons d'action de l'enquête */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Actions sur l'enquête
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Tooltip title="Démarrer l'enquête" placement="top" arrow>
                <Button
                  variant="contained"
                  onClick={handleStartSurvey}
                  startIcon={<PlayArrow />}
                  sx={{
                    backgroundColor: 'transparent',
                    color: '#4caf50',
                    '&:hover': { backgroundColor: '#4caf50', color: 'white' },
                    borderColor: '#4caf50',
                    borderWidth: 2,
                    borderStyle: 'solid',
                    minWidth: 80,
                    py: 0.2,
                    px: 1.5,
                    fontSize: '0.7rem',
                    lineHeight: 1.2,
                  }}
                >
                  Démarrer
                </Button>
              </Tooltip>

              <Tooltip title="Suspendre l'enquête" placement="top" arrow>
                <Button
                  variant="contained"
                  onClick={handleSuspendSurvey}
                  startIcon={<Pause />}
                  sx={{
                    backgroundColor: 'transparent',
                    color: '#2196f3',
                    '&:hover': { backgroundColor: '#2196f3', color: 'white' },
                    borderColor: '#2196f3',
                    borderWidth: 2,
                    borderStyle: 'solid',
                    minWidth: 80,
                    py: 0.2,
                    px: 1.5,
                    fontSize: '0.7rem',
                    lineHeight: 1.2,
                  }}
                >
                  Suspendre
                </Button>
              </Tooltip>

              <Tooltip title="Terminer l'enquête" placement="top" arrow>
                <Button
                  variant="contained"
                  onClick={handleEndSurvey}
                  startIcon={<Stop />}
                  sx={{
                    backgroundColor: 'transparent',
                    color: '#f44336',
                    '&:hover': { backgroundColor: '#f44336', color: 'white' },
                    borderColor: '#f44336',
                    borderWidth: 2,
                    borderStyle: 'solid',
                    minWidth: 80,
                    py: 0.2,
                    px: 1.5,
                    fontSize: '0.7rem',
                    lineHeight: 1.2,
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
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Liste des questions
              </Typography>
              <Tooltip title="Consulter les résultats de l'enquête" placement="top" arrow>
                <Button
                  variant="contained"
                  onClick={handleViewResults}
                  sx={{
                    backgroundColor: '#000',
                    color: 'white',
                    '&:hover': { backgroundColor: '#333' },
                    minWidth: 120
                  }}
                >
                  Consulter
                </Button>
              </Tooltip>
            </Box>

            {/* Tableau des questions */}
            <Card sx={{ backgroundColor: 'white', border: '1px solid #e0e0e0', borderRadius: 2 }}>
              <TableContainer>
                <Table size={dense ? 'small' : 'medium'}>
                  <TableHead sx={{ backgroundColor: '#fafafa' }}>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          indeterminate={selected.length > 0 && selected.length < questions.length}
                          checked={questions.length > 0 && selected.length === questions.length}
                          onChange={handleSelectAllClick}
                        />
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'medium', color: '#666' }}>N°</TableCell>
                      <TableCell sx={{ fontWeight: 'medium', color: '#666' }}>Question</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'medium', color: '#666', width: 80 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
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
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                {actualIndex + 1}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2">
                                {question.question}
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
                                >
                                  <Iconify icon="solar:eye-bold" />
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
                backgroundColor: '#fafafa'
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
                  count={questions.length}
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
      </Box>
    </Box>
  );
};

export default MuiSurveyDetail;