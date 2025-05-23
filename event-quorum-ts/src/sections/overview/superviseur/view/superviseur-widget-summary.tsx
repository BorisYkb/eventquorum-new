'use client';

import { Card, Box, Typography } from '@mui/material';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

type Props = {
  title: string;
  subtitle?: string;
  total: number;
  unit?: string;
  color?: string;
  sx?: SxProps<Theme>;
};

export function SuperviseurWidgetSummary({
  title,
  subtitle,
  total,
  unit,
  color,
  sx,
}: Props) {
  const theme = useTheme();

  return (
    <Card
      sx={[
        {
          p: 3,
          height: 145,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          bgcolor: theme.palette.background.paper,
          borderRadius: 2,
          boxShadow: theme.shadows[2],
          textAlign: 'left',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>

      {typeof total !== 'undefined' && (
        <Typography
          variant="h4"
          sx={{ my: 1, color: color ?? theme.palette.text.primary }}
        >
          {total.toLocaleString('fr-FR')} {unit && <Typography component="span" variant="h6">{unit}</Typography>}
        </Typography>
      )}

      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Card>
  );
}
