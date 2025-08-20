// File: src/app/organisateur/gestionhabilitations/nouveau/components/SupervisorPermissionsBlock.tsx
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
    Switch,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface SupervisorPermissionsBlockProps {
    autoriserExport: boolean;
    onPermissionChange: (permission: string) => (value: boolean | string) => void;
}

/**
 * Composant des permissions spécifiques au rôle Superviseur
 * - Autoriser l'export des données
 */
const SupervisorPermissionsBlock: React.FC<SupervisorPermissionsBlockProps> = ({
    autoriserExport,
    onPermissionChange
}) => {
    const theme = useTheme();

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
                            <TableCell sx={{ border: 'none', py: 1.5, width: 100 }} align="right">
                                <Switch
                                    checked={autoriserExport}
                                    onChange={(e) => onPermissionChange('autoriserExport')(e.target.checked)}
                                    size="small"
                                    color="primary"
                                />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SupervisorPermissionsBlock;