// ============================================================================
// FICHIER 4: superviseur/activites/[id]/components/participant-questions.tsx
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
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

  // TODO: API - Récupérer les questions
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      // const response = await fetch(`/api/activities/${activityId}/questions`);
      
      // Données de test
      const mockQuestions = [
        { id: 1, participant: 'Chonou Oriane', question: 'Comment gérer les états ?', date: '12/05/2025', time: '10:30', answered: true, response: 'Utilisez useState...' },
        { id: 2, participant: 'Kouamé Boris', question: 'Différence props et state ?', date: '12/05/2025', time: '11:15', answered: false, response: '' },
      ];
      setQuestions(mockQuestions);
      setLoading(false);
    };
    fetchQuestions();
  }, [activityId]);

  const filteredQuestions = questions.filter(q =>
    q.participant.toLowerCase().includes(questionSearchTerm.toLowerCase()) ||
    q.question.toLowerCase().includes(questionSearchTerm.toLowerCase())
  );

  const handleViewQuestion = (questionId: number) => {
    router.push(`/intervenant/activites/${activityId}/questions/${questionId}`);
  };

  if (loading) return <Box sx={{ textAlign: 'center', py: 4 }}>Chargement...</Box>;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <TextField
          placeholder="Rechercher..."
          value={questionSearchTerm}
          onChange={(e) => setQuestionSearchTerm(e.target.value)}
          size="small"
          sx={{ width: 300 }}
          InputProps={{ startAdornment: <InputAdornment position="start"><Iconify icon="eva:search-fill" /></InputAdornment> }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Label variant="soft" color="success" sx={{ py: 1.5, px: 2 }}>Répondues: {questions.filter(q => q.answered).length}</Label>
          <Label variant="soft" color="warning" sx={{ py: 1.5, px: 2 }}>En attente: {questions.filter(q => !q.answered).length}</Label>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#F8F9FA' } }}>
              <TableCell sx={{ fontWeight: 600 }}>Participant</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Question</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Heure</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
              <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuestions.map((question) => (
              <TableRow key={question.id} hover>
                <TableCell>{question.participant}</TableCell>
                <TableCell>{question.question}</TableCell>
                <TableCell>{question.date}</TableCell>
                <TableCell>{question.time}</TableCell>
                <TableCell><Label color={question.answered ? 'success' : 'warning'}>{question.answered ? 'Répondu' : 'En attente'}</Label></TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  {question.answered ? (
                    <Tooltip title="Voir détails">
                      <IconButton size="small" onClick={() => handleViewQuestion(question.id)}>
                        <Iconify icon="solar:eye-bold" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Button size="small" variant="contained" onClick={() => handleViewQuestion(question.id)}>Répondre</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}