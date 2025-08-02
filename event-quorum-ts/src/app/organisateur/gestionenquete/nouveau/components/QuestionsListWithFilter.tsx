// File: src/app/organisateur/gestionenquetes/nouveau/components/QuestionsListWithFilter.tsx

import React, { useState, useMemo } from 'react';
import {
  Box,
  Card,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  Tooltip
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { Question, Enquete, QUESTION_TYPES } from '../types';

interface QuestionsListWithFilterProps {
  questions: Question[];
  enquetes: Enquete[];
  onEditQuestion: (questionId: number) => void;
  onDeleteQuestion: (questionId: number) => void;
  onViewQuestion: (questionId: number) => void;
}

/**
 * Composant pour afficher la liste des questions avec filtre par enquête
 * Partie 3 de la page de création
 */
const QuestionsListWithFilter: React.FC<QuestionsListWithFilterProps> = ({
  questions,
  enquetes,
  onEditQuestion,
  onDeleteQuestion,
  onViewQuestion
}) => {
  // État pour le filtre d'enquête sélectionnée
  const [selectedEnqueteId, setSelectedEnqueteId] = useState<number>(0);

  /**
   * Questions filtrées selon l'enquête sélectionnée
   */
  const filteredQuestions = useMemo(() => {
    if (selectedEnqueteId === 0) {
      return questions; // Toutes les questions
    }
    return questions.filter(q => q.enqueteId === selectedEnqueteId);
  }, [questions, selectedEnqueteId]);

  /**
   * Obtient le label d'un type de question
   */
  const getTypeQuestionLabel = (type: string) => {
    return QUESTION_TYPES.find(t => t.value === type)?.label || type;
  };

  /**
   * Obtient le nom d'une enquête par son ID
   */
  const getEnqueteName = (enqueteId: number) => {
    const enquete = enquetes.find(e => e.id === enqueteId);
    return enquete ? enquete.titre : `Enquête ${enqueteId}`;
  };

  if (questions.length === 0) {
    return (
      <Card sx={{
        p: 4,
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        border: '1px solid #f0f0f0'
      }}>
        <Typography variant="h6" sx={{
          mb: 3,
          fontWeight: 600,
          color: '#333',
          fontSize: '1.2rem'
        }}>
          Liste des questions
        </Typography>
        
        <Box sx={{
          textAlign: 'center',
          py: 4,
          color: '#666'
        }}>
          <Typography variant="body1">
            Aucune question n'a été créée pour le moment.
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Ajoutez votre première question en utilisant le formulaire ci-dessus.
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Card sx={{
      p: 4,
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0'
    }}>
      {/* En-tête avec titre et filtre */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Typography variant="h6" sx={{
          fontWeight: 600,
          color: '#333',
          fontSize: '1.2rem'
        }}>
          Liste des questions
        </Typography>

        {/* Filtre par enquête */}
        <Box sx={{ minWidth: 200 }}>
          <Typography variant="caption" sx={{
            mb: 1,
            display: 'block',
            color: '#666',
            fontWeight: 500
          }}>
            Sélectionner l'enquête concernée *
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={selectedEnqueteId}
              onChange={(e) => setSelectedEnqueteId(Number(e.target.value))}
              sx={{
                borderRadius: '8px',
                backgroundColor: '#fafafa'
              }}
            >
              <MenuItem value={0}>Toutes les enquêtes</MenuItem>
              {enquetes.map((enquete) => (
                <MenuItem key={enquete.id} value={enquete.id}>
                  {enquete.titre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Tableau des questions */}
      <Card sx={{
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <TableContainer>
          <Table>
            {/* En-tête du tableau */}
            <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
              <TableRow>
                <TableCell sx={{
                  fontWeight: 600,
                  color: '#555',
                  width: '60px',
                  textAlign: 'center'
                }}>
                  
                </TableCell>
                <TableCell sx={{
                  fontWeight: 600,
                  color: '#555'
                }}>
                  Question
                </TableCell>
                <TableCell align="center" sx={{
                  fontWeight: 600,
                  color: '#555',
                  width: '120px'
                }}>
                  Option
                </TableCell>
              </TableRow>
            </TableHead>

            {/* Corps du tableau */}
            <TableBody>
              {filteredQuestions.map((question, index) => (
                <TableRow key={question.id} hover>
                  {/* Numéro de la question */}
                  <TableCell align="center">
                    <Typography variant="body2" sx={{
                      fontWeight: 600,
                      color: '#666'
                    }}>
                      {index + 1}
                    </Typography>
                  </TableCell>

                  {/* Contenu de la question */}
                  {/* Contenu de la question */}
                  <TableCell>
                    <Typography variant="body2" sx={{
                      color: '#333',
                      fontWeight: 500,
                      mb: 1,
                      lineHeight: 1.4
                    }}>
                      {question.question}
                    </Typography>
                    <Typography variant="caption" sx={{
                      color: '#666',
                      fontSize: '0.75rem',
                      display: 'block'
                    }}>
                      <strong>Type:</strong> {getTypeQuestionLabel(question.type)} •{' '}
                      <strong>Enquête:</strong> {getEnqueteName(question.enqueteId)} •{' '}
                      {/* Points - Affichés seulement pour certains types */}
                      {!['question_libre', 'echelle_lineaire'].includes(question.type) && (
                        <>
                          <strong>Points:</strong> {question.nombrePoints} •{' '}
                        </>
                      )}
                      {question.required ? 'Obligatoire' : 'Facultative'}
                    </Typography>
                  </TableCell>

                  {/* Boutons d'actions */}
                  <TableCell align="center">
                    <Box sx={{
                      display: 'flex',
                      gap: 0.5,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      {/* Bouton Modifier */}
                      <Tooltip title="Modifier" placement="top" arrow>
                        <IconButton
                          color="warning"
                          onClick={() => onEditQuestion(question.id)}
                          size="small"
                          sx={{
                            width: 32,
                            height: 32,
                            '&:hover': {
                              bgcolor: 'rgba(255, 152, 0, 0.08)'
                            }
                          }}
                        >
                          <Iconify icon="solar:pen-new-square-linear" width={15} />
                        </IconButton>
                      </Tooltip>

                      {/* Bouton Voir détails */}
                      <Tooltip title="Voir détails" placement="top" arrow>
                        <IconButton
                          color="info"
                          onClick={() => onViewQuestion(question.id)}
                          size="small"
                          sx={{
                            width: 32,
                            height: 32,
                            '&:hover': {
                              bgcolor: 'rgba(33, 150, 243, 0.08)'
                            }
                          }}
                        >
                          <Iconify icon="solar:eye-bold" width={16} />
                        </IconButton>
                      </Tooltip>

                      {/* Bouton Supprimer */}
                      <Tooltip title="Supprimer" placement="top" arrow>
                        <IconButton
                          color="error"
                          onClick={() => onDeleteQuestion(question.id)}
                          size="small"
                          sx={{
                            width: 32,
                            height: 32,
                            '&:hover': {
                              bgcolor: 'rgba(244, 67, 54, 0.08)'
                            }
                          }}
                        >
                          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Footer avec informations */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#f8f9fa'
        }}>
          <Typography variant="caption" sx={{ color: '#999' }}>
            Total: {questions.length} question(s)
          </Typography>
        </Box>
      </Card>
    </Card>
  );
};

export default QuestionsListWithFilter;