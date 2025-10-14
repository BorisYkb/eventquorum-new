// superviseur/activites/[id]/questions/[questionId]/page.tsx

'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import { DashboardContent } from 'src/layouts/superviseur';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function QuestionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const activityId = params.id;
  const questionId = params.questionId;

  const [responseText, setResponseText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  // Données simulées - à remplacer par un appel API réel
  const activity = {
    name: 'Formation en développement web',
    type: 'Formation'
  };

  // Récupérer les données de la question - à remplacer par un appel API réel
  const questionData = {
    1: {
      id: 1,
      participant: {
        name: 'Chonou Oriane',
        email: 'oriane.chonou@email.com',
        type: 'Présentiel',
        status: 'Connecté'
      },
      question: 'Comment avez invitez la prochaine fois ?',
      date: '12/05/2025',
      time: '10:30',
      answered: true,
      response: "Pour gérer les états dans React, vous pouvez utiliser le hook useState pour les composants fonctionnels ou this.state pour les composants de classe. Le hook useState retourne un tableau avec la valeur actuelle de l'état et une fonction pour le mettre à jour."
    },
    2: {
      id: 2,
      participant: {
        name: 'Kouamé Boris Yakoué',
        email: 'kouame.boris@email.com',
        type: 'En ligne',
        status: 'Connecté'
      },
      question: 'Quelle est la différence entre props et state ?',
      date: '12/05/2025',
      time: '11:15',
      answered: false,
      response: ""
    },
    3: {
      id: 3,
      participant: {
        name: 'Kouakou Evariste',
        email: 'kouakou.evariste@email.com',
        type: 'Présentiel',
        status: 'Déconnecté'
      },
      question: 'Comment optimiser les performances ?',
      date: '12/05/2025',
      time: '14:20',
      answered: true,
      response: "Pour optimiser les performances dans React, vous pouvez utiliser React.memo pour mémoriser les composants, useCallback pour mémoriser les fonctions, useMemo pour mémoriser les calculs coûteux, et éviter les re-rendus inutiles en optimisant la structure de vos composants."
    }
  };

  const question = questionData[Number(questionId)] || questionData[1];

  // Initialiser le texte de réponse si la question est déjà répondue
  useState(() => {
    if (question.answered && question.response) {
      setResponseText(question.response);
    }
  });

  const handleClearResponse = () => {
    setClearDialogOpen(true);
  };

  const confirmClearResponse = () => {
    setResponseText('');
    setClearDialogOpen(false);
  };

  const cancelClear = () => {
    setClearDialogOpen(false);
  };

  const handleSendResponse = async () => {
    if (!responseText.trim()) return;

    setIsSending(true);
    
    // Simuler l'envoi - remplacer par un vrai appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`Envoi de la réponse pour la question ${questionId}:`, responseText);
    
    setIsSending(false);
    setSuccessDialogOpen(true);
  };

  const handleSuccessClose = () => {
    setSuccessDialogOpen(false);
    router.back();
  };

  const getInitials = (name: string) => name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const getStatusColor = (status: string): 'success' | 'error' => status === 'Connecté' ? 'success' : 'error';

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Détails de la question"
        links={[
          { name: 'Intervenant', href: '/intervenant' },
          { name: 'Activités', href: '/intervenant/activites' },
          { name: activity.name, href: `/intervenant/activites/${activityId}` },
          { name: 'Question' }
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

      <Grid container spacing={3}>
        {/* Informations sur le participant */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 4, height: 'fit-content', position: 'sticky', top: 20 }}>
            <Typography variant="h6" sx={{ mb: 3, color: 'primary.main', fontWeight: 600 }}>
              INFORMATIONS DU PARTICIPANT
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'primary.main',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  mb: 2
                }}
              >
                {getInitials(question.participant.name)}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {question.participant.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {question.participant.email}
              </Typography>
            </Box>

            <Stack spacing={2} sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Type de participation :
                </Typography>
                <Label variant="soft" color="info" sx={{ borderRadius: 1 }}>
                  {question.participant.type}
                </Label>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                  Statut :
                </Typography>
                <Label variant="soft" color={getStatusColor(question.participant.status)} sx={{ borderRadius: 1 }}>
                  {question.participant.status}
                </Label>
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* Question et réponse */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={3}>
            {/* Carte de la question */}
            <Card sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
              <Box sx={{ bgcolor: '#F8F9FA', p: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Question posée
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Iconify icon="eva:calendar-outline" width={18} sx={{ color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {question.date}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Iconify icon="eva:clock-outline" width={18} sx={{ color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {question.time}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ p: 4 }}>
                <Card sx={{ p: 3, bgcolor: '#F3F4F6', borderRadius: 2, border: '1px solid #E5E7EB' }}>
                  <Typography variant="body1" sx={{ fontSize: '15px', lineHeight: 1.6, color: '#374151' }}>
                    {question.question}
                  </Typography>
                </Card>
              </Box>
            </Card>

            {/* Carte de réponse */}
            <Card sx={{ border: 1, borderColor: 'divider', borderRadius: 2 }}>
              <Box sx={{ bgcolor: '#F8F9FA', p: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Votre réponse
                  </Typography>
                  <Label
                    variant="soft"
                    color={question.answered ? 'success' : 'warning'}
                    sx={{ borderRadius: 2 }}
                  >
                    {question.answered ? 'Répondu' : 'En attente'}
                  </Label>
                </Box>
              </Box>

              <Box sx={{ p: 4 }}>
                <TextField
                  multiline
                  rows={10}
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Tapez votre réponse ici..."
                  fullWidth
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      bgcolor: 'background.paper',
                      fontSize: '14px'
                    }
                  }}
                />

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<Iconify icon="eva:trash-2-outline" />}
                    onClick={handleClearResponse}
                    disabled={!responseText.trim()}
                    sx={{
                      textTransform: 'none',
                      borderRadius: 2,
                      px: 3
                    }}
                  >
                    Effacer
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="eva:paper-plane-fill" />}
                    onClick={handleSendResponse}
                    disabled={!responseText.trim() || isSending}
                    sx={{
                      textTransform: 'none',
                      bgcolor: 'success.main',
                      '&:hover': { bgcolor: 'success.dark' },
                      borderRadius: 2,
                      px: 3
                    }}
                  >
                    {isSending ? 'Envoi...' : 'Envoyer la réponse'}
                  </Button>
                </Box>
              </Box>
            </Card>

            {/* Message d'aide */}
            <Card sx={{ p: 3, bgcolor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Iconify icon="eva:info-outline" width={24} sx={{ color: 'info.main', flexShrink: 0, mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" sx={{ fontSize: '13px', lineHeight: 1.6, color: '#1E40AF' }}>
                    <strong>Conseil :</strong> Assurez-vous que votre réponse est claire et complète avant de l'envoyer. 
                    Une fois envoyée, la réponse sera visible par le participant. Vous pourrez toujours la modifier ultérieurement si nécessaire.
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Dialog de confirmation pour effacer */}
      <Dialog
        open={clearDialogOpen}
        onClose={cancelClear}
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
            Êtes-vous sûr de vouloir effacer tout le contenu de votre réponse ? Cette action ne peut pas être annulée.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={cancelClear} sx={{ textTransform: 'none' }}>
            Annuler
          </Button>
          <Button
            onClick={confirmClearResponse}
            variant="contained"
            color="error"
            sx={{ textTransform: 'none' }}
          >
            Effacer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de succès */}
      <Dialog
        open={successDialogOpen}
        onClose={handleSuccessClose}
        PaperProps={{
          sx: { borderRadius: 2, minWidth: 400 }
        }}
      >
        <DialogTitle sx={{ pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Iconify icon="eva:checkmark-circle-2-fill" sx={{ color: 'success.main' }} width={28} />
            Réponse envoyée
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: '14px' }}>
            Votre réponse a été envoyée avec succès au participant. Il recevra une notification de votre réponse.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleSuccessClose}
            variant="contained"
            color="success"
            sx={{ textTransform: 'none' }}
          >
            Compris
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardContent>
  );
}