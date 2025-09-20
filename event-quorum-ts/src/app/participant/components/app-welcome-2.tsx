import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  title?: string;
  description?: string;
  img?: React.ReactNode;
  action?: React.ReactNode;
};

export function AppWelcome({ title, description, action, img, sx, ...other }: Props) {
  return (
    <Box
      sx={[
        (theme) => ({
          // Background supprimé - juste les styles de layout conservés
          pt: 2,
          pb: 5,
          pr: 3,
          gap: 5,
          borderRadius: 2,
          display: 'flex',
          height: { md: 1 },
          position: 'relative',
          pl: { xs: 3, md: 5 },
          alignItems: 'center',
          // Couleur du texte adaptée (plus de texte blanc)
          color: 'text.primary',
          textAlign: { xs: 'center', md: 'left' },
          flexDirection: { xs: 'column', md: 'row' },
          // Bordure supprimée
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
        }}
      >
        <Typography variant="h4" sx={{ whiteSpace: 'pre-line', mb: 1 }}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.64, maxWidth: 600, ...(action && { mb: 3 }) }}>
          {description}
        </Typography>

        {action && action}
      </Box>

      {/* Taille de l'image légèrement réduite : 260 → 20 */}
      {img && <Box sx={{ maxWidth: 200 }}>{img}</Box>}
    </Box>
  );
}