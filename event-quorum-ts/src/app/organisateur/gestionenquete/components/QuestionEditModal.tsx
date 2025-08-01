// File: src/app/organisateur/gestionenquetes/components/QuestionEditModal.tsx

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Switch,
  IconButton,
  Grid
} from '@mui/material';
import { Iconify } from 'src/components/iconify';

// Import des types
import { CurrentQuestion, Question, QUESTION_TYPES } from '../nouveau/types';

// Import des composants dynamiques pour chaque type
import ListeDeroulanteQuestion from '../nouveau/components/QuestionTypeComponents/ListeDeroulanteQuestion';
import CaseACocherQuestion from '../nouveau/components/QuestionTypeComponents/CaseACocherQuestion';
import QuestionLibreQuestion from '../nouveau/components/QuestionTypeComponents/QuestionLibreQuestion';
import EchelleLineaireQuestion from '../nouveau/components/QuestionTypeComponents/EchelleLineaireQuestion';
import ChoixMultipleQuestion from '../nouveau/components/QuestionTypeComponents/ChoixMultipleQuestion';

interface QuestionEditModalProps {
  open: boolean;
  onClose: () => void;
  question: Question | null;
  currentQuestion: CurrentQuestion;
  enquetes: { id: number; titre: string; }[]; // Liste des enquêtes disponibles
  onQuestionChange: (field: string, value: any) => void;
  onAddReponse: () => void;
  onRemoveReponse: (index: number) => void;
  onReponseChange: (index: number, value: string) => void;
  onSave: () => void;
}

/**
 * Modal de modification de question - Version dynamique
 * Affiche différents composants selon le type de question sélectionné
 */
const QuestionEditModal: React.FC<QuestionEditModalProps> = ({
  open,
  onClose,
  question,
  currentQuestion,
  enquetes,
  onQuestionChange,
  onAddReponse,
  onRemoveReponse,
  onReponseChange,
  onSave
}) => {

  /**
   * Validation et sauvegarde
   */
  const handleSave = () => {
    if (!currentQuestion.question.trim()) {
      alert('Veuillez saisir une question.');
      return;
    }

    if (!currentQuestion.enqueteId) {
      alert('Veuillez sélectionner une enquête.');
      return;
    }

    // Validation spécifique selon le type
    if (['liste_deroulante', 'case_a_cocher', 'choix_multiple'].includes(currentQuestion.type)) {
      const validReponses = currentQuestion.reponses.filter(r => r.trim());
      if (validReponses.length < 2) {
        alert('Veuillez saisir au moins 2 réponses.');
        return;
      }
    }

    onSave();
  };

  /**
   * Rendu du composant spécifique au type de question
   */
  const renderQuestionTypeComponent = () => {
    const props = {
      currentQuestion,
      onQuestionChange,
      onAddReponse,
      onRemoveReponse,
      onReponseChange
    };

    switch (currentQuestion.type) {
      case 'liste_deroulante':
        return <ListeDeroulanteQuestion {...props} />;
      case 'case_a_cocher':
        return <CaseACocherQuestion {...props} />;
      case 'question_libre':
        return <QuestionLibreQuestion {...props} />;
      case 'echelle_lineaire':
        return <EchelleLineaireQuestion {...props} />;
      case 'choix_multiple':
        return <ChoixMultipleQuestion {...props} />;
      default:
        return null;
    }
  };

  /**
   * Gestion du changement de type de question
   */
  const handleTypeChange = (newType: string) => {
    onQuestionChange('type', newType);
    
    // Réinitialiser les réponses selon le nouveau type
    if (newType === 'question_libre') {
      onQuestionChange('reponses', []);
    } else if (newType === 'echelle_lineaire') {
      onQuestionChange('reponses', []);
      // Réinitialiser les propriétés de l'échelle si nécessaire
      if (!currentQuestion.echelleMin) onQuestionChange('echelleMin', 1);
      if (!currentQuestion.echelleMax) onQuestionChange('echelleMax', 10);
    } else if (currentQuestion.reponses.length === 0) {
      onQuestionChange('reponses', ['']);
    }
    
    // Réinitialiser la bonne réponse
    onQuestionChange('bonneReponse', 0);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          maxHeight: '90vh'
        }
      }}
    >
      {/* En-tête */}
      <DialogTitle sx={{
        pb: 2,
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
          Modifier la question N°{question?.id || ''}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Iconify icon="eva:close-fill" width={24} />
        </IconButton>
      </DialogTitle>

      {/* Contenu */}
      <DialogContent sx={{ p: 4 }}>
        <Grid container spacing={4}>
          {/* Colonne gauche - Question et réponses dynamiques */}
          <Grid item xs={12} md={6}>
            {/* Champ Question */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{
                mb: 1.5,
                fontWeight: 600,
                color: '#555'
              }}>
                Question
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Saisissez votre question..."
                value={currentQuestion.question}
                onChange={(e) => onQuestionChange('question', e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: '#fafafa'
                  }
                }}
              />
            </Box>

            {/* Composant dynamique selon le type de question */}
            {renderQuestionTypeComponent()}
          </Grid>

          {/* Colonne droite - Paramètres */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Type de question */}
              <Box>
                <Typography variant="subtitle2" sx={{
                  mb: 1.5,
                  fontWeight: 600,
                  color: '#555'
                }}>
                  Type de question
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={currentQuestion.type}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    sx={{
                      borderRadius: '8px',
                      backgroundColor: '#fafafa'
                    }}
                  >
                    {QUESTION_TYPES.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Section "Choisir la bonne réponse" - Affichée selon le type */}
              {['liste_deroulante', 'case_a_cocher', 'choix_multiple'].includes(currentQuestion.type) && (
                <Box>
                  <Typography variant="subtitle2" sx={{
                    mb: 1.5,
                    fontWeight: 600,
                    color: '#555'
                  }}>
                    Choisir la bonne réponse
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={currentQuestion.bonneReponse}
                      onChange={(e) => onQuestionChange('bonneReponse', e.target.value)}
                      sx={{
                        borderRadius: '8px',
                        backgroundColor: '#fafafa'
                      }}
                    >
                      {currentQuestion.reponses.map((reponse, index) => (
                        <MenuItem key={index} value={index}>
                          Réponse {index + 1}
                          {reponse && ` - ${reponse.substring(0, 20)}${reponse.length > 20 ? '...' : ''}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}

              {/* Nombre de points */}
              <Box>
                <Typography variant="subtitle2" sx={{
                  mb: 1.5,
                  fontWeight: 600,
                  color: '#555'
                }}>
                  Entrer le nombre de points
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="0"
                  value={currentQuestion.nombrePoints}
                  onChange={(e) => onQuestionChange('nombrePoints', parseInt(e.target.value) || 0)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                      backgroundColor: '#fafafa'
                    }
                  }}
                />
              </Box>

              {/* Sélection d'enquête */}
              <Box>
                <Typography variant="subtitle2" sx={{
                  mb: 1.5,
                  fontWeight: 600,
                  color: '#555'
                }}>
                  *Sélectionner l'enquête concernée
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={currentQuestion.enqueteId}
                    onChange={(e) => onQuestionChange('enqueteId', e.target.value)}
                    displayEmpty
                    sx={{
                      borderRadius: '8px',
                      backgroundColor: '#fafafa'
                    }}
                  >
                    <MenuItem value={0}>
                      <em>Sélectionner une enquête</em>
                    </MenuItem>
                    {enquetes.map((enquete) => (
                      <MenuItem key={enquete.id} value={enquete.id}>
                        {enquete.titre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Question obligatoire */}
              <FormControlLabel
                control={
                  <Switch
                    checked={currentQuestion.required}
                    onChange={(e) => onQuestionChange('required', e.target.checked)}
                  />
                }
                label="Question obligatoire"
                sx={{
                  '& .MuiFormControlLabel-label': {
                    fontWeight: 500,
                    color: '#555'
                  }
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{
        p: 3,
        borderTop: '1px solid #e0e0e0',
        display: 'flex',
        gap: 2,
        justifyContent: 'flex-end'
      }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            minWidth: 100,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            bgcolor: '#f44336',
            color: 'white',
            '&:hover': {
              bgcolor: '#d32f2f'
            }
          }}
        >
          Annuler
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!currentQuestion.question.trim() || !currentQuestion.enqueteId}
          sx={{
            minWidth: 140,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            bgcolor: '#ff9800',
            color: 'white',
            '&:hover': {
              bgcolor: '#f57c00'
            },
            '&:disabled': {
              bgcolor: '#ccc',
              color: '#999'
            }
          }}
        >
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionEditModal;