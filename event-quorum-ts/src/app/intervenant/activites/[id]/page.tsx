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

  const questionsList = [
    {
      id: 1,
      participant: 'Chonou Oriane',
      question: 'Comment avez invitez la prochaine fois ?',
      time: '10:30',
      answered: true,
      response: "Pour gérer les états dans React, vous pouvez utiliser le hook useState pour les composants fonctionnels ou this.state pour les composants de classe. Le hook useState retourne un tableau avec la valeur actuelle de l'état et une fonction pour le mettre à jour."
    },
    {
      id: 2,
      participant: 'Kouamé Boris Yakoué',
      question: 'Quelle est la différence entre props et state ?',
      time: '11:15',
      answered: false,
      response: ""
    },
    {
      id: 3,
      participant: 'Kouakou Evariste',
      question: 'Comment optimiser les performances ?',
      time: '14:20',
      answered: true,
      response: "Pour optimiser les performances dans React, vous pouvez utiliser React.memo pour mémoriser les composants, useCallback pour mémoriser les fonctions, useMemo pour mémoriser les calculs coûteux, et éviter les re-rendus inutiles en optimisant la structure de vos composants."
    }
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
              borderRadius: 2,
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
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Questions des participants
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
                {/* En-tête avec nom du participant */}
                <Box sx={{ bgcolor: '#F8F9FA', p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2" fontWeight="bold" color="primary.main">
                        {question.participant}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        • {question.time}
                      </Typography>
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
            
                <Box sx={{ p: 3 }}>
                  {/* Question du participant */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'medium', mb: 1, display: 'block' }}>
                      Question :
                    </Typography>
                    <Card sx={{ p: 2, bgcolor: '#F3F4F6', borderRadius: 2, border: '1px solid #E5E7EB' }}>
                      <Typography variant="body2" sx={{ fontSize: '14px', lineHeight: 1.5 }}>
                        {question.question}
                      </Typography>
                    </Card>
                  </Box>
            
                  {/* Zone de réponse */}
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'medium', mb: 1, display: 'block' }}>
                      Votre réponse :
                    </Typography>

                    {editingResponse === question.id ? (
                      // Mode édition
                      <Box>
                        <TextField
                          multiline
                          rows={4}
                          value={editResponseText}
                          onChange={(e) => setEditResponseText(e.target.value)}
                          placeholder="Tapez votre réponse ici..."
                          fullWidth
                          sx={{ 
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2
                            }
                          }}
                        />
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                          <Button
                            size="small"
                            onClick={() => {
                              setEditingResponse(null);
                              setEditResponseText('');
                            }}
                            sx={{ textTransform: 'none', color: 'text.secondary' }}
                          >
                            Annuler
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => handleSaveResponse(question.id)}
                            disabled={!editResponseText.trim()}
                            sx={{ 
                              textTransform: 'none',
                              bgcolor: 'success.main',
                              '&:hover': { bgcolor: 'success.dark' },
                              borderRadius: 1.5
                            }}
                          >
                            Envoyer
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      // Mode affichage
                      <Box>
                        <Card sx={{ 
                          p: 2, 
                          bgcolor: question.answered ? '#F0FDF4' : '#F9FAFB', 
                          minHeight: 80, 
                          borderRadius: 2,
                          border: question.answered ? '1px solid #D1FAE5' : '1px solid #E5E7EB',
                          mb: 2
                        }}>
                          {question.answered && question.response ? (
                            <Typography variant="body2" sx={{ fontSize: '14px', lineHeight: 1.5, color: '#374151' }}>
                              {question.response}
                            </Typography>
                          ) : (
                            <Typography 
                              variant="body2" 
                              color="text.disabled" 
                              fontStyle="italic" 
                              sx={{ 
                                fontSize: '14px',
                                display: 'flex',
                                alignItems: 'center',
                                minHeight: 50
                              }}
                            >
                              Cliquez sur "Répondre" pour saisir votre réponse...
                            </Typography>
                          )}
                        </Card>
                        
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                          {question.answered && question.response ? (
                            <>
                              <Tooltip title="Modifier la réponse">
                                <IconButton
                                  size="small"
                                  onClick={() => handleEditResponse(question.id, question.response)}
                                  sx={{ 
                                    bgcolor: 'primary.lighter',
                                    color: 'primary.main',
                                    '&:hover': { bgcolor: 'primary.light' }
                                  }}
                                >
                                  <Iconify icon="eva:edit-2-fill" width={16} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Effacer la réponse">
                                <IconButton
                                  size="small"
                                  onClick={() => handleDeleteResponse(question.id)}
                                  sx={{ 
                                    bgcolor: 'error.lighter',
                                    color: 'error.main',
                                    '&:hover': { bgcolor: 'error.light' }
                                  }}
                                >
                                  <Iconify icon="eva:trash-2-fill" width={16} />
                                </IconButton>
                              </Tooltip>
                            </>
                          ) : (
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<Iconify icon="eva:message-circle-fill" width={16} />}
                              onClick={() => handleEditResponse(question.id, '')}
                              sx={{ 
                                textTransform: 'none',
                                bgcolor: 'primary.main',
                                '&:hover': { bgcolor: 'primary.dark' },
                                borderRadius: 1.5,
                                px: 2
                              }}
                            >
                              Répondre
                            </Button>
                          )}
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
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
