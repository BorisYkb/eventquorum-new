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
    IconButton,
    Stack,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    TextField,
    Typography
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/admin';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { TransactionDetailModal } from './TransactionDetailModal';

// ----------------------------------------------------------------------

// Mock data for transactions
const transactionsData = [
    {
        id: 1,
        nom_prenom: 'Boudou Mbodou Evanel',
        email: 'boudou@gmail.com',
        montant: '15 000',
        date_heure: '21/02/24',
        place: 'VIP'
    },
    {
        id: 2,
        nom_prenom: 'Kouame Jean',
        email: 'kouame@gmail.com',
        montant: '5 000',
        date_heure: '16/02/24',
        place: 'Standard'
    },
    {
        id: 3,
        nom_prenom: 'Sidibe Moussa',
        email: 'sidibemoussa@gmail.com',
        montant: '10 000',
        date_heure: '23/01/24',
        place: 'Premium'
    },
    {
        id: 4,
        nom_prenom: 'GRA-BI Amos',
        email: 'grabiamos@gmail.com',
        montant: '15 000',
        date_heure: '11/01/24',
        place: 'VIP'
    },
    {
        id: 5,
        nom_prenom: 'Koné Fatou',
        email: 'kone.fatou@gmail.com',
        montant: '5 000',
        date_heure: '15/03/24',
        place: 'Standard'
    },
    {
        id: 6,
        nom_prenom: 'Diabaté Ahmed',
        email: 'diabate.ahmed@gmail.com',
        montant: '10 000',
        date_heure: '18/03/24',
        place: 'Premium'
    },
];

export function FinancialSituationByCounterView() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedCounter, setSelectedCounter] = useState('tous');
    const [selectedAgent, setSelectedAgent] = useState('tous');
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleViewDetail = (transaction: any) => {
        setSelectedTransaction(transaction);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedTransaction(null);
    };

    // Calculate pagination
    const paginatedTransactions = transactionsData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="Situation financière par guichet"
                links={[
                    {
                        name: 'Situation financière',
                        href: paths.organisateur.gestionevent.financialSituation,
                    },
                    {
                        name: 'Par guichet',
                    },
                ]}
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

            {/* Statistics Cards */}
            <Stack direction="row" spacing={3} mb={4}>
                <Card sx={{ flex: 1, p: 2.5, backgroundColor: '#FFA726' }}>
                    <Typography variant="h4" color="white" gutterBottom>
                        20
                    </Typography>
                    <Typography variant="body2" color="white">
                        Nombre de participants
                    </Typography>
                </Card>
                <Card sx={{ flex: 1, p: 2.5, backgroundColor: '#66BB6A' }}>
                    <Typography variant="h4" color="white" gutterBottom>
                        15
                    </Typography>
                    <Typography variant="body2" color="white">
                        Nombre de transactions
                    </Typography>
                </Card>
                <Card sx={{ flex: 1, p: 2.5, backgroundColor: '#42A5F5' }}>
                    <Typography variant="h4" color="white" gutterBottom>
                        146 000
                    </Typography>
                    <Typography variant="body2" color="white">
                        Montant collecté (FCFA)
                    </Typography>
                </Card>
            </Stack>

            {/* Filters */}
            <Card sx={{ mb: 3, p: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Filtrer par guichet</InputLabel>
                        <Select
                            value={selectedCounter}
                            label="Filtrer par guichet"
                            onChange={(e) => setSelectedCounter(e.target.value)}
                        >
                            <MenuItem value="tous">Tous les guichets</MenuItem>
                            <MenuItem value="guichet1">Guichet 1</MenuItem>
                            <MenuItem value="guichet2">Guichet 2</MenuItem>
                            <MenuItem value="guichet3">Guichet 3</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Filtrer par agent</InputLabel>
                        <Select
                            value={selectedAgent}
                            label="Filtrer par agent"
                            onChange={(e) => setSelectedAgent(e.target.value)}
                        >
                            <MenuItem value="tous">Tous les agents</MenuItem>
                            <MenuItem value="agent1">Agent 1</MenuItem>
                            <MenuItem value="agent2">Agent 2</MenuItem>
                            <MenuItem value="agent3">Agent 3</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ flexGrow: 1 }}
                        InputProps={{
                            startAdornment: <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', mr: 1 }} />,
                        }}
                    />
                </Stack>
            </Card>

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

            {/* Transactions Table */}
            <Card>
                <CardHeader 
                    title={`Liste des transactions effectuées - Numéro du guichet: 5`}
                    subheader={`Nom de l'agent: Boudou Mbodou Evanel`}
                    sx={{ pb: 2 }}
                />
                <Divider />
                
                <TableContainer component={Paper} elevation={0}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Nom_Prenom</strong></TableCell>
                                <TableCell><strong>Email</strong></TableCell>
                                <TableCell align="center"><strong>Montant</strong></TableCell>
                                <TableCell align="center"><strong>Date</strong></TableCell>
                                <TableCell align="center"><strong>Action</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedTransactions.map((transaction) => (
                                <TableRow key={transaction.id} hover>
                                    <TableCell>{transaction.nom_prenom}</TableCell>
                                    <TableCell>{transaction.email}</TableCell>
                                    <TableCell align="center">{transaction.montant}</TableCell>
                                    <TableCell align="center">{transaction.date_heure}</TableCell>
                                    <TableCell align="center">
                                        <IconButton 
                                            size="small"
                                            onClick={() => handleViewDetail(transaction)}
                                        >
                                            <Iconify icon="solar:eye-bold" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={transactionsData.length}
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

            {/* Modal */}
            <TransactionDetailModal
                open={modalOpen}
                onClose={handleCloseModal}
                transaction={selectedTransaction}
            />
        </DashboardContent>
    );
}