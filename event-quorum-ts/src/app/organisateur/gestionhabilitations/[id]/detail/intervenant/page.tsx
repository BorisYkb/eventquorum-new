// File: src/app/organisateur/gestionhabilitations/[id]/detail/intervenant/page.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    Box,
    Card,
    Typography,
    TextField,
    IconButton,
    Stack,
    Chip,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { ArrowBack, Edit } from '@mui/icons-material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Label } from 'src/components/label';
import Loading from 'src/app/loading';

interface IntervenantData {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    role: string;
    createdAt: string;
    status: string;
    permissions: {
        // Permissions de base pour tous les rôles
        lecture: boolean;
        ecriture: boolean;
        modification: boolean;
        // Permissions spécifiques Intervenant
        consulterTelEmail: boolean;
        repondreQuestions: boolean;
    };
}

/**
 * Page de détail pour un utilisateur avec le rôle Intervenant
 * Affiche les informations personnelles et les permissions spécifiques au rôle
 */
const IntervenantDetailPage: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const theme = useTheme();
    const authId = params.id as string;

    // États pour gérer le chargement et les données utilisateur
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<IntervenantData | null>(null);

    // Données mockées spécifiques à l'Intervenant pour le développement
    const mockIntervenantData: IntervenantData = {
        id: 3,
        nom: 'Kone',
        prenom: 'Fatou',
        email: 'fatou.kone@example.com',
        telephone: '0123456791',
        role: 'Intervenant',
        createdAt: '2024-01-22',
        status: 'Actif',
        permissions: {
            // Permissions de base
            lecture: true,
            ecriture: false,
            modification: false,
            // Permissions spécifiques Intervenant
            consulterTelEmail: true,
            repondreQuestions: false,
        }
    };

    /**
     * Charge les données de l'intervenant depuis l'API
     * Actuellement utilise des données mockées pour le développement
     */
    useEffect(() => {
        const loadIntervenantData = async () => {
            try {
                setLoading(true);

                // TODO: Remplacer par l'appel API réel
                // const response = await fetch(`/api/authorizations/intervenant/${authId}`);
                // const data = await response.json();

                // Simulation d'un délai réseau
                await new Promise(resolve => setTimeout(resolve, 800));
                setUserData(mockIntervenantData);

            } catch (error) {
                console.error('Erreur lors du chargement des données intervenant:', error);
            } finally {
                setLoading(false);
            }
        };

        if (authId) {
            loadIntervenantData();
        }
    }, [authId]);

    /**
     * Navigation de retour vers la liste des habilitations
     */
    const handleBack = () => {
        router.push('/organisateur/gestionhabilitations');
    };

    /**
     * Navigation vers la page de modification
     */
    const handleEdit = () => {
        router.push(`/organisateur/gestionhabilitations/${authId}/modifier`);
    };

    /**
     * Rendu du statut des permissions avec icônes et couleurs
     * @param value - Valeur booléenne de la permission
     * @returns JSX Element représentant le statut
     */
    const renderPermissionStatus = (value: boolean) => {
        return value ? (
            <Chip
                icon={<CheckCircle sx={{ fontSize: '16px !important' }} />}
                label="Activé"
                color="success"
                size="small"
                variant="filled"
            />
        ) : (
            <Chip
                icon={<Cancel sx={{ fontSize: '16px !important' }} />}
                label="Désactivé"
                color="default"
                size="small"
                variant="outlined"
            />
        );
    };

    /**
     * Détermine la couleur du chip de statut selon l'état de l'utilisateur
     * @param status - Statut de l'utilisateur
     * @returns Couleur Material-UI
     */
    const getStatusColor = (status: string): 'success' | 'error' | 'warning' => {
        switch (status) {
            case 'Actif': return 'success';
            case 'Inactif': return 'error';
            case 'Suspendu': return 'warning';
            default: return 'success';
        }
    };

    // Affichage du loader pendant le chargement
    if (loading) {
        return <Loading />;
    }

    // Gestion du cas où les données utilisateur ne sont pas trouvées
    if (!userData) {
        return (
            <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
                <Card sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="error">
                        Intervenant introuvable
                    </Typography>
                </Card>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {/* En-tête avec navigation et actions */}
            <Card sx={{ borderRadius: 2, mb: 3 }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 3,
                    backgroundColor: '#f8f9fa',
                    borderBottom: '1px solid #e0e0e0'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={handleBack} sx={{ mr: 2 }}>
                            <ArrowBack />
                        </IconButton>
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
                                Détail Intervenant
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Informations et permissions de l'intervenant
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Label variant="soft" color="info">
                            Intervenant
                        </Label>
                        <Chip
                            label={userData.status}
                            color={getStatusColor(userData.status)}
                            size="small"
                            variant="filled"
                        />
                        <IconButton
                            onClick={handleEdit}
                            sx={{
                                bgcolor: '#00B8D9',
                                color: 'white',
                                '&:hover': { bgcolor: '#00A3C4' }
                            }}
                            size="small"
                        >
                            <Edit sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Box>
                </Box>
            </Card>

            {/* Contenu principal avec layout responsive */}
            <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
                <Grid container spacing={3}>

                    {/* Section Informations Utilisateur */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ height: 'fit-content' }}>
                            <Box sx={{
                                p: 2,
                                backgroundColor: '#fafafa',
                                borderBottom: '1px solid #e0e0e0'
                            }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Informations Intervenant
                                </Typography>
                            </Box>
                            <Box sx={{ p: 3 }}>
                                {/* Avatar et nom de l'utilisateur */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                    <Box sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        backgroundColor: theme.palette.info.main,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontSize: '24px',
                                        fontWeight: 600,
                                        mr: 2
                                    }}>
                                        {userData.prenom[0]}{userData.nom[0]}
                                    </Box>
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {userData.prenom} {userData.nom}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {userData.email}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Formulaire d'informations en lecture seule */}
                                <Stack spacing={3}>
                                    <TextField
                                        fullWidth
                                        label="Nom de famille"
                                        value={userData.nom}
                                        size="small"
                                        InputProps={{ readOnly: true }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Prénom"
                                        value={userData.prenom}
                                        size="small"
                                        InputProps={{ readOnly: true }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        value={userData.email}
                                        size="small"
                                        InputProps={{ readOnly: true }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Téléphone"
                                        value={userData.telephone}
                                        size="small"
                                        InputProps={{ readOnly: true }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Date de création"
                                        value={new Date(userData.createdAt).toLocaleDateString('fr-FR')}
                                        size="small"
                                        InputProps={{ readOnly: true }}
                                    />
                                </Stack>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Section Permissions et Accès */}
                    <Grid item xs={12} md={8}>
                        <Card>
                            <Box sx={{
                                p: 2,
                                backgroundColor: '#fafafa',
                                borderBottom: '1px solid #e0e0e0'
                            }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Permissions Intervenant
                                </Typography>
                            </Box>
                            <Box sx={{ p: 3 }}>

                                {/* Bloc Permissions de base - Commun à tous les rôles */}
                                <Box sx={{ mb: 3 }}>
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
                                        Permissions de base
                                    </Typography>

                                    <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                                        <Table size="small">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell sx={{ border: 'none', py: 1.5 }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                            Lecture
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ border: 'none', py: 1.5, width: 120 }} align="right">
                                                        {renderPermissionStatus(userData.permissions.lecture)}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ border: 'none', py: 1.5 }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                            Écriture
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ border: 'none', py: 1.5, width: 120 }} align="right">
                                                        {renderPermissionStatus(userData.permissions.ecriture)}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ border: 'none', py: 1.5 }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                            Modification
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ border: 'none', py: 1.5, width: 120 }} align="right">
                                                        {renderPermissionStatus(userData.permissions.modification)}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>

                                {/* Bloc Participants - Spécifique Intervenant (2 premières lignes seulement) */}
                                <Box sx={{ mb: 3 }}>
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
                                            backgroundColor: theme.palette.info.main,
                                            mr: 1
                                        }} />
                                        Participants
                                    </Typography>

                                    <TableContainer component={Paper} variant="outlined">
                                        <Table size="small">
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell sx={{ border: 'none', py: 1.5 }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                            Consulter les téléphones et emails des participants
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ border: 'none', py: 1.5, width: 120 }} align="right">
                                                        {renderPermissionStatus(userData.permissions.consulterTelEmail)}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ border: 'none', py: 1.5 }}>
                                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                            Répondre aux questions des participants
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell sx={{ border: 'none', py: 1.5, width: 120 }} align="right">
                                                        {renderPermissionStatus(userData.permissions.repondreQuestions)}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>

                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default IntervenantDetailPage;