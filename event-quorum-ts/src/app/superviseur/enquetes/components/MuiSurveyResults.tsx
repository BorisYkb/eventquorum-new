// components/MuiSurveyResults.tsx
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid2';
import { ArrowBack, FileDownload } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import { Question, OptionDetail } from '../types/survey';
import { SuperviseurWidgetSummary } from 'src/sections/overview/superviseur/view/superviseur-widget-summary-2';
import { Iconify } from 'src/components/iconify'; // Ajustez le chemin selon votre structure
import { Scrollbar } from 'src/components/scrollbar'; // Ajustez le chemin selon votre structure
import DetailModal from './modals/DetailModal';

interface MuiSurveyResultsProps {
  surveyId: string;
  questions: Question[];
}

const MuiSurveyResults: React.FC<MuiSurveyResultsProps> = ({ surveyId, questions }) => {
  const router = useRouter();
  const theme = useTheme();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOptionDetail, setSelectedOptionDetail] = useState<OptionDetail | null>(null);

  // Calculs des statistiques générales
  const totalParticipants = 80; // À récupérer depuis les données réelles
  const totalQuestions = questions.length;
  const participationRate = 65; // À calculer depuis les données réelles

  const handleBack = () => {
    router.push(`/superviseur/enquetes`);
  };

  const handleExport = () => {
    // Logique d'exportation PDF
    console.log('Exporting results to PDF...');
  };

  const handleViewDetail = (question: Question, questionIndex: number, option: string, count: number) => {
    if (!question.responses) return;

    const total = Object.values(question.responses).reduce((a, b) => a + b, 0);
    const percentage = Math.round((count / total) * 100);

    setSelectedOptionDetail({
      question: question.question,
      questionNumber: questionIndex + 1,
      option: option,
      count: count,
      percentage: percentage,
      totalResponses: total
    });
    setShowDetailModal(true);
  };

  // Couleurs spécifiques pour les réponses
  const getResponseColor = (option: string) => {
    const lowerOption = option.toLowerCase();
    if (lowerOption.includes('oui') || lowerOption.includes('yes')) {
      return theme.palette.success.main; // Vert pour oui
    } else if (lowerOption.includes('non') || lowerOption.includes('no')) {
      return theme.palette.error.main; // Rouge pour non
    } else if (lowerOption.includes('sans avis') || lowerOption.includes('neutre')) {
      return theme.palette.warning.main; // Jaune pour sans avis
    }
    // Couleurs par défaut si aucune correspondance
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              ENQUÊTE {surveyId} - ACTIVITÉ 1
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            startIcon={<FileDownload />}
            onClick={handleExport}
            sx={{
              backgroundColor: theme.palette.primary.main,
              '&:hover': { backgroundColor: theme.palette.primary.dark }
            }}
          >
            Exporter les résultats (PDF)
          </Button>
        </Box>

        {/* Widgets de statistiques */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Grid container spacing={3} sx={{ maxWidth: '800px' }}>
            <Grid size={4}>
              <SuperviseurWidgetSummary
                title="Nombre de participants"
                total={totalParticipants}
                color="warning"
                icon="solar:users-group-rounded-bold-duotone"
              />
            </Grid>
            <Grid size={4}>
              <SuperviseurWidgetSummary
                title="Nombre de questions"
                total={totalQuestions}
                color="info"
                icon="solar:question-circle-bold-duotone"
              />
            </Grid>
            <Grid size={4}>
              <SuperviseurWidgetSummary
                title="Taux de participation"
                total={participationRate}
                unit="%"
                color="success"
                icon="solar:chart-2-bold-duotone"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Questions et résultats */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {questions.map((question, questionIndex) => (
            <Scrollbar key={question.id} sx={{ height: 'auto' }}>
              <Card sx={{ 
                maxWidth: '100%', 
                width: '100%',
                borderRadius: 3,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Question {questionIndex + 1}
                  </Typography>

                  <Typography variant="body1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
                    {question.question}
                  </Typography>

                  {question.responses && (
                    <>
                      <Typography variant="body2" sx={{ mb: 3, color: theme.palette.text.secondary }}>
                        {Object.values(question.responses).reduce((a, b) => a + b, 0)} participants / {Object.values(question.responses).reduce((a, b) => a + b, 0)} réponses
                      </Typography>

                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {Object.entries(question.responses).map(([option, count]) => {
                          const total = Object.values(question.responses!).reduce((a, b) => a + b, 0);
                          const percentage = Math.round((count / total) * 100);
                          const color = getResponseColor(option);

                          return (
                            <Box key={option} sx={{ 
                              display: 'flex', 
                              flexDirection: 'column', 
                              gap: 1,
                              p: 2,
                              backgroundColor: 'rgba(0,0,0,0.02)',
                              borderRadius: 2,
                              border: '1px solid rgba(0,0,0,0.06)'
                            }}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                  <Typography sx={{ fontWeight: 500 }}>
                                    {option}
                                  </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Typography sx={{ fontWeight: 600 }}>
                                    {count} réponses
                                  </Typography>
                                  <Typography color="text.secondary">
                                    ({percentage}%)
                                  </Typography>
                                  <Tooltip title="Voir détail" placement="top" arrow>
                                    <IconButton
                                      color="info"
                                      onClick={() => handleViewDetail(question, questionIndex, option, count)}
                                      size="small"
                                    >
                                      <Iconify icon="solar:eye-bold" />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </Box>

                              <Box
                                sx={{
                                  height: 10,
                                  width: '100%',
                                  bgcolor: 'grey.100',
                                  borderRadius: 2,
                                  position: 'relative',
                                  overflow: 'hidden',
                                }}
                              >
                                <Box
                                  sx={{
                                    height: '100%',
                                    width: `${percentage}%`,
                                    bgcolor: color,
                                    position: 'absolute',
                                    borderRadius: 2,
                                    transition: 'width 0.5s ease',
                                  }}
                                />
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            </Scrollbar>
          ))}
        </Box>

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

export default MuiSurveyResults;