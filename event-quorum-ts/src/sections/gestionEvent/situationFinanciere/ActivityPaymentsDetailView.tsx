'use client';

import { useState } from 'react';

import { 
    Box, 
    Button, 
    Card, 
    CardHeader, 
    Divider, 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper,
    Typography
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/admin';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

// Mock data for payments
const paymentsData = [
    {
        id: 1,
        nom_prenom: 'Boudou Mbodou Evanel',
        email: 'boudou@gmail.com',
        telephone: '+225 07 12 34 56 78',
        mode_paiement: 'Orange Money',
        type_place: 'VIP',
        montant: '15 000',
        date_heure: '21/02/24 14:30'
    },
    {
        id: 2,
        nom_prenom: 'Kouame Jean',
        email: 'kouame@gmail.com',
        telephone: '+225 05 98 76 54 32',
        mode_paiement: 'MTN Money',
        type_place: 'Standard',
        montant: '5 000',
        date_heure: '16/02/24 10:15'
    },
    {
        id: 3,
        nom_prenom: 'Sidibe Moussa',
        email: 'sidibemoussa@gmail.com',
        telephone: '+225 01 23 45 67 89',
        mode_paiement: 'Wave',
        type_place: 'Premium',
        montant: '10 000',
        date_heure: '23/01/24 16:45'
    },
    {
        id: 4,
        nom_prenom: 'GRA-BI Amos',
        email: 'grabiamos@gmail.com',
        telephone: '+225 07 11 22 33 44',
        mode_paiement: 'Espèces',
        type_place: 'VIP',
        montant: '15 000',
        date_heure: '11/01/24 09:20'
    },
    {
        id: 5,
        nom_prenom: 'Koné Fatou',
        email: 'kone.fatou@gmail.com',
        telephone: '+225 05 44 55 66 77',
        mode_paiement: 'Moov Money',
        type_place: 'Standard',
        montant: '5 000',
        date_heure: '15/03/24 11:00'
    },
    {
        id: 6,
        nom_prenom: 'Diabaté Ahmed',
        email: 'diabate.ahmed@gmail.com',
        telephone: '+225 01 88 99 00 11',
        mode_paiement: 'Orange Money',
        type_place: 'Premium',
        montant: '10 000',
        date_heure: '18/03/24 15:30'
    },
    {
        id: 7,
        nom_prenom: 'Yao Marie',
        email: 'yao.marie@gmail.com',
        telephone: '+225 07 22 33 44 55',
        mode_paiement: 'Wave',
        type_place: 'VIP',
        montant: '15 000',
        date_heure: '20/03/24 13:45'
    },
    {
        id: 8,
        nom_prenom: 'Touré Ibrahim',
        email: 'toure.ibrahim@gmail.com',
        telephone: '+225 05 66 77 88 99',
        mode_paiement: 'MTN Money',
        type_place: 'Standard',
        montant: '5 000',
        date_heure: '22/03/24 10:15'
    },
];

interface ActivityPaymentsDetailViewProps {
    activityId?: string;
}

export function ActivityPaymentsDetailView({ activityId }: ActivityPaymentsDetailViewProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Get activity name (in real app, fetch from API using activityId)
    const activityName = activityId === '1' ? 'Workshop cyber' : 
                        activityId === '2' ? 'Workshop Dev' : 'Workshop';

    // Calculate pagination
    const paginatedPayments = paymentsData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading={`Détails des versements - ${activityName}`}
                subtitle= {`${activityName}`}
                
                action={
                    <Button
                        component={RouterLink}
                        href={paths.organisateur.gestionevent.financialSituation}
                        variant="contained"
                        startIcon={<Iconify icon="mingcute:left-fill" />}
                    >
                        Retour
                    </Button>
                }
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            {/* Summary Info */}
            <Box display="flex" gap={3} mb={4}>
                <Card sx={{ flex: 1, p: 3 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Nombre total de versements
                    </Typography>
                    <Typography variant="h4">
                        {paymentsData.length}
                    </Typography>
                </Card>
                <Card sx={{ flex: 1, p: 3 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Montant total reçu
                    </Typography>
                    <Typography variant="h4">
                        300 000 FCFA
                    </Typography>
                </Card>
            </Box>

            {/* Export Button */}
            <Box display="flex" justifyContent="flex-end" mb={3}>
                <Button
                    variant="contained"
                    startIcon={<Iconify icon="solar:printer-minimalistic-bold" />}
                    sx={{ width: '200px' }}
                >
                    Exporter (PDF)
                </Button>
            </Box>

            {/* Payments Table */}
            <Card>
                <CardHeader 
                    title="Liste des versements effectués"
                    sx={{ pb: 2 }}
                />
                <Divider />
                
                <TableContainer component={Paper} elevation={0}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Nom & Prénom</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell><strong>Téléphone</strong></TableCell>
                                <TableCell align="center"><strong>Mode de paiement</strong></TableCell>
                                <TableCell align="center"><strong>Type de place</strong></TableCell>
                                <TableCell align="center"><strong>Montant (FCFA)</strong></TableCell>
                                <TableCell align="center"><strong>Date & Heure</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedPayments.map((payment) => (
                                <TableRow key={payment.id} hover>
                                    <TableCell>{payment.nom_prenom}</TableCell>
                                    <TableCell>{payment.email}</TableCell>
                                    <TableCell>{payment.telephone}</TableCell>
                                    <TableCell align="center">{payment.mode_paiement}</TableCell>
                                    <TableCell align="center">{payment.type_place}</TableCell>
                                    <TableCell align="center">{payment.montant}</TableCell>
                                    <TableCell align="center">{payment.date_heure}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={paymentsData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Lignes par page:"
                    labelDisplayedRows={({ from, to, count }) => 
                        `${from}-${to} sur ${count}`
                    }
                />
            </Card>
        </DashboardContent>
    );
}