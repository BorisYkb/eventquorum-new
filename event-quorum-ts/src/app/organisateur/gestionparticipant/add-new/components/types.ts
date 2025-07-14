// Types pour l'ajout/modification de participants

export type IParticipantItem = {
  id?: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  activites: string[]; // Activités sélectionnées
  fichierInvite?: File | null; // Fichier d'invitation
  avatarUrl?: string;
  isVerified?: boolean;
  connecte?: boolean;
  emargement?: string | null;
};

export type ActivityOption = {
  value: string;
  label: string;
};

export type InvitationMethod = 'manual' | 'file' | 'bulk';