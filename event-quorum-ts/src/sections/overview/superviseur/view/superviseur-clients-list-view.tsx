//src/sections/overview/superviseur/view/superviseur-clients-list-view.tsx

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
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { DashboardContent } from 'src/layouts/superviseur';
import { _participantList } from 'src/_mock/_participants';
import { _superviseurInvitesList, getInvitesStatistics } from 'src/_mock/_superviseurInvites';

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

import { SuperviseurWidgetSummary } from '../../superviseur/view/superviseur-widget-summary-2';
import { ParticipantTableRow } from 'src/sections/info-participant/participant-table-row';
import { ParticipantTableFiltersResult } from 'src/sections/info-participant/participant-table-filters-result';
import { DetailsInvite } from 'src/app/superviseur/participants/components/details-invite';

// Import des composants superviseur pour les invités
import {
    SuperviseurInvitesTable,
    SuperviseurExportButtons,
    type SuperviseurParticipant,
    type ActiveFilters,
} from 'src/sections/superviseur/participants';

// ----------------------------------------------------------------------

// En-têtes pour l'onglet "Liste des demandes d'inscription"
const DEMANDES_TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'nom_prenom', label: 'Nom_prenom', width: 200 },
    { id: 'email', label: 'Email', width: 200 },
    { id: 'telephone', label: 'Téléphone', width: 120 },
    { id: 'date', label: 'Date', width: 120 },
    { id: 'statut', label: 'Statut', width: 100 },
];

// Options de statut pour les demandes
export const DEMANDE_STATUS_OPTIONS = [
    { value: 'acceptée', label: 'Acceptée', color: 'success' },
    { value: 'rejetée', label: 'Rejetée', color: 'error' },
    { value: 'en attente', label: 'En attente', color: 'warning' },
];

// Options d'activité
export const ACTIVITY_OPTIONS = [
    { value: 'activité 1', label: 'Activité 1' },
    { value: 'activité 2', label: 'Activité 2' },
];

// Onglets de navigation (MODIFIÉ : suppression de l'onglet participants)
export const PARTICIPANT_TABS = [
    { label: 'Liste des demandes d\'inscription', value: 'demandes' },
    { label: 'Liste des invités', value: 'invites' },
];

interface FilterData {
    participantData: IParticipantItem[];
    filters: IParticipantTableFilters;
    comparator: (a: any, b: any) => number;
    activeTab: string;
}

function applyFilter({ participantData, filters, comparator, activeTab }: FilterData) {
    const { name, status, activity } = filters;

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

    // État pour les filtres actifs (pour l'export des invités)
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
        activityFilter: '',
        firstConnectionFilter: '',
        connectionTypeFilter: '',
        emargementFilter: '',
        checkingFilter: '',
    });

    // Données des invités depuis le fichier mock
    const [invitesData] = useState<SuperviseurParticipant[]>(_superviseurInvitesList);

    // Statistiques calculées depuis les données mock
    const invitesStats = getInvitesStatistics();

    useEffect(() => {
        const tabFromUrl = searchParams?.get('tab');
        if (tabFromUrl && ['demandes', 'invites'].includes(tabFromUrl)) {
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
        setSelectedInvite(participant);
        detailsDialog.onTrue();
    }, [detailsDialog]);

    const handleViewInviteDetails = useCallback((id: number) => {
        // TODO: Implémenter la vue détails pour les invités
        console.log('Voir détails invité:', id);
        router.push(`/superviseur/participants/${id}`);
    }, [router]);

    const handleExportPDF = () => {
        console.log('Export PDF des demandes en cours...');
        // TODO: Implémenter l'export PDF des demandes
    };

    const handleFiltersChange = useCallback((filters: ActiveFilters) => {
        setActiveFilters(filters);
    }, []);

    const getStatusOptions = () => {
        return [{ value: 'all', label: 'Tous les statuts' }, ...DEMANDE_STATUS_OPTIONS];
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
                    { title: "Invités", total: invitesStats.total },
                    { title: "Connectés", total: invitesStats.connectes },
                    { title: "Émargés", total: invitesStats.emarges },
                    { title: "Dans la salle", total: invitesStats.checked }
                ];
            default:
                return [];
        }
    };

    const getSearchPlaceholder = () => {
        return activeTab === 'demandes'
            ? 'Rechercher une demande (nom, email)...'
            : 'Rechercher un invité (nom, email)...';
    };

    const canReset = !!(
        filters.state.name ||
        filters.state.status !== 'all' ||
        filters.state.activity !== 'all'
    );

    const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

    const getWidgetColor = (index: number): 'primary' | 'secondary' | 'success' | 'warning' => {
        const colors: Array<'primary' | 'secondary' | 'success' | 'warning'> = ['primary', 'secondary', 'success', 'warning'];
        return colors[index % colors.length];
    };

    const statistics = getStatistics();

    return (
        <>
            <DashboardContent maxWidth="xl">
                <CustomBreadcrumbs
                    heading='Participants'
                    sx={{ mb: { xs: 3, md: 5 } }}
                />

                {/* Onglets */}
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

                {/* Statistiques */}
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

                {/* Contenu selon l'onglet actif */}
                {activeTab === 'demandes' && (
                    <Card>
                        <Box sx={{ p: 2.5 }}>
                            {/* En-tête avec bouton export */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
                                <Typography variant='h4' sx={{ fontSize: 20 }}>
                                    Liste des demandes d'inscription
                                    <span style={{ paddingLeft: 4 }}>({dataFiltered.length})</span>
                                </Typography>

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
                            </Box>

                            {/* Filtres */}
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                                <FormControl size="small" sx={{ minWidth: 200 }}>
                                    <InputLabel>Statut des demandes</InputLabel>
                                    <Select
                                        value={filters.state.status || 'all'}
                                        onChange={(e) => filters.setState({ status: e.target.value })}
                                        label="Statut des demandes"
                                    >
                                        {getStatusOptions().map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

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
                            <Scrollbar>
                                <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                                    <TableHeadCustom
                                        order={table.order}
                                        orderBy={table.orderBy}
                                        headCells={DEMANDES_TABLE_HEAD}
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
                )}

                {/* Onglet Invités - Utilisation des nouveaux composants */}
                {activeTab === 'invites' && (
                    <Container maxWidth="xl" sx={{ py: 0, px: 0 }}>
                        <Stack spacing={4}>
                            {/* En-tête */}
                            <Box>
                                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                                    Gestion des invités
                                </Typography>
                            </Box>

                            {/* Boutons d'export */}
                            <Stack direction="row" justifyContent="flex-end">
                                <SuperviseurExportButtons activeFilters={activeFilters} />
                            </Stack>

                            {/* Tableau des invités */}
                            <SuperviseurInvitesTable
                                participants={invitesData}
                                onView={handleViewInviteDetails}
                                onFiltersChange={handleFiltersChange}
                            />
                        </Stack>
                    </Container>
                )}
            </DashboardContent>

            {/* Dialog de détails des demandes */}
            <DetailsInvite
                open={detailsDialog.value}
                onClose={detailsDialog.onFalse}
                participant={selectedInvite}
            />
        </>
    );
}