// File: src/app/organisateur/gestionenquetes/nouveau/components/QuestionTypeComponents/QuestionLibreQuestion.tsx

import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import { CurrentQuestion } from 'src/app/organisateur/gestionenquete/nouveau/types';

interface QuestionLibreQuestionProps {
  currentQuestion: CurrentQuestion;
  onQuestionChange: (field: string, value: any) => void;
}

/**
 * Composant pour les questions de type "Question libre"
 * Pas de réponses prédéfinies, juste la question
 */
const QuestionLibreQuestion: React.FC<QuestionLibreQuestionProps> = ({
  currentQuestion,
  onQuestionChange
}) => {
  return (
    <Box>
      <Typography variant="body2" sx={{
        color: '#666',
        fontStyle: 'italic',
        textAlign: 'center',
        py: 4,
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px dashed #ddd'
      }}>
        Les questions libres ne nécessitent pas de réponses prédéfinies.
        <br />
        Les participants pourront saisir leur réponse librement.
      </Typography>
    </Box>
  );
};

export default QuestionLibreQuestion;