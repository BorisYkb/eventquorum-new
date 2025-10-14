//src/app/organisateur/gestionparticipant/gestionparticipant-home/components/InvitesTable.tsx

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
    const [signatureEnabled, setSignatureEnabled] = useState(true);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    /**
     * Helper pour notifier les changements de filtres
     */
    const notifyFiltersChange = (filters: {
        activityFilter: string;
        firstConnectionFilter: string;
        connectionTypeFilter: string;
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
        notifyFiltersChange({
            activityFilter: value,
            firstConnectionFilter,
            connectionTypeFilter,
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
        });
    };

    /**
     * Filtrage des participants basé sur tous les critères :
     * - Recherche par nom, prénom, email
     * - Filtre par activité
     * - Filtre par première connexion
     * - Filtre par type de connexion
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
        // 'effectuee' = connecte === true
        // 'non_effectuee' = connecte === false
        // '' = tous
        const matchesFirstConnection =
            !firstConnectionFilter ||
            (firstConnectionFilter === 'effectuee' && participant.connecte) ||
            (firstConnectionFilter === 'non_effectuee' && !participant.connecte);

        // Filtre par type de connexion (en ligne, en présentiel)
        const matchesConnectionType =
            !connectionTypeFilter || participant.typeConnexion === connectionTypeFilter;

        // Retourne true si tous les filtres sont satisfaits
        return (
            matchesSearch &&
            matchesActivity &&
            matchesFirstConnection &&
            matchesConnectionType
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
                    isAllSelected={
                        selectedParticipants.length === paginatedParticipants.length &&
                        paginatedParticipants.length > 0
                    }
                    onDelete={handleDelete}
                    onAdd={onAdd}
                    searchTerm={searchTerm}
                    onSearchChange={(e) => setSearchTerm(e.target.value)}
                    activityFilter={activityFilter}
                    onActivityFilterChange={(e) => handleActivityFilterChange(e.target.value)}
                    firstConnectionFilter={firstConnectionFilter}
                    onFirstConnectionFilterChange={(e) =>
                        handleFirstConnectionFilterChange(e.target.value)
                    }
                    connectionTypeFilter={connectionTypeFilter}
                    onConnectionTypeFilterChange={(e) =>
                        handleConnectionTypeFilterChange(e.target.value)
                    }
                    signatureEnabled={signatureEnabled}
                    onSignatureToggle={setSignatureEnabled}
                    isDeleting={isDeleting}
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
                                {/* <TableCell sx={{ fontWeight: 600 }}>Type</TableCell> */}
                                <TableCell sx={{ fontWeight: 600 }}>1ère Connexion</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Émargement</TableCell>
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