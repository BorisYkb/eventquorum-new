// src/app/operateur/admission-activite/types.ts

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

export interface ActiviteData {
  id: string;
  nom: string;
  description?: string;
  dateDebut: string;
  dateFin: string;
  lieu?: string;
  capaciteMax?: number;
  participantsInscrits: number;
  participantsConfirmes: number;
}

export interface AdmissionActiviteFilters {
  activiteId: string;
  statut: 'tous' | 'confirmes' | 'non-confirmes';
  recherche: string;
}