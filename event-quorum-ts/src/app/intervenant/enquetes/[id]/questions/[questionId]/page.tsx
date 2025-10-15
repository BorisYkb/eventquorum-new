'use client'



import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { Box, Typography, Button } from '@mui/material';

import Loading from 'src/app/loading';

import { Iconify } from 'src/components/iconify';


import { Question } from '../../../types/survey';
import MuiQuestionDetail from '../../../components/MuiQuestionDetail';

// Données d'exemple - remplacez par vos vraies données
const mockQuestions: Question[] = [
  {
    id: 1,
    type: 'choice',
    question: "Les participants de ce site d'étude pouvait-ils développer de nouvelles idées et trouver des réponses à leurs interrogations ?",
    responses: {
      "Oui": 45,
      "Non": 15,
      "Sans avis": 20
    }
  },
  {
    id: 2,
    type: 'choice',
    question: "Quelles sont les bonnes modalités de création des activités ?",
    responses: {
      "Oui": 52,
      "Non": 8,
      "Sans avis": 20
    }
  },
  {
    id: 3,
    type: 'choice',
    question: "Les prestataires de ce site d'étude pouvaient-ils développer de nouvelles idées et trouver des réponses à leurs interrogations ?",
    responses: {
      "Trop courte": 25,
      "Parfaite": 40,
      "Trop longue": 15
    }
  }
];

export default function QuestionDetailPage() {
  const params = useParams();
  const surveyId = params.id as string;
  const questionId = parseInt(params.questionId as string);
  


  
  // Trouver la question correspondante
  const question = mockQuestions.find(q => q.id === questionId);

  // Trouver le numéro de la question (index + 1)
  const questionNumber = mockQuestions.findIndex(q => q.id === questionId) + 1;

  if (!question) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Question non trouvée</h2>
        <p>La question avec l'ID {questionId} n'existe pas.</p>
      </div>
    );
  }

  return (
    <Box>
      <MuiQuestionDetail
        surveyId={surveyId}
        questionId={questionId}
        question={question}
        questionNumber={questionNumber}
      />

      
    </Box>
  );
}
