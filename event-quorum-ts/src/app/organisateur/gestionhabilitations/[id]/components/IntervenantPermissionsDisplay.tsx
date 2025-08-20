// File: src/app/organisateur/gestionhabilitations/[id]/components/IntervenantPermissionsDisplay.tsx
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

interface IntervenantPermissionsDisplayProps {
    consulterTelEmail: boolean;
    repondreQuestions: boolean;
}

/**
 * Composant d'affichage des permissions Intervenant en lecture seule
 * - Affiche l'état des permissions participants
 */
const IntervenantPermissionsDisplay: React.FC<IntervenantPermissionsDisplayProps> = ({
    consulterTelEmail,
    repondreQuestions
}) => {
    const theme = useTheme();

    const intervenantPermissions = [
        {
            key: 'consulterTelEmail',
            label: 'Consulter Tel & Email des participants',
            value: consulterTelEmail
        },
        {
            key: 'repondreQuestions',
            label: 'Répondre aux questions des participants',
            value: repondreQuestions
        }
    ];

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
                    backgroundColor: theme.palette.warning.main,
                    mr: 1
                }} />
                Participants
            </Typography>

            <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                <Table size="small">
                    <TableBody>
                        {intervenantPermissions.map((permission) => (
                            <TableRow key={permission.key}>
                                <TableCell sx={{ border: 'none', py: 1.5 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {permission.label}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: 'none', py: 1.5, width: 120 }} align="right">
                                    {renderPermissionStatus(permission.value)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default IntervenantPermissionsDisplay;