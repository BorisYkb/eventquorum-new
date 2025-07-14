import { ExportOption, Activity } from './types';

// Constantes pour les activités
export const ACTIVITIES: Activity[] = [
  { value: '', label: 'Toutes les activités' },
  { value: 'conference', label: 'Conférence principale' },
  { value: 'workshop', label: 'Atelier pratique' },
  { value: 'networking', label: 'Session networking' },
  { value: 'cocktail', label: 'Cocktail de clôture' },
];

// Options d'exportation pour les invités
export const EXPORT_INVITE_OPTIONS: ExportOption[] = [
  { value: 'pdf-conference', label: 'Conférence principale (PDF)' },
  { value: 'excel-conference', label: 'Conférence principale (Excel)' },
  { value: 'pdf-workshop', label: 'Atelier pratique (PDF)' },
  { value: 'excel-workshop', label: 'Atelier pratique (Excel)' },
  { value: 'pdf-networking', label: 'Session networking (PDF)' },
  { value: 'excel-networking', label: 'Session networking (Excel)' },
  { value: 'pdf-cocktail', label: 'Cocktail de clôture (PDF)' },
  { value: 'excel-cocktail', label: 'Cocktail de clôture (Excel)' },
];

// Options d'exportation pour les présences
export const EXPORT_PRESENCE_OPTIONS: ExportOption[] = [
  { value: 'pdf-conference', label: 'Présence Conférence (PDF)' },
  { value: 'excel-conference', label: 'Présence Conférence (Excel)' },
  { value: 'pdf-workshop', label: 'Présence Atelier (PDF)' },
  { value: 'excel-workshop', label: 'Présence Atelier (Excel)' },
  { value: 'pdf-networking', label: 'Présence Networking (PDF)' },
  { value: 'excel-networking', label: 'Présence Networking (Excel)' },
  { value: 'pdf-cocktail', label: 'Présence Cocktail (PDF)' },
  { value: 'excel-cocktail', label: 'Présence Cocktail (Excel)' },
];

// Options de pagination
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50, 100];