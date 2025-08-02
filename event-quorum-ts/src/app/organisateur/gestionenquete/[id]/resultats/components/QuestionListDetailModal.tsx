// File: src/app/organisateur/gestionenquetes/[id]/resultats/components/QuestionListDetailModal.tsx

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
 * Interface pour les données de détail d'une question liste
 */
interface QuestionListDetailData {
  typeQuestion: string;
  sousTitre: string; // "Question libre" par exemple
  nombreParticipants: number;
  nombrePropositions: number;
  propositions: string[];
}

/**
 * Props du composant modal
 */
interface QuestionListDetailModalProps {
  open: boolean;
  onClose: () => void;
  questionData: QuestionListDetailData;
}

/**
 * 🔍 Composant Modal pour afficher les détails d'une question de type liste
 * Conforme à la maquette avec tableau simple des propositions
 */
const QuestionListDetailModal: React.FC<QuestionListDetailModalProps> = ({
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
        {/* 🔴 Bouton de fermeture */}
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
          {/* 🏷️ En-tête avec type et sous-titre */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 700, 
              color: '#333',
              mb: 0.5,
              fontSize: '1.2rem'
            }}>
              {questionData.typeQuestion}
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#666',
              fontSize: '0.9rem',
              fontStyle: 'italic'
            }}>
              {questionData.sousTitre}
            </Typography>
          </Box>

          {/* 📊 Tableau des données selon la maquette */}
          <TableContainer 
            component={Paper} 
            elevation={0}
            sx={{ 
              border: '2px solid #333',
              borderRadius: '0px', // Angles droits selon la maquette
              '& .MuiTableCell-root': {
                border: '1px solid #333',
                borderCollapse: 'collapse'
              }
            }}
          >
            <Table>
              <TableBody>
                {/* Nombre de participants */}
                <TableRow sx={{ bgcolor: '#f5f5f5' }}>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#333',
                    py: 1.5,
                    fontSize: '0.9rem'
                  }}>
                    Nombre de participants
                  </TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 700, 
                    color: '#1976d2',
                    py: 1.5,
                    fontSize: '0.9rem'
                  }}>
                    {questionData.nombreParticipants.toString().padStart(2, '0')}
                  </TableCell>
                </TableRow>

                {/* Nombre de propositions */}
                <TableRow sx={{ bgcolor: '#f9f9f9' }}>
                  <TableCell sx={{ 
                    fontWeight: 600, 
                    color: '#333',
                    py: 1.5,
                    fontSize: '0.9rem'
                  }}>
                    Nombre de propositions
                  </TableCell>
                  <TableCell align="right" sx={{ 
                    fontWeight: 700, 
                    color: '#1976d2',
                    py: 1.5,
                    fontSize: '0.9rem'
                  }}>
                    {questionData.nombrePropositions.toString().padStart(2, '0')}
                  </TableCell>
                </TableRow>

                {/* Liste des propositions */}
                {questionData.propositions.map((proposition, index) => (
                  <TableRow 
                    key={index} 
                    sx={{ bgcolor: index % 2 === 0 ? '#f5f5f5' : '#f9f9f9' }}
                  >
                    <TableCell 
                      colSpan={2} 
                      sx={{ 
                        fontWeight: 500, 
                        color: '#333',
                        py: 1.5,
                        fontSize: '0.9rem',
                        textAlign: 'left'
                      }}
                    >
                      {proposition}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionListDetailModal;