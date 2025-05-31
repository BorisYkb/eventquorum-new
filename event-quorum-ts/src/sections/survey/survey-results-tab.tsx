// src/sections/survey/survey-results-tab.tsx

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

import { useSetState } from 'minimal-shared/hooks';
import { useTable, emptyRows, TableNoData, getComparator, TableEmptyRows, TableHeadCustom, TablePaginationCustom } from 'src/components/table';
import { Scrollbar } from 'src/components/scrollbar';
import { Iconify } from 'src/components/iconify';
import { SuperviseurWidgetSummary } from 'src/sections/overview/superviseur/view/superviseur-widget-summary';

import { ISurveyItem, ISurveyTableFilters } from 'src/types/survey';
import { _surveyList, getSurveyStats } from 'src/_mock/_surveys';
import { SurveyTableRow } from './survey-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'titre_enquete', label: 'Titre enquête', width: 120 },
  { id: 'date', label: 'Date', width: 140 },
  { id: 'date_expiration', label: 'Date d\'expiration', width: 140 },
  { id: 'statut', label: 'Statut', width: 120 },
  { id: 'statut_participation', label: 'Statut de participation', width: 160 },
  { id: 'note', label: 'Note', width: 80 },
  { id: 'action', label: 'Action', width: 80 },
];

interface FilterData {
  surveyData: ISurveyItem[];
  filters: ISurveyTableFilters;
  comparator: (a: any, b: any) => number;
}

function applyFilter({ surveyData, filters, comparator }: FilterData) {
  const { name } = filters;

  let filteredData = [...surveyData];

  // Trier les données
  const stabilizedThis = filteredData.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  filteredData = stabilizedThis.map((el) => el[0]);

  // Appliquer le filtre de recherche
  if (name) {
    filteredData = filteredData.filter(
      (item) => 
        item.titre_enquete.toLowerCase().includes(name.toLowerCase()) ||
        item.statut.toLowerCase().includes(name.toLowerCase()) ||
        item.statut_participation.toLowerCase().includes(name.toLowerCase())
    );
  }

  return filteredData;
}

export function SurveyResultsTab() {
  const table = useTable();
  const router = useRouter();
  const [surveyData] = useState<ISurveyItem[]>(_surveyList);
  
  // Filtres
  const filters = useSetState<ISurveyTableFilters>({
    name: '',
    status: 'all',
    participationStatus: 'all',
  });

  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      table.onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, table]
  );

  const dataFiltered = applyFilter({
    surveyData,
    filters: filters.state,
    comparator: getComparator(table.order, table.orderBy),
  });

  const paginatedData = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const handleViewDetails = useCallback((survey: ISurveyItem) => {
    // TODO: Naviguer vers la page de détail de l'enquête
    console.log('Voir détails enquête:', survey.id);
    // router.push(`/superviseur/surveys/${survey.id}`);
  }, []);

  const canReset = !!filters.state.name;
  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;
  const stats = getSurveyStats();

  return (
    <Box>
      {/* Statistiques */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="Nombre enquêtes"
            total={stats.nombre_enquetes}
            sx={{ bgcolor: '#FFF4E5', color: 'white' }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="Nombre d'enquête expirée"
            total={stats.nombre_enquetes_expirees}
            sx={{ bgcolor: '#FBC6C2', color: 'white' }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="Nombre enquêtes en cours"
            total={stats.nombre_enquetes_en_cours}
            sx={{ bgcolor: '#EDF7ED', color: 'white' }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SuperviseurWidgetSummary
            title="Nombre enquêtes non démarrée"
            total={stats.nombre_enquetes_non_demarrees}
            sx={{ bgcolor: '#90CAF9', color: 'white' }}
          />
        </Grid>
      </Grid>

      {/* Tableau */}
      <Card>
        {/* Barre de recherche */}
        <Box sx={{ p: 2.5, pb: 0 }}>
          <TextField
            fullWidth
            value={filters.state.name}
            onChange={handleFilterName}
            placeholder="Recherche..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box sx={{ position: 'relative' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headCells={TABLE_HEAD}
                rowCount={dataFiltered.length}
                numSelected={0}
                onSort={table.onSort}
              />

              <TableBody>
                {paginatedData.map((row) => (
                  <SurveyTableRow
                    key={row.id}
                    row={row}
                    onViewDetails={() => handleViewDetails(row)}
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
    </Box>
  );
}