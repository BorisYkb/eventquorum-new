// File: src/app/organisateur/gestionenquetes/components/EnqueteInfoCard.tsx

import React from 'react';

import { Box, Card, Typography, Checkbox, FormControlLabel } from '@mui/material';

interface EnqueteInfoCardProps {
  titre: string;
  enqueteAnonymat: boolean;
  authentificationNumerique: boolean;
}

/**
 * Composant Carte d'informations générales de l'enquête
 * Affiche le titre et les options de l'enquête
 */
const EnqueteInfoCard: React.FC<EnqueteInfoCardProps> = ({
  titre,
  enqueteAnonymat,
  authentificationNumerique
}) => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ 
        fontWeight: 600, 
        mb: 2, 
        color: '#333' 
      }}>
        {titre}
      </Typography>
      
      <Card sx={{
        p: 3,
        // backgroundColor: '#f8f9fa',
        // borderRadius: '8px',
        // border: '1px solid #e9ecef'
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          {/* Titre de l'enquête */}
          {/* <Typography variant="h5" sx={{
            color: '#333',
            fontWeight: 600,
            flex: 1,
            minWidth: '300px'
          }}>
            {titre}
          </Typography> */}

          {/* Options de l'enquête */}
          <Box sx={{ 
            display: 'flex', 
            gap: 3,
            flexWrap: 'wrap'
          }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enqueteAnonymat}
                  disabled
                  sx={{ 
                    color: '#666',
                    '&.Mui-checked': {
                      color: '#1976d2'
                    }
                  }}
                />
              }
              label="Enquête avec notation"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.875rem',
                  color: '#555',
                  fontWeight: 500
                }
              }}
            />
            
            <FormControlLabel
              control={
                <Checkbox
                  checked={authentificationNumerique}
                  disabled
                  sx={{ 
                    color: '#666',
                    '&.Mui-checked': {
                      color: '#1976d2'
                    }
                  }}
                />
              }
              label="Autoriser plusieurs réponses"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.875rem',
                  color: '#555',
                  fontWeight: 500
                }
              }}
            />
          </Box>
        </Box>
      </Card>
    </Box>
  );

export default EnqueteInfoCard;