// src/app/participant/enpresentiel/components/activites-data.ts

// ----------------------------------------------------------------------

/**
 * Interface pour une option de prix
 */
export interface PriceOption {
    /** Identifiant unique de l'option de prix */
    id: string;
    /** Libellé affiché pour cette option (Standard, VIP, VVIP) */
    label: string;
    /** Prix de l'option - peut être null si incluse dans le prix global de l'événement */
    price: number | null;
    /** Devise utilisée pour le prix */
    currency: string;
}

/**
 * Interface pour une donnée d'événement
 */
export interface Activite {
    /** Identifiant unique */
    id: string;
    /** Date de l'événement */
    date: string;
    /** Horaire (format: "HH:MM - HH:MM") */
    time: string;
    /** Titre/nom */
    title: string;
    /** Description détaillée */
    description: string;
    /** Lieu où se déroule l'événement */
    lieu: string;
    /** Statut actuel */
    status: 'Non démarré' | 'En cours' | 'Terminé';
    /** Couleur associée au statut pour l'affichage */
    statusColor: 'error' | 'warning' | 'success' | 'info';
    /** Options de prix disponibles */
    priceOptions: PriceOption[];
}

// ----------------------------------------------------------------------

/**
 * Données disponibles pour la sélection
 * Seulement 2 ont des prix null car elles sont incluses dans le prix global de l'événement
 */
export const ACTIVITES_DISPONIBLES: Activite[] = [
    {
        id: '1',
        date: '29 Septembre 2023',
        time: '08H00 - 09H00',
        title: 'ACCUEIL ET ENREGISTREMENT',
        description: 'Accueil des participants et remise des badges d\'accès',
        lieu: 'Hall d\'accueil principal',
        status: 'Non démarré',
        statusColor: 'error',
        // Inclus dans le prix de l'événement - prix null
        priceOptions: [
            { id: 'standard', label: 'Standard', price: null, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: null, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: null, currency: 'FCFA' },
        ]
    },
    {
        id: '2',
        date: '29 Septembre 2023',
        time: '09H00 - 10H00',
        title: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
        description: 'Cérémonie officielle présidée par S.E.M. ALASSANE OUATTARA',
        lieu: 'Salle plénière du site du SARA',
        status: 'Non démarré',
        statusColor: 'error',
        // Inclus dans le prix de l'événement - prix null
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 0, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 0, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 0, currency: 'FCFA' },
        ]
    },
    {
        id: '3',
        date: '29 Septembre 2023',
        time: '10H00 - 11H00',
        title: 'POINT DE PRESSE',
        description: 'Conférence de presse avec les organisateurs et personnalités',
        lieu: 'Salle de conférence A',
        status: 'En cours',
        statusColor: 'warning',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 5000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 10000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 15000, currency: 'FCFA' },
        ]
    },
    {
        id: '4',
        date: '29 Septembre 2023',
        time: '11H00 - 12H00',
        title: 'PANEL DE HAUT NIVEAU',
        description: 'Table ronde avec les experts du secteur agricole',
        lieu: 'Salle principale de conférence',
        status: 'Terminé',
        statusColor: 'success',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 10000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 20000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 30000, currency: 'FCFA' },
        ]
    },
    {
        id: '5',
        date: '29 Septembre 2023',
        time: '15H00 - 16H00',
        title: 'FORMATION FINANCEMENT AGRICOLE',
        description: 'Formation sur les mécanismes de financement rural',
        lieu: 'Salle de formation B',
        status: 'Non démarré',
        statusColor: 'error',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 18000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 25000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 32000, currency: 'FCFA' },
        ]
    },
    {
        id: '6',
        date: '30 Septembre 2023',
        time: '09H00 - 10H00',
        title: 'CONFÉRENCE DÉVELOPPEMENT DURABLE',
        description: 'Discussion sur l\'agriculture durable et l\'environnement',
        lieu: 'Amphithéâtre central',
        status: 'Non démarré',
        statusColor: 'error',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 12000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 18000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 25000, currency: 'FCFA' },
        ]
    },
    {
        id: '7',
        date: '30 Septembre 2023',
        time: '10H00 - 11H00',
        title: 'SESSION QUESTIONS-RÉPONSES',
        description: 'Séance interactive avec les experts et décideurs',
        lieu: 'Salle interactive multimédia',
        status: 'Non démarré',
        statusColor: 'error',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 8000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 12000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 15000, currency: 'FCFA' },
        ]
    },
    {
        id: '8',
        date: '30 Septembre 2023',
        time: '11H00 - 12H00',
        title: 'VISITE GUIDÉE DES STANDS',
        description: 'Découverte des exposants et innovations présentées',
        lieu: 'Pavillons d\'exposition',
        status: 'Non démarré',
        statusColor: 'error',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 5000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 8000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 10000, currency: 'FCFA' },
        ]
    },
    {
        id: '9',
        date: '30 Septembre 2023',
        time: '14H00 - 16H00',
        title: 'FORMATION CERTIFIANTE AGRICULTURE BIO',
        description: 'Formation complète avec certification en agriculture biologique',
        lieu: 'Centre de formation spécialisé',
        status: 'Non démarré',
        statusColor: 'error',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 75000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 95000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 120000, currency: 'FCFA' },
        ]
    },
    {
        id: '10',
        date: '31 Septembre 2023',
        time: '16H00 - 17H00',
        title: 'SÉMINAIRE INVESTISSEMENT AGRICOLE',
        description: 'Opportunités d\'investissement dans l\'agribusiness en Afrique',
        lieu: 'Salle des investisseurs',
        status: 'Non démarré',
        statusColor: 'error',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 35000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 50000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 70000, currency: 'FCFA' },
        ]
    },
    {
        id: '11',
        date: '31 Septembre 2023',
        time: '18H00 - 19H00',
        title: 'COCKTAIL DE CLÔTURE',
        description: 'Réception officielle de fin d\'événement',
        lieu: 'Terrasse panoramique',
        status: 'Non démarré',
        statusColor: 'error',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 20000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 30000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 45000, currency: 'FCFA' },
        ]
    },
    {
        id: '12',
        date: '31 Septembre 2023',
        time: '20H00 - 22H00',
        title: 'SOIRÉE CULTURELLE',
        description: 'Spectacle de musique et danse traditionnelle ivoirienne',
        lieu: 'Scène extérieure principale',
        status: 'Non démarré',
        statusColor: 'error',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 25000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 40000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 60000, currency: 'FCFA' },
        ]
    },
];