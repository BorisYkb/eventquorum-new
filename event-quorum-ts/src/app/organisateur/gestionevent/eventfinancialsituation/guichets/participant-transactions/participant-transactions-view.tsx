'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import Grid from '@mui/material/Grid2';
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
    Stack,
    TextField,
    Chip,
    Avatar,
    Typography,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/admin';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { SuperviseurWidgetSummary } from 'src/sections/overview/superviseur/view/superviseur-widget-summary-2';

// ----------------------------------------------------------------------

// Mock data pour les agents et leurs participants enregistrés
const agentData: Record<number, any> = {
    1: {
        id: 1,
        nom_prenom: 'Boudou Mbodou Evanel',
        email: 'boudou@gmail.com',
        telephone: '+225 07 XX XX XX XX',
        poste: 'Agent Guichet 1',
        participants: [
            {
                id: 1,
                nom_prenom: 'Konan Yao',
                email: 'konan.yao@gmail.com',
                telephone: '+225 05 12 34 56 78',
                montant: '15 000',
                date_heure: '21/02/24 - 10:30',
                place: 'VIP',
                statut: 'Complété',
                moyen_paiement: 'Mobile Money',
                reference: 'TRX001234',
            },
            {
                id: 2,
                nom_prenom: 'Traoré Aminata',
                email: 'traore.aminata@gmail.com',
                telephone: '+225 07 98 76 54 32',
                montant: '10 000',
                date_heure: '21/02/24 - 11:15',
                place: 'Premium',
                statut: 'Complété',
                moyen_paiement: 'Carte bancaire',
                reference: 'TRX001235',
            },
            {
                id: 3,
                nom_prenom: 'Bamba Sekou',
                email: 'bamba.sekou@gmail.com',
                telephone: '+225 01 23 45 67 89',
                montant: '5 000',
                date_heure: '21/02/24 - 14:45',
                place: 'Standard',
                statut: 'Complété',
                moyen_paiement: 'Espèces',
                reference: 'TRX001236',
            },
        ]
    },
    2: {
        id: 2,
        nom_prenom: 'Kouame Jean',
        email: 'kouame@gmail.com',
        telephone: '+225 05 XX XX XX XX',
        poste: 'Agent Guichet 2',
        participants: [
            {
                id: 4,
                nom_prenom: 'Yao Marie',
                email: 'yao.marie@gmail.com',
                telephone: '+225 05 11 22 33 44',
                montant: '5 000',
                date_heure: '16/02/24 - 09:15',
                place: 'Standard',
                statut: 'Complété',
                moyen_paiement: 'Mobile Money',
                reference: 'TRX001237',
            },
        ]
    },
    3: {
        id: 3,
        nom_prenom: 'Sidibe Moussa',
        email: 'sidibemoussa@gmail.com',
        telephone: '+225 01 XX XX XX XX',
        poste: 'Agent Guichet 3',
        participants: [
            {
                id: 5,
                nom_prenom: 'Ouattara Ibrahim',
                email: 'ouattara.ibrahim@gmail.com',
                telephone: '+225 07 55 66 77 88',
                montant: '10 000',
                date_heure: '23/01/24 - 16:20',
                place: 'Premium',
                statut: 'Complété',
                moyen_paiement: 'Espèces',
                reference: 'TRX001238',
            },
        ]
    },
    4: {
        id: 4,
        nom_prenom: 'GRA-BI Amos',
        email: 'grabiamos@gmail.com',
        telephone: '+225 07 XX XX XX XX',
        poste: 'Agent Guichet 4',
        participants: [
            {
                id: 6,
                nom_prenom: 'Coulibaly Fatoumata',
                email: 'coulibaly.fatoumata@gmail.com',
                telephone: '+225 01 99 88 77 66',
                montant: '15 000',
                date_heure: '11/01/24 - 11:00',
                place: 'VIP',
                statut: 'Complété',
                moyen_paiement: 'MTN Money',
                reference: 'TRX001239',
            },
        ]
    },
    5: {
        id: 5,
        nom_prenom: 'Koné Fatou',
        email: 'kone.fatou@gmail.com',
        telephone: '+225 05 XX XX XX XX',
        poste: 'Agent Guichet 5',
        participants: [
            {
                id: 7,
                nom_prenom: 'N\'Guessan Paul',
                email: 'nguessan.paul@gmail.com',
                telephone: '+225 05 44 33 22 11',
                montant: '5 000',
                date_heure: '15/03/24 - 13:30',
                place: 'Standard',
                statut: 'Complété',
                moyen_paiement: 'Orange Money',
                reference: 'TRX001240',
            },
        ]
    },
    6: {
        id: 6,
        nom_prenom: 'Diabaté Ahmed',
        email: 'diabate.ahmed@gmail.com',
        telephone: '+225 01 XX XX XX XX',
        poste: 'Agent Guichet 6',
        participants: [
            {
                id: 8,
                nom_prenom: 'Koffi Ange',
                email: 'koffi.ange@gmail.com',
                telephone: '+225 07 12 34 56 78',
                montant: '10 000',
                date_heure: '18/03/24 - 15:45',
                place: 'Premium',
                statut: 'Complété',
                moyen_paiement: 'Espèces',
                reference: 'TRX001241',
            },
        ]
    },
};

export function ParticipantTransactionsView() {
    const params = useParams();
    const router = useRouter();
    const agentId = Number(params.id);
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');

    const agent = agentData[agentId];

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleBack = () => {
        router.back();
    };

    if (!agent) {
        return (
            <DashboardContent>
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                    <Typography variant="h6">Agent non trouvé</Typography>
                </Box>
            </DashboardContent>
        );
    }

    // Filtrer les participants selon la recherche
    const filteredParticipants = agent.participants.filter((participant: any) =>
        participant.nom_prenom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.telephone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        participant.place.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate pagination
    const paginatedParticipants = filteredParticipants.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    // Calculer le total des montants collectés
    const totalMontant = agent.participants.reduce((sum: number, p: any) => 
        sum + parseInt(p.montant.replace(/\s/g, '')), 0
    );

    const getStatutColor = (statut: string) => {
        switch (statut) {
            case 'Complété':
                return 'success';
            case 'En attente':
                return 'warning';
            case 'Échoué':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="Participants enregistrés par l'agent"
                links={[
                    { name: 'Situation financière', href: paths.organisateur.gestionevent.financialSituation },
                    { name: 'Par guichet', href: '#' },
                    { name: agent.nom_prenom },
                ]}
                action={
                    <Button
                        onClick={handleBack}
                        variant="contained"
                        startIcon={<Iconify icon="mingcute:left-fill" />}
                    >
                        Retour
                    </Button>
                }
                sx={{ mb: { xs: 3, md: 5 } }}
            />

            {/* Agent Info Card */}
            <Card sx={{ mb: 3, p: 3 }}>
                <Stack direction="row" spacing={3} alignItems="center">
                    <Avatar 
                        sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem' }}
                    >
                        {agent.nom_prenom.charAt(0)}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" gutterBottom>
                            {agent.nom_prenom}
                        </Typography>
                        <Chip 
                            label={agent.poste} 
                            color="primary" 
                            size="small" 
                            sx={{ mb: 1 }}
                        />
                        <Stack direction="row" spacing={3} alignItems="center">
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Iconify icon="eva:email-fill" width={20} />
                                <Typography variant="body2" color="text.secondary">
                                    {agent.email}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Iconify icon="eva:phone-fill" width={20} />
                                <Typography variant="body2" color="text.secondary">
                                    {agent.telephone}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                    <Box textAlign="right">
                        <Typography variant="caption" color="text.secondary">
                            Montant total collecté
                        </Typography>
                        <Typography variant="h4" color="success.main">
                            {totalMontant.toLocaleString()} FCFA
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {agent.participants.length} participant(s) enregistré(s)
                        </Typography>
                    </Box>
                </Stack>
            </Card>

            {/* Statistics Cards */}
            {/* <Grid container spacing={3} mb={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ p: 3, textAlign: 'center' }}>
                        <Iconify 
                            icon="solar:users-group-rounded-bold" 
                            width={48} 
                            sx={{ color: 'primary.main', mb: 2 }}
                        />
                        <Typography variant="h4">
                            {agent.participants.length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Participants enregistrés
                        </Typography>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ p: 3, textAlign: 'center' }}>
                        <Iconify 
                            icon="solar:money-bag-bold" 
                            width={48} 
                            sx={{ color: 'success.main', mb: 2 }}
                        />
                        <Typography variant="h4">
                            {totalMontant.toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Montant collecté (FCFA)
                        </Typography>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Card sx={{ p: 3, textAlign: 'center' }}>
                        <Iconify 
                            icon="solar:check-circle-bold" 
                            width={48} 
                            sx={{ color: 'info.main', mb: 2 }}
                        />
                        <Typography variant="h4">
                            {agent.participants.filter((p: any) => p.statut === 'Complété').length}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Paiements réussis
                        </Typography>
                    </Card>
                </Grid>
            </Grid> */}

            {/* Statistics Cards */}
            {/* <Stack direction="row" spacing={3} mb={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <SuperviseurWidgetSummary
                    title="Participants enregistrés"
                    total={agent.participants.length}
                    color="secondary"
                    sx={{ height: 180 }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <SuperviseurWidgetSummary
                    title="Paiements réussis"
                    total={agent.participants.filter((p: any) => p.statut === 'Complété').length}
                    color="success"
                    sx={{ height: 180 }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <SuperviseurWidgetSummary
                    title="Montant collecté (FCFA)"
                    total={totalMontant.toLocaleString()}
                    color="primary"
                    sx={{ height: 180 }}
                  />
                </Grid>
                
            </Stack> */}

            {/* Export Button */}
            <Box display="flex" justifyContent="flex-end" mb={3}>
                <Button
                    variant="contained"
                    startIcon={<Iconify icon="solar:printer-minimalistic-bold" />}
                    sx={{ width: '200px' }}
                >
                    Exporter
                </Button>
            </Box>

            {/* Participants Table */}
            <Card>
                <CardHeader 
                    title="Liste des participants enregistrés"
                    sx={{ pb: 1 }}
                />

                <Stack sx={{p: 3, display: 'flex', flexDirection: 'row' }} spacing={2} alignItems="center">
                    <TextField
                        placeholder="Rechercher par nom, email, téléphone, référence..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{ flexGrow: 1 }}
                        InputProps={{
                            startAdornment: <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', mr: 1 }} />,
                        }}
                    />
                </Stack>

                <Divider />

                <TableContainer component={Paper} elevation={0}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableCell><strong>Participant</strong></TableCell>
                                <TableCell><strong>Contact</strong></TableCell>
                                {/* <TableCell><strong>Référence</strong></TableCell> */}
                                <TableCell><strong>Date & Heure</strong></TableCell>
                                <TableCell><strong>Place</strong></TableCell>
                                <TableCell align="center"><strong>Montant (FCFA)</strong></TableCell>
                                <TableCell><strong>Paiement</strong></TableCell>
                                {/* <TableCell align="center"><strong>Statut</strong></TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedParticipants.length > 0 ? (
                                paginatedParticipants.map((participant: any) => (
                                    <TableRow key={participant.id} hover>
                                        <TableCell>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                {/* <Avatar sx={{ bgcolor: 'secondary.main' }}>
                                                    {participant.nom_prenom.charAt(0)}
                                                </Avatar> */}
                                                <Box>
                                                    <Typography variant="body2" fontWeight="medium">
                                                        {participant.nom_prenom}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {participant.email}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                
                                                <Typography variant="body2">
                                                    {participant.telephone}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        {/* <TableCell>
                                            <Typography variant="body2" fontFamily="monospace" color="primary">
                                                {participant.reference}
                                            </Typography>
                                        </TableCell> */}
                                        <TableCell>
                                            <Typography variant="body2">
                                                {participant.date_heure}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip 
                                                label={participant.place} 
                                                size="small"
                                                color={
                                                    participant.place === 'VIP' ? 'success' :
                                                    participant.place === 'Premium' ? 'error' : 'warning'
                                                }
                                                
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="body2" fontWeight="bold">
                                                {participant.montant}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                {/* <Iconify 
                                                    icon={
                                                        participant.moyen_paiement === 'Mobile Money' ? 
                                                        'ic:baseline-phone-android' :
                                                        participant.moyen_paiement === 'Carte bancaire' ?
                                                        'ic:baseline-credit-card' :
                                                        'ic:baseline-money'
                                                    } 
                                                    width={20}
                                                /> */}
                                                <Typography variant="body2">
                                                    {participant.moyen_paiement}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        {/* <TableCell align="center">
                                            <Chip 
                                                label={participant.statut}
                                                color={getStatutColor(participant.statut)}
                                                size="small"
                                            />
                                        </TableCell> */}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        <Box py={3}>
                                            <Iconify 
                                                icon="solar:users-group-rounded-broken" 
                                                width={48} 
                                                sx={{ color: 'text.disabled', mb: 2 }}
                                            />
                                            <Typography variant="body2" color="text.secondary">
                                                Aucun participant trouvé
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredParticipants.length}
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