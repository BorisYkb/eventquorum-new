//src/app/organisateur/gestionparticipant/gestionparticipant-home/participant-management-home.tsx
'use client';

import { useState } from 'react';
import { useTabs } from 'minimal-shared/hooks';
import {
  Box,
  Card,
  Container,
  Stack,
  Typography,
  Tab,
  Snackbar,
  Alert,
} from '@mui/material';

import { CustomTabs } from 'src/components/custom-tabs';

// Import des composants
import ExportButtons from './components/ExportButtons';
import InvitesTable from './components/InvitesTable';
import ParticipantsTable from './components/ParticipantsTable';

// Import des nouveaux composants modals
import ParticipantDetailModal from '../components/ParticipantDetailModal';
import ParticipantDeleteModal from '../components/ParticipantDeleteModal';

// Import des types
import { Participant } from './components/types';

/**
 * Composant principal de gestion des participants
 * Intègre la navigation par onglets entre Invités et Participants
 */
const ParticipantManagementPage = () => {
  // Gestion des onglets
  const tabs = useTabs('invites');

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
    const participant = participants.find(p => p.id === id);
    if (participant) {
      setSelectedParticipant(participant);
      setDetailModalOpen(true);
    }
  };

  const handleEdit = (id: number) => {
    setSnackbar({
      open: true,
      message: 'Redirection vers la page d\'édition',
      severity: 'info',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Configuration des onglets
  const TABS = [
    { value: 'invites', label: 'Liste des invités' },
    { value: 'participants', label: 'Liste des participants' }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
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

        {/* Navigation par onglets */}
        <Box sx={{ mb: 2, width: 350 }}>
          <CustomTabs
            value={tabs.value}
            onChange={tabs.onChange}
            sx={{ 
              borderRadius: 1 //,
              // bgcolor: 'background.paper',
              // boxShadow: '0 1px 3px rgba(0,0,0,0.12)'
            }}
          >
            {TABS.map((tab) => (
              <Tab 
                key={tab.value} 
                value={tab.value} 
                label={tab.label}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}
              />
            ))}
          </CustomTabs>
        </Box>

        {/* Boutons d'exportation - Adaptatifs selon l'onglet */}
        <ExportButtons currentTab={tabs.value} />

        {/* Contenu des onglets */}
        {tabs.value === 'invites' && (
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
        )}

        {tabs.value === 'participants' && (
          <ParticipantsTable
            participants={participants}
            setSnackbar={setSnackbar}
          />
        )}

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
            © 2024 EVENTQUORUM EVENTS. Powered by FX_LABS SARL.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Typography variant="body2" color="text.secondary" component="button" sx={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              textDecoration: 'underline',
              '&:hover': { color: 'primary.main' }
            }}>
              Confidentialité
            </Typography>
            <Typography variant="body2" color="text.secondary" component="button" sx={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              textDecoration: 'underline',
              '&:hover': { color: 'primary.main' }
            }}>
              Aide
            </Typography>
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