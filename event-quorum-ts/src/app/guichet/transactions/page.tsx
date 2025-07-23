'use client';

import React, { useState, useEffect } from 'react';
import type { TableHeadCellProps } from 'src/components/table';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';

import { DashboardContent } from 'src/layouts/guichet';
import { useMockedUser } from 'src/auth/hooks';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import  {GuichetWidgetSummary}  from 'src/sections/overview/e-commerce/guichet/guichet-widget-summary-2';
import TransactionDetailModal from '../component/TransactionDetailModal';
import {
  useTable,
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

// ----------------------------------------------------------------------

type TransactionData = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  montant: number;
  date: string;
  statut : string;
  activite: string;
  activites?: {
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
    statut: 'Validé',
    activite: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE'
  },
  {
    id: 2,
    nom: 'Kouame',
    prenom: 'Jean',
    email: 'kouame@gmail.com',
    montant: 25000,
    date: '2024-07-16',
    statut: 'Validé',
    activite: 'PANEL DE HAUT NIVEAU'
  },
  {
    id: 3,
    nom: 'Sidibe',
    prenom: 'Moussa',
    email: 'sidibemoussa@gmail.com',
    montant: 75000,
    date: '2024-07-15',
    statut: 'En attente',
    activite: 'POINT DE PRESSE'
  },
  {
    id: 4,
    nom: 'GRA-BI',
    prenom: 'Amira',
    email: 'grabianira@gmail.com',
    montant: 30000,
    date: '2024-07-14',
    statut: 'Validé',
    activite: 'PANEL DE HAUT NIVEAU'
  },
  {
    id: 5,
    nom: 'Traore',
    prenom: 'Fatou',
    email: 'fatou.traore@gmail.com',
    montant: 45000,
    date: '2024-07-10',
    statut: 'Validé',
    activite: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE'
  },
  {
    id: 6,
    nom: 'Diallo',
    prenom: 'Mamadou',
    email: 'mamadou.diallo@gmail.com',
    montant: 60000,
    date: '2024-06-28',
    statut: 'Validé',
    activite: 'COOLING BREAK'
  },
  {
    id: 7,
    nom: 'Kone',
    prenom: 'Aissata',
    email: 'aissata.kone@gmail.com',
    montant: 35000,
    date: '2024-06-25',
    statut: 'Refusé',
    activite: 'PAUSE CAFE'
  },
  {
    id: 8,
    nom: 'Ouattara',
    prenom: 'Ibrahim',
    email: 'ibrahim.ouattara@gmail.com',
    montant: 80000,
    date: '2024-07-17',
    statut: 'Validé',
    activite: 'PANEL DE HAUT NIVEAU'
  }
];


// ----------------------------------------------------------------------

export default function TransactionsPage() {
  const { user } = useMockedUser();
  const theme = useTheme();
  const table = useTable({ defaultOrderBy: 'date', defaultOrder: 'desc' });

  const [tableData, setTableData] = useState<TransactionData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateFilter, setSelectedDateFilter] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TransactionData | null>(null);

  useEffect(() => {
    setTableData(MOCK_TRANSACTIONS);
  }, []);

  // Filtrage des transactions
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    searchTerm,
    selectedDateFilter,
  });

  // Calcul des statistiques
  const stats = calculateStats(dataFiltered);



  const handleViewDetails = (transactionId: number) => {
    const transaction = tableData.find(t => t.id === transactionId);
    if (transaction) {
      setSelectedTransaction(transaction);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTransaction(null);
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


  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'Validé':
        return 'success';
      case 'En attente':
        return 'warning';
      case 'Refusé':
        return 'error';
      default:
        return 'default';
    }
  };

  // Couleurs alternées pour les widgets
  const getWidgetColor = (index: number): 'primary' | 'secondary' | 'success' | 'warning' => {
    const colors: Array<'primary' | 'secondary' | 'success' | 'warning'> = ['primary', 'secondary', 'success', 'warning'];
    return colors[index % colors.length];
  };

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        {/* Cards de statistiques avec SuperviseurWidgetSummary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <GuichetWidgetSummary
            title="Nombre de transactions"
            total={stats.totalTransactions}
            color={getWidgetColor(0)}
            sx={{ height: 180 }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <GuichetWidgetSummary
            title="Montant collecté (FCFA)"
            total={formatCurrency(stats.totalAmount)}
            color={getWidgetColor(1)}
            sx={{ height: 180 }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <GuichetWidgetSummary
            title="Participations traitées"
            total={stats.processedParticipations}
            color={getWidgetColor(2)}
            sx={{ height: 180 }}
          />
        </Grid>

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
                <Grid size={{ xs: 12, md: 3 }}>
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
                                  color: '#2563eb',
                                  fontWeight: 500,
                                  cursor: 'pointer',
                                  '&:hover': {
                                    textDecoration: 'underline'
                                  }
                                }}
                              >
                                {transaction.nom} {transaction.prenom}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {transaction.activite}
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
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                {formatDate(transaction.date)}
                              </Typography>

                              <Chip
                                size="small"
                                label={transaction.statut}
                                color={getStatusColor(transaction.statut)}
                                sx={{ minWidth: 80, fontSize: '0.75rem' }}
                              />
                            </Box>
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

      {/* Modal de détails de transaction */}
      <TransactionDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
      />

    </DashboardContent>


  );
}

// ----------------------------------------------------------------------

type ApplyFilterProps = {
  inputData: TransactionData[];
  comparator: (a: any, b: any) => number;
  searchTerm: string;
  selectedDateFilter: string;
};

function applyFilter({ inputData, comparator, searchTerm, selectedDateFilter }: ApplyFilterProps) {
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

// Fonction pour calculer les statistiques
function calculateStats(transactions: TransactionData[]) {
  const totalTransactions = transactions.length;
  const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.montant, 0);
  const processedParticipations = transactions.filter(t => t.statut === 'Validé').length;

  return {
    totalTransactions,
    totalAmount,
    processedParticipations
  };
}
