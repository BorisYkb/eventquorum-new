'use client';

import { Card, CardHeader, CardContent } from '@mui/material';
import { Chart, useChart } from 'src/components/chart';

type Props = {
  title: string;
  subheader?: string;
  chart: {
    categories: string[];
    series: { data: number[] }[];
  };
};

export function SuperviseurRevenueChart({ title, subheader, chart }: Props) {
  const chartOptions = useChart({
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
        borderRadius: 4,
      },
    },
    xaxis: {
      categories: chart.categories,
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    tooltip: {
      y: {
        formatter: (value: number) => `${value.toLocaleString()} FCFA`,
        title: {
          formatter: () => 'Revenu',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `${value / 1000}k`,
      },
    },
  });

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <Chart
          type="bar"
          series={[{ name: 'Revenu', ...chart.series[0] }]}
          options={chartOptions}
          height={350}
        />
      </CardContent>
    </Card>
  );
}
