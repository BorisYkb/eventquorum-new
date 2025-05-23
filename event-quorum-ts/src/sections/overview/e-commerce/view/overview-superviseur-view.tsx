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
import { ParticipantsList } from '../../superviseur/superviseur-demandes-list';

// ----------------------------------------------------------------------

export function OverviewSuperviseurView() {
  const { user } = useMockedUser();
  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <EcommerceWelcome
            title={`Bienvenue 👋\n${user?.displayName}`}
            description="Vous êtes connecté(e) sur l'espace Superviseur de votre évènement."
            img={<MotivationIllustration hideBackground />}
          />
        </Grid>

        {/* Widgets Résumés */}
        <Grid xs={12} md={3}>
          <SuperviseurWidgetSummary title="Demandes d'inscription" total={128} />
        </Grid>

        <Grid xs={12} md={3}>
          <SuperviseurWidgetSummary title="Invités" total={86} />
        </Grid>

        <Grid xs={12} md={3}>
          <SuperviseurWidgetSummary title="Participants" total={64} />
        </Grid>
        <Grid xs={12} md={3}>
          <SuperviseurWidgetSummary title="Activités" subtitle="6 payantes / 12 total" total={12} />
        </Grid>

        <Grid xs={12} md={3}>
          <SuperviseurWidgetSummary
            title="Montant reçu"
            total={1850000}
            unit="FCFA"
            color={theme.palette.primary.main}
          />
        </Grid>

        <Grid xs={12} md={3}>
          <SuperviseurWidgetSummary title="Enquêtes" subtitle="5 réalisées / 10 prévues" total={10} />
        </Grid>

        <Grid xs={12}>
          <EventsYearlyAnalytics
            title="Statistiques Annuelles de l'Évènement"
            subheader="Analyse multi-métrique sur les 12 derniers mois"
            chart={{
              categories: [
                'Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin',
                'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc',
              ],
              series: [
                {
                  name: '2025',
                  data: [
                    {
                      name: "Activités",
                      data: [2, 4, 3, 5, 6, 7, 8, 10, 9, 8, 6, 5],
                      isDisplayed: true,
                    },
                    {
                      name: "Participants Effectifs",
                      data: [80, 100, 90, 120, 140, 160, 180, 200, 190, 170, 150, 140],
                      isDisplayed: true,
                    },
                    {
                      name: "Invités",
                      data: [30, 35, 40, 45, 50, 55, 60, 65, 60, 55, 50, 45],
                      isDisplayed: true,
                    },
                    {
                      name: "Participation (%)",
                      data: [60, 62, 64, 66, 68, 70, 72, 74, 76, 75, 73, 70],
                      isDisplayed: true,
                    }
                  ]
                },
                {
                  name: '2024',
                  data: [
                    {
                      name: "Activités",
                      data: [1, 3, 2, 4, 5, 5, 6, 7, 6, 5, 4, 3],
                      isDisplayed: true,
                    },
                    {
                      name: "Participants Effectifs",
                      data: [60, 75, 70, 85, 95, 105, 120, 130, 125, 115, 100, 95],
                      isDisplayed: true,
                    },
                    {
                      name: "Invités",
                      data: [25, 30, 35, 38, 40, 45, 50, 52, 50, 48, 45, 40],
                      isDisplayed: true,
                    },
                    {
                      name: "Participation (%)",
                      data: [55, 57, 58, 60, 62, 63, 65, 66, 68, 67, 65, 62],
                      isDisplayed: true,
                    }
                  ]
                }
              ]
            }}
          />
        </Grid>

        {/* Graphiques */}
        <Grid xs={12} md={6}>
          <SuperviseurRevenueChart
            title="Évolution des revenus"
            chart={{
              categories: ['Jour 1', 'Jour 2', 'Jour 3', 'Jour 4'],
              series: [{ data: [300000, 450000, 600000, 500000] }],
            }}
          />
        </Grid>

        <Grid xs={12} md={6}>
          <SuperviseurActivitiesChart
            title="Répartition des activités"
            chart={{
              series: [
                { label: 'Payantes', value: 6 },
                { label: 'Gratuites', value: 6 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6}>
          <SuperviseurEnqueteChart
            title="Suivi des enquêtes"
            chart={{
              series: [
                { label: 'Réalisées', value: 5 },
                { label: 'Planifiées', value: 5 },
              ],
            }}
          />
        </Grid>

        {/* Liste des demandes de participant */}
        <Grid size={{ xs: 12, md: 12, lg: 12 }}>
          <ParticipantsList
            title="Liste des derniers demandes de participation"
            tableData={[
              { name: 'Jean Kouadio', email: 'jean@gmail.com', telephone: '0765645464', date: '2025-05-12', statut: 'Acceptée' },
              { name: 'Fatou Camara', email: 'fatou@gmail.com', telephone: '0576575676', date: '2025-05-10', statut: 'Rejetée' },
              { name: 'Ali Diabaté', email: 'ali@gmail.com', telephone: '0152835473', date: '2025-05-08', statut: 'En attente' },
              { name: 'Ali Diakité', email: 'diakite@gmail.com', telephone: '0765209735', date: '2025-05-05', statut: 'Acceptée' },
            ]}
            headCells={[
              { id: 'name', label: 'Nom' },
              { id: 'email', label: 'Email' },
              { id: 'telephone', label: 'Téléphone' },
              { id: 'date', label: "Date" },
              { id: 'statut', label: 'Statut' },

            ]}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
