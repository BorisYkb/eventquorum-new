'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
    ArrowBack as ArrowBackIcon,
    Search as SearchIcon,
    Download as DownloadIcon,
    Person as PersonIcon,
} from '@mui/icons-material';
import {
    Box,
    Card,
    Container,
    Stack,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    InputAdornment,
    IconButton,
    Pagination,
    Select,
    MenuItem,
    FormControl,
    Avatar,
    Tabs,
    Tab,
    Breadcrumbs,
    Link,
    Chip,
} from '@mui/material';

// Interface pour les participants
interface Participant {
    id: number;
    nom_prenom: string;
    email: string;
    connecte: boolean;
    emmarger: boolean;
}

/**
 * Page de consultation des participants connectés
 * Affiche la liste des connectés avec leur statut d'émargement
 * Permet la recherche, filtrage par statut et exportation des données
 */
const ConsultationPage = () => {
    const router = useRouter();

    // États pour la gestion des données et filtres
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'tous' | 'oui' | 'non'>('tous');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Données simulées des participants
    const participants: Participant[] = [
        {
            id: 1,
            nom_prenom: 'Koffi Emmanuel',
            email: 'koffi@gmail.com',
            connecte: true,
            emmarger: true,
        },
        {
            id: 2,
            nom_prenom: 'Kouassi Marie',
            email: 'kouassi@gmail.com',
            connecte: true,
            emmarger: false,
        },
        {
            id: 3,
            nom_prenom: 'Ouattara Jean',
            email: 'jean@gmail.com',
            connecte: true,
            emmarger: true,
        },
        {
            id: 4,
            nom_prenom: 'Traore Fatou',

            email: 'fatou@gmail.com',
            connecte: true,
            emmarger: true,
        },
        {
            id: 5,
            nom_prenom: 'Bamba Sekou',

            email: 'sekou@gmail.com',
            connecte: true,
            emmarger: false,
        },
        {
            id: 6,
            nom_prenom: 'Diallo Aminata',
        
            email: 'aminata@gmail.com',
            connecte: true,
            emmarger: true,
        },
        {
            id: 7,
            nom_prenom: 'Yao Kouadio',
        
            email: 'kouadio@gmail.com',
            connecte: true,
            emmarger: false,
        },
        {
            id: 8,
            nom_prenom: 'Sangare Ibrahim',
        
            email: 'ibrahim@gmail.com',
            connecte: true,
            emmarger: true,
        },
        {
            id: 9,
            nom_prenom: 'Kone Mariam',
    
            email: 'mariam@gmail.com',
            connecte: true,
            emmarger: true,
        },
        {
            id: 10,
            nom_prenom: 'Toure Abou',
            email: 'abou@gmail.com',
            connecte: true,
            emmarger: false,
        },
    ];

    /**
     * Filtrage des participants selon le terme de recherche et le statut
     */
    const getFilteredParticipants = () => {
        let filtered = participants.filter(p => p.connecte);

        // Filtrage par statut d'émargement
        if (statusFilter === 'oui') {
            filtered = filtered.filter(p => p.emmarger);
        } else if (statusFilter === 'non') {
            filtered = filtered.filter(p => !p.emmarger);
        }

        // Filtrage par terme de recherche
        if (searchTerm) {
            filtered = filtered.filter(participant =>
                participant.nom_prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                participant.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filtered;
    };

    const filteredParticipants = getFilteredParticipants();
    const totalPages = Math.ceil(filteredParticipants.length / rowsPerPage);
    const paginatedParticipants = filteredParticipants.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    /**
     * Retour à la page de gestion des participants
     */
    const handleBackToManagement = () => {
        router.push('/superviseur/participants');
    };

    /**
     * Retour à la page précédente
     */
    const handleBack = () => {
        router.back();
    };

    /**
     * Exportation des données
     */
    const handleExport = () => {
        console.log('Exporter la liste des connectés');
        // TODO: Implémenter l'exportation en CSV/Excel
    };

    /**
     * Changement de page de pagination
     */
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    /**
     * Changement du nombre d'éléments par page
     */
    const handleRowsPerPageChange = (event: any) => {
        setRowsPerPage(event.target.value);
        setPage(1);
    };

    /**
     * Changement du filtre de statut
     */
    const handleStatusFilterChange = (event: any) => {
        setStatusFilter(event.target.value);
        setPage(1);
    };

    return (
        <Container maxWidth="xl" sx={{ py: 2 }}>
            <Stack spacing={4}>
                {/* En-tête avec breadcrumbs et navigation */}
                <Box>
                    {/* Titre principal */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            onClick={handleBack}
                            sx={{
                                backgroundColor: 'grey.100',
                                '&:hover': { backgroundColor: 'grey.200' },
                                borderRadius: 1,
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                Consulter la liste des connectés
                            </Typography>
                            {/* Breadcrumbs */}
                            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={handleBackToManagement}
                                    sx={{
                                        textDecoration: 'none',
                                        color: 'primary.main',
                                        fontWeight: 500,
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        }
                                    }}
                                >
                                    Gestion des Participants
                                </Link>
                                <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                                    Liste des personnes connectées
                                </Typography>
                            </Breadcrumbs>
                        </Box>
                    </Box>
                </Box>

                {/* Carte principale */}
                <Card sx={{
                    borderRadius: 2,
                    boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
                    border: 1,
                    borderColor: 'divider'
                }}>
                    {/* En-tête de la carte */}
                    <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Liste des connectés
                        </Typography>
                    </Box>

                    {/* Barre d'outils */}
                    <Box sx={{
                        p: 3,
                        borderBottom: 1,
                        borderColor: 'divider',
                        backgroundColor: 'grey.50'
                    }}>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                            {/* Zone gauche : Informations, recherche et filtre */}
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    {filteredParticipants.length} personne{filteredParticipants.length > 1 ? 's' : ''} connectée{filteredParticipants.length > 1 ? 's' : ''}
                                </Typography>

                                <TextField
                                    size="small"
                                    placeholder="Rechercher..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ color: 'text.secondary' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        minWidth: 250,
                                        '& .MuiOutlinedInput-root': {
                                            backgroundColor: 'white',
                                        }
                                    }}
                                />

                                {/* Filtre par statut d'émargement */}
                                <FormControl size="small" sx={{ minWidth: 150 }}>
                                    <Select
                                        value={statusFilter}
                                        onChange={handleStatusFilterChange}
                                        displayEmpty
                                        sx={{
                                            backgroundColor: 'white',
                                        }}
                                    >
                                        <MenuItem value="tous">Tous les statuts</MenuItem>
                                        <MenuItem value="oui">Émargé : Oui</MenuItem>
                                        <MenuItem value="non">Émargé : Non</MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>

                            {/* Zone droite : Bouton d'exportation */}
                            <Button
                                variant="outlined"
                                startIcon={<DownloadIcon />}
                                onClick={handleExport}
                                sx={{
                                    borderRadius: 1,
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    borderColor: 'grey.300',
                                    color: 'text.inherit',
                                    '&:hover': {
                                        borderColor: 'grey.400',
                                        backgroundColor: 'grey.50',
                                    }
                                }}
                            >
                                Exporter
                            </Button>
                        </Stack>
                    </Box>

                    {/* Tableau des participants */}
                    <Box sx={{ p: 3 }}>
                        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 1 }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: 'grey.50' }}>
                                        <TableCell sx={{ fontWeight: 600, py: 2 }}>Nom et prénoms</TableCell>
                                        {/* <TableCell sx={{ fontWeight: 600, py: 2 }}>Prénom</TableCell> */}
                                        <TableCell sx={{ fontWeight: 600, py: 2 }}>Email</TableCell>
                                        <TableCell sx={{ fontWeight: 600, py: 2 }} align="center">À émarger ?</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedParticipants.map((participant, index) => (
                                        <TableRow
                                            key={participant.id}
                                            hover
                                            sx={{
                                                backgroundColor: index % 2 === 0 ? 'white' : 'grey.50'
                                                
                                            }}
                                        >
                                            <TableCell sx={{ py: 2 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {participant.nom_prenom}
                                                </Typography>
                                            </TableCell>
                                            {/* <TableCell sx={{ py: 2 }}>
                                                <Typography variant="body2">
                                                    {participant.prenom}
                                                </Typography>
                                            </TableCell> */}
                                            <TableCell sx={{ py: 2 }}>
                                                <Typography variant="body2">
                                                    {participant.email}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ py: 2 }} align="center">
                                                <Chip
                                                    label={participant.emmarger ? 'Oui' : 'Non'}
                                                    color={participant.emmarger ? 'success' : 'default'}
                                                    size="small"
                                                    sx={{
                                                        fontWeight: 500,
                                                        minWidth: 60,
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Contrôles de pagination */}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 3,
                            pt: 2,
                            borderTop: 1,
                            borderColor: 'divider'
                        }}>
                            {/* Sélecteur nombre par page */}
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Typography variant="body2" color="text.secondary">
                                    Affichage de
                                </Typography>
                                <FormControl size="small">
                                    <Select
                                        value={rowsPerPage}
                                        onChange={handleRowsPerPageChange}
                                        sx={{ minWidth: 60 }}
                                    >
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={15}>15</MenuItem>
                                        <MenuItem value={20}>20</MenuItem>
                                    </Select>
                                </FormControl>
                                <Typography variant="body2" color="text.secondary">
                                    sur {filteredParticipants.length}
                                </Typography>
                            </Stack>

                            {/* Pagination */}
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                size="medium"
                                showFirstButton
                                showLastButton
                            />
                        </Box>
                    </Box>
                </Card>

                {/* Footer */}
                <Box sx={{
                    mt: 4,
                    py: 3,
                    borderTop: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                }}>
                    <Typography variant="body2" color="text.secondary">
                        © 2024 EVENTQUORUM. Powered by FX_LABS SARL.
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
                            Confidentialité
                        </Button>
                        <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
                            Aide
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default ConsultationPage;