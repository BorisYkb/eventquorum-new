'use client';

import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme, alpha as hexAlpha } from '@mui/material/styles';

import { fPercent, fFCFA } from 'src/utils/format-number';

import { CONFIG } from 'src/global-config';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
    title: string;
    chart: {
        colors?: string[];
        categories: string[];
        series: {
            data: number[];
        }[];
        options?: ChartOptions;
    };
};

export function SuperviseurRevenueChart({ title, chart, sx, ...other }: Props) {
    const theme = useTheme();

    // Calculer le total et le pourcentage d'évolution
    const data = chart.series[0]?.data || [];
    const total = data.length > 0 ? data[data.length - 1] : 0;
    const previousValue = data.length > 1 ? data[data.length - 2] : data[0] || 1;
    const percent = previousValue > 0 ? ((total - previousValue) / previousValue) * 100 : 0;

    const chartColors = chart.colors ?? [theme.palette.primary.main];

    const chartOptions = useChart({
        chart: { sparkline: { enabled: true } },
        colors: chartColors,
        stroke: { width: 3 },
        grid: {
            padding: {
                top: 6,
                left: 6,
                right: 6,
                bottom: 6,
            },
        },
        xaxis: { categories: chart.categories },
        tooltip: {
            y: { formatter: (value: number) => fFCFA(value), title: { formatter: () => '' } },
        },
        markers: {
            strokeColors: theme.vars.palette.primary.darker,
        },
        ...chart.options,
    });

    const renderTrending = () => (
        <Box
            sx={{
                gap: 0.5,
                display: 'flex',
                alignItems: 'flex-end',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    gap: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    typography: 'subtitle2',
                }}
            >
                <Iconify icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'} />
                <Box component="span">
                    {percent > 0 && '+'}
                    {fPercent(percent)}
                </Box>
            </Box>

            <Box component="span" sx={{ opacity: 0.64, typography: 'body2' }}>
                que période précédente
            </Box>
        </Box>
    );

    return (
        <Card
            sx={[
                () => ({
                    p: 3,
                    borderRadius: 2,
                    boxShadow: 'none',
                    color: 'primary.lighter',
                    height: 350,
                    bgcolor: 'primary.darker',
                }),
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Box sx={{ mb: 2, typography: 'subtitle2' }}>{title}</Box>

                    <Box sx={{ fontSize: 28, lineHeight: 1.50, fontWeight: 700 }}>{fFCFA(total)}</Box>
                </div>

                {renderTrending()}
            </Box>

            <Chart type="line" series={chart.series} options={chartOptions} sx={{ mt: 1, height: 120 }} />

            <SvgColor
                src={`${CONFIG.assetsDir}/assets/background/shape-square.svg`}
                sx={{
                    top: 0,
                    left: 0,
                    width: 280,
                    zIndex: -1,
                    height: 280,
                    opacity: 0.08,
                    position: 'absolute',
                    color: 'primary.lighter',
                    transform: 'rotate(90deg)',
                }}
            />
            <SvgColor
                src={`${CONFIG.assetsDir}/assets/background/shape-square.svg`}
                sx={{
                    bottom: 0,
                    right: 0,
                    width: 280,
                    zIndex: -1,
                    height: 280,
                    opacity: 0.08,
                    position: 'absolute',
                    color: 'primary.lighter',
                }}
            />
        </Card>
    );
}