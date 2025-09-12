//src/app/organisateur/gestionparticipant/gestionparticipant-home/participant-management-home.tsx
'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  Container,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';

// Import des composants existants
import ExportButtons from './components/ExportButtons';
import TableToolbar from './components/TableToolbar';
import ParticipantRow from './components/ParticipantRow';
// import NavigationButtons from './components/NavigationButtons';
import PaginationControls from './components/PaginationControls';

// Import des nouveaux composants modals
import ParticipantDetailModal from '../components/ParticipantDetailModal';
import ParticipantDeleteModal from '../components/ParticipantDeleteModal';

// Import des types
import { Participant } from './components/types';

/**
 * Composant principal de gestion des participants
 * Permet de visualiser, rechercher, filtrer, et gérer les participants d'un événement
 * Intègre les fonctionnalités de détail et de suppression via des modals
 */
const ParticipantManagementPage = () => {
  // États pour la sélection et la pagination
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activityFilter, setActivityFilter] = useState('');
  const [signatureEnabled, setSignatureEnabled] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // États pour les modals
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  
  // États pour les notifications et le chargement
  const [isDeleting, setIsDeleting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Données d'exemple avec activités - Dans un vrai projet, ces données viendraient d'une API
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 1,
      nom: 'Koffi',
      prenom: 'Emmanuel',
      telephone: '0101010101',
      email: 'koffi@gmail.com',
      connecte: true,
      emargement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      activite: 'conference',
    },
    {
      id: 2,
      nom: 'Kouassi',
      prenom: 'Marie',
      telephone: '0202020202',
      email: 'marie@gmail.com',
      connecte: false,
      emargement: null,
      activite: 'workshop',
    },
    {
      id: 3,
      nom: 'Ouattara',
      prenom: 'Jean',
      telephone: '0303030303',
      email: 'jean@gmail.com',
      connecte: true,
      emargement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      activite: 'networking',
    },
    {
      id: 4,
      nom: 'Traore',
      prenom: 'Fatou',
      telephone: '0404040404',
      email: 'fatou@gmail.com',
      connecte: true,
      emargement: null,
      activite: 'cocktail',
    },
    {
      id: 5,
      nom: 'Bamba',
      prenom: 'Sekou',
      telephone: '0505050505',
      email: 'sekou@gmail.com',
      connecte: false,
      emargement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      activite: 'conference',
    },
    {
      id: 6,
      nom: 'Diallo',
      prenom: 'Aminata',
      telephone: '0606060606',
      email: 'aminata@gmail.com',
      connecte: true,
      emargement: null,
      activite: 'workshop',
    },
    {
      id: 7,
      nom: 'Coulibaly',
      prenom: 'Ibrahim',
      telephone: '0707070707',
      email: 'ibrahim@gmail.com',
      connecte: false,
      emargement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      activite: 'networking',
    },
  ]);

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
      setIsDeleting(true);
      
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
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Ouverture du modal de suppression pour un participant individuel
   */
  const handleDeleteSingle = (id: number) => {
    const participant = participants.find(p => p.id === id);
    if (participant) {
      setSelectedParticipant(participant);
      setDeleteModalOpen(true);
    }
  };

  /**
   * Confirmation de la suppression individuelle
   */
  const handleConfirmDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      
      // Simulation d'un appel API pour la suppression
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Suppression du participant
      setParticipants(prev => prev.filter(p => p.id !== id));
      
      // Fermeture du modal
      setDeleteModalOpen(false);
      setSelectedParticipant(null);
      
      // Affichage de la notification de succès
      setSnackbar({
        open: true,
        message: 'Participant supprimé avec succès',
        severity: 'success',
      });
      
    } catch (error) {
      // Gestion des erreurs
      setSnackbar({
        open: true,
        message: 'Erreur lors de la suppression du participant',
        severity: 'error',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  /**
   * Gestion de l'ajout d'un nouveau participant
   */
  const handleAdd = () => {
    console.log('Ajouter un participant');
    // TODO: Redirection vers la page d'ajout ou ouverture d'un modal d'ajout
    setSnackbar({
      open: true,
      message: 'Fonctionnalité d\'ajout à implémenter',
      severity: 'info',
    });
  };

  /**
   * Ouverture du modal de détail pour un participant
   */
  const handleView = (id: number) => {
    const participant = participants.find(p => p.id === id);
    if (participant) {
      setSelectedParticipant(participant);
      setDetailModalOpen(true);
    }
  };

  /**
   * Gestion de l'édition d'un participant
   */
  const handleEdit = (id: number) => {
    console.log('Modifier participant:', id);
    // TODO: Redirection vers la page d'édition
    setSnackbar({
      open: true,
      message: 'Redirection vers la page d\'édition',
      severity: 'info',
    });
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

  /**
   * Fermeture de la notification
   */
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* En-tête de la page */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Gestion des Participants
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gérez les invités et participants de votre événement
          </Typography>
        </Box>

        {/* Boutons d'exportation */}
        <ExportButtons />

        {/* Tableau principal des participants */}
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
              onAdd={handleAdd}
              searchTerm={searchTerm}
              onSearchChange={(e) => setSearchTerm(e.target.value)}
              activityFilter={activityFilter}
              onActivityFilterChange={(e) => setActivityFilter(e.target.value)}
              signatureEnabled={signatureEnabled}
              onSignatureToggle={setSignatureEnabled}
              isDeleting={isDeleting}
            />

            {/* Tableau des participants */}
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
                    <TableCell sx={{ fontWeight: 600 }}>Émargement</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedParticipants.map((participant) => (
                    <ParticipantRow
                      key={`${participant.id}-${participant.email}`} // Clé unique pour éviter les doublons
                      participant={participant}
                      selected={selectedParticipants.includes(participant.id)}
                      onSelect={() => handleSelectParticipant(participant.id)}
                      onEdit={handleEdit}
                      onView={handleView}
                      onDelete={handleDeleteSingle}
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

        {/* Boutons de navigation */}
        {/* <NavigationButtons /> */}

        {/* Footer de la page */}
        <Box sx={{
          mt: 4,
          py: 3,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 EVENTQUORUM. Powered by FX_LABS SARL.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
              Confidentialité
            </Button>
            <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
              Aide
            </Button>
          </Stack>
        </Box>
      </Stack>

      {/* Modal de détail du participant */}
      <ParticipantDetailModal
        open={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
          setSelectedParticipant(null);
        }}
        participant={selectedParticipant}
        onEdit={handleEdit}
      />

      {/* Modal de confirmation de suppression */}
      <ParticipantDeleteModal
        open={deleteModalOpen}
        onClose={() => {
          if (!isDeleting) {
            setDeleteModalOpen(false);
            setSelectedParticipant(null);
          }
        }}
        participant={selectedParticipant}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      {/* Notifications toast */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ 
            width: '100%',
            borderRadius: 2,
            boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ParticipantManagementPage;