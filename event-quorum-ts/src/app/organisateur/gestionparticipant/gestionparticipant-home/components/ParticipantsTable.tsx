//src/app/organisateur/gestionparticipant/gestionparticipant-home/components/ParticipantsTable.tsx
'use client';

import { useState } from 'react';
import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Divider,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

// Import des composants
import ParticipantRowSimple from './ParticipantRowSimple';
import PaginationControls from './PaginationControls';

// Import des types
import { Participant } from './types';

interface ParticipantsTableProps {
    participants: Participant[];
    setSnackbar: React.Dispatch<React.SetStateAction<{
        open: boolean;
        message: string;
        severity: 'success' | 'error' | 'warning' | 'info';
    }>>;
}

const ACTIVITIES = [
    { value: '', label: 'Toutes les activités' },
    { value: 'conference', label: 'Conférence principale' },
    { value: 'workshop', label: 'Atelier pratique' },
    { value: 'networking', label: 'Session networking' },
    { value: 'cocktail', label: 'Cocktail de clôture' },
];

/**
 * Composant ParticipantsTable - Version simplifiée pour les participants
 * Sans colonnes Connecté, Actions
 * Avec colonne Émargement
 * Sans bouton Ajouter, poubelle, et switcher signature
 */
const ParticipantsTable: React.FC<ParticipantsTableProps> = ({
    participants,
    setSnackbar
}) => {
    // États pour la gestion de la table des participants
    const [searchTerm, setSearchTerm] = useState('');
    const [activityFilter, setActivityFilter] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    /**
     * Filtrage des participants basé sur la recherche et les filtres
     */
    const filteredParticipants = participants.filter(participant => {
        const matchesSearch =
            participant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            participant.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            participant.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesActivity = !activityFilter || participant.activite === activityFilter;

        return matchesSearch && matchesActivity;
    });

    // Calcul de la pagination
    const totalPages = Math.ceil(filteredParticipants.length / rowsPerPage);
    const paginatedParticipants = filteredParticipants.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    /**
     * Gestion du changement de page
     */
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    /**
     * Gestion du changement du nombre d'éléments par page
     */
    const handleRowsPerPageChange = (event: any) => {
        setRowsPerPage(event.target.value);
        setPage(1);
    };

    return (
        <Card sx={{
            borderRadius: 2,
            boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
        }}>
            <Box sx={{ p: 3 }}>
                {/* Barre d'outils simplifiée pour les participants */}
                <Stack spacing={2} sx={{ mb: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-start">
                        <TextField
                            size="small"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                            }}
                            sx={{ minWidth: 200 }}
                        />

                        <Divider orientation="vertical" flexItem />

                        <FormControl size="small" sx={{ minWidth: 180 }}>
                            <InputLabel>Filtrer par activité</InputLabel>
                            <Select
                                value={activityFilter}
                                onChange={(e) => setActivityFilter(e.target.value)}
                                label="Filtrer par activité"
                            >
                                {ACTIVITIES.map((activity) => (
                                    <MenuItem key={activity.value} value={activity.value}>
                                        {activity.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                </Stack>

                {/* Tableau des participants simplifié */}
                <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Nom & Prénoms</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Téléphone</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Émargement</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedParticipants.map((participant) => (
                                <ParticipantRowSimple
                                    key={`participant-${participant.id}-${participant.email}`}
                                    participant={participant}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Contrôles de pagination */}
                <PaginationControls
                    page={page}
                    totalPages={totalPages}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    totalItems={filteredParticipants.length}
                />
            </Box>
        </Card>
    );
};

export default ParticipantsTable;