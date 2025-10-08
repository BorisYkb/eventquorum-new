// File: src/sections/gestionEnquete/components/EnqueteTable.tsx

'use client'

import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import EnqueteTableRow, { Enquete } from './EnqueteTableRow';
import EnqueteFilters from './EnqueteFilters';

interface EnqueteTableProps {
    enquetes: Enquete[];
    filteredEnquetes: Enquete[];
    searchTerm: string;
    onSearchChange: (value: string) => void;
    statutFilter: string;
    onStatutFilterChange: (value: string) => void;
    activiteFilter: string;
    onActiviteFilterChange: (value: string) => void;
    uniqueStatuts: string[];
    uniqueActivites: string[];
    selected: number[];
    onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSelectOne: (event: React.MouseEvent<unknown>, id: number) => void;
    page: number;
    rowsPerPage: number;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    dense: boolean;
    onDenseChange: (checked: boolean) => void;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (enquete: Enquete) => void;
    onCreateClick: () => void;
}

/**
 * Composant tableau principal pour la liste des enquêtes
 * Inclut les filtres, le tableau et la pagination
 */
const EnqueteTable: React.FC<EnqueteTableProps> = ({
    enquetes,
    filteredEnquetes,
    searchTerm,
    onSearchChange,
    statutFilter,
    onStatutFilterChange,
    activiteFilter,
    onActiviteFilterChange,
    uniqueStatuts,
    uniqueActivites,
    selected,
    onSelectAll,
    onSelectOne,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    dense,
    onDenseChange,
    onView,
    onEdit,
    onDelete,
    onCreateClick
}) => {
    /**
     * Vérifie si une enquête est sélectionnée
     */
    const isSelected = (id: number) => selected.indexOf(id) !== -1;

    return (
        <Card>
            <Box sx={{ p: 3 }}>
                {/* Titre du tableau */}
                <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Liste des Enquêtes ({filteredEnquetes.length})
                </Typography>

                {/* Filtres et recherche */}
                <EnqueteFilters
                    searchTerm={searchTerm}
                    onSearchChange={onSearchChange}
                    statutFilter={statutFilter}
                    onStatutFilterChange={onStatutFilterChange}
                    activiteFilter={activiteFilter}
                    onActiviteFilterChange={onActiviteFilterChange}
                    uniqueStatuts={uniqueStatuts}
                    uniqueActivites={uniqueActivites}
                    onCreateClick={onCreateClick}
                />

                {/* Tableau */}
                <TableContainer>
                    <Table size={dense ? 'small' : 'medium'}>
                        {/* En-tête du tableau */}
                        <TableHead>
                            <TableRow sx={{ '& .MuiTableCell-head': { bgcolor: '#F8F9FA', py: 2 } }}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        color="primary"
                                        indeterminate={selected.length > 0 && selected.length < filteredEnquetes.length}
                                        checked={filteredEnquetes.length > 0 && selected.length === filteredEnquetes.length}
                                        onChange={onSelectAll}
                                    />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                                    Titre d'enquête
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                                    Activité
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                                    Code
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                                    Nombre de participants
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                                    Statut
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 600, color: '#6B7280', fontSize: '14px' }}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        {/* Corps du tableau */}
                        <TableBody>
                            {filteredEnquetes
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((enquete) => (
                                    <EnqueteTableRow
                                        key={enquete.id}
                                        enquete={enquete}
                                        isSelected={isSelected(enquete.id)}
                                        onSelect={onSelectOne}
                                        onView={onView}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Pagination et contrôles */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 2,
                    flexWrap: 'wrap',
                    gap: 2
                }}>
                    {/* Switch Dense */}
                    <FormControlLabel
                        control={
                            <Switch
                                checked={dense}
                                onChange={(e) => onDenseChange(e.target.checked)}
                            />
                        }
                        label="Dense"
                    />

                    {/* Pagination */}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredEnquetes.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={onPageChange}
                        onRowsPerPageChange={onRowsPerPageChange}
                        labelRowsPerPage="Rows per page:"
                    />
                </Box>
            </Box>
        </Card>
    );
};

export default EnqueteTable;