// src/app/participant/enligne/payer/suivredirecte/mesinteractions/components/survey-detail-dialog.tsx

'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useMediaQuery, useTheme } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import type { SurveyQuestion } from '../data/survey-data';

// ----------------------------------------------------------------------

interface SurveyDetailDialogProps {
    open: boolean;
    question: SurveyQuestion | null;
    onClose: () => void;
}

/**
 * Dialog pour afficher les détails d'une question d'enquête
 * avec toutes les réponses possibles et les indicateurs visuels
 */
export function SurveyDetailDialog({ open, question, onClose }: SurveyDetailDialogProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    if (!question) return null;

    /**
     * Calcule les tailles de police responsives
     */
    const getResponsiveFontSizes = () => {
        if (isMobile) {
            return {
                h6: { fontSize: '0.875rem', fontWeight: 600 },
                subtitle1: { fontSize: '0.8125rem', fontWeight: 500 },
                body2: { fontSize: '0.75rem', fontWeight: 400 },
                chip: { fontSize: '0.6875rem', fontWeight: 500 }
            };
        }

        return {
            h6: { fontSize: '1.125rem', fontWeight: 600 },
            subtitle1: { fontSize: '0.875rem', fontWeight: 500 },
            body2: { fontSize: '0.8125rem', fontWeight: 400 },
            chip: { fontSize: '0.75rem', fontWeight: 500 }
        };
    };

    const fontSizes = getResponsiveFontSizes();

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
     * Détermine le type de réponse pour chaque option
     */
    const getAnswerType = (answer: any) => {
        const answerValue = answer.value.toLowerCase();
        const userResponseValue = question.userResponse.toLowerCase();
        const correctAnswerValue = question.correctAnswer.toLowerCase();

        if (answerValue === correctAnswerValue && answerValue === userResponseValue) {
            return 'both';
        } else if (answerValue === correctAnswerValue) {
            return 'correct';
        } else if (answerValue === userResponseValue) {
            return 'user';
        }
        return 'neutral';
    };

    /**
     * Obtient le style selon le type de réponse
     */
    const getAnswerStyle = (type: string) => {
        switch (type) {
            case 'both':
                return {
                    bgcolor: 'success.lighter',
                    borderColor: 'success.main',
                    borderWidth: 2,
                    color: 'success.dark'
                };
            case 'correct':
                return {
                    bgcolor: 'success.lighter',
                    borderColor: 'success.main',
                    borderWidth: 2,
                    color: 'success.dark'
                };
            case 'user':
                return {
                    bgcolor: question.responseColor === 'success.main' ? 'success.lighter' : 'error.lighter',
                    borderColor: question.responseColor === 'success.main' ? 'success.main' : 'error.main',
                    borderWidth: 2,
                    color: question.responseColor === 'success.main' ? 'success.dark' : 'error.dark'
                };
            default:
                return {
                    bgcolor: 'grey.50',
                    borderColor: 'grey.300',
                    borderWidth: 1,
                    color: 'text.secondary'
                };
        }
    };

    /**
     * Obtient l'icône selon le type de réponse
     */
    const getAnswerIcon = (type: string) => {
        switch (type) {
            case 'both':
                return { icon: 'solar:check-circle-bold', color: 'success.main' };
            case 'correct':
                return { icon: 'solar:check-circle-bold', color: 'success.main' };
            case 'user':
                return question.responseColor === 'success.main'
                    ? { icon: 'solar:user-check-bold', color: 'success.main' }
                    : { icon: 'solar:user-cross-bold', color: 'error.main' };
            default:
                return null;
        }
    };

    const resultIcon = getResultIcon(question.responseColor);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            fullScreen={isMobile}
            PaperProps={{
                sx: { borderRadius: { xs: 0, sm: 2 } }
            }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Iconify
                        icon={resultIcon.icon}
                        sx={{
                            color: resultIcon.color,
                            width: 32,
                            height: 32
                        }}
                    />
                    <Box flex={1}>
                        <Typography variant="h6" sx={fontSizes.h6}>
                            {question.question}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={fontSizes.body2}>
                            Détails de la question et réponses
                        </Typography>
                    </Box>
                </Stack>
            </DialogTitle>

            <DialogContent dividers sx={{ px: { xs: 2, sm: 3 } }}>
                <Stack spacing={3}>
                    {/* Description de la question */}
                    <Card variant="outlined" sx={{ p: 2, bgcolor: 'background.neutral' }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={fontSizes.subtitle1}>
                            Question posée
                        </Typography>
                        <Typography variant="body1" sx={{ ...fontSizes.body2, fontWeight: 500 }}>
                            {question.description}
                        </Typography>
                    </Card>

                    {/* Légende */}
                    <Card variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="subtitle2" gutterBottom sx={fontSizes.subtitle1}>
                            Légende des réponses
                        </Typography>
                        <Stack spacing={1}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Iconify icon="solar:check-circle-bold" sx={{ color: 'success.main', width: 20, height: 20 }} />
                                <Typography variant="body2" sx={fontSizes.body2}>
                                    Bonne réponse
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Iconify icon="solar:user-check-bold" sx={{ color: 'success.main', width: 20, height: 20 }} />
                                <Typography variant="body2" sx={fontSizes.body2}>
                                    Votre réponse (correcte)
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Iconify icon="solar:user-cross-bold" sx={{ color: 'error.main', width: 20, height: 20 }} />
                                <Typography variant="body2" sx={fontSizes.body2}>
                                    Votre réponse (incorrecte)
                                </Typography>
                            </Box>
                        </Stack>
                    </Card>

                    {/* Liste des réponses possibles */}
                    <Box>
                        <Typography variant="subtitle1" gutterBottom sx={{ ...fontSizes.subtitle1, mb: 2 }}>
                            Toutes les réponses possibles
                        </Typography>

                        <Stack spacing={1.5}>
                            {question.possibleAnswers.map((answer, index) => {
                                const answerType = getAnswerType(answer);
                                const answerStyle = getAnswerStyle(answerType);
                                const answerIcon = getAnswerIcon(answerType);

                                return (
                                    <Card
                                        key={answer.id}
                                        variant="outlined"
                                        sx={{
                                            p: 2,
                                            border: `${answerStyle.borderWidth}px solid`,
                                            borderColor: answerStyle.borderColor,
                                            bgcolor: answerStyle.bgcolor,
                                            transition: 'all 0.2s ease-in-out',
                                        }}
                                    >
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            {/* Numéro de la réponse */}
                                            <Box
                                                sx={{
                                                    minWidth: 32,
                                                    height: 32,
                                                    borderRadius: '50%',
                                                    bgcolor: answerType === 'neutral' ? 'grey.300' : answerStyle.borderColor,
                                                    color: answerType === 'neutral' ? 'text.secondary' : 'white',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontWeight: 600,
                                                    fontSize: '0.875rem'
                                                }}
                                            >
                                                {String.fromCharCode(65 + index)}
                                            </Box>

                                            {/* Texte de la réponse */}
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    flex: 1,
                                                    color: answerStyle.color,
                                                    ...{ ...fontSizes.body2, fontWeight: answerType !== 'neutral' ? 500 : 400 }
                                                }}
                                            >
                                                {answer.text}
                                            </Typography>

                                            {/* Icônes de statut */}
                                            <Stack direction="row" spacing={0.5}>
                                                {answerType === 'both' && (
                                                    <>
                                                        <Iconify
                                                            icon="solar:check-circle-bold"
                                                            sx={{ color: 'success.main', width: 24, height: 24 }}
                                                        />
                                                        <Iconify
                                                            icon="solar:user-bold"
                                                            sx={{ color: 'success.main', width: 24, height: 24 }}
                                                        />
                                                    </>
                                                )}
                                                {answerType === 'correct' && answerIcon && (
                                                    <Iconify
                                                        icon={answerIcon.icon}
                                                        sx={{ color: answerIcon.color, width: 24, height: 24 }}
                                                    />
                                                )}
                                                {answerType === 'user' && answerIcon && (
                                                    <Iconify
                                                        icon={answerIcon.icon}
                                                        sx={{ color: answerIcon.color, width: 24, height: 24 }}
                                                    />
                                                )}
                                            </Stack>
                                        </Stack>

                                        {/* Labels explicatifs */}
                                        {answerType !== 'neutral' && (
                                            <Box sx={{ mt: 1, pl: 5 }}>
                                                {answerType === 'both' && (
                                                    <Chip
                                                        label="Bonne réponse • Votre choix"
                                                        size="small"
                                                        color="success"
                                                        variant="soft"
                                                        sx={fontSizes.chip}
                                                    />
                                                )}
                                                {answerType === 'correct' && (
                                                    <Chip
                                                        label="Bonne réponse"
                                                        size="small"
                                                        color="success"
                                                        variant="soft"
                                                        sx={fontSizes.chip}
                                                    />
                                                )}
                                                {answerType === 'user' && (
                                                    <Chip
                                                        label={question.responseColor === 'success.main'
                                                            ? "Votre choix (correct)"
                                                            : "Votre choix (incorrect)"
                                                        }
                                                        size="small"
                                                        color={question.responseColor === 'success.main' ? "success" : "error"}
                                                        variant="soft"
                                                        sx={fontSizes.chip}
                                                    />
                                                )}
                                            </Box>
                                        )}
                                    </Card>
                                );
                            })}
                        </Stack>
                    </Box>

                    {/* Réponse complète du participant */}
                    <Card variant="outlined" sx={{ p: 2, bgcolor: 'background.neutral' }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={fontSizes.subtitle1}>
                            Votre réponse complète
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                ...fontSizes.body2,
                                fontWeight: 500,
                                color: question.responseColor,
                                lineHeight: 1.6
                            }}
                        >
                            {question.userResponse}
                        </Typography>
                    </Card>

                    {/* Explication détaillée */}
                    {question.detailedExplanation && (
                        <Card variant="outlined" sx={{ p: 2, bgcolor: 'primary.lighter', borderColor: 'primary.main' }}>
                            <Stack direction="row" alignItems="flex-start" spacing={2}>
                                <Iconify
                                    icon="solar:lightbulb-bold"
                                    sx={{ color: 'primary.main', width: 24, height: 24, mt: 0.25 }}
                                />
                                <Box>
                                    <Typography variant="subtitle2" sx={{ color: 'primary.dark', mb: 0.5, ...fontSizes.subtitle1 }}>
                                        Explication
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'primary.dark', ...fontSizes.body2, lineHeight: 1.6 }}>
                                        {question.detailedExplanation}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Card>
                    )}
                </Stack>
            </DialogContent>

            <DialogActions sx={{ p: { xs: 2, sm: 3 }, gap: 1 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{ textTransform: 'none' }}
                >
                    Fermer
                </Button>
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{ textTransform: 'none' }}
                >
                    Compris
                </Button>
            </DialogActions>
        </Dialog>
    );
}