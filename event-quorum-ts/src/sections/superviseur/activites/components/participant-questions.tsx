// superviseur/activites/[id]/components/participant-questions.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import CircularProgress from '@mui/material/CircularProgress';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

interface ParticipantQuestionsProps {
  activityId: string;
}

export default function ParticipantQuestions({ activityId }: ParticipantQuestionsProps) {
  const router = useRouter();
  const [questionSearchTerm, setQuestionSearchTerm] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // TODO: API - Récupérer les questions
  const fetchQuestions = async () => {
    try {
      setRefreshing(true);

      // TODO: Remplacer par un vrai appel API
      // const response = await fetch(`/api/activities/${activityId}/questions`);
      // const data = await response.json();
      // setQuestions(data);

      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 500));

      // Données de test
      const mockQuestions = [
        {
          id: 1,
          participant: 'Chonou Oriane',
          question: 'Comment gérer les états ?',
          date: '12/05/2025',
          time: '10:30',
          answered: true,
          response: 'Utilisez useState...'
        },
        {
          id: 2,
          participant: 'Kouamé Boris',
          question: 'Différence props et state ?',
          date: '12/05/2025',
          time: '11:15',
          answered: false,
          response: ''
        },
        {
          id: 3,
          participant: 'Kouakou Evariste',
          question: 'Comment optimiser les performances ?',
          date: '12/05/2025',
          time: '14:20',
          answered: true,
          response: 'Utilisez React.memo...'
        },
        {
          id: 4,
          participant: 'Aya Koffi',
          question: 'Quels sont les hooks les plus utilisés ?',
          date: '12/05/2025',
          time: '15:00',
          answered: false,
          response: ''
        },
      ];

      setQuestions(mockQuestions);
    } catch (error) {
      console.error('Erreur lors du chargement des questions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [activityId]);

  const filteredQuestions = questions.filter(q =>
    q.participant.toLowerCase().includes(questionSearchTerm.toLowerCase()) ||
    q.question.toLowerCase().includes(questionSearchTerm.toLowerCase())
  );

  const handleViewQuestion = (questionId: number) => {
    router.push(`/superviseur/activites/${activityId}/questions/${questionId}`);
  };

  const handleRefresh = () => {
    fetchQuestions();
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Barre de recherche et statistiques */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
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
            )
          }}
        />

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* Nombre total de questions */}
          <Label
            variant="soft"
            color="info"
            sx={{ borderRadius: 2, fontSize: '12px', py: 1.5, px: 2 }}
          >
            Total: {questions.length.toString().padStart(2, '0')} question{questions.length > 1 ? 's' : ''}
          </Label>

          {/* Questions répondues */}
          <Label
            variant="soft"
            color="success"
            sx={{ borderRadius: 2, fontSize: '12px', py: 1.5, px: 2 }}
          >
            Répondues: {questions.filter(q => q.answered).length.toString().padStart(2, '0')}
          </Label>

          {/* Questions en attente */}
          <Label
            variant="soft"
            color="warning"
            sx={{ borderRadius: 2, fontSize: '12px', py: 1.5, px: 2 }}
          >
            En attente: {questions.filter(q => !q.answered).length.toString().padStart(2, '0')}
          </Label>

          {/* Bouton actualiser */}
          <Tooltip title="Actualiser les questions">
            <IconButton
              onClick={handleRefresh}
              disabled={refreshing}
              sx={{
                bgcolor: 'primary.lighter',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.light',
                },
                '&.Mui-disabled': {
                  bgcolor: 'grey.200',
                }
              }}
            >
              {refreshing ? (
                <CircularProgress size={20} sx={{ color: 'primary.main' }} />
              ) : (
                <Iconify icon="solar:refresh-bold-duotone" width={20} />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Tableau des questions */}
      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#F8F9FA', py: 2 } }}>
              <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px', width: '15%' }}>
                Participant
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px', width: '40%' }}>
                Question
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px', width: '12%' }}>
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px', width: '10%' }}>
                Heure
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px', width: '13%' }}>
                Statut
              </TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px', width: '10%', textAlign: 'center' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
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
                      // sx={{ borderRadius: 1.5 }}
                    >
                      {question.answered ? 'Répondu' : 'En attente'}
                    </Label>
                  </TableCell>
                  <TableCell sx={{ py: 2, textAlign: 'center' }}>
                    <Tooltip title="Voir les détails">
                      <IconButton
                        size="small"
                        onClick={() => handleViewQuestion(question.id)}
                        sx={{
                          color: '#4FC3F7',
                          '&:hover': {
                            bgcolor: 'info.lighter',
                          }
                        }}
                      >
                        <Iconify icon="solar:eye-bold" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Aucune question trouvée
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}