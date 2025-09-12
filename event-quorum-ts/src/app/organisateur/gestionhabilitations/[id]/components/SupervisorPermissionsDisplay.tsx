// File: src/app/organisateur/gestionhabilitations/[id]/components/SupervisorPermissionsDisplay.tsx
'use client';

import React from 'react';
import {
    Box,
    Typography,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Chip,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface SupervisorPermissionsDisplayProps {
    autoriserExport: boolean;
}

/**
 * Composant d'affichage des permissions Superviseur en lecture seule
 * - Affiche l'état de l'autorisation d'export des données
 */
const SupervisorPermissionsDisplay: React.FC<SupervisorPermissionsDisplayProps> = ({
    autoriserExport
}) => {
    const theme = useTheme();

    const renderPermissionStatus = (value: boolean) => {
        return value ? (
            <Chip
                icon={<CheckCircle sx={{ fontSize: '16px !important' }} />}
                label="Activé"
                color="success"
                size="small"
                variant="filled"
            />
        ) : (
            <Chip
                icon={<Cancel sx={{ fontSize: '16px !important' }} />}
                label="Désactivé"
                color="default"
                size="small"
                variant="outlined"
            />
        );
    };

    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{
                fontWeight: 600,
                mb: 2,
                color: '#374151',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Box sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.secondary.main,
                    mr: 1
                }} />
                Export des données
            </Typography>

            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                <Table size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ border: 'none', py: 1.5 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    Autoriser l'export des données
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ border: 'none', py: 1.5, width: 120 }} align="right">
                                {renderPermissionStatus(autoriserExport)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SupervisorPermissionsDisplay;