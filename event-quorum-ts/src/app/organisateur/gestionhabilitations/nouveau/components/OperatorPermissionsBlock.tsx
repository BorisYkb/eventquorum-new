// File: src/app/organisateur/gestionhabilitations/nouveau/components/OperatorPermissionsBlock.tsx
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
    FormControl,
    Select,
    MenuItem,
    Collapse,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface OperatorPermissionsBlockProps {
    preciserEnregistrements: boolean;
    typeEntree: string;
    admissionActivite: string;
    onPermissionChange: (permission: string) => (value: boolean | string) => void;
}

/**
 * Composant des permissions spécifiques au rôle Opérateur de saisie
 * - Préciser les enregistrements sur espace Opérateur (switch)
 * - Type d'entrée (select conditionnel)
 * - Bloc Activités (conditionnel selon type d'entrée)
 */
const OperatorPermissionsBlock: React.FC<OperatorPermissionsBlockProps> = ({
    preciserEnregistrements,
    typeEntree,
    admissionActivite,
    onPermissionChange
}) => {
    const theme = useTheme();

    const typeEntreeOptions = [
        { value: '', label: 'Type d\'entrée' },
        { value: 'Admission d\'entrée', label: 'Admission d\'entrée' },
        { value: 'Admission à une activité', label: 'Admission à une activité' },
        { value: 'Admission d\'entrée et à une activité', label: 'Admission d\'entrée et à une activité' }
    ];

    const admissionActiviteOptions = [
        { value: '', label: 'Aucune admission' },
        { value: 'Admission à une activité', label: 'Admission à une activité' },
        { value: 'Admission/Gestion d\'une activité', label: 'Admission/Gestion d\'une activité' }
    ];

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
                                <TableCell sx={{ border: 'none', py: 1.5, width: 150 }} align="right">
                                    <Switch
                                        checked={preciserEnregistrements}
                                        onChange={(e) => onPermissionChange('preciserEnregistrements')(e.target.checked)}
                                        size="small"
                                        color="primary"
                                    />
                                </TableCell>
                            </TableRow>

                            {/* Select conditionnel pour Type d'entrée */}
                            <Collapse in={preciserEnregistrements}>
                                <TableRow>
                                    <TableCell sx={{ border: 'none', py: 1.5, pl: 4 }}>
                                        <Typography variant="body2" sx={{ fontWeight: 500, color: '#666' }}>
                                            Type d'entrée
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ border: 'none', py: 1.5, width: 200 }} align="right">
                                        <FormControl size="small" sx={{ minWidth: 180 }} fullWidth>
                                            <Select
                                                value={typeEntree}
                                                onChange={(e) => onPermissionChange('typeEntree')(e.target.value)}
                                                displayEmpty
                                            >
                                                {typeEntreeOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            </Collapse>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Bloc Activités conditionnel */}
            <Collapse in={showActivitiesBlock}>
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
                                        <FormControl size="small" sx={{ minWidth: 180 }}>
                                            <Select
                                                value={admissionActivite}
                                                onChange={(e) => onPermissionChange('admissionActivite')(e.target.value)}
                                                displayEmpty
                                            >
                                                {admissionActiviteOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Collapse>
        </>
    );
};

export default OperatorPermissionsBlock;