// superviseur/activites/[id]/questions/[questionId]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/superviseur';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function QuestionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const activityId = params.id;
  const questionId = params.questionId;

  // Données simulées - à remplacer par un appel API réel
  const activity = {
    name: 'Formation en développement web',
    type: 'Formation'
  };

  type Question = {
    id: number;
    participant: {
      name: string;
      email: string;
      type: string;
      status: string;
    };
    question: string;
    date: string;
    time: string;
    answered: boolean;
    response: string;
    respondedBy?: {
      name: string;
      email: string;
      respondedAt?: string;
    };
  };

  // Récupérer les données de la question - à remplacer par un appel API réel
  const questionData: Record<number, Question> = {
    1: {
      id: 1,
      participant: {
        name: 'Chonou Oriane',
        email: 'oriane.chonou@email.com',
        type: 'Présentiel',
        status: 'Connecté'
      },
      question: 'Comment gérer les états dans React ?',
      date: '12/05/2025',
      time: '10:30',
      answered: true,
      response: "Pour gérer les états dans React, vous pouvez utiliser le hook useState pour les composants fonctionnels ou this.state pour les composants de classe. Le hook useState retourne un tableau avec la valeur actuelle de l'état et une fonction pour le mettre à jour.",
      respondedBy: {
        name: 'Dr. Jean Kouassi',
        email: 'jean.kouassi@email.com',
        respondedAt: '12/05/2025 à 11:15'
      }
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
      question: 'Comment optimiser les performances dans React ?',
      date: '12/05/2025',
      time: '14:20',
      answered: true,
      response: "Pour optimiser les performances dans React, vous pouvez utiliser React.memo pour mémoriser les composants, useCallback pour mémoriser les fonctions, useMemo pour mémoriser les calculs coûteux, et éviter les re-rendus inutiles en optimisant la structure de vos composants.",
      respondedBy: {
        name: 'Prof. Marie Aké',
        email: 'marie.ake@email.com',
        respondedAt: '12/05/2025 à 15:45'
      }
    }
  };

  const question = questionData[Number(questionId)] || questionData[1];

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
          { name: 'Superviseur', href: '/superviseur' },
          { name: 'Activités', href: '/superviseur/activites' },
          { name: activity.name, href: `/superviseur/activites/${activityId}` },
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
                    Réponse
                  </Typography>
                  <Label
                    variant="soft"
                    color={question.answered ? 'success' : 'warning'}
                    // sx={{ borderRadius: 2 }}
                  >
                    {question.answered ? 'Répondu' : 'En attente'}
                  </Label>
                </Box>
              </Box>

              <Box sx={{ p: 4 }}>
                {question.answered ? (
                  <>
                    {/* Affichage de l'auteur de la réponse */}
                    {question.respondedBy && (
                      <Card sx={{
                        p: 2.5,
                        mb: 3,
                        bgcolor: '#F0F9FF',
                        border: '1px solid #BAE6FD',
                        borderRadius: 2
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            sx={{
                              width: 40,
                              height: 40,
                              bgcolor: 'info.main',
                              fontSize: '0.875rem',
                              fontWeight: 600
                            }}
                          >
                            {getInitials(question.respondedBy.name)}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#0369A1', mb: 0.5 }}>
                              Répondu par {question.respondedBy.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              <Typography variant="caption" color="text.secondary">
                                {question.respondedBy.email}
                              </Typography>
                              {question.respondedBy.respondedAt && (
                                <>
                                  <Box sx={{
                                    width: 4,
                                    height: 4,
                                    borderRadius: '50%',
                                    bgcolor: 'text.secondary'
                                  }} />
                                  <Typography variant="caption" color="text.secondary">
                                    Le {question.respondedBy.respondedAt}
                                  </Typography>
                                </>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </Card>
                    )}

                    {/* Affichage de la réponse */}
                    <Card sx={{
                      p: 3,
                      bgcolor: '#F9FAFB',
                      borderRadius: 2,
                      border: '1px solid #E5E7EB'
                    }}>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: '14px',
                          lineHeight: 1.8,
                          color: '#374151',
                          whiteSpace: 'pre-wrap'
                        }}
                      >
                        {question.response}
                      </Typography>
                    </Card>
                  </>
                ) : (
                  <Box sx={{
                    p: 4,
                    bgcolor: '#FEF3C7',
                    borderRadius: 2,
                    border: '1px solid #FCD34D',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <Iconify icon="eva:clock-outline" sx={{ color: '#D97706' }} width={48} />
                    <Typography variant="body1" sx={{ color: '#92400E', fontWeight: 500, textAlign: 'center' }}>
                      Cette question est en attente de réponse
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#78350F', textAlign: 'center' }}>
                      L'intervenant n'a pas encore répondu à cette question
                    </Typography>
                  </Box>
                )}
              </Box>
            </Card>

            {/* Message d'information */}
            <Card sx={{ p: 3, bgcolor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Iconify icon="eva:info-outline" width={24} sx={{ color: 'info.main', flexShrink: 0, mt: 0.5 }} />
                <Box>
                  <Typography variant="body2" sx={{ fontSize: '13px', lineHeight: 1.6, color: '#1E40AF' }}>
                    <strong>Mode consultation :</strong> Vous consultez cette question et sa réponse en lecture seule.
                    Seul l'intervenant assigné à cette activité peut répondre ou modifier la réponse.
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}