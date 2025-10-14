// File: src/app/organisateur/gestionenquetes/nouveau/components/QuestionTypeComponents/ListeDeroulanteQuestion.tsx

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
import { CurrentQuestion } from 'src/app/organisateur/gestionenquete/nouveau/types';

interface ListeDeroulanteQuestionProps {
  currentQuestion: CurrentQuestion;
  onQuestionChange: (field: string, value: any) => void;
  onAddReponse: () => void;
  onRemoveReponse: (index: number) => void;
  onReponseChange: (index: number, value: string) => void;
}

/**
 * Composant pour les questions de type "Liste déroulante"
 * Affiche des champs de texte pour les réponses avec sélection de la bonne réponse
 */
const ListeDeroulanteQuestion: React.FC<ListeDeroulanteQuestionProps> = ({
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

      {/* Liste des réponses */}
      {currentQuestion.reponses.map((reponse, index) => (
        <Box key={index} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
          <Box sx={{
            minWidth: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Réponse {index + 1} :
            </Typography>
          </Box>
          <TextField
            size="small"
            fullWidth
            placeholder="texte de la réponse"
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
        variant="outlined"
        size="small"
        onClick={onAddReponse}
        startIcon={<span style={{ fontSize: '14px', fontWeight: 'bold' }}>+</span>}
        sx={{
          mt: 1,
          mb: 3,
          textTransform: 'none',
          borderColor: '#ddd',
          color: '#333',
          fontWeight: 500,
          backgroundColor: '#f8f9fa',
          borderRadius: 1,
          px: 2,
          py: 0.5,
          fontSize: '0.875rem',
          '&:hover': {
            backgroundColor: '#e9ecef',
            borderColor: '#ccc'
          }
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

export default ListeDeroulanteQuestion;