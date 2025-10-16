// File: src/app/organisateur/gestionhabilitations/[id]/detail/page.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { ArrowBack, Edit } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Card,
    Typography,
    IconButton,
    Grid,
    Divider,
    Chip,
    Avatar,
    Stack,
} from '@mui/material';

import Loading from 'src/app/loading';
import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

interface ReseauSocial {
    nom: string;
    lien: string;
}

interface IntervenantData {
    activites: string[];
    image: File | string | null;
    description: string;
    reseauxSociaux: ReseauSocial[];
}

interface UserDetail {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
    intervenantData?: IntervenantData;
}

// Données mockées pour simulation - À remplacer par l'appel API
const getMockUserDetail = (id: string): UserDetail => {
    const mockUsers: Record<string, UserDetail> = {
        '1': {
            id: 1,
            firstName: 'Jean',
            lastName: 'Dupont',
            phone: '07 12 34 56 78',
            email: 'jean.dupont@example.com',
            role: 'Superviseur',
            status: 'Actif',
            createdAt: '2024-01-15',
        },
        '2': {
            id: 2,
            firstName: 'Marie',
            lastName: 'Martin',
            phone: '05 98 76 54 32',
            email: 'marie.martin@example.com',
            role: 'Intervenant',
            status: 'Actif',
            createdAt: '2024-02-10',
            intervenantData: {
                activites: ['1', '2'],
                image: 'https://via.placeholder.com/150',
                description: '<p><strong>Marie Martin</strong> - Experte en développement web</p><p>10 ans d\'expérience en React et TypeScript. Passionnée par les interfaces utilisateur modernes et l\'accessibilité.</p>',
                reseauxSociaux: [
                    { nom: 'LinkedIn', lien: 'https://linkedin.com/in/mariemartin' },
                    { nom: 'GitHub', lien: 'https://github.com/mariemartin' },
                    { nom: 'Twitter', lien: 'https://twitter.com/mariemartin' }
                ]
            }
        },
        '3': {
            id: 3,
            firstName: 'Pierre',
            lastName: 'Kouassi',
            phone: '01 23 45 67 89',
            email: 'pierre.kouassi@example.com',
            role: "Agent d'admission",
            status: 'Inactif',
            createdAt: '2024-01-20',
        }
    };

    return mockUsers[id] || mockUsers['1'];
};

const DetailAccessPage: React.FC = () => {
    const router = useRouter();
    const params = useParams();
    const theme = useTheme();
    const authId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<UserDetail | null>(null);

    // Chargement des données
    useEffect(() => {
        const loadUserData = async () => {
            try {
                setLoading(true);

                // TODO: Remplacer par l'appel API réel
                // const response = await fetch(`/api/authorizations/${authId}`);
                // const data = await response.json();

                // Simulation d'un délai d'API
                await new Promise(resolve => setTimeout(resolve, 1000));
                const data = getMockUserDetail(authId);

                setUserData(data);

            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
            } finally {
                setLoading(false);
            }
        };

        if (authId) {
            loadUserData();
        }
    }, [authId]);

    const handleBack = () => {
        router.push('/organisateur/gestionhabilitations');
    };

    const handleEdit = () => {
        router.push(`/organisateur/gestionhabilitations/${authId}/modifier`);
    };

    const getRoleColor = (role: string): 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' => {
        switch (role) {
            case 'Superviseur':
                return 'primary';
            case 'Intervenant':
                return 'info';
            case "Agent d'admission":
                return 'secondary';
            case 'Guichetier':
                return 'warning';
            default:
                return 'default';
        }
    };

    const getStatusColor = (status: string): 'success' | 'error' => {
        return status === 'Actif' ? 'success' : 'error';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    // Liste des activités (à adapter selon vos données)
    const activites = [
        { id: '1', nom: 'Activité 1' },
        { id: '2', nom: 'Activité 2' },
        { id: '3', nom: 'Activité 3' },
    ];

    // Affichage du loader pendant le chargement
    if (loading || !userData) {
        return <Loading />;
    }

    return (
        <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            {/* En-tête */}
            <Card sx={{ borderRadius: 2, mb: 2 }}>
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
                                Détail de l'Accès utilisateur
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Informations de l'utilisateur
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Label variant="soft" color={getRoleColor(userData.role)}>
                            {userData.role}
                        </Label>
                        <Label variant="soft" color={getStatusColor(userData.status)}>
                            {userData.status}
                        </Label>
                        <IconButton
                            onClick={handleEdit}
                            sx={{
                                ml: 1,
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                }
                            }}
                        >
                            <Edit />
                        </IconButton>
                    </Box>
                </Box>
            </Card>

            {/* Contenu principal */}
            <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
                <Grid container spacing={2}>
                    {/* Informations utilisateur */}
                    <Grid item xs={12}>
                        <Card>
                            <Box sx={{
                                p: 2,
                                backgroundColor: '#fafafa',
                                borderBottom: '1px solid #e0e0e0'
                            }}>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Informations Utilisateur
                                </Typography>
                            </Box>
                            <Box sx={{ p: 3 }}>
                                {/* Avatar et informations principales */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                                    <Avatar
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            bgcolor: theme.palette.primary.main,
                                            fontSize: '32px',
                                            fontWeight: 600,
                                            mr: 3
                                        }}
                                    >
                                        {userData.firstName[0]}{userData.lastName[0]}
                                    </Avatar>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                                            {userData.firstName} {userData.lastName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            {userData.email}
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Label variant="soft" color={getRoleColor(userData.role)}>
                                                {userData.role}
                                            </Label>
                                            <Label variant="soft" color={getStatusColor(userData.status)}>
                                                {userData.status}
                                            </Label>
                                        </Box>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 3 }} />

                                {/* Détails en grille */}
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                                                Nom
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {userData.lastName}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                                                Prénom
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {userData.firstName}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                                                Email
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500, color: 'primary.main' }}>
                                                {userData.email}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                                                Téléphone
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {userData.phone}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                                                Rôle
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {userData.role}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <Box>
                                            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                                                Date de création
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                                {formatDate(userData.createdAt)}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </Grid>

                    {/* Informations supplémentaires Intervenant */}
                    {userData.role === 'Intervenant' && userData.intervenantData && (
                        <Grid item xs={12}>
                            <Card>
                                <Box sx={{
                                    p: 2,
                                    backgroundColor: '#fafafa',
                                    borderBottom: '1px solid #e0e0e0'
                                }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        Informations Supplémentaires - Intervenant
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    {/* Activités */}
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                                            Activités assignées
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                            {userData.intervenantData.activites.map((actId) => {
                                                const activite = activites.find(a => a.id === actId);
                                                return (
                                                    <Chip
                                                        key={actId}
                                                        label={activite?.nom || actId}
                                                        color="primary"
                                                        variant="outlined"
                                                    />
                                                );
                                            })}
                                        </Box>
                                    </Box>

                                    <Divider sx={{ my: 3 }} />

                                    {/* Informations de l'intervenant */}
                                    <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                                        Profil de l'intervenant
                                    </Typography>
                                    <Card variant="outlined" sx={{ p: 3, bgcolor: '#fafbfc' }}>
                                        <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                                            {/* Image */}
                                            <Box
                                                component="img"
                                                src={
                                                    typeof userData.intervenantData.image === 'string'
                                                        ? userData.intervenantData.image
                                                        : userData.intervenantData.image
                                                            ? URL.createObjectURL(userData.intervenantData.image)
                                                            : 'https://via.placeholder.com/150'
                                                }
                                                alt="Intervenant"
                                                sx={{
                                                    width: 120,
                                                    height: 120,
                                                    borderRadius: 2,
                                                    objectFit: 'cover',
                                                    border: '2px solid',
                                                    borderColor: 'divider'
                                                }}
                                            />

                                            {/* Description et réseaux */}
                                            <Box sx={{ flex: 1 }}>
                                                <Typography
                                                    variant="body1"
                                                    dangerouslySetInnerHTML={{ __html: userData.intervenantData.description }}
                                                    sx={{
                                                        '& p': { margin: 0, mb: 1 },
                                                        '& strong': { fontWeight: 600 },
                                                        mb: 2
                                                    }}
                                                />

                                                {/* Réseaux sociaux */}
                                                {userData.intervenantData.reseauxSociaux.length > 0 && (
                                                    <Box>
                                                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                                                            Réseaux sociaux:
                                                        </Typography>
                                                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                                            {userData.intervenantData.reseauxSociaux.map((reseau, idx) => (
                                                                <Chip
                                                                    key={idx}
                                                                    label={reseau.nom}
                                                                    size="small"
                                                                    variant="outlined"
                                                                    onClick={() => window.open(reseau.lien, '_blank')}
                                                                    sx={{ cursor: 'pointer' }}
                                                                    icon={<Iconify icon="mdi:link-variant" width={14} />}
                                                                />
                                                            ))}
                                                        </Stack>
                                                    </Box>
                                                )}
                                            </Box>
                                        </Box>
                                    </Card>
                                </Box>
                            </Card>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

export default DetailAccessPage;