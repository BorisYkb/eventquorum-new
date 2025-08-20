// File: src/components/widget-summary/WidgetSummary.tsx

import type { BoxProps } from '@mui/material/Box';
import type { PaletteColorKey } from 'src/theme/core';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Card, { CardProps } from '@mui/material/Card';

import { fNumber, fPercent } from 'src/utils/format-number';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

export type WidgetSummaryProps = CardProps & {
  title: string;
  total: number | string; // ✅ Seule modification : accepte string aussi
  unit?: string;
  subtitle?: string;
  percent?: number;
  color?: PaletteColorKey;
  icon?: string;
  chart?: {
    categories: string[];
    series: number[];
  };
};

export function WidgetSummary({
  icon = 'solar:users-group-rounded-bold-duotone',
  title,
  total,
  unit,
  subtitle,
  percent,
  color = 'primary',
  chart,
  sx,
  ...other
}: WidgetSummaryProps) {
  const theme = useTheme();

  const renderTrending = percent && (
    <Box
      sx={{
        top: 16,
        gap: 0.5,
        right: 16,
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
      }}
    >
      <Iconify
        width={20}
        icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'}
        sx={{ color: percent < 0 ? 'error.main' : 'success.main' }}
      />
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {percent > 0 && '+'}
        {fPercent(percent)}
      </Box>
    </Box>
  );

  return (
    <Card
      sx={[
        () => ({
          p: 3,
          boxShadow: 'none',
          position: 'relative',
          color: `${color}.darker`,
          backgroundColor: 'common.white',
          backgroundImage: (() => {
            const paletteColor = theme.vars.palette[color as keyof typeof theme.vars.palette] as any;
            const lighterChannel = paletteColor?.lighterChannel ?? '';
            const lightChannel = paletteColor?.lightChannel ?? '';
            if (lighterChannel && lightChannel) {
              return `linear-gradient(135deg, ${varAlpha(lighterChannel, 0.48)}, ${varAlpha(lightChannel, 0.48)})`;
            }
            return 'none';
          })(),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {renderTrending}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          height: '100%',
          minHeight: 120,
        }}
      >
        {/* Titre en haut */}
        <Box sx={{ mb: 'auto', pt: 2 }}>
          <Box sx={{ typography: 'subtitle2', mb: 0.5 }}>{title}</Box>
        </Box>
        {/* Nombre et subtitle en bas */}
        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ typography: 'h3', mb: 0.5 }}>
            {/* ✅ Seule modification : affichage direct si string, sinon fNumber */}
            {typeof total === 'string' ? total : fNumber(total)}
            {unit && (
              <Box component="span" sx={{ color: 'text.secondary', typography: 'body2', ml: 1 }}>
                {unit}
              </Box>
            )}
          </Box>
          {subtitle && (
            <Box sx={{ color: 'text.disabled', typography: 'body2' }}>
              {subtitle}
            </Box>
          )}
        </Box>
      </Box>
      <SvgColor
        src={`${CONFIG.assetsDir}/assets/background/shape-square.svg`}
        sx={{
          top: 0,
          left: -20,
          width: 220,
          zIndex: -1,
          height: 220,
          opacity: 0.24,
          position: 'absolute',
          color: `${color}.main`,
        }}
      />
    </Card>
  );
}