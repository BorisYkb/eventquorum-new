'use client';

import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import {
    Box,
    Typography,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Button,
    TextField,
    IconButton,
} from '@mui/material';

export default function Faqs() {
  const theme = useTheme();

  // États pour le formulaire
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editingId, setEditingId] = useState(null);
  
  // État pour les FAQs
  const [savedFaqs, setSavedFaqs] = useState([]);

  // Fonction pour ajouter une FAQ directement
  const handleAddFaq = () => {
    if (question.trim() && answer.trim()) {
      const newFaq = {
        id: Date.now(),
        question: question.trim(),
        answer: answer.trim()
      };
      setSavedFaqs([...savedFaqs, newFaq]);
      setQuestion('');
      setAnswer('');
    }
  };

  // Fonction pour supprimer une FAQ
  const handleDeleteSaved = (id) => {
    setSavedFaqs(savedFaqs.filter((faq) => faq.id !== id));
  };

  // Fonction pour commencer la modification
  const handleEdit = (faq) => {
    setEditingId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
  };

  // Fonction pour enregistrer la modification
  const handleSaveEdit = () => {
    if (question.trim() && answer.trim()) {
      setSavedFaqs(savedFaqs.map(faq => 
        faq.id === editingId 
          ? { ...faq, question: question.trim(), answer: answer.trim() }
          : faq
      ));
      setEditingId(null);
      setQuestion('');
      setAnswer('');
    }
  };

  // Fonction pour annuler la modification
  const handleCancelEdit = () => {
    setEditingId(null);
    setQuestion('');
    setAnswer('');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f9fafb', p: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937', mb: 4 }}>
          Gestion des FAQs
        </Typography>

        {/* Formulaire d'ajout */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937', mb: 3 }}>
            {editingId ? 'Modifier la question' : 'Ajouter une nouvelle question'}
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Question"
              variant="outlined"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Entrez votre question..."
              size="small"
            />
            
            <TextField
              fullWidth
              label="Réponse"
              variant="outlined"
              multiline
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Entrez la réponse..."
            />
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              {editingId ? (
                <>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveEdit}
                    disabled={!question.trim() || !answer.trim()}
                    sx={{ textTransform: 'none' }}
                  >
                    Enregistrer
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={handleCancelEdit}
                    sx={{ textTransform: 'none' }}
                  >
                    Annuler
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleAddFaq}
                  disabled={!question.trim() || !answer.trim()}
                  sx={{ textTransform: 'none' }}
                >
                  Ajouter la question
                </Button>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Tableau des FAQs enregistrées */}
        {savedFaqs.length > 0 && (
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937', mb: 2 }}>
              FAQs Enregistrées ({savedFaqs.length})
            </Typography>
            
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow sx={{ bgcolor: '#f3f4f6' }}>
                    <TableCell sx={{ fontWeight: 600, color: '#374151', py: 2 }}>
                      Question
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: '#374151', py: 2 }}>
                      Réponse
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600, color: '#374151', width: 150, py: 2 }}>
                      Actions
                    </TableCell>
                  </TableRow>
                  {savedFaqs.map((faq, index) => (
                    <TableRow 
                      key={faq.id}
                      sx={{ 
                        '&:hover': { bgcolor: '#f9fafb' },
                        bgcolor: index % 2 === 0 ? 'white' : '#f9fafb'
                      }}
                    >
                      <TableCell sx={{ fontWeight: 500, color: '#1f2937', py: 2 }}>
                        {faq.question}
                      </TableCell>
                      <TableCell sx={{ color: '#4b5563', py: 2 }}>
                        {faq.answer}
                      </TableCell>
                      <TableCell align="center" sx={{ py: 2 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(faq)}
                          sx={{ 
                            color: '#2563eb',
                            '&:hover': { bgcolor: '#dbeafe' },
                            mr: 1
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteSaved(faq.id)}
                          sx={{ 
                            color: '#dc2626',
                            '&:hover': { bgcolor: '#fee2e2' }
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {savedFaqs.length === 0 && (
          <Paper elevation={2} sx={{ p: 8, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#6b7280', mb: 1 }}>
              Aucune FAQ enregistrée
            </Typography>
            <Typography sx={{ color: '#9ca3af' }}>
              Commencez par ajouter des questions et réponses ci-dessus
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
}