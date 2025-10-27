// ============================================================================
// FICHIER 3: superviseur/activites/[id]/components/invites-list.tsx
// ============================================================================

'use client';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

interface InvitesListProps {
  activityId: string;
}

export default function InvitesList({ activityId }: InvitesListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [emargementFilter, setEmargementFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [participants, setParticipants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const rowsPerPage = 10;

  // TODO: API - Récupérer les participants
  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true);
      // const response = await fetch(`/api/activities/${activityId}/participants`);
      // const data = await response.json();
      
      // Données de test
      const mockData = [
        { id: 1, name: 'Chonou Oriane', email: 'oriane@email.com', type: 'Présentiel', status: 'Connecté', emarger: true, dateRegistered: '2025/05/01 09:00' },
        { id: 2, name: 'Kouamé Boris', email: 'boris@email.com', type: 'En ligne', status: 'Connecté', emarger: true, dateRegistered: '2025/05/01 09:00' },
      ];
      setParticipants(mockData);
      setLoading(false);
    };
    fetchParticipants();
  }, [activityId]);

  const filteredParticipants = participants.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || person.type === typeFilter;
    const matchesEmargement = emargementFilter === 'all' || 
                             (emargementFilter === 'emarger' && person.emarger) ||
                             (emargementFilter === 'non-emarger' && !person.emarger);
    return matchesSearch && matchesType && matchesEmargement;
  });

  const paginatedParticipants = filteredParticipants.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(filteredParticipants.length / rowsPerPage);

  const exportToExcel = () => {
    // TODO: API Export
    console.log('Export');
  };

  if (loading) return <Box sx={{ textAlign: 'center', py: 4 }}>Chargement...</Box>;

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} size="small" label="Type" fullWidth>
              <MenuItem value="all">Tous</MenuItem>
              <MenuItem value="Présentiel">Présentiel</MenuItem>
              <MenuItem value="En ligne">En ligne</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField select value={emargementFilter} onChange={(e) => setEmargementFilter(e.target.value)} size="small" label="Émargement" fullWidth>
              <MenuItem value="all">Tous</MenuItem>
              <MenuItem value="emarger">Émargé</MenuItem>
              <MenuItem value="non-emarger">Non émargé</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <Button variant="contained" startIcon={<Iconify icon="eva:download-fill" />} onClick={exportToExcel} fullWidth sx={{ height: 40, bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}>
              Exporter
            </Button>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary">{filteredParticipants.length} invité(s)</Typography>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#F8F9FA' } }}>
              <TableCell sx={{ fontWeight: 600 }}>Nom</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Émargement</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Enregistré le</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedParticipants.map((person) => (
              <TableRow key={person.id} hover>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.email}</TableCell>
                <TableCell>{person.type}</TableCell>
                <TableCell><Label color="success">{person.status}</Label></TableCell>
                <TableCell><Label color={person.emarger ? 'success' : 'error'}>{person.emarger ? 'Émargé' : 'Non émargé'}</Label></TableCell>
                <TableCell>{new Date(person.dateRegistered).toLocaleString('fr-FR')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination count={totalPages} page={page} onChange={(e, val) => setPage(val)} color="primary" />
        </Box>
      )}
    </Box>
  );
}