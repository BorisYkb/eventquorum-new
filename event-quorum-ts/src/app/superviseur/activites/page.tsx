// superviseur/activites/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import { DashboardContent } from 'src/layouts/superviseur';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

// Types
interface Activity {
  id: number;
  titre: string;
  activite: string;
  code: string;
  participants: number;
  statut: 'Terminée' | 'En cours' | 'Non démarrée';
}

export default function ActivitiesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedActivity, setSelectedActivity] = useState('');
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);

  const activities: Activity[] = [
    {
      id: 1,
      titre: 'Satisfaction des internautes',
      activite: 'Activité 1',
      code: '52340',
      participants: 60,
      statut: 'Terminée'
    },
    {
      id: 2,
      titre: 'Les conditions de vie',
      activite: 'Activité 1',
      code: '55290',
      participants: 35,
      statut: 'En cours'
    },
    {
      id: 3,
      titre: 'Satisfaction des participants',
      activite: 'Activité 2',
      code: '79863',
      participants: 42,
      statut: 'Non démarrée'
    },
    {
      id: 4,
      titre: 'Évaluation cyber',
      activite: 'Activité 2',
      code: '10125',
      participants: 45,
      statut: 'En cours'
    }
  ];

  const handleViewActivity = (activityId: number) => {
    router.push(`/superviseur/activites/${activityId}`);
  };

  const handleParticipantsManagement = () => {
    router.push('/superviseur/activites/participants');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'En cours':
        return { bg: '#E8F5E8', color: '#2E7D32', label: 'En cours' };
      case 'Non démarrée':
        return { bg: '#FFF3E0', color: '#F57C00', label: 'Non démarrée' };
      case 'Terminée':
        return { bg: '#FFE8E8', color: '#D32F2F', label: 'Terminée' };
      default:
        return { bg: '#F5F5F5', color: '#757575', label: status };
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.activite.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.code.includes(searchTerm);
    const matchesStatus = selectedStatus === '' || activity.statut === selectedStatus;
    const matchesActivity = selectedActivity === '' || activity.activite === selectedActivity;
    return matchesSearch && matchesStatus && matchesActivity;
  });

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = activities.map((n) => n.id);
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

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Données pour les cartes de statistiques
  const statsData = [
    {
      title: 'Toutes les activités',
      value: activities.length,
      bgcolor: '#E3F2FD',
      borderColor: '#BBDEFB'
    },
    {
      title: 'En cours',
      value: activities.filter(a => a.statut === 'En cours').length,
      bgcolor: '#F5F5F5',
      borderColor: '#E0E0E0'
    },
    {
      title: 'Non démarrées',
      value: activities.filter(a => a.statut === 'Non démarrée').length,
      bgcolor: '#E3F2FD',
      borderColor: '#BBDEFB'
    },
    {
      title: 'Terminées',
      value: activities.filter(a => a.statut === 'Terminée').length,
      bgcolor: '#F5F5F5',
      borderColor: '#E0E0E0'
    }
  ];

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Liste des activités"
        links={[
          { name: 'Superviseur', href: '/superviseur' },
          { name: 'Activités' }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* Cartes de statistiques - Style identique aux images */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid xs={12} sm={6} md={3} key={index}>
            <Card sx={{
              p: 3,
              textAlign: 'center',
              bgcolor: stat.bgcolor,
              border: `1px solid ${stat.borderColor}`,
              borderRadius: 3,
              height: '100%',
              minHeight: 120
            }}>
              <Typography variant="caption" color="text.secondary" gutterBottom sx={{ fontSize: 12 }}>
                {stat.title}
              </Typography>
              <Typography variant="h2" sx={{
                color: '#1a1a1a',
                fontWeight: 'bold',
                fontSize: '3rem',
                lineHeight: 1
              }}>
                {stat.value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Barre de recherche et filtres */}
      <Box sx={{ mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Rechercher par titre, activité ou code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: '#9E9E9E' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white'
                }
              }}
            />
          </Grid>
          <Grid xs={12} md={3}>
            <TextField
              select
              fullWidth
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              displayEmpty
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white'
                }
              }}
            >
              <MenuItem value="">Statut</MenuItem>
              <MenuItem value="En cours">En cours</MenuItem>
              <MenuItem value="Non démarrée">Non démarrée</MenuItem>
              <MenuItem value="Terminée">Terminée</MenuItem>
            </TextField>
          </Grid>
          <Grid xs={12} md={3}>
            <TextField
              select
              fullWidth
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              displayEmpty
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: 'white'
                }
              }}
            >
              <MenuItem value="">Activité</MenuItem>
              <MenuItem value="Activité 1">Activité 1</MenuItem>
              <MenuItem value="Activité 2">Activité 2</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>

      {/* Tableau - Style identique à l'image */}
      <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table stickyHeader size={dense ? 'small' : 'medium'}>
            <TableHead>
              <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#F8F9FA', py: 2 } }}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < activities.length}
                    checked={activities.length > 0 && selected.length === activities.length}
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
                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                  Participants
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                  Statut
                </TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredActivities.map((activity, index) => {
                const isItemSelected = isSelected(activity.id);
                const statusConfig = getStatusColor(activity.statut);

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, activity.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={activity.id}
                    selected={isItemSelected}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#F8F9FA' }
                    }}
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
                        {activity.titre}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                        {activity.activite}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                        {activity.code}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 600 }}>
                        {activity.participants}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          px: 2,
                          py: 0.5,
                          borderRadius: 6,
                          bgcolor: statusConfig.bg,
                          color: statusConfig.color,
                          fontSize: '12px',
                          fontWeight: 500
                        }}
                      >
                        {statusConfig.label}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Button
                        variant="text"
                        size="small"
                        startIcon={<Iconify icon="eva:eye-fill" />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewActivity(activity.id);
                        }}
                        sx={{
                          color: '#374151',
                          fontSize: '14px',
                          textTransform: 'none'
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

        {/* Footer du tableau avec options */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: '#FAFAFA'
        }}>
          <FormControlLabel
            control={
              <Switch
                checked={dense}
                onChange={(event) => setDense(event.target.checked)}
                size="small"
              />
            }
            label={<Typography variant="body2" sx={{ fontSize: '14px' }}>Dense</Typography>}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ fontSize: '14px' }}>
              Rows per page:
            </Typography>
            <FormControl size="small">
              <Select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                sx={{ fontSize: '14px' }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2" sx={{ fontSize: '14px' }}>
              1-4 of 4
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" disabled>
                <Iconify icon="eva:chevron-left-fill" />
              </IconButton>
              <IconButton size="small" disabled>
                <Iconify icon="eva:chevron-right-fill" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Card>
    </DashboardContent>
  );
}
