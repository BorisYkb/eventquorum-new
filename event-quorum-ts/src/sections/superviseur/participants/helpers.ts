// src/sections/superviseur/participants/helpers.ts

/**
 * Fonctions utilitaires pour le module superviseur
 */

import type { SuperviseurParticipant, ActiveFilters } from './types';

/**
 * Filtre les participants selon les critères spécifiés
 */
export const filterParticipants = (
    participants: SuperviseurParticipant[],
    filters: ActiveFilters & { searchTerm?: string }
): SuperviseurParticipant[] => {
    let filtered = [...participants];

    // Filtre de recherche
    if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        filtered = filtered.filter(
            (p) =>
                p.nom.toLowerCase().includes(term) ||
                p.prenom.toLowerCase().includes(term) ||
                p.email.toLowerCase().includes(term) ||
                p.telephone.includes(term)
        );
    }

    // Filtre par activité
    if (filters.activityFilter) {
        filtered = filtered.filter((p) => p.activite === filters.activityFilter);
    }

    // Filtre par première connexion
    if (filters.firstConnectionFilter) {
        if (filters.firstConnectionFilter === 'effectuee') {
            filtered = filtered.filter((p) => p.connecte === true);
        } else if (filters.firstConnectionFilter === 'non_effectuee') {
            filtered = filtered.filter((p) => p.connecte === false);
        }
    }

    // Filtre par type de connexion
    if (filters.connectionTypeFilter) {
        filtered = filtered.filter((p) => p.typeConnexion === filters.connectionTypeFilter);
    }

    // Filtre par émargement
    if (filters.emargementFilter) {
        if (filters.emargementFilter === 'signed') {
            filtered = filtered.filter((p) => p.emargement !== null);
        } else if (filters.emargementFilter === 'not_signed') {
            filtered = filtered.filter((p) => p.emargement === null);
        }
    }

    // Filtre par checking
    if (filters.checkingFilter && filters.activityFilter) {
        if (filters.checkingFilter === 'checked') {
            filtered = filtered.filter(
                (p) =>
                    p.typeConnexion === 'en présentiel' &&
                    p.emargement !== null &&
                    p.checking === true
            );
        } else if (filters.checkingFilter === 'not_checked') {
            filtered = filtered.filter(
                (p) =>
                    p.typeConnexion === 'en présentiel' &&
                    (p.emargement === null || p.checking !== true)
            );
        } else if (filters.checkingFilter === 'not_applicable') {
            filtered = filtered.filter((p) => p.typeConnexion === 'en ligne');
        }
    }

    return filtered;
};

/**
 * Calcule les statistiques des participants
 */
export const calculateStatistics = (participants: SuperviseurParticipant[]) => {
    const total = participants.length;
    const connectes = participants.filter((p) => p.connecte).length;
    const nonConnectes = total - connectes;
    const emarges = participants.filter((p) => p.emargement !== null).length;
    const nonEmarges = total - emarges;
    const enLigne = participants.filter((p) => p.typeConnexion === 'en ligne').length;
    const enPresentiel = participants.filter((p) => p.typeConnexion === 'en présentiel').length;
    const checked = participants.filter((p) => p.checking === true).length;
    const notChecked = enPresentiel - checked;

    // Par activité
    const activites = [...new Set(participants.map((p) => p.activite))];
    const parActivite = activites.reduce((acc, activite) => {
        acc[activite] = participants.filter((p) => p.activite === activite).length;
        return acc;
    }, {} as Record<string, number>);

    return {
        total,
        connectes,
        nonConnectes,
        emarges,
        nonEmarges,
        enLigne,
        enPresentiel,
        checked,
        notChecked,
        parActivite,
        tauxConnexion: total > 0 ? (connectes / total) * 100 : 0,
        tauxEmargement: total > 0 ? (emarges / total) * 100 : 0,
        tauxChecking: enPresentiel > 0 ? (checked / enPresentiel) * 100 : 0,
    };
};

/**
 * Détermine si le checking est applicable pour un participant
 */
export const isCheckingApplicable = (participant: SuperviseurParticipant): boolean => {
    return participant.typeConnexion === 'en présentiel';
};

/**
 * Détermine le statut de checking d'un participant
 */
export const getCheckingStatus = (
    participant: SuperviseurParticipant
): 'not_applicable' | 'not_signed' | 'checked' | 'signed_not_checked' => {
    if (participant.typeConnexion === 'en ligne') {
        return 'not_applicable';
    }

    if (!participant.emargement) {
        return 'not_signed';
    }

    if (participant.checking === true) {
        return 'checked';
    }

    return 'signed_not_checked';
};

/**
 * Formate le nom complet d'un participant
 */
export const getFullName = (participant: SuperviseurParticipant): string => {
    return `${participant.nom} ${participant.prenom}`;
};

/**
 * Obtient les initiales d'un participant
 */
export const getInitials = (participant: SuperviseurParticipant): string => {
    return `${participant.prenom.charAt(0)}${participant.nom.charAt(0)}`.toUpperCase();
};

/**
 * Valide une adresse email
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Formate un numéro de téléphone
 */
export const formatPhoneNumber = (phone: string): string => {
    // Format: 01 01 01 01 01
    return phone.replace(/(\d{2})(?=\d)/g, '$1 ').trim();
};

/**
 * Génère un nom de fichier d'export
 */
export const generateExportFilename = (
    format: 'pdf' | 'excel',
    filters?: ActiveFilters
): string => {
    const date = new Date().toISOString().split('T')[0];
    const extension = format === 'pdf' ? 'pdf' : 'xlsx';

    let filename = `invites_${date}`;

    if (filters?.activityFilter) {
        filename += `_${filters.activityFilter}`;
    }

    return `${filename}.${extension}`;
};

/**
 * Trie les participants par nom
 */
export const sortByName = (
    participants: SuperviseurParticipant[],
    order: 'asc' | 'desc' = 'asc'
): SuperviseurParticipant[] => {
    return [...participants].sort((a, b) => {
        const nameA = getFullName(a).toLowerCase();
        const nameB = getFullName(b).toLowerCase();

        if (order === 'asc') {
            return nameA.localeCompare(nameB);
        }
        return nameB.localeCompare(nameA);
    });
};

/**
 * Trie les participants par date de connexion (simulé)
 */
export const sortByConnection = (
    participants: SuperviseurParticipant[],
    order: 'asc' | 'desc' = 'asc'
): SuperviseurParticipant[] => {
    return [...participants].sort((a, b) => {
        if (order === 'asc') {
            return Number(a.connecte) - Number(b.connecte);
        }
        return Number(b.connecte) - Number(a.connecte);
    });
};

/**
 * Groupe les participants par activité
 */
export const groupByActivity = (
    participants: SuperviseurParticipant[]
): Record<string, SuperviseurParticipant[]> => {
    return participants.reduce((acc, participant) => {
        if (!acc[participant.activite]) {
            acc[participant.activite] = [];
        }
        acc[participant.activite].push(participant);
        return acc;
    }, {} as Record<string, SuperviseurParticipant[]>);
};

/**
 * Groupe les participants par type de connexion
 */
export const groupByConnectionType = (
    participants: SuperviseurParticipant[]
): Record<string, SuperviseurParticipant[]> => {
    return participants.reduce((acc, participant) => {
        if (!acc[participant.typeConnexion]) {
            acc[participant.typeConnexion] = [];
        }
        acc[participant.typeConnexion].push(participant);
        return acc;
    }, {} as Record<string, SuperviseurParticipant[]>);
};

/**
 * Vérifie si tous les filtres sont vides
 */
export const areFiltersEmpty = (filters: ActiveFilters & { searchTerm?: string }): boolean => {
    return (
        !filters.searchTerm &&
        !filters.activityFilter &&
        !filters.firstConnectionFilter &&
        !filters.connectionTypeFilter &&
        !filters.emargementFilter &&
        !filters.checkingFilter
    );
};

/**
 * Réinitialise tous les filtres
 */
export const resetFilters = (): ActiveFilters & { searchTerm: string } => {
    return {
        searchTerm: '',
        activityFilter: '',
        firstConnectionFilter: '',
        connectionTypeFilter: '',
        emargementFilter: '',
        checkingFilter: '',
    };
};

/**
 * Compte le nombre de filtres actifs
 */
export const countActiveFilters = (filters: ActiveFilters & { searchTerm?: string }): number => {
    let count = 0;

    if (filters.searchTerm) count++;
    if (filters.activityFilter) count++;
    if (filters.firstConnectionFilter) count++;
    if (filters.connectionTypeFilter) count++;
    if (filters.emargementFilter) count++;
    if (filters.checkingFilter) count++;

    return count;
};

/**
 * Convertit les filtres en paramètres d'URL
 */
export const filtersToQueryParams = (filters: ActiveFilters & { searchTerm?: string }): string => {
    const params = new URLSearchParams();

    if (filters.searchTerm) params.append('search', filters.searchTerm);
    if (filters.activityFilter) params.append('activity', filters.activityFilter);
    if (filters.firstConnectionFilter) params.append('firstConnection', filters.firstConnectionFilter);
    if (filters.connectionTypeFilter) params.append('connectionType', filters.connectionTypeFilter);
    if (filters.emargementFilter) params.append('emargement', filters.emargementFilter);
    if (filters.checkingFilter) params.append('checking', filters.checkingFilter);

    return params.toString();
};

/**
 * Récupère les filtres depuis les paramètres d'URL
 */
export const queryParamsToFilters = (searchParams: URLSearchParams): ActiveFilters & { searchTerm: string } => {
    return {
        searchTerm: searchParams.get('search') || '',
        activityFilter: searchParams.get('activity') || '',
        firstConnectionFilter: searchParams.get('firstConnection') || '',
        connectionTypeFilter: searchParams.get('connectionType') || '',
        emargementFilter: searchParams.get('emargement') || '',
        checkingFilter: searchParams.get('checking') || '',
    };
};

/**
 * Exporte les données en format CSV (pour simulation)
 */
export const exportToCSV = (
    participants: SuperviseurParticipant[],
    filters?: ActiveFilters
): string => {
    const headers = [
        'Nom',
        'Prénom',
        'Téléphone',
        'Email',
        'Type de participation',
        '1ère connexion',
        'Émargement',
        'Activité',
        'Checking',
    ];

    const rows = participants.map((p) => [
        p.nom,
        p.prenom,
        p.telephone,
        p.email,
        p.typeConnexion,
        p.connecte ? 'Oui' : 'Non',
        p.emargement ? 'Oui' : 'Non',
        p.activite,
        p.checking ? 'Oui' : 'Non',
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');

    return csvContent;
};

/**
 * Télécharge un fichier
 */
export const downloadFile = (content: string, filename: string, mimeType: string): void => {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};