// src/sections/superviseur/participants/constants.ts

/**
 * Constantes pour le module superviseur
 * Centralise toutes les options et configurations
 */

/**
 * Liste des activités disponibles
 */
export const SUPERVISEUR_ACTIVITIES = [
    { value: '', label: 'Toutes les activités' },
    { value: 'conference', label: 'Conférence principale' },
    { value: 'workshop', label: 'Atelier pratique' },
    { value: 'networking', label: 'Session networking' },
    { value: 'cocktail', label: 'Cocktail de clôture' },
] as const;

/**
 * Options de filtre pour la première connexion
 */
export const FIRST_CONNECTION_OPTIONS = [
    { value: '', label: 'Toutes' },
    { value: 'effectuee', label: '1ère connexion effectuée' },
    { value: 'non_effectuee', label: '1ère connexion non effectuée' },
] as const;

/**
 * Options de filtre pour le type de connexion
 */
export const CONNECTION_TYPE_OPTIONS = [
    { value: '', label: 'Tout' },
    { value: 'en ligne', label: 'En ligne' },
    { value: 'en présentiel', label: 'En présentiel' },
] as const;

/**
 * Options de filtre pour l'émargement
 */
export const EMARGEMENT_OPTIONS = [
    { value: '', label: 'Tous' },
    { value: 'signed', label: 'Émargé' },
    { value: 'not_signed', label: 'Non émargé' },
] as const;

/**
 * Options de filtre pour le checking
 */
export const CHECKING_OPTIONS = [
    { value: '', label: 'Tous' },
    { value: 'checked', label: 'Dans la salle' },
    { value: 'not_checked', label: 'Pas dans la salle' },
    { value: 'not_applicable', label: 'Non applicable' },
] as const;

/**
 * Options d'export
 */
export const EXPORT_OPTIONS = [
    { value: 'pdf', label: 'Exporter en PDF' },
    { value: 'excel', label: 'Exporter en Excel' },
] as const;

/**
 * Options de pagination
 */
export const PAGINATION_OPTIONS = [5, 10, 25, 50, 100] as const;

/**
 * Pagination par défaut
 */
export const DEFAULT_ROWS_PER_PAGE = 10;

/**
 * Configuration des colonnes du tableau
 */
export const TABLE_COLUMNS = {
    checkbox: { width: 50, padding: 'checkbox' },
    nomPrenom: { width: 200, label: 'Nom & Prénoms' },
    telephone: { width: 120, label: 'Téléphone' },
    email: { width: 180, label: 'Email' },
    participation: { width: 150, label: 'Participation' },
    premiereConnexion: { width: 120, label: '1ère Connexion' },
    emargement: { width: 120, label: 'Émargement' },
    checking: { width: 100, label: 'Checking', align: 'center' },
    actions: { width: 120, label: 'Actions' },
} as const;

/**
 * Messages de tooltip
 */
export const TOOLTIPS = {
    view: 'Voir les détails',
    export: 'Exporter les données filtrées',
    firstConnectionDone: '1ère connexion effectuée',
    firstConnectionNotDone: '1ère connexion non effectuée',
    checking: {
        notApplicable: 'Non applicable (participant en ligne)',
        notSigned: 'Non émargé - Pas encore dans la salle',
        checked: 'Présent dans la salle (confirmé)',
        signedButNotChecked: 'Émargé mais pas encore dans la salle',
    },
} as const;

/**
 * Labels des filtres
 */
export const FILTER_LABELS = {
    activity: 'Filtrer par activité',
    firstConnection: '1ère connexion',
    connectionType: 'Type de participation',
    emargement: 'Émargement',
    checking: 'Checking',
    search: 'Rechercher...',
} as const;

/**
 * Configuration des couleurs pour les chips
 */
export const CHIP_COLORS = {
    enLigne: {
        backgroundColor: 'success.lighter',
        color: 'success.main',
    },
    enPresentiel: {
        backgroundColor: 'warning.lighter',
        color: 'warning.main',
    },
} as const;

/**
 * Configuration des icônes de statut
 */
export const STATUS_ICONS = {
    connected: {
        color: 'success.main',
        size: 12,
    },
    notConnected: {
        color: 'error.main',
        size: 12,
    },
    checking: {
        checked: {
            color: 'success.main',
            size: 24,
        },
        notChecked: {
            color: 'grey.400',
            size: 24,
        },
        notApplicable: {
            color: 'error.main',
            size: 24,
        },
    },
} as const;

/**
 * Configuration de la signature (émargement)
 */
export const SIGNATURE_CONFIG = {
    display: {
        width: 80,
        height: 40,
        borderRadius: 1,
    },
    placeholder: 'Non signé',
} as const;

/**
 * Configuration des boutons d'export
 */
export const EXPORT_BUTTON_CONFIG = {
    bgcolor: '#000',
    color: 'white',
    hoverBgcolor: '#333',
    borderRadius: 1,
    textTransform: 'none',
    fontWeight: 600,
} as const;

/**
 * Messages de log pour le développement
 */
export const DEV_MESSAGES = {
    exportPDF: 'Export PDF en cours...',
    exportExcel: 'Export Excel en cours...',
    viewDetails: (id: number) => `Voir détails invité: ${id}`,
    filtersChanged: 'Filtres modifiés',
} as const;

/**
 * Configuration du tableau
 */
export const TABLE_CONFIG = {
    minWidth: 960,
    sizeSmall: 'small',
    sizeMedium: 'medium',
    rowHeight: {
        dense: 56,
        normal: 76,
    },
} as const;

/**
 * Types d'export
 */
export type ExportType = typeof EXPORT_OPTIONS[number]['value'];

/**
 * Types d'activité
 */
export type ActivityType = typeof SUPERVISEUR_ACTIVITIES[number]['value'];

/**
 * Types de connexion
 */
export type ConnectionType = typeof CONNECTION_TYPE_OPTIONS[number]['value'];

/**
 * Types d'émargement
 */
export type EmargementType = typeof EMARGEMENT_OPTIONS[number]['value'];

/**
 * Types de checking
 */
export type CheckingType = typeof CHECKING_OPTIONS[number]['value'];