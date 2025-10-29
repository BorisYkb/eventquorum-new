// File: src/sections/guichet/index.ts

/**
 * Export centralisé des composants du module Guichet
 * 
 * Ce module permet aux agents de billetterie de :
 * - Ajouter des participants avec leurs activités
 * - Modifier des participants existants (infos + ajouter activités)
 * - Consulter la liste des participants avec filtres
 */

// Composants de formulaire
export { GuichetInfoForm } from './GuichetInfoForm';

// Composants d'étapes
export { GuichetActivitesStep } from './GuichetActivitesStep';
export { GuichetActivitesSummary } from './GuichetActivitesSummary';
export { GuichetSuccessStep } from './GuichetSuccessStep';

// Types réexportés pour faciliter l'import
export type { SelectedActivite } from './activites-selection';