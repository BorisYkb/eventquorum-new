// Types pour la gestion des participants

export type Participant = {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  connecte: boolean;
  emargement: string | null; // URL de la signature ou null si pas signé
  activite: string;
};

export type ExportOption = {
  value: string;
  label: string;
};

export type Activity = {
  value: string;
  label: string;
};

export type ParticipantFilters = {
  searchTerm: string;
  activityFilter: string;
};

export type PaginationState = {
  page: number;
  rowsPerPage: number;
};

export type TableState = {
  selectedParticipants: number[];
  signatureEnabled: boolean;
};