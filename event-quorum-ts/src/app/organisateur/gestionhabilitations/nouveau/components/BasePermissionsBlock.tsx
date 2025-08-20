// File: src/app/organisateur/gestionhabilitations/nouveau/components/BasePermissionsBlock.tsx
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
    Checkbox,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Import du type CreateAccessForm
interface CreateAccessForm {
    permissions: {
        lecture: boolean;
        ecriture: boolean;
        modification: boolean;
        autoriserExport: boolean;
        preciserEnregistrements: boolean;
        typeEntree: string;
        admissionActivite: string;
        consulterTelEmail: boolean;
        repondreQuestions: boolean;
        ajouterParticipants: boolean;
    };
}

interface BasePermissionsBlockProps {
    lecture: boolean;
    ecriture: boolean;
    modification: boolean;
    onPermissionChange: (permission: keyof CreateAccessForm['permissions']) => (value: boolean | string) => void;
}

/**
 * Composant des permissions de base disponibles pour tous les rôles
 * Lecture, Écriture, Modification
 */
const BasePermissionsBlock: React.FC<BasePermissionsBlockProps> = ({
    lecture,
    ecriture,
    modification,
    onPermissionChange
}) => {
    const theme = useTheme();

    const basePermissions: { key: keyof CreateAccessForm['permissions']; label: string; value: boolean }[] = [
        { key: 'lecture', label: 'Lecture', value: lecture },
        { key: 'ecriture', label: 'Écriture', value: ecriture },
        { key: 'modification', label: 'Modification', value: modification },
    ];

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
                    backgroundColor: theme.palette.primary.main,
                    mr: 1
                }} />
                Permissions de base
            </Typography>

            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                <Table size="small">
                    <TableBody>
                        {basePermissions.map((permission) => (
                            <TableRow key={permission.key}>
                                <TableCell sx={{ border: 'none', py: 1.5 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {permission.label}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: 'none', py: 1.5, width: 150 }} align="right">
                                    <Checkbox
                                        checked={permission.value}
                                        onChange={(e) => onPermissionChange(permission.key)(e.target.checked)}
                                        size="small"
                                        color="primary"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default BasePermissionsBlock;