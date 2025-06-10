'use client';

import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/superviseur';
import { MotivationIllustration } from 'src/assets/illustrations';

import { useMockedSuperviseur } from 'src/auth/hooks';

import { EcommerceWelcome } from '../ecommerce-welcome';
import { SuperviseurWidgetSummary } from '../../superviseur/view/superviseur-widget-summary-2';
import { SuperviseurRevenueChart } from '../../superviseur/superviseur-revenue-chart';
import { SuperviseurDonutChart } from '../../superviseur/SuperviseurDonutChart';
import { ActivitiesList } from '../../superviseur/superviseur-activities-list';
import { FicheClientHomeWidget } from 'src/sections/gestionclient/ficheclient/ficheclient-home-widget';

// ----------------------------------------------------------------------

export function OverviewSuperviseurView() {
  const { superviseur } = useMockedSuperviseur();
  const theme = useTheme();

  // Couleur de fond alternée pour les widgets
  const alternateColor = '#BCDFFB';

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <EcommerceWelcome
            title={`Bienvenue 👋\n${superviseur?.displayName}`}
            description="Vous êtes connecté(e) sur l'espace Superviseur de votre évènement."
            img={<MotivationIllustration hideBackground />}
          />
        </Grid>

        {/* Widgets Résumés - 3 par ligne sur 2 lignes avec couleurs alternées */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SuperviseurWidgetSummary
            title="Demandes d'inscription"
            total={128}
            color="secondary"
            sx={{ height: 180 }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SuperviseurWidgetSummary
            title="Invités"
            total={86}
            color="primary"
            sx={{ height: 180 }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SuperviseurWidgetSummary
            title="Participants"
            total={64}
            color="success"
            sx={{ height: 180 }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SuperviseurWidgetSummary
            title="Activités"
            subtitle="6 payantes / 12 total"
            total={12}
            color="warning"
            sx={{ height: 180 }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SuperviseurWidgetSummary
            title="Montant reçu"
            total={1850000}
            unit="FCFA"
            subtitle="1 000 tickets achetés"
            color="error"
            sx={{ height: 180 }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SuperviseurWidgetSummary
            title="Enquêtes"
            subtitle="5 réalisées / 10 prévues"
            total={10}
            color="info"
            sx={{ height: 180 }}
          />
        </Grid>

        {/* Graphiques - 3 sur la même ligne */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SuperviseurRevenueChart
            title="Évolution des revenus"
            chart={{
              categories: ['Jour 1', 'Jour 2', 'Jour 3', 'Jour 4'],
              series: [{ data: [300000, 450000, 600000, 500000] }],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SuperviseurDonutChart
            title="Répartition des activités"
            chart={{
              series: [
                { label: 'Payantes', value: 9, color: '#4ade80' },
                { label: 'Gratuites', value: 3, color: '#fbbf24' },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SuperviseurDonutChart
            title="Suivi des enquêtes"
            chart={{
              series: [
                { label: 'Réalisées', value: 5, color: '#4ade80' },
                { label: 'Planifiées', value: 8, color: '#fb7185' },
              ],
            }}
          />
        </Grid>

        {/* Liste des activités */}
        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <ActivitiesList
            title="Liste des activités"
            tableData={[
              {
                name: 'Workshop cyber',
                link: 'https://www.youtube.com',
                status: 'Terminé',
                hasVideo: true,
                hasDocument: true
              },
              {
                name: 'Workshop Dev',
                link: 'https://www.youtube.com',
                status: 'En cours',
                hasVideo: true,
                hasDocument: true
              },
              {
                name: 'Workshop cyber',
                link: 'https://www.youtube.com',
                status: 'Non démarrer',
                hasVideo: false,
                hasDocument: true
              },
            ]}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}