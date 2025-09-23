//src/app/participant/enpresentiel/payer/mesinteractions/[id]/page.tsx

'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import {Button} from '@mui/material';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useTheme, useMediaQuery } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';

import { SurveyStatusAnalytic } from 'src/app/participant/components/survey-status-analytic';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

/**
 * Type pour une question d'enquête
 */
type SurveyQuestion = {
    id: number;
    question: string;
    description: string;
    correctAnswer: string;
    userResponse: string;
    responseColor: string;
    detailedExplanation?: string;
    options?: string[];
};

/**
 * Données des questions pour l'enquête de satisfaction
 */
const SURVEY_QUESTIONS: SurveyQuestion[] = [
    {
        id: 1,
        question: 'QUESTION 1',
        description: 'Êtes-vous satisfait de l\'activité panel de haut niveau ?',
        correctAnswer: 'réponse 2',
        userResponse: 'Réponse 2',
        responseColor: 'success.main',
        detailedExplanation: 'Excellente réponse ! Cette activité a été conçue pour offrir une expérience enrichissante aux participants de haut niveau.',
        options: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4']
    },
    {
        id: 2,
        question: 'QUESTION 2',
        description: 'Êtes-vous satisfait de l\'activité panel de haut niveau ?',
        correctAnswer: 'réponse 3',
        userResponse: 'Réponse 1',
        responseColor: 'error.main',
        detailedExplanation: 'La réponse attendue était "Réponse 3". Cette question évaluait votre compréhension des aspects techniques du panel.',
        options: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4']
    },
    {
        id: 3,
        question: 'QUESTION 3',
        description: 'Êtes-vous satisfait de l\'activité panel de haut niveau ?',
        correctAnswer: '----------------',
        userResponse: 'Réponse 4',
        responseColor: 'warning.main',
        detailedExplanation: 'Question à réponse libre. Votre retour est précieux pour améliorer nos services.',
        options: ['Réponse libre']
    },
    {
        id: 4,
        question: 'QUESTION 4',
        description: 'Êtes-vous satisfait de l\'activité panel de haut niveau ?',
        correctAnswer: 'réponse 1',
        userResponse: 'réponse 1',
        responseColor: 'success.main',
        detailedExplanation: 'Parfait ! Vous avez bien identifié les points clés de satisfaction concernant cette activité.',
        options: ['Réponse 1', 'Réponse 2', 'Réponse 3', 'Réponse 4']
    },
];

/**
 * Données de l'enquête selon l'ID
 */
const getSurveyData = (id: string) => ({
    id,
    title: 'Satisfaction',
    description: 'Satisfaction sur l\'activité',
    totalScore: '8/10',
    status: 'En cours',
    statusColor: 'success.main',
    questions: SURVEY_QUESTIONS,
});

// ----------------------------------------------------------------------

/**
 * Page de détail d'une enquête - Vue simple en lecture seule
 */
export default function SurveyDetailPage() {
    const params = useParams();
    const router = useRouter();
    const theme = useTheme();

    // État pour la boîte de dialogue
    const [selectedQuestion, setSelectedQuestion] = useState<SurveyQuestion | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    // Récupération de l'ID depuis l'URL
    const surveyId = params.id as string;
    const surveyData = getSurveyData(surveyId);

    // Hooks pour la responsivité
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    /**
     * Calcule les tailles de police responsives
     */
    const getResponsiveFontSizes = () => {
        if (isMobile) {
            return {
                h4: { fontSize: '1.25rem', fontWeight: 700 },
                h6: { fontSize: '0.875rem', fontWeight: 600 },
                subtitle1: { fontSize: '0.875rem', fontWeight: 500 },
                body2: { fontSize: '0.75rem', fontWeight: 400 },
                tableHeader: { fontSize: '0.75rem', fontWeight: 600 },
                tableCell: { fontSize: '0.7rem', fontWeight: 400 },
                chip: { fontSize: '0.625rem', fontWeight: 500 },
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

    const fontSizes = getResponsiveFontSizes();

    /**
     * Retour à la page des interactions
     */
    const handleGoBack = () => {
        router.back();
    };

    /**
     * Ouvre la boîte de dialogue avec les détails de la question
     */
    const handleViewDetails = (question: SurveyQuestion) => {
        setSelectedQuestion(question);
        setDialogOpen(true);
    };

    /**
     * Ferme la boîte de dialogue
     */
    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedQuestion(null);
    };

    /**
     * Obtient la couleur de l'icône selon le résultat
     */
    const getResultIcon = (responseColor: string) => {
        switch (responseColor) {
            case 'success.main':
                return { icon: 'solar:check-circle-bold', color: 'success.main' };
            case 'error.main':
                return { icon: 'solar:close-circle-bold', color: 'error.main' };
            case 'warning.main':
                return { icon: 'solar:info-circle-bold', color: 'warning.main' };
            default:
                return { icon: 'solar:question-circle-bold', color: 'grey.500' };
        }
    };

    /**
     * Rendu de l'en-tête avec les chips de navigation
     */
    const renderHeader = () => (
        <Box sx={{ mb: 3 }}>
            {/* Navigation en chips - responsive */}
            <Stack
                direction="column"
                spacing={2}
                sx={{ mb: 3 }}
            >
                {/* Chips - passent en haut sur mobile */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexDirection: isMobile ? 'column' : 'row', 
                    alignItems: isMobile ? 'flex-start' : 'center', 
                    justifyContent: 'space-between',
                    gap: 2, // petit espace entre titre et bouton sur mobile
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      ...fontSizes.h4,
                      color: 'black',
                    }}
                  >
                    Titre de l'enquête: {surveyData.description}
                  </Typography>
                
                  {/* Bouton retour */}
                  <Button
                    variant="contained"
                    onClick={handleGoBack}
                    sx={{
                      color: 'white',
                      backgroundColor: 'black',
                      textTransform: 'none',
                      alignSelf: isMobile ? 'flex-end' : 'auto', // pour que le bouton soit à droite sur mobile
                    }}
                  >
                    <Iconify icon="solar:arrow-left-linear" sx={fontSizes.iconSize} /> Retour
                  </Button>
                </Box>

                {/* Statistiques */}
                <Card sx={{
                    maxWidth: '800px', // Maximum 500px de largeur
                    minWidth: { xs: '100%', sm: '300px' },
                    boxShadow: 1
                }}>
                    <Scrollbar sx={{ minHeight: { xs: 80, sm: 100 } }}>
                        <Stack
                            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                            sx={{ py: 2, flexDirection: 'row' }}
                        >
                            <SurveyStatusAnalytic
                                title="Note obtenue"
                                value={surveyData.totalScore}
                                icon="solar:medal-star-bold-duotone"
                                color={theme.vars.palette.warning.main}
                                subtitle="Score final"
                            />
                            <SurveyStatusAnalytic
                                title="Statut de enquête"
                                value={surveyData.status}
                                icon="solar:check-circle-bold-duotone"
                                color={surveyData.statusColor}
                                subtitle="État actuel"
                            />
                        </Stack>
                    </Scrollbar>
                </Card>
            </Stack>
        </Box>
    );

    /**
     * Rendu du tableau des questions et réponses
     */
    const renderQuestionsTable = () => (
        <Card sx={{ overflow: 'hidden' }}>
            <TableContainer>
                <Table size={isMobile ? 'small' : 'medium'}>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'grey.50' }}>
                            <TableCell sx={fontSizes.tableHeader}>
                                Question
                            </TableCell>
                            <TableCell sx={fontSizes.tableHeader}>
                                Description
                            </TableCell>
                            <TableCell sx={fontSizes.tableHeader}>
                                La bonne réponse
                            </TableCell>
                            <TableCell sx={fontSizes.tableHeader}>
                                Mes réponses
                            </TableCell>
                            <TableCell sx={fontSizes.tableHeader}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {surveyData.questions.map((question) => (
                            <TableRow key={question.id} hover>
                                <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                                    <Typography variant="body2" sx={{ ...fontSizes.tableCell, fontWeight: 600 }}>
                                        {question.question}
                                    </Typography>
                                </TableCell>

                                <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                                    <Typography variant="body2" sx={fontSizes.tableCell}>
                                        {question.description}
                                    </Typography>
                                </TableCell>

                                <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            ...fontSizes.tableCell,
                                            color: question.correctAnswer === '----------------' ? 'text.disabled' : 'text.primary'
                                        }}
                                    >
                                        {question.correctAnswer}
                                    </Typography>
                                </TableCell>

                                <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            ...fontSizes.tableCell,
                                            color: question.responseColor,
                                            fontWeight: 500
                                        }}
                                    >
                                        {question.userResponse}
                                    </Typography>
                                </TableCell>

                                <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                                    <IconButton 
                                        onClick={() => handleViewDetails(question)}
                                        color="primary"
                                    >
                                        <Iconify icon="solar:eye-bold" sx={fontSizes.iconSize} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );

    /**
     * Rendu de la boîte de dialogue des détails
     */
    const renderQuestionDialog = () => {
        if (!selectedQuestion) return null;

        const resultIcon = getResultIcon(selectedQuestion.responseColor);

        return (
            <Dialog 
                open={dialogOpen} 
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                fullScreen={isMobile}
            >
                <DialogTitle>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Iconify 
                            icon={resultIcon.icon} 
                            sx={{ 
                                color: resultIcon.color,
                                width: 32, 
                                height: 32 
                            }} 
                        />
                        <Typography variant="h6">
                            {selectedQuestion.question}
                        </Typography>
                    </Stack>
                </DialogTitle>

                <DialogContent dividers>
                    <Stack spacing={3}>
                        {/* Description de la question */}
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Description
                            </Typography>
                            <Typography variant="body1">
                                {selectedQuestion.description}
                            </Typography>
                        </Box>

                        {/* Options disponibles */}
                        {selectedQuestion.options && selectedQuestion.options.length > 1 && (
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Options disponibles
                                </Typography>
                                <Stack spacing={1}>
                                    {selectedQuestion.options.map((option, index) => (
                                        <Chip
                                            key={index}
                                            label={option}
                                            variant={
                                                option.toLowerCase() === selectedQuestion.userResponse.toLowerCase()
                                                    ? "filled"
                                                    : option.toLowerCase() === selectedQuestion.correctAnswer.toLowerCase()
                                                    ? "outlined"
                                                    : "outlined"
                                            }
                                            color={
                                                option.toLowerCase() === selectedQuestion.userResponse.toLowerCase()
                                                    ? selectedQuestion.responseColor === 'success.main' ? "success" : "error"
                                                    : option.toLowerCase() === selectedQuestion.correctAnswer.toLowerCase()
                                                    ? "success"
                                                    : "default"
                                            }
                                            sx={{ alignSelf: 'flex-start' }}
                                        />
                                    ))}
                                </Stack>
                            </Box>
                        )}

                        {/* Comparaison réponses */}
                        <Stack direction={isMobile ? "column" : "row"} spacing={3}>
                            <Box flex={1}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Votre réponse
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        color: selectedQuestion.responseColor,
                                        fontWeight: 500,
                                        p: 1.5,
                                        bgcolor: 'action.hover',
                                        borderRadius: 1
                                    }}
                                >
                                    {selectedQuestion.userResponse}
                                </Typography>
                            </Box>

                            <Box flex={1}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Réponse attendue
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        color: selectedQuestion.correctAnswer === '----------------' ? 'text.disabled' : 'success.main',
                                        fontWeight: 500,
                                        p: 1.5,
                                        bgcolor: 'action.hover',
                                        borderRadius: 1
                                    }}
                                >
                                    {selectedQuestion.correctAnswer}
                                </Typography>
                            </Box>
                        </Stack>

                        {/* Explication détaillée */}
                        {selectedQuestion.detailedExplanation && (
                            <Box>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Explication
                                </Typography>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        p: 2,
                                        bgcolor: 'primary.lighter',
                                        borderRadius: 1,
                                        borderLeft: 3,
                                        borderColor: 'primary.main'
                                    }}
                                >
                                    {selectedQuestion.detailedExplanation}
                                </Typography>
                            </Box>
                        )}
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button 
                        onClick={handleCloseDialog} 
                        variant="contained"
                        sx={{
                            textTransform: 'none'
                        }}
                    >
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    return (
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            {renderHeader()}
            {renderQuestionsTable()}
            {renderQuestionDialog()}
        </Box>
    );
}