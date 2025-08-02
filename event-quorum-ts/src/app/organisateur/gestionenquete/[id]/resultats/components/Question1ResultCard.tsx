// File: src/app/organisateur/gestionenquetes/[id]/resultats/components/Question1ResultCard.tsx

'use client'

import React from 'react';
import type { CardProps } from '@mui/material/Card';
import { Box, Typography, Button, Card, LinearProgress } from '@mui/material';
import { Iconify } from 'src/components/iconify';

// Types pour Question 1
type ReponseData = {
  label: string;
  count: number;
  percentage: number;
  color: string;
};

// Interface pour les données de question
interface QuestionData {
  questionNumber: number;
  question: string;
  totalParticipants: number;
  totalReponses: number;
  reponses: ReponseData[];
}

interface Question1ResultCardProps extends CardProps {
  onViewDetail: () => void;
  questionData?: QuestionData; // ✅ Données optionnelles de la page
}

/**
 * 🎨 Fonction pour déterminer la couleur selon le label de la réponse
 */
const getColorByLabel = (label: string): string => {
  const normalizedLabel = label.toLowerCase().trim();
  
  if (normalizedLabel === 'oui') {
    return '#4caf50'; // Vert pour "Oui"
  } else if (normalizedLabel === 'non') {
    return '#f44336'; // Rouge pour "Non"
  } else if (normalizedLabel === 'sans avis') {
    return '#ff9800'; // Orange pour "Sans avis"
  }
  
  // Couleur par défaut si le label ne correspond à aucun cas
  return '#1976d2';
};

// Données par défaut si pas de données passées avec les nouvelles couleurs
const DEFAULT_QUESTION1_DATA: QuestionData = {
  questionNumber: 1,
  question: "Les populations de la côte d'ivoire propose que établissement de la carte nationale d'identité soit gratuit. Qu'en pensez vous ??",
  totalParticipants: 50,
  totalReponses: 50,
  reponses: [
    { label: "Oui", count: 35, percentage: 70, color: '#4caf50' }, // Vert
    { label: "Non", count: 13, percentage: 25, color: '#f44336' }, // Rouge
    { label: "Sans avis", count: 2, percentage: 5, color: '#ff9800' } // Orange
  ]
};

/**
 * Composant réponse pour Question 1 - avec "Voir détail" sur chaque ligne
 */
function ReponseItem({ reponse, onViewDetail }: { reponse: ReponseData; onViewDetail: () => void }) {
  // ✅ Utilise la couleur basée sur le label ou la couleur fournie
  const finalColor = reponse.color || getColorByLabel(reponse.label);

  return (
    <div>
      <Box
        sx={{
          mb: 1,
          gap: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Label */}
        <Box component="span" sx={{ flexGrow: 1, typography: 'subtitle2' }}>
          {reponse.label}
        </Box>

        {/* Pourcentage */}
        <Box component="span" sx={{ fontWeight: 700, fontSize: '1.1rem' }}>
          {reponse.percentage}%
        </Box>
      </Box>

      {/* Barre de progression avec couleur personnalisée */}
      <LinearProgress
        variant="determinate"
        value={reponse.percentage}
        sx={{
          height: 8,
          bgcolor: 'grey.200',
          '& .MuiLinearProgress-bar': {
            bgcolor: finalColor, // ✅ Utilise la couleur déterminée
          },
        }}
      />
    </div>
  );
}

/**
 * Composant Question 1 selon la maquette avec couleurs personnalisées
 */
const Question1ResultCard: React.FC<Question1ResultCardProps> = ({
  onViewDetail,
  questionData, // ✅ Utilise les données passées ou les données par défaut
  sx,
  ...other
}) => {
  // ✅ Utilise les données passées ou les données par défaut
  let data = questionData || DEFAULT_QUESTION1_DATA;

  // ✅ Si les données sont passées, on met à jour les couleurs selon les labels
  if (questionData) {
    data = {
      ...questionData,
      reponses: questionData.reponses.map(reponse => ({
        ...reponse,
        color: getColorByLabel(reponse.label) // Applique les couleurs selon le label
      }))
    };
  }

  return (
    <Card sx={{
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      border: '1px solid #f0f0f0',
      mb: 3,
      ...sx
    }} {...other}>
      {/* Contenu de la question */}
      <Box sx={{ p: 3 }}>
        {/* Titre avec "Voir détail" à droite - selon la maquette */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 700, 
            color: '#333', 
            fontSize: '1rem'
          }}>
            Question {data.questionNumber}
          </Typography>
          
          <Button
            variant="outlined"
            onClick={onViewDetail}
            startIcon={<Iconify icon="eva:eye-fill" width={16} />}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.85rem',
              color: '#212121', // texte gris foncé
              borderColor: '#e0e0e0', // bordure grise claire
              backgroundColor: '#f9f9f9', // fond très clair
              borderRadius: '8px',
              px: 1.5,
              py: 0.75,
              '&:hover': {
                backgroundColor: '#f0f0f0',
                borderColor: '#ccc',
              },
            }}
          >
            Voir détail
          </Button>

        </Box>

        {/* Texte de la question */}
        <Typography variant="body1" sx={{ 
          color: '#333', 
          mb: 2,
          lineHeight: 1.5,
          fontSize: '0.95rem'
        }}>
          {data.question}
        </Typography>

        {/* Statistiques participants en bleu */}
        <Typography variant="body2" sx={{ 
          color: '#1976d2', 
          fontWeight: 600,
          mb: 3,
          fontSize: '0.9rem'
        }}>
          {data.totalParticipants} participants / {data.totalReponses} réponses
        </Typography>

        {/* Liste des réponses avec couleurs personnalisées */}
        <Box
          sx={{
            gap: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {data.reponses.map((reponse, index) => (
            <ReponseItem
              key={index}
              reponse={reponse}
              onViewDetail={onViewDetail}
            />
          ))}
        </Box>
      </Box>
    </Card>
  );
};

export default Question1ResultCard;