// src/app/operateur/admissionactivite/components/confirmation-activite-popup.tsx

'use client';

import { useEffect } from 'react';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface ParticipantActiviteInfo {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  activiteNom: string;
}

interface ConfirmationActivitePopupProps {
  open: boolean;
  participant: ParticipantActiviteInfo | null;
  onClose: () => void;
  onConfirmation: (participantId: string) => void;
}

export function ConfirmationActivitePopup({ 
  open, 
  participant, 
  onClose, 
  onConfirmation 
}: ConfirmationActivitePopupProps) {

  // Réinitialiser lors de l'ouverture
  useEffect(() => {
    if (open && participant) {
      // Popup ouvert avec participant
    }
  }, [open, participant]);

  const handleConfirmation = () => {
    if (!participant) return;
    onConfirmation(participant.id);
  };

  if (!participant) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: 500
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        pb: 1,
        bgcolor: 'grey.100'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Informations personnelles
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Iconify icon="eva:close-fill" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Ces informations portent sur le Nom & prénom, Email, Téléphone
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Détail
          </Typography>
        </Box>

        {/* Informations du participant */}
        <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 500 }}>
              Nom
            </Typography>
            <Typography variant="body2" sx={{ ml: 3, fontWeight: 700 }}>
              {participant.nom}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 500 }}>
              Prénom
            </Typography>
            <Typography variant="body2" sx={{ ml: 3, fontWeight: 700 }}>
              {participant.prenom}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', mb: 2 }}>
            <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 500 }}>
              Email
            </Typography>
            <Typography variant="body2" sx={{ ml: 3, fontWeight: 700 }}>
              {participant.email}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex' }}>
            <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 500 }}>
              Téléphone
            </Typography>
            <Typography variant="body2" sx={{ ml: 3, fontWeight: 700 }}>
              {participant.telephone}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Information sur l'activité */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>
            Activité sélectionnée
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
            {participant.activiteNom}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, gap: 2 }}>
        {/* <Button 
          onClick={onClose} 
          variant="outlined" 
          color="error"
          sx={{ flex: 1 }}
        >
          Annuler
        </Button> */}

        {/* Bouton de confirmation central */}
        <Button 
          onClick={handleConfirmation}
          variant="contained" 
          color="success"
          sx={{ flex: 1 }}
        >
          Confirmer la présence
        </Button>
      </DialogActions>
    </Dialog>
  );
}