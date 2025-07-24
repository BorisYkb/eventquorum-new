// components/MuiAuthorizationDashboard.tsx
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
import { useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import AuthorizationDetailModal from './AuthorizationDetailModal';

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
}

const MuiAuthorizationDashboard: React.FC<MuiAuthorizationDashboardProps> = ({ authorizations }) => {
  const theme = useTheme();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedAuthorization, setSelectedAuthorization] = useState<Authorization | null>(null);

  const handleViewAuthorization = (authId: number) => {
    const auth = authorizations.find(a => a.id === authId);
    if (auth) {
      setSelectedAuthorization(auth);
      setDetailModalOpen(true);
    }
  };


  const handleEditAuthorization = (authId: number) => {
    router.push(`/organisateur/gestionhabilitations/${authId}/modifier`);
  };

  const handleDeleteAuthorization = (authId: number) => {
    // Logique de suppression
    console.log('Supprimer accès:', authId);
  };

  const handleCreateAuthorization = () => {
    router.push('/organisateur/gestionhabilitations/nouveau');
  };

  const handleExportAuthorizations = () => {
    // Logique d'export
    console.log('Exporter les accès pour le rôle:', roleFilter);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredAuthorizations.map((auth) => auth.id);
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

  const filteredAuthorizations = authorizations.filter(auth => {
    const matchesSearch = auth.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auth.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auth.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auth.phone.includes(searchTerm) ||
                         auth.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === '' || auth.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const uniqueRoles = [...new Set(authorizations.map(auth => auth.role))];

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
                  sx={{ minWidth: 'auto', bgcolor: 'black', color: 'white', '&:hover': { boxShadow: 4, bgcolor: 'black', color: 'white' } }}
                >
                  Exporter
                </Button>
              </Tooltip>

              {/* Bouton Créer */}
              <Tooltip title="Créer un accès" placement="top" arrow>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                  onClick={handleCreateAuthorization}
                  sx={{ minWidth: 'auto', bgcolor: 'transparent', color: 'black',border: 1, '&:hover': { boxShadow: 4, borderColor: 'black', bgcolor: 'transparent', color: 'black' } }}
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
                          <Typography variant="body2" sx={{ fontSize: '14px', color: '#1976D2' }}>
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
                              >
                                <Iconify icon="solar:eye-bold" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Modifier" placement="top" arrow>
                              <IconButton
                                color="warning"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditAuthorization(auth.id);
                                }}
                                size="small"
                              >
                                <Iconify icon="solar:pen-bold" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Supprimer" placement="top" arrow>
                              <IconButton
                                color="error"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteAuthorization(auth.id);
                                }}
                                size="small"
                              >
                                <Iconify icon="solar:trash-bin-trash-bold" />
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
              count={filteredAuthorizations.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Rows per page:"
            />
          </Box>
        </Box>
      </Card>

      {/* Modal de détails */}
      <AuthorizationDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        authorization={selectedAuthorization}
      />
    </Box>
  );
};

export default MuiAuthorizationDashboard;

// Types à exporter également
export type { Authorization };
