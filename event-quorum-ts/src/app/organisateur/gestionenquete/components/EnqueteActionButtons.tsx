// File: src/app/organisateur/gestionenquetes/components/EnqueteActionButtons.tsx

import React from 'react';
import { Box, Button, Stack, Tooltip, Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';

interface EnqueteActionButtonsProps {
  onStartSurvey: () => void;
  onSuspendSurvey: () => void;
  onEndSurvey: () => void;
  onViewResults: () => void;
}

/**
 * Composant Boutons d'actions de l'enquête
 * Affiche les boutons pour gérer le cycle de vie de l'enquête
 */
const EnqueteActionButtons: React.FC<EnqueteActionButtonsProps> = ({
  onStartSurvey,
  onSuspendSurvey,
  onEndSurvey,
  onViewResults
}) => {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Titre de la section */}
      <Typography variant="h6" sx={{ 
        fontWeight: 600, 
        mb: 3, 
        color: '#333' 
      }}>
        Actions sur l'enquête
      </Typography>

      {/* Boutons d'action en ligne */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={2} 
        justifyContent="center"
        sx={{
          '& .MuiButton-root': {
            minWidth: { xs: '100%', sm: '140px' },
            height: '44px'
          }
        }}
      >
        {/* Bouton Démarrer */}
        <Tooltip title="Démarrer l'enquête" placement="top" arrow>
          <Button
            variant="outlined"
            onClick={onStartSurvey}
            startIcon={<Iconify icon="solar:play-bold" />}
            sx={{
              borderColor: '#4caf50',
              color: '#4caf50',
              px: 3,
              py: 1,
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#4caf50',
                color: 'white',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(76,175,80,0.3)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Démarrer
          </Button>
        </Tooltip>

        {/* Bouton Suspendre */}
        <Tooltip title="Suspendre l'enquête" placement="top" arrow>
          <Button
            variant="outlined"
            onClick={onSuspendSurvey}
            startIcon={<Iconify icon="solar:pause-bold" />}
            sx={{
              borderColor: '#2196f3',
              color: '#2196f3',
              px: 3,
              py: 1,
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#2196f3',
                color: 'white',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(33,150,243,0.3)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Suspendre
          </Button>
        </Tooltip>

        {/* Bouton Terminer */}
        <Tooltip title="Terminer l'enquête" placement="top" arrow>
          <Button
            variant="outlined"
            onClick={onEndSurvey}
            startIcon={<Iconify icon="solar:stop-bold" />}
            sx={{
              borderColor: '#f44336',
              color: '#f44336',
              px: 3,
              py: 1,
              borderRadius: '8px',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#f44336',
                color: 'white',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(244,67,54,0.3)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Terminer
          </Button>
        </Tooltip>

      </Stack>
    </Box>
  );
};

export default EnqueteActionButtons;