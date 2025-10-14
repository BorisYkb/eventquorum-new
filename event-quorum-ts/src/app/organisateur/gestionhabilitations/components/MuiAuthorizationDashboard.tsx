// src/app/organisateur/gestionhabilitations/components/MuiAuthorizationDashboard.tsx

'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import TableContainer from '@mui/material/TableContainer';
import InputAdornment from '@mui/material/InputAdornment';
import TablePagination from '@mui/material/TablePagination';
import FormControlLabel from '@mui/material/FormControlLabel';

import DeleteConfirmationModal from 'src/app/organisateur/gestionenquete/components/DeleteConfirmationModal';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

interface Authorization {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

interface MuiAuthorizationDashboardProps {
  authorizations: Authorization[];
  onAuthorizationDelete?: (id: number) => void;
}

/**
 * Composant Dashboard pour la gestion des habilitations
 * Affiche la liste des habilitations avec filtres, recherche et actions CRUD
 */
const MuiAuthorizationDashboard: React.FC<MuiAuthorizationDashboardProps> = ({ 
  authorizations: authorizationsProp,
  onAuthorizationDelete
}) => {
  const theme = useTheme();
  const router = useRouter();
  
  // États pour la gestion des données locales
  const [localAuthorizations, setLocalAuthorizations] = useState<Authorization[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);
  
  // États pour la gestion du modal de suppression et alerte de succès
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [authToDelete, setAuthToDelete] = useState<Authorization | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  /**
   * Synchronisation des données reçues en props avec l'état local
   */
  useEffect(() => {
    setLocalAuthorizations(authorizationsProp);
  }, [authorizationsProp]);

  /**
   * Navigation vers la page de détail d'une habilitation
   */
  const handleViewAuthorization = (authId: number) => {
    router.push(`/organisateur/gestionhabilitations/${authId}`);
  };

  /**
   * Navigation vers la page de modification d'une habilitation
   */
  const handleEditAuthorization = (authId: number) => {
    router.push(`/organisateur/gestionhabilitations/${authId}/modifier`);
  };

  /**
   * Ouvre le modal de confirmation de suppression
   */
  const handleDeleteClick = (auth: Authorization) => {
    setAuthToDelete(auth);
    setDeleteModalOpen(true);
  };

  /**
   * Ferme le modal de suppression
   */
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setAuthToDelete(null);
  };

  /**
   * Confirme et exécute la suppression de l'habilitation
   */
  const handleConfirmDelete = () => {
    if (authToDelete) {
      // Suppression locale immédiate pour une meilleure UX
      const updatedAuthorizations = localAuthorizations.filter(a => a.id !== authToDelete.id);
      setLocalAuthorizations(updatedAuthorizations);
      
      // Mise à jour de la sélection si l'habilitation supprimée était sélectionnée
      setSelected(prev => prev.filter(id => id !== authToDelete.id));
      
      // Callback vers le composant parent si fourni
      if (onAuthorizationDelete) {
        onAuthorizationDelete(authToDelete.id);
      }
      
      console.log('Habilitation supprimée:', authToDelete.id);
      // TODO: Appel API pour supprimer l'habilitation
      // await deleteAuthorization(authToDelete.id);
      
      // Affichage de l'alerte de succès
      setShowSuccessAlert(true);
      
      // Fermeture du modal
      setAuthToDelete(null);
    }
  };

  /**
   * Navigation vers la page de création d'une nouvelle habilitation
   */
  const handleCreateAuthorization = () => {
    router.push('/organisateur/gestionhabilitations/nouveau');
  };

  /**
   * Fonction d'export des habilitations
   */
  const handleExportAuthorizations = () => {
    const dataToExport = roleFilter 
      ? localAuthorizations.filter(auth => auth.role === roleFilter)
      : localAuthorizations;
    
    console.log('Export des habilitations:', dataToExport);
    // TODO: Implémenter la logique d'export (CSV, Excel, etc.)
  };

  /**
   * Ferme l'alerte de succès
   */
  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  /**
   * Gestion de la sélection multiple d'habilitations
   */
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredAuthorizations.map((auth) => auth.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  /**
   * Gestion de la sélection d'une habilitation individuelle
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
   * Vérifie si une habilitation est sélectionnée
   */
  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  /**
   * Filtrage des habilitations selon les critères de recherche et filtres
   */
  const filteredAuthorizations = localAuthorizations.filter(auth => {
    const matchesSearch = auth.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auth.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auth.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auth.phone.includes(searchTerm) ||
                         auth.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === '' || auth.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const uniqueRoles = [...new Set(localAuthorizations.map(auth => auth.role))];

  /**
   * Détermine la couleur du label de rôle
   */
  const getRoleColor = (role: string): 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' => {
    switch (role) {
      case 'Superviseur':
        return 'primary';
      case 'Intervenant':
        return 'info';
      case 'Opérateur de saisie':
        return 'secondary';
      case 'Organisateur':
        return 'success';
      case 'Guichetier':
        return 'warning';
      case 'Tous accès':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#ffff', minHeight: '100vh' }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
        Gestion des Habilitations
      </Typography>

      {/* Tableau */}
      <Card>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
            Liste des Accès ({filteredAuthorizations.length})
          </Typography>

          {/* Ligne des contrôles sous le titre */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            {/* Filtre par rôle à gauche */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel sx={{ fontSize: '0.75rem', px: 1 }}>Filtrer par rôle</InputLabel>
                <Select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  label="Filtrer par rôle"
                  sx={{ fontSize: '0.75rem' }}
                >
                  <MenuItem value="" sx={{ fontSize: '0.75rem' }}>Tous les rôles</MenuItem>
                  {uniqueRoles.map(role => (
                    <MenuItem key={role} value={role} sx={{ fontSize: '0.75rem' }}>{role}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Contrôles à droite */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {/* Barre de recherche */}
              <TextField
                size="small"
                placeholder="Rechercher un accès..."
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

              {/* Bouton Exporter */}
              <Tooltip title="Exporter la liste des accès" placement="top" arrow>
                <Button
                  variant="outlined"
                  startIcon={<Iconify icon="eva:download-fill" />}
                  onClick={handleExportAuthorizations}
                  sx={{ 
                    minWidth: 'auto', 
                    bgcolor: 'black', 
                    color: 'white', 
                    border: '1px solid black',
                    '&:hover': { 
                      boxShadow: 4, 
                      bgcolor: 'black', 
                      color: 'white' 
                    } 
                  }}
                >
                  Exporter
                </Button>
              </Tooltip>

              {/* Bouton Créer */}
              <Tooltip title="Créer un accès" placement="top" arrow>
                <Button
                  variant="outlined"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={handleCreateAuthorization}
                  sx={{ 
                    minWidth: 'auto', 
                    bgcolor: 'transparent', 
                    color: 'black',
                    border: '1px solid black', 
                    '&:hover': { 
                      boxShadow: 4, 
                      borderColor: 'black', 
                      bgcolor: 'transparent', 
                      color: 'black' 
                    } 
                  }}
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
                      indeterminate={selected.length > 0 && selected.length < filteredAuthorizations.length}
                      checked={filteredAuthorizations.length > 0 && selected.length === filteredAuthorizations.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Nom
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Prénom
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Téléphone
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Rôle
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredAuthorizations
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((auth) => {
                    const isItemSelected = isSelected(auth.id);

                    return (
                      <TableRow
                        key={auth.id}
                        hover
                        onClick={(event) => handleClick(event, auth.id)}
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
                            {auth.lastName}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                            {auth.firstName}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                            {auth.phone}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Typography variant="body2" sx={{ fontSize: '14px' }}>
                            {auth.email}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 2 }}>
                          <Label
                            variant="soft"
                            color={getRoleColor(auth.role)}
                          >
                            {auth.role}
                          </Label>
                        </TableCell>
                        <TableCell align="center" sx={{ py: 2 }}>
                          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <Tooltip title="Voir détails" placement="top" arrow>
                              <IconButton
                                color="info"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewAuthorization(auth.id);
                                }}
                                size="small"
                                sx={{
                                  width: 32,
                                  height: 32,
                                  color: '#374151',
                                  '&:hover': { 
                                    bgcolor: 'rgba(55, 65, 81, 0.08)' 
                                  }
                                }}
                              >
                                <Iconify icon="solar:eye-bold" width={17} height={17} />
                              </IconButton>
                            </Tooltip>
                              
                            {/* Afficher Modifier et Supprimer uniquement si le rôle n'est pas "Organisateur" */}
                            {auth.role !== 'Organisateur' && (
                              <>
                                <Tooltip title="Modifier" placement="top" arrow>
                                  <IconButton
                                    color="warning"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditAuthorization(auth.id);
                                    }}
                                    size="small"
                                    sx={{
                                      width: 32,
                                      height: 32,
                                      color: '#00B8D9',
                                      '&:hover': { 
                                        bgcolor: 'rgba(0, 184, 217, 0.08)' 
                                      }
                                    }}
                                  >
                                    <Icon icon="solar:pen-new-square-linear" width={15} height={15} />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Supprimer" placement="top" arrow>
                                  <IconButton
                                    color="error"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteClick(auth);
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
                                    <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                                  </IconButton>
                                </Tooltip>
                              </>
                            )}
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
              count={filteredAuthorizations.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Lignes par page:"
            />
          </Box>
        </Box>
      </Card>

      {/* Modal de confirmation de suppression */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Êtes-vous sûr de supprimer cette habilitation ?"
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
          Habilitation supprimée avec succès !
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MuiAuthorizationDashboard;
export type { Authorization };