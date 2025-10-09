'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Box,
  Container,
  Stack,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';

// Import des types
import { Participant } from './components/types';
import InvitesTable from './components/InvitesTable';
import ExportButtons from './components/ExportButtons';
// Import du modal de suppression uniquement
import ParticipantDeleteModal from '../components/ParticipantDeleteModal';

/**
 * Composant principal de gestion des invités
 */
const ParticipantManagementPage = () => {
  const router = useRouter();

  // États pour les modals
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

  // Données d'exemple - Dans un vrai projet, ces données viendraient d'une API
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
      connecte: false,
      emargement: null,
      activite: 'cocktail',
    },
    {
      id: 5,
      nom: 'Bamba',
      prenom: 'Sekou',
      telephone: '0505050505',
      email: 'sekou@gmail.com',
      connecte: true,
      emargement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      activite: 'conference',
    },
    {
      id: 6,
      nom: 'Diallo',
      prenom: 'Aminata',
      telephone: '0606060606',
      email: 'aminata@gmail.com',
      connecte: false,
      emargement: null,
      activite: 'workshop',
    },
    {
      id: 7,
      nom: 'Coulibaly',
      prenom: 'Ibrahim',
      telephone: '0707070707',
      email: 'ibrahim@gmail.com',
      connecte: true,
      emargement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      activite: 'networking',
    },
  ]);

  /**
   * Gestionnaires pour les actions sur les participants
   */
  const handleDeleteSingle = (id: number) => {
    const participant = participants.find(p => p.id === id);
    if (participant) {
      setSelectedParticipant(participant);
      setDeleteModalOpen(true);
    }
  };

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
      setSnackbar({
        open: true,
        message: 'Erreur lors de la suppression du participant',
        severity: 'error',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAdd = () => {
    setSnackbar({
      open: true,
      message: 'Fonctionnalité d\'ajout à implémenter',
      severity: 'info',
    });
  };

  const handleView = (id: number) => {
    // Redirection vers la page de détail au lieu d'ouvrir un modal
    router.push(`/organisateur/gestionparticipant/gestionparticipant-home/detail/${id}`);
  };

  const handleEdit = (id: number) => {
    // Redirection vers la page d'édition
    router.push(`/organisateur/gestionparticipant/edit/${id}`);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Stack spacing={4}>
        {/* En-tête de la page */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Gestion des invités
          </Typography>
        </Box>

        {/* Boutons d'exportation et consultation */}
        <ExportButtons currentTab="invites" />

        {/* Tableau des invités */}
        <InvitesTable
          participants={participants}
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteSingle}
          isDeleting={isDeleting}
          setParticipants={setParticipants}
          setSnackbar={setSnackbar}
        />
      </Stack>

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