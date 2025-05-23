'use client';

import type { TableHeadCellProps } from 'src/components/table';

import { useState, useCallback } from 'react';
import { useBoolean, useSetState } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/admin';

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
import Typography from '@mui/material/Typography';
import { IClientItem, IClientTableFilters } from 'src/types/client';
import { _clientList } from 'src/_mock/_client';
import { ClientTableRow } from 'src/sections/gestionclient/client-table-row';
import { ClientTableToolbar } from 'src/sections/gestionclient/client-table-toolbar';
import { ClientTableFiltersResult } from 'src/sections/gestionclient/client-table-filters-result';

// ----------------------------------------------------------------------


const TABLE_HEAD: TableHeadCellProps[] = [
    { id: 'logo', label: 'Logo',width: 10 },
    { id: 'company_name', label: 'Nom / Raison sociale', width: 180 },
    { id: 'phoneNumber', label: 'Telephone', width: 180 },
    { id: 'creationDate', label: 'Date de création', width: 70 },
    { id: 'eventNumber', label: 'Nbre evenements', width: 60 },
    { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export function AdminClientListView() {
    const table = useTable();

    const confirmDialog = useBoolean();

    const [tableData, setTableData] = useState<IClientItem[]>(_clientList);

    const filters = useSetState<IClientTableFilters>({ company_name: '' });
    const { state: currentFilters, setState: updateFilters } = filters;

    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(table.order, table.orderBy),
        filters: currentFilters,
    });

    const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

    const canReset =
        !!currentFilters.company_name;

    const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

    const handleDeleteRow = useCallback(
        (id: string) => {
            const deleteRow = tableData.filter((row) => row.id !== id);

            toast.success('Suppression reussie!');

            setTableData(deleteRow);

            table.onUpdatePageDeleteRow(dataInPage.length);
        },
        [dataInPage.length, table, tableData]
    );

    const handleDeleteRows = useCallback(() => {
        const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

        toast.success('Suppression reussie');

        setTableData(deleteRows);

        table.onUpdatePageDeleteRows(dataInPage.length, dataFiltered.length);
    }, [dataFiltered.length, dataInPage.length, table, tableData]);

    const renderConfirmDialog = () => (
        <ConfirmDialog
            open={confirmDialog.value}
            onClose={confirmDialog.onFalse}
            title="Delete"
            content={
                <>
                    Are you sure want to delete <strong> {table.selected.length} </strong> items?
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
    );

    return (
        <>
            <DashboardContent maxWidth="xl">
                <CustomBreadcrumbs
                    heading={`Liste des clients (${dataFiltered.length})`}
                    action={
                        <Button
                            component={RouterLink}
                            href={paths.admin.GESTION_CLIENT.new}
                            variant="contained"
                            startIcon={<Iconify icon="mingcute:add-line" />}
                        >
                            Nouveau client
                        </Button>
                    }
                    sx={{ mb: { xs: 3, md: 5 } }}
                />

                <Card>
                    {/* <Typography variant='subtitle2' sx={{ mt: 3, mb: 2, pl: 5, fontSize: 20 }}>
                        {dataFiltered.length} Clients enregistrés
                    </Typography> */}

                    <ClientTableToolbar
                        filters={filters}
                        onResetPage={table.onResetPage}
                    // options={{ roles: _roles }}
                    />

                    {canReset && (
                        <ClientTableFiltersResult
                            filters={filters}
                            totalResults={dataFiltered.length}
                            onResetPage={table.onResetPage}
                            sx={{ p: 2.5, pt: 0 }}
                        />
                    )}

                    <Box sx={{ position: 'relative' }}>
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
                                <Tooltip title="Delete">
                                    <IconButton color="primary" onClick={confirmDialog.onTrue}>
                                        <Iconify icon="solar:trash-bin-trash-bold" />
                                    </IconButton>
                                </Tooltip>
                            }
                        />

                        <Scrollbar>
                            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                                <TableHeadCustom
                                    order={table.order}
                                    orderBy={table.orderBy}
                                    headCells={TABLE_HEAD}
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
                                    {dataFiltered
                                        .slice(
                                            table.page * table.rowsPerPage,
                                            table.page * table.rowsPerPage + table.rowsPerPage
                                        )
                                        .map((row) => (
                                            <ClientTableRow
                                                key={row.id}
                                                row={row}
                                                selected={table.selected.includes(row.id)}
                                                onSelectRow={() => table.onSelectRow(row.id)}
                                                onDeleteRow={() => handleDeleteRow(row.id)}
                                                editHref={paths.admin.GESTION_CLIENT.edit(row.id)}
                                                viewHref={paths.admin.GESTION_CLIENT.ficheclient(row.id)}
                                                // editHref={paths.admin.GESTION_CLIENT.edit(row.id)}
                                            />
                                        ))}

                                    <TableEmptyRows
                                        height={table.dense ? 56 : 56 + 20}
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
            </DashboardContent>

            {renderConfirmDialog()}
        </>
    );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
    inputData: IClientItem[];
    filters: IClientTableFilters;
    comparator: (a: any, b: any) => number;
};

function applyFilter({ inputData, comparator, filters }: ApplyFilterProps) {
    const { company_name } = filters;

    const stabilizedThis = inputData.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (company_name) {
        inputData = inputData.filter((user) => user.company_name.toLowerCase().includes(company_name.toLowerCase()));
    }

    // if (status !== 'all') {
    //     inputData = inputData.filter((user) => user.status === status);
    // }

    // if (role.length) {
    //     inputData = inputData.filter((user) => role.includes(user.role));
    // }

    return inputData;
}
