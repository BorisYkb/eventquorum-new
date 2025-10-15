'use client';

import { useTheme } from '@mui/material/styles';
import { 
    Box, 
    Button, 
    Card, 
    CardHeader, 
    Divider, 
    Stack, 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Paper
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/admin';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { FicheClientEventWidget } from 'src/sections/gestionclient/ficheclient/ficheclient-event-tab-widget';

// ----------------------------------------------------------------------

// Mock data for payment methods
const paymentMethods = [
    { name: 'Espèces (guichet de paiement)', transactions: 20, amount: '200 000' },
    { name: 'Orange Money', transactions: 20, amount: '200 000' },
    { name: 'MTN Money', transactions: 20, amount: '200 000' },
    { name: 'Moov Money', transactions: 20, amount: '200 000' },
    { name: 'Wave', transactions: 20, amount: '200 000' },
];

// Mock data for activities
const activitiesData = [
    {
        id: 1,
        name: 'Workshop cyber',
        places: '20/25',
        receivedAmount: '300 000 FCFA',
        expectedAmount: '300 000 FCFA',
        status: 'Terminé',
        statusColor: 'error' as const,
    },
    {
        id: 2,
        name: 'Workshop Dev',
        places: '20/25',
        receivedAmount: '300 000 FCFA',
        expectedAmount: '350 000 FCFA',
        status: 'En cours',
        statusColor: 'success' as const,
    },
    {
        id: 3,
        name: 'Workshop',
        places: '30/40',
        receivedAmount: '300 000 FCFA',
        expectedAmount: '350 000 FCFA',
        status: 'Non démarrer',
        statusColor: 'warning' as const,
    },
];

export function EventFinancialSituationView() {
    const theme = useTheme();

    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="Situation financière de l'évènement"
                action={
                    <Button
                        component={RouterLink}
                        href={paths.organisateur.gestionevent.root}
                        variant="contained"
                        startIcon={<Iconify icon="mingcute:left-fill" />}
                    >
                        Retour
                    </Button>
                }
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            <Box display="flex" justifyContent="flex-end" mb={4}>
                <Button
                    variant="contained"
                    startIcon={<Iconify icon="solar:printer-minimalistic-bold" />}
                    type="submit"
                    sx={{ width: '200px' }}
                >
                    Exporter (PDF)
                </Button>
            </Box>

            {/* Statistics Cards */}
            <Card sx={{ mb: { xs: 3, md: 5 }, pt: 1 }}>
                <CardHeader />
                
                <Scrollbar sx={{ minHeight: 108 }}>
                    <Stack
                        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
                        sx={{ py: 2, flexDirection: 'row' }}
                    >
                        {[
                            {
                                label: 'Invités',
                                value: '200',
                                color: 'info' as const,
                                icon: 'solar:users-group-rounded-bold-duotone',
                                percent: 100,
                                price: 24
                            },
                            {
                                label: 'Participants',
                                value: 45,
                                color: 'success' as const,
                                icon: 'solar:user-check-rounded-bold-duotone',
                                percent: 100,
                                price: 67
                            },
                            {
                                label: 'Activités',
                                value: 3,
                                color: 'warning' as const,
                                icon: 'solar:calendar-mark-bold-duotone',
                                percent: 100,
                                price: 90
                            },
                            {
                                label: 'Transactions',
                                value: 120,
                                color: 'error' as const,
                                icon: 'solar:card-transfer-bold-duotone',
                                percent: 100,
                                price: 654
                            },
                            {
                                label: 'Montant total',
                                value: '2 000 000',
                                color: 'info' as const,
                                icon: 'solar:banknote-2-bold-duotone',
                                percent: 100,
                                price: 654
                            },
                        ].map((stat, index) => (
                            <FicheClientEventWidget
                                key={index}
                                title={stat.label}
                                total={stat.value.toString()}
                                percent={stat.percent}
                                price={stat.price}
                                icon={stat.icon}
                                color={theme.vars.palette[stat.color].main}
                            />
                        ))}
                    </Stack>
                </Scrollbar>
            </Card>

            {/* Financial Situation Button */}
            <Box display="flex" justifyContent="end" mb={4}>
                <Button
                    component={RouterLink}
                    href={paths.organisateur.gestionevent.financialSituationByCounter}
                    variant="contained"
                    sx={{ 
                        backgroundColor: '#00BCD4', 
                        color: 'white',
                        '&:hover': { backgroundColor: '#00ACC1' }
                    }}
                >
                    Consulter la situation financière par guichet
                </Button>
            </Box>

            {/* Payment Methods Table */}
            <Card sx={{ mb: { xs: 3, md: 5 } }}>
                <CardHeader 
                    title="Moyens de paiement"
                    sx={{ pb: 2 }}
                />
                <Divider />
                
                <TableContainer component={Paper} elevation={0}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Moyen de paiement</strong></TableCell>
                                <TableCell align="center"><strong>Nombre de transactions</strong></TableCell>
                                <TableCell align="center"><strong>Montant </strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paymentMethods.map((method, index) => (
                                <TableRow key={index}>
                                    <TableCell>{method.name}</TableCell>
                                    <TableCell align="center">{method.transactions}</TableCell>
                                    <TableCell align="center">{method.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            {/* Activities Financial Situation */}
            <Card>
                <CardHeader 
                    title="Situation financière par activité"
                    sx={{ pb: 2 }}
                />
                <Divider />
                
                <TableContainer component={Paper} elevation={0}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Activités</strong></TableCell>
                                <TableCell align="center"><strong>Nbre de places</strong></TableCell>
                                <TableCell align="center"><strong>Montant reçu</strong></TableCell>
                                <TableCell align="center"><strong>Montant attendu</strong></TableCell>
                                <TableCell align="center"><strong>Statut</strong></TableCell>
                                <TableCell align="center"><strong>Action</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activitiesData.map((activity, index) => (
                                <TableRow key={index}>
                                    <TableCell>{activity.name}</TableCell>
                                    <TableCell align="center">{activity.places}</TableCell>
                                    <TableCell align="center">{activity.receivedAmount}</TableCell>
                                    <TableCell align="center">{activity.expectedAmount}</TableCell>
                                    <TableCell align="center">
                                        <Label
                                            color={activity.statusColor}
                                            variant="soft"
                                        >{activity.status}</Label>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton 
                                            size="small"
                                            component={RouterLink}
                                            href={`${paths.organisateur.gestionevent.activityPayments}/${activity.id}`}
                                        >
                                            <Iconify icon="solar:eye-bold" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </DashboardContent>
    );
}