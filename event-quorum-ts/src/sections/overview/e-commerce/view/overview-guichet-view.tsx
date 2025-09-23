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

import { DashboardContent } from 'src/layouts/guichet';
import { MotivationIllustration } from 'src/assets/illustrations';

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

import { EcommerceWelcome } from '../ecommerce-welcome';
import { shadows } from '../../../../theme/core/shadows';
import AddParticipantForm from '../../../../app/guichet/component/add-participant-form';

// ----------------------------------------------------------------------

type ParticipantData = {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  inscrit: number[];
  statut: string;
};

// Configuration des en-têtes du tableau
const TABLE_HEAD: TableHeadCellProps[] = [
  { id: 'nom', label: 'Nom_Prenom', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'telephone', label: 'Numero Tel', align: 'left' },
  { id: 'actions', label: 'Action', align: 'center' },
];

// Mock data pour les activités
const MOCK_ACTIVITIES = [
    {
        id: 1,
        code: '09H00 - 09H00',
        name: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
        type: 'Atelier',
        title: 'Formation',
        status: 'Non démarré'
    },
    {
        id: 2,
        code: '09H00 - 09H00',
        name: 'POINT DE PRESSE',
        type: 'Salon',
        title: 'Innovations',
        status: 'Terminé'
    },
    {
        id: 3,
        code: '11H00 - 12H00',
        name: 'PANEL DE HAUT NIVEAU',
        type: 'Conférence',
        title: 'Diversité',
        status: 'En cours'
    },
    {
        id: 4,
        code: '12H00 - 13H00',
        name: 'PAUSE CAFE',
        type: 'Festival',
        title: 'Planète Verte',
        status: 'Non démarré'
    },
    {
        id: 5,
        code: '13H00 - 14H00',
        name: 'COOLING BREAK',
        type: 'Pause',
        title: 'Détente',
        status: 'Non démarré'
    },
];

// Mock data pour les participants
const MOCK_PARTICIPANTS: ParticipantData[] = [
    {
        id: 1,
        nom: 'Boudou',
        prenom: 'Khoudou',
        email: 'boudou@gmail.com',
        telephone: '0102030405',
        inscrit: [1, 2],
        statut: 'Inscrit'
    },
    {
        id: 2,
        nom: 'Kouame',
        prenom: 'Jean',
        email: 'kouame@gmail.com',
        telephone: '0706080945',
        inscrit: [1],
        statut: 'Inscrit'
    },
    {
        id: 3,
        nom: 'Sidibe',
        prenom: 'Moussa',
        email: 'sidibemoussa@gmail.com',
        telephone: '0544023467',
        inscrit: [3, 4],
        statut: 'Inscrit'
    },
    {
        id: 4,
        nom: 'GRA-BI',
        prenom: 'Amira',
        email: 'grabianira@gmail.com',
        telephone: '0701459358',
        inscrit: [2, 3],
        statut: 'Inscrit'
    },
    {
        id: 5,
        nom: 'Traore',
        prenom: 'Fatou',
        email: 'fatou.traore@gmail.com',
        telephone: '0607080910',
        inscrit: [1, 4],
        statut: 'Inscrit'
    }
];

// ----------------------------------------------------------------------

export function OverviewGuichetView() {
    const { user } = useMockedUser();
    const theme = useTheme();
    const table = useTable({ defaultOrderBy: 'nom' });

    const [tableData, setTableData] = useState<ParticipantData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedActivity, setSelectedActivity] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);

    const handleBackToList = () => {
        setShowAddForm(false);

    };


    useEffect(() => {
        setTableData(MOCK_PARTICIPANTS);
    }, []);

    // Filtrage des participants
    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(table.order, table.orderBy),
        searchTerm,
        selectedActivity,
    });

    const handleAddParticipant = () => {
        setShowAddForm(true);
    };

    const handleExportParticipants = () => {
        console.log('Exporter la liste des participants');
    };

    const handleUpdateParticipant = (participantId: number) => {
        console.log('Mettre à jour participant:', participantId);
    };

    // Si on affiche le formulaire d'ajout, retourner ce composant
    if (showAddForm) {
        return <AddParticipantForm onBackToList={handleBackToList} />;
    }

    return (
        <DashboardContent maxWidth="xl">
            <Grid container spacing={3}>
                {/* Section de bienvenue */}
                <Grid size={{ xs: 12 }}>
                    <EcommerceWelcome
                        title={`Bienvenue 🎉, ${user?.displayName?.split(' ')[0] || 'guichet'} !`}
                        description="Gérez facilement la liste des participants aux différentes activités."
                        img={<MotivationIllustration hideBackground />}
                    />
                </Grid>

                {/* Section principale - Liste des participants */}
                <Grid size={{ xs: 12 }}>
                    <Card>
                        {/* En-tête avec titre et filtres */}
                        <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                LISTE DES PARTICIPANTS
                            </Typography>

                            <Tooltip title="Filtrer la liste">
                                <IconButton>
                                    <Iconify icon="ic:round-filter-list" />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        {/* Barre d'outils */}
                        <Box sx={{ px: 3, pb: 3 }}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid size={{ xs: 12, md: 3 }}>
                                    <FormControl size="small" fullWidth>
                                        <Select
                                            value={selectedActivity}
                                            onChange={(e) => setSelectedActivity(e.target.value)}
                                            displayEmpty
                                            sx={{
                                                bgcolor: 'white',
                                                '& .MuiSelect-select': {
                                                    color: selectedActivity ? 'text.primary' : 'grey.500'
                                                }
                                            }}
                                        >
                                            <MenuItem value="">Toutes les activités</MenuItem>
                                            {MOCK_ACTIVITIES.map((activity) => (
                                                <MenuItem key={activity.id} value={activity.id.toString()}>
                                                    {activity.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12, md: 4 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        placeholder="Rechercher par nom, email ou téléphone..."
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

                                <Grid size={{ xs: 12, md: 5 }}>
                                    <Grid container spacing={1} justifyContent="flex-end">
                                        <Grid>
                                          <Tooltip title="Exporter la liste des participants" placement="top" arrow>
                                            <Button
                                                variant="outlined"
                                                startIcon={<Iconify icon="eva:download-fill" />}
                                                size="small"
                                                onClick={handleExportParticipants}
                                                sx={{
                                                    textTransform: 'none',
                                                    borderColor: 'grey.300',
                                                    color: 'white',
                                                    bgcolor: 'black',
                                                    '&:hover': {
                                                        borderColor: 'grey.400',
                                                        bgcolor: 'black',
                                                        boxShadow: 'shadows[1]'
                                                    }
                                                }}
                                            >
                                                Exporter
                                            </Button>
                                          </Tooltip>

                                        </Grid>
                                        <Grid>
                                          <Tooltip title="Ajouter un participant" arrow>
                                              <Button
                                                variant="outlined"
                                                startIcon={<Iconify icon="eva:plus-fill" />}
                                                size="small"
                                                onClick={handleAddParticipant}
                                                sx={{
                                                    textTransform: 'none',
                                                    borderColor: 'grey.300',
                                                    color: 'grey.700',
                                                    bgcolor: 'white',
                                                    '&:hover': {
                                                        borderColor: 'grey.400',
                                                        bgcolor: 'grey.50'
                                                    }
                                                }}
                                              >
                                                Ajouter
                                              </Button>
                                          </Tooltip>

                                        </Grid>
                                    </Grid>
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
                            <Scrollbar sx={{ minHeight: 332 }}>
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
                                            .map((participant) => (
                                                <TableRow
                                                    hover
                                                    key={participant.id}
                                                    onClick={() => table.onSelectRow(participant.id.toString())}
                                                    selected={table.selected.includes(participant.id.toString())}
                                                >
                                                    <TableCell padding="checkbox">
                                                        <Checkbox
                                                            checked={table.selected.includes(participant.id.toString())}
                                                            inputProps={{
                                                                id: `${participant.id}-checkbox`,
                                                                'aria-label': `${participant.nom} ${participant.prenom} checkbox`,
                                                            }}
                                                        />
                                                    </TableCell>

                                                    <TableCell>
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
                                                            {participant.nom} {participant.prenom}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell>
                                                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                                            {participant.email}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell>
                                                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                                                            {participant.telephone}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell align="center">
                                                        <Button
                                                          size="small"
                                                          onClick={(e) => {
                                                              e.stopPropagation();
                                                              handleUpdateParticipant(participant.id);
                                                          }}
                                                          sx={{ color: 'white', bgcolor: 'black', '&:hover': { bgcolor: 'black', boxShadow: 'box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);', padding: '4px' } }}
                                                          >
                                                            Mettre à jour
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}

                                        <TableEmptyRows
                                            height={table.dense ? 34 : 34 + 20}
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
    inputData: ParticipantData[];
    comparator: (a: any, b: any) => number;
    searchTerm: string;
    selectedActivity: string;
};

function applyFilter({ inputData, comparator, searchTerm, selectedActivity }: ApplyFilterProps) {
    const stabilizedThis = inputData.map((el, index) => [el, index] as const);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    inputData = stabilizedThis.map((el) => el[0]);

    if (searchTerm) {
        inputData = inputData.filter(
            (participant) =>
                participant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                participant.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                participant.telephone.includes(searchTerm)
        );
    }

    if (selectedActivity) {
        inputData = inputData.filter((participant) =>
            participant.inscrit.includes(parseInt(selectedActivity))
        );
    }

    return inputData;
}
