// src/app/participant/enligne/payer/activites/components/factures-list.tsx

'use client';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { useTheme, useMediaQuery } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import type { Facture } from './data-facture';

interface FacturesListProps {
    factures: Facture[];
}

export function FacturesList({ factures }: FacturesListProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage] = useState(5);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleDownloadReceipt = (factureId: string) => {
        console.log('Téléchargement du reçu:', factureId);
        // Implémenter la logique de téléchargement
    };

    const getResponsiveFontSizes = () => {
        if (isMobile) {
            return {
                tableHeader: { fontSize: '0.75rem', fontWeight: 600 },
                body2: { fontSize: '0.9rem', fontWeight: 400 },
                chip: { fontSize: '0.625rem' },
                iconSize: 20,
            };
        }

        if (isTablet) {
            return {
                tableHeader: { fontSize: '0.8125rem', fontWeight: 600 },
                body2: { fontSize: '1rem', fontWeight: 400 },
                chip: { fontSize: '0.6875rem' },
                iconSize: 22,
            };
        }

        return {
            tableHeader: { fontSize: '0.875rem', fontWeight: 600 },
            body2: { fontSize: '1rem', fontWeight: 400 },
            chip: { fontSize: '0.75rem' },
            iconSize: 24,
        };
    };

    const fontSizes = getResponsiveFontSizes();

    const getTypeIcon = (type: Facture['type']) => {
        switch (type) {
            case 'Orange Money':
                return 'mdi:cellphone';
            case 'MTN Money':
                return 'mdi:cellphone';
            case 'Wave':
                return 'mdi:cellphone';
            case 'Guichet':
                return 'mdi:storefront';
            default:
                return 'mdi:cash';
        }
    };

    const getTypeColor = (type: Facture['type']) => {
        switch (type) {
            case 'Orange Money':
                return 'warning';
            case 'MTN Money':
                return 'info';
            case 'Wave':
                return 'secondary';
            case 'Guichet':
                return 'default';
            default:
                return 'default';
        }
    };

    const paginatedFactures = factures.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    if (factures.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{
                        fontSize: isMobile ? '1rem' : isTablet ? '1.125rem' : '1.25rem',
                        fontWeight: 600,
                    }}
                >
                    Aucune facture disponible
                </Typography>
                <Typography
                    variant="body2"
                    color="text.disabled"
                    sx={{
                        mt: 1,
                        fontSize: isMobile ? '0.75rem' : isTablet ? '0.8125rem' : '0.875rem',
                    }}
                >
                    Les factures apparaîtront ici après vos paiements
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <TableContainer
                sx={{
                    boxShadow: 2,
                    borderRadius: 1,
                    overflowX: 'auto',
                }}
            >
                <Table sx={{ minWidth: isMobile ? 600 : 'auto' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={fontSizes.tableHeader}>Type de paiement</TableCell>
                            <TableCell sx={fontSizes.tableHeader}>Montant (FCFA)</TableCell>
                            <TableCell sx={fontSizes.tableHeader}>Date</TableCell>
                            <TableCell sx={{ ...fontSizes.tableHeader, textAlign: 'center' }}>
                                Reçu
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedFactures.map((facture) => (
                            <TableRow key={facture.id} hover>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            ...fontSizes.body2,
                                            fontWeight: 500,
                                        }}
                                    >
                                        {facture.type}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            ...fontSizes.body2,
                                            fontWeight: 600,
                                            color: 'success.main',
                                        }}
                                    >
                                        {facture.montant.toLocaleString()}
                                    </Typography>
                                </TableCell>

                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={fontSizes.body2}
                                    >
                                        {new Date(facture.date).toLocaleDateString('fr-FR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </Typography>
                                </TableCell>

                                <TableCell sx={{ textAlign: 'center' }}>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleDownloadReceipt(facture.id)}
                                        sx={{
                                            color: 'primary.main',
                                            '&:hover': {
                                                bgcolor: 'primary.lighter',
                                            },
                                        }}
                                    >
                                        <Iconify icon="eva:download-outline" width={fontSizes.iconSize} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={factures.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5]}
                labelDisplayedRows={({ from, to, count }) =>
                    `${from}-${to} sur ${count}`
                }
                sx={{
                    borderTop: 1,
                    borderColor: 'divider',
                    '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                        fontSize: fontSizes.body2.fontSize,
                    },
                }}
            />
        </Box>
    );
}