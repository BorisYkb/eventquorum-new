// components/MuiQuestionDetail.tsx

'use client'

// Import des types et utilitaires
import type { QuestionDetailData } from 'src/sections/gestionEnquete/utils/questionDetailData';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import { ArrowBack, FileDownload } from '@mui/icons-material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { getSampleQuestionData } from 'src/sections/gestionEnquete/utils/questionDetailData';
// Import des composants modulaires
import QuestionDetailSection from 'src/sections/gestionEnquete/components/QuestionDetailSection';
import QuestionResultsSection from 'src/sections/gestionEnquete/components/QuestionResultsSection';
import QuestionParticipantsSection from 'src/sections/gestionEnquete/components/QuestionParticipantsSection';
import { SuperviseurWidgetSummary } from 'src/sections/overview/superviseur/view/superviseur-widget-summary-2';

import DetailModal from './modals/DetailModal';
import { Question, OptionDetail } from '../types/survey';


interface MuiQuestionDetailProps {
  surveyId: string;
  questionId: number;
  question: Question;
  questionNumber: number; // Le numéro de la question dans l'enquête
}

const MuiQuestionDetail: React.FC<MuiQuestionDetailProps> = ({
  surveyId,
  questionId,
  question,
  questionNumber
}) => {
  const router = useRouter();
  const theme = useTheme();
  const params = useParams();
  const enqueteId = params.id as string;

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOptionDetail, setSelectedOptionDetail] = useState<OptionDetail | null>(null);

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
  
  

  // Calculs des statistiques pour cette question
  const totalResponses = question.responses
    ? Object.values(question.responses).reduce((a, b) => a + b, 0)
    : 0;

  const totalOptions = question.responses ? Object.keys(question.responses).length : 0;

  // Trouver l'option la plus populaire
  const mostPopularOption = question.responses
    ? Object.entries(question.responses).reduce((a, b) => a[1] > b[1] ? a : b)
    : null;

  const handleBack = () => {
    router.push(`/intervenant/enquetes/${surveyId}`);
  };

  const handleExport = () => {
    console.log('Exporting question results to PDF...');
  };

  const handleViewDetail = (option: string, count: number) => {
    if (!question.responses) return;

    const percentage = Math.round((count / totalResponses) * 100);

    setSelectedOptionDetail({
      question: question.question,
      questionNumber: questionNumber,
      option: option,
      count: count,
      percentage: percentage,
      totalResponses: totalResponses
    });
    setShowDetailModal(true);
  };

  // Couleurs spécifiques pour les réponses
  const getResponseColor = (option: string) => {
    const lowerOption = option.toLowerCase();
    if (lowerOption.includes('oui') || lowerOption.includes('yes')) {
      return theme.palette.success.main;
    } else if (lowerOption.includes('non') || lowerOption.includes('no')) {
      return theme.palette.error.main;
    } else if (lowerOption.includes('sans avis') || lowerOption.includes('neutre')) {
      return theme.palette.warning.main;
    }
    const defaultColors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.info.main,
    ];
    return defaultColors[Math.floor(Math.random() * defaultColors.length)];
  };

  return (
    <Box sx={{ minHeight: '100vh', p: 3 }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>

        {/* En-tête avec titre et bouton retour */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Question {questionNumber} - Détails
          </Typography>

          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={handleBack}
            sx={{
              bgcolor: '#000',
              color: 'white',
              '&:hover': { bgcolor: '#333' }
            }}
          >
            Retour
          </Button>
        </Box>

        {/* Titre de la question */}
        <Card sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Question
          </Typography>
          <Paper sx={{
            p: 2,
            backgroundColor: '#f8f9fa',
            borderLeft: `4px solid ${theme.palette.primary.main}`
          }}>
            <Typography variant="body1" sx={{
              color: theme.palette.text.primary,
              fontSize: '1.1rem'
            }}>
              {question.question}
            </Typography>
          </Paper>
        </Card>

        {/* Widgets de statistiques */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={4}>
            <SuperviseurWidgetSummary
              title="Total des réponses"
              total={totalResponses}
              color="info"
              icon="solar:chart-square-bold-duotone"
            />
          </Grid>
          <Grid size={4}>
            <SuperviseurWidgetSummary
              title="Nombre d'options"
              total={totalOptions}
              color="warning"
              icon="solar:list-check-bold-duotone"
            />
          </Grid>
          <Grid size={4}>
            <SuperviseurWidgetSummary
              title="Réponse la plus populaire"
              total={mostPopularOption ? mostPopularOption[1] : 0}
              color="success"
              icon="solar:star-bold-duotone"
            />
          </Grid>
        </Grid>


        {/* Section 2 : Résultats Globaux (Accordion) */}
      {data && (
        <QuestionResultsSection
            question={data.question}
            results={data.results}
            expanded={expandedResults}
            onToggle={() => setExpandedResults(!expandedResults)}
        />
      )}

      {/* Section 3 : Résultats par participant (Accordion) */}
      {data && (
        <QuestionParticipantsSection
          participants={data.participantsResults}
          expanded={expandedParticipants}
          onToggle={() => setExpandedParticipants(!expandedParticipants)}
        />
      )}

        {/* Modal de détail */}
        <DetailModal
          showDetailModal={showDetailModal}
          setShowDetailModal={setShowDetailModal}
          selectedOptionDetail={selectedOptionDetail}
        />
      </Box>
    </Box>
  );
};

export default MuiQuestionDetail;
