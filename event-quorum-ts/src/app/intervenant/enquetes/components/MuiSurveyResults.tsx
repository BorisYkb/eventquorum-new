// components/MuiSurveyResults.tsx

'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Accordion from '@mui/material/Accordion';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ArrowBack, FileDownload, ExpandMore } from '@mui/icons-material';

import { Iconify } from 'src/components/iconify';

import { SuperviseurWidgetSummary } from 'src/sections/overview/superviseur/view/superviseur-widget-summary-2';

import DetailModal from './modals/DetailModal';
import { Question, OptionDetail } from '../types/survey';

interface MuiSurveyResultsProps {
  surveyId: string;
  questions: Question[];
}

const MuiSurveyResults: React.FC<MuiSurveyResultsProps> = ({ surveyId, questions }) => {
  const router = useRouter();
  const theme = useTheme();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOptionDetail, setSelectedOptionDetail] = useState<OptionDetail | null>(null);
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>('panel0');

  // Calculs des statistiques générales
  const totalParticipants = 80;
  const totalQuestions = questions.length;
  const participationRate = 65;

  // Données pour le top 3 simplifié
  const topThreeList = [
    {
      rank: 1,
      name: "Marie Dubois",
      score: 9.2,
      color: "#FFD700",
      icon: "🥇"
    },
    {
      rank: 2,
      name: "Jean Martin",
      score: 8.7,
      color: "#C0C0C0",
      icon: "🥈"
    },
    {
      rank: 3,
      name: "Sophie Laurent",
      score: 8.1,
      color: "#CD7F32",
      icon: "🥉"
    }
  ];

  const handleBack = () => {
    router.push(`/intervenant/enquetes/${surveyId}`);
  };

  const handleExport = () => {
    console.log('Exporting results to PDF...');
  };

  const handleViewDetail = (question: Question, questionIndex: number) => {
    if (!question.responses) return;

    const firstOption = Object.entries(question.responses)[0];
    if (!firstOption) return;

    const [option, count] = firstOption;
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

  const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedAccordion(isExpanded ? panel : false);
  };

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

        {/* En-tête */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Resultats de l'enquête <br />
            ENQUÊTE {surveyId} - ACTIVITÉ 1
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<FileDownload />}
              onClick={handleExport}
              sx={{
                bgcolor: '#000',
                color: 'white',
                '&:hover': { bgcolor: '#333' }
              }}
            >
              Exporter les résultats (PDF)
            </Button>
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
          
        </Box>

        {/* Widgets de statistiques */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
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

        {/* Top 3 simplifié et élégant */}
        <Card sx={{
          mb: 4,
          borderRadius: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <Box sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            p: 3,
            color: 'white'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ fontSize: '1.8rem' }}>🏆</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Top 3 des Participants
              </Typography>
            </Box>
          </Box>

          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3}>
              {topThreeList.map((participant, index) => (
                <Grid size={4} key={index}>
                  <Card sx={{
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    border: `2px solid ${participant.color}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.12)'
                    }
                  }}>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      {/* Icône médaille */}
                      <Typography sx={{ fontSize: '3rem', mb: 2 }}>
                        {participant.icon}
                      </Typography>

                      {/* Rang */}
                      <Typography variant="caption" sx={{
                        display: 'block',
                        color: participant.color,
                        fontWeight: 'bold',
                        letterSpacing: 1,
                        mb: 1
                      }}>
                        {participant.rank === 1 ? '1ÈRE PLACE' : participant.rank === 2 ? '2ÈME PLACE' : '3ÈME PLACE'}
                      </Typography>

                      {/* Nom */}
                      <Typography variant="h6" sx={{
                        fontWeight: 'bold',
                        mb: 2,
                        color: 'text.primary'
                      }}>
                        {participant.name}
                      </Typography>

                      {/* Score */}
                      <Box sx={{
                        display: 'inline-flex',
                        alignItems: 'baseline',
                        gap: 0.5,
                        bgcolor: 'grey.100',
                        px: 2,
                        py: 1,
                        borderRadius: 2
                      }}>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: participant.color }}>
                          {participant.score}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          / 10
                        </Typography>
                      </Box>

                      {/* Étoiles */}
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mt: 2 }}>
                        {[...Array(5)].map((_, starIndex) => (
                          <Typography
                            key={starIndex}
                            sx={{
                              fontSize: '1rem',
                              color: starIndex < Math.floor(participant.score / 2) ? participant.color : '#E0E0E0'
                            }}
                          >
                            ★
                          </Typography>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        {/* Bouton d'exportation */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
              Questions de l'enquête
            </Typography>
          
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
              Totales: {totalQuestions}
            </Typography>
          </Box>
          
        </Box>

        {/* Questions en accordéons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {questions.map((question, questionIndex) => (
            <Accordion
              key={question.id}
              expanded={expandedAccordion === `panel${questionIndex}`}
              onChange={handleAccordionChange(`panel${questionIndex}`)}
              sx={{
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                '&:before': { display: 'none' },
                '&.Mui-expanded': {
                  margin: 0,
                  mb: 2
                }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  '&.Mui-expanded': {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0
                  },
                  '& .MuiAccordionSummary-content': {
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pr: 2
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                  <Box sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}>
                    {questionIndex + 1}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {question.question}
                    </Typography>
                    {question.responses && (
                      <Typography variant="caption" color="text.secondary">
                        {Object.values(question.responses).reduce((a, b) => a + b, 0)} réponses
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Tooltip title="Voir détail de la question" placement="top">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetail(question, questionIndex);
                    }}
                    size="small"
                    sx={{
                      bgcolor: 'primary.lighter',
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'primary.light' }
                    }}
                  >
                    <Iconify icon="solar:eye-bold" width={18} />
                  </IconButton>
                </Tooltip>
              </AccordionSummary>

              <AccordionDetails sx={{ p: 3, bgcolor: 'background.paper' }}>
                {question.responses && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Object.entries(question.responses).map(([option, count]) => {
                      const total = Object.values(question.responses!).reduce((a, b) => a + b, 0);
                      const percentage = Math.round((count / total) * 100);
                      const color = getResponseColor(option);

                      return (
                        <Box key={option} sx={{
                          p: 2,
                          backgroundColor: 'grey.50',
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'grey.200'
                        }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                            <Typography sx={{ fontWeight: 500, color: 'text.primary' }}>
                              {option}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>
                                {count} réponses
                              </Typography>
                              <Typography sx={{
                                bgcolor: color,
                                color: 'white',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 1,
                                fontSize: '0.875rem',
                                fontWeight: 600
                              }}>
                                {percentage}%
                              </Typography>
                            </Box>
                          </Box>

                          <Box
                            sx={{
                              height: 12,
                              width: '100%',
                              bgcolor: 'grey.200',
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
                                borderRadius: 2,
                                transition: 'width 0.5s ease',
                              }}
                            />
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </AccordionDetails>
            </Accordion>
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