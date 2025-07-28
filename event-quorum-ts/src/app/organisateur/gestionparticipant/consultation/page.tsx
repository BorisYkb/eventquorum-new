//src/app/organisateur/gestionparticipant/consultation/page.tsx
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
    Select,
    MenuItem,
    FormControl,
    Avatar,
    Tabs,
    Tab,
    Breadcrumbs,
    Link,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Search as SearchIcon,
    Download as DownloadIcon,
    Person as PersonIcon,
} from '@mui/icons-material';

// Interface pour les participants
interface Participant {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    connecte: boolean;
    present?: boolean;
}

/**
 * Page de consultation des participants connectés et présents
 * Affiche deux listes selon la maquette : connectés et présence
 * Permet la recherche, filtrage et exportation des données
 */
const ConsultationPage = () => {
    const router = useRouter();

    // États pour la gestion des données et filtres
    const [searchTerm, setSearchTerm] = useState('');
    const [activeList, setActiveList] = useState<'connectes' | 'presence'>('connectes');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Configuration des onglets
    const TABS = [
        { value: 'connectes', label: 'Liste des connectés' },
        { value: 'presence', label: 'Liste de présence' },
    ];

    // Données simulées des participants
    const participants: Participant[] = [
        {
            id: 1,
            nom: 'Koffi',
            prenom: 'Emmanuel',
            email: 'koffi@gmail.com',
            connecte: true,
            present: true,
        },
        {
            id: 2,
            nom: 'Kouassi',
            prenom: 'Marie',
            email: 'kouassi@gmail.com',
            connecte: true,
            present: false,
        },
        {
            id: 3,
            nom: 'Ouattara',
            prenom: 'Jean',
            email: 'jean@gmail.com',
            connecte: false,
            present: true,
        },
        {
            id: 4,
            nom: 'Traore',
            prenom: 'Fatou',
            email: 'fatou@gmail.com',
            connecte: true,
            present: true,
        },
        {
            id: 5,
            nom: 'Bamba',
            prenom: 'Sekou',
            email: 'sekou@gmail.com',
            connecte: true,
            present: false,
        },
        {
            id: 6,
            nom: 'Koffi',
            prenom: 'Emmanuel',
            email: 'koffi@gmail.com',
            connecte: true,
            present: true,
        },
        {
            id: 7,
            nom: 'Kouassi',
            prenom: 'Marie',
            email: 'kouassi@gmail.com',
            connecte: true,
            present: false,
        },
        {
            id: 8,
            nom: 'Ouattara',
            prenom: 'Jean',
            email: 'jean@gmail.com',
            connecte: false,
            present: true,
        },
        {
            id: 9,
            nom: 'Traore',
            prenom: 'Fatou',
            email: 'fatou@gmail.com',
            connecte: true,
            present: true,
        },
        {
            id: 10,
            nom: 'Bamba',
            prenom: 'Sekou',
            email: 'sekou@gmail.com',
            connecte: true,
            present: false,
        },
    ];

    /**
     * Filtrage des participants selon la liste active et le terme de recherche
     */
    const getFilteredParticipants = () => {
        let filtered = participants;

        // Filtrage selon la liste sélectionnée
        if (activeList === 'connectes') {
            filtered = participants.filter(p => p.connecte);
        } else {
            filtered = participants.filter(p => p.present);
        }

        // Filtrage par terme de recherche
        if (searchTerm) {
            filtered = filtered.filter(participant =>
                participant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                participant.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        router.push('/organisateur/gestionparticipant');
    };

    /**
     * Retour à la page précédente
     */
    const handleBack = () => {
        router.back();
    };

    /**
     * Changement d'onglet
     */
    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveList(newValue as 'connectes' | 'presence');
        setPage(1);
        setSearchTerm('');
    };

    /**
     * Exportation des données
     */
    const handleExport = () => {
        console.log(`Exporter la liste des ${activeList}`);
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
     * Changement de liste active
     */
    const handleListChange = (newList: 'connectes' | 'presence') => {
        setActiveList(newList);
        setPage(1);
        setSearchTerm('');
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
                                Consultation des Participants
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
                                    {activeList === 'connectes'
                                        ? 'Liste des personnes connectées'
                                        : 'Liste des personnes présentes'
                                    }
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
                    {/* Onglets de navigation */}
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={activeList}
                            onChange={handleTabChange}
                            sx={{ px: 3, pt: 2 }}
                        >
                            {TABS.map((tab) => (
                                <Tab
                                    key={tab.value}
                                    value={tab.value}
                                    label={tab.label}
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        fontSize: '0.875rem',
                                    }}
                                />
                            ))}
                        </Tabs>
                    </Box>

                    {/* Barre d'outils */}
                    <Box sx={{
                        p: 3,
                        borderBottom: 1,
                        borderColor: 'divider',
                        backgroundColor: 'grey.50'
                    }}>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                            {/* Zone gauche : Informations et recherche */}
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                    {filteredParticipants.length} personne{filteredParticipants.length > 1 ? 's' : ''} {activeList === 'connectes' ? 'connectée' : 'présente'}{filteredParticipants.length > 1 ? 's' : ''}
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
                                        <TableCell sx={{ fontWeight: 600, py: 2 }}>Nom</TableCell>
                                        <TableCell sx={{ fontWeight: 600, py: 2 }}>Prénom</TableCell>
                                        <TableCell sx={{ fontWeight: 600, py: 2 }}>Email</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedParticipants.map((participant, index) => (
                                        <TableRow
                                            key={participant.id}
                                            hover
                                            sx={{
                                                backgroundColor: index % 2 === 0 ? 'white' : 'grey.50',
                                                '&:hover': {
                                                    backgroundColor: 'action.hover',
                                                }
                                            }}
                                        >
                                            <TableCell sx={{ py: 2 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {participant.nom}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ py: 2 }}>
                                                <Typography variant="body2">
                                                    {participant.prenom}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ py: 2 }}>
                                                <Typography variant="body2" color="primary.main">
                                                    {participant.email}
                                                </Typography>
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

export default ConsultationPage;