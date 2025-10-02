//src/app/participant/enquete/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import { DashboardContent } from 'src/layouts/dashboard';
import { IntervenantCarousel } from 'src/app/participant/components/intervenant-carousel';

// ----------------------------------------------------------------------

/**
 * Données de l'enquête de satisfaction
 */
const surveyData = {
  title: 'satisfaction',
  questions: [
    {
      id: 1,
      type: 'radio',
      question: 'Comment évaluez-vous l\'organisation globale de l\'événement ?',
      options: [
        'Très satisfaisant',
        'Satisfaisant', 
        'Moyen',
        'Insatisfaisant',
        'Très insatisfaisant'
      ]
    },
    {
      id: 2,
      type: 'checkbox',
      question: 'Quels aspects de l\'événement avez-vous trouvés particulièrement satisfaisants ?',
      options: [
        'Organisation générale',
        'Qualité des présentations',
        'Accueil et assistance',
        'Interactivité des sessions',
        'Respect des horaires'
      ]
    }
  ]
};

// ----------------------------------------------------------------------

/**
 * Page de questionnaire d'enquête de satisfaction
 * Affiche les questions et permet de soumettre les réponses
 */
export default function EnquetePage() {
  const router = useRouter();
  const theme = useTheme();
  const searchParams = useSearchParams();
  
  // Récupération du code d'enquête depuis les paramètres d'URL
  const surveyCode = searchParams?.get('code') || '';

  // États pour les réponses
  const [answers, setAnswers] = useState<{ [key: number]: string | string[] }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);



  /**
   * Gestion des réponses radio
   */
  const handleRadioChange = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  /**
   * Gestion des réponses checkbox
   */
  const handleCheckboxChange = (questionId: number, option: string, checked: boolean) => {
    setAnswers(prev => {
      const currentAnswers = (prev[questionId] as string[]) || [];
      
      if (checked) {
        return {
          ...prev,
          [questionId]: [...currentAnswers, option]
        };
      } else {
        return {
          ...prev,
          [questionId]: currentAnswers.filter(item => item !== option)
        };
      }
    });
  };

  /**
   * Effacer les réponses
   */
  const handleEffacer = () => {
    setAnswers({});
  };

  /**
   * Valider l'enquête
   */
  const handleValider = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulation d'envoi des réponses
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Afficher un message de succès et rediriger
      alert('Merci pour votre participation ! Vos réponses ont été enregistrées.');
      router.push('/participant/enpresentiel/payer/mesinteractions');
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Retour vers la page précédente
   */
  const handleRetour = () => {
    router.back();
  };

  /**
   * Vérifier si toutes les questions ont une réponse
   */
  const isFormComplete = () => surveyData.questions.every(question => {
      const answer = answers[question.id];
      return answer && (Array.isArray(answer) ? answer.length > 0 : answer.trim() !== '');
    });

  if (!surveyCode) {
    return null; // Ou un loading spinner
  }

  return (
    <DashboardContent maxWidth="lg">
      <Box sx={{ py: { xs: 2, md: 3 } }}>
        
        {/* Bouton retour */}
        <Box sx={{ mb: 3, textAlign: 'right' }}>
          <Button
            variant="contained"
            color="inherit"
            onClick={handleRetour}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              px: 2,
              py: 0.5,
              fontSize: { xs: '0.875rem', md: '1rem' },
              borderRadius: 1
            }}
          >
            Retour
          </Button>
        </Box>

        {/* Formulaire d'enquête */}
        <Card sx={{ p: { xs: 2, md: 4 }, borderRadius: 2, mb: 4 }}>
          
          {/* En-tête */}
          <Box sx={{ mb: 4 }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 600,
                color: 'text.primary',
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
                mb: 1
              }}
            >
              Titre {surveyData.title}
            </Typography>
          </Box>

          {/* Questions */}
          <Stack spacing={4}>
            {surveyData.questions.map((question, index) => (
              <Box key={question.id}>
                {/* Titre de la question */}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2,
                    fontWeight: 600,
                    fontSize: { xs: '1rem', md: '1.125rem' }
                  }}
                >
                  Question {question.id}
                </Typography>

                {/* Énoncé de la question */}
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3,
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    lineHeight: 1.6
                  }}
                >
                  {question.question}
                </Typography>

                {/* Options de réponse */}
                {question.type === 'radio' ? (
                  <FormControl component="fieldset" fullWidth>
                    <RadioGroup
                      value={answers[question.id] || ''}
                      onChange={(e) => handleRadioChange(question.id, e.target.value)}
                    >
                      {question.options.map((option, optionIndex) => (
                        <FormControlLabel
                          key={optionIndex}
                          value={option}
                          control={<Radio sx={{ color: 'text.primary' }} />}
                          label={
                            <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                              {option}
                            </Typography>
                          }
                          sx={{ mb: 1 }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                ) : (
                  <Stack spacing={1}>
                    {question.options.map((option, optionIndex) => {
                      const isChecked = Array.isArray(answers[question.id]) 
                        ? (answers[question.id] as string[]).includes(option)
                        : false;
                        
                      return (
                        <FormControlLabel
                          key={optionIndex}
                          control={
                            <Checkbox
                              checked={isChecked}
                              onChange={(e) => handleCheckboxChange(question.id, option, e.target.checked)}
                              sx={{ color: 'text.primary' }}
                            />
                          }
                          label={
                            <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                              {option}
                            </Typography>
                          }
                        />
                      );
                    })}
                  </Stack>
                )}

                {/* Séparateur entre questions */}
                {index < surveyData.questions.length - 1 && (
                  <Box sx={{ mt: 4, mb: 2, height: 2, backgroundColor: 'divider' }} />
                )}
              </Box>
            ))}
          </Stack>

          {/* Boutons d'action */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleEffacer}
              disabled={isSubmitting || Object.keys(answers).length === 0}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 2.5,
                py: 1,
                fontSize: { xs: '0.875rem', md: '1rem' },
                borderRadius: 1,
                minWidth: 120
              }}
            >
              Effacer
            </Button>

            <Button
              variant="contained"
              color="success"
              onClick={handleValider}
              disabled={isSubmitting || !isFormComplete()}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: 2.5,
                py: 1,
                fontSize: { xs: '0.875rem', md: '1rem' },
                borderRadius: 1,
                minWidth: 120,
                '&:disabled': {
                  backgroundColor: 'grey.300',
                  color: 'grey.500'
                }
              }}
            >
              {isSubmitting ? 'Envoi...' : 'Valider'}
            </Button>
          </Box>
        </Card>

        {/* Carousel des sponsors */}
        <Grid size={{ xs: 12 }}>
          <IntervenantCarousel />
        </Grid>
      </Box>
    </DashboardContent>
  );
}