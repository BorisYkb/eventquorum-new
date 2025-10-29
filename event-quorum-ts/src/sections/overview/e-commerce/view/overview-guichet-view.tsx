// File: src/sections/overview/e-commerce/view/overview-guichet-view.tsx

'use client';

/**
 * PAGE: Vue d'ensemble Guichet
 * 
 * Affiche la liste des participants (invités) avec possibilité de:
 * - Ajouter un nouveau participant
 * - Mettre à jour un participant existant (modifier infos + ajouter activités)
 * - Exporter la liste
 * - Filtrer et rechercher
 * 
 * Logique importante:
 * - Les participants peuvent avoir 0 ou plusieurs activités
 * - Le bouton "Mettre à jour" permet de modifier les infos ET d'ajouter de nouvelles activités
 * - Les activités déjà payées sont affichées avec leur standing (Standard, VIP, VVIP)
 */

import type { TableHeadCellProps } from 'src/components/table';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import { DashboardContent } from 'src/layouts/guichet';
import { MotivationIllustration } from 'src/assets/illustrations';
import { useMockedUser } from 'src/auth/hooks';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import {
    useTable,
    emptyRows,
    TableNoData,
    getComparator,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedAction,
    TablePaginationCustom,
} from 'src/components/table';
import { GuichetWidgetSummary } from 'src/sections/overview/e-commerce/guichet/guichet-widget-summary-2';
import { EcommerceWelcome } from '../ecommerce-welcome';

// ============================================
// TYPES
// ============================================

/**
 * Représente une activité payée par un participant
 * Inclut l'ID de l'activité et le standing sélectionné
 */
type ActivitePaye = {
    activiteId: string; // ID de l'activité (ex: '1', '2', etc.)
    standing: string;   // Standing sélectionné (ex: 'standard', 'vip', 'vvip', 'gratuit', 'included')
};

/**
 * Représente un participant avec ses activités payées
 */
type ParticipantData = {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    typeParticipation: 'En ligne' | 'En présentiel';
    activites: ActivitePaye[]; // Liste des activités payées avec leur standing
};

// ============================================
// CONFIGURATION
// ============================================

/** En-têtes du tableau */
const TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'nom', label: 'Nom_Prenom', align: 'left', width: 200 },
    { id: 'email', label: 'Email', align: 'left', width: 200 },
    { id: 'telephone', label: 'Numero Tel', align: 'left', width: 150 },
    { id: 'typeParticipation', label: 'Type', align: 'left', width: 120 },
    { id: 'actions', label: 'Action', align: 'center', width: 100 },
];

/** Liste des activités disponibles (pour filtres et affichage) */
const ACTIVITES_DISPONIBLES = [
    { id: '1', nom: 'CÉRÉMONIE D\'OUVERTURE' },
    { id: '2', nom: 'POINT DE PRESSE' },
    { id: '3', nom: 'PANEL DE HAUT NIVEAU' },
    { id: '4', nom: 'PAUSE CAFE' },
    { id: '5', nom: 'COOLING BREAK' },
    { id: '6', nom: 'WORKSHOP' },
];

/**
 * Données mockées des participants avec leurs activités payées
 * 
 * Structure:
 * - activites: tableau d'objets { activiteId, standing }
 * - activiteId: correspond à l'ID dans ACTIVITES_DISPONIBLES
 * - standing: 'standard', 'vip', 'vvip', 'gratuit', ou 'included'
 */
const MOCK_PARTICIPANTS: ParticipantData[] = [
    {
        id: 1,
        nom: 'Boudou',
        prenom: 'Khoudou',
        email: 'boudou@gmail.com',
        telephone: '0102030405',
        typeParticipation: 'En présentiel',
        activites: [
            { activiteId: '1', standing: 'vip' },      // Cérémonie - VIP
            { activiteId: '2', standing: 'standard' }, // Point de presse - Standard
        ],
    },
    {
        id: 2,
        nom: 'Kouame',
        prenom: 'Jean',
        email: 'kouame@gmail.com',
        telephone: '0706080945',
        typeParticipation: 'En ligne',
        activites: [], // Aucune activité payée
    },
    {
        id: 3,
        nom: 'Sidibe',
        prenom: 'Moussa',
        email: 'sidibemoussa@gmail.com',
        telephone: '0544023467',
        typeParticipation: 'En présentiel',
        activites: [
            { activiteId: '3', standing: 'included' }, // Panel - Inclus (pas de prix)
            { activiteId: '4', standing: 'vvip' },     // Pause café - VVIP
        ],
    },
    {
        id: 4,
        nom: 'GRA-BI',
        prenom: 'Amira',
        email: 'grabiamira@gmail.com',
        telephone: '0701459358',
        typeParticipation: 'En ligne',
        activites: [
            { activiteId: '2', standing: 'standard' }, // Point de presse - Standard
        ],
    },
    {
        id: 5,
        nom: 'Traore',
        prenom: 'Fatou',
        email: 'fatou.traore@gmail.com',
        telephone: '0607080910',
        typeParticipation: 'En présentiel',
        activites: [], // Aucune activité payée
    },
    {
        id: 6,
        nom: 'Koffi',
        prenom: 'Emmanuel',
        email: 'koffi@gmail.com',
        telephone: '0101010101',
        typeParticipation: 'En ligne',
        activites: [
            { activiteId: '1', standing: 'vvip' },    // Cérémonie - VVIP
            { activiteId: '3', standing: 'included' }, // Panel - Inclus
            { activiteId: '5', standing: 'gratuit' },  // Cooling break - Gratuit
        ],
    },
    {
        id: 7,
        nom: 'Diallo',
        prenom: 'Mariama',
        email: 'mariama.diallo@gmail.com',
        telephone: '0708091011',
        typeParticipation: 'En présentiel',
        activites: [
            { activiteId: '6', standing: 'vip' },      // Workshop - VIP
            { activiteId: '4', standing: 'standard' }, // Pause café - Standard
        ],
    },
    {
        id: 8,
        nom: 'Kone',
        prenom: 'Abdoulaye',
        email: 'abdou.kone@gmail.com',
        telephone: '0501020304',
        typeParticipation: 'En ligne',
        activites: [], // Aucune activité payée
    },
];

// ============================================
// COMPOSANT PRINCIPAL
// ============================================

export function OverviewGuichetView() {
    const { user } = useMockedUser();
    const router = useRouter();
    const table = useTable({ defaultOrderBy: 'nom' });

    // ============================================
    // ÉTATS
    // ============================================

    const [tableData, setTableData] = useState<ParticipantData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedActivity, setSelectedActivity] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedNbActivites, setSelectedNbActivites] = useState('');

    // ============================================
    // EFFETS
    // ============================================

    useEffect(() => {
        setTableData(MOCK_PARTICIPANTS);
    }, []);

    // ============================================
    // FILTRAGE
    // ============================================

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(table.order, table.orderBy),
        searchTerm,
        selectedActivity,
        selectedType,
        selectedNbActivites,
    });

    // ============================================
    // HANDLERS
    // ============================================

    /**
     * Ajouter un nouveau participant
     * Redirige vers la page d'ajout
     */
    const handleAddParticipant = () => {
        router.push('/guichet/ajouter-invite');
    };

    /**
     * Mettre à jour un participant existant
     * Redirige vers la page de modification avec l'ID du participant
     * Cette page permettra de:
     * - Modifier les informations personnelles
     * - Ajouter de nouvelles activités (les déjà payées seront grisées)
     */
    const handleUpdateParticipant = (participantId: number) => {
        console.log('Mise à jour participant:', participantId);
        router.push(`/guichet/modifier/${participantId}`);
    };

    /**
     * Exporter la liste des participants
     * TODO: Implémenter l'export CSV/Excel avec les activités
     */
    const handleExportParticipants = () => {
        console.log('Export de la liste des participants');
        // TODO: Appel API pour générer le fichier d'export
        alert('Export en cours...');
    };
    // Couleurs alternées pour les widgets
    const getWidgetColor = (index: number): 'primary' | 'secondary' | 'success' | 'warning' => {
        const colors: Array<'primary' | 'secondary' | 'success' | 'warning'> = ['primary', 'secondary', 'success', 'warning'];
        return colors[index % colors.length];
    };

    /**
     * Réinitialiser tous les filtres
     */
    const handleResetFilters = () => {
        setSearchTerm('');
        setSelectedActivity('');
        setSelectedType('');
        setSelectedNbActivites('');
        table.onResetPage();
    };

    // ============================================
    // RENDER
    // ============================================

    return (
        <DashboardContent maxWidth="xl">
            <Grid container spacing={3}>
                {/* ========== SECTION BIENVENUE ========== */}
                {/* <Grid size={{ xs: 12 }}>
                    <EcommerceWelcome
                        title={`Bienvenue 🎉, ${user?.displayName?.split(' ')[0] || 'guichet'} !`}
                        description="Gérez facilement la liste des participants aux différentes activités."
                        img={<MotivationIllustration hideBackground />}
                    />
                </Grid> */}

                {/* Cards de statistiques avec SuperviseurWidgetSummary */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <GuichetWidgetSummary
                        title="Nombre de transactions"
                        total={15}
                        color={getWidgetColor(0)}
                        sx={{ height: 180 }}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <GuichetWidgetSummary
                        title="Participations traitées"
                        total={6}
                        color={getWidgetColor(2)}
                        sx={{ height: 180 }}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                    <GuichetWidgetSummary
                        title="Montant collecté (FCFA)"
                        total={1000000}
                        color={getWidgetColor(1)}
                        sx={{ height: 180 }}
                    />
                </Grid>

                {/* ========== SECTION PRINCIPALE - LISTE DES PARTICIPANTS ========== */}
                <Grid size={{ xs: 12 }}>
                    <Card>
                        {/* En-tête avec titre */}
                        <Box sx={{ p: { xs: 2, md: 3 }, display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    flexGrow: 1,
                                    fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
                                    fontWeight: 600,
                                }}
                            >
                                LISTE DES PARTICIPANTS
                            </Typography>

                        </Box>

                        {/* Barre d'outils avec filtres */}
                        <Box sx={{ px: { xs: 2, md: 3 }, pb: { xs: 2, md: 3 } }}>
                            <Grid container spacing={2} alignItems="center">
                                {/* Filtre par activité */}
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <FormControl size="small" fullWidth>
                                        <InputLabel sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                            Activité
                                        </InputLabel>
                                        <Select
                                            value={selectedActivity}
                                            onChange={(e: SelectChangeEvent) => setSelectedActivity(e.target.value)}
                                            label="Activité"
                                            sx={{
                                                bgcolor: 'white',
                                                '& .MuiSelect-select': {
                                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                                    color: selectedActivity ? 'text.primary' : 'grey.500'
                                                }
                                            }}
                                        >
                                            <MenuItem value="" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                                Toutes les activités
                                            </MenuItem>
                                            {ACTIVITES_DISPONIBLES.map((activite) => (
                                                <MenuItem
                                                    key={activite.id}
                                                    value={activite.id}
                                                    sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                                                >
                                                    {activite.nom}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Filtre par type de participation */}
                                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                                    <FormControl size="small" fullWidth>
                                        <InputLabel sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                            Type
                                        </InputLabel>
                                        <Select
                                            value={selectedType}
                                            onChange={(e: SelectChangeEvent) => setSelectedType(e.target.value)}
                                            label="Type"
                                            sx={{
                                                bgcolor: 'white',
                                                '& .MuiSelect-select': {
                                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                                    color: selectedType ? 'text.primary' : 'grey.500'
                                                }
                                            }}
                                        >
                                            <MenuItem value="" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                                Tous
                                            </MenuItem>
                                            <MenuItem value="En ligne" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                                En ligne
                                            </MenuItem>
                                            <MenuItem value="En présentiel" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                                                En présentiel
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {/* Barre de recherche */}
                                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Rechercher..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Iconify icon="eva:search-fill" sx={{ color: 'grey.400' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                fontSize: { xs: '0.875rem', md: '1rem' }
                                            }
                                        }}
                                    />
                                </Grid>

                                {/* Boutons d'action */}
                                <Grid size={{ xs: 12, md: 4 }}>
                                    <Grid container spacing={1} direction={{ xs: 'column', sm: 'row' }}>
                                        <Grid size={{ xs: 12, md: 8 }}>
                                            <Stack
                                                direction={{ xs: 'column', sm: 'row' }}
                                                spacing={2}
                                                sx={{ height: '100%' }}
                                            >
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    startIcon={<Iconify icon="eva:download-fill" />}
                                                    size="small"
                                                    onClick={handleExportParticipants}
                                                    sx={{
                                                        textTransform: 'none',
                                                        borderColor: 'grey.300',
                                                        color: 'white',
                                                        bgcolor: 'black',
                                                        fontSize: { xs: '0.8rem', md: '0.875rem' },
                                                        fontWeight: 500,
                                                        '&:hover': {
                                                            borderColor: 'grey.400',
                                                            bgcolor: 'grey.800',
                                                        }
                                                    }}
                                                >
                                                    Exporter
                                                </Button>

                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    startIcon={<Iconify icon="eva:plus-fill" />}
                                                    size="small"
                                                    onClick={handleAddParticipant}
                                                    sx={{
                                                        textTransform: 'none',
                                                        borderColor: 'grey.300',
                                                        color: 'grey.700',
                                                        bgcolor: 'white',
                                                        fontSize: { xs: '0.8rem', md: '0.875rem' },
                                                        fontWeight: 500,
                                                        '&:hover': {
                                                            borderColor: 'grey.400',
                                                            bgcolor: 'grey.50'
                                                        }
                                                    }}
                                                >
                                                    Ajouter
                                                </Button>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Actions de sélection */}
                        <Box sx={{ position: 'relative' }}>
                            <TableSelectedAction
                                dense={table.dense}
                                numSelected={table.selected.length}
                                rowCount={tableData.length}
                                onSelectAllRows={(checked) =>
                                    table.onSelectAllRows(
                                        checked,
                                        tableData.map((row) => row.id.toString())
                                    )
                                }
                                action={
                                    <Tooltip title="Supprimer">
                                        <IconButton color="primary">
                                            <Iconify icon="solar:trash-bin-trash-bold" />
                                        </IconButton>
                                    </Tooltip>
                                }
                            />

                            {/* Tableau */}
                            <Scrollbar sx={{ minHeight: 332 }}>
                                <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                                    <TableHeadCustom
                                        order={table.order}
                                        orderBy={table.orderBy}
                                        headCells={TABLE_HEAD}
                                        rowCount={tableData.length}
                                        numSelected={table.selected.length}
                                        onSort={table.onSort}
                                        onSelectAllRows={(checked) =>
                                            table.onSelectAllRows(
                                                checked,
                                                tableData.map((row) => row.id.toString())
                                            )
                                        }
                                    />

                                    <TableBody>
                                        {dataFiltered
                                            .slice(
                                                table.page * table.rowsPerPage,
                                                table.page * table.rowsPerPage + table.rowsPerPage
                                            )
                                            .map((participant) => (
                                                <TableRow
                                                    hover
                                                    key={participant.id}
                                                    onClick={() => table.onSelectRow(participant.id.toString())}
                                                    selected={table.selected.includes(participant.id.toString())}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={table.selected.includes(participant.id.toString())}
                                                        />
                                                    </TableCell>

                                                    <TableCell>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontSize: { xs: '0.8rem', md: '0.875rem' },
                                                                fontWeight: 500,
                                                                cursor: 'pointer',
                                                                '&:hover': {
                                                                    textDecoration: 'underline'
                                                                }
                                                            }}
                                                        >
                                                            {participant.nom} {participant.prenom}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}
                                                        >
                                                            {participant.email}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}
                                                        >
                                                            {participant.telephone}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}
                                                        >
                                                            {participant.typeParticipation}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <Button
                                                            size="small"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleUpdateParticipant(participant.id);
                                                            }}
                                                            sx={{
                                                                color: 'white',
                                                                bgcolor: 'black',
                                                                fontSize: { xs: '0.75rem', md: '0.8125rem' },
                                                                fontWeight: 500,
                                                                px: { xs: 1, md: 2 },
                                                                py: { xs: 0.5, md: 0.75 },
                                                                '&:hover': {
                                                                    bgcolor: 'grey.800',
                                                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
                                                                }
                                                            }}
                                                        >
                                                            Modifier
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}

                                        <TableEmptyRows
                                            height={table.dense ? 34 : 34 + 20}
                                            emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                                        />

                                        <TableNoData notFound={!dataFiltered.length} />
                                    </TableBody>
                                </Table>
                            </Scrollbar>
                        </Box>

                        {/* Pagination */}
                        <TablePaginationCustom
                            page={table.page}
                            dense={table.dense}
                            count={dataFiltered.length}
                            rowsPerPage={table.rowsPerPage}
                            onPageChange={table.onChangePage}
                            onChangeDense={table.onChangeDense}
                            onRowsPerPageChange={table.onChangeRowsPerPage}
                        />
                    </Card>
                </Grid>

                {/* ========== FOOTER ========== */}
                <Grid size={{ xs: 12 }}>
                    <Card sx={{ p: 2, bgcolor: 'grey.50' }}>
                        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                                >
                                    © 2024 QUORUM ÉVÉNEMENTIEL | Powered by PX_LABS SARL
                                </Typography>
                            </Grid>

                            <Grid size={{ xs: 12, md: 6 }}>
                                <Grid container spacing={1} justifyContent="flex-end">
                                    <Grid>
                                        <Button
                                            size="small"
                                            color="inherit"
                                            sx={{
                                                textTransform: 'none',
                                                fontSize: { xs: '0.75rem', md: '0.875rem' }
                                            }}
                                        >
                                            Confidentialité
                                        </Button>
                                    </Grid>
                                    <Grid>
                                        <Button
                                            size="small"
                                            color="inherit"
                                            sx={{
                                                textTransform: 'none',
                                                fontSize: { xs: '0.75rem', md: '0.875rem' }
                                            }}
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

// ============================================
// FONCTION DE FILTRAGE
// ============================================

type ApplyFilterProps = {
    inputData: ParticipantData[];
    comparator: (a: any, b: any) => number;
    searchTerm: string;
    selectedActivity: string;
    selectedType: string;
    selectedNbActivites: string;
};

/**
 * Applique tous les filtres aux données des participants
 * 
 * Filtres disponibles:
 * - Recherche textuelle (nom, prénom, email, téléphone)
 * - Activité spécifique (filtre les participants qui ont payé cette activité)
 * - Type de participation (En ligne / En présentiel)
 * - Nombre d'activités (Aucune / Au moins 1)
 */
function applyFilter({
    inputData,
    comparator,
    searchTerm,
    selectedActivity,
    selectedType,
    selectedNbActivites
}: ApplyFilterProps) {
    // Tri selon le comparator
    const stabilizedThis = inputData.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    // Filtre par recherche (nom, prénom, email, téléphone)
    if (searchTerm) {
        inputData = inputData.filter(
            (participant) =>
                participant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                participant.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                participant.telephone.includes(searchTerm)
        );
    }

    // Filtre par activité spécifique
    // Vérifie si le participant a payé cette activité
    if (selectedActivity) {
        inputData = inputData.filter((participant) =>
            participant.activites.some((act) => act.activiteId === selectedActivity)
        );
    }

    // Filtre par type de participation
    if (selectedType) {
        inputData = inputData.filter((participant) =>
            participant.typeParticipation === selectedType
        );
    }

    // Filtre par nombre d'activités
    if (selectedNbActivites) {
        if (selectedNbActivites === '0') {
            // Aucune activité payée
            inputData = inputData.filter((participant) => participant.activites.length === 0);
        } else if (selectedNbActivites === '1+') {
            // Au moins 1 activité payée
            inputData = inputData.filter((participant) => participant.activites.length > 0);
        }
    }

    return inputData;
}