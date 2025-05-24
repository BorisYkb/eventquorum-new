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
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid2';
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

// Import du composant AdminWidgetSummary
import { SuperviseurWidgetSummary } from '../../superviseur/view/superviseur-widget-summary';

import { ParticipantTableRow } from 'src/sections/info-participant/participant-table-row';
import { ParticipantTableToolbar } from 'src/sections/info-participant/participant-table-toolbar';
import { ParticipantTableFiltersResult } from 'src/sections/info-participant/participant-table-filters-result';
import { DetailsInvite } from 'src/app/superviseur/participants/components/details-invite';

// ----------------------------------------------------------------------

// En-têtes pour l'onglet "Liste des demandes d'inscription" (sans colonne actions)
const DEMANDES_TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'nom_prenom', label: 'Nom_prenom', width: 200 },
    { id: 'email', label: 'Email', width: 200 },
    { id: 'telephone', label: 'Téléphone', width: 120 },
    { id: 'date', label: 'Date', width: 120 },
    { id: 'statut', label: 'Statut', width: 100 },
];

// En-têtes pour l'onglet "Liste des invités" (avec colonne détail)
const INVITES_TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'nom_prenom', label: 'Nom_prenom', width: 150 },
    { id: 'email', label: 'Email', width: 180 },
    { id: 'telephone', label: 'Téléphone', width: 120 },
    { id: 'connecte', label: 'Connecté', width: 100 },
    { id: 'premiere_connexion', label: 'Première connexion', width: 140 },
    { id: 'activite_selectionnee', label: 'Activité sélectionnée', width: 150 },
    { id: 'achat_effectue', label: 'Achat effectué', width: 120 },
    { id: 'detail', label: 'Détail', width: 88 },
];

// En-têtes pour l'onglet "Liste des participants" (avec colonne détail)
const PARTICIPANTS_TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'nom', label: 'Nom', width: 120 },
    { id: 'prenom', label: 'Prénom', width: 120 },
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
    const detailsDialog = useBoolean();
    const [activeTab, setActiveTab] = useState('demandes');
    const [participantData] = useState<IParticipantItem[]>(_participantList);
    const [selectedInvite, setSelectedInvite] = useState<IParticipantItem | null>(null);

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

    const handleViewDetails = useCallback((participant: IParticipantItem) => {
        setSelectedInvite(participant);
        detailsDialog.onTrue();
    }, [detailsDialog]);

    const handleExportPDF = () => {
        // Logique d'export PDF ici
        console.log('Export PDF en cours...');
    };

    const handleConsultConnectedList = () => {
        // Logique pour consulter la liste des connectés
        console.log('Consultation de la liste des connectés...');
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

    // Fonction pour obtenir les statistiques selon l'onglet
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
                    { title: "Invités", total: 500, color: '#1976d2' },
                    { title: "Connectés", total: 100, color: '#1976d2' },
                    { title: "Sélection d'activités", total: 75, color: '#1976d2' },
                    { title: "Première connexion", total: 100, color: '#1976d2' },
                    { title: "Achat effectué", total: 50, color: '#1976d2' }
                ];
            case 'participants':
                return []; // Pas de statistiques pour les participants
            default:
                return [];
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

    const statistics = getStatistics();

    return (
        <>
            <DashboardContent maxWidth="xl">
                <CustomBreadcrumbs
                    heading='Participants'
                    sx={{ mb: { xs: 3, md: 5 } }}
                />

                {/* Onglets déplacés au-dessus des statistiques */}
                <Card sx={{ mb: 3 }}>
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

                {/* Statistiques dynamiques selon l'onglet */}
                {statistics.length > 0 && (
                    <Grid container spacing={3} sx={{ mb: 3 }}>
                        {statistics.map((stat, index) => (
                            <Grid 
                                key={index} 
                                size={{ 
                                    xs: 12, 
                                    md: activeTab === 'invites' ? 2.4 : 3 
                                }}
                            >
                                <SuperviseurWidgetSummary 
                                    title={stat.title} 
                                    total={stat.total}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}

                <Card>
                    {/* Boutons d'actions selon l'onglet */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2, pt: 2 }}>
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
                                            onDeleteRow={() => {}}
                                            onViewDetails={() => handleViewDetails(row)}
                                            activeTab={activeTab}
                                            readOnly={true}
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