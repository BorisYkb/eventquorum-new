// components/MuiSurveyDashboard.tsx
'use client'
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
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

import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { SuperviseurWidgetSummary } from 'src/sections/overview/superviseur/view/superviseur-widget-summary-2';
import { Survey } from '../../../app/superviseur/enquetes/types/survey';

interface MuiSurveyDashboardProps {
  surveys: Survey[];
}

const MuiSurveyDashboard: React.FC<MuiSurveyDashboardProps> = ({ surveys }) => {
  const router = useRouter();

  // États pour les filtres et la recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [activityFilter, setActivityFilter] = useState('');

  // États pour la sélection et la pagination
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);

  // ============================================
  // INTÉGRATION API BACKEND - INSTRUCTIONS
  // ============================================
  // 1. Remplacer la prop `surveys` par un fetch des données via API
  // 2. Utiliser useEffect pour charger les données au montage du composant
  // 3. Ajouter un état de chargement (loading) et d'erreur (error)
  // 
  // Exemple d'implémentation :
  // 
  // const [surveys, setSurveys] = useState<Survey[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // 
  // useEffect(() => {
  //   const fetchSurveys = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch('/api/superviseur/enquetes');
  //       if (!response.ok) throw new Error('Erreur lors du chargement des enquêtes');
  //       const data = await response.json();
  //       setSurveys(data);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchSurveys();
  // }, []);
  //
  // 4. Afficher un skeleton loader pendant le chargement
  // 5. Afficher un message d'erreur si nécessaire
  // ============================================

  // Navigation vers les détails d'une enquête
  const handleViewSurvey = (surveyId: number) => {
    router.push(`/superviseur/enquetes/${surveyId}`);

    // INTÉGRATION API : Cette navigation devrait pointer vers une page qui charge
    // les détails de l'enquête via : GET /api/superviseur/enquetes/${surveyId}
  };

  // Navigation vers les résultats d'une enquête (fonction non utilisée actuellement)
  const handleViewResults = (surveyId: number) => {
    router.push(`/superviseur/enquetes/${surveyId}/resultats`);

    // INTÉGRATION API : Cette navigation devrait pointer vers une page qui charge
    // les résultats via : GET /api/superviseur/enquetes/${surveyId}/resultats
  };

  // Gestion de la sélection multiple
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

  // Gestion de la pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Vérifier si un élément est sélectionné
  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Filtrage des enquêtes avec useMemo pour optimiser les performances
  const filteredSurveys = useMemo(() => {
    return surveys.filter(survey => {
      // Normalisation de la recherche (insensible à la casse et aux accents)
      const normalizeString = (str: string) =>
        str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      const searchLower = normalizeString(searchTerm);

      const matchesSearch = searchTerm === '' ||
        normalizeString(survey.title).includes(searchLower) ||
        normalizeString(survey.activity).includes(searchLower) ||
        normalizeString(survey.code).includes(searchLower);

      const matchesStatus = statusFilter === '' || survey.status === statusFilter;
      const matchesActivity = activityFilter === '' || survey.activity === activityFilter;

      return matchesSearch && matchesStatus && matchesActivity;
    });
  }, [surveys, searchTerm, statusFilter, activityFilter]);

  // Calcul des statistiques avec useMemo
  const statistics = useMemo(() => ({
    total: surveys.length,
    inProgress: surveys.filter(s => s.status === "En cours").length,
    notStarted: surveys.filter(s => s.status === "Non démarrée").length,
    completed: surveys.filter(s => s.status === "Terminée").length,
  }), [surveys]);

  // Extraction des valeurs uniques pour les filtres
  const uniqueStatuses = useMemo(() =>
    [...new Set(surveys.map(s => s.status))].sort(),
    [surveys]
  );

  const uniqueActivities = useMemo(() =>
    [...new Set(surveys.map(s => s.activity))].sort(),
    [surveys]
  );

  // Mapping des couleurs de statut
  const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' => {
    const statusColorMap: Record<string, 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'> = {
      'En cours': 'warning',
      'Non démarrée': 'error',
      'Terminée': 'success',
    };
    return statusColorMap[status] || 'default';
  };

  // Couleurs alternées pour les widgets de statistiques
  const getWidgetColor = (index: number): 'primary' | 'secondary' | 'success' | 'warning' => {
    const colors: Array<'primary' | 'secondary' | 'success' | 'warning'> =
      ['primary', 'secondary', 'success', 'warning'];
    return colors[index % colors.length];
  };

  // Réinitialisation de la page lors du changement de filtres
  React.useEffect(() => {
    setPage(0);
  }, [searchTerm, statusFilter, activityFilter]);

  // Réinitialisation de la sélection si les items sélectionnés ne sont plus dans les résultats filtrés
  React.useEffect(() => {
    const filteredIds = filteredSurveys.map(s => s.id);
    const validSelected = selected.filter(id => filteredIds.includes(id));
    if (validSelected.length !== selected.length) {
      setSelected(validSelected);
    }
  }, [filteredSurveys]);

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
            total={statistics.total}
            color={getWidgetColor(0)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="En cours"
            total={statistics.inProgress}
            color={getWidgetColor(1)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="Non démarrées"
            total={statistics.notStarted}
            color={getWidgetColor(2)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="Terminées"
            total={statistics.completed}
            color={getWidgetColor(3)}
            sx={{ height: 180 }}
          />
        </Grid>
      </Grid>

      {/* Tableau des enquêtes */}
      <Card>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
            Liste des enquêtes ({filteredSurveys.length})
          </Typography>

          {/* Filtres et barre de recherche */}
          <Box sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            flexWrap: 'wrap'
          }}>
            {/* Filtres à gauche */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel sx={{ fontSize: '0.75rem', px: 1 }}>
                  Sélectionner un statut
                </InputLabel>
                <Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  label="Sélectionner un statut"
                  sx={{ fontSize: '0.75rem' }}
                >
                  <MenuItem value="" sx={{ fontSize: '0.75rem' }}>
                    Tous les statuts
                  </MenuItem>
                  {uniqueStatuses.map(status => (
                    <MenuItem key={status} value={status} sx={{ fontSize: '0.75rem' }}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel sx={{ fontSize: '0.75rem', px: 1 }}>
                  Sélectionner une activité
                </InputLabel>
                <Select
                  value={activityFilter}
                  onChange={(e) => setActivityFilter(e.target.value)}
                  label="Sélectionner une activité"
                  sx={{ fontSize: '0.75rem' }}
                >
                  <MenuItem value="" sx={{ fontSize: '0.75rem' }}>
                    Toutes les activités
                  </MenuItem>
                  {uniqueActivities.map(activity => (
                    <MenuItem key={activity} value={activity} sx={{ fontSize: '0.75rem' }}>
                      {activity}
                    </MenuItem>
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
              sx={{ width: { xs: '100%', md: 350 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Affichage du message si aucun résultat */}
          {filteredSurveys.length === 0 ? (
            <Box sx={{
              textAlign: 'center',
              py: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2
            }}>
              <Iconify
                icon="solar:file-search-broken"
                sx={{ fontSize: 64, color: 'text.disabled' }}
              />
              <Typography variant="h6" color="text.secondary">
                Aucune enquête trouvée
              </Typography>
              <Typography variant="body2" color="text.disabled">
                Essayez de modifier vos filtres ou votre recherche
              </Typography>
            </Box>
          ) : (
            <>
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
                          inputProps={{ 'aria-label': 'Sélectionner toutes les enquêtes' }}
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
                                inputProps={{ 'aria-label': `Sélectionner ${survey.title}` }}
                              />
                            </TableCell>
                            <TableCell sx={{ py: 2 }}>
                              <Typography variant="body2" sx={{
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
                                  aria-label={`Voir les détails de ${survey.title}`}
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
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: 2,
                flexWrap: 'wrap',
                gap: 2
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
                  count={filteredSurveys.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  labelRowsPerPage="Lignes par page:"
                  labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} sur ${count !== -1 ? count : `plus de ${to}`}`
                  }
                />
              </Box>
            </>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default MuiSurveyDashboard;