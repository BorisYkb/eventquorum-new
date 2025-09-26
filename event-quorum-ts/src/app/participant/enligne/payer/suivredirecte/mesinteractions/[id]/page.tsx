//src/app/participant/enligne/payer/suivredirecte/mesinteractions/[id]/page.tsx

'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useTheme, useMediaQuery } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';

import { SurveyStatusAnalytic } from 'src/app/participant/components/survey-status-analytic';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { getSurveyData, truncateResponse } from '../data/survey-data';
import { SurveyDetailDialog } from '../components/survey-detail-dialog';

import type { SurveyQuestion } from '../data/survey-data';

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
                h4: { fontSize: '1.1rem', fontWeight: 700 },
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
                h4: { fontSize: '1.4rem', fontWeight: 700 },
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
            {/* Navigation en chips - responsive */}
            <Stack
                direction="column"
                spacing={2}
                sx={{ mb: 3 }}
            >
                {/* Titre et bouton retour */}
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
                        Titre: {surveyData.description}
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
                                        {truncateResponse(question.description, 50)}
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
                                        {truncateResponse(question.correctAnswer === '----------------' ? question.correctAnswer :
                                            question.possibleAnswers.find(answer => answer.value === question.correctAnswer)?.text || question.correctAnswer, 50)}
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
                                        {truncateResponse(question.userResponse, 50)}
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

    return (
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            {renderHeader()}
            {renderQuestionsTable()}

            {/* Dialog séparé */}
            <SurveyDetailDialog
                open={dialogOpen}
                question={selectedQuestion}
                onClose={handleCloseDialog}
            />
        </Box>
    );
}