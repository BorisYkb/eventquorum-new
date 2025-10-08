// File: src/app/organisateur/gestionenquetes/[id]/resultats/components/Question2ResultCard.tsx

'use client'

import React, { useState } from 'react';
import type { CardProps } from '@mui/material/Card';
import { Box, Typography, Button, Card, LinearProgress } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import QuestionDetailModal from './QuestionDetailModal';

// Types pour Question 2
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

interface Question2ResultCardProps extends CardProps {
    onViewDetail: () => void;
    questionData?: QuestionData; // ✅ Données optionnelles de la page
}

// Données par défaut si pas de données passées
const DEFAULT_QUESTION2_DATA: QuestionData = {
    questionNumber: 2,
    question: "Quel est le principal avantage de la rotation des cultures ?",
    totalParticipants: 60,
    totalReponses: 60,
    reponses: [
        { label: "Réponse1", count: 3, percentage: 5, color: '#1976d2' },
        { label: "Réponse2", count: 55, percentage: 92, color: '#42a5f5' },
        { label: "Réponse3", count: 2, percentage: 3, color: '#64b5f6' },
        { label: "Réponse4", count: 0, percentage: 0, color: '#90caf9' }
    ]
};

/**
 * Composant réponse pour Question 2 - SANS "Voir détail" sur chaque ligne
 */
function ReponseItem({ reponse }: { reponse: ReponseData }) {
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

            {/* Barre de progression */}
            <LinearProgress
                variant="determinate"
                value={reponse.percentage}
                sx={{
                    height: 8,
                    bgcolor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                        bgcolor: reponse.color,
                    },
                }}
            />
        </div>
    );
}

/**
 * Composant Question 2 selon la maquette
 */
const Question2ResultCard: React.FC<Question2ResultCardProps> = ({
    onViewDetail,
    questionData, // ✅ Utilise les données passées ou les données par défaut
    sx,
    ...other
}) => {
    // ✅ Utilise les données passées ou les données par défaut
    const data = questionData || DEFAULT_QUESTION2_DATA;

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <Card sx={{
            // borderRadius: '8px',
            // boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            // border: '1px solid #f0f0f0',
            mb: 3,
            ...sx
        }} {...other}>
            {/* Contenu de la question */}
            <Box sx={{ p: 3 }}>
                {/* ✅ TITRE ET BOUTON SUR LA MÊME LIGNE */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2
                }}>
                    {/* Titre à gauche */}
                    <Typography variant="h6" sx={{
                        fontWeight: 700,
                        color: '#333',
                        fontSize: '1rem'
                    }}>
                        Question {data.questionNumber}
                    </Typography>

                    {/* Bouton "Voir détail" à droite */}
                    {/* <Button
                        variant="outlined"
                        onClick={() => {
                            setModalOpen(true);
                            onViewDetail();
                        }}
                        startIcon={<Iconify icon="eva:eye-fill" width={16} />} // icône à gauche
                        sx={{
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: '0.85rem',
                            color: '#212121', // texte gris foncé
                            borderColor: '#e0e0e0', // bordure claire
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

                {/* Liste des réponses */}
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
                        />
                    ))}
                </Box>
            </Box>
            
            {/* Modal de détail */}
            <QuestionDetailModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                questionData={{
                    typeQuestion: 'Choix multiple',
                    nombreParticipants: data.totalParticipants,
                    nombreReponses: data.totalReponses,
                    reponses: data.reponses.map(reponse => ({
                        label: reponse.label,
                        count: reponse.count
                    })),
                    bonneReponse: 'Réponse2',
                    nombrePoints: 10
                }}
            />
        </Card>
    );
};

export default Question2ResultCard;