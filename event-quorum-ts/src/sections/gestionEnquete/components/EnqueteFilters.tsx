// File: src/sections/gestionEnquete/components/EnqueteFilters.tsx

'use client'

import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Tooltip from '@mui/material/Tooltip';
import { Iconify } from 'src/components/iconify';

interface EnqueteFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    statutFilter: string;
    onStatutFilterChange: (value: string) => void;
    activiteFilter: string;
    onActiviteFilterChange: (value: string) => void;
    uniqueStatuts: string[];
    uniqueActivites: string[];
    onCreateClick: () => void;
}

/**
 * Composant de filtres et recherche pour le tableau des enquêtes
 * Gère la recherche par texte, le filtrage par statut et par activité
 */
const EnqueteFilters: React.FC<EnqueteFiltersProps> = ({
    searchTerm,
    onSearchChange,
    statutFilter,
    onStatutFilterChange,
    activiteFilter,
    onActiviteFilterChange,
    uniqueStatuts,
    uniqueActivites,
    onCreateClick
}) => {
    return (
        <Box sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            flexWrap: 'wrap'
        }}>
            {/* Filtres à gauche */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Filtre par statut */}
                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel sx={{ fontSize: '0.75rem', px: 1 }}>
                        Filtrer par statut
                    </InputLabel>
                    <Select
                        value={statutFilter}
                        onChange={(e) => onStatutFilterChange(e.target.value)}
                        label="Filtrer par statut"
                        sx={{ fontSize: '0.75rem' }}
                    >
                        <MenuItem value="" sx={{ fontSize: '0.75rem' }}>
                            Tous les statuts
                        </MenuItem>
                        {uniqueStatuts.map(statut => (
                            <MenuItem key={statut} value={statut} sx={{ fontSize: '0.75rem' }}>
                                {statut}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Filtre par activité */}
                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel sx={{ fontSize: '0.75rem', px: 1 }}>
                        Filtrer par activité
                    </InputLabel>
                    <Select
                        value={activiteFilter}
                        onChange={(e) => onActiviteFilterChange(e.target.value)}
                        label="Filtrer par activité"
                        sx={{ fontSize: '0.75rem' }}
                    >
                        <MenuItem value="" sx={{ fontSize: '0.75rem' }}>
                            Toutes les activités
                        </MenuItem>
                        {uniqueActivites.map(activite => (
                            <MenuItem key={activite} value={activite} sx={{ fontSize: '0.75rem' }}>
                                {activite}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {/* Contrôles à droite */}
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {/* Barre de recherche */}
                <TextField
                    size="small"
                    placeholder="Rechercher une enquête..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    sx={{ width: 300 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Bouton Créer */}
                <Tooltip title="Créer une enquête" placement="top" arrow>
                    <Button
                        variant="contained"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={onCreateClick}
                        sx={{
                            minWidth: 'auto',
                            bgcolor: 'transparent',
                            color: 'black',
                            border: 1,
                            '&:hover': {
                                boxShadow: 4,
                                borderColor: 'black',
                                bgcolor: 'transparent',
                                color: 'black'
                            }
                        }}
                    >
                        Créer
                    </Button>
                </Tooltip>
            </Box>
        </Box>
    );
};

export default EnqueteFilters;