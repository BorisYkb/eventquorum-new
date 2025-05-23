'use client';

import { Card, CardHeader, CardContent } from '@mui/material';
import {Chart, useChart } from 'src/components/chart';

type Props = {
  title: string;
  subheader?: string;
  chart: {
    series: { label: string; value: number }[];
  };
};

export function SuperviseurEnqueteChart({ title, subheader, chart }: Props) {
  const labels = chart.series.map((item) => item.label);
  const values = chart.series.map((item) => item.value);

  const chartOptions = useChart({
    chart: {
      type: 'pie',
    },
    labels,
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} enquête${val > 1 ? 's' : ''}`,
      },
    },
    colors: ['#1890FF', '#FFC0CB'], // Réalisées = bleu, Planifiées = rose clair
  });

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <CardContent>
        <Chart
          type="pie"
          series={values}
          options={chartOptions}
          height={320}
        />
      </CardContent>
    </Card>
  );
}
