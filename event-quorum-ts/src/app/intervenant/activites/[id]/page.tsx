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
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
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
    { id: 1, name: 'Chonou Oriane', email: 'oriane.chonou@email.com', type: 'Présentiel', status: 'Connecté', dateRegistered: '2025/05/01 09:00' },
    { id: 2, name: 'Kouamé Boris Yakoué', email: 'kouame.boris@email.com', type: 'En ligne', status: 'Connecté', dateRegistered: '2025/05/01 09:00' },
    { id: 3, name: 'Kouakou Evariste', email: 'kouakou.evariste@email.com', type: 'Présentiel', status: 'Déconnecté', dateRegistered: '2025/05/01 09:00' },
  ];



  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setSearchTerm('');
  };

  // Fonction pour exporter en Excel
  const exportToExcel = () => {
    // Préparer les données pour l'export
    const dataToExport = participantsList.map(participant => ({
      'Nom': participant.name,
      'Email': participant.email,
      'Type': participant.type,
      'Statut': participant.status
    }));

    // Créer un CSV (simulant l'export Excel)
    const csvContent = [
      Object.keys(dataToExport[0]).join(','),
      ...dataToExport.map(row => Object.values(row).join(','))
    ].join('\n');

    // Télécharger le fichier
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

  // Fonctions pour gérer les réponses
  const handleEditResponse = (questionId: number, currentResponse: string) => {
    setEditingResponse(questionId);
    setEditResponseText(currentResponse);
  };

  const handleSaveResponse = (questionId: number) => {
    // Ici vous pouvez ajouter la logique pour sauvegarder la réponse
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
      // Ici vous pouvez ajouter la logique pour supprimer la réponse
      console.log(`Suppression de la réponse pour la question ${responseToDelete}`);
      setDeleteDialogOpen(false);
      setResponseToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setResponseToDelete(null);
  };

  // N'oubliez pas d'ajouter ces éléments dans votre composant :

  // 1. Dans vos états (au début du composant) :
  const [questionSearchTerm, setQuestionSearchTerm] = useState('');

  // 2. Ajoutez la propriété 'date' dans questionsList :
  const questionsList = [
  {
    id: 1,
    participant: 'Chonou Oriane',
    question: 'Comment avez invitez la prochaine fois ?',
    date: '12/05/2025',  // ← AJOUTEZ CETTE LIGNE
    time: '10:30',
    answered: true,
    response: "Pour gérer les états dans React..."
  },
  // ... autres questions avec 'date' ajoutée
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

// 3. Ajoutez le filtre pour les questions :
const filteredQuestions = questionsList.filter(question =>
  question.participant.toLowerCase().includes(questionSearchTerm.toLowerCase()) ||
  question.question.toLowerCase().includes(questionSearchTerm.toLowerCase())
);

// 4. Ajoutez la fonction handleViewQuestion :
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

  const filteredParticipants = participantsList.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            title="Présence confirmée"
            total={10}
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <TextField
              placeholder="Rechercher un participant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:download-fill" />}
              onClick={exportToExcel}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                bgcolor: 'black.main',
                '&:hover': {
                  bgcolor: 'black.dark'
                }
              }}
            >
              Exporter
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#F8F9FA', py: 2 } }}>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Nom</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Statut</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>Enregistrée le</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredParticipants.map((person) => (
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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


          
        {/* Dialog de confirmation pour supprimer une réponse */}
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
