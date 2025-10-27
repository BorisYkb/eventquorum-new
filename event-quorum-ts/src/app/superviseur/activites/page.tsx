// superviseur/activites/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Table from '@mui/material/Table';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { DashboardContent } from 'src/layouts/superviseur';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { SuperviseurWidgetSummary } from 'src/sections/overview/superviseur/view/superviseur-widget-summary-2';

// Import des données des activités depuis le fichier externe
import { ACTIVITES_SUPERVISEUR } from 'src/sections/superviseur/activites/sup-data-activites';

/**
 * Page de liste des activités pour le superviseur
 */
export default function ActivitiesPage() {
  const router = useRouter();
  const theme = useTheme();
  
  // État pour gérer la recherche et les filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Utilisation des données importées depuis le fichier externe
  const activities = ACTIVITES_SUPERVISEUR;

  // Récupération des types uniques pour le filtre dynamique
  const uniqueTypes = Array.from(new Set(activities.map(activity => activity.type)));

  /**
   * Gestion de la navigation vers les détails d'une activité
   */
  const handleViewActivity = (activityId: string) => {
    router.push(`/superviseur/activites/${activityId}`);
  };

  /**
   * Gestion du changement de page pour la pagination
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * Gestion du changement du nombre de lignes par page
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Retour à la première page lors du changement
  };

  /**
   * Fonction pour obtenir la couleur du label de statut
   */
  const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'En cours':
        return 'warning';
      case 'Non démarrée':
        return 'error';
      case 'Terminée':
        return 'success';
      default:
        return 'default';
    }
  };

  /**
   * Filtrage des activités basé sur la recherche et les filtres sélectionnés
   */
  const filteredActivities = activities.filter(activity => {
    // Recherche dans le nom, le type et le titre
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtre par statut
    const matchesStatus = selectedStatus === '' || activity.status === selectedStatus;
    
    // Filtre par type d'activité
    const matchesType = selectedType === '' || activity.type === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  /**
   * Pagination des résultats filtrés
   */
  const paginatedActivities = filteredActivities.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  /**
   * Fonction helper pour obtenir les couleurs alternées des widgets de statistiques
   */
  const getWidgetColor = (index: number): 'primary' | 'secondary' | 'success' | 'warning' => {
    const colors: Array<'primary' | 'secondary' | 'success' | 'warning'> = ['primary', 'secondary', 'success', 'warning'];
    return colors[index % colors.length];
  };

  return (
    <DashboardContent>
      {/* Fil d'Ariane pour la navigation */}
      <CustomBreadcrumbs
        heading="Liste des activités"
        links={[
          { name: 'Superviseur', href: '/superviseur' },
          { name: 'Activités' }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* Section des statistiques avec SuperviseurWidgetSummary */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="Toutes les activités"
            total={activities.length}
            color={getWidgetColor(0)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="En cours"
            total={activities.filter(a => a.status === 'En cours').length}
            color={getWidgetColor(1)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="Non démarrées"
            total={activities.filter(a => a.status === 'Non démarrée').length}
            color={getWidgetColor(2)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="Terminées"
            total={activities.filter(a => a.status === 'Terminée').length}
            color={getWidgetColor(3)}
            sx={{ height: 180 }}
          />
        </Grid>
      </Grid>

      {/* Carte principale contenant le tableau des activités */}
      <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* En-tête avec titre et filtres */}
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              <span style={{ paddingLeft: 8, fontWeight: 'normal', color: theme.palette.text.secondary }}>
                {filteredActivities.length} Activité(s)
              </span>
            </Typography>
          </Box>

          {/* Ligne des filtres et de la barre de recherche */}
          <Grid container spacing={2} alignItems="center">
            {/* Filtre par statut */}
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: '0.875rem' }}>Statut</InputLabel>
                <Select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setPage(0); // Retour à la première page lors du changement de filtre
                  }}
                  label="Statut"
                  sx={{ fontSize: '0.875rem' }}
                >
                  <MenuItem value="" sx={{ fontSize: '0.875rem' }}>Tous les statuts</MenuItem>
                  <MenuItem value="En cours" sx={{ fontSize: '0.875rem' }}>En cours</MenuItem>
                  <MenuItem value="Non démarrée" sx={{ fontSize: '0.875rem' }}>Non démarrée</MenuItem>
                  <MenuItem value="Terminée" sx={{ fontSize: '0.875rem' }}>Terminée</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Filtre par type d'activité */}
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: '0.875rem' }}>Type</InputLabel>
                <Select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setPage(0); // Retour à la première page lors du changement de filtre
                  }}
                  label="Type"
                  sx={{ fontSize: '0.875rem' }}
                >
                  <MenuItem value="" sx={{ fontSize: '0.875rem' }}>Tous les types</MenuItem>
                  {uniqueTypes.map((type) => (
                    <MenuItem key={type} value={type} sx={{ fontSize: '0.875rem' }}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Barre de recherche */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Rechercher par nom, type ou titre..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(0); // Retour à la première page lors de la recherche
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Conteneur du tableau avec scrollbar */}
        <TableContainer>
          <Scrollbar>
            <Table sx={{ minWidth: 800 }}>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Activités
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Titre
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Statut
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Date
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedActivities.map((activity) => (
                  <TableRow
                    key={activity.id}
                    hover
                    sx={{
                      '&:hover': {
                        bgcolor: '#F8F9FA',
                        cursor: 'pointer'
                      }
                    }}
                  >
                    {/* Colonne: Nom de l'activité */}
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#6B7280'
                      }}>
                        {activity.name}
                      </Typography>
                    </TableCell>

                    {/* Colonne: Type d'activité */}
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                        {activity.type}
                      </Typography>
                    </TableCell>

                    {/* Colonne: Titre de l'activité */}
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                        {activity.title}
                      </Typography>
                    </TableCell>

                    {/* Colonne: Statut avec badge coloré */}
                    <TableCell sx={{ py: 2 }}>
                      <Label
                        variant="soft"
                        color={getStatusColor(activity.status)}
                      >
                        {activity.status}
                      </Label>
                    </TableCell>

                    {/* Colonne: Date et horaires */}
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontSize: '14px', color: '#6B7280' }}>
                        {activity.date}
                      </Typography>
                    </TableCell>

                    {/* Colonne: Actions avec bouton Voir */}
                    <TableCell align="center" sx={{ py: 2 }}>
                      <Tooltip title="Voir détails" placement="top" arrow>
                        <IconButton
                          color="info"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewActivity(activity.id);
                          }}
                          size="small"
                          sx={{
                            color: 'info',
                            '&:hover': {
                              bgcolor: 'action.hover'
                            }
                          }}
                        >
                          <Iconify icon="solar:eye-bold" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        {/* Message si aucun résultat trouvé */}
        {filteredActivities.length === 0 && (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Aucune activité trouvée pour "{searchTerm}"
            </Typography>
          </Box>
        )}

        {/* Pagination */}
        {filteredActivities.length > 0 && (
          <TablePagination
            component="div"
            count={filteredActivities.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
            labelRowsPerPage="Lignes par page:"
            labelDisplayedRows={({ from, to, count }) => 
              `${from}-${to} sur ${count !== -1 ? count : `plus de ${to}`}`
            }
            sx={{
              borderTop: 1,
              borderColor: 'divider',
            }}
          />
        )}
      </Card>
    </DashboardContent>
  );
}