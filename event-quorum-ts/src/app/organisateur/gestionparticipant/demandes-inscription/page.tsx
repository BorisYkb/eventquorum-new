//src/app/organisateur/gestionparticipant/demandes-inscription/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    Checkbox,
    Breadcrumbs,
    Link,
    Grid2 as Grid,
    Tooltip,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Search as SearchIcon,
    Check as CheckIcon,
    Close as CloseIcon,
    FilterList as FilterListIcon,
} from '@mui/icons-material';

// Import du composant de statistiques
import { SuperviseurWidgetSummary } from 'src/sections/overview/superviseur/view/superviseur-widget-summary-2';
// Import du composant Label
import { Label } from 'src/components/label';

// Interface pour les demandes d'inscription
interface DemandeInscription {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    date: string;
    statut: 'Acceptée' | 'Refusée' | 'En attente';
}

/**
 * Page de gestion des demandes d'inscription
 * Permet de traiter les demandes d'inscription des participants
 * avec filtrage, recherche et actions en lot
 */
const DemandesInscriptionPage = () => {
    const router = useRouter();

    // États pour la gestion des données et filtres
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDemandes, setSelectedDemandes] = useState<number[]>([]);
    const [statutFilter, setStatutFilter] = useState('');
    const [actionLot, setActionLot] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(10);

    // Données simulées des demandes
    const [demandes, setDemandes] = useState<DemandeInscription[]>([
        {
            id: 1,
            nom: 'Baoulou',
            prenom: 'Kouadio Ernest',
            email: 'baou@gmail.com',
            telephone: 'Téléphone',
            date: '07/01/2024 10H00',
            statut: 'Acceptée',
        },
        {
            id: 2,
            nom: 'Nom de famille',
            prenom: 'Prénom',
            email: 'Email',
            telephone: 'Téléphone',
            date: '01/06/2024 17H00',
            statut: 'Refusée',
        },
        {
            id: 3,
            nom: 'Nom de famille',
            prenom: 'Prénom',
            email: 'Email',
            telephone: 'Téléphone',
            date: '14/09/2024 11H00',
            statut: 'En attente',
        },
    ]);

    // Statistiques calculées
    const stats = {
        total: demandes.length,
        acceptees: demandes.filter(d => d.statut === 'Acceptée').length,
        refusees: demandes.filter(d => d.statut === 'Refusée').length,
        enAttente: demandes.filter(d => d.statut === 'En attente').length,
    };

    /**
     * Filtrage des demandes
     */
    const filteredDemandes = demandes.filter(demande => {
        const matchesSearch =
            demande.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            demande.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            demande.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatut = !statutFilter || demande.statut === statutFilter;

        return matchesSearch && matchesStatut;
    });

    const totalPages = Math.ceil(filteredDemandes.length / rowsPerPage);
    const paginatedDemandes = filteredDemandes.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    /**
     * Retour à la page de gestion des participants
     */
    const handleBackToManagement = () => {
        router.push('/organisateur/gestionparticipant');
    };

    /**
     * Retour à la page précédente
     */
    const handleBack = () => {
        router.back();
    };

    /**
     * Sélection/désélection d'une demande
     */
    const handleSelectDemande = (id: number) => {
        if (selectedDemandes.includes(id)) {
            setSelectedDemandes(selectedDemandes.filter(demandeId => demandeId !== id));
        } else {
            setSelectedDemandes([...selectedDemandes, id]);
        }
    };

    /**
     * Sélection/désélection de toutes les demandes
     */
    const handleSelectAll = () => {
        if (selectedDemandes.length === paginatedDemandes.length) {
            setSelectedDemandes([]);
        } else {
            setSelectedDemandes(paginatedDemandes.map(d => d.id));
        }
    };

    /**
     * Accepter une demande individuelle
     */
    const handleAccepter = (id: number) => {
        setDemandes(prev =>
            prev.map(d => d.id === id ? { ...d, statut: 'Acceptée' as const } : d)
        );
    };

    /**
     * Refuser une demande individuelle
     */
    const handleRefuser = (id: number) => {
        setDemandes(prev =>
            prev.map(d => d.id === id ? { ...d, statut: 'Refusée' as const } : d)
        );
    };

    /**
     * Traitement en lot des demandes sélectionnées
     */
    const handleActionLot = () => {
        if (!actionLot || selectedDemandes.length === 0) return;

        if (actionLot === 'accepter') {
            setDemandes(prev =>
                prev.map(d => selectedDemandes.includes(d.id) ? { ...d, statut: 'Acceptée' as const } : d)
            );
        } else if (actionLot === 'refuser') {
            setDemandes(prev =>
                prev.map(d => selectedDemandes.includes(d.id) ? { ...d, statut: 'Refusée' as const } : d)
            );
        }

        setSelectedDemandes([]);
        setActionLot('');
    };

    /**
     * Changement de page
     */
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    /**
     * Obtenir la couleur du statut
     */
    const getStatutColor = (statut: string) => {
        switch (statut) {
            case 'Acceptée':
                return 'success';
            case 'Refusée':
                return 'error';
            case 'En attente':
                return 'warning';
            default:
                return 'default';
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 2 }}>
            <Stack spacing={4}>
                {/* En-tête avec breadcrumbs et navigation */}
                <Box>
                    {/* Titre principal */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                Traitement des demandes d'inscription
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
                                        '&:hover': { textDecoration: 'underline' }
                                    }}
                                >
                                    Gestion des participants
                                </Link>
                                <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                                    Traitement des demandes d'inscription
                                </Typography>
                            </Breadcrumbs>
                        </Box>

                        <Button
                            variant="contained"
                            startIcon={<ArrowBackIcon />}
                            onClick={handleBack}
                            sx={{
                                backgroundColor: '#000',
                                color: 'white',
                                '&:hover': { backgroundColor: '#333' },
                                borderRadius: 1,
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 3,
                            }}
                        >
                            Retour
                        </Button>
                    </Box>
                </Box>

                {/* Statistiques */}
                <Card sx={{ p: 3, borderRadius: 2 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <SuperviseurWidgetSummary
                                title="Nombre de demandes reçues"
                                total={stats.total}
                                color="warning"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <SuperviseurWidgetSummary
                                title="Nombre de demandes acceptées"
                                total={stats.acceptees}
                                color="success"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <SuperviseurWidgetSummary
                                title="Nombre de demandes rejetées"
                                total={stats.refusees}
                                color="error"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <SuperviseurWidgetSummary
                                title="Nombre de demandes en attente"
                                total={stats.enAttente}
                                color="info"
                            />
                        </Grid>
                    </Grid>
                </Card>

                {/* Carte principale */}
                <Card sx={{
                    borderRadius: 2,
                    boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
                }}>
                    {/* Barre d'outils */}
                    <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                        <Stack spacing={3}>
                            {/* Ligne 1: Recherche et filtre */}
                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    Liste des demandes d'inscription
                                </Typography>

                                <Stack direction="row" spacing={2} alignItems="center">
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
                                        sx={{ minWidth: 250 }}
                                    />

                                    <FormControl size="small" sx={{ minWidth: 150 }}>
                                        <Select
                                            value={statutFilter}
                                            onChange={(e) => setStatutFilter(e.target.value)}
                                            displayEmpty
                                            sx={{
                                                backgroundColor: 'white',
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    borderColor: 'grey.300',
                                                }
                                            }}
                                        >
                                            <MenuItem value="">Tous les statuts</MenuItem>
                                            <MenuItem value="Acceptée">Acceptée</MenuItem>
                                            <MenuItem value="Refusée">Refusée</MenuItem>
                                            <MenuItem value="En attente">En attente</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Stack>

                            {/* Actions en lot si des éléments sont sélectionnés */}
                            {selectedDemandes.length > 0 && (
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    p: 2,
                                    backgroundColor: 'primary.lighter',
                                    borderRadius: 1,
                                    border: 1,
                                    borderColor: 'primary.light',
                                }}>
                                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.dark' }}>
                                        {selectedDemandes.length} demande{selectedDemandes.length > 1 ? 's' : ''} sélectionnée{selectedDemandes.length > 1 ? 's' : ''}
                                    </Typography>

                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <FormControl size="small" sx={{ minWidth: 200 }}>
                                            <Select
                                                value={actionLot}
                                                onChange={(e) => setActionLot(e.target.value)}
                                                displayEmpty
                                            >
                                                <MenuItem value="">Choisir une action</MenuItem>
                                                <MenuItem value="accepter">Accepter les demandes sélectionnées</MenuItem>
                                                <MenuItem value="refuser">Rejeter les demandes sélectionnées</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <Button
                                            variant="contained"
                                            onClick={handleActionLot}
                                            disabled={!actionLot}
                                            sx={{
                                                backgroundColor: '#1976D2',
                                                '&:hover': { backgroundColor: '#1565C0' },
                                                borderRadius: 1,
                                                textTransform: 'none',
                                                fontWeight: 600,
                                            }}
                                        >
                                            Valider
                                        </Button>
                                    </Stack>
                                </Box>
                            )}
                        </Stack>
                    </Box>

                    {/* Tableau des demandes */}
                    <Box sx={{ p: 3 }}>
                        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 1 }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: 'grey.50' }}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                indeterminate={selectedDemandes.length > 0 && selectedDemandes.length < paginatedDemandes.length}
                                                checked={paginatedDemandes.length > 0 && selectedDemandes.length === paginatedDemandes.length}
                                                onChange={handleSelectAll}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Nom</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Prénom</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Téléphone</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedDemandes.map((demande) => (
                                        <TableRow key={demande.id} hover>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={selectedDemandes.includes(demande.id)}
                                                    onChange={() => handleSelectDemande(demande.id)}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {demande.nom}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {demande.prenom}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" color="primary.main">
                                                    {demande.email}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {demande.telephone}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {demande.date}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Label
                                                    color={getStatutColor(demande.statut)}
                                                    variant="soft"
                                                >
                                                    {demande.statut}
                                                </Label>
                                            </TableCell>
                                            <TableCell>
                                                <Stack direction="row" spacing={1}>
                                                    <Tooltip title="Accepter">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleAccepter(demande.id)}
                                                            sx={{
                                                                color: 'success.main',
                                                                '&:hover': { backgroundColor: 'success.lighter' }
                                                            }}
                                                        >
                                                            <CheckIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Refuser">
                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleRefuser(demande.id)}
                                                            sx={{
                                                                color: 'error.main',
                                                                '&:hover': { backgroundColor: 'error.lighter' }
                                                            }}
                                                        >
                                                            <CloseIcon fontSize="small" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Pagination */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                size="medium"
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
                        © 2024 EVENTQUORUM EVENTS. Powered by PCI_LABS SARL.
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

export default DemandesInscriptionPage;