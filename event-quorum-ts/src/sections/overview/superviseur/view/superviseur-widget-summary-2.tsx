import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { alpha, useTheme } from '@mui/material/styles';

import { fNumber, fPercent, fShortenNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export type SuperviseurWidgetSummaryProps = BoxProps & {
  title: string;
  total: number;
  unit?: string;
  subtitle?: string;
  percent?: number;
  color?: string;
  icon?: string;
  chart?: {
    categories: string[];
    series: number[];
  };
};

export function SuperviseurWidgetSummary({
  icon = 'solar:users-group-rounded-bold-duotone',
  title,
  total,
  unit,
  subtitle,
  percent,
  color,
  chart,
  sx,
  ...other
}: SuperviseurWidgetSummaryProps) {
  const theme = useTheme();

  const renderTrend = percent && (
    <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
      <Iconify
        width={24}
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
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        pl: 3,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      <Box>
        <Box sx={{ typography: 'h3', mb: 1 }}>
          {fShortenNumber(total)}
          {unit && (
            <Box component="span" sx={{ color: 'text.secondary', typography: 'body2', ml: 1 }}>
              {unit}
            </Box>
          )}
        </Box>

        <Box sx={{ color: 'text.secondary', typography: 'subtitle2' }}>{title}</Box>

        {subtitle && (
          <Box sx={{ color: 'text.disabled', typography: 'body2', mt: 0.5 }}>
            {subtitle}
          </Box>
        )}

        {renderTrend}
      </Box>


    </Card>
  );
}