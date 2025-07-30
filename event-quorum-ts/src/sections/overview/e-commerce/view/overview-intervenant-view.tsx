
'use client';

import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/intervenant';
import { MotivationIllustration } from 'src/assets/illustrations';
import { useMockedUser } from 'src/auth/hooks';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import { EcommerceWelcome } from '../ecommerce-welcome';
import { IntervenantCarousel } from 'src/app/intervenant/components/intervenant-carousel';

// ----------------------------------------------------------------------

// Mock data pour les activités de l'intervenant
const MOCK_ACTIVITIES = [
    {
        id: 1,
        name: 'Activité 1',
        type: 'Atelier',
        title: 'Formation',
        status: 'En cours',
        date: '10/12/24 10H00 -> 10/12/24 17H00',
    },
    {
        id: 2,
        name: 'Activité 2',
        type: 'Salon',
        title: 'Innovations',
        status: 'Non démarrée',
        date: '11/12/24 10H00 -> 11/12/24 17H00',
    },
    {
        id: 3,
        name: 'Activité 3',
        type: 'Conférence',
        title: 'Diversité',
        status: 'Terminée',
        date: '12/12/24 10H00 -> 12/12/24 17H00',
    },
    {
        id: 4,
        name: 'Activité 4',
        type: 'Festival',
        title: 'Planète Verte',
        status: 'Non démarrée',
        date: '13/12/24 10H00 -> 13/12/24 17H00',
    },
];

// ----------------------------------------------------------------------

export function OverviewIntervenantView() {
    const { user } = useMockedUser();
    const theme = useTheme();
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrage des activités selon la recherche
    const filteredActivities = MOCK_ACTIVITIES.filter(activity =>
        activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'En cours':
                return 'success';
            case 'Non démarrée':
                return 'warning';
            case 'Terminée':
                return 'error';
            default:
                return 'default';
        }
    };

    const handleViewActivity = (activityId: number) => {
        console.log('Voir activité:', activityId);
        // Navigation vers les détails de l'activité
    };

    return (
        <DashboardContent maxWidth="xl">
            <Grid container spacing={3}>
                {/* Section de bienvenue */}
                <Grid size={{ xs: 12 }}>
                    <EcommerceWelcome
                        title={`Bienvenue 🎉, ${user?.displayName?.split(' ')[0] || 'Intervenant'} !`}
                        description="Nous sommes ravis de vous accueillir en tant qu'intervenant. Vous trouverez ci-dessous la liste des activités auxquelles vous avez accès durant l'événement."
                        img={<MotivationIllustration hideBackground />}
                    />
                </Grid>

                {/* Section principale - Liste des activités */}
                <Grid size={{ xs: 12 }}>
                    <Card sx={{ p: 3 }}>
                        {/* En-tête de la section */}
                        <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    LA LISTE DES ACTIVITÉS
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Iconify icon="eva:search-fill" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        },
                                    }}
                                />
                            </Grid>


                        </Grid>

                        {/* Tableau des activités */}
                        <TableContainer>
                            <Scrollbar>
                                <Table sx={{ minWidth: 800 }}>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: 'grey.50' }}>
                                            <TableCell sx={{ fontWeight: 600 }}>Activités</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Titre</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
                                            <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                                            <TableCell align="center" sx={{ fontWeight: 600 }}>Consulter</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {filteredActivities.map((activity) => (
                                            <TableRow
                                                key={activity.id}
                                                hover
                                                sx={{
                                                    '&:hover': {
                                                        bgcolor: 'action.hover',
                                                        cursor: 'pointer'
                                                    }
                                                }}
                                            >
                                                <TableCell>
                                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                        {activity.name}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography variant="body2">
                                                        {activity.type}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography variant="body2">
                                                        {activity.title}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Label
                                                        variant="soft"
                                                        color={getStatusColor(activity.status)}
                                                    >
                                                        {activity.status}
                                                    </Label>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {activity.date}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell align="center">
                                                    <Tooltip title="Voir détails" placement="top" arrow>
                                                        <IconButton
                                                            color="info"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleViewActivity(activity.id);
                                                            }}
                                                            size="small"
                                                        >
                                                            <Iconify icon="solar:eye-bold" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Scrollbar>
                        </TableContainer>

                        {/* Message si aucun résultat */}
                        {filteredActivities.length === 0 && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                align="center"
                                sx={{ py: 4 }}
                            >
                                Aucune activité trouvée pour "{searchTerm}"
                            </Typography>
                        )}
                    </Card>
                </Grid>

                {/* Section sponsors et partenaires */}
                {/* Section sponsors et partenaires (Carrousel) */}
                <Grid size={{ xs: 12 }}>
                    <IntervenantCarousel />
                </Grid>

                {/* Footer avec informations de l'événement */}
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
