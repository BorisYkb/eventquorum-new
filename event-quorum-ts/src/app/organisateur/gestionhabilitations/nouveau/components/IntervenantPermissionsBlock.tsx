// File: src/app/organisateur/gestionhabilitations/nouveau/components/IntervenantPermissionsBlock.tsx

'use client';

import React from 'react';
import { useState, useCallback } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import { useTheme } from '@mui/material/styles';
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

import { Upload } from 'src/components/upload';

interface IntervenantPermissionsBlockProps {
    consulterTelEmail: boolean;
    repondreQuestions: boolean;
    onPermissionChange: (permission: string) => (value: boolean | string) => void;
}

/**
 * Composant des permissions spécifiques au rôle Intervenant
 * - Consulter Tel & Email des participants
 * - Répondre aux questions des participants
 */
const IntervenantPermissionsBlock: React.FC<IntervenantPermissionsBlockProps> = ({
    consulterTelEmail,
    repondreQuestions,
    onPermissionChange
}) => {
    const theme = useTheme();

    const [files, setFiles] = useState<(File | string)[]>([]);
    const [showPreview, setShowPreview] = React.useState(true);

    const handleDropMultiFile = (acceptedFiles: File[]) => {
        setFiles([...files, ...acceptedFiles]);
    };
    const handleRemoveFile = (inputFile: File | string) => {
        const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
        setFiles(filesFiltered);
    }
    const handleRemoveAllFiles = () => {
      setFiles([]);
    };

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



    return (
        <>
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
                                    <TableCell sx={{ border: 'none', py: 1.5, width: 150 }} align="right">
                                        <Switch
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

            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: '#474751',
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
                    Images des intervenants
                </Typography>
                <Upload
                  multiple
                  thumbnail={showPreview.value}
                  value={files}
                  onDrop={handleDropMultiFile}
                  onRemove={handleRemoveFile}
                  onRemoveAll={handleRemoveAllFiles}
                  onUpload={() => console.info('ON UPLOAD')}
                />
            </Box>
        </>
    );
};

export default IntervenantPermissionsBlock;