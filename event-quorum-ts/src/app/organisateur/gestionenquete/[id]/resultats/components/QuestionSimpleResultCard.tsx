// File: src/app/organisateur/gestionenquetes/[id]/resultats/components/QuestionSimpleResultCard.tsx

'use client'

import React from 'react';
import type { CardProps } from '@mui/material/Card';
import { Box, Typography, Button, Card, CardHeader, LinearProgress } from '@mui/material';
import { Iconify } from 'src/components/iconify';

// Types exactement comme PaymentMethodsList
type ReponseData = {
    label: string;
    count: number;
    percentage: number; // value pour la barre de progression
    color: string; // ✅ Couleur obligatoire comme dans PaymentMethodsList
};

interface QuestionSimpleResultCardProps extends CardProps {
    questionNumber: number;
    question: string;
    totalParticipants: number;
    totalReponses: number;
    reponses: ReponseData[];
    onViewDetail: () => void;
}

// ✅ Couleurs par défaut comme dans PaymentMethodsList
const DEFAULT_COLORS = [
    '#1976d2', // Bleu
    '#42a5f5', // Bleu clair
    '#64b5f6', // Bleu plus clair
    '#90caf9', // Bleu très clair
    '#bbdefb', // Bleu pale
    '#ff9800', // Orange
    '#ffb74d', // Orange clair
    '#9c27b0', // Violet
    '#4caf50', // Vert
    '#f44336'  // Rouge
];

/**
 * Composant réponse individuelle - COPIE EXACTE de PaymentMethodItem
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
                {/* Label - même structure que PaymentMethodItem */}
                <Box component="span" sx={{ flexGrow: 1, typography: 'subtitle2' }}>
                    {reponse.label}
                </Box>

                {/* Pourcentage au lieu du montant */}
                <Box component="span">
                    {reponse.percentage}%
                </Box>

                {/* Bouton voir détail au lieu du pourcentage entre parenthèses */}
                <Button
                    variant="text"
                    size="small"
                    sx={{
                        color: '#9c27b0',
                        minWidth: 'auto',
                        p: 0.5,
                        typography: 'body2',
                        ml: 1
                    }}
                >
                    <Iconify icon="eva:eye-fill" width={16} />
                    <Typography variant="caption" sx={{ ml: 0.5, fontSize: '0.75rem' }}>
                        Voir détail
                    </Typography>
                </Button>
            </Box>

            {/* Barre de progression - EXACTEMENT comme PaymentMethodItem avec couleur */}
            <LinearProgress
                variant="determinate"
                value={reponse.percentage}
                sx={{
                    height: 8, // Même hauteur que PaymentMethodsList
                    bgcolor: 'grey.200', // Même couleur de fond
                    '& .MuiLinearProgress-bar': {
                        bgcolor: reponse.color, // ✅ Couleur spécifique de la réponse
                    },
                }}
            />
        </div>
    );
}

/**
 * Fonction utilitaire pour ajouter des couleurs aux réponses
 */
const addColorsToReponses = (reponses: Omit<ReponseData, 'color'>[]): ReponseData[] => {
    return reponses.map((reponse, index) => ({
        ...reponse,
        color: DEFAULT_COLORS[index % DEFAULT_COLORS.length]
    }));
};

/**
 * Composant principal - STRUCTURE EXACTE de PaymentMethodsList
 */
const QuestionSimpleResultCard: React.FC<QuestionSimpleResultCardProps> = ({
    questionNumber,
    question,
    totalParticipants,
    totalReponses,
    reponses,
    onViewDetail,
    sx,
    ...other
}) => {
    // ✅ Ajouter des couleurs si elles ne sont pas fournies
    const reponsesWithColors = reponses.every(r => r.color)
        ? reponses
        : addColorsToReponses(reponses);

    return (
        <Box sx={{ mb: 3 }}>
            {/* Structure Card EXACTEMENT comme PaymentMethodsList */}
            <Card sx={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderTop: 'none',
                ...sx
            }} {...other}>
                {/* Titre Question comme CardHeader mais sans bordure */}
                <Box sx={{ px: 3, pt: 3, pb: 1 }}>
                    <Typography variant="h6" sx={{
                        fontWeight: 700,
                        color: '#333',
                        fontSize: '1rem'
                    }}>
                        Question {questionNumber}
                    </Typography>

                    <Typography variant="body1" sx={{
                        color: '#333',
                        mt: 1,
                        mb: 2,
                        lineHeight: 1.5,
                        fontSize: '0.95rem'
                    }}>
                        {question}
                    </Typography>

                    <Typography variant="body2" sx={{
                        color: '#1976d2',
                        fontWeight: 600,
                        fontSize: '0.9rem'
                    }}>
                        {totalParticipants} participants / {totalReponses} réponses
                    </Typography>
                </Box>

                {/* Container des réponses - EXACTEMENT comme PaymentMethodsList */}
                <Box
                    sx={{
                        gap: 4, // Même gap que PaymentMethodsList
                        px: 3,  // Même padding horizontal
                        py: 4,  // Même padding vertical
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {reponsesWithColors.map((reponse, index) => (
                        <ReponseItem
                            key={index}
                            reponse={reponse}
                        />
                    ))}
                </Box>
            </Card>
        </Box>
    );
};

export default QuestionSimpleResultCard;