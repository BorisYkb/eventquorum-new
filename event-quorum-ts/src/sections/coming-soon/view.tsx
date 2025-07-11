'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/admin';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// Types
type ParticipantStatus = 'En ligne' | 'En physique' | 'Déconnecté';
type EmargementStatus = 'Signé' | 'Non signé';

interface Participant {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  connecte: ParticipantStatus;
  emargement: EmargementStatus;
  rqth: boolean;
}

// Données mock
const MOCK_PARTICIPANTS: Participant[] = [
  {
    id: 1,
    nom: 'Koffi',
    prenom: 'EWANJRT',
    telephone: '0002030762',
    email: 'pp@gmail.com',
    connecte: 'En ligne',
    emargement: 'Signé',
    rqth: false,
  },
  {
    id: 2,
    nom: 'Kouassi',
    prenom: 'EWANJRT',
    telephone: '0002030762',
    email: 'pp@gmail.com',
    connecte: 'En physique',
    emargement: 'Non signé',
    rqth: true,
  },
  {
    id: 3,
    nom: 'Ouattara',
    prenom: 'PTT',
    telephone: '0002030762',
    email: 'pp@gmail.com',
    connecte: 'Déconnecté',
    emargement: 'Non signé',
    rqth: false,
  },
];

const TABS = [
  { label: 'Liste des invités', value: 'invites' },
  { label: 'Demandes d\'inscription', value: 'demandes' },
  { label: 'Liste des participants', value: 'participants' },
];

export function GestionParticipantsView() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('invites');
  const [participants] = useState(MOCK_PARTICIPANTS);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getConnectedColor = (status: ParticipantStatus) => {
    switch (status) {
      case 'En ligne':
        return 'success';
      case 'En physique':
        return 'info';
      case 'Déconnecté':
        return 'error';
      default:
        return 'default';
    }
  };

  const getEmargementColor = (status: EmargementStatus) => {
    return status === 'Signé' ? 'success' : 'error';
  };

  const renderConnectedDot = (status: ParticipantStatus) => {
    const color = status === 'Déconnecté' ? '#ef4444' : '#22c55e';
    return (
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: color,
        }}
      />
    );
  };

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        {/* En-tête avec boutons d'export */}
        <Grid size={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Gestion des Participants
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="eva:download-fill" />}
                sx={{ textTransform: 'none' }}
              >
                Exporter la liste des participants
              </Button>
              <Button
                variant="outlined"
                startIcon={<Iconify icon="eva:download-fill" />}
                sx={{ textTransform: 'none' }}
              >
                Exporter la liste des présences
              </Button>
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:eye-fill" />}
                sx={{ textTransform: 'none' }}
              >
                Consulter la liste des connectés
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* Onglets et bouton d'ajout */}
        <Grid size={12}>
          <Card sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{ minHeight: 48 }}
              >
                {TABS.map((tab) => (
                  <Tab
                    key={tab.value}
                    value={tab.value}
                    label={tab.label}
                    sx={{ textTransform: 'none' }}
                  />
                ))}
              </Tabs>
              
              <Button
                variant="contained"
                startIcon={<Iconify icon="eva:plus-fill" />}
                sx={{ textTransform: 'none' }}
              >
                Ajouter un invité
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Tableau principal */}
        <Grid size={12}>
          <Card>
            <TableContainer>
              <Scrollbar>
                <Table sx={{ minWidth: 800 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Nom
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Prénom
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Téléphone
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Email
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Connecté
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Émargement
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          RQTH
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Action
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {participants
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((participant) => (
                        <TableRow key={participant.id} hover>
                          <TableCell>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {participant.nom}
                            </Typography>
                          </TableCell>
                          
                          <TableCell>
                            <Typography variant="body2">
                              {participant.prenom}
                            </Typography>
                          </TableCell>
                          
                          <TableCell>
                            <Typography variant="body2">
                              {participant.telephone}
                            </Typography>
                          </TableCell>
                          
                          <TableCell>
                            <Typography variant="body2">
                              {participant.email}
                            </Typography>
                          </TableCell>
                          
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                              {renderConnectedDot(participant.connecte)}
                              <Typography variant="body2">
                                {participant.connecte}
                              </Typography>
                            </Box>
                          </TableCell>
                          
                          <TableCell align="center">
                            <Label
                              variant="soft"
                              color={getEmargementColor(participant.emargement)}
                            >
                              {participant.emargement}
                            </Label>
                          </TableCell>
                          
                          <TableCell align="center">
                            <Typography variant="body2">
                              {participant.rqth ? 'Oui' : 'Non'}
                            </Typography>
                          </TableCell>
                          
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                              <Tooltip title="Voir détails">
                                <IconButton size="small" color="info">
                                  <Iconify icon="solar:eye-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Modifier">
                                <IconButton size="small" color="warning">
                                  <Iconify icon="solar:pen-bold" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Supprimer">
                                <IconButton size="small" color="error">
                                  <Iconify icon="solar:trash-bin-trash-bold" />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Scrollbar>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
              component="div"
              count={participants.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
              labelRowsPerPage="Lignes par page"
              labelDisplayedRows={({ from, to, count }) => 
                `Affichage de ${from} à ${to} sur ${count}`
              }
            />
          </Card>
        </Grid>

        {/* Filtres en bas */}
        <Grid size={12}>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Chip
              label="Nombre des demandes d'inscription"
              color="primary"
              variant="outlined"
            />
            <Chip
              label="Nombre des invités"
              color="secondary"
              variant="outlined"
            />
            <Chip
              label="Nombre des invités déconnectés"
              color="error"
              variant="outlined"
            />
          </Box>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}