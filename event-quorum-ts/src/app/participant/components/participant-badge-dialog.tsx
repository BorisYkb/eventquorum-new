// src/components/dialogs/participant-badge-dialog.tsx
'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import { useTheme, useMediaQuery } from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * Données du participant (normalement récupérées depuis le contexte/API)
 */
interface ParticipantData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  codeParticipant: string;
  evenement: {
    nom: string;
    dates: string;
    lieu?: string;
  };
}

interface ParticipantBadgeDialogProps {
  open: boolean;
  onClose: () => void;
  participantData?: ParticipantData;
}

/**
 * Données fictives du participant
 */
const DEFAULT_PARTICIPANT_DATA: ParticipantData = {
  nom: 'Bouadou',
  prenom: 'Kouacou Evarist',
  email: 'bouadoukouacou000@gmail.com',
  telephone: '0703895849',
  codeParticipant: 'UM8765',
  evenement: {
    nom: 'SARA 2023',
    dates: 'Du 29 sept. au 08 oct.',
    lieu: 'Parc des Expositions d\'Abidjan'
  }
};

// ----------------------------------------------------------------------

/**
 * Dialog d'affichage du badge participant
 */
export function ParticipantBadgeDialog({ 
  open, 
  onClose, 
  participantData = DEFAULT_PARTICIPANT_DATA 
}: ParticipantBadgeDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  /**
   * Calcule les tailles responsives
   */
  const getResponsiveSizes = () => {
    if (isMobile) {
      return {
        badgeWidth: 280,
        badgeHeight: 180,
        eventTitle: { fontSize: '0.75rem', fontWeight: 700 },
        eventDates: { fontSize: '0.625rem', fontWeight: 500 },
        eventSlogan: { fontSize: '0.5rem', fontWeight: 400 },
        codeLabel: { fontSize: '0.6rem', fontWeight: 600 },
        codeValue: { fontSize: '0.75rem', fontWeight: 700 },
        description: { fontSize: '0.5rem', fontWeight: 400 },
        participantName: { fontSize: '0.7rem', fontWeight: 600 },
        participantInfo: { fontSize: '0.55rem', fontWeight: 400 },
        qrSize: 40,
        iconSize: 16
      };
    }
    
    if (isTablet) {
      return {
        badgeWidth: 350,
        badgeHeight: 220,
        eventTitle: { fontSize: '0.875rem', fontWeight: 700 },
        eventDates: { fontSize: '0.75rem', fontWeight: 500 },
        eventSlogan: { fontSize: '0.625rem', fontWeight: 400 },
        codeLabel: { fontSize: '0.7rem', fontWeight: 600 },
        codeValue: { fontSize: '0.875rem', fontWeight: 700 },
        description: { fontSize: '0.625rem', fontWeight: 400 },
        participantName: { fontSize: '0.8rem', fontWeight: 600 },
        participantInfo: { fontSize: '0.65rem', fontWeight: 400 },
        qrSize: 50,
        iconSize: 18
      };
    }

    // Desktop
    return {
      badgeWidth: 420,
      badgeHeight: 260,
      eventTitle: { fontSize: '1rem', fontWeight: 700 },
      eventDates: { fontSize: '0.875rem', fontWeight: 500 },
      eventSlogan: { fontSize: '0.75rem', fontWeight: 400 },
      codeLabel: { fontSize: '0.8rem', fontWeight: 600 },
      codeValue: { fontSize: '1rem', fontWeight: 700 },
      description: { fontSize: '0.7rem', fontWeight: 400 },
      participantName: { fontSize: '0.9rem', fontWeight: 600 },
      participantInfo: { fontSize: '0.75rem', fontWeight: 400 },
      qrSize: 60,
      iconSize: 20
    };
  };

  const sizes = getResponsiveSizes();

  /**
   * Impression du badge
   */
  const handlePrintBadge = () => {
    window.print();
  };

  /**
   * Téléchargement du badge (simulation)
   */
  const handleDownloadBadge = () => {
    console.log('Téléchargement du badge...');
    // TODO: Implémenter le téléchargement en PDF
  };

  /**
   * Génération du QR Code (simulation avec des carrés)
   */
  const renderQRCode = () => (
    <Box
      sx={{
        width: sizes.qrSize,
        height: sizes.qrSize,
        bgcolor: 'black',
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gridTemplateRows: 'repeat(8, 1fr)',
        gap: '1px',
        p: 0.5,
        borderRadius: 0.5
      }}
    >
      {/* Simulation d'un QR code avec un pattern */}
      {Array.from({ length: 64 }, (_, index) => (
        <Box
          key={index}
          sx={{
            bgcolor: Math.random() > 0.6 ? 'black' : 'white',
            borderRadius: 0.2
          }}
        />
      ))}
    </Box>
  );

  /**
   * Rendu du badge principal - Version simplifiée
   */
  const renderBadge = () => (
    <Box
      sx={{
        width: sizes.badgeWidth,
        height: sizes.badgeHeight,
        bgcolor: 'white',
        border: '2px solid black',
        borderRadius: 2,
        p: 2,
        position: 'relative',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      {/* En-tête simple */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography 
          sx={{ 
            ...sizes.eventTitle,
            textTransform: 'uppercase',
            letterSpacing: 1,
            mb: 1
          }}
        >
          {participantData.evenement.nom}
        </Typography>
        
        <Typography sx={{ ...sizes.eventDates, mb: 2 }}>
          {participantData.evenement.dates}
        </Typography>
        
        <Typography 
          sx={{ 
            ...sizes.eventSlogan,
            textTransform: 'uppercase',
            letterSpacing: 0.5
          }}
        >
          VENEZ VIVRE LE {participantData.evenement.nom}
        </Typography>
      </Box>

      {/* Section centrale - Informations essentielles */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
        {/* Informations participant */}
        <Box>
          <Typography sx={{ ...sizes.participantName, mb: 0.5 }}>
            {participantData.prenom} {participantData.nom}
          </Typography>
          <Typography sx={sizes.participantInfo}>
            {participantData.email}
          </Typography>
          <Typography sx={sizes.participantInfo}>
            {participantData.telephone}
          </Typography>
        </Box>

        {/* QR Code simple */}
        {renderQRCode()}
      </Box>

      {/* Code participant en bas */}
      <Box 
        sx={{ 
          bgcolor: 'black',
          color: 'white',
          p: 1,
          borderRadius: 1,
          textAlign: 'center'
        }}
      >
        <Typography sx={sizes.codeLabel}>
          CODE PARTICIPANT: {participantData.codeParticipant}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 0
        }
      }}
    >
      <DialogContent sx={{ p: 3 }}>
        {/* En-tête du dialog */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }
            }}
          >
            Mon Badge Participant
          </Typography>
          
          <IconButton onClick={onClose} size="small">
            <Iconify icon="solar:close-bold" />
          </IconButton>
        </Box>

        {/* Badge */}
        <Box sx={{ mb: 3 }}>
          {renderBadge()}
        </Box>

        {/* Boutons d'action */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Iconify icon="solar:printer-bold-duotone" />}
            onClick={handlePrintBadge}
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              px: 3
            }}
          >
            Imprimer
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Iconify icon="solar:download-bold-duotone" />}
            onClick={handleDownloadBadge}
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              px: 3
            }}
          >
            Télécharger
          </Button>
          
          <Button
            variant="outlined"
            color="inherit"
            onClick={onClose}
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              px: 3
            }}
          >
            Fermer
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

/**
 * Hook pour gérer l'ouverture/fermeture du dialog badge
 */
export function useParticipantBadgeDialog() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return {
    open,
    handleOpen,
    handleClose,
  };
}

// Export par défaut
export default ParticipantBadgeDialog;