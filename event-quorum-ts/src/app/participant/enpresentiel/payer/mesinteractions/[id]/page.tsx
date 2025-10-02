// src/app/participant/enpresentiel/payer/mesinteractions/[id]/page.tsx

'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import { useTheme, useMediaQuery } from '@mui/material';

import { getSurveyData } from './components/survey-data';
import { HeaderSection } from './components/header-section';
import { QuestionsTable } from './components/questions-table';
import { QuestionDialog } from './components/question-dialog';

import type { SurveyQuestion, FontSizes } from './components/types';

// ----------------------------------------------------------------------

/**
 * Calcule les tailles de police responsives selon la taille de l'écran
 */
const getResponsiveFontSizes = (isMobile: boolean, isTablet: boolean): FontSizes => {
    if (isMobile) {
        return {
            h4: { fontSize: '1.15rem', fontWeight: 700 },
            h6: { fontSize: '0.8rem', fontWeight: 600 },
            subtitle1: { fontSize: '0.8rem', fontWeight: 500 },
            body2: { fontSize: '0.7rem', fontWeight: 400 },
            tableHeader: { fontSize: '0.7rem', fontWeight: 600 },
            tableCell: { fontSize: '0.7rem', fontWeight: 400 },
            chip: { fontSize: '0.6rem', fontWeight: 500 },
            iconSize: { width: 20, height: 20 }
        };
    }

    if (isTablet) {
        return {
            h4: { fontSize: '1.5rem', fontWeight: 700 },
            h6: { fontSize: '1rem', fontWeight: 600 },
            subtitle1: { fontSize: '1rem', fontWeight: 500 },
            body2: { fontSize: '0.8125rem', fontWeight: 400 },
            tableHeader: { fontSize: '0.8125rem', fontWeight: 600 },
            tableCell: { fontSize: '0.75rem', fontWeight: 400 },
            chip: { fontSize: '0.6875rem', fontWeight: 500 },
            iconSize: { width: 22, height: 22 }
        };
    }

    // Desktop
    return {
        h4: { fontSize: '2rem', fontWeight: 700 },
        h6: { fontSize: '1.125rem', fontWeight: 600 },
        subtitle1: { fontSize: '1rem', fontWeight: 500 },
        body2: { fontSize: '0.875rem', fontWeight: 400 },
        tableHeader: { fontSize: '0.875rem', fontWeight: 600 },
        tableCell: { fontSize: '0.8125rem', fontWeight: 400 },
        chip: { fontSize: '0.75rem', fontWeight: 500 },
        iconSize: { width: 24, height: 24 }
    };
};

// ----------------------------------------------------------------------

/**
 * Page de détail d'une enquête - Vue simple en lecture seule
 * 
 * Cette page affiche :
 * - Un en-tête avec le titre de l'enquête et les statistiques
 * - Un tableau listant toutes les questions avec les réponses tronquées (10 caractères)
 * - Un dialog modal affichant les détails complets d'une question sélectionnée
 */
export default function SurveyDetailPage() {
    const params = useParams();
    const router = useRouter();
    const theme = useTheme();

    // États pour la gestion du dialog
    const [selectedQuestion, setSelectedQuestion] = useState<SurveyQuestion | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    // Récupération de l'ID depuis l'URL et des données de l'enquête
    const surveyId = params.id as string;
    const surveyData = getSurveyData(surveyId);

    // Hooks pour la responsivité
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    // Calcul des tailles de police responsives
    const fontSizes = getResponsiveFontSizes(isMobile, isTablet);

    /**
     * Gestionnaire de retour à la page précédente
     */
    const handleGoBack = () => {
        router.back();
    };

    /**
     * Ouvre le dialog avec les détails complets de la question
     */
    const handleViewDetails = (question: SurveyQuestion) => {
        setSelectedQuestion(question);
        setDialogOpen(true);
    };

    /**
     * Ferme le dialog
     */
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedQuestion(null);
    };

    return (
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            {/* En-tête avec titre et statistiques */}
            <HeaderSection
                surveyData={surveyData}
                fontSizes={fontSizes}
                isMobile={isMobile}
                onGoBack={handleGoBack}
            />

            {/* Tableau des questions avec réponses tronquées */}
            <QuestionsTable
                questions={surveyData.questions}
                fontSizes={fontSizes}
                isMobile={isMobile}
                onViewDetails={handleViewDetails}
            />

            {/* Dialog modal pour afficher les détails complets d'une question */}
            <QuestionDialog
                open={dialogOpen}
                question={selectedQuestion}
                isMobile={isMobile}
                onClose={handleCloseDialog}
            />
        </Box>
    );
}