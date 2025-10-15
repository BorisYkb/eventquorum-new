// File: src/app/organisateur/gestionenquete/[id]/questions/[questionId]/page.tsx

'use client'

// Import des types et utilitaires
import type { QuestionDetailData } from 'src/sections/gestionEnquete/utils/questionDetailData';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { Box, Typography, Button } from '@mui/material';

import Loading from 'src/app/loading';

import { Iconify } from 'src/components/iconify';

import { getSampleQuestionData } from 'src/sections/gestionEnquete/utils/questionDetailData';
// Import des composants modulaires
import QuestionDetailSection from 'src/sections/gestionEnquete/components/QuestionDetailSection';
import QuestionResultsSection from 'src/sections/gestionEnquete/components/QuestionResultsSection';
import QuestionParticipantsSection from 'src/sections/gestionEnquete/components/QuestionParticipantsSection';

/**
 * Page de détail d'une question - Version refactorisée
 * 
 * Cette page affiche trois sections principales :
 * 1. Détail de la question (QuestionDetailSection)
 * 2. Résultats globaux (QuestionResultsSection) - Accordion
 * 3. Résultats par participant (QuestionParticipantsSection) - Accordion avec filtres
 * 
 * Chaque section est un composant séparé pour une meilleure maintenabilité
 */
const QuestionDetailPage: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const enqueteId = params.id as string;
    const questionId = parseInt(params.questionId as string);

    // États principaux
    const [data, setData] = useState<QuestionDetailData | null>(null);
    const [loading, setLoading] = useState(true);

    // États pour les accordéons
    const [expandedResults, setExpandedResults] = useState(false);
    const [expandedParticipants, setExpandedParticipants] = useState(false);

    /**
     * Chargement des données de la question au montage
     */
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                // TODO: Remplacer par l'appel API réel
                // const response = await fetch(`/api/enquetes/${enqueteId}/questions/${questionId}`);
                // const questionData = await response.json();
                // setData(questionData);

                // Simulation d'un délai de chargement
                await new Promise(resolve => setTimeout(resolve, 500));

                // Utilisation des données d'exemple
                const questionData = getSampleQuestionData(questionId);
                setData(questionData);

            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
            } finally {
                setLoading(false);
            }
        };

        if (enqueteId && questionId) {
            loadData();
        }
    }, [enqueteId, questionId]);

    /**
     * Gestion du retour vers la page de l'enquête
     */
    const handleBack = () => {
        router.push(`/organisateur/gestionenquete/${enqueteId}`);
    };

    // ===========================================
    // RENDU CONDITIONNEL - CHARGEMENT
    // ===========================================
    if (loading) {
        return <Loading />;
    }

    // ===========================================
    // RENDU CONDITIONNEL - ERREUR
    // ===========================================
    if (!data) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#fafafa'
            }}>
                <Typography variant="h6" color="error">
                    Question introuvable
                </Typography>
            </Box>
        );
    }

    // ===========================================
    // RENDU PRINCIPAL
    // ===========================================
    return (
        <Box sx={{
            p: { xs: 2, sm: 3, md: 4 },
            backgroundColor: '#fafafa',
            minHeight: '100vh'
        }}>
            {/* En-tête de la page */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                flexWrap: 'wrap',
                gap: 2
            }}>
                {/* Titre de la page */}
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
                    Question {data.results.questionNumber}
                </Typography>

                {/* Bouton retour */}
                <Button
                    variant="outlined"
                    onClick={handleBack}
                    startIcon={<Iconify icon="eva:arrow-back-fill" />}
                    sx={{
                        bgcolor: 'white',
                        color: '#000000',
                        border: '1px solid #e0e0e0',
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        px: 3,
                        py: 1,
                        borderRadius: '6px',
                        '&:hover': {
                            bgcolor: '#f5f5f5',
                            border: '1px solid #d0d0d0'
                        }
                    }}
                >
                    Retour
                </Button>
            </Box>

            {/* Section 1 : Détail de la question */}
            <QuestionDetailSection question={data.question} />

            {/* Section 2 : Résultats Globaux (Accordion) */}
            <QuestionResultsSection
                question={data.question}
                results={data.results}
                expanded={expandedResults}
                onToggle={() => setExpandedResults(!expandedResults)}
            />

            {/* Section 3 : Résultats par participant (Accordion) */}
            <QuestionParticipantsSection
                participants={data.participantsResults}
                expanded={expandedParticipants}
                onToggle={() => setExpandedParticipants(!expandedParticipants)}
            />
        </Box>
    );
};

export default QuestionDetailPage;