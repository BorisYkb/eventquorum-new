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

import { ParticipantTableRow } from 'src/sections/info-participant/participant-table-row';
import { ParticipantTableToolbar } from 'src/sections/info-participant/participant-table-toolbar';
import { ParticipantTableFiltersResult } from 'src/sections/info-participant/participant-table-filters-result';

// ----------------------------------------------------------------------

// Configuration des statistiques (basée sur l'image)
const PARTICIPANT_STATS = [
    { label: 'Nombre de demande reçues', value: 400, color: 'primary' },
    { label: 'Nombre de demande acceptées', value: 350, color: 'primary' },
    { label: 'Nombre de demandes rejetées', value: 0, color: 'error' },
    { label: 'Nombre de demandes en attentes', value: 50, color: 'warning' },
];

// En-têtes de tableau selon l'image
const PARTICIPANT_TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'nom_prenom', label: 'Nom_prenom', width: 200 },
    { id: 'email', label: 'Email', width: 200 },
    { id: 'telephone', label: 'Téléphone', width: 120 },
    { id: 'date', label: 'Date', width: 120 },
    { id: 'statut', label: 'Statut', width: 100 },
    { id: '', width: 88 },
];

// Options de statut
export const PARTICIPANT_STATUS_OPTIONS = [
    { value: 'acceptée', label: 'Acceptée', color: 'success' },
    { value: 'rejetée', label: 'Rejetée', color: 'error' },
    { value: 'en attente', label: 'En attente', color: 'warning' },
];

const STATUS_OPTIONS = [{ value: 'all', label: 'Tous les statut' }, ...PARTICIPANT_STATUS_OPTIONS];

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
    const { name, status } = filters;

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
            filteredData = filteredData.filter(item => item.statut === 'participé');
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

    if (status !== 'all') {
        filteredData = filteredData.filter((item) => item.statut === status);
    }

    return filteredData;
}

// ----------------------------------------------------------------------

export function SuperviseurClientListView() {
    const table = useTable();
    const confirmDialog = useBoolean();
    const [activeTab, setActiveTab] = useState('demandes');
    const [participantData, setParticipantData] = useState<IParticipantItem[]>(_participantList);

    const filters = useSetState<IParticipantTableFilters>({
        name: '',
        status: 'all',
    });

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
        table.onResetPage();
        filters.setState({ name: '', status: 'all' });
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

    const canReset = !!(filters.state.name || filters.state.status !== 'all');
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

                {/* Statistiques */}
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 3 }}>
                    {PARTICIPANT_STATS.map((stat, index) => (
                        <Card key={index} sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                            <Typography variant="body2" sx={{ mb: 1, fontSize: '0.875rem' }}>
                                {stat.label}
                            </Typography>
                            <Typography variant="h3" sx={{ 
                                color: stat.color === 'error' ? 'error.main' : 
                                       stat.color === 'warning' ? 'warning.main' : 'inherit',
                                fontSize: '2rem',
                                fontWeight: 'bold'
                            }}>
                                {stat.value}
                            </Typography>
                        </Card>
                    ))}
                </Box>

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

                    {/* Bouton d'export */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
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
                    </Box>

                    <Typography variant='h4' sx={{ mt: 3, mb: 2, pl: 5, fontSize: 20 }}>
                        {getTableTitle()}
                        <span className=' pl-1'>({dataFiltered.length})</span>
                    </Typography>

                    {/* Toolbar de filtrage */}
                    <ParticipantTableToolbar
                        filters={filters}
                        onResetPage={table.onResetPage}
                        statusOptions={STATUS_OPTIONS}
                    />

                    {/* Résultats des filtres */}
                    {canReset && (
                        <ParticipantTableFiltersResult
                            filters={filters}
                            totalResults={dataFiltered.length}
                            onResetPage={table.onResetPage}
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
                                    headCells={PARTICIPANT_TABLE_HEAD}
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