//src/app/organisateur/gestionparticipant/gestion-boitiers/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
    ArrowBack as ArrowBackIcon,
    Search as SearchIcon,
    ExpandMore as ExpandMoreIcon,
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
    Pagination,
    Breadcrumbs,
    Link,
    Tooltip,
    Menu,
    MenuItem,
    FormControl,
    Select,
} from '@mui/material';

// Import du composant Label
import { Label } from 'src/components/label';

// Interface pour les boitiers électroniques
interface BoitierElectronique {
    id: number;
    numeroBoitier: string;
    nomPrenom: string;
    email: string;
    telephone: string;
    heure: string;
    enregistrePar: string;
    statut: 'Obtenu' | 'Rendu';
}

// Types pour les options d'export
type ExportOption = {
    value: string;
    label: string;
};

/**
 * Page de gestion des boitiers électroniques
 * Permet de gérer l'attribution et le retour des boitiers
 * avec suivi des statuts et fonctionnalités d'export
 */
const GestionBoitiersPage = () => {
    const router = useRouter();

    // États pour la gestion des données et filtres
    const [searchTerm, setSearchTerm] = useState('');
    const [filtreActif, setFiltreActif] = useState('tous');
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(10);

    // États pour les menus d'export
    const [exportMenuAnchor, setExportMenuAnchor] = useState<null | HTMLElement>(null);

    // Données simulées des boitiers
    const [boitiers, setBoitiers] = useState<BoitierElectronique[]>([
        {
            id: 1,
            numeroBoitier: '01',
            nomPrenom: 'Baoulou kouadio evariist',
            email: 'baoulou000@gmail.com',
            telephone: '0703815849',
            heure: '10/08/2024 08H00:20',
            enregistrePar: 'Kouassiassi Jean',
            statut: 'Obtenu',
        },
        {
            id: 2,
            numeroBoitier: '02',
            nomPrenom: 'Kouassi Aya',
            email: 'kouassi@gmail.com',
            telephone: '0202020404',
            heure: '10/08/2024 08H03:21',
            enregistrePar: 'Kouassiassi Jean',
            statut: 'Obtenu',
        },
        {
            id: 3,
            numeroBoitier: '03',
            nomPrenom: 'Koffi Brou yves',
            email: 'koffi@gmail.com',
            telephone: '0751016821',
            heure: '10/08/2024 08H18:20',
            enregistrePar: 'Ouattara mariam',
            statut: 'Rendu',
        },
        {
            id: 4,
            numeroBoitier: '04',
            nomPrenom: 'Ouattara Ataassine',
            email: 'ouattara@gmail.com',
            telephone: '0104527864',
            heure: '10/08/2024 08H20:00',
            enregistrePar: 'Ada joselle marie',
            statut: 'Rendu',
        },
        {
            id: 5,
            numeroBoitier: '05',
            nomPrenom: 'Kouadou bendis',
            email: 'kouadou@gmail.com',
            telephone: '0605909387',
            heure: '10/08/2024 08H05:24',
            enregistrePar: 'Kouassiassi Jean',
            statut: 'Obtenu',
        },
        {
            id: 6,
            numeroBoitier: '06',
            nomPrenom: 'Eponon Joseph',
            email: 'eponon@gmail.com',
            telephone: '0606097943',
            heure: '10/08/2024 08H09:00',
            enregistrePar: 'Kouassiassi Jean',
            statut: 'Obtenu',
        },
    ]);

    // Options d'exportation
    const EXPORT_OPTIONS: ExportOption[] = [
        { value: 'pdf-tous', label: 'Tous les boitiers (PDF)' },
        { value: 'excel-tous', label: 'Tous les boitiers (Excel)' },
        { value: 'pdf-obtenus', label: 'Boitiers obtenus (PDF)' },
        { value: 'excel-obtenus', label: 'Boitiers obtenus (Excel)' },
        { value: 'pdf-rendus', label: 'Boitiers rendus (PDF)' },
        { value: 'excel-rendus', label: 'Boitiers rendus (Excel)' },
    ];

    const FILTRE_OPTIONS: ExportOption[] = [
        { value: 'tous', label: 'Tous les boitiers' },
        { value: 'obtenus', label: 'Liste des boitiers obtenus' },
        { value: 'rendus', label: 'Liste des boitiers rendus' },
        { value: 'non-rendus', label: 'Liste des boitiers non rendus' },
    ];

    /**
     * Filtrage des boitiers
     */
    const filteredBoitiers = boitiers.filter(boitier => {
        // Filtre par recherche
        const matchesSearch =
            boitier.numeroBoitier.toLowerCase().includes(searchTerm.toLowerCase()) ||
            boitier.nomPrenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            boitier.email.toLowerCase().includes(searchTerm.toLowerCase());

        // Filtre par statut
        let matchesFiltre = true;
        if (filtreActif === 'obtenus') {
            matchesFiltre = boitier.statut === 'Obtenu';
        } else if (filtreActif === 'rendus') {
            matchesFiltre = boitier.statut === 'Rendu';
        } else if (filtreActif === 'non-rendus') {
            matchesFiltre = boitier.statut === 'Obtenu'; // Non rendus = Obtenus
        }
        // Si filtreActif === 'tous', matchesFiltre reste true

        return matchesSearch && matchesFiltre;
    });

    const totalPages = Math.ceil(filteredBoitiers.length / rowsPerPage);
    const paginatedBoitiers = filteredBoitiers.slice(
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
     * Gestion du statut des boitiers (Obtenu -> Rendu)
     */
    const handleToggleStatut = (id: number) => {
        setBoitiers(prev =>
            prev.map(boitier =>
                boitier.id === id && boitier.statut === 'Obtenu'
                    ? { ...boitier, statut: 'Rendu' as const }
                    : boitier
            )
        );
    };

    /**
     * Gestion des menus d'export
     */
    const handleExportMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setExportMenuAnchor(event.currentTarget);
    };

    const handleExportMenuClose = () => {
        setExportMenuAnchor(null);
    };

    /**
     * Actions d'export
     */
    const handleExport = (option: string) => {
        console.log('Export:', option);
        handleExportMenuClose();
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
    const getStatutColor = (statut: string) => statut === 'Obtenu' ? 'warning' : 'success';

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Stack spacing={4}>
                {/* En-tête avec breadcrumbs et navigation */}
                <Box>
                    {/* Titre principal */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                GESTION DES BOITIERS ÉLECTRONIQUES
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
                                    Gestion des boitiers
                                </Typography>
                            </Breadcrumbs>
                        </Box>

                        
                    </Box>
                </Box>

                {/* Carte principale */}
                <Card sx={{
                    borderRadius: 2,
                    boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
                }}>
                    {/* Barre d'outils */}
                    <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                            {/* Zone gauche : Message informatif */}
                            {(() => {
                                const boitiersNonRendus = boitiers.filter(b => b.statut === 'Obtenu').length;
                                return (
                                    <Typography variant="body2" color="primary.main" sx={{ fontWeight: 500 }}>
                                        Au total {boitiersNonRendus} boitier{boitiersNonRendus > 1 ? 's' : ''} électronique{boitiersNonRendus > 1 ? 's' : ''} à récupérer
                                    </Typography>
                                );
                            })()}

                            {/* Zone droite : Boutons d'export et recherche */}
                            <Stack direction="row" spacing={2} alignItems="center">
                                {/* Liste déroulante de filtrage */}
                                <FormControl size="small" sx={{ minWidth: 300 }}>
                                    <Select
                                        value={filtreActif}
                                        onChange={(e) => {
                                            setFiltreActif(e.target.value);
                                            setPage(1);
                                        }}
                                        displayEmpty
                                        sx={{
                                            backgroundColor: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: 'grey.300',
                                            }
                                        }}
                                    >
                                        {FILTRE_OPTIONS.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                {/* Bouton Export */}
                                <Tooltip title="Exporter les données" arrow>
                                    <Button
                                        variant="contained"
                                        onClick={handleExportMenuOpen}
                                        endIcon={<ExpandMoreIcon />}
                                        sx={{
                                            bgcolor: '#00',
                                            color: 'white',
                                            '&:hover': { bgcolor: '#000' },
                                            borderRadius: 1,
                                            textTransform: 'none',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Exporter
                                    </Button>
                                </Tooltip>
                                <Menu
                                    anchorEl={exportMenuAnchor}
                                    open={Boolean(exportMenuAnchor)}
                                    onClose={handleExportMenuClose}
                                    transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                                >
                                    {EXPORT_OPTIONS.map((option) => (
                                        <MenuItem
                                            key={option.value}
                                            onClick={() => handleExport(option.value)}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Menu>

                                {/* Recherche */}
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
                            </Stack>
                        </Stack>
                    </Box>

                    {/* Tableau des boitiers */}
                    <Box sx={{ p: 3 }}>
                        <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 1 }}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: 'grey.50' }}>
                                        <TableCell sx={{ fontWeight: 600, width: 100 }}></TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Numéro boitier électronique</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Nom/Prénom</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Téléphone</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Heure</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Enregistré par</TableCell>
                                        <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedBoitiers.map((boitier) => (
                                        <TableRow key={boitier.id} hover>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    onClick={() => handleToggleStatut(boitier.id)}
                                                    disabled={boitier.statut === 'Rendu'}
                                                    sx={{
                                                        backgroundColor: boitier.statut === 'Obtenu' ? '#1976D2' : '#BDBDBD',
                                                        color: 'white',
                                                        '&:hover': {
                                                            backgroundColor: boitier.statut === 'Obtenu' ? '#1565C0' : '#BDBDBD',
                                                        },
                                                        '&:disabled': {
                                                            backgroundColor: '#BDBDBD',
                                                            color: 'white',
                                                        },
                                                        borderRadius: 1,
                                                        textTransform: 'none',
                                                        fontWeight: 500,
                                                        minWidth: 80,
                                                    }}
                                                >
                                                    {boitier.statut}
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {boitier.numeroBoitier}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {boitier.nomPrenom}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" color="primary.main">
                                                    {boitier.email}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {boitier.telephone}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    {boitier.heure}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body2">
                                                    {boitier.enregistrePar}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Label
                                                    color={getStatutColor(boitier.statut)}
                                                    variant="soft"
                                                >
                                                    {boitier.statut}
                                                </Label>
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

export default GestionBoitiersPage;