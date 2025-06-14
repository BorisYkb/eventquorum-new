// components/MuiQuestionDetail.tsx
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
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { ArrowBack, FileDownload } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import { Question, OptionDetail } from '../types/survey';
import { SuperviseurWidgetSummary } from 'src/sections/overview/superviseur/view/superviseur-widget-summary-2';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import DetailModal from './modals/DetailModal';

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
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOptionDetail, setSelectedOptionDetail] = useState<OptionDetail | null>(null);

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
    router.push(`/superviseur/enquetes/${surveyId}`);
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



        {/* Résultats détaillés */}
        <Scrollbar sx={{ height: 'auto' }}>
          <Card sx={{
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                Répartition des réponses
              </Typography>

              {question.responses ? (
                <>


                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {Object.entries(question.responses)
                      .sort(([,a], [,b]) => b - a) // Trier par nombre de réponses décroissant
                      .map(([option, count]) => {
                        const percentage = Math.round((count / totalResponses) * 100);
                        const color = getResponseColor(option);


                        return (
                          <Box key={option} sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            p: 3,
                            backgroundColor: 'rgba(0,0,0,0.02)',
                            borderRadius: 2,
                            border: '1px solid rgba(0,0,0,0.06)',
                            position: 'relative'
                          }}>


                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Typography sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                                {option}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                  <Typography sx={{ fontWeight: 700, fontSize: '1.2rem' }}>
                                    {count}
                                  </Typography>
                                  <Typography color="text.secondary">
                                    réponses
                                  </Typography>
                                </Stack>
                                <Typography
                                  sx={{
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    color: color
                                  }}
                                >
                                  ({percentage}%)
                                </Typography>
                                <Tooltip title="Voir détail complet" placement="top" arrow>
                                  <IconButton
                                    color="info"
                                    onClick={() => handleViewDetail(option, count)}
                                    size="small"
                                  >
                                    <Iconify icon="solar:eye-bold" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Box>

                            <Box
                              sx={{
                                height: 12,
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
                                  transition: 'width 0.8s ease',
                                }}
                              />
                            </Box>
                          </Box>
                        );
                      })}
                  </Box>
                </>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  Aucune réponse disponible pour cette question.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Scrollbar>

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
