// superviseur/activites/participants/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

import { DashboardContent } from 'src/layouts/superviseur';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`participants-tabpanel-${index}`}
      aria-labelledby={`participants-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ParticipantsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<number[]>([]);

  // Données pour la page des demandes d'inscription
  const demandesData = {
    received: 128,
    accepted: 86,
    rejected: 64,
    pending: 12
  };

  const demandesList = [
    {
      id: 1,
      nom_prenom: 'Boudou Kouacou',
      email: 'boudou.kouacou@gmail.com',
      telephone: '0703815841',
      date: '10/06/2024 10:00',
      statut: 'Acceptée'
    },
    {
      id: 2,
      nom_prenom: 'Kouamé Sarah',
      email: 'kouame.sarah@gmail.com',
      telephone: '0709876543',
      date: '09/06/2024 14:30',
      statut: 'En attente'
    },
    {
      id: 3,
      nom_prenom: 'Diallo Mamadou',
      email: 'diallo.mamadou@gmail.com',
      telephone: '0712345678',
      date: '08/06/2024 09:15',
      statut: 'Rejetée'
    },
    {
      id: 4,
      nom_prenom: 'Traore Fatou',
      email: 'traore.fatou@gmail.com',
      telephone: '0756789012',
      date: '07/06/2024 16:45',
      statut: 'Acceptée'
    },
    {
      id: 5,
      nom_prenom: 'Yao Emmanuel',
      email: 'yao.emmanuel@gmail.com',
      telephone: '0734567890',
      date: '06/06/2024 11:20',
      statut: 'En attente'
    }
  ];

  const invitesList = [
    { id: 1, nom_prenom: 'Chonou Oriane', email: 'oriane.chonou@email.com', statut: 'Confirmé' },
    { id: 2, nom_prenom: 'Kouamé Boris Yakoué', email: 'kouame.boris@email.com', statut: 'En attente' },
    { id: 3, nom_prenom: 'Kouakou Evariste', email: 'kouakou.evariste@email.com', statut: 'Confirmé' },
    { id: 4, nom_prenom: 'Yao Emmanuel', email: 'emmanuel.yao@email.com', statut: 'Refusé' },
    { id: 5, nom_prenom: 'Kouassi Aissatou', email: 'kouassi.aissatou@email.com', statut: 'En attente' }
  ];

  const participantsList = [
    { id: 1, nom_prenom: 'Chonou Oriane', email: 'oriane.chonou@email.com', type: 'Présentiel', statut: 'Connecté' },
    { id: 2, nom_prenom: 'Kouamé Boris Yakoué', email: 'kouame.boris@email.com', type: 'En ligne', statut: 'Connecté' },
    { id: 3, nom_prenom: 'Kouakou Evariste', email: 'kouakou.evariste@email.com', type: 'Présentiel', statut: 'Déconnecté' }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setSearchTerm('');
    setStatusFilter('');
    setSelected([]);
  };

  const handleExport = () => {
    alert('Fonction d\'export en cours de développement...');
  };

  const handleConsulterResultats = () => {
    router.push('/superviseur/activites/participants/resultats');
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'Acceptée':
      case 'Confirmé':
      case 'Connecté':
        return { bg: '#E8F5E8', color: '#2E7D32' };
      case 'En attente':
        return { bg: '#FFF3E0', color: '#F57C00' };
      case 'Rejetée':
      case 'Refusé':
      case 'Déconnecté':
        return { bg: '#FFE8E8', color: '#D32F2F' };
      default:
        return { bg: '#F5F5F5', color: '#757575' };
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = demandesList.map((n) => n.id);
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

  const filteredDemandes = demandesList.filter(demande => {
    const matchesSearch = demande.nom_prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demande.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || demande.statut === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredInvites = invitesList.filter(invite =>
    invite.nom_prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invite.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredParticipants = participantsList.filter(participant =>
    participant.nom_prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Données pour les cartes de statistiques (style identique aux images)
  const statsData = [
    {
      title: 'Nombre de demande reçues',
      value: demandesData.received,
      bgcolor: '#E3F2FD',
      borderColor: '#BBDEFB'
    },
    {
      title: 'Nombre de demande acceptée',
      value: demandesData.accepted,
      bgcolor: '#F5F5F5',
      borderColor: '#E0E0E0'
    },
    {
      title: 'Nombre de demandes rejetée',
      value: demandesData.rejected,
      bgcolor: '#E3F2FD',
      borderColor: '#BBDEFB'
    },
    {
      title: 'Nombre de demandes en attentes',
      value: demandesData.pending,
      bgcolor: '#F5F5F5',
      borderColor: '#E0E0E0'
    }
  ];

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Participants"
        links={[
          { name: 'Superviseur', href: '/superviseur' },
          { name: 'Activités', href: '/superviseur/activites' },
          { name: 'Participants' }
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* Onglets */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, pt: 2 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px'
              }
            }}
          >
            <Tab label="Liste des demandes d'inscription" />
            <Tab label="Liste des invités" />
            <Tab label="Liste des participants" />
          </Tabs>
        </Box>

        {/* Contenu des onglets */}
        <TabPanel value={activeTab} index={0}>
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
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'white'
                    }
                  }}
                  SelectProps={{
                    displayEmpty: true
                  }}
                >
                  <MenuItem value="">Statut</MenuItem>
                  <MenuItem value="Acceptée">Acceptée</MenuItem>
                  <MenuItem value="En attente">En attente</MenuItem>
                  <MenuItem value="Rejetée">Rejetée</MenuItem>
                </TextField>
              </Grid>
              <Grid xs={12} md={3}>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:download-fill" />}
                  onClick={handleExport}
                  fullWidth
                  sx={{
                    bgcolor: '#424242',
                    '&:hover': { bgcolor: '#616161' },
                    borderRadius: 2
                  }}
                >
                  Exporter
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Titre de la liste */}
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Liste des demandes d'inscription ({filteredDemandes.length} participants)
          </Typography>

          {/* Tableau des demandes - Style identique à l'image */}
          <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Table size={dense ? 'small' : 'medium'}>
              <TableHead>
                <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#F8F9FA', py: 2 } }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={selected.length > 0 && selected.length < demandesList.length}
                      checked={demandesList.length > 0 && selected.length === demandesList.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Nom_prenom
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Email
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Téléphone
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                    Statut
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDemandes.map((demande) => {
                  const isItemSelected = isSelected(demande.id);
                  const statusConfig = getStatusColor(demande.statut);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, demande.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={demande.id}
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
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                          {demande.nom_prenom}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#6B7280' }}>
                          {demande.email}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                          {demande.telephone}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                          {demande.date}
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
                          {demande.statut}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Footer du tableau */}
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
                1-{Math.min(filteredDemandes.length, rowsPerPage)} of {filteredDemandes.length}
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

          {/* Bouton Consulter les résultats */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, pb: 2 }}>
            <Button
              variant="outlined"
              onClick={handleConsulterResultats}
              sx={{
                borderColor: '#1976D2',
                color: '#1976D2',
                '&:hover': {
                  borderColor: '#1565C0',
                  bgcolor: '#E3F2FD'
                },
                borderRadius: 2
              }}
            >
              Consulter les résultats
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Rechercher un invité..."
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
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#F8F9FA' } }}>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Nom</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Statut</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInvites.map((invite) => {
                  const statusConfig = getStatusColor(invite.statut);
                  return (
                    <TableRow key={invite.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                          {invite.nom_prenom}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#6B7280' }}>
                          {invite.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
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
                          {invite.statut}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Rechercher un participant..."
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
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#F8F9FA' } }}>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Nom</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Statut</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredParticipants.map((participant) => {
                  const statusConfig = getStatusColor(participant.statut);
                  return (
                    <TableRow key={participant.id} hover>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                          {participant.nom_prenom}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#6B7280' }}>
                          {participant.email}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                          {participant.type}
                        </Typography>
                      </TableCell>
                      <TableCell>
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
                          {participant.statut}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Card>
    </DashboardContent>
  );
}
