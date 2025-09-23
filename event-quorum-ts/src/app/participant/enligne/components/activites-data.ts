// src/app/participant/enligne/components/activites-data.ts

import type { Activite } from './activites-selection';

// ----------------------------------------------------------------------

/**
 * Données des activités disponibles pour la sélection
 */
export const ACTIVITES_DISPONIBLES: Activite[] = [
    {
        id: '1',
        time: '09H00 - 10H00',
        title: 'CÉRÉMONIE D\'OUVERTURE OFFICIELLE',
        description: 'Cérémonie officielle présidée par S.E.M. ALASSANE OUATTARA',
        status: 'Non démarré',
        statusColor: 'default',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 5000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 20000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 50000, currency: 'FCFA' },
        ]
    },
    {
        id: '2',
        time: '10H00 - 11H00',
        title: 'POINT DE PRESSE',
        description: 'Conférence de presse avec les organisateurs',
        status: 'Non démarré',
        statusColor: 'default',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 5000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 10000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 15000, currency: 'FCFA' },
        ]
    },
    {
        id: '3',
        time: '11H00 - 12H00',
        title: 'PANEL DE HAUT NIVEAU',
        description: 'Table ronde avec les experts du secteur',
        status: 'En cours',
        statusColor: 'warning',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 10000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 20000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 30000, currency: 'FCFA' },
        ]
    },
    {
        id: '4',
        time: '12H00 - 13H00',
        title: 'PAUSE CAFE',
        description: 'Pause networking avec les participants',
        status: 'Non démarré',
        statusColor: 'default',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 5000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 20000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 50000, currency: 'FCFA' },
        ]
    },
    {
        id: '5',
        time: '13H00 - 14H00',
        title: 'COOLING BREAK',
        description: 'Moment de détente et échanges informels',
        status: 'Non démarré',
        statusColor: 'default',
        priceOptions: [
            { id: 'Standard', label: 'Gratuit', price: 0, currency: 'FCFA' },
            
        ]
    },
    {
        id: '6',
        time: '14H00 - 15H00',
        title: 'WORKSHOP',
        description: 'Atelier pratique sur les innovations agricoles',
        status: 'Non démarré',
        statusColor: 'default',
        priceOptions: [
            { id: 'standard', label: 'Standard', price: 15000, currency: 'FCFA' },
            { id: 'vip', label: 'VIP', price: 25000, currency: 'FCFA' },
            { id: 'vvip', label: 'VVIP', price: 4000, currency: 'FCFA' },
        ]
    },
];