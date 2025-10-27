// src/sections/superviseur/participants/SuperviseurTableToolbar.tsx

'use client';

import { Search as SearchIcon } from '@mui/icons-material';
import {
    Stack,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

/**
 * Props du composant SuperviseurTableToolbar
 */
type SuperviseurTableToolbarProps = {
    /** Terme de recherche actuel */
    searchTerm: string;
    /** Callback pour le changement du terme de recherche */
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /** Filtre d'activité actuel */
    activityFilter: string;
    /** Callback pour le changement du filtre d'activité */
    onActivityFilterChange: (e: any) => void;
    /** Filtre de première connexion actuel */
    firstConnectionFilter: string;
    /** Callback pour le changement du filtre de première connexion */
    onFirstConnectionFilterChange: (e: any) => void;
    /** Filtre de type de connexion actuel */
    connectionTypeFilter: string;
    /** Callback pour le changement du filtre de type de connexion */
    onConnectionTypeFilterChange: (e: any) => void;
    /** Filtre d'émargement actuel */
    emargementFilter: string;
    /** Callback pour le changement du filtre d'émargement */
    onEmargementFilterChange: (e: any) => void;
    /** Filtre de checking actuel */
    checkingFilter: string;
    /** Callback pour le changement du filtre de checking */
    onCheckingFilterChange: (e: any) => void;
};

/**
 * Liste des activités disponibles pour le filtrage
 */
const ACTIVITIES = [
    { value: '', label: 'Toutes les activités' },
    { value: 'conference', label: 'Conférence principale' },
    { value: 'workshop', label: 'Atelier pratique' },
    { value: 'networking', label: 'Session networking' },
    { value: 'cocktail', label: 'Cocktail de clôture' },
];

/**
 * Options de filtre pour la première connexion
 */
const FIRST_CONNECTION_OPTIONS = [
    { value: '', label: 'Toutes' },
    { value: 'effectuee', label: '1ère connexion effectuée' },
    { value: 'non_effectuee', label: '1ère connexion non effectuée' },
];

/**
 * Options de filtre pour le type de connexion
 */
const CONNECTION_TYPE_OPTIONS = [
    { value: '', label: 'Tout' },
    { value: 'en ligne', label: 'En ligne' },
    { value: 'en présentiel', label: 'En présentiel' },
];

/**
 * Options de filtre pour l'émargement
 */
const EMARGEMENT_OPTIONS = [
    { value: '', label: 'Tous' },
    { value: 'signed', label: 'Émargé' },
    { value: 'not_signed', label: 'Non émargé' },
];

/**
 * Options de filtre pour le checking
 */
const CHECKING_OPTIONS = [
    { value: '', label: 'Tous' },
    { value: 'checked', label: 'Dans la salle' },
    { value: 'not_checked', label: 'Pas dans la salle' },
    { value: 'not_applicable', label: 'Non applicable' },
];

/**
 * Composant SuperviseurTableToolbar (Lecture seule)
 * Barre d'outils pour la visualisation des participants (superviseur)
 */
const SuperviseurTableToolbar = ({
    searchTerm,
    onSearchChange,
    activityFilter,
    onActivityFilterChange,
    firstConnectionFilter,
    onFirstConnectionFilterChange,
    connectionTypeFilter,
    onConnectionTypeFilterChange,
    emargementFilter,
    onEmargementFilterChange,
    checkingFilter,
    onCheckingFilterChange,
}: SuperviseurTableToolbarProps) => {
    // Détermine si le filtre checking doit être affiché
    const showCheckingFilter = activityFilter !== '';

    return (
        <Stack spacing={2} sx={{ mb: 2 }}>
            {/* Ligne de filtres et recherche */}
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                {/* Champ de recherche */}
                <TextField
                    size="small"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={onSearchChange}
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                    sx={{ minWidth: 200 }}
                />

                {/* Filtre par activité */}
                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Filtrer par activité</InputLabel>
                    <Select
                        value={activityFilter}
                        onChange={onActivityFilterChange}
                        label="Filtrer par activité"
                    >
                        {ACTIVITIES.map((activity) => (
                            <MenuItem key={activity.value} value={activity.value}>
                                {activity.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Filtre par première connexion */}
                <FormControl size="small" sx={{ minWidth: 200 }}>
                    <InputLabel>1ère connexion</InputLabel>
                    <Select
                        value={firstConnectionFilter}
                        onChange={onFirstConnectionFilterChange}
                        label="1ère connexion"
                    >
                        {FIRST_CONNECTION_OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Filtre par type de connexion */}
                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Type de participation</InputLabel>
                    <Select
                        value={connectionTypeFilter}
                        onChange={onConnectionTypeFilterChange}
                        label="Type de connexion"
                    >
                        {CONNECTION_TYPE_OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Filtre par émargement */}
                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Émargement</InputLabel>
                    <Select
                        value={emargementFilter}
                        onChange={onEmargementFilterChange}
                        label="Émargement"
                    >
                        {EMARGEMENT_OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Filtre par checking - visible uniquement si une activité est sélectionnée */}
                {showCheckingFilter && (
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel>Checking</InputLabel>
                        <Select
                            value={checkingFilter}
                            onChange={onCheckingFilterChange}
                            label="Checking"
                        >
                            {CHECKING_OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </Stack>
        </Stack>
    );
};

export default SuperviseurTableToolbar;