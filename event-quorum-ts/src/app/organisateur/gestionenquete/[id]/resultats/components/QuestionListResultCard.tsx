// File// File: src/app/organisateur/gestionenquetes/[id]/resultats/components/QuestionListResultCard.tsx

'use client'

import React from 'react';
import { Box, Typography, Button, Card } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { useState } from 'react';
import QuestionListDetailModal from './QuestionListDetailModal';

interface ReponseList {
  label: string;
  count: number;
  selected: boolean;
}

interface QuestionListResultCardProps {
  questionNumber: number;
  question: string;
  totalParticipants: number;
  totalReponses: number;
  reponses: ReponseList[];
  onViewDetail: () => void;
}

/**
 * Composant moderne pour question 4 avec liste selon la maquette
 * Design élégant avec liste des propositions et animations subtiles
 */
const QuestionListResultCard: React.FC<QuestionListResultCardProps> = ({
  questionNumber,
  question,
  totalParticipants,
  totalReponses,
  reponses,
  onViewDetail
}) => {

  // État pour le modal
  const [modalOpen, setModalOpen] = useState(false);

  // Fonction pour ouvrir le modal
  const handleViewDetail = () => {
    setModalOpen(true);
    onViewDetail(); // Conserve l'appel original si nécessaire
  };

  return (
    <Card sx={{
      // borderRadius: '12px',
      // boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      // border: '1px solid #f0f0f0',
      mb: 3,
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        transform: 'translateY(-2px)'
      }
    }}>
      {/* Contenu moderne */}
      <Box sx={{ p: 4 }}>
        {/* Titre avec style moderne */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h6" sx={{
            fontWeight: 700,
            color: '#333',
            fontSize: '1.2rem'
          }}>
            Question {questionNumber}
          </Typography>

          {/* <Button
            variant="outlined"
            onClick={handleViewDetail}
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
          </Button> */}
        </Box>


        {/* Question avec meilleure typographie */}
        <Typography variant="body1" sx={{
          color: '#555',
          mb: 3,
          lineHeight: 1.6,
          fontSize: '1rem'
        }}>
          {question}
        </Typography>

        {/* Stats en bleu avec style moderne */}
        <Box sx={{
          display: 'inline-flex',
          alignItems: 'center',
          bgcolor: 'rgba(25, 118, 210, 0.08)',
          color: '#1976d2',
          px: 2,
          py: 1,
          borderRadius: '8px',
          mb: 4
        }}>
          <Iconify icon="eva:people-fill" width={20} sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{
            fontWeight: 600,
            fontSize: '0.9rem'
          }}>
            {totalParticipants} participants / {totalReponses} réponses
          </Typography>
        </Box>

        {/* Liste moderne des propositions */}
        <Box sx={{
          bgcolor: '#f8f9fa',
          borderRadius: '12px',
          border: '1px solid #e9ecef',
          overflow: 'hidden',
          mb: 4
        }}>
          {reponses.map((reponse, index) => (
            <Box
              key={index}
              sx={{
                p: 3,
                borderBottom: index < reponses.length - 1 ? '1px solid #e0e0e0' : 'none',
                bgcolor: '#fff',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: '#f8f9fa',
                  transform: 'translateX(4px)'
                }
              }}
            >
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <Typography variant="body1" sx={{
                  color: '#333',
                  fontSize: '1rem',
                  fontWeight: 500,
                  flex: 1
                }}>
                  {reponse.label}
                </Typography>

                {/* Indicateur si sélectionné */}
                {reponse.selected && (
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    bgcolor: 'rgba(76, 175, 80, 0.1)',
                    color: '#4caf50',
                    px: 2,
                    py: 0.5,
                    borderRadius: '12px'
                  }}>
                    <Iconify icon="eva:checkmark-circle-fill" width={16} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>
                      Sélectionné
                    </Typography>
                  </Box>
                )}

                {/* Compteur si applicable */}
                {reponse.count > 0 && (
                  <Box sx={{
                    bgcolor: '#1976d2',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    minWidth: '40px',
                    textAlign: 'center',
                    ml: 2
                  }}>
                    {reponse.count}
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>

      </Box>
      {/* Modal de détail */}
      <QuestionListDetailModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        questionData={{
          typeQuestion: "Type de question",
          sousTitre: "Question libre",
          nombreParticipants: totalParticipants,
          nombrePropositions: reponses.length,
          propositions: reponses.map(r => r.label)
        }}
      />
    </Card>
  );
};

export default QuestionListResultCard;