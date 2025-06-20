import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: {
      label: string;
      value: number;
      color?: string;
    }[];
    options?: ChartOptions;
  };
};

export function SuperviseurDonutChart({ title, subheader, chart, ...other }: Props) {
  const theme = useTheme();

  const chartSeries = chart.series.map((item) => item.value);
  const chartLabels = chart.series.map((item) => item.label);
  const chartColors = chart.series.map((item) => item.color || theme.palette.primary.main);

  const total = chartSeries.reduce((sum, value) => sum + value, 0);

  const chartOptions = useChart({
    colors: chartColors,
    labels: chartLabels,
    stroke: {
      width: 0,
    },
    fill: {
      type: 'solid',
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value}`,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              fontSize: '14px',
              fontWeight: 600,
              color: theme.palette.text.secondary,
              formatter: () => total.toString(),
            },
            value: {
              show: true,
              fontSize: '24px',
              fontWeight: 700,
              color: theme.palette.text.primary,
              formatter: (val: string) => {
                // Affiche la valeur de la section survolée
                return val;
              },
            },
          },
        },
      },
    },
    legend: {
      show: false, // Désactiver la légende par défaut d'ApexCharts
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'darken',
        },
      },
    },
    ...chart.options,
  });

  // Légende personnalisée avec les couleurs et valeurs
  const renderLegend = (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 2,
        mt: 2,
      }}
    >
      {chart.series.map((item, index) => (
        <Box
          key={item.label}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: item.color || chartColors[index],
            }}
          />
          <Box sx={{ typography: 'body2', color: 'text.secondary' }}>
            {item.label} ({item.value})
          </Box>
        </Box>
      ))}
    </Box>
  );

  return (
    <Card {...other}>
      {title && <CardHeader title={title} subheader={subheader} />}

      <Box sx={{ mx: 3, mt: title ? 0 : 3 }}>
        <Chart
          type="donut"
          series={chartSeries}
          options={chartOptions}
        />
        {renderLegend}
      </Box>
    </Card>
  );
}