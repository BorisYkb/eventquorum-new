'use client';

import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/superviseur';
import { MotivationIllustration } from 'src/assets/illustrations';
import { EventsYearlyAnalytics } from 'src/sections/overview/admin/admin-event-yearly-analytics';

import { useMockedUser } from 'src/auth/hooks';

import { EcommerceWelcome } from '../ecommerce-welcome';
import { SuperviseurWidgetSummary } from '../../superviseur/view/superviseur-widget-summary';
import { SuperviseurRevenueChart } from '../../superviseur/superviseur-revenue-chart';
import { SuperviseurActivitiesChart } from '../../superviseur/SuperviseurActivitiesChart';
import { SuperviseurEnqueteChart } from '../../superviseur/superviseur-enquete-chart';
import { ActivitiesList } from '../../superviseur/superviseur-activities-list';

// ----------------------------------------------------------------------

export function OverviewSuperviseurView() {
  const { user } = useMockedUser();
  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <EcommerceWelcome
            title={`Bienvenue 👋\n${user?.displayName}`}
            description="Vous êtes connecté(e) sur l'espace Superviseur de votre évènement."
            img={<MotivationIllustration hideBackground />}
          />
        </Grid>

        {/* Widgets Résumés - 3 par ligne sur 2 lignes */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SuperviseurWidgetSummary title="Demandes d'inscription" total={128} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SuperviseurWidgetSummary title="Invités" total={86} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SuperviseurWidgetSummary title="Participants" total={64} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SuperviseurWidgetSummary title="Activités" subtitle="6 payantes / 12 total" total={12} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SuperviseurWidgetSummary
            title="Montant reçu"
            total={1850000}
            unit="FCFA"
            color={theme.palette.primary.main}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SuperviseurWidgetSummary title="Enquêtes" subtitle="5 réalisées / 10 prévues" total={10} />
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
          <SuperviseurActivitiesChart
            title="Répartition des activités"
            chart={{
              series: [
                { label: 'Payantes', value: 9 },
                { label: 'Gratuites', value: 3 },
              ],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SuperviseurEnqueteChart
            title="Suivi des enquêtes"
            chart={{
              series: [
                { label: 'Réalisées', value: 5 },
                { label: 'Planifiées', value: 8 },
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
            headCells={[
              { id: 'name', label: 'Activités' },
              { id: 'status', label: 'Statut' },
            ]}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}