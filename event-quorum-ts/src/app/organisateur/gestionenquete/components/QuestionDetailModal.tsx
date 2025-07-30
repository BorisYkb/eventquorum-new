// File: src/app/organisateur/gestionenquetes/components/QuestionDetailModal.tsx

'use client'

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Radio from '@mui/material/Radio';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';

// Interface pour la question
interface Question {
  id: number;
  question: string;
  type: 'choix_multiple' | 'echelle_appreciation' | 'zone_saisie' | 'choix_unique' | 'liste_deroulante' | 'note_etoile';
  reponses: string[];
  enqueteConcernee: string;
  nombrePoints: number;
  bonneReponse: number;
  required: boolean;
}

interface QuestionDetailModalProps {
  open: boolean;
  onClose: () => void;
  question: Question | null;
  getTypeQuestionLabel: (type: string) => string;
}

const QuestionDetailModal: React.FC<QuestionDetailModalProps> = ({
  open,
  onClose,
  question,
  getTypeQuestionLabel
}) => {
  const theme = useTheme();

  if (!question) return null;

  const getTypeColor = (type: string): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'info' => {
    switch (type) {
      case 'choix_multiple':
        return 'primary';
      case 'choix_unique':
        return 'secondary';
      case 'echelle_appreciation':
        return 'success';
      case 'zone_saisie':
        return 'warning';
      case 'liste_deroulante':
        return 'info';
      case 'note_etoile':
        return 'primary';
      default:
        return 'default';
    }
  };

  const formatPoints = (points: number) => {
    return points === 1 ? `${points} point` : `${points} points`;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
        }
      }}
    >
      <DialogTitle sx={{
        pb: 2,
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
            Détails de la question
          </Typography>
          <Chip
            label={getTypeQuestionLabel(question.type)}
            color={getTypeColor(question.type)}
            size="small"
            sx={{ fontWeight: 500 }}
          />
        </Box>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Question principale */}
          <Box>
            <Typography variant="subtitle2" sx={{
              mb: 1,
              fontWeight: 600,
              color: '#555',
              fontSize: '0.875rem'
            }}>
              Question
            </Typography>
            <Box sx={{
              p: 2,
              bgcolor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef'
            }}>
              <Typography variant="body1" sx={{
                color: '#333',
                lineHeight: 1.6,
                fontSize: '1rem'
              }}>
                {question.question}
              </Typography>
            </Box>
          </Box>

          {/* Informations générales */}
          <Box>
            <Typography variant="subtitle2" sx={{
              mb: 2,
              fontWeight: 600,
              color: '#555',
              fontSize: '0.875rem'
            }}>
              Informations générales
            </Typography>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2
            }}>
              <Box sx={{
                p: 2,
                bgcolor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                  Type de question
                </Typography>
                <Typography variant="body2" sx={{
                  fontWeight: 500,
                  color: '#333',
                  mt: 0.5
                }}>
                  {getTypeQuestionLabel(question.type)}
                </Typography>
              </Box>

              <Box sx={{
                p: 2,
                bgcolor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                  Statut
                </Typography>
                <Box sx={{ mt: 0.5 }}>
                  <Chip
                    label={question.required ? 'Obligatoire' : 'Facultative'}
                    color={question.required ? 'error' : 'default'}
                    size="small"
                    sx={{ fontSize: '0.75rem' }}
                  />
                </Box>
              </Box>

              <Box sx={{
                p: 2,
                bgcolor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                  Points attribués
                </Typography>
                <Typography variant="body2" sx={{
                  fontWeight: 500,
                  color: '#333',
                  mt: 0.5
                }}>
                  {formatPoints(question.nombrePoints)}
                </Typography>
              </Box>

              {question.enqueteConcernee && (
                <Box sx={{
                  p: 2,
                  bgcolor: '#f8f9fa',
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}>
                  <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                    Enquête concernée
                  </Typography>
                  <Typography variant="body2" sx={{
                    fontWeight: 500,
                    color: '#333',
                    mt: 0.5
                  }}>
                    {question.enqueteConcernee}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* Réponses possibles */}
          {question.reponses && question.reponses.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{
                mb: 2,
                fontWeight: 600,
                color: '#555',
                fontSize: '0.875rem'
              }}>
                Réponses possibles
              </Typography>
              <Box sx={{
                border: '1px solid #e9ecef',
                borderRadius: '8px',
                bgcolor: '#fff'
              }}>
                <List sx={{ py: 0 }}>
                  {question.reponses.map((reponse, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{
                        py: 2,
                        bgcolor: question.bonneReponse === index ? '#e8f5e8' : 'transparent'
                      }}>
                        <ListItemIcon sx={{ minWidth: 40 }}>
                          {question.bonneReponse === index ? (
                            <CheckCircleIcon color="success" sx={{ fontSize: 20 }} />
                          ) : (
                            <Radio
                              size="small"
                              sx={{ p: 0.5 }}
                              disabled
                            />
                          )}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Typography variant="body2" sx={{
                                fontWeight: question.bonneReponse === index ? 600 : 400,
                                color: question.bonneReponse === index ? '#2e7d32' : '#333'
                              }}>
                                {index + 1}. {reponse}
                              </Typography>
                              {question.bonneReponse === index && (
                                <Chip
                                  label="Bonne réponse"
                                  color="success"
                                  size="small"
                                  sx={{
                                    fontSize: '0.7rem',
                                    height: 20
                                  }}
                                />
                              )}
                            </Box>
                          }
                        />
                      </ListItem>
                      {index < question.reponses.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{
        px: 3,
        py: 2,
        borderTop: '1px solid #e0e0e0'
      }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            bgcolor: '#1976d2',
            px: 3,
            py: 1,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              bgcolor: '#1565c0',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(25,118,210,0.3)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionDetailModal;
