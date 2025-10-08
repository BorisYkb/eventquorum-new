// File: src/sections/gestionEnquete/AddQuestionToEnquete.tsx

import React, { useState } from 'react';
import {
  Box,
  Card,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  Switch,
  Grid,
  Collapse,
  IconButton
} from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { CurrentQuestion, Question, QUESTION_TYPES } from 'src/app/organisateur/gestionenquete/nouveau/types';

// Import des composants pour chaque type de question
import ListeDeroulanteQuestion from './QuestionTypeComponents/ListeDeroulanteQuestion';
import CaseACocherQuestion from './QuestionTypeComponents/CaseACocherQuestion';
import QuestionLibreQuestion from './QuestionTypeComponents/QuestionLibreQuestion';
import EchelleLineaireQuestion from './QuestionTypeComponents/EchelleLineaireQuestion';
import ChoixMultipleQuestion from './QuestionTypeComponents/ChoixMultipleQuestion';

interface AddQuestionToEnqueteProps {
  /**
   * ID de l'enquête courante (pas besoin de sélecteur)
   */
  enqueteId: number;
  
  /**
   * Callback appelé quand une question est ajoutée
   */
  onQuestionAdded: (question: Omit<Question, 'id'>) => void;
}

/**
 * Composant pour ajouter une question à l'enquête courante
 * Version simplifiée sans sélecteur d'enquête
 */
const AddQuestionToEnquete: React.FC<AddQuestionToEnqueteProps> = ({
  enqueteId,
  onQuestionAdded
}) => {
  // État pour l'expansion/collapse du formulaire
  const [expanded, setExpanded] = useState(false);

  // État de la question en cours de création
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({
    question: '',
    type: 'choix_multiple',
    reponses: [''],
    enqueteId: enqueteId, // ✅ Utilise l'ID de l'enquête courante
    nombrePoints: 0,
    bonneReponse: 0,
    required: false,
    echelleMin: 1,
    echelleMax: 10,
    labelMin: '',
    labelMax: ''
  });

  /**
   * Gestionnaire de changement des propriétés de la question
   */
  const handleQuestionChange = (field: string, value: any) => {
    setCurrentQuestion(prev => {
      const updated = { ...prev, [field]: value };

      // Réinitialiser les réponses lors du changement de type
      if (field === 'type') {
        if (value === 'question_libre') {
          updated.reponses = [];
          updated.nombrePoints = 0; // Pas de points pour question libre
        } else if (value === 'echelle_lineaire') {
          updated.reponses = [];
          updated.nombrePoints = 0; // Pas de points pour échelle linéaire
        } else if (updated.reponses.length === 0) {
          updated.reponses = [''];
        }
        updated.bonneReponse = 0;
      }

      return updated;
    });
  };

  /**
   * Ajouter une réponse
   */
  const handleAddReponse = () => {
    setCurrentQuestion(prev => ({
      ...prev,
      reponses: [...prev.reponses, '']
    }));
  };

  /**
   * Supprimer une réponse
   */
  const handleRemoveReponse = (index: number) => {
    setCurrentQuestion(prev => ({
      ...prev,
      reponses: prev.reponses.filter((_, i) => i !== index),
      bonneReponse: prev.bonneReponse >= index ? Math.max(0, prev.bonneReponse - 1) : prev.bonneReponse
    }));
  };

  /**
   * Modifier une réponse
   */
  const handleReponseChange = (index: number, value: string) => {
    setCurrentQuestion(prev => ({
      ...prev,
      reponses: prev.reponses.map((rep, i) => i === index ? value : rep)
    }));
  };

  /**
   * Validation et ajout de la question
   */
  const handleAddQuestion = () => {
    // Validation de la question
    if (!currentQuestion.question.trim()) {
      alert('Veuillez saisir une question.');
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

    // Créer la question sans l'ID (sera ajouté par le parent)
    const newQuestion: Omit<Question, 'id'> = {
      question: currentQuestion.question,
      type: currentQuestion.type,
      reponses: currentQuestion.reponses.filter(rep => rep.trim()),
      enqueteId: enqueteId, // Utilise l'ID de l'enquête courante
      nombrePoints: currentQuestion.nombrePoints,
      bonneReponse: currentQuestion.bonneReponse,
      required: currentQuestion.required,
      // Propriétés pour échelle linéaire
      ...(currentQuestion.type === 'echelle_lineaire' && {
        echelleMin: currentQuestion.echelleMin,
        echelleMax: currentQuestion.echelleMax,
        labelMin: currentQuestion.labelMin,
        labelMax: currentQuestion.labelMax
      })
    };

    // Appel du callback
    onQuestionAdded(newQuestion);

    // Réinitialisation du formulaire
    setCurrentQuestion({
      question: '',
      type: 'choix_multiple',
      reponses: [''],
      enqueteId: enqueteId,
      nombrePoints: 0,
      bonneReponse: 0,
      required: false,
      echelleMin: 1,
      echelleMax: 10,
      labelMin: '',
      labelMax: ''
    });

    // Optionnel : fermer le formulaire après ajout
    // setExpanded(false);
  };

  /**
   * Rendu du composant spécifique au type de question
   */
  const renderQuestionTypeComponent = () => {
    const props = {
      currentQuestion,
      onQuestionChange: handleQuestionChange,
      onAddReponse: handleAddReponse,
      onRemoveReponse: handleRemoveReponse,
      onReponseChange: handleReponseChange
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

  return (
    <Card sx={{
      mb: 4,
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0',
      overflow: 'hidden'
    }}>
      {/* En-tête cliquable pour expand/collapse */}
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: expanded ? '#f8f9fa' : 'white',
          borderBottom: expanded ? '1px solid #e0e0e0' : 'none',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: '#f8f9fa'
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Iconify 
            icon="solar:add-circle-bold" 
            width={24} 
            sx={{ color: '#2e7d32' }} 
          />
          <Typography variant="h6" sx={{
            fontWeight: 600,
            color: '#333',
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
          }}>
            Ajouter une question
          </Typography>
        </Box>
        
        <IconButton
          size="small"
          sx={{
            transition: 'transform 0.2s ease',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          <Iconify icon="solar:alt-arrow-down-bold" width={20} />
        </IconButton>
      </Box>

      {/* Formulaire d'ajout (collapse) */}
      <Collapse in={expanded}>
        <Box sx={{ p: 4 }}>
          <Grid container spacing={4}>
            {/* Colonne gauche - Question et réponses */}
            <Grid item xs={12} md={6}>
              {/* Champ Question */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{
                  mb: 1.5,
                  fontWeight: 600,
                  color: '#555'
                }}>
                  Question *
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Saisissez votre question..."
                  value={currentQuestion.question}
                  onChange={(e) => handleQuestionChange('question', e.target.value)}
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
                    Type de question *
                  </Typography>
                  <FormControl fullWidth>
                    <Select
                      value={currentQuestion.type}
                      onChange={(e) => handleQuestionChange('type', e.target.value)}
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

                {/* Nombre de points - Masqué pour question libre et échelle linéaire */}
                {!['question_libre', 'echelle_lineaire'].includes(currentQuestion.type) && (
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
                      onChange={(e) => handleQuestionChange('nombrePoints', parseInt(e.target.value) || 0)}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '8px',
                          backgroundColor: '#fafafa'
                        }
                      }}
                    />
                  </Box>
                )}

                {/* Question obligatoire */}
                <FormControlLabel
                  control={
                    <Switch
                      checked={currentQuestion.required}
                      onChange={(e) => handleQuestionChange('required', e.target.checked)}
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

          {/* Boutons d'actions */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: 2,
            mt: 4,
            pt: 3,
            borderTop: '1px solid #e0e0e0'
          }}>
            <Button
              variant="outlined"
              onClick={() => {
                setExpanded(false);
                // Réinitialiser le formulaire
                setCurrentQuestion({
                  question: '',
                  type: 'choix_multiple',
                  reponses: [''],
                  enqueteId: enqueteId,
                  nombrePoints: 0,
                  bonneReponse: 0,
                  required: false,
                  echelleMin: 1,
                  echelleMax: 10,
                  labelMin: '',
                  labelMax: ''
                });
              }}
              sx={{
                px: 3,
                py: 1,
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                borderColor: '#ccc',
                color: '#666',
                '&:hover': {
                  borderColor: '#999',
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              Annuler
            </Button>

            <Button
              variant="contained"
              onClick={handleAddQuestion}
              disabled={!currentQuestion.question.trim()}
              startIcon={<Iconify icon="solar:add-circle-bold" />}
              sx={{
                bgcolor: '#2e7d32',
                px: 3,
                py: 1,
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#1b5e20',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(46,125,50,0.3)'
                },
                '&:disabled': {
                  bgcolor: '#ccc',
                  color: '#999'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Ajouter la question
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Card>
  );
};

export default AddQuestionToEnquete;