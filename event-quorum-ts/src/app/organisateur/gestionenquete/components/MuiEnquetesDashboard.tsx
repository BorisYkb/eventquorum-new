// File: src/app/organisateur/gestionenquete/components/MuiEnquetesDashboard.tsx
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
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
import Grid from '@mui/material/Grid2';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { GuichetWidgetSummary } from 'src/sections/overview/e-commerce/guichet/guichet-widget-summary-2';
import DeleteConfirmationModal from './DeleteConfirmationModal';

interface Enquete {
  id: number;
  titre: string;
  activite: string;
  code: string;
  nombreParticipants: number;
  statut: 'Terminé' | 'En cours' | 'Non démarré';
  typeEnquete?: 'live' | 'asynchrone';
  enqueteAnonymat?: boolean;
  authentificationNumerique?: boolean;
  createdAt: string;
}

interface MuiEnquetesDashboardProps {
  enquetes: Enquete[];
}

/**
 * Composant Dashboard pour la gestion des enquêtes
 * Affiche la liste des enquêtes avec filtres, recherche et actions CRUD
 */
const MuiEnquetesDashboard: React.FC<MuiEnquetesDashboardProps> = ({ enquetes: initialEnquetes }) => {
  const theme = useTheme();
  const router = useRouter();
  
  // États pour la gestion des données et filtres
  const [enquetes, setEnquetes] = useState<Enquete[]>(initialEnquetes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statutFilter, setStatutFilter] = useState('');
  const [activiteFilter, setActiviteFilter] = useState('');
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);
  
  // États pour la gestion du modal de suppression et alerte de succès
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [enqueteToDelete, setEnqueteToDelete] = useState<Enquete | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  /**
   * Navigation vers la page de détail d'une enquête
   */
  const handleViewEnquete = (enqueteId: number) => {
    router.push(`/organisateur/gestionenquete/${enqueteId}`);
  };

  /**
   * Navigation vers la page de modification d'une enquête
   */
  const handleEditEnquete = (enqueteId: number) => {
    router.push(`/organisateur/gestionenquete/${enqueteId}/modifier`);
  };

  /**
   * Ouvre le modal de confirmation de suppression
   */
  const handleDeleteClick = (enquete: Enquete) => {
    setEnqueteToDelete(enquete);
    setDeleteModalOpen(true);
  };

  /**
   * Ferme le modal de suppression
   */
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setEnqueteToDelete(null);
  };

  /**
   * Confirme et exécute la suppression de l'enquête
   */
  const handleConfirmDelete = () => {
    if (enqueteToDelete) {
      // Suppression de l'enquête de la liste
      const updatedEnquetes = enquetes.filter(e => e.id !== enqueteToDelete.id);
      setEnquetes(updatedEnquetes);
      
      // Mise à jour de la sélection si l'enquête supprimée était sélectionnée
      setSelected(prev => prev.filter(id => id !== enqueteToDelete.id));
      
      console.log('Enquête supprimée:', enqueteToDelete.id);
      // TODO: Appel API pour supprimer l'enquête
      
      // Affichage de l'alerte de succès
      setShowSuccessAlert(true);
      
      // Fermeture du modal
      setEnqueteToDelete(null);
    }
  };

  /**
   * Navigation vers la page de création d'une nouvelle enquête
   */
  const handleCreateEnquete = () => {
    router.push('/organisateur/gestionenquete/nouveau');
  };

  /**
   * Ferme l'alerte de succès
   */
  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  /**
   * Gestion de la sélection multiple d'enquêtes
   */
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredEnquetes.map((enquete) => enquete.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  /**
   * Gestion de la sélection d'une enquête individuelle
   */
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

  /**
   * Gestion du changement de page
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * Gestion du changement du nombre de lignes par page
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /**
   * Vérifie si une enquête est sélectionnée
   */
  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  /**
   * Filtrage des enquêtes selon les critères de recherche et filtres
   */
  const filteredEnquetes = enquetes.filter(enquete => {
    const matchesSearch = enquete.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquete.activite.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquete.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatut = statutFilter === '' || enquete.statut === statutFilter;
    const matchesActivite = activiteFilter === '' || enquete.activite === activiteFilter;
    return matchesSearch && matchesStatut && matchesActivite;
  });

  const uniqueStatuts = ['Terminé', 'En cours', 'Non démarré'];
  const uniqueActivites = [...new Set(enquetes.map(enquete => enquete.activite))];

  /**
   * Détermine la couleur du label de statut
   */
  const getStatutColor = (statut: string): 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' => {
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

  /**
   * Calcul des statistiques pour les widgets
   */
  const stats = {
    totalEnquetes: enquetes.length,
    enquetesEnCours: enquetes.filter(e => e.statut === 'En cours').length,
    enquetesNonDemarrees: enquetes.filter(e => e.statut === 'Non démarré').length,
    enquetesTerminees: enquetes.filter(e => e.statut === 'Terminé').length,
  };

  /**
   * Couleurs alternées pour les widgets de statistiques
   */
  const getWidgetColor = (index: number): 'primary' | 'warning' | 'error' | 'success' => {
    const colors: Array<'primary' | 'warning' | 'error' | 'success'> = ['primary', 'warning', 'error', 'success'];
    return colors[index % colors.length];
  };

  /**
   * Formatage des nombres pour l'affichage
   */
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#ffff', minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
        Gestion des Enquêtes
      </Typography>

      {/* Cards de statistiques */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <GuichetWidgetSummary
            title="Nombre d'enquêtes"
            total={formatNumber(stats.totalEnquetes)}
            color={getWidgetColor(0)}
            sx={{ height: 170 }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <GuichetWidgetSummary
            title="Enquêtes en cours"
            total={formatNumber(stats.enquetesEnCours)}
            color={getWidgetColor(1)}
            sx={{ height: 170 }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <GuichetWidgetSummary
            title="Enquêtes non démarrées"
            total={formatNumber(stats.enquetesNonDemarrees)}
            color={getWidgetColor(2)}
            sx={{ height: 170 }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <GuichetWidgetSummary
            title="Enquêtes terminées"
            total={formatNumber(stats.enquetesTerminees)}
            color={getWidgetColor(3)}
            sx={{ height: 170 }}
          />
        </Grid>
      </Grid>

      {/* Tableau */}
      <Card>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
            Liste des Enquêtes ({filteredEnquetes.length})
          </Typography>

          {/* Ligne des contrôles sous le titre */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            {/* Filtres à gauche */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControl size="small" sx={{ minWidth: 180 }}>
                <InputLabel sx={{ fontSize: '0.75rem', px: 1 }}>Filtrer par statut</InputLabel>
                <Select
                  value={statutFilter}
                  onChange={(e) => setStatutFilter(e.target.value)}
                  label="Filtrer par statut"
                  sx={{ fontSize: '0.75rem' }}
                >
                  <MenuItem value="" sx={{ fontSize: '0.75rem' }}>Tous les statuts</MenuItem>
                  {uniqueStatuts.map(statut => (
                    <MenuItem key={statut} value={statut} sx={{ fontSize: '0.75rem' }}>{statut}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel sx={{ fontSize: '0.75rem', px: 1 }}>Filtrer par activité</InputLabel>
                <Select
                  value={activiteFilter}
                  onChange={(e) => setActiviteFilter(e.target.value)}
                  label="Filtrer par activité"
                  sx={{ fontSize: '0.75rem' }}
                >
                  <MenuItem value="" sx={{ fontSize: '0.75rem' }}>Toutes les activités</MenuItem>
                  {uniqueActivites.map(activite => (
                    <MenuItem key={activite} value={activite} sx={{ fontSize: '0.75rem' }}>{activite}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Contrôles à droite */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {/* Barre de recherche */}
              <TextField
                size="small"
                placeholder="Rechercher une enquête..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: 300 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Bouton Créer */}
              <Tooltip title="Créer une enquête" placement="top" arrow>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={handleCreateEnquete}
                  sx={{ minWidth: 'auto', bgcolor: 'transparent', color: 'black', border: 1, '&:hover': { boxShadow: 4, borderColor: 'black', bgcolor: 'transparent', color: 'black' } }}
                >
                  Créer
                </Button>
              </Tooltip>
            </Box>
          </Box>

          <TableContainer>
            <Table size={dense ? 'small' : 'medium'}>
              <TableHead>
                <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#F8F9FA', py: 2 } }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={selected.length > 0 && selected.length < filteredEnquetes.length}
                      checked={filteredEnquetes.length > 0 && selected.length === filteredEnquetes.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Titre d'enquête
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Activité
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Code
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Nombre de participants
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
                {filteredEnquetes
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((enquete) => {
                    const isItemSelected = isSelected(enquete.id);

                    return (
                      <TableRow
                        key={enquete.id}
                        hover
                        onClick={(event) => handleClick(event, enquete.id)}
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
                            fontWeight: 600,
                            fontSize: '14px',
                            color: '#374151'
                          }}>
                            {enquete.titre}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                            {enquete.activite}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Typography variant="body2" sx={{
                            fontSize: '14px',
                            color: '#1976D2',
                            fontWeight: 500,
                            fontFamily: 'monospace'
                          }}>
                            {enquete.code}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Typography variant="body2" sx={{
                            fontSize: '14px',
                            color: '#374151',
                            fontWeight: 600
                          }}>
                            {formatNumber(enquete.nombreParticipants)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Label
                            variant="soft"
                            color={getStatutColor(enquete.statut)}
                          >
                            {enquete.statut}
                          </Label>
                        </TableCell>
                        <TableCell align="center" sx={{ py: 2 }}>
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <Tooltip title="Voir détails" placement="top" arrow>
                              <IconButton
                                color="info"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewEnquete(enquete.id);
                                }}
                                size="small"
                                sx={{
                                  width: 32,
                                  height: 32,
                                  '&:hover': { 
                                    bgcolor: 'rgba(33, 150, 243, 0.08)' 
                                  }
                                }}
                              >
                                <Iconify icon="solar:eye-bold" width={16}/>
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Modifier" placement="top" arrow>
                              <IconButton
                                color="warning"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditEnquete(enquete.id);
                                }}
                                size="small"
                                sx={{
                                  width: 32,
                                  height: 32,
                                  '&:hover': { 
                                    bgcolor: 'rgba(255, 152, 0, 0.08)' 
                                  }
                                }}
                              >
                                <Iconify icon="solar:pen-new-square-linear" width={16} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Supprimer" placement="top" arrow>
                              <IconButton
                                color="error"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteClick(enquete);
                                }}
                                size="small"
                                sx={{
                                  width: 32,
                                  height: 32,
                                  '&:hover': { 
                                    bgcolor: 'rgba(244, 67, 54, 0.08)' 
                                  }
                                }}
                              >
                                <Iconify icon="solar:trash-bin-trash-bold" width={16}/>
                              </IconButton>
                            </Tooltip>
                          </Box>
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
              count={filteredEnquetes.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Rows per page:"
            />
          </Box>
        </Box>
      </Card>

      {/* Modal de confirmation de suppression */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Êtes-vous sûr de supprimer cette enquête ?"
        message="Vous ne pourrez pas annuler cette action !"
      />

      {/* Alert de succès pour la suppression */}
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={4000}
        onClose={handleCloseSuccessAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 8 }}
      >
        <Alert 
          onClose={handleCloseSuccessAlert} 
          severity="success" 
          sx={{ 
            width: '100%',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          Enquête supprimée avec succès !
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MuiEnquetesDashboard;
export type { Enquete };