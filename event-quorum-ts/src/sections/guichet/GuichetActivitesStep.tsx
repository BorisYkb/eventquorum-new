// File: src/sections/guichet/GuichetActivitesStep.tsx

'use client';

/**
 * COMPOSANT: GuichetActivitesStep
 * 
 * Étape de sélection des activités pour un participant au guichet
 * Identique à la page participant en ligne mais SANS les méthodes de paiement
 * (le paiement est encaissé directement par l'agent)
 * 
 * Supporte également le mode "modification" où certaines activités
 * sont désactivées (déjà payées) et affichées en grisé
 */

import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Import des composants réutilisables
import { ActivitesSelection } from './activites-selection';
import { GuichetActivitesSummary } from './GuichetActivitesSummary'; // Version guichet du résumé

// Import des données
import { ACTIVITES_DISPONIBLES } from './activites-data';

// Import des types
import type { SelectedActivite } from './activites-selection';

// ============================================
// TYPES
// ============================================
interface GuichetActivitesStepProps {
    /** Activités sélectionnées */
    selectedActivites: SelectedActivite[];

    /** Callback pour mettre à jour les activités */
    onActivitesChange: (activites: SelectedActivite[]) => void;

    /** Montant total (pour les nouvelles activités uniquement en mode modification) */
    totalAmount: number;

    /** Liste des IDs d'activités à désactiver (déjà payées) - optionnel */
    disabledActivities?: string[];
}

// ============================================
// COMPOSANT
// ============================================
export function GuichetActivitesStep({
    selectedActivites,
    onActivitesChange,
    totalAmount,
    disabledActivities = [], // Par défaut, aucune activité désactivée
}: GuichetActivitesStepProps) {

    // ============================================
    // HANDLERS
    // ============================================

    /**
     * Gère le toggle d'une activité
     * Empêche de désélectionner les activités déjà payées
     */
    const handleActiviteToggle = (activiteId: string) => {
        // Vérifier si l'activité est désactivée (déjà payée)
        if (disabledActivities.includes(activiteId)) {
            // Ne rien faire si l'activité est déjà payée
            return;
        }

        const activite = ACTIVITES_DISPONIBLES.find((a) => a.id === activiteId);

        // Cas 1: Activité avec priceOptions === null = accès déjà inclus
        const hasNoPriceOptions = activite && activite.priceOptions === null;

        // Cas 2: Activité gratuite = tous les prix sont à 0
        const isFreeActivity =
            activite?.priceOptions &&
            activite.priceOptions.length > 0 &&
            activite.priceOptions.every((opt) => opt.price === 0);

        const existingIndex = selectedActivites.findIndex((item) => item.activityId === activiteId);

        if (existingIndex >= 0) {
            // Désélectionner l'activité (seulement si pas désactivée)
            onActivitesChange(selectedActivites.filter((item) => item.activityId !== activiteId));
        } else {
            // Sélectionner l'activité avec le bon standing par défaut
            let defaultStanding = 'standard';

            if (hasNoPriceOptions) {
                // Activité sans prix : on met 'included' comme standing (non utilisé visuellement)
                defaultStanding = 'included';
            } else if (isFreeActivity) {
                // Activité gratuite : standing 'gratuit'
                defaultStanding = 'gratuit';
            }

            onActivitesChange([
                ...selectedActivites,
                {
                    activityId: activiteId,
                    selectedStanding: defaultStanding,
                },
            ]);
        }
    };

    /**
     * Gère le changement de standing d'une activité
     * Empêche de modifier le standing des activités déjà payées
     */
    const handleStandingChange = (activiteId: string, standing: string) => {
        // Vérifier si l'activité est désactivée (déjà payée)
        if (disabledActivities.includes(activiteId)) {
            // Ne rien faire si l'activité est déjà payée
            return;
        }

        onActivitesChange(
            selectedActivites.map((item) =>
                item.activityId === activiteId ? { ...item, selectedStanding: standing } : item
            )
        );
    };

    /**
     * Calcule le nombre de nouvelles activités (non désactivées)
     */
    const countNewActivities = () => {
        return selectedActivites.filter((sel) => !disabledActivities.includes(sel.activityId)).length;
    };

    const newActivitiesCount = countNewActivities();

    // ============================================
    // RENDER
    // ============================================
    return (
        <Grid container spacing={{ xs: 2, md: 4 }}>
            {/* Section 1: Sélection des activités (60% largeur) */}
            <Grid size={{ xs: 12, lg: 7 }}>
                <ActivitesSelection
                    activites={ACTIVITES_DISPONIBLES}
                    selectedActivites={selectedActivites}
                    onActiviteToggle={handleActiviteToggle}
                    onStandingChange={handleStandingChange}
                    disabledActivities={disabledActivities} // Passer les activités à désactiver
                />
            </Grid>

            {/* Section 2: Résumé uniquement (40% largeur) - PAS de paiement */}
            <Grid size={{ xs: 12, lg: 5 }}>
                <Stack spacing={3}>
                    {/* Résumé des activités avec gestion des prix selon disabledActivities */}
                    <GuichetActivitesSummary
                        activites={ACTIVITES_DISPONIBLES}
                        selectedActivites={selectedActivites}
                        disabledActivities={disabledActivities} // Pour afficher prix = 0 pour les activités déjà payées
                    />

                </Stack>
            </Grid>
        </Grid>
    );
}