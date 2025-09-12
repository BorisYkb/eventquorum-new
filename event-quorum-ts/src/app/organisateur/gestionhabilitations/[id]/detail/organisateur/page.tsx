// File: src/app/organisateur/gestionhabilitations/[id]/detail/organisateur/page.tsx
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

interface OrganisateurData {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    role: string;
    createdAt: string;
    status: string;
    permissions: {
        // Permissions de base pour tous les rôles (seules permissions pour Organisateur)
        lecture: boolean;
        ecriture: boolean;
        modification: boolean;
    };
}

/**
 * Page de détail pour un utilisateur avec le rôle Organisateur
 * Affiche les informations personnelles et les permissions de base uniquement
 */
const OrganisateurDetailPage: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const theme = useTheme();
    const authId = params.id as string;

    // États pour gérer le chargement et les données utilisateur
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<OrganisateurData | null>(null);

    // Données mockées spécifiques à l'Organisateur pour le développement
    const mockOrganisateurData: OrganisateurData = {
        id: 5,
        nom: 'Ouattara',
        prenom: 'Alassane',
        email: 'alassane.ouattara@example.com',
        telephone: '0123456793',
        role: 'Organisateur',
        createdAt: '2024-01-18',
        status: 'Actif',
        permissions: {
            // Seules les permissions de base pour l'Organisateur
            lecture: true,
            ecriture: true,
            modification: true,
        }
    };

    /**
     * Charge les données de l'organisateur depuis l'API
     * Actuellement utilise des données mockées pour le développement
     */
    useEffect(() => {
        const loadOrganisateurData = async () => {
            try {
                setLoading(true);

                // TODO: Remplacer par l'appel API réel
                // const response = await fetch(`/api/authorizations/organisateur/${authId}`);
                // const data = await response.json();

                // Simulation d'un délai réseau
                await new Promise(resolve => setTimeout(resolve, 800));
                setUserData(mockOrganisateurData);

            } catch (error) {
                console.error('Erreur lors du chargement des données organisateur:', error);
            } finally {
                setLoading(false);
            }
        };

        if (authId) {
            loadOrganisateurData();
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
                        Organisateur introuvable
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
                                Détail Organisateur
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Informations et permissions de l'organisateur
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Label variant="soft" color="primary">
                            Organisateur
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
                                    Informations Organisateur
                                </Typography>
                            </Box>
                            <Box sx={{ p: 3 }}>
                                {/* Avatar et nom de l'utilisateur */}
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
                                    Permissions Organisateur
                                </Typography>
                            </Box>
                            <Box sx={{ p: 3 }}>

                                {/* Bloc Permissions de base - Seules permissions pour Organisateur */}
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

                                    <TableContainer component={Paper} variant="outlined">
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

                                {/* Note explicative pour l'Organisateur */}
                                <Box sx={{
                                    p: 2,
                                    backgroundColor: '#f0f7ff',
                                    borderRadius: 1,
                                    border: '1px solid #e3f2fd'
                                }}>
                                    <Typography variant="body2" sx={{
                                        color: '#1976d2',
                                        fontStyle: 'italic',
                                        textAlign: 'center'
                                    }}>
                                        L'Organisateur dispose uniquement des permissions de base pour la gestion de l'événement.
                                    </Typography>
                                </Box>

                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default OrganisateurDetailPage;