// src/app/participant/components/survey-status-analytic.tsx
'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';

import { varAlpha } from 'minimal-shared/utils';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface SurveyStatusAnalyticProps {
  icon: string;
  title: string;
  value: string;
  color?: string;
  subtitle?: string;
}

/**
 * Composant d'affichage des statistiques d'enquête
 * Version simplifiée sans CircularProgress
 */
export function SurveyStatusAnalytic({ 
  title, 
  value, 
  icon, 
  color = 'primary.main',
  subtitle 
}: SurveyStatusAnalyticProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  /**
   * Calcule les tailles responsives
   */
  const getResponsiveSizes = () => {
    if (isMobile) {
      return {
        iconSize: 24,
        titleFont: { fontSize: '0.75rem', fontWeight: 500 },
        valueFont: { fontSize: '1rem', fontWeight: 600 },
        subtitleFont: { fontSize: '0.65rem', fontWeight: 400 },
        padding: 1.5,
        gap: 1
      };
    }
    
    return {
      iconSize: 32,
      titleFont: { fontSize: '0.875rem', fontWeight: 500 },
      valueFont: { fontSize: '1.25rem', fontWeight: 600 },
      subtitleFont: { fontSize: '0.75rem', fontWeight: 400 },
      padding: 2,
      gap: 1.5
    };
  };

  const sizes = getResponsiveSizes();

  return (
    <Box
      sx={{
        width: 1,
        minWidth: isMobile ? 140 : 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: sizes.gap,
        p: sizes.padding,
        bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
      }}
    >
      {/* Icône */}
      <Box
        sx={{
          width: sizes.iconSize + 8,
          height: sizes.iconSize + 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          bgcolor: (theme) => varAlpha(color === 'success.main' ? theme.vars.palette.success.mainChannel : theme.vars.palette.grey['500Channel'], 0.12),
        }}
      >
        <Iconify 
          icon={icon} 
          width={sizes.iconSize} 
          sx={{ color }} 
        />
      </Box>

      {/* Contenu */}
      <Stack spacing={0.2} sx={{ flex: 1 }}>
        <Typography 
          variant="subtitle2" 
          sx={{
            ...sizes.titleFont,
            color: 'text.secondary'
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{
            ...sizes.valueFont,
            color: color === 'success.main' ? 'success.main' : 'text.primary'
          }}
        >
          {value}
        </Typography>
        
        {subtitle && (
          <Typography 
            variant="caption" 
            sx={{
              ...sizes.subtitleFont,
              color: 'text.disabled'
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}