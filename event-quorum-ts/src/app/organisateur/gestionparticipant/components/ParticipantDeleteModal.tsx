//src/app/organisateur/gestionparticipant/components/ParticipantDeleteModal.tsx

'use client';

import React from 'react';

import {
  Close as CloseIcon,
  Warning as WarningIcon,
  Person as PersonIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
  Avatar,
  IconButton,
  Alert,
} from '@mui/material';

// Import du type
import { Participant } from 'src/app/organisateur/gestionparticipant/gestionparticipant-home/components/types';

/**
 * Interface pour les props du composant ParticipantDeleteModal
 */
interface ParticipantDeleteModalProps {
  /** Indique si le modal est ouvert */
  open: boolean;
  /** Fonction appelée pour fermer le modal */
  onClose: () => void;
  /** Données du participant à supprimer */
  participant: Participant | null;
  /** Fonction appelée pour confirmer la suppression */
  onConfirm: (id: number) => void;
  /** Indique si la suppression est en cours */
  isDeleting?: boolean;
}

/**
 * Composant modal de confirmation de suppression d'un participant
 * Affiche un dialogue de confirmation avec les détails du participant
 * et demande une confirmation explicite avant la suppression
 */
const ParticipantDeleteModal: React.FC<ParticipantDeleteModalProps> = ({
  open,
  onClose,
  participant,
  onConfirm,
  isDeleting = false,
}) => {
  // Gestion de l'absence de participant
  if (!participant) return null;

  /**
   * Fonction pour gérer la confirmation de suppression
   */
  const handleConfirm = () => {
    onConfirm(participant.id);
  };

  /**
   * Fonction pour gérer l'annulation
   */
  const handleCancel = () => {
    if (!isDeleting) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: 'rgba(255, 86, 48, 0.2) 0px 0px 2px 0px, rgba(255, 86, 48, 0.12) 0px 12px 24px -4px',
        }
      }}
    >
      {/* En-tête du modal */}
      <DialogTitle
        sx={{
          backgroundColor: 'error.main',
          color: 'white',
          p: 3,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              width: 48,
              height: 48,
            }}
          >
            <WarningIcon sx={{ fontSize: 28 }} />
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
              CONFIRMATION DE SUPPRESSION
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Cette action est irréversible
            </Typography>
          </Box>
        </Box>
        
        {/* Bouton de fermeture - désactivé pendant la suppression */}
        <IconButton
          onClick={handleCancel}
          disabled={isDeleting}
          sx={{
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            '&.Mui-disabled': { color: 'rgba(255, 255, 255, 0.5)' }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Contenu du modal */}
      <DialogContent sx={{ p: 4 }}>
        <Stack spacing={3}>
          {/* Message d'avertissement */}
          <Alert 
            severity="warning" 
            sx={{ 
              borderRadius: 2,
              backgroundColor: 'warning.lighter',
              border: '1px solid',
              borderColor: 'warning.light',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Attention ! Cette action est définitive.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Une fois supprimé, le participant ne pourra plus être récupéré et toutes ses données associées seront perdues.
            </Typography>
          </Alert>

          {/* Informations du participant à supprimer */}
          <Box
            sx={{
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              p: 3,
              backgroundColor: 'grey.50',
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
              Participant à supprimer :
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 40,
                  height: 40,
                }}
              >
                <PersonIcon />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {participant.prenom} {participant.nom}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {participant.email}
                </Typography>
              </Box>
            </Box>

            {/* Détails supplémentaires */}
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Téléphone :
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {participant.telephone}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Activité :
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
                  {participant.activite}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Statut :
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 500,
                    color: participant.connecte ? 'success.main' : 'error.main'
                  }}
                >
                  {participant.connecte ? 'Connecté' : 'Non connecté'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Émargement :
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 500,
                    color: participant.emargement ? 'success.main' : 'warning.main'
                  }}
                >
                  {participant.emargement ? 'Signé' : 'Non signé'}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Question de confirmation */}
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
              Êtes-vous sûr de vouloir supprimer ce participant ?
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tapez "CONFIRMER" ci-dessous pour valider la suppression
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      {/* Actions du modal */}
      <DialogActions sx={{ p: 3, gap: 2, justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={handleCancel}
          disabled={isDeleting}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            px: 4,
            borderColor: 'grey.300',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'grey.400',
              backgroundColor: 'grey.50',
            },
            '&.Mui-disabled': {
              borderColor: 'grey.200',
              color: 'text.disabled',
            }
          }}
        >
          Annuler
        </Button>
        
        <Button
          variant="contained"
          color="error"
          startIcon={isDeleting ? null : <DeleteIcon />}
          onClick={handleConfirm}
          disabled={isDeleting}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            px: 4,
            boxShadow: 'rgba(255, 72, 66, 0.24) 0px 8px 16px 0px',
            '&:hover': {
              boxShadow: 'rgba(255, 72, 66, 0.4) 0px 8px 16px 0px',
            },
            '&.Mui-disabled': {
              boxShadow: 'none',
            }
          }}
        >
          {isDeleting ? 'Suppression en cours...' : 'Supprimer définitivement'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ParticipantDeleteModal;