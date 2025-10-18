// src/app/participant/components/sara-village-hero.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { CONFIG } from 'src/global-config';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface AccueilCompactVideoProps {
  onWatchLive?: () => void;
}

/**
 * Section hero pour les nocturnes au Sara Village
 * Composant autonome sans système d'épinglage
 */
export function AccueilCompactVideo({ onWatchLive }: AccueilCompactVideoProps) {
  const router = useRouter();
  const [followLiveOpen, setFollowLiveOpen] = useState(false);

  const handleWatchLive = () => {
    setFollowLiveOpen(true);
    if (onWatchLive) {
      onWatchLive();
    }
  };

  return (
    <Grid size={12}>
      <Box
        sx={[
          (theme) => ({
            ...theme.mixins.bgGradient({
              images: [
                `linear-gradient(to right, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.88)} 0%, ${theme.vars.palette.grey[900]} 75%)`,
                `url(${CONFIG.assetsDir}/assets/background/background-5.webp)`,
              ],
            }),
            pt: { xs: 3, md: 4 },
            pb: { xs: 3, md: 4 },
            pr: 3,
            gap: { xs: 2, md: 3 },
            borderRadius: 2,
            display: 'flex',
            position: 'relative',
            pl: { xs: 3, md: 5 },
            alignItems: 'center',
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
            flexDirection: { xs: 'column', md: 'row' },
            border: `solid 1px ${theme.vars.palette.grey[800]}`,
          }),
        ]}
      >
        {/* Section principale : Contenu de l'événement */}
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 1,
          }}
        >
          {/* Badge de statut avec bouton Live à gauche */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            {/* Bouton Live - petit, à gauche du badge */}
            <Box
              sx={{
                bgcolor: 'warning.main',
                color: 'common.white',
                width: 9,
                height: 9,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: '120%',
                  height: '120%',
                  top: '-20%',
                  left: '-10%',
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: 'warning.main',
                  animation: 'pulse 2s infinite',
                },
                '@keyframes pulse': {
                  '0%': {
                    transform: 'scale(1)',
                    opacity: 0.7,
                  },
                  '100%': {
                    transform: 'scale(1.4)',
                    opacity: 0,
                  },
                },
              }}
            />

            {/* Badge de statut */}
            <Chip
              label="En cours"
              size="small"
              sx={{
                bgcolor: 'warning.main',
                color: 'common.white',
                fontSize: { xs: '0.625rem', md: '0.75rem' },
                fontWeight: 600,
              }}
            />
          </Box>

          {/* Titre de l'événement */}
          <Typography
            variant="h4"
            sx={{
              whiteSpace: 'pre-line',
              mb: 1,
              fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
              fontWeight: 600,
              lineHeight: 1.3,
            }}
          >
            NOCTURNES AU SARA VILLAGE (CONCERTS ET ANIMATIONS)
          </Typography>

          {/* Informations complémentaires */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 0.5, sm: 4 },
              alignItems: { xs: 'center', sm: 'flex-start' },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                fontSize: { xs: '0.75rem', md: '0.875rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <Iconify icon="solar:clock-circle-outline" width={16} />
              19h00 - 22h00
            </Typography>

            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                fontSize: { xs: '0.75rem', md: '0.875rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <Iconify icon="solar:map-point-outline" width={16} />
              SARA Village - Espace Culturel
            </Typography>
          </Box>

          {/* Bouton "Voir le direct" */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleWatchLive}
            // startIcon={<Iconify icon="solar:play-circle-bold" width={20} />}
            sx={{
              mt: 2,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' },
              px: 2,
              py: 1,
              borderRadius: 1,
            }}
          >
            Voir le direct
          </Button>
        </Box>
      </Box>

      {/* Dialog suivi en direct */}
      <Dialog open={followLiveOpen} onClose={() => setFollowLiveOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center' }}>
          Autorisation pour vous inscrire sur liste d'émargement
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', py: 2 }}>
          En cliquant sur le bouton "suivre en direct" vous acceptez d'être inscrit sur la liste de
          présence
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFollowLiveOpen(false)}>Annuler</Button>
          <Button
            variant="contained"
            onClick={() => {
              router.push('/participant/enligne/payer/suivredirecte');
              setFollowLiveOpen(false);
            }}
          >
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}