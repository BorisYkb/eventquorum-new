'use client';

import type { TableHeadCellProps } from 'src/components/table';
import { IParticipantItem, IParticipantTableFilters } from 'src/types/participant';

import { useState, useCallback } from 'react';
import { useBoolean, useSetState } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { DashboardContent } from 'src/layouts/superviseur';
import { _participantList } from 'src/_mock/_participants';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
    useTable,
    emptyRows,
    rowInPage,
    TableNoData,
    getComparator,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedAction,
    TablePaginationCustom,
} from 'src/components/table';

// Import du composant AdminWidgetSummary
import { AdminWidgetSummary } from 'src/sections/overview/admin/view/admin-widget-summary';

import { ParticipantTableRow } from 'src/sections/info-participant/participant-table-row';
import { ParticipantTableToolbar } from 'src/sections/info-participant/participant-table-toolbar';
import { ParticipantTableFiltersResult } from 'src/sections/info-participant/participant-table-filters-result';

// ----------------------------------------------------------------------

// En-têtes pour l'onglet "Liste des demandes d'inscription"
const DEMANDES_TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'nom_prenom', label: 'Nom_prenom', width: 200 },
    { id: 'email', label: 'Email', width: 200 },
    { id: 'telephone', label: 'Téléphone', width: 120 },
    { id: 'date', label: 'Date', width: 120 },
    { id: 'statut', label: 'Statut', width: 100 },
    { id: '', width: 88 },
];

// En-têtes pour l'onglet "Liste des invités"
const INVITES_TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'nom_prenom', label: 'Nom_prenom', width: 150 },
    { id: 'email', label: 'Email', width: 180 },
    { id: 'telephone', label: 'Téléphone', width: 120 },
    { id: 'connecte', label: 'Connecté', width: 100 },
    { id: 'premiere_connexion', label: 'Première connexion', width: 140 },
    { id: 'activite_selectionnee', label: 'Activité sélectionnée', width: 150 },
    { id: 'achat_effectue', label: 'Achat effectué', width: 120 },
    { id: '', width: 88 },
];

// En-têtes pour l'onglet "Liste des participants"
const PARTICIPANTS_TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'nom', label: 'Nom', width: 120 },
    { id: 'prenom', label: 'Prénom', width: 120 },
    { id: 'telephone', label: 'Téléphone', width: 120 },
    { id: 'email', label: 'Email', width: 180 },
    { id: 'connecte', label: 'Connecté', width: 100 },
    { id: 'statut', label: 'Statut', width: 100 },
    { id: 'emargement', label: 'Emargement', width: 120 },
    { id: '', width: 88 },
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

// Options d'activité (selon l'image)
export const ACTIVITY_OPTIONS = [
    { value: 'activité 1', label: 'Activité 1' },
    { value: 'activité 2', label: 'Activité 2' },
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
    const confirmDialog = useBoolean();
    const [activeTab, setActiveTab] = useState('demandes');
    const [participantData, setParticipantData] = useState<IParticipantItem[]>(_participantList);

    // Filtres étendus selon l'onglet
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

    const handleDeleteRow = useCallback(
        (id: string) => {
            setParticipantData(prev => prev.filter(row => row.id !== id));
            toast.success('Suppression réussie!');
            table.onUpdatePageDeleteRow(paginatedData.length);
        },
        [table, paginatedData.length]
    );

    const handleDeleteRows = useCallback(() => {
        const totalRowsFiltered = dataFiltered.length;
        const currentPageRows = paginatedData.length;

        setParticipantData(prev => prev.filter(row => !table.selected.includes(row.id)));
        toast.success('Suppression réussie!');

        table.onUpdatePageDeleteRows(currentPageRows, totalRowsFiltered);
    }, [table, dataFiltered.length, paginatedData]);

    const handleExportPDF = () => {
        toast.info('Export PDF en cours...');
        // Logique d'export PDF ici
    };

    const handleConsultConnectedList = () => {
        toast.info('Consultation de la liste des connectés...');
        // Logique pour consulter la liste des connectés
    };

    // Fonction pour obtenir les options de statut selon l'onglet
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

    // Fonction pour obtenir les en-têtes selon l'onglet
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

    const canReset = !!(
        filters.state.name || 
        filters.state.status !== 'all' || 
        filters.state.activity !== 'all' ||
        filters.state.connectionStatus !== 'all' ||
        filters.state.purchaseStatus !== 'all'
    );
    
    const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

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

    return (
        <>
            <DashboardContent maxWidth="xl">
                <CustomBreadcrumbs
                    heading='Participants'
                    sx={{ mb: { xs: 3, md: 5 } }}
                />

                {/* Statistiques avec graphiques */}
                <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <AdminWidgetSummary
                            title="Invité"
                            total={500}
                            percent={15.2}
                            chart={{
                                colors: [theme.palette.primary.light, theme.palette.primary.main],
                                categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
                                series: [420, 450, 480, 490, 495, 500],
                            }}
                        />
                    </Grid>
                    
                    <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <AdminWidgetSummary
                            title="Connecté"
                            total={100}
                            percent={8.5}
                            chart={{
                                colors: [theme.palette.info.light, theme.palette.info.main],
                                categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
                                series: [65, 75, 85, 90, 95, 100],
                            }}
                        />
                    </Grid>
                    
                    <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <AdminWidgetSummary
                            title="Sélection d'activité"
                            total={75}
                            percent={-2.1}
                            chart={{
                                colors: [theme.palette.warning.light, theme.palette.warning.main],
                                categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
                                series: [80, 78, 76, 75, 74, 75],
                            }}
                        />
                    </Grid>
                    
                    <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <AdminWidgetSummary
                            title="Première connexion"
                            total={100}
                            percent={12.8}
                            chart={{
                                colors: [theme.palette.success.light, theme.palette.success.main],
                                categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
                                series: [70, 80, 85, 90, 95, 100],
                            }}
                        />
                    </Grid>
                    
                    <Grid size={{ xs: 12, sm: 6, md: 2.4 }}>
                        <AdminWidgetSummary
                            title="Achat effectué"
                            total={50}
                            percent={-5.3}
                            totalColor={theme.palette.error.main}
                            chart={{
                                colors: [theme.palette.error.light, theme.palette.error.main],
                                categories: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
                                series: [60, 55, 52, 50, 48, 50],
                            }}
                        />
                    </Grid>
                </Grid>

                <Card>
                    {/* Onglets */}
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        sx={{ px: 2.5, mb: 3 }}
                    >
                        {PARTICIPANT_TABS.map((tab) => (
                            <Tab
                                key={tab.value}
                                value={tab.value}
                                label={tab.label}
                            />
                        ))}
                    </Tabs>

                    {/* Boutons d'actions selon l'onglet */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
                        {activeTab === 'demandes' && (
                            <Button
                                variant="contained"
                                color="info"
                                onClick={handleExportPDF}
                                startIcon={<Iconify icon="eva:download-fill" />}
                                sx={{ 
                                    bgcolor: 'cyan',
                                    color: 'black',
                                    '&:hover': { bgcolor: 'darkturquoise' }
                                }}
                            >
                                Exporter la liste des demandes de participations (PDF&EXCEL)
                            </Button>
                        )}
                        {activeTab === 'participants' && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleConsultConnectedList}
                                startIcon={<Iconify icon="eva:eye-fill" />}
                                sx={{ 
                                    bgcolor: '#1976d2',
                                    '&:hover': { bgcolor: '#115293' }
                                }}
                            >
                                Consulter la liste des connectés
                            </Button>
                        )}
                    </Box>

                    {/* Filtres avancés pour les onglets invités et participants */}
                    {(activeTab === 'invites' || activeTab === 'participants') && (
                        <Box sx={{ display: 'flex', gap: 2, p: 2.5, pt: 0 }}>
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

                            {activeTab === 'invites' && (
                                <>
                                    <FormControl size="small" sx={{ minWidth: 150 }}>
                                        <InputLabel>Connectés</InputLabel>
                                        <Select
                                            value={filters.state.connectionStatus || 'all'}
                                            onChange={(e) => filters.setState({ connectionStatus: e.target.value })}
                                            label="Connectés"
                                        >
                                            <MenuItem value="all">Tous les invités</MenuItem>
                                            <MenuItem value="connecté">Connectés</MenuItem>
                                            <MenuItem value="non connecté">Non connectés</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl size="small" sx={{ minWidth: 180 }}>
                                        <InputLabel>Première connexion</InputLabel>
                                        <Select
                                            value={filters.state.purchaseStatus || 'all'}
                                            onChange={(e) => filters.setState({ purchaseStatus: e.target.value })}
                                            label="Première connexion"
                                        >
                                            <MenuItem value="all">Tous</MenuItem>
                                            <MenuItem value="oui">Première connexion</MenuItem>
                                            <MenuItem value="non">Pas de première connexion</MenuItem>
                                        </Select>
                                    </FormControl>
                                </>
                            )}
                        </Box>
                    )}

                    <Typography variant='h4' sx={{ mt: 3, mb: 2, pl: 5, fontSize: 20 }}>
                        {getTableTitle()}
                        <span className=' pl-1'>({dataFiltered.length} participants)</span>
                    </Typography>

                    {/* Toolbar de filtrage */}
                    <ParticipantTableToolbar
                        filters={filters}
                        onResetPage={table.onResetPage}
                        statusOptions={getStatusOptions()}
                        activeTab={activeTab}
                    />

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
                        {/* Actions sélection multiple */}
                        <TableSelectedAction
                            dense={table.dense}
                            numSelected={table.selected.length}
                            rowCount={dataFiltered.length}
                            onSelectAllRows={(checked) =>
                                table.onSelectAllRows(
                                    checked,
                                    dataFiltered.map((row) => row.id)
                                )
                            }
                            action={
                                <Tooltip title="Supprimer">
                                    <IconButton color="primary" onClick={confirmDialog.onTrue}>
                                        <Iconify icon="solar:trash-bin-trash-bold" />
                                    </IconButton>
                                </Tooltip>
                            }
                        />

                        {/* Tableau */}
                        <Scrollbar>
                            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                                <TableHeadCustom
                                    order={table.order}
                                    orderBy={table.orderBy}
                                    headCells={getTableHeaders()}
                                    rowCount={dataFiltered.length}
                                    numSelected={table.selected.length}
                                    onSort={table.onSort}
                                    onSelectAllRows={(checked) =>
                                        table.onSelectAllRows(
                                            checked,
                                            dataFiltered.map((row) => row.id)
                                        )
                                    }
                                />

                                <TableBody>
                                    {paginatedData.map((row) => (
                                        <ParticipantTableRow
                                            key={row.id}
                                            row={row}
                                            selected={table.selected.includes(row.id)}
                                            onSelectRow={() => table.onSelectRow(row.id)}
                                            onDeleteRow={() => handleDeleteRow(row.id)}
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

            {/* Dialog de confirmation */}
            <ConfirmDialog
                open={confirmDialog.value}
                onClose={confirmDialog.onFalse}
                title="Supprimer"
                content={
                    <>
                        Êtes-vous sûr de vouloir supprimer <strong> {table.selected.length} </strong> éléments?
                    </>
                }
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleDeleteRows();
                            confirmDialog.onFalse();
                        }}
                    >
                        Supprimer
                    </Button>
                }
            />
        </>
    );
}