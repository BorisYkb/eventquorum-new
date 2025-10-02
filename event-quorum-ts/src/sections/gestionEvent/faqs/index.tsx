'use client';

import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
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
  
  // États pour les FAQs
  const [tempFaqs, setTempFaqs] = useState([]);
  const [savedFaqs, setSavedFaqs] = useState([]);

  // Fonction pour ajouter une FAQ temporaire
  const handleAddFaq = () => {
    if (question.trim() && answer.trim()) {
      const newFaq = {
        id: Date.now(),
        question: question.trim(),
        answer: answer.trim()
      };
      setTempFaqs([...tempFaqs, newFaq]);
      setQuestion('');
      setAnswer('');
    }
  };

  // Fonction pour supprimer une FAQ temporaire
  const handleDeleteTemp = (id) => {
    setTempFaqs(tempFaqs.filter((faq) => faq.id !== id));
  };

  // Fonction pour enregistrer toutes les FAQs temporaires
  const handleSave = () => {
    if (tempFaqs.length > 0) {
      setSavedFaqs([...savedFaqs, ...tempFaqs]);
      setTempFaqs([]);
      setQuestion('');
      setAnswer('');
    }
  };

  // Fonction pour annuler toutes les FAQs temporaires
  const handleCancel = () => {
    setTempFaqs([]);
    setQuestion('');
    setAnswer('');
  };

  // Fonction pour supprimer une FAQ enregistrée
  const handleDeleteSaved = (id) => {
    setSavedFaqs(savedFaqs.filter((faq) => faq.id !== id));
  };

  return (
    <Box sx={{ minHeight: '100vh',boxShadow: 3, borderRadius: 3, p: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937', mb: 4 }}>
          Gestion des FAQs
        </Typography>

        {/* Formulaire d'ajout */}
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937', mb: 3 }}>
            Ajouter une nouvelle question
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
            
            <Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddFaq}
                disabled={!question.trim() || !answer.trim()}
                sx={{ textTransform: 'none' }}
              >
                Ajouter la question
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Liste temporaire des FAQs */}
        {tempFaqs.length > 0 && (
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937', mb: 2 }}>
              Questions en cours d'édition ({tempFaqs.length})
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
              {tempFaqs.map((faq) => (
                <Paper 
                  key={faq.id}
                  variant="outlined"
                  sx={{ 
                    p: 2, 
                    bgcolor: '#eff6ff',
                    borderColor: '#bfdbfe'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontWeight: 600, color: '#1f2937', mb: 1 }}>
                        Q: {faq.question}
                      </Typography>
                      <Typography sx={{ color: '#4b5563' }}>
                        R: {faq.answer}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteTemp(faq.id)}
                      sx={{ 
                        color: '#dc2626',
                        '&:hover': { bgcolor: '#fee2e2' }
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Paper>
              ))}
            </Box>

            <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="success"
                startIcon={<SaveIcon />}
                onClick={handleSave}
                sx={{ textTransform: 'none' }}
              >
                Enregistrer
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CancelIcon />}
                onClick={handleCancel}
                sx={{ textTransform: 'none' }}
              >
                Annuler
              </Button>
            </Box>
          </Paper>
        )}

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
                    <TableCell align="center" sx={{ fontWeight: 600, color: '#374151', width: 100, py: 2 }}>
                      Action
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

        {savedFaqs.length === 0 && tempFaqs.length === 0 && (
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