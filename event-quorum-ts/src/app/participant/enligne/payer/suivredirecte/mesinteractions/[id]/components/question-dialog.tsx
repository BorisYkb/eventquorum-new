// src/app/participant/enpresentiel/payer/mesinteractions/[id]/components/question-dialog.tsx

'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Iconify } from 'src/components/iconify';

import type { SurveyQuestion } from './types';

// ----------------------------------------------------------------------

interface QuestionDialogProps {
    open: boolean;
    question: SurveyQuestion | null;
    isMobile: boolean;
    onClose: () => void;
}

/**
 * Obtient l'icône et la couleur selon le résultat
 */
const getResultIcon = (question: SurveyQuestion) => {
    if (question.isFreeResponse) {
        return { icon: 'solar:document-text-bold', color: 'info.main' };
    }

    if (question.isCorrect) {
        return { icon: 'solar:check-circle-bold', color: 'success.main' };
    }

    return { icon: 'solar:close-circle-bold', color: 'error.main' };
};

/**
 * Obtient le texte du statut de la réponse
 */
const getStatusText = (question: SurveyQuestion): string => {
    if (question.isFreeResponse) {
        return 'Réponse libre';
    }

    if (question.isCorrect) {
        return 'Votre réponse est correcte';
    }

    return 'Votre réponse est incorrecte';
};

/**
 * Composant Dialog pour afficher les détails d'une question
 */
export function QuestionDialog({ open, question, isMobile, onClose }: QuestionDialogProps) {
    if (!question) return null;

    const resultIcon = getResultIcon(question);
    const statusText = getStatusText(question);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            fullScreen={isMobile}
        >
            {/* Titre avec statut de la réponse */}
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
                        {statusText}
                    </Typography>
                </Stack>
            </DialogTitle>

            <DialogContent dividers>
                <Stack spacing={3}>
                    {/* Question - Première ligne du DialogContent */}
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: 'text.primary',
                                mb: 1
                            }}
                        >
                            {question.question}
                        </Typography>
                    </Box>

                    {/* Description de la question */}
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            Description
                        </Typography>
                        <Typography variant="body1">
                            {question.description}
                        </Typography>
                    </Box>

                    {/* Options disponibles (si ce n'est pas une réponse libre) */}
                    {!question.isFreeResponse && question.options && question.options.length > 1 && (
                        <Box>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Options disponibles
                            </Typography>
                            <Stack spacing={1}>
                                {question.options.map((option, index) => {
                                    // Déterminer si cette option est la réponse de l'utilisateur
                                    const isUserResponse = option === question.userResponse;
                                    // Déterminer si cette option est la réponse correcte
                                    const isCorrectAnswer = option === question.correctAnswer;

                                    return (
                                        <Chip
                                            key={index}
                                            label={option}
                                            variant={isUserResponse ? "filled" : "outlined"}
                                            color={
                                                isUserResponse
                                                    ? question.isCorrect ? "success" : "error"
                                                    : isCorrectAnswer
                                                        ? "success"
                                                        : "default"
                                            }
                                            sx={{
                                                alignSelf: 'flex-start',
                                                height: 'auto',
                                                minHeight: 32,
                                                py: 1,
                                                '& .MuiChip-label': {
                                                    whiteSpace: 'normal',
                                                    wordWrap: 'break-word'
                                                }
                                            }}
                                        />
                                    );
                                })}
                            </Stack>
                        </Box>
                    )}

                    {/* Comparaison des réponses complètes */}
                    <Stack direction={isMobile ? "column" : "row"} spacing={3}>
                        {/* Votre réponse complète */}
                        <Box flex={1}>
                            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                Votre réponse
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: question.responseColor,
                                    fontWeight: 500,
                                    p: 1.5,
                                    bgcolor: 'action.hover',
                                    borderRadius: 1,
                                    wordWrap: 'break-word'
                                }}
                            >
                                {question.userResponse}
                            </Typography>
                        </Box>

                        {/* Réponse attendue complète (si ce n'est pas une réponse libre) */}
                        {!question.isFreeResponse && (
                            <Box flex={1}>
                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                    Réponse attendue
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: question.correctAnswer === '----------------'
                                            ? 'text.disabled'
                                            : 'success.main',
                                        fontWeight: 500,
                                        p: 1.5,
                                        bgcolor: 'action.hover',
                                        borderRadius: 1,
                                        wordWrap: 'break-word'
                                    }}
                                >
                                    {question.correctAnswer}
                                </Typography>
                            </Box>
                        )}
                    </Stack>

                    {/* Explication détaillée */}
                    {question.detailedExplanation && (
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
                                    borderColor: 'primary.main',
                                    wordWrap: 'break-word'
                                }}
                            >
                                {question.detailedExplanation}
                            </Typography>
                        </Box>
                    )}
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
                    variant="contained"
                    sx={{
                        textTransform: 'none',
                        bgcolor: 'common.black',
                        color: 'common.white',
                        '&:hover': {
                            bgcolor: 'grey.800'
                        }
                    }}
                >
                    Fermer
                </Button>
            </DialogActions>
        </Dialog>
    );
}