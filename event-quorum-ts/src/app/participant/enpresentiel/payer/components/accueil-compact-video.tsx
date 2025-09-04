// src/app/participant/enpresentiel/payer/components/accueil-compact-video.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid2';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

/**
 * Section vidéo compacte pour les pages /payer/ (accueil3)
 * Remplace la grande section vidéo par une version compacte avec icône et boutons d'action
 */
export function AccueilCompactVideo() {
  const router = useRouter();
  const [enqueteModalOpen, setEnqueteModalOpen] = useState(false);
  const [codeEnquete, setCodeEnquete] = useState('');

  const handleParticiperEnquete = () => {
    setEnqueteModalOpen(true);
  };

  const handlePartagerAvis = () => {
    router.push('/participant/enpresentiel/payer/avis');
  };

  const handleWatchVideo = () => {
    console.log('Watch video');
    // TODO: Ouvrir modal vidéo
  };

  const handleConfirmEnquete = () => {
    if (codeEnquete.trim()) {
      // Redirection avec le code d'enquête
      router.push(`/participant/enpresentiel/payer/enquete?code=${codeEnquete}`);
      setEnqueteModalOpen(false);
      setCodeEnquete('');
    }
  };

  const handleCloseEnqueteModal = () => {
    setEnqueteModalOpen(false);
    setCodeEnquete('');
  };

  return (
    <>
      <Grid size={12}>
        <Card 
          sx={{ 
            borderRadius: { xs: 1, md: 2 }, 
            overflow: 'hidden',
            bgcolor: 'background.neutral',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 3 } }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2
            }}>
              {/* Section gauche : Icône + Titre + Description */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 200 }}>
                {/* Icône vidéo compacte */}
                <IconButton
                  onClick={handleWatchVideo}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    width: { xs: 48, md: 56 },
                    height: { xs: 48, md: 56 },
                    '&:hover': { 
                      bgcolor: 'primary.dark',
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  <Iconify icon="solar:play-circle-bold" width={24} />
                </IconButton>
                
                {/* Titre et description */}
                <Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
                      mb: 0.5
                    }}
                  >
                    LE SARA, UN ÉVÉNEMENT INCONTOURNABLE
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.825rem', md: '0.875rem' } }}
                  >
                    Du 29 sept. au 08 oct. • Cliquez pour voir la vidéo
                  </Typography>
                </Box>
              </Box>

              {/* Section droite : Boutons d'action */}
              <Box sx={{ 
                display: 'flex', 
                gap: 1.5, 
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
                <Button
                  variant="contained"
                  // color="info"
                  startIcon={<Iconify icon="solar:question-circle-bold" />}
                  onClick={handleParticiperEnquete}
                  sx={{ 
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                    px: { xs: 1.5, md: 2 },
                    py: { xs: 0.75, md: 1 },
                    minWidth: 'auto'
                  }}
                >
                  Je participe à une enquête
                </Button>
                
                <Button
                  variant="contained"
                  color="warning"
                  // startIcon={<Iconify icon="solar:heart-bold" />}
                  onClick={handlePartagerAvis}
                  sx={{ 
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                    px: { xs: 1.5, md: 2 },
                    py: { xs: 0.75, md: 1 },
                    minWidth: 'auto'
                  }}
                >
                  Partager un avis
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Modal pour saisir le code d'enquête */}
      <Dialog
        open={enqueteModalOpen}
        onClose={handleCloseEnqueteModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
          <Typography variant="h5" component="div">
            Participer à une enquête
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2, pb: 3 }}>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ textAlign: 'center', mb: 3 }}
          >
            Donnez vos avis sur l'activité/Événement
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ mb: 2, fontWeight: 500 }}
          >
            Renseigner le code de l'enquête
          </Typography>
          
          <TextField
            fullWidth
            label="Code"
            placeholder="Ex: AZ123"
            value={codeEnquete}
            onChange={(e) => setCodeEnquete(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        
        <DialogActions sx={{ justifyContent: 'center', pb: 2, gap: 1 }}>
          <Button
            onClick={handleCloseEnqueteModal}
            color="inherit"
            variant="outlined"
          >
            Annuler
          </Button>
          <Button
            onClick={handleConfirmEnquete}
            variant="contained"
            disabled={!codeEnquete.trim()}
          >
            Participer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}