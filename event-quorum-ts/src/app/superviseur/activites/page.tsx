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
import InputLabel from '@mui/material/InputLabel';

import { DashboardContent } from 'src/layouts/superviseur';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { SuperviseurWidgetSummary } from 'src/sections/overview/superviseur/view/superviseur-widget-summary-2';

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

  // Couleurs alternées pour les widgets
  const getWidgetColor = (index: number): 'primary' | 'secondary' | 'success' | 'warning' => {
    const colors: Array<'primary' | 'secondary' | 'success' | 'warning'> = ['primary', 'secondary', 'success', 'warning'];
    return colors[index % colors.length];
  };

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

      {/* Statistiques avec SuperviseurWidgetSummary */}
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
            total={activities.filter(a => a.statut === 'En cours').length}
            color={getWidgetColor(1)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="Non démarrées"
            total={activities.filter(a => a.statut === 'Non démarrée').length}
            color={getWidgetColor(2)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="Terminées"
            total={activities.filter(a => a.statut === 'Terminée').length}
            color={getWidgetColor(3)}
            sx={{ height: 180 }}
          />
        </Grid>
      </Grid>

      {/* Tableau */}
      <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* Titre et filtres */}
        <Box sx={{ p: 2.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontSize: 20 }}>
              Liste des activités
              <span style={{ paddingLeft: 4 }}>({filteredActivities.length})</span>
            </Typography>
          </Box>

          {/* Ligne des filtres et recherche */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Filtres à gauche */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel sx={{ fontSize: '0.8rem', px: 0.5 }}>Sélectionner un statut</InputLabel>
                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  label="Sélectionner un statut"
                  sx={{ fontSize: '0.8rem' }}
                >
                  <MenuItem value="" sx={{ fontSize: '0.8rem' }}>Tous les statuts</MenuItem>
                  <MenuItem value="En cours" sx={{ fontSize: '0.8rem' }}>En cours</MenuItem>
                  <MenuItem value="Non démarrée" sx={{ fontSize: '0.8rem' }}>Non démarrée</MenuItem>
                  <MenuItem value="Terminée" sx={{ fontSize: '0.8rem' }}>Terminée</MenuItem>
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel sx={{ fontSize: '0.8rem', px: 0.5 }}>Sélectionner une activité</InputLabel>
                <Select
                  value={selectedActivity}
                  onChange={(e) => setSelectedActivity(e.target.value)}
                  label="Sélectionner une activité"
                  sx={{ fontSize: '0.8rem' }}
                >
                  <MenuItem value="" sx={{ fontSize: '0.8rem' }}>Toutes les activités</MenuItem>
                  <MenuItem value="Activité 1" sx={{ fontSize: '0.8rem' }}>Activité 1</MenuItem>
                  <MenuItem value="Activité 2" sx={{ fontSize: '0.8rem' }}>Activité 2</MenuItem>
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
        </Box>

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
                      <Label
                        variant="soft"
                        color={getStatusColor(activity.statut)}
                      >
                        {activity.statut}
                      </Label>
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
              1-{filteredActivities.length} of {filteredActivities.length}
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