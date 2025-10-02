// src/app/participant/enligne/payer/suivredirecte/page.tsx

'use client';

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

import { SeoIllustration } from 'src/assets/illustrations';

import { AppWelcome } from 'src/app/participant/components/app-welcome-2';
import { DashboardContent } from 'src/layouts/dashboard';

import { AccueilCompactVideo } from './components/accueil-compact-video-ping';
import { ActionButtons } from './components/action-buttons';
import AccueilProgrammeSection2Ping from 'src/app/participant/enligne/payer/suivredirecte/components/accueil-programme-section-2-ping';
import { IntervenantCarousel } from 'src/app/participant/components/intervenant-carousel';
import { Footer } from 'src/app/participant/components/footer';
import { PROGRAMME_DAYS, ProgrammeActivity } from 'src/app/participant/enligne/payer/suivredirecte/components/programme/programme-data';


// ----------------------------------------------------------------------

export default function ParticipantEnresentielPage() {
    // État pour gérer l'activité épinglée
    const [pinnedActivity, setPinnedActivity] = useState<ProgrammeActivity | null>(null);

    /**
     * Fonction pour trouver la première activité "En cours" ou par défaut
     * Utilisée pour l'épinglage initial et le ré-épinglage automatique
     */
    const findDefaultActivity = (): ProgrammeActivity | null => {
        // Cherche une activité "En cours" dans tous les jours du programme
        for (const day of PROGRAMME_DAYS) {
            const currentActivity = day.activities.find(activity => activity.status === 'En cours');
            if (currentActivity) {
                return currentActivity;
            }
        }

        // Si aucune activité "En cours", prendre la première activité du premier jour
        if (PROGRAMME_DAYS.length > 0 && PROGRAMME_DAYS[0].activities.length > 0) {
            return PROGRAMME_DAYS[0].activities[0];
        }

        return null;
    };

    /**
     * Initialise l'activité épinglée par défaut au chargement de la page
     * Sélectionne automatiquement la première activité "En cours" trouvée
     */
    useEffect(() => {
        const defaultActivity = findDefaultActivity();
        setPinnedActivity(defaultActivity);
    }, []);

    /**
     * Gestionnaire pour épingler/désépingler une activité
     * IMPORTANT: Maintenant avec ré-épinglage automatique
     * - Si on désépingle l'activité courante, on réépingle automatiquement la première activité "En cours"
     * - Il y a toujours une activité épinglée
     */
    const handlePinActivity = (activity: ProgrammeActivity | null) => {
        // Si on essaie de désépingler l'activité actuelle (en cliquant sur l'épingle de l'activité déjà épinglée)
        if (pinnedActivity && activity && pinnedActivity.id === activity.id) {
            // Au lieu de désépingler complètement, on réépingle la première activité "En cours"
            const defaultActivity = findDefaultActivity();
            setPinnedActivity(defaultActivity);
        } else {
            // Sinon, on épingle normalement la nouvelle activité
            setPinnedActivity(activity);
        }
    };

    /**
     * Gestionnaire pour le bouton "Regarder en direct"
     */
    const handleWatchLive = () => {
        if (pinnedActivity) {
            console.log('Watching live activity:', pinnedActivity.title);
            // TODO: Implémenter la logique de visionnage en direct
        }
    };

    return (
        <DashboardContent>
            <Grid container spacing={3}>
                {/* Section 1 - Welcome sans bouton */}
                <Grid size={12}>
                    <AppWelcome
                        title="Bonjours Kouakou Evarist"
                        description="Vous etes connecté en tant que participant au SARA 2023."
                        img={<SeoIllustration hideBackground />}
                    />
                </Grid>

                {/* Section 2 - Activité épinglée avec vidéo (remplace l'ancienne vidéo hero) */}
                <AccueilCompactVideo
                    pinnedActivity={pinnedActivity}
                    onWatchLive={handleWatchLive}
                />

                {/* Section 2.5 - Boutons d'action séparés */}
                <ActionButtons />

                {/* Section 3 - Programme avec système d'épinglage */}
                <AccueilProgrammeSection2Ping
                    pinnedActivity={pinnedActivity}
                    onPinActivity={handlePinActivity}
                />

                {/* Section 4 - Carousel des intervenants */}
                <Grid size={12}>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <IntervenantCarousel />
                    </Box>
                </Grid>

                {/* Section 5 - Footer */}
                <Grid size={12}>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Footer />
                    </Box>
                </Grid>
            </Grid>
        </DashboardContent>
    );
}