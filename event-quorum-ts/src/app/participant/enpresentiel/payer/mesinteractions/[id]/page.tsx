//src/app/participant/enpresentiel/payer/mesinteractions/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';
import { useTheme, useMediaQuery } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';
import { SurveyStatusAnalytic } from 'src/app/participant/components/survey-status-analytic';

// ----------------------------------------------------------------------

/**
 * Données des questions pour l'enquête de satisfaction
 */
const SURVEY_QUESTIONS = [
    {
        id: 1,
        question: 'QUESTION 1',
        description: 'Êtes-vous satisfait de l\'activité panel de haut niveau ?',
        correctAnswer: 'réponse 2',
        userResponse: 'Réponse 2',
        responseColor: 'success.main',
    },
    {
        id: 2,
        question: 'QUESTION 2',
        description: 'Êtes-vous satisfait de l\'activité panel de haut niveau ?',
        correctAnswer: 'réponse 3',
        userResponse: 'Réponse 1',
        responseColor: 'error.main',
    },
    {
        id: 3,
        question: 'QUESTION 3',
        description: 'Êtes-vous satisfait de l\'activité panel de haut niveau ?',
        correctAnswer: '----------------',
        userResponse: 'Réponse 4',
        responseColor: 'warning.main',
    },
    {
        id: 4,
        question: 'QUESTION 4',
        description: 'Êtes-vous satisfait de l\'activité panel de haut niveau ?',
        correctAnswer: 'réponse 1',
        userResponse: 'réponse 1',
        responseColor: 'success.main',
    },
];

/**
 * Données de l'enquête selon l'ID
 */
const getSurveyData = (id: string) => ({
    id,
    title: 'Satisfaction',
    description: 'Enquête de satisfaction sur l\'activité',
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
     * Rendu de l'en-tête avec les chips de navigation
     */
    const renderHeader = () => (
        <Box sx={{ mb: 3 }}>
            {/* Bouton retour */}
            <Box sx={{ mb: 2 }}>
                <IconButton
                    onClick={handleGoBack}
                    sx={{
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' }
                    }}
                >
                    <Iconify icon="solar:arrow-left-linear" sx={fontSizes.iconSize} />
                </IconButton>
            </Box>

            {/* Navigation en chips - responsive */}
            <Stack
                direction="column"
                spacing={2}
                sx={{ mb: 3 }}
            >
                {/* Chips - passent en haut sur mobile */}
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                        label="Titre de enquête:"
                        color="error"
                        sx={{
                            ...fontSizes.chip,
                            fontWeight: 500,
                            bgcolor: 'error.main',
                            color: 'white'
                        }}
                    />
                    <Chip
                        label="Satisfaction du service"
                        variant="outlined"
                        sx={{
                            ...fontSizes.chip,
                            fontWeight: 500,
                            borderColor: 'text.secondary',
                            color: 'text.secondary'
                        }}
                    />
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

            {/* Titre de l'enquête */}
            <Typography variant="h6" sx={{ ...fontSizes.h6, mb: 2 }}>
                Titre {surveyData.title}
            </Typography>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );

    return (
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            {renderHeader()}
            {renderQuestionsTable()}
        </Box>
    );
}