// File: src/app/organisateur/gestionenquetes/[id]/resultats/components/QuestionChartResultCard.tsx

'use client'

import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ChartColumnSingle } from 'src/sections/_examples/extra/chart-view/chart-column-single';
import { Iconify } from 'src/components/iconify';

interface ReponseChart {
    label: string;
    count: number;
    percentage: number;
}

interface QuestionChartResultCardProps {
    questionNumber: number;
    question: string;
    totalParticipants: number;
    totalReponses: number;
    reponses: ReponseChart[];
    onViewDetail: () => void;
}

/**
 * Composant carte de résultat avec ChartColumnSingle
 * Utilisé pour les questions avec échelle (Question 3)
 */
const QuestionChartResultCard: React.FC<QuestionChartResultCardProps> = ({
    questionNumber,
    question,
    totalParticipants,
    totalReponses,
    reponses,
    onViewDetail
}) => {
    /**
     * Génère les données pour le ChartColumnSingle avec plusieurs couleurs
     */
    const generateChartData = () => {
        const categories = reponses.map((_, index) => (index + 1).toString());
        const series = [
            {
                name: 'Réponses',
                data: reponses.map(r => r.count)
            }
        ];
        const colors = ['#1976d2', '#42a5f5', '#64b5f6', '#90caf9', '#bbdefb'];

        return { categories, series, colors };
    };

    const chartData = generateChartData();

    return (
        <Box sx={{
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            borderRadius: '8px',
            bgcolor: '#fff',
            mb: 3
        }}>
            {/* Contenu de la question */}
            <Box sx={{ p: 3 }}>
                {/* Titre de la question */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            color: '#333',
                            fontSize: '1.1rem'
                        }}
                    >
                        Question {questionNumber}
                    </Typography>

                    <Button
                        variant="outlined"
                        onClick={onViewDetail}
                        startIcon={<Iconify icon="eva:eye-fill" width={16} />}
                        sx={{
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: '0.85rem',
                            color: '#212121',
                            borderColor: '#e0e0e0',
                            backgroundColor: '#f9f9f9',
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
                    color: '#555',
                    mb: 3,
                    lineHeight: 1.6
                }}>
                    {question}
                </Typography>

                {/* Statistiques participants */}
                <Typography variant="body2" sx={{
                    color: '#1976d2',
                    fontWeight: 600,
                    mb: 3
                }}>
                    {totalParticipants} participants / {totalReponses} réponses
                </Typography>

                {/* Graphique en colonnes avec plusieurs couleurs */}
                <Box sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    p: 2,
                    bgcolor: '#fafafa',
                    mb: 3,
                    position: 'relative'
                }}>
                    <ChartColumnSingle chart={chartData} />

                    {/* Labels des pourcentages sur le graphique */}
                    <Box sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0.5
                    }}>
                        {reponses.map((reponse, index) => (
                            <Typography
                                key={index}
                                variant="caption"
                                sx={{
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    color: '#333'
                                }}
                            >
                                {index + 1}: {reponse.count}({reponse.percentage}%)
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default QuestionChartResultCard;