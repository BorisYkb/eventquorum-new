// File: src/app/organisateur/gestionenquetes/[id]/resultats/components/QuestionDetailModal.tsx

'use client'

import React from 'react';
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
} from '@mui/material';
import { Iconify } from 'src/components/iconify';

/**
 * Interface pour les données de détail d'une question
 */
interface QuestionDetailData {
    typeQuestion: string;
    nombreParticipants: number;
    nombreReponses: number;
    reponses: {
        label: string;
        count: number;
    }[];
    bonneReponse?: string;
    nombrePoints?: number;
}

/**
 * Props du composant modal
 */
interface QuestionDetailModalProps {
    open: boolean;
    onClose: () => void;
    questionData: QuestionDetailData;
}

/**
 * 🔍 Composant Modal pour afficher les détails d'une question
 * Version simplifiée et élégante
 */
const QuestionDetailModal: React.FC<QuestionDetailModalProps> = ({
    open,
    onClose,
    questionData
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                    overflow: 'visible'
                }
            }}
        >
            <DialogContent sx={{ p: 0, position: 'relative' }}>
                {/* 🔴 Bouton de fermeture - Style simple et efficace */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: '#f44336',
                        color: 'white',
                        width: 36,
                        height: 36,
                        zIndex: 10,
                        '&:hover': {
                            bgcolor: '#d32f2f'
                        }
                    }}
                >
                    <Iconify icon="eva:close-fill" width={18} />
                </IconButton>

                {/* 📋 Contenu principal */}
                <Box sx={{ p: 4, pt: 5 }}>
                    {/* 🏷️ En-tête propre */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                        <Typography variant="h6" sx={{
                            fontWeight: 700,
                            color: '#333',
                            mb: 1,
                            fontSize: '1.2rem'
                        }}>
                            Type de question
                        </Typography>
                        <Typography variant="body1" sx={{
                            color: '#666',
                            fontSize: '1rem',
                            fontWeight: 500
                        }}>
                            {questionData.typeQuestion}
                        </Typography>
                    </Box>

                    {/* 📊 Tableau avec style moderne mais sobre */}
                    <TableContainer
                        component={Paper}
                        elevation={0}
                        sx={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            '& .MuiTableCell-root': {
                                borderBottom: '1px solid #f5f5f5'
                            }
                        }}
                    >
                        <Table>
                            <TableBody>
                                {/* Nombre de participants */}
                                <TableRow sx={{ bgcolor: '#fafafa' }}>
                                    <TableCell sx={{
                                        fontWeight: 600,
                                        color: '#333',
                                        py: 2,
                                        fontSize: '0.95rem'
                                    }}>
                                        Nombre de participants
                                    </TableCell>
                                    <TableCell align="right" sx={{
                                        fontWeight: 700,
                                        color: '#1976d2',
                                        py: 2,
                                        fontSize: '0.95rem'
                                    }}>
                                        {questionData.nombreParticipants.toString().padStart(2, '0')}
                                    </TableCell>
                                </TableRow>

                                {/* Nombre de réponses */}
                                <TableRow sx={{ bgcolor: '#ffffff' }}>
                                    <TableCell sx={{
                                        fontWeight: 600,
                                        color: '#333',
                                        py: 2,
                                        fontSize: '0.95rem'
                                    }}>
                                        Nombre de réponses
                                    </TableCell>
                                    <TableCell align="right" sx={{
                                        fontWeight: 700,
                                        color: '#1976d2',
                                        py: 2,
                                        fontSize: '0.95rem'
                                    }}>
                                        {questionData.nombreReponses.toString().padStart(2, '0')}
                                    </TableCell>
                                </TableRow>

                                {/* Liste des réponses */}
                                {questionData.reponses.map((reponse, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ bgcolor: index % 2 === 0 ? '#fafafa' : '#ffffff' }}
                                    >
                                        <TableCell sx={{
                                            fontWeight: 600,
                                            color: '#333',
                                            py: 2,
                                            fontSize: '0.95rem'
                                        }}>
                                            {reponse.label}
                                        </TableCell>
                                        <TableCell align="right" sx={{
                                            fontWeight: 700,
                                            color: '#1976d2',
                                            py: 2,
                                            fontSize: '0.95rem'
                                        }}>
                                            {reponse.count.toString().padStart(2, '0')}
                                        </TableCell>
                                    </TableRow>
                                ))}

                                {/* Bonne réponse */}
                                {questionData.bonneReponse && (
                                    <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                                        <TableCell sx={{
                                            fontWeight: 600,
                                            color: '#333',
                                            py: 2,
                                            fontSize: '0.95rem'
                                        }}>
                                            Bonne réponse
                                        </TableCell>
                                        <TableCell align="right" sx={{
                                            fontWeight: 700,
                                            color: '#4caf50',
                                            py: 2,
                                            fontSize: '0.95rem'
                                        }}>
                                            {questionData.bonneReponse}
                                        </TableCell>
                                    </TableRow>
                                )}

                                {/* Nombre de points */}
                                {questionData.nombrePoints !== undefined && (
                                    <TableRow sx={{ bgcolor: '#fafafa' }}>
                                        <TableCell sx={{
                                            fontWeight: 600,
                                            color: '#333',
                                            py: 2,
                                            fontSize: '0.95rem'
                                        }}>
                                            Nombre de points
                                        </TableCell>
                                        <TableCell align="right" sx={{
                                            fontWeight: 700,
                                            color: '#1976d2',
                                            py: 2,
                                            fontSize: '0.95rem'
                                        }}>
                                            {questionData.nombrePoints.toString().padStart(2, '0')}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default QuestionDetailModal;