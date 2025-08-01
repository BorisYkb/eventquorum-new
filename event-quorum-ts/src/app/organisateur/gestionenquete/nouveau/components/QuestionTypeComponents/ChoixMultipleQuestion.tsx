// File: src/app/organisateur/gestionenquetes/nouveau/components/QuestionTypeComponents/ChoixMultipleQuestion.tsx

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import { CurrentQuestion } from '../../types';

interface ChoixMultipleQuestionProps {
  currentQuestion: CurrentQuestion;
  onQuestionChange: (field: string, value: any) => void;
  onAddReponse: () => void;
  onRemoveReponse: (index: number) => void;
  onReponseChange: (index: number, value: string) => void;
}

/**
 * Composant pour les questions de type "Choix multiple"
 * Affiche des boutons radio pour les réponses avec sélection de la bonne réponse
 */
const ChoixMultipleQuestion: React.FC<ChoixMultipleQuestionProps> = ({
  currentQuestion,
  onQuestionChange,
  onAddReponse,
  onRemoveReponse,
  onReponseChange
}) => {
  return (
    <Box>
      <Typography variant="subtitle2" sx={{
        mb: 1.5,
        fontWeight: 600,
        color: '#555'
      }}>
        Réponses possibles
      </Typography>

      {/* Liste des réponses avec boutons radio */}
      {currentQuestion.reponses.map((reponse, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
          <Box sx={{
            minWidth: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <Radio
              checked={currentQuestion.bonneReponse === index}
              onChange={() => onQuestionChange('bonneReponse', index)}
              size="small"
              sx={{ p: 0.5 }}
            />
          </Box>
          <TextField
            size="small"
            fullWidth
            placeholder="contenu de la réponse"
            value={reponse}
            onChange={(e) => onReponseChange(index, e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '6px',
                backgroundColor: '#fafafa'
              }
            }}
          />
          {currentQuestion.reponses.length > 1 && (
            <Button
              size="small"
              color="error"
              onClick={() => onRemoveReponse(index)}
              sx={{ minWidth: 'auto', px: 1 }}
            >
              ✕
            </Button>
          )}
        </Box>
      ))}

      {/* Bouton Ajouter une réponse */}
      <Button
        variant="text"
        size="small"
        onClick={onAddReponse}
        sx={{
          mt: 1,
          border:"1px solid",
          mb: 3,
          textTransform: 'none',
          color: '#1976d2',
          fontWeight: 500
        }}
      >
        Ajouter une réponse
      </Button>

      {/* Section Choisir la bonne réponse */}
      <Box sx={{ mt: 3 }}>
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
            displayEmpty
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
    </Box>
  );
};

export default ChoixMultipleQuestion;