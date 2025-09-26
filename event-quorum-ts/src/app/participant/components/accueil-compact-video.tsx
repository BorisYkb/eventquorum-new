// src/app/participant/components/sara-village-hero.tsx
'use client';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';

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

  const handleWatchLive = () => {
    if (onWatchLive) {
      onWatchLive();
    }
    console.log('Watch live Sara Village event');
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
            flexDirection: { xs: 'column-reverse', md: 'row' },
            border: `solid 1px ${theme.vars.palette.grey[800]}`,
          })
        ]}
      >

        {/* Section droite : Bouton Live */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1
        }}>
          <Box
            sx={{
              bgcolor: 'error.main',
              color: 'common.white',
              width: { xs: 26, md: 25 },
              height: { xs: 26, md: 25 },
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                width: '120%',
                height: '120%',
                top: '-10%',
                left: '-10%',
                borderRadius: '50%',
                border: '2px solid',
                borderColor: 'error.main',
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
          >
          </Box>
        </Box>
        {/* Section gauche : Contenu de l'événement */}
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 1
          }}
        >
          {/* Badge de statut */}
          <Chip
            label="En cours"
            size="small"
            sx={{
              bgcolor: 'warning.main',
              color: 'common.white',
              fontSize: { xs: '0.625rem', md: '0.75rem' },
              fontWeight: 600,
              mb: 0.5
            }}
          />

          {/* Titre de l'événement */}
          <Typography
            variant="h4"
            sx={{
              whiteSpace: 'pre-line',
              mb: 1,
              fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
              fontWeight: 600,
              lineHeight: 1.3
            }}
          >
            NOCTURNES AU SARA VILLAGE (CONCERTS ET ANIMATIONS)
          </Typography>

          {/* Informations complémentaires */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 0.5, sm: 4 }, alignItems: { xs: 'center', sm: 'flex-start' } }}>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                fontSize: { xs: '0.75rem', md: '0.875rem' },
                display: 'flex',
                alignItems: 'center',
                gap: 0.5
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
                gap: 0.5
              }}
            >
              <Iconify icon="solar:map-point-outline" width={16} />
              SARA Village - Espace Culturel
            </Typography>
          </Box>
        </Box>

      </Box>
    </Grid>
  );
}