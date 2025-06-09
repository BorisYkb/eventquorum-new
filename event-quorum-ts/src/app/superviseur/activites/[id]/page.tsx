// superviseur/activites/[id]/page.tsx
'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
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
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ActivityDetailPage() {
  const router = useRouter();
  const params = useParams();
  const activityId = params.id;

  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<number[]>([]);

  const activity = {
    id: activityId,
    name: 'Formation en développement web',
    type: 'Formation',
    description: 'Formation complète sur les technologies web modernes incluant React, Node.js et les bases de données. Cette formation couvre les aspects fondamentaux du développement web moderne.',
    consultant: 'Jean Kouadio',
    status: 'En cours',
    date: '12/05/2025',
    time: '09:00 - 17:00',
    duration: '5 jours',
    location: 'Salle A - Campus Principal',
    participants: 180,
    maxParticipants: 200,
    invited: 220,
    presentielParticipants: 120,
    onlineParticipants: 60,
    connected: 175,
    resources: [
      { type: 'Document', name: 'Guide de formation React.pdf' },
      { type: 'Lien', name: 'https://reactjs.org/docs' },
      { type: 'Vidéo', name: 'Introduction aux concepts React' }
    ]
  };

  const invitedList = [
    { id: 1, name: 'Chonou Oriane', email: 'oriane.chonou@email.com', status: 'Confirmé' },
    { id: 2, name: 'Kouamé Boris Yakoué', email: 'kouame.boris@email.com', status: 'En attente' },
    { id: 3, name: 'Kouakou Evariste', email: 'kouakou.evariste@email.com', status: 'Confirmé' },
    { id: 4, name: 'Yao Emmanuel', email: 'emmanuel.yao@email.com', status: 'Refusé' },
    { id: 5, name: 'Kouassi Aissatou', email: 'kouassi.aissatou@email.com', status: 'En attente' }
  ];

  const participantsList = [
    { id: 1, name: 'Chonou Oriane', email: 'oriane.chonou@email.com', type: 'Présentiel', status: 'Connecté' },
    { id: 2, name: 'Kouamé Boris Yakoué', email: 'kouame.boris@email.com', type: 'En ligne', status: 'Connecté' },
    { id: 3, name: 'Kouakou Evariste', email: 'kouakou.evariste@email.com', type: 'Présentiel', status: 'Déconnecté' }
  ];

  const questionsList = [
    { id: 1, participant: 'Chonou Oriane', question: 'Comment gérer les états dans React ?', time: '10:30', answered: true },
    { id: 2, participant: 'Kouamé Boris Yakoué', question: 'Quelle est la différence entre props et state ?', time: '11:15', answered: false },
    { id: 3, participant: 'Kouakou Evariste', question: 'Comment optimiser les performances ?', time: '14:20', answered: true }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setSearchTerm('');
    setSelected([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmé':
      case 'Connecté':
        return { bg: '#E8F5E8', color: '#2E7D32' };
      case 'En attente':
        return { bg: '#FFF3E0', color: '#F57C00' };
      case 'Refusé':
      case 'Déconnecté':
        return { bg: '#FFE8E8', color: '#D32F2F' };
      default:
        return { bg: '#F5F5F5', color: '#757575' };
    }
  };

  const filteredInvited = invitedList.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredParticipants = participantsList.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = invitedList.map((n) => n.id);
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

  const statsData = [
    { title: 'Invités', value: activity.invited, bgcolor: '#E3F2FD', borderColor: '#BBDEFB' },
    { title: 'Participants', value: activity.participants, bgcolor: '#F5F5F5', borderColor: '#E0E0E0' },
    { title: 'Statut', value: activity.status, bgcolor: '#E3F2FD', borderColor: '#BBDEFB' },
    { title: 'Présentiel', value: activity.presentielParticipants, bgcolor: '#F5F5F5', borderColor: '#E0E0E0' },
    { title: 'En ligne', value: activity.onlineParticipants, bgcolor: '#E3F2FD', borderColor: '#BBDEFB' },
    { title: 'Connectés', value: activity.connected, bgcolor: '#F5F5F5', borderColor: '#E0E0E0' }
  ];

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Détails de l'activité"
        links={[
          { name: 'Superviseur', href: '/superviseur' },
          { name: 'Activités', href: '/superviseur/activites' },
          { name: activity.name }
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:arrow-back-fill" />}
            onClick={() => router.back()}
            sx={{ borderRadius: 2 }}
          >
            Retour à la liste
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* En-tête avec nom et type */}
        <Box sx={{ borderLeft: 4, borderColor: 'primary.main', p: 4, mb: 2 }}>
          <Typography variant="h3" gutterBottom>
            {activity.name}
          </Typography>
          <Chip
            label={activity.type}
            color="primary"
            sx={{ borderRadius: 2 }}
          />
        </Box>

        {/* Statistiques - Style identique aux images */}
        <Box sx={{ px: 4, mb: 2 }}>
          <Grid container spacing={2}>
            {statsData.map((stat, index) => (
              <Grid xs={6} sm={4} md={2} key={index}>
                <Card sx={{
                  p: 2,
                  textAlign: 'center',
                  bgcolor: stat.bgcolor,
                  border: `1px solid ${stat.borderColor}`,
                  borderRadius: 2,
                  minHeight: 80
                }}>
                  <Typography variant="h4" sx={{
                    color: '#1a1a1a',
                    fontWeight: 'bold',
                    fontSize: '2rem',
                    lineHeight: 1
                  }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
                    {stat.title}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Onglets */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 4 }}>
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
            <Tab label="Information" />
            <Tab label="Liste des invités" />
            <Tab label="Liste des participants" />
            <Tab label="Questions des participants" />
          </Tabs>
        </Box>

        {/* Contenu des onglets */}
        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            <Grid xs={12}>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" paragraph>
                {activity.description}
              </Typography>
            </Grid>

            <Grid xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Date et Heure
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activity.date} | {activity.time}
              </Typography>
            </Grid>

            <Grid xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Type d'activité
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activity.type}
              </Typography>
            </Grid>

            <Grid xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Nom d'intervenant
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activity.consultant}
              </Typography>
            </Grid>

            <Grid xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Lieu
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activity.location}
              </Typography>
            </Grid>

            <Grid xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Ressources
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {activity.resources.map((resource, index) => (
                  <Card key={index} sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Chip label={resource.type} size="small" color="primary" sx={{ borderRadius: 2 }} />
                      <Typography variant="body2">{resource.name}</Typography>
                    </Box>
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
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
                <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#F8F9FA', py: 2 } }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={selected.length > 0 && selected.length < invitedList.length}
                      checked={invitedList.length > 0 && selected.length === invitedList.length}
                      onChange={handleSelectAllClick}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Nom</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Statut</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInvited.map((person) => {
                  const isItemSelected = isSelected(person.id);
                  const statusConfig = getStatusColor(person.status);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, person.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={person.id}
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
                          {person.name}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#6B7280' }}>
                          {person.email}
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
                          {person.status}
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
                <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#F8F9FA', py: 2 } }}>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Nom</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Statut</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredParticipants.map((person) => {
                  const statusConfig = getStatusColor(person.status);
                  return (
                    <TableRow key={person.id} hover sx={{ '&:hover': { bgcolor: '#F8F9FA' } }}>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                          {person.name}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#6B7280' }}>
                          {person.email}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                          {person.type}
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
                          {person.status}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={activeTab} index={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Liste des questions
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Chip
                label={`Questions répondues: ${questionsList.filter(q => q.answered).length.toString().padStart(2, '0')}`}
                sx={{
                  bgcolor: '#E8F5E8',
                  color: '#2E7D32',
                  borderRadius: 2,
                  fontSize: '12px'
                }}
                size="small"
              />
              <Chip
                label={`Questions en attente: ${questionsList.filter(q => !q.answered).length.toString().padStart(2, '0')}`}
                sx={{
                  bgcolor: '#FFF3E0',
                  color: '#F57C00',
                  borderRadius: 2,
                  fontSize: '12px'
                }}
                size="small"
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {questionsList.map((question) => (
              <Card key={question.id} sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
                <Box sx={{ bgcolor: '#F8F9FA', p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" fontWeight="bold">****</Typography>
                      <Typography variant="caption">Participant</Typography>
                    </Box>
                    <Chip
                      label={question.answered ? 'Répondu' : 'En attente'}
                      sx={{
                        bgcolor: question.answered ? '#E8F5E8' : '#FFF3E0',
                        color: question.answered ? '#2E7D32' : '#F57C00',
                        borderRadius: 2,
                        fontSize: '11px'
                      }}
                      size="small"
                    />
                  </Box>
                </Box>

                <Box sx={{ p: 2 }}>
                  <Typography variant="caption" color="text.secondary" gutterBottom>
                    Question :
                  </Typography>
                  <Card sx={{ p: 2, bgcolor: '#F8F9FA', mb: 2, borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ fontSize: '14px' }}>
                      {question.question}
                    </Typography>
                  </Card>

                  <Typography variant="caption" color="text.secondary" gutterBottom>
                    Réponse :
                  </Typography>
                  <Card sx={{ p: 2, bgcolor: '#F8F9FA', minHeight: 60, borderRadius: 2 }}>
                    {question.answered ? (
                      <Typography variant="body2" sx={{ fontSize: '14px' }}>
                        {question.id === 1 && "Pour gérer les états dans React, vous pouvez utiliser le hook useState pour les composants fonctionnels ou this.state pour les composants de classe. Le hook useState retourne un tableau avec la valeur actuelle de l'état et une fonction pour le mettre à jour."}
                        {question.id === 3 && "Pour optimiser les performances dans React, vous pouvez utiliser React.memo pour mémoriser les composants, useCallback pour mémoriser les fonctions, useMemo pour mémoriser les calculs coûteux, et éviter les re-rendus inutiles en optimisant la structure de vos composants."}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="text.disabled" fontStyle="italic" sx={{ fontSize: '14px' }}>
                        En attente de réponse...
                      </Typography>
                    )}
                  </Card>
                </Box>
              </Card>
            ))}
          </Box>
        </TabPanel>
      </Card>
    </DashboardContent>
  );
}
