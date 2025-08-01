// File: src/app/organisateur/gestionenquetes/nouveau/components/QuestionTypeComponents/EchelleLineaireQuestion.tsx

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import { CurrentQuestion } from '../../types';

interface EchelleLineaireQuestionProps {
  currentQuestion: CurrentQuestion;
  onQuestionChange: (field: string, value: any) => void;
}

/**
 * Composant pour les questions de type "Échelle linéaire"
 * Affiche une échelle numérique avec labels personnalisables
 */
const EchelleLineaireQuestion: React.FC<EchelleLineaireQuestionProps> = ({
  currentQuestion,
  onQuestionChange
}) => {
  const generateScale = () => {
    const scale = [];
    for (let i = currentQuestion.echelleMin; i <= currentQuestion.echelleMax; i++) {
      scale.push(i);
    }
    return scale;
  };

  return (
    <Box>
      {/* Configuration de l'échelle */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{
          mb: 2,
          fontWeight: 600,
          color: '#555'
        }}>
          Configuration de l'échelle
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <TextField
            size="small"
            type="number"
            value={currentQuestion.echelleMin}
            onChange={(e) => onQuestionChange('echelleMin', parseInt(e.target.value) || 1)}
            sx={{
              width: '80px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '6px',
                backgroundColor: '#fafafa'
              }
            }}
          />
          <Typography variant="body2" sx={{ mx: 1 }}>à</Typography>
          <TextField
            size="small"
            type="number"
            value={currentQuestion.echelleMax}
            onChange={(e) => onQuestionChange('echelleMax', parseInt(e.target.value) || 10)}
            sx={{
              width: '80px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '6px',
                backgroundColor: '#fafafa'
              }
            }}
          />
        </Box>
      </Box>

      {/* Aperçu de l'échelle */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{
          mb: 2,
          fontWeight: 600,
          color: '#555'
        }}>
          Aperçu de l'échelle
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {generateScale().map((num) => (
            <Box
              key={num}
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
              {num}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Labels des extrémités */}
      <Box>
        <Typography variant="subtitle2" sx={{
          mb: 2,
          fontWeight: 600,
          color: '#555'
        }}>
          Labels des extrémités (optionnel)
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block', color: '#666' }}>
              {currentQuestion.echelleMin} (minimum)
            </Typography>
            <TextField
              size="small"
              fullWidth
              placeholder="Réponse 1"
              value={currentQuestion.labelMin}
              onChange={(e) => onQuestionChange('labelMin', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '6px',
                  backgroundColor: '#fafafa'
                }
              }}
            />
          </Box>
          
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" sx={{ mb: 1, display: 'block', color: '#666' }}>
              {currentQuestion.echelleMax} (maximum)
            </Typography>
            <TextField
              size="small"
              fullWidth
              placeholder="Réponse 2"
              value={currentQuestion.labelMax}
              onChange={(e) => onQuestionChange('labelMax', e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '6px',
                  backgroundColor: '#fafafa'
                }
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EchelleLineaireQuestion;