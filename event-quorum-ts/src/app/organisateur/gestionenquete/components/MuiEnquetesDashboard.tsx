// File: src/app/organisateur/gestionenquete/components/MuiEnquetesDashboard.tsx

'use client'

// Import des types
import type { Enquete } from 'src/sections/gestionEnquete/components/EnqueteTableRow';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

import EnqueteTable from 'src/sections/gestionEnquete/components/EnqueteTable';
// Import des composants modulaires
import EnqueteStatsWidgets from 'src/sections/gestionEnquete/components/EnqueteStatsWidgets';

import DeleteConfirmationModal from './DeleteConfirmationModal';

interface MuiEnquetesDashboardProps {
  enquetes: Enquete[];
}

/**
 * Composant Dashboard pour la gestion des enquêtes - Version refactorisée
 * Affiche la liste des enquêtes avec filtres, recherche et actions CRUD
 * 
 * Architecture modulaire :
 * - EnqueteStatsWidgets : Widgets de statistiques
 * - EnqueteTable : Tableau avec filtres et pagination
 * - EnqueteTableRow : Ligne individuelle du tableau
 * - EnqueteFilters : Filtres et recherche
 */
const MuiEnquetesDashboard: React.FC<MuiEnquetesDashboardProps> = ({ enquetes: initialEnquetes }) => {
  const router = useRouter();

  // États pour la gestion des données et filtres
  const [enquetes, setEnquetes] = useState<Enquete[]>(initialEnquetes);
  const [searchTerm, setSearchTerm] = useState('');
  const [statutFilter, setStatutFilter] = useState('');
  const [activiteFilter, setActiviteFilter] = useState('');
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dense, setDense] = useState(false);

  // États pour la gestion du modal de suppression et alerte de succès
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [enqueteToDelete, setEnqueteToDelete] = useState<Enquete | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // ===========================================
  // GESTIONNAIRES DE NAVIGATION
  // ===========================================

  /**
   * Navigation vers la page de détail d'une enquête
   */
  const handleViewEnquete = (enqueteId: number) => {
    router.push(`/organisateur/gestionenquete/${enqueteId}`);
  };

  /**
   * Navigation vers la page de modification d'une enquête
   */
  const handleEditEnquete = (enqueteId: number) => {
    router.push(`/organisateur/gestionenquete/${enqueteId}/modifier`);
  };

  /**
   * Navigation vers la page de création d'une nouvelle enquête
   */
  const handleCreateEnquete = () => {
    router.push('/organisateur/gestionenquete/nouveau');
  };

  // ===========================================
  // GESTIONNAIRES DE SUPPRESSION
  // ===========================================

  /**
   * Ouvre le modal de confirmation de suppression
   */
  const handleDeleteClick = (enquete: Enquete) => {
    setEnqueteToDelete(enquete);
    setDeleteModalOpen(true);
  };

  /**
   * Ferme le modal de suppression
   */
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setEnqueteToDelete(null);
  };

  /**
   * Confirme et exécute la suppression de l'enquête
   */
  const handleConfirmDelete = () => {
    if (enqueteToDelete) {
      // Suppression de l'enquête de la liste
      const updatedEnquetes = enquetes.filter(e => e.id !== enqueteToDelete.id);
      setEnquetes(updatedEnquetes);

      // Mise à jour de la sélection si l'enquête supprimée était sélectionnée
      setSelected(prev => prev.filter(id => id !== enqueteToDelete.id));

      console.log('Enquête supprimée:', enqueteToDelete.id);
      // TODO: Appel API pour supprimer l'enquête

      // Affichage de l'alerte de succès
      setShowSuccessAlert(true);

      // Fermeture du modal
      setEnqueteToDelete(null);
    }
  };

  /**
   * Ferme l'alerte de succès
   */
  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  // ===========================================
  // GESTIONNAIRES DE SÉLECTION
  // ===========================================

  /**
   * Gestion de la sélection multiple d'enquêtes
   */
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = filteredEnquetes.map((enquete) => enquete.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  /**
   * Gestion de la sélection d'une enquête individuelle
   */
  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  // ===========================================
  // GESTIONNAIRES DE PAGINATION
  // ===========================================

  /**
   * Gestion du changement de page
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  /**
   * Gestion du changement du nombre de lignes par page
   */
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // ===========================================
  // LOGIQUE DE FILTRAGE
  // ===========================================

  /**
   * Filtrage des enquêtes selon les critères de recherche et filtres
   */
  const filteredEnquetes = enquetes.filter(enquete => {
    // Normalise les activités en tableau pour le filtrage
    const activites = Array.isArray(enquete.activite) ? enquete.activite : [enquete.activite];
    const activiteText = activites.join(' ').toLowerCase();

    // Recherche dans titre, activités et code
    const matchesSearch = enquete.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activiteText.includes(searchTerm.toLowerCase()) ||
      enquete.code.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtre par statut
    const matchesStatut = statutFilter === '' || enquete.statut === statutFilter;

    // Filtre par activité (vérifie si l'activité correspond à une des activités de l'enquête)
    const matchesActivite = activiteFilter === '' || activites.includes(activiteFilter);

    return matchesSearch && matchesStatut && matchesActivite;
  });

  /**
   * Extraction des valeurs uniques pour les filtres
   */
  const uniqueStatuts = ['Terminé', 'En cours', 'Non démarré'];

  // ✅ Extraction des activités uniques (gère les tableaux)
  const uniqueActivites = [...new Set(
    enquetes.flatMap(enquete =>
      Array.isArray(enquete.activite) ? enquete.activite : [enquete.activite]
    )
  )];

  /**
   * Calcul des statistiques pour les widgets
   */
  const stats = {
    totalEnquetes: enquetes.length,
    enquetesEnCours: enquetes.filter(e => e.statut === 'En cours').length,
    enquetesNonDemarrees: enquetes.filter(e => e.statut === 'Non démarré').length,
    enquetesTerminees: enquetes.filter(e => e.statut === 'Terminé').length,
  };

  // ===========================================
  // RENDU PRINCIPAL
  // ===========================================
  return (
    <Box sx={{ p: 3, backgroundColor: '#ffff', minHeight: '100vh' }}>
      {/* Titre principal */}
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
        Gestion des Enquêtes
      </Typography>

      {/* Widgets de statistiques */}
      <EnqueteStatsWidgets
        totalEnquetes={stats.totalEnquetes}
        enquetesEnCours={stats.enquetesEnCours}
        enquetesNonDemarrees={stats.enquetesNonDemarrees}
        enquetesTerminees={stats.enquetesTerminees}
      />

      {/* Tableau avec filtres et pagination */}
      <EnqueteTable
        enquetes={enquetes}
        filteredEnquetes={filteredEnquetes}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statutFilter={statutFilter}
        onStatutFilterChange={setStatutFilter}
        activiteFilter={activiteFilter}
        onActiviteFilterChange={setActiviteFilter}
        uniqueStatuts={uniqueStatuts}
        uniqueActivites={uniqueActivites}
        selected={selected}
        onSelectAll={handleSelectAllClick}
        onSelectOne={handleClick}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        dense={dense}
        onDenseChange={setDense}
        onView={handleViewEnquete}
        onEdit={handleEditEnquete}
        onDelete={handleDeleteClick}
        onCreateClick={handleCreateEnquete}
      />

      {/* Modal de confirmation de suppression */}
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Êtes-vous sûr de supprimer cette enquête ?"
        message="Vous ne pourrez pas annuler cette action !"
      />

      {/* Alert de succès pour la suppression */}
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={4000}
        onClose={handleCloseSuccessAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 8 }}
      >
        <Alert
          onClose={handleCloseSuccessAlert}
          severity="success"
          sx={{
            width: '100%',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          Enquête supprimée avec succès !
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default MuiEnquetesDashboard;
export type { Enquete };