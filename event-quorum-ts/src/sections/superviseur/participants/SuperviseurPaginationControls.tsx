// src/sections/superviseur/participants/SuperviseurPaginationControls.tsx

'use client';

import {
    Stack,
    Typography,
    FormControl,
    Select,
    MenuItem,
    Pagination,
} from '@mui/material';

/**
 * Props du composant SuperviseurPaginationControls
 */
type SuperviseurPaginationControlsProps = {
    page: number;
    totalPages: number;
    rowsPerPage: number;
    onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
    onRowsPerPageChange: (event: any) => void;
    totalItems: number;
};

/**
 * Composant SuperviseurPaginationControls
 * Contrôles de pagination pour le superviseur
 */
const SuperviseurPaginationControls = ({
    page,
    totalPages,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    totalItems
}: SuperviseurPaginationControlsProps) => (
    <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
        sx={{ mt: 3 }}
    >
        <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2" color="text.secondary">
                Afficher par page:
            </Typography>
            <FormControl size="small">
                <Select
                    value={rowsPerPage}
                    onChange={onRowsPerPageChange}
                    sx={{ minWidth: 80 }}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
            </FormControl>
            <Typography variant="body2" color="text.secondary">
                Total: {totalItems} invités
            </Typography>
        </Stack>

        <Pagination
            count={totalPages}
            page={page}
            onChange={onPageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
        />
    </Stack>
);

export default SuperviseurPaginationControls;