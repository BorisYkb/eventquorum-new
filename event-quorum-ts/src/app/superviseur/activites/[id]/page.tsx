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
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/superviseur';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { SuperviseurWidgetSummary } from 'src/sections/overview/superviseur/view/superviseur-widget-summary-2';

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
  const theme = useTheme();

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

  const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'Confirmé':
      case 'Connecté':
        return 'success';
      case 'En attente':
        return 'warning';
      case 'Refusé':
      case 'Déconnecté':
        return 'error';
      default:
        return 'default';
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

  // Couleurs alternées pour les widgets
  const getWidgetColor = (index: number): 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' => {
    const colors: Array<'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'> = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
    return colors[index % colors.length];
  };

  // Fonction pour afficher les informations dans l'onglet Information
  const renderInfoBox = (label: string, value: string | undefined) => (
    <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
      <Typography 
        sx={{ 
          minWidth: 150, 
          fontWeight: 'medium', 
          color: 'text.secondary',
          fontSize: '0.9rem',
          mr: 3
        }}
      >
        {label}
      </Typography>
      <Typography sx={{ fontWeight: 'medium', fontSize: '0.9rem' }}>
        {value || '-'}
      </Typography>
    </Box>
  );

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
            sx={{ 
              borderRadius: 2,
              bgcolor: '#000',
              color: 'white',
              '&:hover': { bgcolor: '#333' }
            }}
          >
            Retour à la liste
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* En-tête avec nom et type */}
      <Card sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
        <Box sx={{ borderLeft: 4, borderColor: 'primary.main', p: 4 }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
            {activity.name}
          </Typography>
          <Label variant="soft" color="primary" sx={{ borderRadius: 2, px: 2, py: 1 }}>
            {activity.type}
          </Label>
        </Box>
      </Card>

      {/* Statistiques avec SuperviseurWidgetSummary */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <SuperviseurWidgetSummary
            title="Invités"
            total={activity.invited}
            color={getWidgetColor(0)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <SuperviseurWidgetSummary
            title="Participants"
            total={activity.participants}
            color={getWidgetColor(1)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <SuperviseurWidgetSummary
            title="Présentiel"
            total={activity.presentielParticipants}
            color={getWidgetColor(2)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <SuperviseurWidgetSummary
            title="En ligne"
            total={activity.onlineParticipants}
            color={getWidgetColor(3)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <SuperviseurWidgetSummary
            title="Connectés"
            total={activity.connected}
            color={getWidgetColor(4)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2 }}>
          <SuperviseurWidgetSummary
            title="Statut"
            total={0}
            color={getWidgetColor(5)}
            sx={{ height: 180 }}
          />
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
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
          <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2 }}>
            <Grid container spacing={3}>
              {/* Informations principales */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ p: 4, height: 'fit-content' }}>
                  <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                    INFORMATIONS GÉNÉRALES
                  </Typography>
                  <Stack spacing={2}>
                    {renderInfoBox("Type d'activité", activity.type)}
                    {renderInfoBox("Nom d'intervenant", activity.consultant)}
                    {renderInfoBox("Statut", activity.status)}
                    {renderInfoBox("Durée", activity.duration)}
                  </Stack>
                </Card>
              </Grid>

              {/* Date et lieu */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Card sx={{ p: 4, height: 'fit-content' }}>
                  <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                    DATE & LIEU
                  </Typography>
                  <Stack spacing={2}>
                    {renderInfoBox("Date", activity.date)}
                    {renderInfoBox("Heure", activity.time)}
                    {renderInfoBox("Lieu", activity.location)}
                    {renderInfoBox("Capacité max", `${activity.maxParticipants} participants`)}
                  </Stack>
                </Card>
              </Grid>

              {/* Description */}
              <Grid size={{ xs: 12 }}>
                <Card sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                    DESCRIPTION
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.6, fontSize: '0.9rem' }}>
                    {activity.description}
                  </Typography>
                </Card>
              </Grid>

              {/* Ressources */}
              <Grid size={{ xs: 12 }}>
                <Card sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
                    RESSOURCES DISPONIBLES
                  </Typography>
                  <Stack spacing={2}>
                    {activity.resources.map((resource, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: 3,
                          bgcolor: 'grey.50',
                          borderRadius: 2,
                          border: 1,
                          borderColor: 'grey.200',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          '&:hover': {
                            bgcolor: 'grey.100',
                            borderColor: 'primary.light'
                          }
                        }}
                      >
                        <Label variant="soft" color="primary" sx={{ borderRadius: 1 }}>
                          {resource.type}
                        </Label>
                        <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                          {resource.name}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Card>
              </Grid>
            </Grid>
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
                        <Label
                          variant="soft"
                          color={getStatusColor(person.status)}
                        >
                          {person.status}
                        </Label>
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
                        <Label
                          variant="soft"
                          color={getStatusColor(person.status)}
                        >
                          {person.status}
                        </Label>
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
              <Label
                variant="soft"
                color="success"
                sx={{ borderRadius: 2, fontSize: '12px' }}
              >
                Questions répondues: {questionsList.filter(q => q.answered).length.toString().padStart(2, '0')}
              </Label>
              <Label
                variant="soft"
                color="warning"
                sx={{ borderRadius: 2, fontSize: '12px' }}
              >
                Questions en attente: {questionsList.filter(q => !q.answered).length.toString().padStart(2, '0')}
              </Label>
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
                    <Label
                      variant="soft"
                      color={question.answered ? 'success' : 'warning'}
                      sx={{ borderRadius: 2, fontSize: '11px' }}
                    >
                      {question.answered ? 'Répondu' : 'En attente'}
                    </Label>
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