//src/app/organisateur/gestionparticipant/demandes-inscription/page.tsx

'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import {
    Search as SearchIcon,
    Check as CheckIcon,
    Close as CloseIcon,
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
    Checkbox,
    Breadcrumbs,
    Link,
    Grid2 as Grid,
    Tooltip,
    Select,
    MenuItem,
    FormControl,
} from '@mui/material';

// Import des composants
import { Label } from 'src/components/label';
import { SuperviseurWidgetSummary } from 'src/sections/overview/superviseur/view/superviseur-widget-summary-2';

// ============================================
// TYPES
// ============================================

/**
 * Type pour le statut d'une demande
 */
type StatutDemande = 'Acceptée' | 'Refusée' | 'En attente';

/**
 * Interface pour une demande d'inscription
 */
interface DemandeInscription {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    date: string;
    statut: StatutDemande;
}

// ============================================
// DONNÉES INITIALES
// ============================================

const DEMANDES_INITIALES: DemandeInscription[] = [
    {
        id: 1,
        nom: 'Baoulou',
        prenom: 'Kouadio Ernest',
        email: 'baou@gmail.com',
        telephone: '+225 07 12 34 56 78',
        date: '07/01/2024 10H00',
        statut: 'Acceptée',
    },
    {
        id: 2,
        nom: 'Kouassi',
        prenom: 'Marie',
        email: 'marie.kouassi@gmail.com',
        telephone: '+225 05 23 45 67 89',
        date: '01/06/2024 17H00',
        statut: 'Refusée',
    },
    {
        id: 3,
        nom: 'Yao',
        prenom: 'Jean',
        email: 'jean.yao@gmail.com',
        telephone: '+225 07 34 56 78 90',
        date: '14/09/2024 11H00',
        statut: 'En attente',
    },
    {
        id: 4,
        nom: 'Koné',
        prenom: 'Fatou',
        email: 'fatou.kone@gmail.com',
        telephone: '+225 01 45 67 89 01',
        date: '15/09/2024 14H30',
        statut: 'En attente',
    },
    {
        id: 5,
        nom: 'Traoré',
        prenom: 'Ibrahim',
        email: 'ibrahim.traore@gmail.com',
        telephone: '+225 07 56 78 90 12',
        date: '16/09/2024 09H15',
        statut: 'Acceptée',
    },
];

// ============================================
// CONFIGURATION
// ============================================

const ROWS_PER_PAGE = 10;

// ============================================
// COMPOSANT PRINCIPAL
// ============================================

/**
 * Page de gestion des demandes d'inscription
 * Permet de traiter les demandes d'inscription des participants
 * avec filtrage, recherche et actions en lot
 */
const DemandesInscriptionPage = () => {
    const router = useRouter();

    // ============================================
    // ÉTATS
    // ============================================

    const [demandes, setDemandes] = useState<DemandeInscription[]>(DEMANDES_INITIALES);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDemandes, setSelectedDemandes] = useState<number[]>([]);
    const [statutFilter, setStatutFilter] = useState('');
    const [actionLot, setActionLot] = useState('');
    const [page, setPage] = useState(1);

    // ============================================
    // CALCULS MÉMORISÉS
    // ============================================

    /**
     * Statistiques calculées à partir des demandes
     */
    const stats = useMemo(() => ({
        total: demandes.length,
        acceptees: demandes.filter(d => d.statut === 'Acceptée').length,
        refusees: demandes.filter(d => d.statut === 'Refusée').length,
        enAttente: demandes.filter(d => d.statut === 'En attente').length,
    }), [demandes]);

    /**
     * Filtrage des demandes selon recherche et filtre de statut
     */
    const filteredDemandes = useMemo(() => {
        return demandes.filter(demande => {
            const matchesSearch =
                demande.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                demande.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                demande.email.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatut = !statutFilter || demande.statut === statutFilter;

            return matchesSearch && matchesStatut;
        });
    }, [demandes, searchTerm, statutFilter]);

    /**
     * Pagination des demandes filtrées
     */
    const { totalPages, paginatedDemandes } = useMemo(() => {
        const total = Math.ceil(filteredDemandes.length / ROWS_PER_PAGE);
        const paginated = filteredDemandes.slice(
            (page - 1) * ROWS_PER_PAGE,
            page * ROWS_PER_PAGE
        );
        return { totalPages: total, paginatedDemandes: paginated };
    }, [filteredDemandes, page]);

    // ============================================
    // HANDLERS - NAVIGATION
    // ============================================

    /**
     * Retour à la page de gestion des participants
     */
    const handleBackToManagement = () => {
        router.push('/organisateur/gestionparticipant');
    };

    /**
     * Changement de page
     */
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setSelectedDemandes([]); // Réinitialiser la sélection lors du changement de page
    };

    // ============================================
    // HANDLERS - SÉLECTION
    // ============================================

    /**
     * Sélection/désélection d'une demande
     */
    const handleSelectDemande = (id: number) => {
        setSelectedDemandes(prev =>
            prev.includes(id)
                ? prev.filter(demandeId => demandeId !== id)
                : [...prev, id]
        );
    };

    /**
     * Sélection/désélection de toutes les demandes de la page
     */
    const handleSelectAll = () => {
        if (selectedDemandes.length === paginatedDemandes.length) {
            setSelectedDemandes([]);
        } else {
            setSelectedDemandes(paginatedDemandes.map(d => d.id));
        }
    };

    // ============================================
    // HANDLERS - ACTIONS INDIVIDUELLES
    // ============================================

    /**
     * Accepter une demande individuelle
     */
    const handleAccepter = (id: number) => {
        setDemandes(prev =>
            prev.map(d => d.id === id ? { ...d, statut: 'Acceptée' as const } : d)
        );
        console.log(`Demande ${id} acceptée`);
        // TODO: Appel API pour accepter la demande
    };

    /**
     * Refuser une demande individuelle
     */
    const handleRefuser = (id: number) => {
        setDemandes(prev =>
            prev.map(d => d.id === id ? { ...d, statut: 'Refusée' as const } : d)
        );
        console.log(`Demande ${id} refusée`);
        // TODO: Appel API pour refuser la demande
    };

    // ============================================
    // HANDLERS - ACTIONS EN LOT
    // ============================================

    /**
     * Traitement en lot des demandes sélectionnées
     */
    const handleActionLot = () => {
        if (!actionLot || selectedDemandes.length === 0) return;

        if (actionLot === 'accepter') {
            setDemandes(prev =>
                prev.map(d =>
                    selectedDemandes.includes(d.id)
                        ? { ...d, statut: 'Acceptée' as const }
                        : d
                )
            );
            console.log(`${selectedDemandes.length} demandes acceptées`);
            // TODO: Appel API pour accepter les demandes en lot
        } else if (actionLot === 'refuser') {
            setDemandes(prev =>
                prev.map(d =>
                    selectedDemandes.includes(d.id)
                        ? { ...d, statut: 'Refusée' as const }
                        : d
                )
            );
            console.log(`${selectedDemandes.length} demandes refusées`);
            // TODO: Appel API pour refuser les demandes en lot
        }

        // Réinitialiser la sélection et l'action
        setSelectedDemandes([]);
        setActionLot('');
    };

    // ============================================
    // HELPERS
    // ============================================

    /**
     * Obtenir la couleur du label selon le statut
     */
    const getStatutColor = (statut: StatutDemande): 'success' | 'error' | 'warning' => {
        switch (statut) {
            case 'Acceptée':
                return 'success';
            case 'Refusée':
                return 'error';
            case 'En attente':
                return 'warning';
        }
    };

    /**
     * Détermine si le bouton "Accepter" doit être affiché
     */
    const shouldShowAccepter = (statut: StatutDemande): boolean => {
        return statut === 'En attente' || statut === 'Refusée';
    };

    /**
     * Détermine si le bouton "Refuser" doit être affiché
     */
    const shouldShowRefuser = (statut: StatutDemande): boolean => {
        return statut === 'En attente' || statut === 'Acceptée';
    };

    // ============================================
    // RENDER
    // ============================================

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 } }}>
            <Stack spacing={4}>
                {/* En-tête avec breadcrumbs */}
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: '1.5rem', md: '2rem' },
                            mb: 1,
                        }}
                    >
                        Traitement des demandes d'inscription
                    </Typography>

                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            component="button"
                            variant="body2"
                            onClick={handleBackToManagement}
                            sx={{
                                textDecoration: 'none',
                                fontWeight: 500,
                                fontSize: { xs: '0.875rem', md: '1rem' },
                                '&:hover': { textDecoration: 'underline' }
                            }}
                        >
                            Gestion des participants
                        </Link>
                        <Typography
                            variant="body2"
                            color="text.primary"
                            sx={{
                                fontWeight: 500,
                                fontSize: { xs: '0.875rem', md: '1rem' },
                            }}
                        >
                            Traitement des demandes d'inscription
                        </Typography>
                    </Breadcrumbs>
                </Box>

                {/* Statistiques */}
                <Card sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <SuperviseurWidgetSummary
                                title="Nombre de demandes reçues"
                                total={stats.total}
                                color="warning"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <SuperviseurWidgetSummary
                                title="Nombre de demandes acceptées"
                                total={stats.acceptees}
                                color="success"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <SuperviseurWidgetSummary
                                title="Nombre de demandes rejetées"
                                total={stats.refusees}
                                color="error"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <SuperviseurWidgetSummary
                                title="Nombre de demandes en attente"
                                total={stats.enAttente}
                                color="info"
                            />
                        </Grid>
                    </Grid>
                </Card>

                {/* Carte principale */}
                <Card
                    sx={{
                        borderRadius: 2,
                        boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
                    }}
                >
                    {/* Barre d'outils */}
                    <Box sx={{ p: { xs: 2, md: 3 }, borderBottom: 1, borderColor: 'divider' }}>
                        <Stack spacing={3}>
                            {/* Ligne 1: Titre, Recherche et filtre */}
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                                alignItems={{ xs: 'stretch', sm: 'center' }}
                                justifyContent="space-between"
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: { xs: '1rem', md: '1.125rem' },
                                    }}
                                >
                                    Liste des demandes d'inscription
                                </Typography>

                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
                                            minWidth: { xs: '100%', sm: 250 },
                                            '& .MuiInputBase-root': {
                                                fontSize: { xs: '0.875rem', md: '1rem' },
                                            }
                                        }}
                                    />

                                    <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 150 } }}>
                                        <Select
                                            value={statutFilter}
                                            onChange={(e) => setStatutFilter(e.target.value)}
                                            displayEmpty
                                            sx={{
                                                backgroundColor: 'white',
                                                fontSize: { xs: '0.875rem', md: '1rem' },
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
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        alignItems: { xs: 'stretch', sm: 'center' },
                                        justifyContent: 'space-between',
                                        gap: 2,
                                        p: 2,
                                        backgroundColor: 'primary.lighter',
                                        borderRadius: 1,
                                        border: 1,
                                        borderColor: 'primary.light',
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontWeight: 600,
                                            color: 'primary.dark',
                                            fontSize: { xs: '0.875rem', md: '1rem' },
                                        }}
                                    >
                                        {selectedDemandes.length} demande{selectedDemandes.length > 1 ? 's' : ''} sélectionnée{selectedDemandes.length > 1 ? 's' : ''}
                                    </Typography>

                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                        <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 200 } }}>
                                            <Select
                                                value={actionLot}
                                                onChange={(e) => setActionLot(e.target.value)}
                                                displayEmpty
                                                sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
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
                                                fontSize: { xs: '0.875rem', md: '1rem' },
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
                    <Box sx={{ p: { xs: 2, md: 3 } }}>
                        <TableContainer
                            component={Paper}
                            variant="outlined"
                            sx={{
                                borderRadius: 1,
                                overflowX: 'auto',
                            }}
                        >
                            <Table sx={{ minWidth: 800 }}>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: 'grey.50' }}>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                indeterminate={
                                                    selectedDemandes.length > 0 &&
                                                    selectedDemandes.length < paginatedDemandes.length
                                                }
                                                checked={
                                                    paginatedDemandes.length > 0 &&
                                                    selectedDemandes.length === paginatedDemandes.length
                                                }
                                                onChange={handleSelectAll}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                            Nom
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                            Prénom
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                            Email
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                            Téléphone
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                            Date
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                            Statut
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                            Action
                                        </TableCell>
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
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 500,
                                                        fontSize: { xs: '0.8125rem', md: '0.875rem' },
                                                    }}
                                                >
                                                    {demande.nom}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ fontSize: { xs: '0.8125rem', md: '0.875rem' } }}
                                                >
                                                    {demande.prenom}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ fontSize: { xs: '0.8125rem', md: '0.875rem' } }}
                                                >
                                                    {demande.email}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ fontSize: { xs: '0.8125rem', md: '0.875rem' } }}
                                                >
                                                    {demande.telephone}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontWeight: 500,
                                                        fontSize: { xs: '0.8125rem', md: '0.875rem' },
                                                    }}
                                                >
                                                    {demande.date}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Label
                                                    color={getStatutColor(demande.statut)}
                                                    variant="soft"
                                                    sx={{ fontSize: { xs: '0.75rem', md: '0.8125rem' } }}
                                                >
                                                    {demande.statut}
                                                </Label>
                                            </TableCell>
                                            <TableCell>
                                                <Stack direction="row" spacing={1}>
                                                    {/* Bouton Accepter : visible si "En attente" ou "Refusée" */}
                                                    {shouldShowAccepter(demande.statut) && (
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
                                                    )}

                                                    {/* Bouton Refuser : visible si "En attente" ou "Acceptée" */}
                                                    {shouldShowRefuser(demande.statut) && (
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
                                                    )}
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="medium"
                                />
                            </Box>
                        )}
                    </Box>
                </Card>

                {/* Footer */}
                <Box
                    sx={{
                        mt: 4,
                        py: 3,
                        borderTop: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                    >
                        © 2024 EVENTQUORUM. Powered by FX_LABS SARL.
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="text"
                            size="small"
                            sx={{
                                textTransform: 'none',
                                fontSize: { xs: '0.75rem', md: '0.875rem' },
                            }}
                        >
                            Confidentialité
                        </Button>
                        <Button
                            variant="text"
                            size="small"
                            sx={{
                                textTransform: 'none',
                                fontSize: { xs: '0.75rem', md: '0.875rem' },
                            }}
                        >
                            Aide
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default DemandesInscriptionPage;