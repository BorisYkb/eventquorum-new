'use client';

import type { TableHeadCellProps } from 'src/components/table';
import { useRouter, useSearchParams } from 'next/navigation';
import { IParticipantItem, IParticipantTableFilters } from 'src/types/participant';

import { useState, useCallback, useEffect } from 'react';
import { useBoolean, useSetState } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/superviseur';
import { _participantList } from 'src/_mock/_participants';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
    useTable,
    emptyRows,
    TableNoData,
    getComparator,
    TableEmptyRows,
    TableHeadCustom,
    TablePaginationCustom,
} from 'src/components/table';

// Import du composant SuperviseurWidgetSummary
import { SuperviseurWidgetSummary } from '../../superviseur/view/superviseur-widget-summary-2';

import { ParticipantTableRow } from 'src/sections/info-participant/participant-table-row';
import { ParticipantTableFiltersResult } from 'src/sections/info-participant/participant-table-filters-result';
import { DetailsInvite } from 'src/app/superviseur/participants/components/details-invite';

// ----------------------------------------------------------------------

// En-têtes pour l'onglet "Liste des demandes d'inscription"
const DEMANDES_TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'nom_prenom', label: 'Nom_prenom', width: 200 },
    { id: 'email', label: 'Email', width: 200 },
    { id: 'telephone', label: 'Téléphone', width: 120 },
    { id: 'date', label: 'Date', width: 120 },
    { id: 'statut', label: 'Statut', width: 100 },
];

// En-têtes pour l'onglet "Liste des invités"
const INVITES_TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'nom_prenom', label: 'Nom_prenom', width: 180 },
    { id: 'email', label: 'Email', width: 200 },
    { id: 'telephone', label: 'Téléphone', width: 120 },
    { id: 'connecte', label: 'Connecté', width: 100 },
    { id: 'premiere_connexion', label: 'Première connexion', width: 140 },
    { id: 'achat_effectue', label: 'Achat effectué', width: 120 },
    { id: 'detail', label: 'Détail', width: 88 },
];

// En-têtes pour l'onglet "Liste des participants" - MODIFIÉ: Une seule colonne nom_prenom
const PARTICIPANTS_TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'nom_prenom', label: 'Nom_prenom', width: 200 },
    { id: 'telephone', label: 'Téléphone', width: 120 },
    { id: 'email', label: 'Email', width: 180 },
    { id: 'connecte', label: 'Connecté', width: 100 },
    { id: 'statut', label: 'Statut', width: 100 },
    { id: 'emargement', label: 'Emargement', width: 120 },
    { id: 'detail', label: 'Détail', width: 88 },
];

// Options de statut pour les demandes
export const DEMANDE_STATUS_OPTIONS = [
    { value: 'acceptée', label: 'Acceptée', color: 'success' },
    { value: 'rejetée', label: 'Rejetée', color: 'error' },
    { value: 'en attente', label: 'En attente', color: 'warning' },
];

// Options pour les invités
export const INVITE_STATUS_OPTIONS = [
    { value: 'connecté', label: 'Connectés', color: 'success' },
    { value: 'non connecté', label: 'Non connectés', color: 'error' },
    { value: 'première connexion', label: 'Première connexion', color: 'info' },
    { value: 'pas de première connexion', label: 'Pas de première connexion', color: 'warning' },
    { value: 'achat effectué', label: 'Achat effectué', color: 'success' },
    { value: 'pas d\'achat effectué', label: 'Pas d\'achat effectué', color: 'error' },
];

// Options pour les participants
export const PARTICIPANT_STATUS_OPTIONS = [
    { value: 'en présentiel', label: 'En présentiel', color: 'info' },
    { value: 'en ligne', label: 'En ligne', color: 'warning' },
];

// Options d'activité
export const ACTIVITY_OPTIONS = [
    { value: 'activité 1', label: 'Activité 1' },
    { value: 'activité 2', label: 'Activité 2' },
];

// Options pour l'exportation des invités
export const EXPORT_INVITE_OPTIONS = [
    { value: 'tous_les_invites', label: 'Tous les invités' },
    { value: 'connectes', label: 'Connectés' },
    { value: 'non_connectes', label: 'Non connectés' },
    { value: 'premiere_connexion', label: 'Première connexion' },
    { value: 'pas_de_premiere_connexion', label: 'Pas de première connexion' },
    { value: 'achat_effectue', label: 'Achat effectué' },
    { value: 'pas_dachat_effectue', label: 'Pas d\'achat effectué' },
];

// Onglets de navigation
export const PARTICIPANT_TABS = [
    { label: 'Liste des demandes d\'inscription', value: 'demandes' },
    { label: 'Liste des invités', value: 'invites' },
    { label: 'Liste des participants', value: 'participants' },
];

interface FilterData {
    participantData: IParticipantItem[];
    filters: IParticipantTableFilters;
    comparator: (a: any, b: any) => number;
    activeTab: string;
}

function applyFilter({ participantData, filters, comparator, activeTab }: FilterData) {
    const { name, status, activity, connectionStatus, purchaseStatus } = filters;

    let filteredData = [...participantData];

    // Filtrer par onglet actif
    switch (activeTab) {
        case 'demandes':
            filteredData = filteredData.filter(item =>
                ['acceptée', 'rejetée', 'en attente'].includes(item.statut)
            );
            break;
        case 'invites':
            filteredData = filteredData.filter(item => item.statut === 'acceptée');
            break;
        case 'participants':
            filteredData = filteredData.filter(item =>
                ['en présentiel', 'en ligne'].includes(item.statut)
            );
            break;
    }

    // Trier les données
    const stabilizedThis = filteredData.map((el, index) => [el, index] as const);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    filteredData = stabilizedThis.map((el) => el[0]);

    // Appliquer les filtres
    if (name) {
        filteredData = filteredData.filter(
            (item) => item.nom_prenom.toLowerCase().includes(name.toLowerCase()) ||
                item.email.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (status && status !== 'all') {
        filteredData = filteredData.filter((item) => item.statut === status);
    }

    if (activity && activity !== 'all') {
        filteredData = filteredData.filter((item) => item.activite_selectionnee === activity);
    }

    if (connectionStatus && connectionStatus !== 'all') {
        filteredData = filteredData.filter((item) => item.connecte === connectionStatus);
    }

    if (purchaseStatus && purchaseStatus !== 'all') {
        filteredData = filteredData.filter((item) => item.achat_effectue === purchaseStatus);
    }

    return filteredData;
}

// ----------------------------------------------------------------------

export function SuperviseurClientListView() {
    const theme = useTheme();
    const table = useTable();
    const router = useRouter();
    const searchParams = useSearchParams();
    const detailsDialog = useBoolean();
    const [activeTab, setActiveTab] = useState('demandes');
    const [participantData] = useState<IParticipantItem[]>(_participantList);
    const [selectedInvite, setSelectedInvite] = useState<IParticipantItem | null>(null);
    
    // NOUVEAU: État pour le menu d'exportation
    const [exportMenuAnchor, setExportMenuAnchor] = useState<null | HTMLElement>(null);

    useEffect(() => {
        const tabFromUrl = searchParams?.get('tab');
        if (tabFromUrl && ['demandes', 'invites', 'participants'].includes(tabFromUrl)) {
            setActiveTab(tabFromUrl);
        }
    }, [searchParams]);

    const filters = useSetState<IParticipantTableFilters>({
        name: '',
        status: 'all',
        activity: 'all',
        connectionStatus: 'all',
        purchaseStatus: 'all',
    });

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
        table.onResetPage();

        filters.setState({
            name: '',
            status: 'all',
            activity: 'all',
            connectionStatus: 'all',
            purchaseStatus: 'all'
        });
    };

    const dataFiltered = applyFilter({
        participantData,
        filters: filters.state,
        comparator: getComparator(table.order, table.orderBy),
        activeTab
    });

    const paginatedData = dataFiltered.slice(
        table.page * table.rowsPerPage,
        table.page * table.rowsPerPage + table.rowsPerPage
    );

    const handleViewDetails = useCallback((participant: IParticipantItem) => {
        if (activeTab === 'participants') {
            router.push(`/superviseur/participants/${participant.id}`);
        } else {
            setSelectedInvite(participant);
            detailsDialog.onTrue();
        }
    }, [detailsDialog, router, activeTab]);

    const handleExportPDF = () => {
        console.log('Export PDF des demandes en cours...');
    };

    // NOUVEAU: Gestion du menu d'exportation
    const handleExportMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setExportMenuAnchor(event.currentTarget);
    };

    const handleExportMenuClose = () => {
        setExportMenuAnchor(null);
    };

    const handleExportInvitesList = (exportType: string) => {
        console.log(`Export de la liste: ${exportType}`);
        let dataToExport = dataFiltered;

        switch (exportType) {
            case 'connectes':
                dataToExport = dataFiltered.filter(item => item.connecte === 'connecté');
                break;
            case 'non_connectes':
                dataToExport = dataFiltered.filter(item => item.connecte === 'non connecté');
                break;
            case 'premiere_connexion':
                dataToExport = dataFiltered.filter(item => item.premiere_connexion === 'oui');
                break;
            case 'pas_de_premiere_connexion':
                dataToExport = dataFiltered.filter(item => item.premiere_connexion === 'non');
                break;
            case 'achat_effectue':
                dataToExport = dataFiltered.filter(item => item.achat_effectue === 'oui');
                break;
            case 'pas_dachat_effectue':
                dataToExport = dataFiltered.filter(item => item.achat_effectue === 'non');
                break;
            default:
                break;
        }

        console.log(`Données à exporter:`, dataToExport);
        handleExportMenuClose();
    };

    const handleConsultConnectedList = () => {
        console.log('Consultation de la liste des connectés...');
    };

    const getStatusOptions = () => {
        switch (activeTab) {
            case 'demandes':
                return [{ value: 'all', label: 'Tous les statuts' }, ...DEMANDE_STATUS_OPTIONS];
            case 'invites':
                return [{ value: 'all', label: 'Tous les invités' }, ...INVITE_STATUS_OPTIONS];
            case 'participants':
                return [{ value: 'all', label: 'Tous les statuts' }, ...PARTICIPANT_STATUS_OPTIONS];
            default:
                return [{ value: 'all', label: 'Tous les statuts' }];
        }
    };

    const getTableHeaders = () => {
        switch (activeTab) {
            case 'demandes':
                return DEMANDES_TABLE_HEAD;
            case 'invites':
                return INVITES_TABLE_HEAD;
            case 'participants':
                return PARTICIPANTS_TABLE_HEAD;
            default:
                return DEMANDES_TABLE_HEAD;
        }
    };

    const getStatistics = () => {
        switch (activeTab) {
            case 'demandes':
                return [
                    { title: "Nombre de demande reçues", total: 128 },
                    { title: "Nombre de demande acceptée", total: 86 },
                    { title: "Nombre de demandes rejetée", total: 64 },
                    { title: "Nombre de demandes en attentes", total: 12 }
                ];
            case 'invites':
                return [
                    { title: "Invités", total: 500},
                    { title: "Tickets achetés", total: 50 },
                    { title: "Première connexion", total: 100},
                    { title: "Connectés", total: 100}
                ];
            case 'participants':
                return [];
            default:
                return [];
        }
    };

    const getSearchPlaceholder = () => {
        switch (activeTab) {
            case 'demandes':
                return 'Rechercher une demande (nom, email)...';
            case 'invites':
                return 'Rechercher un invité (nom, email)...';
            case 'participants':
                return 'Rechercher un participant (nom, email)...';
            default:
                return 'Rechercher...';
        }
    };

    const canReset = !!(
        filters.state.name ||
        filters.state.status !== 'all' ||
        filters.state.activity !== 'all' ||
        filters.state.connectionStatus !== 'all' ||
        filters.state.purchaseStatus !== 'all'
    );

    const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

    // Couleur de fond alternée pour les widgets
    const getWidgetColor = (index: number): 'primary' | 'secondary' | 'success' | 'warning' => {
        const colors: Array<'primary' | 'secondary' | 'success' | 'warning'> = ['primary', 'secondary', 'success', 'warning'];
        return colors[index % colors.length];
    };

    const getTableTitle = () => {
        switch (activeTab) {
            case 'demandes':
                return 'Liste des demandes d\'inscription';
            case 'invites':
                return 'Liste des invités';
            case 'participants':
                return 'Liste des participants';
            default:
                return 'Liste des demandes d\'inscription';
        }
    };

    const statistics = getStatistics();

    return (
        <>
            <DashboardContent maxWidth="xl">
                <CustomBreadcrumbs
                    heading='Participants'
                    sx={{ mb: { xs: 3, md: 5 } }}
                />

                {/* Onglets SANS shadow */}
                <Card sx={{ mb: 3, boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        sx={{ px: 2.5, py: 2 }}
                    >
                        {PARTICIPANT_TABS.map((tab) => (
                            <Tab
                                key={tab.value}
                                value={tab.value}
                                label={tab.label}
                            />
                        ))}
                    </Tabs>
                </Card>

                {/* Statistiques dynamiques avec couleurs alternées */}
                {statistics.length > 0 && (
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        {statistics.map((stat, index) => (
                            <Grid
                                key={index}
                                size={{
                                    xs: 12,
                                    sm: 6,
                                    md: 3
                                }}
                            >
                                <SuperviseurWidgetSummary
                                    title={stat.title}
                                    total={stat.total}
                                    color={getWidgetColor(index)}
                                    sx={{ height: 180 }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}

                <Card>
                    <Box sx={{ p: 2.5 }}>
                        {/* NOUVEAU: Ligne titre + bouton d'action pour tous les onglets */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
                            <Typography variant='h4' sx={{ fontSize: 20 }}>
                                {getTableTitle()}
                                <span style={{ paddingLeft: 4 }}>({dataFiltered.length})</span>
                            </Typography>

                            {/* Boutons d'action selon l'onglet */}
                            {activeTab === 'demandes' && (
                                <Tooltip title="la liste des demandes de participations (PDF&EXCEL)" arrow>
                                    <Button
                                        variant="contained"
                                        onClick={handleExportPDF}
                                        startIcon={<Iconify icon="eva:download-fill" />}
                                        sx={{
                                            bgcolor: '#000',
                                            color: 'white',
                                            '&:hover': { bgcolor: '#333' }
                                        }}
                                    >
                                        Exporter
                                    </Button>
                                </Tooltip>
                            )}

                            {activeTab === 'invites' && (
                                <>
                                    <Button
                                        variant="contained"
                                        onClick={handleExportMenuOpen}
                                        endIcon={<Iconify icon="eva:chevron-down-fill" />}
                                        sx={{
                                            bgcolor: '#000',
                                            color: 'white',
                                            '&:hover': { bgcolor: '#333' }
                                        }}
                                    >
                                        Exporter
                                    </Button>
                                    <Menu
                                        anchorEl={exportMenuAnchor}
                                        open={Boolean(exportMenuAnchor)}
                                        onClose={handleExportMenuClose}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    >
                                        {EXPORT_INVITE_OPTIONS.map((option) => (
                                            <MenuItem
                                                key={option.value}
                                                onClick={() => handleExportInvitesList(option.value)}
                                            >
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                            )}

                            {activeTab === 'participants' && (
                                <Tooltip title="La liste des connectés" arrow>
                                    <Button
                                        variant="contained"
                                        onClick={handleConsultConnectedList}
                                        startIcon={<Iconify icon="eva:eye-fill" />}
                                        sx={{
                                            bgcolor: '#000',
                                            color: 'white',
                                            '&:hover': { bgcolor: '#333' }
                                        }}
                                    >
                                        Consulter
                                    </Button>
                                </Tooltip>
                            )}
                        </Box>

                        {/* NOUVEAU: Filtres sous le titre pour tous les onglets */}
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                {/* Filtre activités pour invités uniquement */}
                                {activeTab === 'invites' && (
                                    <FormControl size="small" sx={{ minWidth: 200 }}>
                                        <InputLabel>Toutes les activités</InputLabel>
                                        <Select
                                            value={filters.state.activity || 'all'}
                                            onChange={(e) => filters.setState({ activity: e.target.value })}
                                            label="Toutes les activités"
                                        >
                                            <MenuItem value="all">Toutes les activités</MenuItem>
                                            {ACTIVITY_OPTIONS.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )}

                                {/* Filtre de statut */}
                                <FormControl size="small" sx={{ minWidth: 200 }}>
                                    <InputLabel>
                                        {activeTab === 'demandes' ? 'Statut des demandes' : 
                                         activeTab === 'invites' ? 'Statut' : 'Statut des participants'}
                                    </InputLabel>
                                    <Select
                                        value={filters.state.status || 'all'}
                                        onChange={(e) => filters.setState({ status: e.target.value })}
                                        label={activeTab === 'demandes' ? 'Statut des demandes' : 
                                               activeTab === 'invites' ? 'Statut' : 'Statut des participants'}
                                    >
                                        {getStatusOptions().map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            {/* Barre de recherche à droite */}
                            <TextField
                                size="small"
                                value={filters.state.name || ''}
                                onChange={(e) => {
                                    table.onResetPage();
                                    filters.setState({ name: e.target.value });
                                }}
                                placeholder={getSearchPlaceholder()}
                                sx={{ width: 350 }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>
                    </Box>

                    {/* Résultats des filtres */}
                    {canReset && (
                        <ParticipantTableFiltersResult
                            filters={filters}
                            totalResults={dataFiltered.length}
                            onResetPage={table.onResetPage}
                            activeTab={activeTab}
                            sx={{ p: 2.5, pt: 0 }}
                        />
                    )}

                    <Box sx={{ position: 'relative' }}>
                        {/* Tableau */}
                        <Scrollbar>
                            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                                <TableHeadCustom
                                    order={table.order}
                                    orderBy={table.orderBy}
                                    headCells={getTableHeaders()}
                                    rowCount={dataFiltered.length}
                                    numSelected={0}
                                    onSort={table.onSort}
                                />

                                <TableBody>
                                    {paginatedData.map((row) => (
                                        <ParticipantTableRow
                                            key={row.id}
                                            row={row}
                                            onViewDetails={() => handleViewDetails(row)}
                                            activeTab={activeTab}
                                        />
                                    ))}

                                    <TableEmptyRows
                                        height={table.dense ? 56 : 76}
                                        emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                                    />

                                    <TableNoData notFound={notFound} />
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
            </DashboardContent>

            {/* Dialog de détails des invités */}
            <DetailsInvite
                open={detailsDialog.value}
                onClose={detailsDialog.onFalse}
                participant={selectedInvite}
            />
        </>
    );
}