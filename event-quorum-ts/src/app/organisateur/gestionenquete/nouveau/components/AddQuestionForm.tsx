// File: src/app/organisateur/gestionenquetes/nouveau/components/AddQuestionForm.tsx

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
  Grid
} from '@mui/material';
import { CurrentQuestion, Enquete, Question, QUESTION_TYPES } from '../types';

// Import des composants pour chaque type de question
import ListeDeroulanteQuestion from 'src/sections/gestionEnquete/QuestionTypeComponents/ListeDeroulanteQuestion';
import CaseACocherQuestion from 'src/sections/gestionEnquete/QuestionTypeComponents/CaseACocherQuestion';
import QuestionLibreQuestion from 'src/sections/gestionEnquete/QuestionTypeComponents/QuestionLibreQuestion';
import EchelleLineaireQuestion from 'src/sections/gestionEnquete/QuestionTypeComponents/EchelleLineaireQuestion';
import ChoixMultipleQuestion from 'src/sections/gestionEnquete/QuestionTypeComponents/ChoixMultipleQuestion';

interface AddQuestionFormProps {
  enquetes: Enquete[];
  onQuestionAdded: (question: Omit<Question, 'id'>) => void;
}

/**
 * Composant pour ajouter des questions aux enquêtes
 * Partie 2 de la page de création
 */
const AddQuestionForm: React.FC<AddQuestionFormProps> = ({
  enquetes,
  onQuestionAdded
}) => {
  // État de la question en cours de création
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({
    question: '',
    type: 'liste_deroulante',
    reponses: [''],
    enqueteId: 0,
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
          updated.nombrePoints = 0; // ✅ Pas de points pour question libre
        } else if (value === 'echelle_lineaire') {
          updated.reponses = [];
          updated.nombrePoints = 0; // ✅ Pas de points pour échelle linéaire
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

    // Créer la question
    const newQuestion: Omit<Question, 'id'> = {
      question: currentQuestion.question,
      type: currentQuestion.type,
      reponses: currentQuestion.reponses.filter(rep => rep.trim()),
      enqueteId: currentQuestion.enqueteId,
      nombrePoints: currentQuestion.nombrePoints,
      bonneReponse: currentQuestion.bonneReponse,
      required: currentQuestion.required,
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
      type: 'liste_deroulante',
      reponses: [''],
      enqueteId: 0,
      nombrePoints: 0,
      bonneReponse: 0,
      required: false,
      echelleMin: 1,
      echelleMax: 10,
      labelMin: '',
      labelMax: ''
    });

    alert('Question ajoutée avec succès !');
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
      p: 4,
      mb: 4,
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0'
    }}>
      {/* Titre de la section */}
      <Typography variant="h6" sx={{
        mb: 4,
        fontWeight: 600,
        color: '#333',
        fontSize: '1.2rem'
      }}>
        Ajouter une question
      </Typography>

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

            {/* Sélection d'enquête */}
            <Box>
              <Typography variant="subtitle2" sx={{
                mb: 1.5,
                fontWeight: 600,
                color: '#555'
              }}>
                Sélectionner l'enquête concernée *
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={currentQuestion.enqueteId}
                  onChange={(e) => handleQuestionChange('enqueteId', e.target.value)}
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

      {/* Bouton d'ajout */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
        <Button
          variant="contained"
          onClick={handleAddQuestion}
          disabled={!currentQuestion.question.trim() || !currentQuestion.enqueteId}
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
          Valider
        </Button>
      </Box>
    </Card>
  );
};

export default AddQuestionForm;