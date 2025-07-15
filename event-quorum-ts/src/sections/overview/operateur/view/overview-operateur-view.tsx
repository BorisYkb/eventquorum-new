'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Alert from '@mui/material/Alert';
import TableSortLabel from '@mui/material/TableSortLabel';

import { DashboardContent } from 'src/layouts/operateur';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

interface ParticipantData {
  id: string;
  nom: string;
  statut: 'émargé' | 'non-émargé';
  date: string;
  type: 'Physique' | 'En ligne' | 'Aucun';
}

interface HeadCell {
  id: keyof ParticipantData;
  label: string;
  numeric: boolean;
  disablePadding: boolean;
  align?: 'left' | 'center' | 'right';
}

const headCells: readonly HeadCell[] = [
  {
    id: 'nom',
    numeric: false,
    disablePadding: false,
    label: 'Nom Prénom',
  },
  {
    id: 'statut',
    numeric: false,
    disablePadding: false,
    label: 'Statut émargement',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Date/Heure',
  },
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
    align: 'center',
  },
];

// Mock data pour les participants
const PARTICIPANTS_DATA: ParticipantData[] = [
  {
    id: '1',
    nom: 'Boudou Kouassi Evelet',
    statut: 'émargé',
    date: '16/07/2024 à 19h51',
    type: 'Physique'
  },
  {
    id: '2',
    nom: 'Boudou Kouassi Evelet',
    statut: 'non-émargé',
    date: '---',
    type: 'Aucun'
  },
  {
    id: '3',
    nom: 'Boudou Kouassi Evelet',
    statut: 'émargé',
    date: '16/07/2024 à 19h51',
    type: 'En ligne'
  },
  {
    id: '4',
    nom: 'Boudou Kouassi Evelet',
    statut: 'émargé',
    date: '16/07/2024 à 19h51',
    type: 'Physique'
  },
  {
    id: '5',
    nom: 'Boudou Kouassi Evelet',
    statut: 'non-émargé',
    date: '---',
    type: 'Aucun'
  },
];

type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// ----------------------------------------------------------------------

export function OverviewOperateurView() {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof ParticipantData>('nom');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [tableData, setTableData] = useState(PARTICIPANTS_DATA);
  const [filterName, setFilterName] = useState('');

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: keyof ParticipantData) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleFilterName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    setPage(0);
  }, []);

  const handleEmarger = useCallback((participantId: string) => {
    setTableData(prev => 
      prev.map(participant => 
        participant.id === participantId 
          ? { 
              ...participant, 
              statut: 'émargé' as const,
              date: new Date().toLocaleDateString('fr-FR') + ' à ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
              type: 'Physique' as const
            }
          : participant
      )
    );
  }, []);

  const handleScanQR = useCallback(() => {
    console.log('Scanner QR code');
  }, []);

  // Filter and sort data
  const filteredData = tableData.filter((participant) =>
    participant.nom.toLowerCase().includes(filterName.toLowerCase())
  );

  const sortedData = filteredData.sort(getComparator(order, orderBy));
  const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  const renderToolbar = () => (
    <Box
      sx={{
        p: 3,
        gap: 2,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6">Liste des participants</Typography>
        <Chip 
          label={`Vous avez émargé ${tableData.filter(p => p.statut === 'émargé').length} participants`}
          color="info" 
          variant="outlined"
          size="small"
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          size="small"
          value={filterName}
          onChange={handleFilterName}
          placeholder="Recherche"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{ width: 200 }}
        />
        
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:camera-fill" />}
          onClick={handleScanQR}
          color="primary"
        >
          Scanner un QRcode
        </Button>
      </Box>
    </Box>
  );

  const renderTableHead = () => (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.id !== 'id' ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={(event) => handleRequestSort(event, headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  const renderTable = () => (
    <Card>
      {renderToolbar()}
      <TableContainer>
        <Scrollbar>
          <Table sx={{ minWidth: 750 }}>
            {renderTableHead()}
            <TableBody>
              {paginatedData.map((row) => (
                <ParticipantTableRow
                  key={row.id}
                  row={row}
                  onEmarger={() => handleEmarger(row.id)}
                />
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );

  return (
    <DashboardContent>
      <Box sx={{ mb: 3 }}>
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Bloc Info Actualités Events:</strong> Informations importantes sur l'événement en cours
          </Typography>
        </Alert>
      </Box>

      {renderTable()}
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

interface ParticipantTableRowProps {
  row: ParticipantData;
  onEmarger: () => void;
}

function ParticipantTableRow({ row, onEmarger }: ParticipantTableRowProps) {
  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'émargé':
        return 'success';
      case 'non-émargé':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Physique':
        return 'primary';
      case 'En ligne':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <TableRow hover tabIndex={-1}>
      <TableCell>{row.nom}</TableCell>
      
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={row.statut}
            color={getStatutColor(row.statut) as any}
            size="small"
          />
          {row.type !== 'Aucun' && (
            <Chip
              label={row.type}
              color={getTypeColor(row.type) as any}
              size="small"
              variant="outlined"
            />
          )}
        </Box>
      </TableCell>
      
      <TableCell>{row.date}</TableCell>
      
      <TableCell align="center">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          {row.statut === 'non-émargé' && (
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={onEmarger}
              sx={{ minWidth: 80 }}
            >
              Émarger
            </Button>
          )}
          
          <Tooltip title="Voir détails">
            <IconButton size="small" color="primary">
              <Iconify icon="eva:eye-fill" />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  );
}