'use client';

import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/admin';
import { MotivationIllustration } from 'src/assets/illustrations';
import {
    _ecommerceNewProducts,
    _ecommerceBestSalesman,
    _ecommerceSalesOverview,
    _ecommerceLatestProducts,
    _bookingsOverview,
    // _lastFiveEvents,
} from 'src/_mock';

import { useMockedUser } from 'src/auth/hooks';

import { EcommerceWelcome } from '../ecommerce-welcome';
import { AdminTotalIncomes } from '../../admin/admin-total-incomes';
import { EventNumberByState } from '../../admin/admin-event-by-state';
import { AdminCurrentBalance } from '../../admin/admin-current-balance';
import { AdminWidgetSummary } from '../../admin/view/admin-widget-summary';
import { _eventsList, EventsCarousel } from '../../admin/admin-event-carousel';
import { EventsList, _lastFiveEvents } from '../../admin/admin-last-five-event';
import { EventsYearlyAnalytics } from '../../admin/admin-event-yearly-analytics';
import { PAYMENT_DATA, PaymentMethodsList } from '../../admin/admin-sales-overview';
// ----------------------------------------------------------------------

export function OverviewAdminView() {
    const { user } = useMockedUser();
    const theme = useTheme();

    return (
        <DashboardContent maxWidth="xl">
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <EcommerceWelcome
                        title={`Bienvenue 🎉  \n ${user?.displayName}`}
                        description="Vous êtes connecté(e) sur l'espace Administrateur..."
                        img={<MotivationIllustration hideBackground />}
                    />
                </Grid>

                {/* <Grid size={{ xs: 12, md: 4 }}>
                    <EcommerceNewProducts list={_ecommerceNewProducts} />
                </Grid> */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <EventsCarousel list={_eventsList} />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <AdminWidgetSummary
                        title="Clients"
                        // percent={2.6}
                        total={84}
                        chart={{
                            categories: ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août'],
                            series: [22, 8, 35, 50, 82, 84, 77, 12],
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <AdminWidgetSummary
                        title="Evènements"
                        // percent={-0.1}
                        total={187}
                        chart={{
                            colors: [theme.palette.warning.light, theme.palette.warning.main],
                            categories: ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août'],
                            series: [56, 47, 40, 62, 73, 30, 23, 54],
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <AdminWidgetSummary
                        title="Invités (moy)"
                        // isPercentage={true}
                        percent={90}
                        total={1753987}
                    // chart={{
                    //     colors: [theme.palette.info.light, theme.palette.info.main],
                    //     categories: ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août'],
                    //     series: [56, 47, 40, 62, 73, 30, 23, 54],
                    // }}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <AdminWidgetSummary
                        title="Participants (moy)"
                        percent={60}
                        total={547090}
                        totalColor={theme.palette.primary.main}
                    />
                </Grid>



                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <EventNumberByState
                        title="Nbre d'évènements par statut"
                        total={187}
                        chart={{
                            // colors: [['yellow'], ['red'], ['green']],
                            series: [
                                { label: 'Terminé', value: 75 },
                                { label: 'Non-démarré', value: 54 },
                                { label: 'En cours', value: 59 },
                            ],
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 8 }}>
                    <EventsYearlyAnalytics
                        title="Événements annuels"
                        subheader="(+5%) de participation par rapport à l'année dernière"
                        chart={{
                            categories: [
                                'Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin',
                                'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc',
                            ],
                            series: [
                                {
                                    name: '2023',
                                    data: [
                                        {
                                            name: "Evénements",
                                            data: [8, 10, 12, 15, 18, 22, 25, 28, 30, 40, 15, 12],
                                            isDisplayed: true,
                                        },
                                        {
                                            name: "Taux de participation",
                                            data: [70, 75, 80, 85, 88, 92, 95, 96, 98, 85, 80, 75],
                                            isDisplayed: true,
                                        },
                                        {
                                            name: "Participants (moy)",
                                            data: [60, 65, 70, 75, 80, 85, 90, 95, 150, 85, 75, 70],
                                            isDisplayed: false,
                                        },
                                        {
                                            name: "Invités (moy)",
                                            data: [30, 35, 40, 45, 50, 55, 60, 65, 70, 55, 45, 40],
                                            isDisplayed: false,
                                        }
                                    ]
                                },
                                {
                                    name: '2022',
                                    data: [
                                        {
                                            name: "Evénements",
                                            data: [5, 8, 6, 10, 12, 15, 18, 20, 25, 12, 8, 40],
                                            isDisplayed: true,
                                        },
                                        {
                                            name: "Taux de participation",
                                            data: [65, 70, 75, 80, 85, 90, 88, 92, 95, 78, 72, 70],
                                            isDisplayed: true,
                                        },
                                        {
                                            name: "Participants (moy)",
                                            data: [55, 60, 65, 70, 75, 80, 83, 88, 90, 75, 65, 60],
                                            isDisplayed: true,
                                        },
                                        {
                                            name: "Invités (moy)",
                                            data: [25, 30, 35, 40, 45, 50, 48, 52, 55, 40, 32, 30],
                                            isDisplayed: true,
                                        }
                                    ]
                                },
                                {
                                    name: '2021',
                                    data: [
                                        {
                                            name: "Evénements",
                                            data: [3, 5, 4, 8, 10, 12, 15, 40, 20, 10, 6, 8],
                                            isDisplayed: true,
                                        },
                                        {
                                            name: "Taux de participation",
                                            data: [60, 65, 70, 75, 80, 85, 82, 88, 90, 75, 68, 65],
                                            isDisplayed: true,
                                        },
                                        {
                                            name: "Participants (moy)",
                                            data: [50, 55, 60, 65, 70, 75, 78, 82, 85, 70, 60, 55],
                                            isDisplayed: true,
                                        },
                                        {
                                            name: "Invités (moy)",
                                            data: [20, 25, 30, 35, 40, 45, 42, 48, 50, 35, 28, 25],
                                            isDisplayed: true,
                                        }
                                    ]
                                }
                            ]
                        }}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <AdminTotalIncomes
                        title="Bilan financier"
                        total={15650000}
                        // percent={2.6}
                        chart={{
                            categories: ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin',
                                'Juil', 'Août', 'Sept'],
                            series: [{ data: [120000, 150000, 180000, 220000, 250000, 300000, 280000, 260000, 310000] }],
                        }}                   
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 8 }}>
                    <PaymentMethodsList title="Les moyens de paiement" data={PAYMENT_DATA} />
                </Grid>



                {/* </Grid> */}


                <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                    <EventsList
                        title="Liste des 5 derniers évènements"
                        tableData={_lastFiveEvents}
                        headCells={[
                            { id: 'title', label: "Nom d'évènement" },
                            { id: 'startDate', label: 'Date de début' },
                            { id: 'endDate', label: 'Date de fin' },
                            { id: 'status', label: 'Statut' },
                        ]}
                    />
                </Grid>
            </Grid>
        </DashboardContent>
    );
}