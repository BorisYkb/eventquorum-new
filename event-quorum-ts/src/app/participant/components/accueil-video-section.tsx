
'use client';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SpeedDial from '@mui/material/SpeedDial';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import useMediaQuery from '@mui/material/useMediaQuery';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  version: 'accueil1' | 'accueil2' | 'accueil3';
  title?: string;
  coverUrl?: string;
};

export function AccueilVideoSection({ 
  version,
  title = "LE SARA, UN ÉVÉNEMENT INCONTOURNABLE",
  coverUrl = "/assets/images/mock/cover/cover-18.webp" // Placeholder
}: Props) {
  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  // La vidéo n'est visible que pour accueil1 et accueil2
  // Elle disparaît en accueil3 selon la Props type
  if (version === 'accueil3') {
    return null;
  }

  return (
    <Box
      sx={{
        ...theme.mixins.bgGradient({
          images: [
            `linear-gradient(0deg, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.64)}, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.64)})`,
            `url(${coverUrl})`,
          ],
        }),
        height: { xs: 300, md: 480 },
        overflow: 'hidden',
        borderRadius: { xs: 1, md: 2 },
        position: 'relative',
        mb: 4,
      }}
    >
      <Container sx={{ height: 1, position: 'relative' }}>
        {/* Titre central */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'common.white',
            zIndex: 2,
            width: '100%',
            px: 2,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' },
              lineHeight: { xs: 1.2, md: 1.1 },
            }}
          >
            {title}
          </Typography>
          
          <Typography
            variant="subtitle1"
            sx={{
              opacity: 0.9,
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' },
              maxWidth: 600,
              mx: 'auto',
            }}
          >
            Du 29 sept. au 08 oct.
          </Typography>
        </Box>

        {/* Bouton Play vidéo */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 20, md: 40 },
            right: { xs: 20, md: 40 },
            zIndex: 3,
          }}
        >
          <SpeedDial
            ariaLabel="Actions vidéo"
            icon={<Iconify icon="solar:play-circle-bold" width={32} />}
            direction={smUp ? 'left' : 'up'}
            sx={{
              '& .MuiSpeedDial-fab': {
                bgcolor: 'primary.main',
                '&:hover': { bgcolor: 'primary.dark' },
                width: { xs: 48, md: 56 },
                height: { xs: 48, md: 56 },
              },
            }}
          >
            <SpeedDialAction
              icon={<Iconify icon="solar:videocamera-record-bold" />}
              tooltipTitle="Voir la vidéo d'illustration"
              sx={{ 
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'action.hover' }
              }}
              onClick={() => {
                // TODO: Ouvrir modal vidéo ou redirection
                console.log('Play video');
              }}
            />
            
            <SpeedDialAction
              icon={<Iconify icon="solar:download-bold" />}
              tooltipTitle="Télécharger"
              sx={{ 
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'action.hover' }
              }}
              onClick={() => {
                // TODO: Télécharger ressources
                console.log('Download resources');
              }}
            />
          </SpeedDial>
        </Box>
      </Container>
    </Box>
  );
}