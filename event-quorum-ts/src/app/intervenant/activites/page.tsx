// intervenant/activites/page.tsx
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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/intervenant';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';

// Types
interface Activity {
  id: number;
  name: string;
  type: string;
  title: string;
  status: 'Terminée' | 'En cours' | 'Non démarrée';
  date: string;
}

export default function ActivitiesPage() {
  const router = useRouter();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const activities: Activity[] = [
    {
      id: 1,
      name: 'Activité 1',
      type: 'Atelier',
      title: 'Formation',
      status: 'En cours',
      date: '10/12/24 10H00 -> 10/12/24 17H00',
    },
    {
      id: 2,
      name: 'Activité 2',
      type: 'Salon',
      title: 'Innovations',
      status: 'Non démarrée',
      date: '11/12/24 10H00 -> 11/12/24 17H00',
    },
    {
      id: 3,
      name: 'Activité 3',
      type: 'Conférence',
      title: 'Diversité',
      status: 'Terminée',
      date: '12/12/24 10H00 -> 12/12/24 17H00',
    },
    {
      id: 4,
      name: 'Activité 4',
      type: 'Festival',
      title: 'Planète Verte',
      status: 'Non démarrée',
      date: '13/12/24 10H00 -> 13/12/24 17H00',
    },
  ];

  const handleViewActivity = (activityId: number) => {
    router.push(`/intervenant/activites/${activityId}`);
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
    const matchesSearch = activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === '' || activity.status === selectedStatus;
    const matchesType = selectedType === '' || activity.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Liste des activités"
        links={[
          { name: 'Intervenant', href: '/intervenant' },
          { name: 'Activités' }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* Tableau */}
      <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* Titre et filtres */}
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              LA LISTE DES ACTIVITÉS
              <span style={{ paddingLeft: 8, fontWeight: 'normal', color: theme.palette.text.secondary }}>
                ({filteredActivities.length})
              </span>
            </Typography>
          </Box>

          {/* Ligne des filtres et recherche */}
          <Grid container spacing={2} alignItems="center">
            {/* Filtres à gauche */}
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: '0.875rem' }}>Statut</InputLabel>
                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
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

            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ fontSize: '0.875rem' }}>Type</InputLabel>
                <Select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  label="Type"
                  sx={{ fontSize: '0.875rem' }}
                >
                  <MenuItem value="" sx={{ fontSize: '0.875rem' }}>Tous les types</MenuItem>
                  <MenuItem value="Atelier" sx={{ fontSize: '0.875rem' }}>Atelier</MenuItem>
                  <MenuItem value="Salon" sx={{ fontSize: '0.875rem' }}>Salon</MenuItem>
                  <MenuItem value="Conférence" sx={{ fontSize: '0.875rem' }}>Conférence</MenuItem>
                  <MenuItem value="Festival" sx={{ fontSize: '0.875rem' }}>Festival</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Rechercher par nom, type ou titre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
                    Consulter
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredActivities.map((activity) => (
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
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{
                        fontWeight: 500,
                        fontSize: '14px',
                        color: '#1976D2'
                      }}>
                        {activity.name}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                        {activity.type}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                        {activity.title}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ py: 2 }}>
                      <Label
                        variant="soft"
                        color={getStatusColor(activity.status)}
                      >
                        {activity.status}
                      </Label>
                    </TableCell>

                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontSize: '14px', color: '#6B7280' }}>
                        {activity.date}
                      </Typography>
                    </TableCell>

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
                            color: '#374151',
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

        {/* Message si aucun résultat */}
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
      </Card>
    </DashboardContent>
  );
}
