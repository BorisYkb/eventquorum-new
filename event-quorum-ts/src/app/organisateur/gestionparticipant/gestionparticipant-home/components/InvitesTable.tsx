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

interface InvitesTableProps {
    participants: Participant[];
    onAdd: () => void;
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    isDeleting: boolean;
    setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
    setSnackbar: React.Dispatch<React.SetStateAction<{
        open: boolean;
        message: string;
        severity: 'success' | 'error' | 'warning' | 'info';
    }>>;
}

const InvitesTable: React.FC<InvitesTableProps> = ({
    participants,
    onAdd,
    onView,
    onEdit,
    onDelete,
    isDeleting,
    setParticipants,
    setSnackbar
}) => {
    // États pour la gestion de la table des invités
    const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activityFilter, setActivityFilter] = useState('');
    const [signatureEnabled, setSignatureEnabled] = useState(true);
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
     * Gestion de la sélection de tous les participants
     */
    const handleSelectAll = () => {
        if (selectedParticipants.length === paginatedParticipants.length) {
            setSelectedParticipants([]);
        } else {
            setSelectedParticipants(paginatedParticipants.map(p => p.id));
        }
    };

    /**
     * Gestion de la sélection d'un participant individuel
     */
    const handleSelectParticipant = (id: number) => {
        if (selectedParticipants.includes(id)) {
            setSelectedParticipants(selectedParticipants.filter(pid => pid !== id));
        } else {
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
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Suppression des participants sélectionnés
            setParticipants(prev =>
                prev.filter(p => !selectedParticipants.includes(p.id))
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
                {/* Barre d'outils du tableau */}
                <TableToolbar
                    selectedCount={selectedParticipants.length}
                    onSelectAll={handleSelectAll}
                    isAllSelected={selectedParticipants.length === paginatedParticipants.length && paginatedParticipants.length > 0}
                    onDelete={handleDelete}
                    onAdd={onAdd}
                    searchTerm={searchTerm}
                    onSearchChange={(e) => setSearchTerm(e.target.value)}
                    activityFilter={activityFilter}
                    onActivityFilterChange={(e) => setActivityFilter(e.target.value)}
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
                                        indeterminate={selectedParticipants.length > 0 && selectedParticipants.length < paginatedParticipants.length}
                                        checked={paginatedParticipants.length > 0 && selectedParticipants.length === paginatedParticipants.length}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Nom & Prénoms</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Téléphone</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                                <TableCell sx={{ fontWeight: 600 }}>Connecté</TableCell>
                                {/* <TableCell sx={{ fontWeight: 600 }}>Émargement</TableCell> */}
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