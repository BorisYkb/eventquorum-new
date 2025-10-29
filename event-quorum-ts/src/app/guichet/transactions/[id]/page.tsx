'use client';

import React from 'react';
import {
    Box,
    Card,
    Button,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    IconButton,
    Stack,
    Chip
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { Label } from 'src/components/label';
import { ArrowBack } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useRouter, useParams } from 'next/navigation';

import { DashboardContent } from 'src/layouts/guichet';
import { Iconify } from 'src/components/iconify';

// Type de données
type Transaction = {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    montant: number;
    date: string;
    activite: string;
    activites: {
        id: number;
        nom: string;
        horaire: string;
        type: string;
        statut: string;
        places: number;
    }[];
};

// Mock data - à remplacer par l'API
const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: 1,
        nom: 'Boudou',
        prenom: 'Khoudou',
        email: 'boudou@gmail.com',
        montant: 50000,
        date: '2024-07-17T09:30:00',
        activite: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
        activites: [
            {
                id: 1,
                nom: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
                horaire: '09:00 - 11:00',
                type: 'Standard',
                statut: 'En cours',
                places: 1
            },
            {
                id: 2,
                nom: 'PANEL DE HAUT NIVEAU',
                horaire: '14:00 - 16:00',
                type: 'VIP',
                statut: 'Non démarré',
                places: 1
            }
        ]
    },
    {
        id: 2,
        nom: 'Kouame',
        prenom: 'Jean',
        email: 'kouame@gmail.com',
        montant: 25000,
        date: '2024-07-16T14:15:00',
        activite: 'PANEL DE HAUT NIVEAU',
        activites: [
            {
                id: 3,
                nom: 'PANEL DE HAUT NIVEAU',
                horaire: '14:00 - 16:00',
                type: 'Standard',
                statut: 'En cours',
                places: 1
            }
        ]
    },
    {
        id: 3,
        nom: 'Sidibe',
        prenom: 'Moussa',
        email: 'sidibemoussa@gmail.com',
        montant: 75000,
        date: '2024-07-15T10:45:00',
        activite: 'POINT DE PRESSE',
        activites: [
            {
                id: 4,
                nom: 'POINT DE PRESSE',
                horaire: '11:00 - 12:00',
                type: 'VIP',
                statut: 'Terminé',
                places: 1
            },
            {
                id: 5,
                nom: 'COOLING BREAK',
                horaire: '16:00 - 17:00',
                type: 'Standard',
                statut: 'En cours',
                places: 2
            }
        ]
    },
    {
        id: 4,
        nom: 'GRA-BI',
        prenom: 'Amira',
        email: 'grabianira@gmail.com',
        montant: 30000,
        date: '2024-07-14T16:20:00',
        activite: 'PANEL DE HAUT NIVEAU',
        activites: [
            {
                id: 6,
                nom: 'PANEL DE HAUT NIVEAU',
                horaire: '14:00 - 16:00',
                type: 'Standard',
                statut: 'Non démarré',
                places: 1
            },
            {
                id: 7,
                nom: 'PAUSE CAFE',
                horaire: '10:00 - 10:30',
                type: 'Standard',
                statut: 'Terminé',
                places: 1
            }
        ]
    },
    {
        id: 5,
        nom: 'Traore',
        prenom: 'Fatou',
        email: 'fatou.traore@gmail.com',
        montant: 45000,
        date: '2024-07-10T11:30:00',
        activite: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
        activites: [
            {
                id: 8,
                nom: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
                horaire: '09:00 - 11:00',
                type: 'VIP',
                statut: 'En cours',
                places: 1
            }
        ]
    },
    {
        id: 6,
        nom: 'Diallo',
        prenom: 'Mamadou',
        email: 'mamadou.diallo@gmail.com',
        montant: 60000,
        date: '2024-06-28T15:45:00',
        activite: 'COOLING BREAK',
        activites: [
            {
                id: 9,
                nom: 'COOLING BREAK',
                horaire: '16:00 - 17:00',
                type: 'Standard',
                statut: 'En cours',
                places: 1
            },
            {
                id: 10,
                nom: 'POINT DE PRESSE',
                horaire: '11:00 - 12:00',
                type: 'Standard',
                statut: 'Non démarré',
                places: 1
            }
        ]
    },
    {
        id: 7,
        nom: 'Kone',
        prenom: 'Aissata',
        email: 'aissata.kone@gmail.com',
        montant: 35000,
        date: '2024-06-25T08:00:00',
        activite: 'PAUSE CAFE',
        activites: [
            {
                id: 11,
                nom: 'PAUSE CAFE',
                horaire: '10:00 - 10:30',
                type: 'VIP',
                statut: 'Terminé',
                places: 1
            }
        ]
    },
    {
        id: 8,
        nom: 'Ouattara',
        prenom: 'Ibrahim',
        email: 'ibrahim.ouattara@gmail.com',
        montant: 80000,
        date: '2024-07-17T13:10:00',
        activite: 'PANEL DE HAUT NIVEAU',
        activites: [
            {
                id: 12,
                nom: 'PANEL DE HAUT NIVEAU',
                horaire: '14:00 - 16:00',
                type: 'VIP',
                statut: 'En cours',
                places: 2
            },
            {
                id: 13,
                nom: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
                horaire: '09:00 - 11:00',
                type: 'Standard',
                statut: 'Non démarré',
                places: 1
            }
        ]
    }
];

export default function TransactionDetailPage() {
    const theme = useTheme();
    const router = useRouter();
    const params = useParams();

    // Récupérer la transaction en fonction de l'ID
    const transactionId = parseInt(params.id as string);
    const transaction = MOCK_TRANSACTIONS.find(t => t.id === transactionId);

    if (!transaction) {
        return (
            <DashboardContent maxWidth="xl">
                <Card sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6">Transaction non trouvée</Typography>
                    <Button
                        onClick={() => router.push('/guichet/transactions')}
                        sx={{ mt: 2 }}
                    >
                        Retour à la liste
                    </Button>
                </Card>
            </DashboardContent>
        );
    }

    const getActivityStatusColor: (status: string) => 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' = (status: string) => {
        switch (status) {
            case 'En cours':
                return 'warning';
            case 'Non démarré':
                return 'error';
            case 'Terminé':
                return 'success';
            default:
                return 'default';
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Informations personnelles
    const transactionInfo = [
        { label: 'ID Transaction', value: `#${transaction.id.toString().padStart(6, '0')}` },
        { label: 'Nom complet', value: `${transaction.nom} ${transaction.prenom}` },
        { label: 'Email', value: transaction.email },
        { label: 'Date de transaction', value: formatDate(transaction.date) },
        // { label: 'Activité principale', value: transaction.activite },
    ];

    // Détails de paiement
    const fraisTransaction = 500;
    const montantNet = transaction.montant - fraisTransaction;

    const paymentDetails = [
        {
            category: 'Détails du Paiement',
            items: [
                { name: 'Montant brut', value: `${formatCurrency(transaction.montant)} FCFA` },
                { name: 'Frais de transaction', value: `${formatCurrency(fraisTransaction)} FCFA` },
                { name: 'Montant net', value: `${formatCurrency(montantNet)} FCFA` },
                { name: 'Devise', value: 'XOF (Franc CFA)' },
                { name: 'Mode de paiement', value: 'Carte bancaire' },
                { name: 'Numéro de reçu', value: `REC-${transaction.id}-2024` },
            ]
        }
    ];

    return (
        <DashboardContent maxWidth="xl">
            <Grid container spacing={3}>
                {/* Première ligne - En-tête avec titre (comme DialogTitle) */}
                <Grid size={{ xs: 12 }}>
                    <Box >
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 3
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton
                                    onClick={() => router.push('/guichet/transactions')}
                                    sx={{ mr: 2 }}
                                >
                                    <ArrowBack />
                                </IconButton>
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
                                        Détails de la Transaction
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Transaction #{transaction.id.toString().padStart(6, '0')} - {transaction.nom} {transaction.prenom}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>

                {/* Deuxième ligne - Informations personnelles et Détail de paiement */}
                <Grid size={{ xs: 12, md: 5 }}>
                    <Card sx={{ height: '100%' }}>
                        <Box sx={{
                            p: 2,
                            backgroundColor: '#fafafa',
                            borderBottom: '1px solid #e0e0e0'
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Informations Personnelles
                            </Typography>
                        </Box>
                        <Box sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <Box sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    backgroundColor: theme.palette.primary.main,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontSize: '24px',
                                    fontWeight: 600,
                                    mr: 2
                                }}>
                                    {transaction.nom[0]}{transaction.prenom[0]}
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {transaction.nom} {transaction.prenom}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {transaction.email}
                                    </Typography>
                                </Box>
                            </Box>

                            <Stack spacing={2}>
                                {transactionInfo.map((info, index) => (
                                    <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                            {info.label}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'right' }}>
                                            {info.value}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </Box>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 7 }}>
                    <Card sx={{ height: '100%' }}>
                        <Box sx={{
                            p: 2,
                            backgroundColor: '#fafafa',
                            borderBottom: '1px solid #e0e0e0'
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Détails du Paiement
                            </Typography>
                        </Box>
                        <Box sx={{ p: 3 }}>
                            {paymentDetails.map((category, categoryIndex) => (
                                <Box key={categoryIndex}>
                                    <Typography variant="subtitle1" sx={{
                                        fontWeight: 600,
                                        mb: 2,
                                        color: '#374151',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        <Box sx={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            backgroundColor: theme.palette.primary.main,
                                            mr: 1
                                        }} />
                                        {category.category}
                                    </Typography>

                                    <TableContainer component={Paper} variant="outlined">
                                        <Table size="small">
                                            <TableBody>
                                                {category.items.map((detail, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell sx={{ border: 'none', py: 1 }}>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {detail.name}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell sx={{ border: 'none', py: 1 }} align="right">
                                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                                {detail.value}
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            ))}
                        </Box>
                    </Card>
                </Grid>

                {/* Troisième ligne - Liste des activités */}
                <Grid size={{ xs: 12 }}>
                    <Card>
                        <Box sx={{
                            p: 2,
                            backgroundColor: '#fafafa',
                            borderBottom: '1px solid #e0e0e0'
                        }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Activités Inscrites ({transaction.activites.length})
                            </Typography>
                        </Box>
                        <Box sx={{ p: 3 }}>
                            <TableContainer component={Paper} variant="outlined">
                                <Table size="small">
                                    <TableHead>
                                        <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#f8f9fa', fontWeight: 600 } }}>
                                            <TableCell>Activité</TableCell>
                                            <TableCell align="center">Horaire</TableCell>
                                            <TableCell align="center">Type d'accès</TableCell>
                                            {/* <TableCell align="center">Places</TableCell> */}
                                            <TableCell align="center">Statut</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {transaction.activites.map((activite) => (
                                            <TableRow key={activite.id} hover>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                        {activite.nom}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography variant="body2" sx={{
                                                        fontFamily: 'monospace',
                                                        backgroundColor: '#f5f5f5',
                                                        px: 1,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        display: 'inline-block',
                                                        fontSize: '0.75rem'
                                                    }}>
                                                        {activite.horaire}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Chip
                                                        label={activite.type}
                                                        size="small"
                                                        variant="outlined"
                                                        color="primary"
                                                        sx={{ fontSize: '0.7rem' }}
                                                    />
                                                </TableCell>
                                                {/* <TableCell align="center">
                                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                                        {activite.places}
                                                    </Typography>
                                                </TableCell> */}
                                                <TableCell align="center">
                                                    <Label
                                                        variant="soft"
                                                        color={getActivityStatusColor(activite.statut)}
                                                        sx={{
                                                            minWidth: { xs: 80, sm: 100 },
                                                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                                                        }}
                                                    >
                                                        {activite.statut}
                                                    </Label>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Card>
                </Grid>

                {/* Quatrième ligne - Boutons d'actions */}
                <Grid size={{ xs: 12 }}>
                    <Card sx={{ p: 3 }}>
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button
                                variant="outlined"
                                startIcon={<Iconify icon="eva:download-fill" />}
                            >
                                Télécharger le reçu
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<Iconify icon="eva:email-fill" />}
                            >
                                Renvoyer par email
                            </Button>
                        </Stack>
                    </Card>
                </Grid>

                {/* Footer */}
                <Grid size={{ xs: 12 }}>
                    <Card sx={{ p: 2, bgcolor: 'grey.50' }}>
                        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="body2" color="text.secondary">
                                    © 2024 QUORUM ÉVÉNEMENTIEL | Powered by PX_LABS SARL
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Grid container spacing={1} justifyContent="flex-end">
                                    <Grid>
                                        <Button
                                            size="small"
                                            color="inherit"
                                            sx={{ textTransform: 'none' }}
                                        >
                                            Confidentialité
                                        </Button>
                                    </Grid>
                                    <Grid>
                                        <Button
                                            size="small"
                                            color="inherit"
                                            sx={{ textTransform: 'none' }}
                                        >
                                            Aide
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </DashboardContent>
    );
}