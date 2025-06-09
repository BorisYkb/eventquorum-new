// components/MuiSurveyResults.tsx
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import { ArrowBack } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

import { Question, OptionDetail } from '../types/survey';
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

  const handleBack = () => {
    router.push(`/enquête/${surveyId}`);
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

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', p: 3 }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>

        {/* En-tête avec navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBack}
            sx={{ color: theme.palette.primary.main }}
          >
            Retour
          </Button>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={`ENQUÊTE ${surveyId} - ACTIVITÉ 1`}
              sx={{ backgroundColor: theme.palette.warning.main, color: 'white' }}
            />
            <Chip
              label="100 réponses"
              sx={{ backgroundColor: theme.palette.primary.main, color: 'white' }}
            />
            <Chip
              label="Questionnaire 1"
              sx={{ backgroundColor: theme.palette.secondary.main, color: 'white' }}
            />
          </Box>
        </Box>

        {/* Questions et résultats */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {questions.map((question, index) => (
            <Card key={question.id} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Question {index + 1}
              </Typography>

              <Typography variant="body1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
                {question.question}
              </Typography>

              {question.responses && (
                <>
                  <Typography variant="body2" sx={{ mb: 3, color: theme.palette.text.secondary }}>
                    {Object.values(question.responses).reduce((a, b) => a + b, 0)} participants / {Object.values(question.responses).reduce((a, b) => a + b, 0)} réponses
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Object.entries(question.responses).map(([option, count]) => {
                      const total = Object.values(question.responses!).reduce((a, b) => a + b, 0);
                      const percentage = Math.round((count / total) * 100);

                      return (
                        <Box key={option}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                              {option}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                                {percentage}%
                              </Typography>
                              <Button
                                variant="text"
                                size="small"
                                onClick={() => handleViewDetail(question, index, option, count)}
                                sx={{
                                  color: theme.palette.secondary.main,
                                  textDecoration: 'underline',
                                  textTransform: 'none'
                                }}
                              >
                                Voir détail
                              </Button>
                            </Box>
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ flexGrow: 1 }}>
                              <LinearProgress
                                variant="determinate"
                                value={percentage}
                                sx={{
                                  height: 8,
                                  borderRadius: 4,
                                  backgroundColor: theme.palette.grey[200],
                                  '& .MuiLinearProgress-bar': {
                                    borderRadius: 4,
                                    backgroundColor: theme.palette.primary.main,
                                  },
                                }}
                              />
                            </Box>
                            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, minWidth: 'auto' }}>
                              {count} réponses
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </>
              )}
            </Card>
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
