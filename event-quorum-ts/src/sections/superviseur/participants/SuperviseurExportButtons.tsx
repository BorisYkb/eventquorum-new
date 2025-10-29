// src/sections/superviseur/participants/SuperviseurExportButtons.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
    Button,
    Stack,
    Menu,
    MenuItem,
    Tooltip,
} from '@mui/material';

import type { ActiveFilters } from './types';
import { stack } from 'src/theme/core/components/stack';

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

    const router = useRouter();
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

    /**
 * Redirige vers la page de consultation des connectés
 */
    const handleConsultConnected = () => {
        router.push('/superviseur/participants/consultation');
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

            {/* Bouton Consulter connectés */}
            <Tooltip title="Consulter la liste des connectés" arrow>
                <Button
                    variant="contained"
                    onClick={handleConsultConnected}
                    sx={{
                        bgcolor: '#000',
                        color: 'white',
                        '&:hover': { bgcolor: '#333' },
                        borderRadius: 1,
                        textTransform: 'none',
                        fontWeight: 600,
                    }}
                >
                    Consulter la liste des connectés
                </Button>
            </Tooltip>
        </Stack>

    );
};

export default SuperviseurExportButtons;