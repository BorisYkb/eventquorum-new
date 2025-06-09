// superviseur/activites/participants/resultats/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import LinearProgress from '@mui/material/LinearProgress';

import { DashboardContent } from 'src/layouts/superviseur';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

export default function ResultatsPage() {
  const router = useRouter();

  // Données des résultats d'évaluation
  const evaluationResults = [
    {
      participant: 'Chonou Oriane',
      email: 'oriane.chonou@email.com',
      note: 4.5,
      progression: 95,
      statut: 'Terminé',
      commentaire: 'Excellente participation, très engagée'
    },
    {
      participant: 'Kouamé Boris Yakoué',
      email: 'kouame.boris@email.com',
      note: 4.0,
      progression: 80,
      statut: 'En cours',
      commentaire: 'Bonne participation, quelques difficultés'
    },
    {
      participant: 'Kouakou Evariste',
      email: 'kouakou.evariste@email.com',
      note: 3.5,
      progression: 70,
      statut: 'En cours',
      commentaire: 'Participation satisfaisante'
    },
    {
      participant: 'Yao Emmanuel',
      email: 'emmanuel.yao@email.com',
      note: 4.8,
      progression: 100,
      statut: 'Terminé',
      commentaire: 'Performance exceptionnelle'
    },
    {
      participant: 'Kouassi Aissatou',
      email: 'kouassi.aissatou@email.com',
      note: 3.8,
      progression: 85,
      statut: 'En cours',
      commentaire: 'Bonne amélioration continue'
    }
  ];

  const statsData = [
    {
      title: 'Participants évalués',
      value: evaluationResults.length,
      icon: 'eva:people-fill',
      color: '#1976D2',
      change: '+5.2%'
    },
    {
      title: 'Note moyenne',
      value: (evaluationResults.reduce((acc, curr) => acc + curr.note, 0) / evaluationResults.length).toFixed(1),
      icon: 'eva:star-fill',
      color: '#F57C00',
      change: '+8.1%'
    },
    {
      title: 'Taux de réussite',
      value: `${Math.round((evaluationResults.filter(r => r.statut === 'Terminé').length / evaluationResults.length) * 100)}%`,
      icon: 'eva:checkmark-circle-2-fill',
      color: '#2E7D32',
      change: '+12.3%'
    },
    {
      title: 'Progression moyenne',
      value: `${Math.round(evaluationResults.reduce((acc, curr) => acc + curr.progression, 0) / evaluationResults.length)}%`,
      icon: 'eva:trending-up-fill',
      color: '#7B1FA2',
      change: '+6.7%'
    }
  ];

  const handleExport = () => {
    alert('Export des résultats en cours...');
  };

  const getStatutColor = (statut: string) => {
    return statut === 'Terminé' ? 'success' : 'warning';
  };

  const getProgressionColor = (progression: number) => {
    if (progression >= 90) return '#2E7D32';
    if (progression >= 70) return '#F57C00';
    return '#D32F2F';
  };

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Résultats détaillés"
        links={[
          { name: 'Superviseur', href: '/superviseur' },
          { name: 'Activités', href: '/superviseur/activites' },
          { name: 'Participants', href: '/superviseur/activites/participants' },
          { name: 'Résultats' }
        ]}
        action={
          <Button
            variant="outlined"
            startIcon={<Iconify icon="eva:arrow-back-fill" />}
            onClick={() => router.back()}
          >
            Retour
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* Cartes de statistiques */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid xs={12} sm={6} md={3} key={index}>
            <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
              <Box sx={{ mb: 2 }}>
                <Iconify
                  icon={stat.icon}
                  width={48}
                  sx={{ color: stat.color, mb: 1 }}
                />
                <Typography variant="h3" sx={{ color: 'text.primary', mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  {stat.title}
                </Typography>
                <Chip
                  label={stat.change}
                  size="small"
                  color={stat.change.startsWith('+') ? 'success' : 'error'}
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tableau des résultats */}
      <Card>
        <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Résultats d'évaluation des participants
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:download-fill" />}
              onClick={handleExport}
            >
              Exporter les résultats
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: '#F5F5F5' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Participant</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Note</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Progression</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Statut</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Commentaire</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {evaluationResults.map((result, index) => (
                <TableRow key={index} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={500}>
                      {result.participant}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {result.email}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                      <Rating value={result.note} precision={0.1} size="small" readOnly />
                      <Typography variant="caption" color="text.secondary">
                        {result.note}/5
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, minWidth: 100 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {result.progression}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={result.progression}
                        sx={{
                          width: '100%',
                          height: 6,
                          borderRadius: 3,
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getProgressionColor(result.progression)
                          }
                        }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Label
                      color={getStatutColor(result.statut) as any}
                      sx={{ borderRadius: '12px' }}
                    >
                      {result.statut}
                    </Label>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 200 }}>
                      {result.commentaire}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Résumé en bas du tableau */}
        <Box sx={{ p: 3, bgcolor: '#F8F9FA', borderTop: 1, borderColor: 'divider' }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Résumé des performances
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Participants avec note ≥ 4.0:</Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {evaluationResults.filter(r => r.note >= 4.0).length} / {evaluationResults.length}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Progression moyenne:</Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {Math.round(evaluationResults.reduce((acc, curr) => acc + curr.progression, 0) / evaluationResults.length)}%
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Taux de complétion:</Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {Math.round((evaluationResults.filter(r => r.statut === 'Terminé').length / evaluationResults.length) * 100)}%
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Recommandations
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  • Organiser des sessions de rattrapage pour les participants en difficulté
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Mettre en place un système de mentorat pour améliorer l'engagement
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Adapter le contenu selon les besoins identifiés
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </DashboardContent>
  );
}
