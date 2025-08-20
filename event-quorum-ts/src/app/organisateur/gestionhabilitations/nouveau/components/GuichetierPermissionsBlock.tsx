// File: src/app/organisateur/gestionhabilitations/nouveau/components/GuichetierPermissionsBlock.tsx
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

interface GuichetierPermissionsBlockProps {
    ajouterParticipants: boolean;
    onPermissionChange: (permission: string) => (value: boolean | string) => void;
}

/**
 * Composant des permissions spécifiques au rôle Guichetier
 * - Ajouter des participants depuis l'espace guichet
 */
const GuichetierPermissionsBlock: React.FC<GuichetierPermissionsBlockProps> = ({
    ajouterParticipants,
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
                    backgroundColor: theme.palette.error.main,
                    mr: 1
                }} />
                Participants
            </Typography>

            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                <Table size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ border: 'none', py: 1.5 }}>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    Ajouter des participants depuis l'espace guichet
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ border: 'none', py: 1.5, width: 150 }} align="right">
                                <Switch
                                    checked={ajouterParticipants}
                                    onChange={(e) => onPermissionChange('ajouterParticipants')(e.target.checked)}
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

export default GuichetierPermissionsBlock;