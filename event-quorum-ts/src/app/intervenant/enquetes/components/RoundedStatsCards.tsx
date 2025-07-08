// components/RoundedStatsCards.tsx
import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

interface StatsData {
  title: string;
  value: number;
  variant: 'primary' | 'secondary';
}

interface RoundedStatsCardsProps {
  stats: StatsData[];
}

const RoundedStatsCards: React.FC<RoundedStatsCardsProps> = ({ stats }) => {
  const getCardStyle = (variant: 'primary' | 'secondary') => {
    if (variant === 'primary') {
      return {
        backgroundColor: '#e3f2fd',
        border: '2px solid #bbdefb'
      };
    }
    return {
      backgroundColor: '#f5f5f5',
      border: '2px solid #e0e0e0'
    };
  };

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat, index) => (
        <Grid key={index} size={3}>
          <Card sx={{
            p: 3,
            textAlign: 'center',
            borderRadius: 3,
            ...getCardStyle(stat.variant)
          }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'medium', color: '#666' }}>
              {stat.title}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>
              {stat.value}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RoundedStatsCards;
