'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/admin';
import { SeoIllustration } from 'src/assets/illustrations';
import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';

import { svgColorClasses } from 'src/components/svg-color';

import { useMockedUser } from 'src/auth/hooks';
import { _eventsList, EventsCarousel } from '../../organisateur/organisateur-event-carrousel';
import { SuperviseurWidgetSummary } from '../../superviseur/view/superviseur-widget-summary-2';
import { SuperviseurRevenueChart } from '../../superviseur/superviseur-revenue-chart';
import { SuperviseurDonutChart } from '../../superviseur/SuperviseurDonutChart';
import { ActivitiesList } from '../../organisateur/organisateur-activities-list';
import { MessagesList } from '../../organisateur/organisateur-messages-list'; // Nouveau composant

import { AppWidget } from '../../app/app-widget';
import { AppWelcome } from '../../app/app-welcome';
import { AppFeatured } from '../../app/app-featured';
import { AppNewInvoice } from '../../app/app-new-invoice';
import { AppTopAuthors } from '../../app/app-top-authors';
import { AppTopRelated } from '../../app/app-top-related';
import { AppAreaInstalled } from '../../app/app-area-installed';
import { AppWidgetSummary } from '../../app/app-widget-summary';
import { AppCurrentDownload } from '../../app/app-current-download';
import { AppTopInstalledCountries } from '../../app/app-top-installed-countries';

// ----------------------------------------------------------------------

// Mock data pour les messages planifiés
const MOCK_MESSAGES = [
  {
    id: 1,
    title: 'Mail d\'invitation',
    date: '10/06/2024',
    status: 'Envoyer' as const,
  },
  {
    id: 2,
    title: 'Mail de relance',
    date: '10/06/2024',
    status: 'Échec' as const,
  },
  {
    id: 3,
    title: 'Mail de bienvenue',
    date: '10/06/2024',
    status: 'Envoyer' as const,
  },
  {
    id: 4,
    title: 'Mail de confirmation',
    date: '10/06/2024',
    status: 'Envoyer' as const,
  },
];

export function OverviewOrganisateurView() {
  const { user } = useMockedUser();

  const theme = useTheme();

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <AppWelcome
            title={`Bienvenue 👋 \n ${user?.displayName}`}
            description="Vous etes connecté(e) sur votre espace organisateur"
            img={<SeoIllustration hideBackground />}
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
              categories: ['Jour 1', 'Jour 2', 'Jour 3', 'Jour 4', 'Jour 5'],
              series: [{ data: [300000, 450000, 650000, 800000, 950000] }],
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

        {/* Section des tableaux - Liste des activités et messages planifiés */}
        <Grid size={{ xs: 12, md: 6 }}>
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

        {/* Nouveau composant - Liste des messages planifiés */}
        <Grid size={{ xs: 12, md: 6 }}>
          <MessagesList
            title="Liste des messages planifiés"
            tableData={MOCK_MESSAGES}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}