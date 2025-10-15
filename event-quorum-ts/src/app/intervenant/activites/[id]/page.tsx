// superviseur/activites/[id]/page.tsx

'use client';

import { date } from 'zod';
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid2';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import DialogContentText from '@mui/material/DialogContentText';

import { DashboardContent } from 'src/layouts/superviseur';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [responseToDelete, setResponseToDelete] = useState<number | null>(null);
  const [editingResponse, setEditingResponse] = useState<number | null>(null);
  const [editResponseText, setEditResponseText] = useState('');
  const [questionSearchTerm, setQuestionSearchTerm] = useState('');
  
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [emargementFilter, setEmargementFilter] = useState<string>('all');
  
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

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
      { type: 'Vidéo', name: 'Introduction aux concepts React' },
      { type: 'Intervenant', name: 'Aka Marcelline' }
    ]
  };

  const participantsList = [
    { id: 1, name: 'Chonou Oriane', email: 'oriane.chonou@email.com', type: 'Présentiel', status: 'Connecté', emarger: true, dateRegistered: '2025/05/01 09:00' },
    { id: 2, name: 'Kouamé Boris Yakoué', email: 'kouame.boris@email.com', type: 'En ligne', status: 'Connecté', emarger: true, dateRegistered: '2025/05/01 09:00' },
    { id: 3, name: 'Kouakou Evariste', email: 'kouakou.evariste@email.com', type: 'Présentiel', status: 'Déconnecté', emarger: false, dateRegistered: '2025/05/01 09:00' },
    { id: 4, name: 'Aya Koffi', email: 'aya.koffi@email.com', type: 'En ligne', status: 'Connecté', emarger: true, dateRegistered: '2025/05/01 10:00' },
    { id: 5, name: 'Konan Jean', email: 'konan.jean@email.com', type: 'Présentiel', status: 'Connecté', emarger: false, dateRegistered: '2025/05/01 10:15' },
    { id: 6, name: 'Yao Marie', email: 'yao.marie@email.com', type: 'En ligne', status: 'Déconnecté', emarger: true, dateRegistered: '2025/05/01 10:30' },
    { id: 7, name: 'N\'Guessan Paul', email: 'nguessan.paul@email.com', type: 'Présentiel', status: 'Connecté', emarger: true, dateRegistered: '2025/05/01 11:00' },
    { id: 8, name: 'Bamba Fatou', email: 'bamba.fatou@email.com', type: 'En ligne', status: 'Connecté', emarger: false, dateRegistered: '2025/05/01 11:15' },
    { id: 9, name: 'Diallo Ibrahim', email: 'diallo.ibrahim@email.com', type: 'Présentiel', status: 'Connecté', emarger: true, dateRegistered: '2025/05/01 11:30' },
    { id: 10, name: 'Traoré Aminata', email: 'traore.aminata@email.com', type: 'En ligne', status: 'Déconnecté', emarger: false, dateRegistered: '2025/05/01 12:00' },
    { id: 11, name: 'Coulibaly Moussa', email: 'coulibaly.moussa@email.com', type: 'Présentiel', status: 'Connecté', emarger: true, dateRegistered: '2025/05/01 12:15' },
    { id: 12, name: 'Kone Mariam', email: 'kone.mariam@email.com', type: 'En ligne', status: 'Connecté', emarger: true, dateRegistered: '2025/05/01 12:30' },
  ];

  const questionsList = [
    {
      id: 1,
      participant: 'Chonou Oriane',
      question: 'Comment avez invitez la prochaine fois ?',
      date: '12/05/2025',
      time: '10:30',
      answered: true,
      response: "Pour gérer les états dans React..."
    },
    {
      id: 2,
      participant: 'Kouamé Boris Yakoué',
      question: 'Quelle est la différence entre props et state ?',
      date: '12/05/2025',
      time: '11:15',
      answered: false,
      response: ""
    },
    {
      id: 3,
      participant: 'Kouakou Evariste',
      question: 'Comment optimiser les performances ?',
      date: '12/05/2025',
      time: '14:20',
      answered: true,
      response: "Pour optimiser les performances dans React, vous pouvez utiliser React.memo pour mémoriser les composants, useCallback pour mémoriser les fonctions, useMemo pour mémoriser les calculs coûteux, et éviter les re-rendus inutiles en optimisant la structure de vos composants."
    }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setSearchTerm('');
    setTypeFilter('all');
    setEmargementFilter('all');
    setPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const exportToExcel = () => {
    const dataToExport = filteredParticipants.map(participant => ({
      'Nom': participant.name,
      'Email': participant.email,
      'Type': participant.type,
      'Statut': participant.status,
      'Émargement': participant.emarger ? 'Émargé' : 'Non émargé'
    }));

    const csvContent = [
      Object.keys(dataToExport[0]).join(','),
      ...dataToExport.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `participants_${activity.name.replace(/\s+/g, '_')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleEditResponse = (questionId: number, currentResponse: string) => {
    setEditingResponse(questionId);
    setEditResponseText(currentResponse);
  };

  const handleSaveResponse = (questionId: number) => {
    console.log(`Sauvegarde de la réponse pour la question ${questionId}: ${editResponseText}`);
    setEditingResponse(null);
    setEditResponseText('');
  };

  const handleDeleteResponse = (questionId: number) => {
    setResponseToDelete(questionId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteResponse = () => {
    if (responseToDelete) {
      console.log(`Suppression de la réponse pour la question ${responseToDelete}`);
      setDeleteDialogOpen(false);
      setResponseToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setResponseToDelete(null);
  };

  const handleViewQuestion = (questionId: number) => {
    router.push(`/intervenant/activites/${activityId}/questions/${questionId}`);
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

  const filteredParticipants = participantsList.filter(person => {
    const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || person.type === typeFilter;
    
    const matchesEmargement = emargementFilter === 'all' || 
                             (emargementFilter === 'emarger' && person.emarger) ||
                             (emargementFilter === 'non-emarger' && !person.emarger);
    
    return matchesSearch && matchesType && matchesEmargement;
  });

  const paginatedParticipants = filteredParticipants.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalPages = Math.ceil(filteredParticipants.length / rowsPerPage);

  const filteredQuestions = questionsList.filter(question =>
    question.participant.toLowerCase().includes(questionSearchTerm.toLowerCase()) ||
    question.question.toLowerCase().includes(questionSearchTerm.toLowerCase())
  );

  const getWidgetColor = (index: number): 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' => {
    const colors: Array<'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'> = ['primary', 'secondary', 'success', 'warning', 'error', 'info'];
    return colors[index % colors.length];
  };

  const InfoItem = ({ icon, label, value }: { icon: string; label: string; value: string | undefined }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
      <Box sx={{
        width: 48,
        height: 48,
        borderRadius: 2,
        bgcolor: 'primary.lighter',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <Iconify icon={icon} width={24} sx={{ color: 'primary.main' }} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
          {label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {value || '-'}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Détails de l'activité"
        links={[
          { name: 'Intervenant', href: '/intervenant' },
          { name: 'Activités', href: '/intervenant/activites' },
          { name: activity.name }
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:arrow-back-fill" />}
            onClick={() => router.back()}
            sx={{
              bgcolor: '#000',
              color: 'white',
              '&:hover': { bgcolor: '#333' }
            }}
          >
            Retour
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

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

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <SuperviseurWidgetSummary
            title="Invités"
            total={activity.invited}
            color={getWidgetColor(0)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <SuperviseurWidgetSummary
            title="Invités ayant émarger"
            total={activity.participants}
            color={getWidgetColor(1)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <SuperviseurWidgetSummary
            title="Présentiel"
            total={activity.presentielParticipants}
            color={getWidgetColor(2)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <SuperviseurWidgetSummary
            title="En ligne"
            total={activity.onlineParticipants}
            color={getWidgetColor(3)}
            sx={{ height: 180 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
          <SuperviseurWidgetSummary
            title="Connectés"
            total={activity.connected}
            color={getWidgetColor(4)}
            sx={{ height: 180 }}
          />
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 2, overflow: 'hidden' }}>
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
            <Tab label="Questions des invités" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <Grid container spacing={3}>
            {/* Section Informations générales et Date & Lieu */}
            <Grid size={12}>
              <Card sx={{ p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <Grid container spacing={4}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Iconify icon="solar:document-text-bold-duotone" width={24} sx={{ color: 'primary.main' }} />
                      Informations générales
                    </Typography>
                    <Stack divider={<Divider />}>
                      <InfoItem icon="solar:tag-bold-duotone" label="Type d'activité" value={activity.type} />
                      <InfoItem icon="solar:clock-circle-bold-duotone" label="Statut" value={activity.status} />
                      <InfoItem icon="solar:calendar-bold-duotone" label="Durée" value={activity.duration} />
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Iconify icon="solar:map-point-bold-duotone" width={24} sx={{ color: 'primary.main' }} />
                      Date & Lieu
                    </Typography>
                    <Stack divider={<Divider />}>
                      <InfoItem icon="solar:calendar-mark-bold-duotone" label="Date" value={activity.date} />
                      <InfoItem icon="solar:clock-circle-bold-duotone" label="Heure" value={activity.time} />
                      <InfoItem icon="solar:map-point-bold-duotone" label="Lieu" value={activity.location} />
                      <InfoItem icon="solar:users-group-rounded-bold-duotone" label="Capacité maximale" value={`${activity.maxParticipants} participants`} />
                    </Stack>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            {/* Section Description */}
            <Grid size={12}>
              <Card sx={{ p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="solar:document-text-bold-duotone" width={24} sx={{ color: 'primary.main' }} />
                  Description
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, color: 'text.secondary' }}>
                  {activity.description}
                </Typography>
              </Card>
            </Grid>

            {/* Section Ressources */}
            <Grid size={12}>
              <Card sx={{ p: 4, borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Iconify icon="solar:folder-with-files-bold-duotone" width={24} sx={{ color: 'primary.main' }} />
                  Ressources disponibles
                </Typography>
                <Grid container spacing={2}>
                  {activity.resources.map((resource, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={index}>
                      <Box
                        sx={{
                          p: 2.5,
                          bgcolor: 'grey.50',
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'grey.200',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          transition: 'all 0.2s',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: 'primary.lighter',
                            borderColor: 'primary.main',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                          }
                        }}
                      >
                        <Box sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1.5,
                          bgcolor: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Iconify 
                            icon={
                              resource.type === 'Document' ? 'solar:document-bold-duotone' :
                              resource.type === 'Lien' ? 'solar:link-bold-duotone' :
                              resource.type === 'Vidéo' ? 'solar:videocamera-record-bold-duotone' :
                              'solar:user-bold-duotone'
                            } 
                            width={24} 
                            sx={{ color: 'primary.main' }} 
                          />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="caption" sx={{ 
                            color: 'text.secondary', 
                            display: 'block',
                            mb: 0.5
                          }}>
                            {resource.type}
                          </Typography>
                          <Typography variant="body2" sx={{ 
                            fontWeight: 500,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}>
                            {resource.name}
                          </Typography>
                        </Box>
                        <Iconify icon="solar:arrow-right-bold" width={20} sx={{ color: 'text.disabled' }} />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={activeTab} index={1}>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <TextField
                  placeholder="Rechercher un invité..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                  size="small"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Iconify icon="eva:search-fill" sx={{ color: '#9E9E9E' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth size="small">
                  <TextField
                    select
                    value={typeFilter}
                    onChange={(e) => {
                      setTypeFilter(e.target.value);
                      setPage(1);
                    }}
                    size="small"
                    label="Type"
                  >
                    <MenuItem value="all">Tous les types</MenuItem>
                    <MenuItem value="Présentiel">Présentiel</MenuItem>
                    <MenuItem value="En ligne">En ligne</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <FormControl fullWidth size="small">
                  <TextField
                    select
                    value={emargementFilter}
                    onChange={(e) => {
                      setEmargementFilter(e.target.value);
                      setPage(1);
                    }}
                    size="small"
                    label="Émargement"
                  >
                    <MenuItem value="all">Tous</MenuItem>
                    <MenuItem value="emarger">Émargé</MenuItem>
                    <MenuItem value="non-emarger">Non émargé</MenuItem>
                  </TextField>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="eva:download-fill" />}
                  onClick={exportToExcel}
                  fullWidth
                  sx={{
                    height: '40px',
                    borderRadius: 2,
                    textTransform: 'none',
                    bgcolor: '#000',
                    '&:hover': {
                      bgcolor: '#333'
                    }
                  }}
                >
                  Exporter
                </Button>
              </Grid>
            </Grid>

            <Typography variant="body2" color="text.secondary">
              {filteredParticipants.length} invité(s) trouvé(s)
            </Typography>
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#F8F9FA', py: 2 } }}>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Nom</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Statut</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Émargement</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Enregistrée le</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedParticipants.length > 0 ? (
                  paginatedParticipants.map((person) => (
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
                      <TableCell sx={{ py: 2 }}>
                        <Label
                          variant="soft"
                          color={person.emarger ? 'success' : 'error'}
                        >
                          {person.emarger ? 'Émargé' : 'Non émargé'}
                        </Label>
                      </TableCell>
                      <TableCell sx={{ py: 2 }}>
                        <Typography variant="body2" sx={{ fontSize: '14px', color: '#6B7280' }}>
                          {new Date(person.dateRegistered).toLocaleString('fr-FR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        Aucun invité trouvé avec les filtres appliqués
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </TabPanel>

        <TabPanel value={activeTab} index={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <TextField
              placeholder="Rechercher une question..."
              value={questionSearchTerm}
              onChange={(e) => setQuestionSearchTerm(e.target.value)}
              size="small"
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: '#9E9E9E' }} />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Label
                variant="soft"
                color="success"
                sx={{ borderRadius: 2, fontSize: '12px', py: 1.5, px: 2 }}
              >
                Répondues: {questionsList.filter(q => q.answered).length.toString().padStart(2, '0')}
              </Label>
              <Label
                variant="soft"
                color="warning"
                sx={{ borderRadius: 2, fontSize: '12px', py: 1.5, px: 2 }}
              >
                En attente: {questionsList.filter(q => !q.answered).length.toString().padStart(2, '0')}
              </Label>
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#F8F9FA', py: 2 } }}>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px', width: '15%' }}>Participant</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px', width: '40%' }}>Question</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px', width: '12%' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px', width: '10%' }}>Heure</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px', width: '13%' }}>Statut</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px', width: '10%', textAlign: 'center' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredQuestions.map((question) => (
                  <TableRow key={question.id} hover sx={{ '&:hover': { bgcolor: '#F8F9FA' } }}>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151', fontWeight: 500 }}>
                        {question.participant}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '14px',
                          color: '#6B7280',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {question.question}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                        {question.date}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Typography variant="body2" sx={{ fontSize: '14px', color: '#374151' }}>
                        {question.time}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ py: 2 }}>
                      <Label
                        variant="soft"
                        color={question.answered ? 'success' : 'warning'}
                        sx={{ borderRadius: 1.5 }}
                      >
                        {question.answered ? 'Répondu' : 'En attente'}
                      </Label>
                    </TableCell>
                    <TableCell sx={{ py: 2, textAlign: 'center' }}>
                      {question.answered ? (
                        <Tooltip title="Voir les détails">
                          <IconButton
                            size="small"
                            onClick={() => handleViewQuestion(question.id)}
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
                      ) : (
                        <Button
                          size="small"
                          variant="contained"
                          onClick={() => handleViewQuestion(question.id)}
                          sx={{
                            textTransform: 'none',
                            bgcolor: 'primary.main',
                            '&:hover': { bgcolor: 'primary.dark' },
                            borderRadius: 1.5,
                            px: 2,
                            py: 0.5
                          }}
                        >
                          Répondre
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <Dialog
          open={deleteDialogOpen}
          onClose={cancelDelete}
          PaperProps={{
            sx: { borderRadius: 2, minWidth: 400 }
          }}
        >
          <DialogTitle sx={{ pb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Iconify icon="eva:alert-triangle-fill" sx={{ color: 'warning.main' }} width={24} />
              Confirmer la suppression
            </Box>
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontSize: '14px' }}>
              Êtes-vous sûr de vouloir effacer cette réponse ? Cette action est irréversible et la question repassera en statut "En attente".
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button onClick={cancelDelete} sx={{ textTransform: 'none' }}>
              Annuler
            </Button>
            <Button
              onClick={confirmDeleteResponse}
              variant="contained"
              color="error"
              sx={{ textTransform: 'none' }}
            >
              Effacer
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </DashboardContent>
  );
}