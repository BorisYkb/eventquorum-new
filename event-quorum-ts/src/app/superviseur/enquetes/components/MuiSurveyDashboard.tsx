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
import { useTheme } from '@mui/material/styles';
import { Search, Visibility } from '@mui/icons-material';

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

  const getStatusColor = (statusColor: string) => {
    switch (statusColor) {
      case 'green':
        return theme.palette.success.main;
      case 'orange':
        return theme.palette.warning.main;
      case 'red':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getStatusBgColor = (statusColor: string) => {
    switch (statusColor) {
      case 'green':
        return theme.palette.success.light;
      case 'orange':
        return theme.palette.warning.light;
      case 'red':
        return theme.palette.error.light;
      default:
        return theme.palette.grey[100];
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
        Gestion des Enquêtes
      </Typography>

      {/* Cartes statistiques */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={3}>
          <Card sx={{
            p: 3,
            textAlign: 'center',
            backgroundColor: '#e3f2fd',
            border: '2px solid #bbdefb'
          }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: '#666' }}>
              Toutes les enquêtes
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
              {totalSurveys}
            </Typography>
          </Card>
        </Grid>

        <Grid size={3}>
          <Card sx={{
            p: 3,
            textAlign: 'center',
            backgroundColor: '#f5f5f5',
            border: '2px solid #e0e0e0'
          }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: '#666' }}>
              En cours
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
              {inProgress}
            </Typography>
          </Card>
        </Grid>

        <Grid size={3}>
          <Card sx={{
            p: 3,
            textAlign: 'center',
            backgroundColor: '#e3f2fd',
            border: '2px solid #bbdefb'
          }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: '#666' }}>
              Non démarrées
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
              {notStarted}
            </Typography>
          </Card>
        </Grid>

        <Grid size={3}>
          <Card sx={{
            p: 3,
            textAlign: 'center',
            backgroundColor: '#f5f5f5',
            border: '2px solid #e0e0e0'
          }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: '#666' }}>
              Terminées
            </Typography>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
              {completed}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Barre de recherche et filtres */}
      <Card sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Rechercher par titre, activité ou code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1, maxWidth: 400 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Statut</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Statut"
            >
              <MenuItem value="">Tous les statuts</MenuItem>
              {uniqueStatuses.map(status => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Activité</InputLabel>
            <Select
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
              label="Activité"
            >
              <MenuItem value="">Toutes les activités</MenuItem>
              {uniqueActivities.map(activity => (
                <MenuItem key={activity} value={activity}>{activity}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Card>

      {/* Tableau */}
      <Card>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
            Liste des enquêtes
          </Typography>

          <TableContainer>
            <Table size={dense ? 'small' : 'medium'}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={selected.length > 0 && selected.length < filteredSurveys.length}
                      checked={filteredSurveys.length > 0 && selected.length === filteredSurveys.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell>Titre enquête</TableCell>
                  <TableCell>Activité</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell align="center">Participants</TableCell>
                  <TableCell>Statut</TableCell>
                  <TableCell align="center">Actions</TableCell>
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
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" fontWeight="medium">
                            {survey.title}
                          </Typography>
                        </TableCell>
                        <TableCell>{survey.activity}</TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              fontFamily: 'monospace',
                              backgroundColor: '#f5f5f5',
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              display: 'inline-block'
                            }}
                          >
                            {survey.code}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body2" fontWeight="bold">
                            {survey.participants}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              backgroundColor: getStatusBgColor(survey.statusColor),
                              color: getStatusColor(survey.statusColor),
                              px: 2,
                              py: 0.5,
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              fontWeight: 'medium',
                              display: 'inline-block'
                            }}
                          >
                            {survey.status}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            size="small"
                            startIcon={<Visibility />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewSurvey(survey.id);
                            }}
                          >
                            Voir
                          </Button>
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

interface MuiSurveyDashboardProps {
  surveys: Survey[];
}

