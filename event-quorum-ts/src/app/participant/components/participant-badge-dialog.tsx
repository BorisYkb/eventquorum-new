// src/components/dialogs/participant-badge-dialog.tsx

'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PortraitIcon from '@mui/icons-material/Portrait';
import { useTheme, useMediaQuery, Stack, Card } from '@mui/material';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

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

const DEFAULT_PARTICIPANT_DATA: ParticipantData = {
  nom: 'Bouadou',
  prenom: 'Kouacou Evarist',
  email: 'bouadou@gmail.com',
  telephone: '0703895849',
  codeParticipant: 'UM8765',
  evenement: {
    nom: 'SARA 2025',
    dates: 'Du 29 sept. au 08 oct. 2025',
    lieu: 'Parc des Expositions d\'Abidjan',
  },
};

// ----------------------------------------------------------------------

export function ParticipantBadgeDialog({
  open,
  onClose,
  participantData = DEFAULT_PARTICIPANT_DATA,
}: ParticipantBadgeDialogProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: isMobile ? 0 : 2,
          p: 0,
        },
      }}
    >
      <Box sx={{ p: isMobile ? 2 : 4, backgroundColor: 'grey.100', position: 'relative' }}>
        {/* Bouton fermer */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 10,
            top: 10,
            color: 'grey.500',
          }}
        >
          <Iconify icon="material-symbols:close" />
        </IconButton>

        {/* Badge en mode carte si mobile */}
        <Card
          sx={{
            p: isMobile ? 2 : 4,
            mt: 3,
            // borderRadius: 2,
            // boxShadow: isMobile ? 3 : 6,
            // backgroundColor: 'background.paper',
          }}
        >
          {/* Header */}
          <Stack
            direction={isMobile ? 'column' : 'row'}
            justifyContent="space-between"
            alignItems={isMobile ? 'center' : 'flex-start'}
            sx={{ mb: 3, textAlign: isMobile ? 'center' : 'left' }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                }}
              >
                {participantData.evenement.nom}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                justifyContent={isMobile ? 'center' : 'flex-start'}
                alignItems="center"
                sx={{ mt: 0.5 }}
              >
                <Iconify icon="solar:map-point-bold" width={16} color="text.secondary" />
                <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                  {participantData.evenement.dates}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  mt: 0.5,
                }}
              >
                VENEZ VIVRE LE {participantData.evenement.nom}
              </Typography>
            </Box>

            {/* Infos participant */}
            <Box sx={{ mt: isMobile ? 2 : 0, display: 'flex', alignItems: 'center', gap: 1 }}>
              
              <PortraitIcon sx={{fontSize: 70}}/>
              
              <Box>
                <Typography
                  variant="caption"
                  sx={{ fontSize: '0.75rem', fontWeight: 200, display: 'block' }}
                >
                  {participantData.prenom} {participantData.nom}
                </Typography>
                
                <Typography
                  variant="caption"
                  sx={{ fontSize: '0.75rem', fontWeight: 200, display: 'block' }}
                >
                  {participantData.email}
                </Typography>
                
                <Typography
                  variant="caption"
                  sx={{ fontSize: '0.75rem', fontWeight: 200, display: 'block' }}
                >
                  {participantData.telephone}
                </Typography>
              </Box>
            </Box>
          </Stack>

          {/* QR Code */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box
              sx={{
                width: isMobile ? 150 : 180,
                height: isMobile ? 150 : 180,
                mx: 'auto',
                mb: 2,
                backgroundColor: 'white',
                
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src="/assets/images/QR-code.png"
                alt="QR Code"
                sx={{
                  width: isMobile ? 150 : 180,
                  height: isMobile ? 150 : 180,
                  mx: 'auto',
                }}
              />
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '0.9rem', md: '1.125rem' },
                mb: 0.5,
              }}
            >
              Code Participant : {participantData.codeParticipant}
            </Typography>
          </Box>

          {/* Message */}
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '0.7rem', md: '0.85rem' },
              lineHeight: 1.4,
              color: 'text.secondary',
            }}
          >
            Ce badge vous donne accès à vos activités. <br /> Veuillez le présenter lors de votre admission.
          </Typography>
        </Card>
      </Box>
    </Dialog>
  );
}

// ----------------------------------------------------------------------

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

export default ParticipantBadgeDialog;
