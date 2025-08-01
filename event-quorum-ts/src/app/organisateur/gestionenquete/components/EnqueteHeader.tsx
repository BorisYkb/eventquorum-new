// File: src/app/organisateur/gestionenquetes/components/EnqueteHeader.tsx

import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';

interface EnqueteHeaderProps {
  onBack: () => void;
  onEdit: () => void;
}

/**
 * Composant En-tête de la page de détail d'enquête
 * Affiche le titre de la page et les boutons d'action principaux
 */
const EnqueteHeader: React.FC<EnqueteHeaderProps> = ({
  onBack,
  onEdit
}) => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      mb: 4,
      pb: 2,
    }}>
      {/* Titre de la page */}
      <Typography variant="h4" component="h1" sx={{
        fontWeight: 700,
        color: '#1a1a1a',
        fontSize: '2rem'
      }}>
        Détail de l'enquête
      </Typography>

      {/* Boutons d'action */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          onClick={onBack}
          sx={{
            bgcolor: '#2c2c2c',
            color: 'white',
            px: 3,
            py: 1,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              bgcolor: '#1a1a1a',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          Retour
        </Button>


        <Button
          variant="outlined"
          onClick={onEdit}
          startIcon={<Iconify icon="solar:pen-bold" />}
          sx={{
            borderColor: '#1976d2',
            color: '#1976d2',
            px: 3,
            py: 1,
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
            '&:hover': {
              borderColor: '#1565c0',
              bgcolor: 'rgba(25, 118, 210, 0.04)',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(25,118,210,0.2)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          Modifier
        </Button>
      </Box>
    </Box>
  );
};

export default EnqueteHeader;