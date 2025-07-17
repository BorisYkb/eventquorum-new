// src/app/operateur/admissionactivite/components/index.ts

export { ConfirmationActivitePopup } from './confirmation-activite-popup';
export { PresenceConfirmeePopup } from './presence-confirmee-popup';
export { QRScannerActivitePopup } from './qr-scanner-activite-popup';
export { DetailActivitePopup } from './detail-activite-popup';

// Types spécifiques à l'admission d'activité
export interface ParticipantActiviteData {
  id: string;
  nom: string;
  prenom: string;
  statutEmargement: 'Aucun' | 'Physique' | 'En ligne';
  dateHeure: string;
  peutConfirmer: boolean;
  activiteId?: string;
  activiteNom?: string;
  email?: string;
  telephone?: string;
}

export interface ParticipantActiviteInfo {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  activiteNom: string;
}

export interface ParticipantActiviteDetailData {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  statut: 'En ligne' | 'Physique' | 'Aucun';
  dateConfirmation: string;
  heureConfirmation: string;
  signature?: string;
  activiteActuelle?: string;
}