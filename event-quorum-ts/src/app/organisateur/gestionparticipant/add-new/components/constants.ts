//src/app/organisateur/gestionparticipant/add-new/components/constants.ts

import { ActivityOption } from './types';

// Options d'activités disponibles
export const ACTIVITY_OPTIONS: ActivityOption[] = [
  { value: 'conference', label: 'Conférence principale' },
  { value: 'workshop', label: 'Atelier pratique' },
  { value: 'networking', label: 'Session networking' },
  { value: 'cocktail', label: 'Cocktail de clôture' },
];

// Méthodes d'ajout d'invités
export const INVITATION_METHODS = [
  { value: 'manual', label: 'Ajouter un invité manuellement' },
  { value: 'file', label: 'Importer la liste des invités via un fichier' },
  { value: 'bulk', label: 'Importer la liste des invités par activité' },
];

// Messages d'aide pour les uploads
export const UPLOAD_HELP_MESSAGES = {
  file: 'Télécharger un fichier contenant la liste des invités (Excel, CSV)',
  bulk: 'Choisir l\'activité puis télécharger le fichier correspondant',
};