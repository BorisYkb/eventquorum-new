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

// import DetailModal from './modals/DetailModal';
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
    router.push(`/superviseur/enquetes/${surveyId}`);
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
    <Box sx={{ minHeight: '100vh', p: { xs: 2, sm: 3 } }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>

        {/* En-tête */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          justifyContent: 'space-between',
          mb: 3,
          gap: 2
        }}>
          <Typography variant="h4" sx={{
            fontWeight: 'bold',
            fontSize: { xs: '1rem', sm: '1.5rem', md: '1.7rem' }
          }}>
            Resultats de l'enquête <br />

            <Typography variant="body1" sx={{
              fontSize: '0.8rem'
            }}>
              ENQUÊTE: Satisfaction des candidat
              {/* <br /> ACTIVITÉ : Ouverture du SARA 2024 */}
            </Typography>
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, width: { xs: 'auto', sm: 'auto' } }}>
            <Button
              variant="contained"
              startIcon={<ArrowBack />}
              onClick={handleBack}
              fullWidth={true}
              sx={{
                bgcolor: '#000',
                color: 'white',
                '&:hover': { bgcolor: '#333' },
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            >
              Retour
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'flex-end', md: 'flex-end' },
            alignItems: 'center',
            width: { xs: '10rem', sm: '100%' },
            mt: 2,
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<FileDownload />}
            onClick={handleExport}
            sx={{
              bgcolor: '#000',
              color: '#fff',
              '&:hover': { bgcolor: '#333' },
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              px: { xs: 2, md: 3 },
              py: { xs: 1, md: 1.2 },
              borderRadius: 1,
              textTransform: 'none',
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Exporter (PDF)
          </Button>
        </Box>


        {/* Widgets de statistiques */}
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <SuperviseurWidgetSummary
              title="Nombre de participants"
              total={totalParticipants}
              color="warning"
              icon="solar:users-group-rounded-bold-duotone"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <SuperviseurWidgetSummary
              title="Nombre de questions"
              total={totalQuestions}
              color="info"
              icon="solar:question-circle-bold-duotone"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
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
          borderRadius: 1,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <Box sx={{
            background: '#eee',
            p: { xs: 2, sm: 3 },
            color: 'black',
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ fontSize: { xs: '1.3rem', sm: '1.8rem' } }}>🏆</Typography>
              <Typography variant="h5" sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1.1rem', sm: '1.5rem' }
              }}>
                Top 3 des Participants
              </Typography>
            </Box>
          </Box>

          <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
              {topThreeList.map((participant, index) => (
                <Grid size={{ xs: 12, sm: 5, md: 3 }} key={index}>
                  <Card sx={{
                    borderRadius: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    border: `2px solid ${participant.color}`,
                    transition: 'all 0.3s ease',
                    height: '100%',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.12)'
                    }
                  }}>
                    <CardContent sx={{ p: { xs: 2, sm: 2.5 }, textAlign: 'center' }}>
                      {/* Icône médaille */}
                      <Typography sx={{ fontSize: { xs: '2rem', sm: '2.5rem' }, mb: { xs: 1, sm: 1.5 } }}>
                        {participant.icon}
                      </Typography>

                      {/* Rang */}
                      <Typography variant="caption" sx={{
                        display: 'block',
                        color: participant.color,
                        fontWeight: 'bold',
                        letterSpacing: 1,
                        mb: 1,
                        fontSize: { xs: '0.65rem', sm: '0.75rem' }
                      }}>
                        {participant.rank === 1 ? '1ÈRE PLACE' : participant.rank === 2 ? '2ÈME PLACE' : '3ÈME PLACE'}
                      </Typography>

                      {/* Nom */}
                      <Typography variant="h6" sx={{
                        fontWeight: 'bold',
                        mb: { xs: 1.5, sm: 2 },
                        color: 'text.primary',
                        fontSize: { xs: '0.95rem', sm: '1.1rem' }
                      }}>
                        {participant.name}
                      </Typography>

                      {/* Score */}
                      <Box sx={{
                        display: 'inline-flex',
                        alignItems: 'baseline',
                        gap: 0.5,
                        bgcolor: 'grey.100',
                        px: { xs: 1.5, sm: 2 },
                        py: { xs: 0.75, sm: 1 },
                        borderRadius: 2
                      }}>
                        <Typography variant="h4" sx={{
                          fontWeight: 'bold',
                          color: participant.color,
                          fontSize: { xs: '1.5rem', sm: '2rem' }
                        }}>
                          {participant.score}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{
                          fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}>
                          / 10
                        </Typography>
                      </Box>

                      {/* Étoiles */}
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mt: { xs: 1.5, sm: 2 } }}>
                        {[...Array(5)].map((_, starIndex) => (
                          <Typography
                            key={starIndex}
                            sx={{
                              fontSize: { xs: '0.85rem', sm: '1rem' },
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 1 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{
              mb: 0.5,
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}>
              Questions de l'enquête
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary" sx={{
              mb: 0.5,
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}>
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
                    pr: { xs: 1, sm: 2 }
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, flex: 1 }}>
                  <Box sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 },
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }}>
                    {questionIndex + 1}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }}>
                      {question.question}
                    </Typography>
                    {question.responses && (
                      <Typography variant="caption" color="text.secondary" sx={{
                        fontSize: { xs: '0.7rem', sm: '0.75rem' }
                      }}>
                        {Object.values(question.responses).reduce((a, b) => a + b, 0)} réponses
                      </Typography>
                    )}
                  </Box>
                </Box>
              </AccordionSummary>

              <AccordionDetails sx={{ p: { xs: 2, sm: 3 }, bgcolor: 'background.paper' }}>
                {question.responses && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Object.entries(question.responses).map(([option, count]) => {
                      const total = Object.values(question.responses!).reduce((a, b) => a + b, 0);
                      const percentage = Math.round((count / total) * 100);
                      const color = getResponseColor(option);

                      return (
                        <Box key={option} sx={{
                          p: { xs: 1.5, sm: 2 },
                          backgroundColor: 'grey.50',
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'grey.200'
                        }}>
                          <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            mb: 1.5,
                            gap: 1
                          }}>
                            <Typography sx={{
                              fontWeight: 500,
                              color: 'text.primary',
                              fontSize: { xs: '0.875rem', sm: '1rem' }
                            }}>
                              {option}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Typography sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                fontSize: { xs: '0.875rem', sm: '1rem' }
                              }}>
                                {count} réponses
                              </Typography>
                              <Typography sx={{
                                bgcolor: color,
                                color: 'white',
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 1,
                                fontSize: { xs: '0.75rem', sm: '0.875rem' },
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
        {/* <DetailModal
          showDetailModal={showDetailModal}
          setShowDetailModal={setShowDetailModal}
          selectedOptionDetail={selectedOptionDetail}
        /> */}
      </Box>
    </Box>
  );
};

export default MuiSurveyResults;