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

// Import des types
import { Participant } from './types';
// Import des composants existants
import TableToolbar from './TableToolbar';
import ParticipantRow from './ParticipantRow';
import PaginationControls from './PaginationControls';

/**
 * Props du composant InvitesTable
 */
interface InvitesTableProps {
    /** Liste des participants */
    participants: Participant[];
    /** Callback pour ajouter un participant */
    onAdd: () => void;
    /** Callback pour voir les détails d'un participant */
    onView: (id: number) => void;
    /** Callback pour modifier un participant */
    onEdit: (id: number) => void;
    /** Callback pour supprimer un participant */
    onDelete: (id: number) => void;
    /** Indique si une suppression est en cours */
    isDeleting: boolean;
    /** Fonction pour mettre à jour la liste des participants */
    setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
    /** Fonction pour afficher une notification */
    setSnackbar: React.Dispatch<
        React.SetStateAction<{
            open: boolean;
            message: string;
            severity: 'success' | 'error' | 'warning' | 'info';
        }>
    >;
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
 * Composant InvitesTable
 * Tableau de gestion des invités avec filtres, recherche et pagination
 */
const InvitesTable: React.FC<InvitesTableProps> = ({
    participants,
    onAdd,
    onView,
    onEdit,
    onDelete,
    isDeleting,
    setParticipants,
    setSnackbar,
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
        // Réinitialiser le filtre checking si on revient à "toutes les activités"
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
     * Filtrage des participants basé sur tous les critères :
     * - Recherche par nom, prénom, email
     * - Filtre par activité
     * - Filtre par première connexion
     * - Filtre par type de connexion
     * - Filtre par émargement
     * - Filtre par checking
     */
    const filteredParticipants = participants.filter((participant) => {
        // Filtre de recherche (nom, prénom, email)
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

        // Filtre par checking (uniquement si une activité est sélectionnée)
        let matchesChecking = true;
        if (checkingFilter && activityFilter) {
            if (checkingFilter === 'checked') {
                // Dans la salle : présentiel + émargé + checking = true
                matchesChecking =
                    participant.typeConnexion === 'en présentiel' &&
                    participant.emargement !== null &&
                    participant.checking === true;
            } else if (checkingFilter === 'not_checked') {
                // Pas dans la salle : présentiel + (pas émargé OU pas checking)
                matchesChecking =
                    participant.typeConnexion === 'en présentiel' &&
                    (participant.emargement === null || participant.checking !== true);
            } else if (checkingFilter === 'not_applicable') {
                // Non applicable : en ligne
                matchesChecking = participant.typeConnexion === 'en ligne';
            }
        }

        // Retourne true si tous les filtres sont satisfaits
        return (
            matchesSearch &&
            matchesActivity &&
            matchesFirstConnection &&
            matchesConnectionType &&
            matchesEmargement &&
            matchesChecking
        );
    });

    // Calcul de la pagination basée sur les résultats filtrés
    const totalPages = Math.ceil(filteredParticipants.length / rowsPerPage);
    const paginatedParticipants = filteredParticipants.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    /**
     * Gestion de la sélection de tous les participants de la page courante
     */
    const handleSelectAll = () => {
        if (selectedParticipants.length === paginatedParticipants.length) {
            // Désélectionner tous
            setSelectedParticipants([]);
        } else {
            // Sélectionner tous les participants de la page courante
            setSelectedParticipants(paginatedParticipants.map((p) => p.id));
        }
    };

    /**
     * Gestion de la sélection d'un participant individuel
     */
    const handleSelectParticipant = (id: number) => {
        if (selectedParticipants.includes(id)) {
            // Désélectionner
            setSelectedParticipants(selectedParticipants.filter((pid) => pid !== id));
        } else {
            // Sélectionner
            setSelectedParticipants([...selectedParticipants, id]);
        }
    };

    /**
     * Gestion de la suppression multiple (depuis la toolbar)
     */
    const handleDelete = async () => {
        if (selectedParticipants.length === 0) return;

        try {
            // Simulation d'un appel API pour la suppression multiple
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Suppression des participants sélectionnés
            setParticipants((prev) =>
                prev.filter((p) => !selectedParticipants.includes(p.id))
            );

            // Réinitialisation de la sélection
            setSelectedParticipants([]);

            // Affichage de la notification de succès
            setSnackbar({
                open: true,
                message: `${selectedParticipants.length} participant(s) supprimé(s) avec succès`,
                severity: 'success',
            });
        } catch (error) {
            // Gestion des erreurs
            setSnackbar({
                open: true,
                message: 'Erreur lors de la suppression des participants',
                severity: 'error',
            });
        }
    };

    /**
     * Gestion du changement de page
     */
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        // Réinitialiser la sélection lors du changement de page
        setSelectedParticipants([]);
    };

    /**
     * Gestion du changement du nombre d'éléments par page
     */
    const handleRowsPerPageChange = (event: any) => {
        setRowsPerPage(event.target.value);
        setPage(1); // Retour à la première page
        setSelectedParticipants([]); // Réinitialiser la sélection
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
                {/* Barre d'outils du tableau avec tous les filtres */}
                <TableToolbar
                    selectedCount={selectedParticipants.length}
                    onSelectAll={handleSelectAll}
                    isAllSelected={selectedParticipants.length === paginatedParticipants.length &&
                        paginatedParticipants.length > 0}
                    onDelete={handleDelete}
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
                    isDeleting={isDeleting} onAdd={function (): void {
                        throw new Error('Function not implemented.');
                    } } signatureEnabled={false} onSignatureToggle={function (checked: boolean): void {
                        throw new Error('Function not implemented.');
                    } }                />

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
                                {/* Colonne Checking visible uniquement si une activité est sélectionnée */}
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
                                <ParticipantRow
                                    key={`${participant.id}-${participant.email}`}
                                    participant={participant}
                                    selected={selectedParticipants.includes(participant.id)}
                                    onSelect={() => handleSelectParticipant(participant.id)}
                                    onEdit={onEdit}
                                    onView={onView}
                                    onDelete={onDelete}
                                    showCheckingColumn={showCheckingColumn}
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

export default InvitesTable;