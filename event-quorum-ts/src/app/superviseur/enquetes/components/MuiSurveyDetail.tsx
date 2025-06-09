
// components/MuiSurveyDetail.tsx
'use client'
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
import Chip from '@mui/material/Chip';
import { ArrowBack, Visibility } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import { Survey, Question } from '../types/survey';

interface MuiSurveyDetailProps {
  survey: Survey;
  questions: Question[];
}

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
    router.push(`/superviseur/enquetes/${survey.id}/resultats`);
  };

  const handleBack = () => {
    router.push('/superviseur/enquetes');
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

  const isSelected = (index: number) => selected.indexOf(index) !== -1;

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', p: 3 }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>

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

        {/* Titre */}
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 3 }}>
          Détail de l'enquête
        </Typography>

        <Card sx={{ p: 4 }}>
          {/* Titre de l'enquête */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Titre de l'enquête
            </Typography>
            <Card sx={{ p: 2, backgroundColor: '#f8f9fa' }}>
              <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                {survey.title}
              </Typography>
            </Card>
          </Box>

          {/* Cartes d'informations - Style des images avec vraies données */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid size={2.4}>
              <Card sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: '#e3f2fd',
                border: '2px solid #bbdefb',
                borderRadius: 3
              }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: '#666' }}>
                  Code d'enquête
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {survey.code}
                </Typography>
              </Card>
            </Grid>

            <Grid size={2.4}>
              <Card sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                border: '2px solid #e0e0e0',
                borderRadius: 3
              }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: '#666' }}>
                  Option
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {survey.option}
                </Typography>
              </Card>
            </Grid>

            <Grid size={2.4}>
              <Card sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: '#e3f2fd',
                border: '2px solid #bbdefb',
                borderRadius: 3
              }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: '#666' }}>
                  Activité
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {survey.activity}
                </Typography>
              </Card>
            </Grid>

            <Grid size={2.4}>
              <Card sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                border: '2px solid #e0e0e0',
                borderRadius: 3
              }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: '#666' }}>
                  Participants
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {survey.participants}
                </Typography>
              </Card>
            </Grid>

            <Grid size={2.4}>
              <Card sx={{
                p: 3,
                textAlign: 'center',
                backgroundColor: '#e3f2fd',
                border: '2px solid #bbdefb',
                borderRadius: 3
              }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: '#666' }}>
                  Date de création
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                  {survey.dateCreation}
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Section des questions */}
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Liste des questions
              </Typography>
              <Button
                variant="contained"
                onClick={handleViewResults}
                sx={{
                  backgroundColor: '#ff9800',
                  '&:hover': { backgroundColor: '#f57c00' }
                }}
              >
                Consulter les résultats
              </Button>
            </Box>

            {/* Tableau des questions - Style image avec vraies questions */}
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
                      <TableCell align="center" sx={{ fontWeight: 'medium', color: '#666' }}>Actions</TableCell>
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
                              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                <IconButton
                                  size="small"
                                  sx={{ color: '#666' }}
                                >
                                  <Visibility fontSize="small" />
                                </IconButton>
                                <Typography variant="caption">
                                  Voir
                                </Typography>
                              </Box>
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
