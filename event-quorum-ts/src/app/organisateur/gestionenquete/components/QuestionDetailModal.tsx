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
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTheme } from '@mui/material/styles';
import { Iconify } from 'src/components/iconify';

// Import des types mis à jour
import { Question } from '../nouveau/types';

interface QuestionDetailModalProps {
  open: boolean;
  onClose: () => void;
  question: Question | null;
  getTypeQuestionLabel: (type: string) => string;
}

/**
 * Modal de détail d'une question - Version adaptée
 * Affiche les informations complètes d'une question selon son type
 */
const QuestionDetailModal: React.FC<QuestionDetailModalProps> = ({
  open,
  onClose,
  question,
  getTypeQuestionLabel
}) => {
  const theme = useTheme();

  if (!question) return null;

  /**
   * Couleurs selon le type de question
   */
  const getTypeColor = (type: string): 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'info' => {
    switch (type) {
      case 'choix_multiple':
        return 'primary';
      case 'liste_deroulante':
        return 'secondary';
      case 'echelle_lineaire':
        return 'success';
      case 'question_libre':
        return 'warning';
      case 'case_a_cocher':
        return 'info';
      default:
        return 'default';
    }
  };

  /**
 * Obtient l'activité associée à l'enquête
 */
  const getEnqueteActivity = (enqueteId: number) => {
    // TODO: Récupérer la vraie activité depuis la liste des enquêtes
    // Pour l'instant, on utilise des données d'exemple
    const activities = {
      1: "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
      2: "PANEL DE HAUT NIVEAU",
      3: "POINT DE PRESSE"
    };
    return activities[enqueteId as keyof typeof activities] || "Activité non définie";
  };

  /**
   * Formatage des points
   */
  const formatPoints = (points: number) => {
    return points === 1 ? `${points} point` : `${points} points`;
  };

  /**
   * Rendu spécifique selon le type de question
   */
  const renderQuestionTypeContent = () => {
    switch (question.type) {
      case 'question_libre':
        return (
          <Box sx={{
            p: 3,
            bgcolor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px dashed #ddd',
            textAlign: 'center'
          }}>
            <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
              Question libre - Les participants peuvent saisir leur réponse librement
            </Typography>
          </Box>
        );

      case 'echelle_lineaire':
        return (
          <Box sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' }, // Colonne sur mobile, ligne sur desktop
            gap: 5,
            mb: 2
          }}>
            {/* Configuration de l'échelle */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                Configuration de l'échelle
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 1, alignItems: 'center' }}>
                <Chip
                  label={`${question.echelleMin || 1} - ${question.echelleMax || 10}`}
                  color="primary"
                  size="small"
                />
              </Box>
            </Box>

            {/* Aperçu de l'échelle */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                Aperçu de l'échelle
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                mt: 1,
                flexWrap: 'wrap'
              }}>
                {Array.from({ length: (question.echelleMax || 10) - (question.echelleMin || 1) + 1 }, (_, i) => (
                  <Box
                    key={i}
                    sx={{
                      minWidth: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #e0e0e0',
                      borderRadius: '6px',
                      backgroundColor: '#fafafa',
                      fontWeight: 600,
                      fontSize: '14px'
                    }}
                  >
                    {(question.echelleMin || 1) + i}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Labels des extrémités
            {(question.labelMin || question.labelMax) && (
              <Box>
                <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                  Labels des extrémités
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  {question.labelMin && (
                    <Typography variant="body2" sx={{ color: '#333' }}>
                      {question.echelleMin || 1}: {question.labelMin}
                    </Typography>
                  )}
                  {question.labelMax && (
                    <Typography variant="body2" sx={{ color: '#333' }}>
                      {question.echelleMax || 10}: {question.labelMax}
                    </Typography>
                  )}
                </Box>
              </Box>
            )} */}
          </Box>
        );

      case 'liste_deroulante':
      case 'choix_multiple':
      case 'case_a_cocher':
        if (!question.reponses || question.reponses.length === 0) {
          return (
            <Box sx={{
              p: 3,
              bgcolor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e9ecef',
              textAlign: 'center'
            }}>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Aucune réponse définie pour cette question
              </Typography>
            </Box>
          );
        }

        return (
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
                      ) : question.type === 'case_a_cocher' ? (
                        <Checkbox size="small" sx={{ p: 0.5 }} disabled />
                      ) : (
                        <Radio size="small" sx={{ p: 0.5 }} disabled />
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
        );

      default:
        return null;
    }
  };

  /**
   * Obtient le nom de l'enquête par son ID
   */
  const getEnqueteName = (enqueteId: number) => {
    // TODO: Récupérer le vrai nom depuis la liste des enquêtes
    return `Enquête ${enqueteId}`;
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
      {/* En-tête */}
      <DialogTitle sx={{
        pb: 2,
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
            Détails de la question N°{question.id}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label={getTypeQuestionLabel(question.type)}
              color={getTypeColor(question.type)}
              size="small"
              sx={{ fontWeight: 500 }}
            />
            <IconButton onClick={onClose} size="small">
              <Iconify icon="eva:close-fill" width={20} />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>

      {/* Contenu */}
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
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
              },
              gap: 2
            }}>
              {/* Type de question */}
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

              {/* Statut */}
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

              {/* Points attribués - Masqué pour question libre et échelle linéaire */}
              {!['question_libre', 'echelle_lineaire'].includes(question.type) && (
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
              )}

              {/* Enquête associée */}
              <Box sx={{
                p: 2,
                bgcolor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                  Enquête associée
                </Typography>
                <Typography variant="body2" sx={{
                  fontWeight: 500,
                  color: '#333',
                  mt: 0.5
                }}>
                  {getEnqueteName(question.enqueteId)}
                </Typography>
              </Box>

              {/* Activité concernée */}
              <Box sx={{
                p: 2,
                bgcolor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                  Activité concernée
                </Typography>
                <Typography variant="body2" sx={{
                  fontWeight: 500,
                  color: '#333',
                  mt: 0.5
                }}>
                  {getEnqueteActivity(question.enqueteId)}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Contenu spécifique selon le type de question */}
          <Box>
            <Typography variant="subtitle2" sx={{
              mb: 2,
              fontWeight: 600,
              color: '#555',
              fontSize: '0.875rem'
            }}>
              {question.type === 'question_libre' ? 'Type de réponse' : 
               question.type === 'echelle_lineaire' ? 'Configuration de l\'échelle' : 
               'Réponses possibles'}
            </Typography>
            {renderQuestionTypeContent()}
          </Box>
        </Box>
      </DialogContent>

      {/* Actions */}
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