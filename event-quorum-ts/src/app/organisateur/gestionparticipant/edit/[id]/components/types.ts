// Types pour la modification de participants

export type IParticipantEditItem = {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  motDePasse: string;
  activites: string[]; // Activités sélectionnées
};

export type ActivityOption = {
  value: string;
  label: string;
};