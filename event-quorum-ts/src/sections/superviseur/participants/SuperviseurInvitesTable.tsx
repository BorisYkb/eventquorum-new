// src/sections/superviseur/participants/SuperviseurInvitesTable.tsx

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
    Checkbox,
    Paper,
} from '@mui/material';

import type { SuperviseurParticipant } from './types';
import SuperviseurTableToolbar from './SuperviseurTableToolbar';
import SuperviseurParticipantRow from './SuperviseurParticipantRow';
import SuperviseurPaginationControls from './SuperviseurPaginationControls';

/**
 * Props du composant SuperviseurInvitesTable
 */
interface SuperviseurInvitesTableProps {
    /** Liste des participants */
    participants: SuperviseurParticipant[];
    /** Callback pour voir les détails d'un participant */
    onView: (id: number) => void;
    /** Callback pour exporter les filtres actifs vers le composant parent */
    onFiltersChange?: (filters: {
        activityFilter: string;
        firstConnectionFilter: string;
        connectionTypeFilter: string;
        emargementFilter: string;
        checkingFilter: string;
    }) => void;
}

/**
 * Composant SuperviseurInvitesTable (Lecture seule)
 * Tableau de visualisation des invités pour le superviseur
 */
const SuperviseurInvitesTable: React.FC<SuperviseurInvitesTableProps> = ({
    participants,
    onView,
    onFiltersChange,
}) => {
    // États pour la gestion de la sélection et des filtres
    const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activityFilter, setActivityFilter] = useState('');
    const [firstConnectionFilter, setFirstConnectionFilter] = useState('');
    const [connectionTypeFilter, setConnectionTypeFilter] = useState('');
    const [emargementFilter, setEmargementFilter] = useState('');
    const [checkingFilter, setCheckingFilter] = useState('');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Détermine si la colonne checking doit être affichée
    const showCheckingColumn = activityFilter !== '';

    /**
     * Helper pour notifier les changements de filtres
     */
    const notifyFiltersChange = (filters: {
        activityFilter: string;
        firstConnectionFilter: string;
        connectionTypeFilter: string;
        emargementFilter: string;
        checkingFilter: string;
    }) => {
        if (onFiltersChange) {
            onFiltersChange(filters);
        }
    };

    /**
     * Gestion du changement de filtre d'activité
     */
    const handleActivityFilterChange = (value: string) => {
        setActivityFilter(value);
        if (value === '') {
            setCheckingFilter('');
        }
        notifyFiltersChange({
            activityFilter: value,
            firstConnectionFilter,
            connectionTypeFilter,
            emargementFilter,
            checkingFilter: value === '' ? '' : checkingFilter,
        });
    };

    /**
     * Gestion du changement de filtre de première connexion
     */
    const handleFirstConnectionFilterChange = (value: string) => {
        setFirstConnectionFilter(value);
        notifyFiltersChange({
            activityFilter,
            firstConnectionFilter: value,
            connectionTypeFilter,
            emargementFilter,
            checkingFilter,
        });
    };

    /**
     * Gestion du changement de filtre de type de connexion
     */
    const handleConnectionTypeFilterChange = (value: string) => {
        setConnectionTypeFilter(value);
        notifyFiltersChange({
            activityFilter,
            firstConnectionFilter,
            connectionTypeFilter: value,
            emargementFilter,
            checkingFilter,
        });
    };

    /**
     * Gestion du changement de filtre d'émargement
     */
    const handleEmargementFilterChange = (value: string) => {
        setEmargementFilter(value);
        notifyFiltersChange({
            activityFilter,
            firstConnectionFilter,
            connectionTypeFilter,
            emargementFilter: value,
            checkingFilter,
        });
    };

    /**
     * Gestion du changement de filtre de checking
     */
    const handleCheckingFilterChange = (value: string) => {
        setCheckingFilter(value);
        notifyFiltersChange({
            activityFilter,
            firstConnectionFilter,
            connectionTypeFilter,
            emargementFilter,
            checkingFilter: value,
        });
    };

    /**
     * Filtrage des participants
     */
    const filteredParticipants = participants.filter((participant) => {
        // Filtre de recherche
        const matchesSearch =
            participant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            participant.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
            participant.email.toLowerCase().includes(searchTerm.toLowerCase());

        // Filtre par activité
        const matchesActivity = !activityFilter || participant.activite === activityFilter;

        // Filtre par première connexion
        const matchesFirstConnection =
            !firstConnectionFilter ||
            (firstConnectionFilter === 'effectuee' && participant.connecte) ||
            (firstConnectionFilter === 'non_effectuee' && !participant.connecte);

        // Filtre par type de connexion
        const matchesConnectionType =
            !connectionTypeFilter || participant.typeConnexion === connectionTypeFilter;

        // Filtre par émargement
        const matchesEmargement =
            !emargementFilter ||
            (emargementFilter === 'signed' && participant.emargement !== null) ||
            (emargementFilter === 'not_signed' && participant.emargement === null);

        // Filtre par checking
        let matchesChecking = true;
        if (checkingFilter && activityFilter) {
            if (checkingFilter === 'checked') {
                matchesChecking =
                    participant.typeConnexion === 'en présentiel' &&
                    participant.emargement !== null &&
                    participant.checking === true;
            } else if (checkingFilter === 'not_checked') {
                matchesChecking =
                    participant.typeConnexion === 'en présentiel' &&
                    (participant.emargement === null || participant.checking !== true);
            } else if (checkingFilter === 'not_applicable') {
                matchesChecking = participant.typeConnexion === 'en ligne';
            }
        }

        return (
            matchesSearch &&
            matchesActivity &&
            matchesFirstConnection &&
            matchesConnectionType &&
            matchesEmargement &&
            matchesChecking
        );
    });

    // Pagination
    const totalPages = Math.ceil(filteredParticipants.length / rowsPerPage);
    const paginatedParticipants = filteredParticipants.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    /**
     * Gestion de la sélection de tous les participants
     */
    const handleSelectAll = () => {
        if (selectedParticipants.length === paginatedParticipants.length) {
            setSelectedParticipants([]);
        } else {
            setSelectedParticipants(paginatedParticipants.map((p) => p.id));
        }
    };

    /**
     * Gestion de la sélection d'un participant individuel
     */
    const handleSelectParticipant = (id: number) => {
        if (selectedParticipants.includes(id)) {
            setSelectedParticipants(selectedParticipants.filter((pid) => pid !== id));
        } else {
            setSelectedParticipants([...selectedParticipants, id]);
        }
    };

    /**
     * Gestion du changement de page
     */
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setSelectedParticipants([]);
    };

    /**
     * Gestion du changement du nombre d'éléments par page
     */
    const handleRowsPerPageChange = (event: any) => {
        setRowsPerPage(event.target.value);
        setPage(1);
        setSelectedParticipants([]);
    };

    return (
        <Card
            sx={{
                borderRadius: 2,
                boxShadow:
                    'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
            }}
        >
            <Box sx={{ p: 3 }}>
                {/* Barre d'outils */}
                <SuperviseurTableToolbar
                    searchTerm={searchTerm}
                    onSearchChange={(e) => setSearchTerm(e.target.value)}
                    activityFilter={activityFilter}
                    onActivityFilterChange={(e) => handleActivityFilterChange(e.target.value)}
                    firstConnectionFilter={firstConnectionFilter}
                    onFirstConnectionFilterChange={(e) => handleFirstConnectionFilterChange(e.target.value)}
                    connectionTypeFilter={connectionTypeFilter}
                    onConnectionTypeFilterChange={(e) => handleConnectionTypeFilterChange(e.target.value)}
                    emargementFilter={emargementFilter}
                    onEmargementFilterChange={(e) => handleEmargementFilterChange(e.target.value)}
                    checkingFilter={checkingFilter}
                    onCheckingFilterChange={(e) => handleCheckingFilterChange(e.target.value)}
                />

                {/* Tableau des invités */}
                <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={
                                            selectedParticipants.length > 0 &&
                                            selectedParticipants.length < paginatedParticipants.length
                                        }
                                        checked={
                                            paginatedParticipants.length > 0 &&
                                            selectedParticipants.length === paginatedParticipants.length
                                        }
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Nom & Prénoms</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Téléphone</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Participation</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>1ère Connexion</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Émargement</TableCell>
                                {showCheckingColumn && (
                                    <TableCell sx={{ fontWeight: 600 }} align="center">
                                        Checking
                                    </TableCell>
                                )}
                                <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedParticipants.map((participant) => (
                                <SuperviseurParticipantRow
                                    key={`${participant.id}-${participant.email}`}
                                    participant={participant}
                                    selected={selectedParticipants.includes(participant.id)}
                                    onSelect={() => handleSelectParticipant(participant.id)}
                                    onView={onView}
                                    showCheckingColumn={showCheckingColumn}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Contrôles de pagination */}
                <SuperviseurPaginationControls
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

export default SuperviseurInvitesTable;