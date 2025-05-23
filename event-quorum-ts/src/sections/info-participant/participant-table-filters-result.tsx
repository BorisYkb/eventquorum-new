import type { IParticipantTableFilters } from 'src/types/participant';
import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { FiltersResultProps } from 'src/components/filters-result';

import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

type Props = FiltersResultProps & {
  onResetPage: () => void;
  filters: UseSetStateReturn<IParticipantTableFilters>;
  activeTab?: string;
};

export function ParticipantTableFiltersResult({ 
  filters, 
  onResetPage, 
  totalResults, 
  activeTab = 'demandes',
  sx 
}: Props) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    updateFilters({ name: '' });
  }, [onResetPage, updateFilters]);

  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    updateFilters({ status: 'all' });
  }, [onResetPage, updateFilters]);

  const handleRemoveActivity = useCallback(() => {
    onResetPage();
    updateFilters({ activity: 'all' });
  }, [onResetPage, updateFilters]);

  const handleRemoveConnectionStatus = useCallback(() => {
    onResetPage();
    updateFilters({ connectionStatus: 'all' });
  }, [onResetPage, updateFilters]);

  const handleRemovePurchaseStatus = useCallback(() => {
    onResetPage();
    updateFilters({ purchaseStatus: 'all' });
  }, [onResetPage, updateFilters]);

  const handleReset = useCallback(() => {
    onResetPage();
    resetFilters();
  }, [onResetPage, resetFilters]);

  // Fonction pour obtenir le label du statut selon l'onglet
  const getStatusLabel = (status: string) => {
    if (status === 'all') return '';
    
    switch (activeTab) {
      case 'demandes':
        switch (status) {
          case 'acceptée': return 'Acceptée';
          case 'rejetée': return 'Rejetée';
          case 'en attente': return 'En attente';
          default: return status;
        }
      case 'invites':
        switch (status) {
          case 'connecté': return 'Connecté';
          case 'non connecté': return 'Non connecté';
          case 'première connexion': return 'Première connexion';
          case 'pas de première connexion': return 'Pas de première connexion';
          case 'achat effectué': return 'Achat effectué';
          case 'pas d\'achat effectué': return 'Pas d\'achat effectué';
          default: return status;
        }
      case 'participants':
        switch (status) {
          case 'en présentiel': return 'En présentiel';
          case 'en ligne': return 'En ligne';
          default: return status;
        }
      default:
        return status;
    }
  };

  // Fonction pour obtenir le label d'activité
  const getActivityLabel = (activity: string) => {
    if (activity === 'all') return '';
    switch (activity) {
      case 'activité 1': return 'Activité 1';
      case 'activité 2': return 'Activité 2';
      default: return activity;
    }
  };

  // Fonction pour obtenir le label de statut de connexion
  const getConnectionLabel = (status: string) => {
    if (status === 'all') return '';
    switch (status) {
      case 'connecté': return 'Connectés';
      case 'non connecté': return 'Non connectés';
      default: return status;
    }
  };

  // Fonction pour obtenir le label de première connexion/achat
  const getPurchaseLabel = (status: string) => {
    if (status === 'all') return '';
    switch (status) {
      case 'oui': return 'Première connexion';
      case 'non': return 'Pas de première connexion';
      default: return status;
    }
  };

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      {/* Filtre par mot-clé (présent dans tous les onglets) */}
      <FiltersBlock label="Recherche:" isShow={!!currentFilters.name}>
        <Chip 
          {...chipProps} 
          label={currentFilters.name} 
          onDelete={handleRemoveKeyword} 
        />
      </FiltersBlock>

      {/* Filtre par statut (présent dans tous les onglets) */}
      <FiltersBlock 
        label="Statut:" 
        isShow={!!(currentFilters.status && currentFilters.status !== 'all')}
      >
        <Chip 
          {...chipProps} 
          label={getStatusLabel(currentFilters.status || '')} 
          onDelete={handleRemoveStatus} 
        />
      </FiltersBlock>

      {/* Filtre par activité (présent dans les onglets invités et participants) */}
      {(activeTab === 'invites' || activeTab === 'participants') && (
        <FiltersBlock 
          label="Activité:" 
          isShow={!!(currentFilters.activity && currentFilters.activity !== 'all')}
        >
          <Chip 
            {...chipProps} 
            label={getActivityLabel(currentFilters.activity || '')} 
            onDelete={handleRemoveActivity} 
          />
        </FiltersBlock>
      )}

      {/* Filtre par statut de connexion (présent uniquement dans l'onglet invités) */}
      {activeTab === 'invites' && (
        <FiltersBlock 
          label="Connexion:" 
          isShow={!!(currentFilters.connectionStatus && currentFilters.connectionStatus !== 'all')}
        >
          <Chip 
            {...chipProps} 
            label={getConnectionLabel(currentFilters.connectionStatus || '')} 
            onDelete={handleRemoveConnectionStatus} 
          />
        </FiltersBlock>
      )}

      {/* Filtre par première connexion (présent uniquement dans l'onglet invités) */}
      {activeTab === 'invites' && (
        <FiltersBlock 
          label="Première connexion:" 
          isShow={!!(currentFilters.purchaseStatus && currentFilters.purchaseStatus !== 'all')}
        >
          <Chip 
            {...chipProps} 
            label={getPurchaseLabel(currentFilters.purchaseStatus || '')} 
            onDelete={handleRemovePurchaseStatus} 
          />
        </FiltersBlock>
      )}
    </FiltersResult>
  );
}