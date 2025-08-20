// File: src/app/organisateur/gestionhabilitations/[id]/components/OperatorPermissionsDisplay.tsx
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
    TextField,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

interface OperatorPermissionsDisplayProps {
    preciserEnregistrements: boolean;
    typeEntree: string;
    admissionActivite: string;
}

/**
 * Composant d'affichage des permissions Opérateur de saisie en lecture seule
 * - Affiche l'état des enregistrements et activités
 */
const OperatorPermissionsDisplay: React.FC<OperatorPermissionsDisplayProps> = ({
    preciserEnregistrements,
    typeEntree,
    admissionActivite
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

    // Vérifier si on doit afficher le bloc Activités
    const showActivitiesBlock = typeEntree === 'Admission à une activité' ||
        typeEntree === 'Admission d\'entrée et à une activité';

    return (
        <>
            {/* Bloc Enregistrements */}
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
                        backgroundColor: theme.palette.info.main,
                        mr: 1
                    }} />
                    Enregistrements
                </Typography>

                <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                    <Table size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ border: 'none', py: 1.5 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        Préciser les enregistrements sur espace Opérateur
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ border: 'none', py: 1.5, width: 120 }} align="right">
                                    {renderPermissionStatus(preciserEnregistrements)}
                                </TableCell>
                            </TableRow>

                            {/* Affichage conditionnel du Type d'entrée */}
                            {preciserEnregistrements && (
                                <TableRow>
                                    <TableCell sx={{ border: 'none', py: 1.5, pl: 4 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#666' }}>
                                            Type d'entrée
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ border: 'none', py: 1.5, width: 200 }} align="right">
                                        <TextField
                                            size="small"
                                            value={typeEntree || 'Non défini'}
                                            InputProps={{ readOnly: true }}
                                            sx={{
                                                minWidth: 180,
                                                '& .MuiInputBase-input': { fontSize: '0.875rem' }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Bloc Activités conditionnel */}
            {showActivitiesBlock && (
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
                            backgroundColor: theme.palette.success.main,
                            mr: 1
                        }} />
                        Activités
                    </Typography>

                    <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell sx={{ border: 'none', py: 1.5 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            Type d'admission
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ border: 'none', py: 1.5, width: 200 }} align="right">
                                        <TextField
                                            size="small"
                                            value={admissionActivite || 'Aucune admission'}
                                            InputProps={{ readOnly: true }}
                                            sx={{
                                                minWidth: 180,
                                                '& .MuiInputBase-input': { fontSize: '0.875rem' }
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </>
    );
};

export default OperatorPermissionsDisplay;