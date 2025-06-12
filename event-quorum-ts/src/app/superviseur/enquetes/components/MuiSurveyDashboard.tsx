// components/MuiSurveyDashboard.tsx
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
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { SuperviseurWidgetSummary } from 'src/sections/overview/superviseur/view/superviseur-widget-summary-2';
import { Survey } from '../types/survey';

interface MuiSurveyDashboardProps {
  surveys: Survey[];
}

const MuiSurveyDashboard: React.FC<MuiSurveyDashboardProps> = ({ surveys }) => {
  const theme = useTheme();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [activityFilter, setActivityFilter] = useState('');
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);

  const handleViewSurvey = (surveyId: number) => {
    router.push(`/superviseur/enquetes/${surveyId}`);
  };

  const handleViewResults = (surveyId: number) => {
    router.push(`/superviseur/enquetes/${surveyId}/resultats`);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredSurveys.map((survey) => survey.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const filteredSurveys = surveys.filter(survey => {
    const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         survey.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         survey.code.includes(searchTerm);
    const matchesStatus = statusFilter === '' || survey.status === statusFilter;
    const matchesActivity = activityFilter === '' || survey.activity === activityFilter;
    return matchesSearch && matchesStatus && matchesActivity;
  });

  const totalSurveys = surveys.length;
  const inProgress = surveys.filter(s => s.status === "En cours").length;
  const notStarted = surveys.filter(s => s.status === "Non démarrée").length;
  const completed = surveys.filter(s => s.status === "Terminée").length;

  const uniqueStatuses = [...new Set(surveys.map(s => s.status))];
  const uniqueActivities = [...new Set(surveys.map(s => s.activity))];

  const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'En cours':
        return 'success';
      case 'Non démarrée':
        return 'warning';
      case 'Terminée':
        return 'error';
      default:
        return 'default';
    }
  };

  // Couleurs alternées pour les widgets
  const getWidgetColor = (index: number): 'primary' | 'secondary' | 'success' | 'warning' => {
    const colors: Array<'primary' | 'secondary' | 'success' | 'warning'> = ['primary', 'secondary', 'success', 'warning'];
    return colors[index % colors.length];
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#ffff', minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
        Gestion des Enquêtes
      </Typography>

      {/* Statistiques avec SuperviseurWidgetSummary */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="Toutes les enquêtes"
            total={totalSurveys}
            color={getWidgetColor(0)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="En cours"
            total={inProgress}
            color={getWidgetColor(1)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="Non démarrées"
            total={notStarted}
            color={getWidgetColor(2)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="Terminées"
            total={completed}
            color={getWidgetColor(3)}
            sx={{ height: 180 }}
          />
        </Grid>
      </Grid>

      {/* Tableau */}
      <Card>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
            Liste des enquêtes ({filteredSurveys.length})
          </Typography>

          {/* Ligne des filtres et recherche sous le titre */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            {/* Filtres à gauche */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel sx={{ fontSize: '0.75rem', px: 1 }}>Sélectionner un statut</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Sélectionner un statut"
                  sx={{ fontSize: '0.75rem' }}
                >
                  <MenuItem value="" sx={{ fontSize: '0.75rem' }}>Tous les statuts</MenuItem>
                  {uniqueStatuses.map(status => (
                    <MenuItem key={status} value={status} sx={{ fontSize: '0.75rem' }}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel sx={{ fontSize: '0.75rem', px: 1 }}>Sélectionner une activité</InputLabel>
                <Select
                  value={activityFilter}
                  onChange={(e) => setActivityFilter(e.target.value)}
                  label="Sélectionner une activité"
                  sx={{ fontSize: '0.75rem' }}
                >
                  <MenuItem value="" sx={{ fontSize: '0.75rem' }}>Toutes les activités</MenuItem>
                  {uniqueActivities.map(activity => (
                    <MenuItem key={activity} value={activity} sx={{ fontSize: '0.75rem' }}>{activity}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Barre de recherche à droite */}
            <TextField
              size="small"
              placeholder="Rechercher par titre, activité ou code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: 350 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <TableContainer>
            <Table size={dense ? 'small' : 'medium'}>
              <TableHead>
                <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#F8F9FA', py: 2 } }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={selected.length > 0 && selected.length < filteredSurveys.length}
                      checked={filteredSurveys.length > 0 && selected.length === filteredSurveys.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Titre enquête
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Activité
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Code
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Participants
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Statut
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSurveys
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((survey) => {
                    const isItemSelected = isSelected(survey.id);

                    return (
                      <TableRow
                        key={survey.id}
                        hover
                        onClick={(event) => handleClick(event, survey.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#F8F9FA' } }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Typography variant="body2" sx={{
                            color: '#1976D2',
                            fontWeight: 500,
                            fontSize: '14px'
                          }}>
                            {survey.title}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                            {survey.activity}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: 'monospace',
                              backgroundColor: '#f5f5f5',
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              display: 'inline-block',
                              fontSize: '14px',
                              color: '#374151'
                            }}
                          >
                            {survey.code}
                          </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ py: 2 }}>
                          <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 600 }}>
                            {survey.participants}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Label
                            variant="soft"
                            color={getStatusColor(survey.status)}
                          >
                            {survey.status}
                          </Label>
                        </TableCell>
                        <TableCell align="center" sx={{ py: 2 }}>
                          <Tooltip title="Voir détails" placement="top" arrow>
                            <IconButton
                              color="info"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewSurvey(survey.id);
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

          {/* Pagination et contrôles */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
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
              count={filteredSurveys.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Rows per page:"
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default MuiSurveyDashboard;