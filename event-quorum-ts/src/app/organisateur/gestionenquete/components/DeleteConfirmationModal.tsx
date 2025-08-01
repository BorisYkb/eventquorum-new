// File: src/app/organisateur/gestionenquetes/components/DeleteConfirmationModal.tsx

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Button,
  Typography,
  IconButton
} from '@mui/material';
import { Iconify } from 'src/components/iconify';

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
}

/**
 * Modal de confirmation de suppression
 * Affiche une interface de confirmation stylée pour les suppressions
 */
const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Êtes-vous sûr de supprimer Enquête 1 ?",
  message = "Vous ne pourrez pas annuler cette action !",
  itemName
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '400px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)'
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* Icône d'interrogation */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 3
        }}>
          <Box sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: '#ffebee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '3px solid #f44336'
          }}>
            <Typography sx={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#f44336'
            }}>
              ?
            </Typography>
          </Box>
        </Box>

        {/* Titre principal */}
        <Typography variant="h6" sx={{
          fontWeight: 600,
          color: '#333',
          mb: 2,
          fontSize: '1.1rem',
          lineHeight: 1.4
        }}>
          {title}
        </Typography>

        {/* Message de confirmation */}
        <Typography variant="body2" sx={{
          color: '#666',
          fontSize: '0.9rem',
          mb: 4
        }}>
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{
        p: 0,
        display: 'flex',
        gap: 2,
        justifyContent: 'center'
      }}>
        {/* Bouton Oui supprimer */}
        <Button
          variant="contained"
          onClick={handleConfirm}
          sx={{
            backgroundColor: '#f44336',
            color: 'white',
            px: 3,
            py: 1.2,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            minWidth: '120px',
            '&:hover': {
              backgroundColor: '#d32f2f',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(244,67,54,0.3)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          Oui supprimer !
        </Button>

        {/* Bouton Annuler */}
        <Button
          variant="text"
          onClick={onClose}
          sx={{
            color: '#f44336',
            px: 3,
            py: 1.2,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            minWidth: '120px',
            '&:hover': {
              backgroundColor: 'rgba(244,67,54,0.04)',
              transform: 'translateY(-1px)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;