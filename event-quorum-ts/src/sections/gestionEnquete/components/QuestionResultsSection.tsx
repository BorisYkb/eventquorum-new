// File: src/sections/gestionEnquete/components/QuestionResultsSection.tsx

'use client'

import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { Question } from 'src/app/organisateur/gestionenquete/nouveau/types';
import type { QuestionResult } from 'src/sections/gestionEnquete/types/resultTypes';

// Import des composants de résultats
import Question1ResultCard from 'src/app/organisateur/gestionenquete/[id]/resultats/components/Question1ResultCard';
import Question2ResultCard from 'src/app/organisateur/gestionenquete/[id]/resultats/components/Question2ResultCard';
import QuestionChartResultCard from 'src/app/organisateur/gestionenquete/[id]/resultats/components/QuestionChartResultCard';
import QuestionListResultCard from 'src/app/organisateur/gestionenquete/[id]/resultats/components/QuestionListResultCard';

interface QuestionResultsSectionProps {
    question: Question;
    results: QuestionResult;
    expanded: boolean;
    onToggle: () => void;
}

/**
 * Composant Section 2 : Résultats Globaux (Accordion)
 * Affiche les résultats globaux de la question dans un accordion pliable
 * Le contenu s'adapte selon le type de question
 */
const QuestionResultsSection: React.FC<QuestionResultsSectionProps> = ({
    question,
    results,
    expanded,
    onToggle
}) => {

    /**
     * Rendu du composant de résultat approprié selon le type de question
     */
    const renderResultComponent = () => {
        // Pour les questions à choix multiples, liste déroulante ou case à cocher
        if (question.type === 'choix_multiple' ||
            question.type === 'liste_deroulante' ||
            question.type === 'case_a_cocher') {

            // Utilise Question1ResultCard pour la question 1
            if (question.id === 1) {
                return (
                    <Question1ResultCard
                        onViewDetail={() => { }}
                        questionData={results}
                    />
                );
            }

            // Utilise Question2ResultCard pour les autres questions de ce type
            return (
                <Question2ResultCard
                    onViewDetail={() => { }}
                    questionData={results}
                />
            );
        }

        // Pour les questions avec échelle linéaire - Affiche un graphique
        if (question.type === 'echelle_lineaire') {
            return (
                <QuestionChartResultCard
                    questionNumber={results.questionNumber}
                    question={results.question}
                    totalParticipants={results.totalParticipants}
                    totalReponses={results.totalReponses}
                    reponses={results.reponses}
                    onViewDetail={() => { }}
                />
            );
        }

        // Pour les questions libres - Affiche la liste des réponses
        if (question.type === 'question_libre') {
            return (
                <QuestionListResultCard
                    questionNumber={results.questionNumber}
                    question={results.question}
                    totalParticipants={results.totalParticipants}
                    totalReponses={results.totalReponses}
                    reponses={results.reponses.map(r => ({
                        label: r.label,
                        count: r.count,
                        selected: false
                    }))}
                    onViewDetail={() => { }}
                />
            );
        }

        // Cas par défaut (ne devrait pas arriver)
        return null;
    };

    return (
        <Accordion
            expanded={expanded}
            onChange={onToggle}
            sx={{
                mb: 3,
                borderRadius: '12px !important',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #f0f0f0',
                '&:before': { display: 'none' }
            }}
        >
            {/* En-tête de l'accordion */}
            <AccordionSummary
                expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                sx={{
                    bgcolor: '#fafafa',
                    borderRadius: 1,
                    '&.Mui-expanded': {
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0
                    }
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
                    Résultats Globaux
                </Typography>
            </AccordionSummary>

            {/* Contenu de l'accordion */}
            <AccordionDetails sx={{ p: 0 }}>
                {renderResultComponent()}
            </AccordionDetails>
        </Accordion>
    );
};

export default QuestionResultsSection;