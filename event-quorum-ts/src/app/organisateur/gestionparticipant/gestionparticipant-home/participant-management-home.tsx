//src/app/organisateur/gestionparticipant/gestionparticipant-home/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

import { Box, Container, Stack, Typography, Snackbar, Alert } from '@mui/material';

// Import des types
import { Participant } from './components/types';
import InvitesTable from './components/InvitesTable';
import ExportButtons from './components/ExportButtons';
// Import du modal de suppression uniquement
import ParticipantDeleteModal from '../components/ParticipantDeleteModal';

/**
 * Composant principal de gestion des invités
 * Gère l'affichage et les actions sur la liste des participants/invités
 */
const ParticipantManagementPage = () => {
  const router = useRouter();

  // États pour les modals
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(
    null
  );

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

  // État pour stocker les filtres actifs (pour l'export)
  const [activeFilters, setActiveFilters] = useState({
    activityFilter: '',
    firstConnectionFilter: '',
    connectionTypeFilter: '',
  });

  /**
   * Données d'exemple des participants
   * Dans un vrai projet, ces données viendraient d'une API
   * 
   * Note importante :
   * - connecte: true = 1ère connexion effectuée
   * - connecte: false = 1ère connexion non effectuée
   * - emargement: null = pas encore signé
   * - emargement: string = URL de la signature (présent dans la liste de présence)
   * - typeConnexion: 'en ligne' | 'en présentiel' = type de participation
   */
  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: 1,
      nom: 'Koffi',
      prenom: 'Emmanuel',
      telephone: '0101010101',
      email: 'koffi@gmail.com',
      connecte: true, // 1ère connexion effectuée
      emargement:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      activite: 'conference',
      typeConnexion: 'en ligne',
    },
    {
      id: 2,
      nom: 'Kouassi',
      prenom: 'Marie',
      telephone: '0202020202',
      email: 'marie@gmail.com',
      connecte: false, // 1ère connexion non effectuée
      emargement: null, // Pas encore signé
      activite: 'workshop',
      typeConnexion: 'en présentiel',
    },
    {
      id: 3,
      nom: 'Ouattara',
      prenom: 'Jean',
      telephone: '0303030303',
      email: 'jean@gmail.com',
      connecte: true,
      emargement:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      activite: 'networking',
      typeConnexion: 'en ligne',
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
      typeConnexion: 'en présentiel',
    },
    {
      id: 5,
      nom: 'Bamba',
      prenom: 'Sekou',
      telephone: '0505050505',
      email: 'sekou@gmail.com',
      connecte: true,
      emargement:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      activite: 'conference',
      typeConnexion: 'en ligne',
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
      typeConnexion: 'en présentiel',
    },
    {
      id: 7,
      nom: 'Coulibaly',
      prenom: 'Ibrahim',
      telephone: '0707070707',
      email: 'ibrahim@gmail.com',
      connecte: true,
      emargement:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      activite: 'networking',
      typeConnexion: 'en ligne',
    },
    {
      id: 8,
      nom: 'Yao',
      prenom: 'Adjoua',
      telephone: '0808080808',
      email: 'adjoua@gmail.com',
      connecte: true,
      emargement: null, // Connecté mais pas encore signé
      activite: 'conference',
      typeConnexion: 'en présentiel',
    },
    {
      id: 9,
      nom: 'N\'Guessan',
      prenom: 'Patrick',
      telephone: '0909090909',
      email: 'patrick@gmail.com',
      connecte: false,
      emargement: null,
      activite: 'cocktail',
      typeConnexion: 'en ligne',
    },
    {
      id: 10,
      nom: 'Kone',
      prenom: 'Mariam',
      telephone: '1010101010',
      email: 'mariam@gmail.com',
      connecte: true,
      emargement:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      activite: 'workshop',
      typeConnexion: 'en présentiel',
      
    },
    {
      id: 10,
      nom: 'Chonou',
      prenom: 'Oriane',
      telephone: '0701010101',
      email: 'mariam@gmail.com',
      connecte: true,
      emargement:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      activite: 'cocktail',
      typeConnexion: 'en présentiel',
      presentDansLaSalle: true,
    },
  ]);

  /**
   * Callback pour récupérer les filtres actifs du tableau
   * Ces filtres seront utilisés lors de l'export
   * Mémorisé avec useCallback pour éviter les re-renders infinis
   */
  const handleFiltersChange = useCallback((filters: {
    activityFilter: string;
    firstConnectionFilter: string;
    connectionTypeFilter: string;
  }) => {
    setActiveFilters(filters);
  }, []); // Pas de dépendances car setActiveFilters est stable

  /**
   * Gère l'ouverture du modal de suppression pour un participant
   */
  const handleDeleteSingle = (id: number) => {
    const participant = participants.find((p) => p.id === id);
    if (participant) {
      setSelectedParticipant(participant);
      setDeleteModalOpen(true);
    }
  };

  /**
   * Confirme et effectue la suppression d'un participant
   */
  const handleConfirmDelete = async (id: number) => {
    try {
      setIsDeleting(true);

      // Simulation d'un appel API pour la suppression
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Suppression du participant
      setParticipants((prev) => prev.filter((p) => p.id !== id));

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

  /**
   * Gère l'ajout d'un nouveau participant
   * TODO: Implémenter la logique d'ajout
   */
  const handleAdd = () => {
    setSnackbar({
      open: true,
      message: "Fonctionnalité d'ajout à implémenter",
      severity: 'info',
    });
  };

  /**
   * Gère la visualisation des détails d'un participant
   * Redirige vers la page de détail
   */
  const handleView = (id: number) => {
    router.push(
      `/organisateur/gestionparticipant/gestionparticipant-home/detail/${id}`
    );
  };

  /**
   * Gère la modification d'un participant
   * Redirige vers la page d'édition
   */
  const handleEdit = (id: number) => {
    router.push(`/organisateur/gestionparticipant/edit/${id}`);
  };

  /**
   * Ferme la notification toast
   */
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
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

        {/* 
          Boutons d'exportation et consultation 
          Les filtres actifs sont passés pour que l'export 
          ne concerne que les données filtrées
        */}
        <ExportButtons currentTab="invites" activeFilters={activeFilters} />

        {/* 
          Tableau des invités avec tous les filtres
          Le callback onFiltersChange permet de remonter les filtres actifs
          au composant parent pour les passer à ExportButtons
        */}
        <InvitesTable
          participants={participants}
          onAdd={handleAdd}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteSingle}
          isDeleting={isDeleting}
          setParticipants={setParticipants}
          setSnackbar={setSnackbar}
          onFiltersChange={handleFiltersChange}
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
            boxShadow:
              'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ParticipantManagementPage;