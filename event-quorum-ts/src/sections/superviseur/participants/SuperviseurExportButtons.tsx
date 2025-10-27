// src/sections/superviseur/participants/SuperviseurExportButtons.tsx

'use client';

import { useState } from 'react';

import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
    Button,
    Stack,
    Menu,
    MenuItem,
} from '@mui/material';

import type { ActiveFilters } from './types';

/**
 * Options d'export
 */
const EXPORT_OPTIONS = [
    { value: 'pdf', label: 'Exporter en PDF' },
    { value: 'excel', label: 'Exporter en Excel' },
];

/**
 * Props du composant SuperviseurExportButtons
 */
interface SuperviseurExportButtonsProps {
    /** Filtres actuellement actifs */
    activeFilters?: ActiveFilters;
}

/**
 * Composant SuperviseurExportButtons
 * Bouton d'export pour le superviseur (lecture seule)
 */
const SuperviseurExportButtons: React.FC<SuperviseurExportButtonsProps> = ({
    activeFilters = {
        activityFilter: '',
        firstConnectionFilter: '',
        connectionTypeFilter: '',
        emargementFilter: '',
        checkingFilter: '',
    }
}) => {
    // État pour le menu déroulant d'export
    const [exportMenuAnchor, setExportMenuAnchor] = useState<null | HTMLElement>(null);

    /**
     * Ouvre le menu d'export
     */
    const handleExportMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setExportMenuAnchor(event.currentTarget);
    };

    /**
     * Ferme le menu d'export
     */
    const handleExportMenuClose = () => {
        setExportMenuAnchor(null);
    };

    /**
     * Gère l'export selon le format sélectionné
     */
    const handleExport = (format: string) => {
        console.log('Export superviseur:', {
            format,
            filters: activeFilters,
        });

        // TODO: Implémenter l'appel API pour l'export
        handleExportMenuClose();
    };

    return (
        <Stack direction="row" spacing={2}>
            {/* Bouton Exporter */}
            <Button
                variant="contained"
                onClick={handleExportMenuOpen}
                endIcon={<ExpandMoreIcon />}
                sx={{
                    bgcolor: '#000',
                    color: 'white',
                    '&:hover': { bgcolor: '#333' },
                    borderRadius: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                }}
            >
                Exporter
            </Button>

            <Menu
                anchorEl={exportMenuAnchor}
                open={Boolean(exportMenuAnchor)}
                onClose={handleExportMenuClose}
                transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
                {EXPORT_OPTIONS.map((option) => (
                    <MenuItem
                        key={option.value}
                        onClick={() => handleExport(option.value)}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </Stack>
    );
};

export default SuperviseurExportButtons;