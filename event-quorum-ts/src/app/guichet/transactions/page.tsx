'use client';

import type { TableHeadCellProps } from 'src/components/table';

import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/navigation';

import { DashboardContent } from 'src/layouts/guichet';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import {
  useTable,
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { useMockedUser } from 'src/auth/hooks';

// ----------------------------------------------------------------------

type TransactionData = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  montant: number;
  date: string;
  activite: string;
  activites: {
    id: number;
    nom: string;
    horaire: string;
    type: string;
    statut: string;
    places: number;
  }[];
};

// Configuration des en-têtes du tableau
const TABLE_HEAD: TableHeadCellProps[] = [
  { id: 'nom', label: 'Nom et Prénom', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'montant', label: 'Montant (FCFA)', align: 'right' },
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'actions', label: 'Action', align: 'center' },
];

// Options de filtrage par date
const DATE_FILTER_OPTIONS = [
  { value: '', label: 'Toutes les dates' },
  { value: 'today', label: 'Aujourd\'hui' },
  { value: 'yesterday', label: 'Hier' },
  { value: 'last7days', label: '7 derniers jours' },
  { value: 'last20days', label: '20 derniers jours' },
  { value: 'thisMonth', label: 'Ce mois' },
  { value: 'lastMonth', label: 'Mois dernier' },
];

const MOCK_TRANSACTIONS: TransactionData[] = [
  {
    id: 1,
    nom: 'Boudou',
    prenom: 'Khoudou',
    email: 'boudou@gmail.com',
    montant: 50000,
    date: '2024-07-17',
    activite: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
    activites: [
      {
        id: 1,
        nom: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
        horaire: '09:00 - 11:00',
        type: 'Standard',
        statut: 'En cours',
        places: 1
      },
      {
        id: 2,
        nom: 'PANEL DE HAUT NIVEAU',
        horaire: '14:00 - 16:00',
        type: 'VIP',
        statut: 'Non démarré',
        places: 1
      }
    ]
  },
  {
    id: 2,
    nom: 'Kouame',
    prenom: 'Jean',
    email: 'kouame@gmail.com',
    montant: 25000,
    date: '2024-07-16',
    activite: 'PANEL DE HAUT NIVEAU',
    activites: [
      {
        id: 3,
        nom: 'PANEL DE HAUT NIVEAU',
        horaire: '14:00 - 16:00',
        type: 'Standard',
        statut: 'En cours',
        places: 1
      }
    ]
  },
  {
    id: 3,
    nom: 'Sidibe',
    prenom: 'Moussa',
    email: 'sidibemoussa@gmail.com',
    montant: 75000,
    date: '2024-07-15',
    activite: 'POINT DE PRESSE',
    activites: [
      {
        id: 4,
        nom: 'POINT DE PRESSE',
        horaire: '11:00 - 12:00',
        type: 'VIP',
        statut: 'Terminé',
        places: 1
      },
      {
        id: 5,
        nom: 'COOLING BREAK',
        horaire: '16:00 - 17:00',
        type: 'Standard',
        statut: 'En cours',
        places: 2
      }
    ]
  },
  {
    id: 4,
    nom: 'GRA-BI',
    prenom: 'Amira',
    email: 'grabianira@gmail.com',
    montant: 30000,
    date: '2024-07-14',
    activite: 'PANEL DE HAUT NIVEAU',
    activites: [
      {
        id: 6,
        nom: 'PANEL DE HAUT NIVEAU',
        horaire: '14:00 - 16:00',
        type: 'Standard',
        statut: 'Non démarré',
        places: 1
      },
      {
        id: 7,
        nom: 'PAUSE CAFE',
        horaire: '10:00 - 10:30',
        type: 'Standard',
        statut: 'Terminé',
        places: 1
      }
    ]
  },
  {
    id: 5,
    nom: 'Traore',
    prenom: 'Fatou',
    email: 'fatou.traore@gmail.com',
    montant: 45000,
    date: '2024-07-10',
    activite: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
    activites: [
      {
        id: 8,
        nom: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
        horaire: '09:00 - 11:00',
        type: 'VIP',
        statut: 'En cours',
        places: 1
      }
    ]
  },
  {
    id: 6,
    nom: 'Diallo',
    prenom: 'Mamadou',
    email: 'mamadou.diallo@gmail.com',
    montant: 60000,
    date: '2024-06-28',
    activite: 'COOLING BREAK',
    activites: [
      {
        id: 9,
        nom: 'COOLING BREAK',
        horaire: '16:00 - 17:00',
        type: 'Standard',
        statut: 'En cours',
        places: 1
      },
      {
        id: 10,
        nom: 'POINT DE PRESSE',
        horaire: '11:00 - 12:00',
        type: 'Standard',
        statut: 'Non démarré',
        places: 1
      }
    ]
  },
  {
    id: 7,
    nom: 'Kone',
    prenom: 'Aissata',
    email: 'aissata.kone@gmail.com',
    montant: 35000,
    date: '2024-06-25',
    activite: 'PAUSE CAFE',
    activites: [
      {
        id: 11,
        nom: 'PAUSE CAFE',
        horaire: '10:00 - 10:30',
        type: 'VIP',
        statut: 'Terminé',
        places: 1
      }
    ]
  },
  {
    id: 8,
    nom: 'Ouattara',
    prenom: 'Ibrahim',
    email: 'ibrahim.ouattara@gmail.com',
    montant: 80000,
    date: '2024-07-17',
    activite: 'PANEL DE HAUT NIVEAU',
    activites: [
      {
        id: 12,
        nom: 'PANEL DE HAUT NIVEAU',
        horaire: '14:00 - 16:00',
        type: 'VIP',
        statut: 'En cours',
        places: 2
      },
      {
        id: 13,
        nom: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
        horaire: '09:00 - 11:00',
        type: 'Standard',
        statut: 'Non démarré',
        places: 1
      }
    ]
  }
];

// ----------------------------------------------------------------------

export default function TransactionsPage() {
  const { user } = useMockedUser();
  const theme = useTheme();
  const router = useRouter();
  const table = useTable({ defaultOrderBy: 'date', defaultOrder: 'desc' });

  const [tableData, setTableData] = useState<TransactionData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateFilter, setSelectedDateFilter] = useState('');
  const [selectedActivityFilter, setSelectedActivityFilter] = useState('');

  useEffect(() => {
    setTableData(MOCK_TRANSACTIONS);
  }, []);

  // Extraire toutes les activités uniques pour le filtre
  const uniqueActivities = Array.from(
    new Set(tableData.map(t => t.activite))
  ).sort();

  // Filtrage des transactions
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    searchTerm,
    selectedDateFilter,
    selectedActivityFilter,
  });

  const handleViewDetails = (transactionId: number) => {
    router.push(`/guichet/transactions/${transactionId}`);
  };

  const handleExport = () => {
    // Préparer les données pour l'export
    const exportData = dataFiltered.map(t => ({
      'ID': t.id,
      'Nom': t.nom,
      'Prénom': t.prenom,
      'Email': t.email,
      'Montant (FCFA)': t.montant,
      'Date': formatDate(t.date),
      'Activité Principale': t.activite,
      'Nombre d\'activités': t.activites.length
    }));

    // Convertir en CSV
    const headers = Object.keys(exportData[0]).join(',');
    const rows = exportData.map(row => Object.values(row).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;

    // Télécharger
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        {/* Section principale - Liste des transactions */}
        <Grid size={{ xs: 12 }}>
          <Card>
            {/* En-tête avec titre */}
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                LISTE DES TRANSACTIONS EFFECTUÉES
              </Typography>
            </Box>

            {/* Barre d'outils */}
            <Box sx={{ px: 3, pb: 3 }}>
              <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid size={{ xs: 12, md: 2.5 }}>
                  <FormControl size="small" fullWidth>
                    <Select
                      value={selectedDateFilter}
                      onChange={(e) => setSelectedDateFilter(e.target.value)}
                      displayEmpty
                      sx={{
                        bgcolor: 'white',
                        '& .MuiSelect-select': {
                          color: selectedDateFilter ? 'text.primary' : 'grey.500'
                        }
                      }}
                    >
                      {DATE_FILTER_OPTIONS.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 2.5 }}>
                  <FormControl size="small" fullWidth>
                    <Select
                      value={selectedActivityFilter}
                      onChange={(e) => setSelectedActivityFilter(e.target.value)}
                      displayEmpty
                      sx={{
                        bgcolor: 'white',
                        '& .MuiSelect-select': {
                          color: selectedActivityFilter ? 'text.primary' : 'grey.500'
                        }
                      }}
                    >
                      <MenuItem value="">Toutes les activités</MenuItem>
                      {uniqueActivities.map((activity) => (
                        <MenuItem key={activity} value={activity}>
                          {activity}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Rechercher par nom, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify icon="eva:search-fill" sx={{ color: 'grey.400' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Iconify icon="eva:download-fill" />}
                    onClick={handleExport}
                    disabled={dataFiltered.length === 0}
                  >
                    Exporter ({dataFiltered.length})
                  </Button>
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
              <Scrollbar sx={{ minHeight: 400 }}>
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
                      .map((transaction) => (
                        <TableRow
                          hover
                          key={transaction.id}
                          onClick={() => table.onSelectRow(transaction.id.toString())}
                          selected={table.selected.includes(transaction.id.toString())}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={table.selected.includes(transaction.id.toString())}
                              inputProps={{
                                id: `${transaction.id}-checkbox`,
                                'aria-label': `${transaction.nom} ${transaction.prenom} checkbox`,
                              }}
                            />
                          </TableCell>

                          <TableCell>
                            <Box>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontSize: '0.875rem',
                                  fontWeight: 500,
                                  cursor: 'pointer',
                                  '&:hover': {
                                    textDecoration: 'underline'
                                  }
                                }}
                              >
                                {transaction.nom} {transaction.prenom}
                              </Typography>

                            </Box>
                          </TableCell>

                          <TableCell>
                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                              {transaction.email}
                            </Typography>
                          </TableCell>

                          <TableCell align="right">
                            <Typography variant="body2" sx={{ fontSize: '0.875rem', fontWeight: 600 }}>
                              {formatCurrency(transaction.montant)}
                            </Typography>
                          </TableCell>

                          <TableCell align="center">
                            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                              {formatDate(transaction.date)}
                            </Typography>
                          </TableCell>

                          <TableCell align="center">
                            <Tooltip title="Voir les détails">
                              <IconButton
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewDetails(transaction.id);
                                }}
                                sx={{
                                  color: 'primary.main',
                                  '&:hover': {
                                    bgcolor: 'primary.lighter'
                                  }
                                }}
                              >
                                <Iconify icon="eva:eye-fill" width={20} />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}

                    <TableEmptyRows
                      height={table.dense ? 34 : 54}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                    />
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

        {/* Footer */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Grid container spacing={2} alignItems="center" justifyContent="space-between">
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  © 2024 QUORUM ÉVÉNEMENTIEL | Powered by PX_LABS SARL
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={1} justifyContent="flex-end">
                  <Grid>
                    <Button
                      size="small"
                      color="inherit"
                      sx={{ textTransform: 'none' }}
                    >
                      Confidentialité
                    </Button>
                  </Grid>
                  <Grid>
                    <Button
                      size="small"
                      color="inherit"
                      sx={{ textTransform: 'none' }}
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

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: TransactionData[];
  comparator: (a: any, b: any) => number;
  searchTerm: string;
  selectedDateFilter: string;
  selectedActivityFilter: string;
};

function applyFilter({
  inputData,
  comparator,
  searchTerm,
  selectedDateFilter,
  selectedActivityFilter
}: ApplyFilterProps) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  // Filtrage par terme de recherche
  if (searchTerm) {
    inputData = inputData.filter(
      (transaction) =>
        transaction.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Filtrage par activité
  if (selectedActivityFilter) {
    inputData = inputData.filter(
      (transaction) => transaction.activite === selectedActivityFilter
    );
  }

  // Filtrage par date
  if (selectedDateFilter) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    inputData = inputData.filter((transaction) => {
      const transactionDate = new Date(transaction.date);

      switch (selectedDateFilter) {
        case 'today':
          return transactionDate >= today;

        case 'yesterday':
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          return transactionDate >= yesterday && transactionDate < today;

        case 'last7days':
          const last7Days = new Date(today);
          last7Days.setDate(last7Days.getDate() - 7);
          return transactionDate >= last7Days;

        case 'last20days':
          const last20Days = new Date(today);
          last20Days.setDate(last20Days.getDate() - 20);
          return transactionDate >= last20Days;

        case 'thisMonth':
          const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
          return transactionDate >= thisMonthStart;

        case 'lastMonth':
          const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
          return transactionDate >= lastMonthStart && transactionDate <= lastMonthEnd;

        default:
          return true;
      }
    });
  }

  return inputData;
}