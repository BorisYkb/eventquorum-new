// src/types/participant.ts
export interface IParticipantItem {
  id: string;
  nom_prenom: string;
  email: string;
  telephone: string;
  date: string;
  statut: 'acceptée' | 'rejetée' | 'en attente' | 'participé';
}

export interface IParticipantTableFilters {
  name: string;
  status: string;
}