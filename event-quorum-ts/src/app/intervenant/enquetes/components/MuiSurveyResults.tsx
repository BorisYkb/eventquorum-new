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
import Chip from '@mui/material/Chip';
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

  // Données pour la liste des trois premiers (exemple)
  const topThreeList = [
    {
      rank: 1,
      name: "Marie Dubois",
      score: 9.2,
      color: "#FFD700", // Or
      bgColor: "linear-gradient(135deg, #FFD700 0%, #FFA000 100%)",
      icon: "🥇"
    },
    {
      rank: 2,
      name: "Jean Martin",
      score: 8.7,
      color: "#C0C0C0", // Argent
      bgColor: "linear-gradient(135deg, #C0C0C0 0%, #808080 100%)",
      icon: "🥈"
    },
    {
      rank: 3,
      name: "Sophie Laurent",
      score: 8.1,
      color: "#CD7F32", // Bronze
      bgColor: "linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)",
      icon: "🥉"
    }
  ];

  const handleBack = () => {
    router.push(`/intervenant/enquetes/${surveyId}`);
  };

  const handleExport = () => {
    // Logique d'exportation PDF
    console.log('Exporting results to PDF...');
  };

  const handleViewDetail = (question: Question, questionIndex: number) => {
    if (!question.responses) return;

    // Prendre la première option comme exemple pour la modal
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

            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              ENQUÊTE {surveyId} - ACTIVITÉ 1
            </Typography>

          </Box>

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

        {/* Liste des trois premiers */}
        <Card sx={{
          mb: 4,
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          overflow: 'hidden'
        }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: '#FFD700'
              }}>
                <Typography sx={{ fontSize: '1.5rem' }}>⭐</Typography>
                <Typography sx={{ fontSize: '1.5rem' }}>⭐</Typography>
                <Typography sx={{ fontSize: '1.5rem' }}>⭐</Typography>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>
                Top 3 des Participants
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {topThreeList.map((participant, index) => (
                <Grid size={4} key={index}>
                  <Card sx={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.15)'
                    },
                    border: `2px solid ${participant.color}`,
                    position: 'relative',
                    overflow: 'visible'
                  }}>
                    <CardContent sx={{ p: 3, textAlign: 'center', position: 'relative' }}>
                      {/* Badge de position */}
                      <Box sx={{
                        position: 'absolute',
                        top: -15,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        background: participant.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                        border: '3px solid white'
                      }}>
                        <Typography sx={{
                          fontSize: '1.5rem',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                        }}>
                          {participant.icon}
                        </Typography>
                      </Box>

                      {/* Contenu principal */}
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" sx={{
                          fontWeight: 'bold',
                          color: 'text.primary',
                          mb: 1
                        }}>
                          {participant.name}
                        </Typography>

                        {/* Note avec étoiles */}
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1,
                          mb: 2
                        }}>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            {[...Array(5)].map((_, starIndex) => (
                              <Typography
                                key={starIndex}
                                sx={{
                                  fontSize: '1.2rem',
                                  color: starIndex < Math.floor(participant.score / 2) ? '#FFD700' : '#E0E0E0'
                                }}
                              >
                                ⭐
                              </Typography>
                            ))}
                          </Box>
                        </Box>

                        {/* Score */}
                        <Box sx={{
                          background: participant.bgColor,
                          borderRadius: 2,
                          p: 1.5,
                          color: 'white'
                        }}>
                          <Typography variant="h4" sx={{
                            fontWeight: 'bold',
                            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                          }}>
                            {participant.score}
                          </Typography>
                          <Typography variant="body2" sx={{
                            opacity: 0.9,
                            fontWeight: 'medium'
                          }}>
                            / 10
                          </Typography>
                        </Box>

                        {/* Position */}
                        <Typography variant="body2" sx={{
                          mt: 2,
                          color: participant.color,
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          letterSpacing: 1
                        }}>
                          {participant.rank === 1 ? '1ère' : participant.rank === 2 ? '2ème' : '3ème'} Place
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>

          </Box>
          {/* Bouton d'exportation */}
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
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                        Question {questionIndex + 1}
                      </Typography>

                      <Typography variant="body1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
                        {question.question}
                      </Typography>
                    </Box>

                    {/* Bouton voir détail unique pour toute la question */}
                    <Tooltip title="Voir détail de la question" placement="top" arrow>
                      <IconButton
                        color="info"
                        onClick={() => handleViewDetail(question, questionIndex)}
                        size="medium"
                        sx={{
                          backgroundColor: 'rgba(33, 150, 243, 0.08)',
                          '&:hover': {
                            backgroundColor: 'rgba(33, 150, 243, 0.16)',
                          }
                        }}
                      >
                        <Iconify icon="solar:eye-bold" />
                      </IconButton>
                    </Tooltip>
                  </Box>

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
