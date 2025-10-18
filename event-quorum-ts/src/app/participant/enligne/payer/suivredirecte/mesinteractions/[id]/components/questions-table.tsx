// src/app/participant/enpresentiel/payer/mesinteractions/[id]/components/questions-table.tsx

'use client';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import { Iconify } from 'src/components/iconify';

import type { SurveyQuestion, FontSizes } from './types';

// ----------------------------------------------------------------------

interface QuestionsTableProps {
    questions: SurveyQuestion[];
    fontSizes: FontSizes;
    isMobile: boolean;
    onViewDetails: (question: SurveyQuestion) => void;
}

/**
 * Tronque une réponse à 10 caractères + "..."
 */
const truncateResponse = (text: string, maxLength: number = 30): string => {
    if (!text || text === '-') return text;
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

/**
 * Composant tableau des questions et réponses
 */
export function QuestionsTable({ questions, fontSizes, isMobile, onViewDetails }: QuestionsTableProps) {
    return (
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
                        {questions.map((question) => (
                            <TableRow key={question.id} hover>
                                {/* Question */}
                                <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                                    <Typography variant="body2" sx={{ ...fontSizes.tableCell, fontWeight: 600 }}>
                                        {truncateResponse(question.question)}
                                    </Typography>
                                </TableCell>

                                {/* Description */}
                                <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                                    <Typography variant="body2" sx={fontSizes.tableCell}>
                                        {truncateResponse(question.description)}
                                    </Typography>
                                </TableCell>

                                {/* La bonne réponse (tronquée à 10 caractères) */}
                                <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            ...fontSizes.tableCell,
                                            color: question.correctAnswer === '-'
                                                ? 'text.disabled'
                                                : 'text.primary'
                                        }}
                                    >
                                        {truncateResponse(question.correctAnswer)}
                                    </Typography>
                                </TableCell>

                                {/* Ma réponse (tronquée à 10 caractères) */}
                                <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            ...fontSizes.tableCell,
                                            color: question.responseColor,
                                            fontWeight: 500
                                        }}
                                    >
                                        {truncateResponse(question.userResponse)}
                                    </Typography>
                                </TableCell>

                                {/* Action - Bouton voir détails */}
                                <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
                                    <IconButton
                                        onClick={() => onViewDetails(question)}
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
}