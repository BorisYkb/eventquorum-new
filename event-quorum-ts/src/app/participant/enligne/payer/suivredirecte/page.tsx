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
import AccueilProgrammeSection2 from 'src/app/participant/enligne/payer/suivredirecte/components/accueil-programme-section-2-ping';
import { IntervenantCarousel } from 'src/app/participant/components/intervenant-carousel';
import { Footer } from 'src/app/participant/components/footer';
import { PROGRAMME_DAYS } from 'src/app/participant/components/programme/programme-data';

import type { ProgrammeActivity } from 'src/app/participant/components/programme/programme-data';

// ----------------------------------------------------------------------

export default function ParticipantEnresentielPage() {
    // État pour gérer l'activité épinglée
    const [pinnedActivity, setPinnedActivity] = useState<ProgrammeActivity | null>(null);

    /**
     * Initialise l'activité épinglée par défaut au chargement de la page
     * Sélectionne automatiquement la première activité "En cours" trouvée
     */
    useEffect(() => {
        // Cherche une activité "En cours" dans tous les jours du programme
        let defaultActivity: ProgrammeActivity | null = null;
        
        for (const day of PROGRAMME_DAYS) {
            const currentActivity = day.activities.find(activity => activity.status === 'En cours');
            if (currentActivity) {
                defaultActivity = currentActivity;
                break;
            }
        }

        // Si aucune activité "En cours", prendre la première activité du premier jour
        if (!defaultActivity && PROGRAMME_DAYS.length > 0 && PROGRAMME_DAYS[0].activities.length > 0) {
            defaultActivity = PROGRAMME_DAYS[0].activities[0];
        }

        setPinnedActivity(defaultActivity);
    }, []);

    /**
     * Gestionnaire pour épingler/désépingler une activité
     */
    const handlePinActivity = (activity: ProgrammeActivity | null) => {
        setPinnedActivity(activity);
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
                        title="Bonjours cher(e) Kouakou Evarist"
                        description="Vous etes connecté en tant que participant au SARA 2023."
                        img={<SeoIllustration hideBackground />}
                    />
                </Grid>

                {/* Section 2 - Activité épinglée (remplace l'ancienne vidéo hero) */}
                <AccueilCompactVideo 
                    pinnedActivity={pinnedActivity}
                    onWatchLive={handleWatchLive}
                />

                {/* Section 2.5 - Boutons d'action séparés */}
                <ActionButtons />

                {/* Section 3 - Programme avec système d'épinglage */}
                <AccueilProgrammeSection2 
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










// //src/app/participant/enligne/payer/suivredirecte/page.tsx

// 'use client';

// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid2';

// import { SeoIllustration } from 'src/assets/illustrations';

// import { AppWelcome } from 'src/app/participant/components/app-welcome-2';
// import { DashboardContent } from 'src/layouts/dashboard';


// import { AccueilCompactVideo } from './components/accueil-compact-video';
// import AccueilProgrammeSection2 from 'src/app/participant/components/accueil-programme-section-2';
// import { IntervenantCarousel } from 'src/app/participant/components/intervenant-carousel';
// import { Footer } from 'src/app/participant/components/footer';

// // ----------------------------------------------------------------------


// export default function ParticipantEnresentielPage() {
//     return (
//         <DashboardContent>
//             <Grid container spacing={3}>
//                 {/* Section 1 - Welcome sans bouton */}
//                 <Grid size={12}>
//                     <AppWelcome
//                         title="Bonjours cher(e) participant(e) Kouakou Evarist"
//                         description="Vous etes connecté en tant que participant au SARA 2023."
//                         img={<SeoIllustration hideBackground />}
//                     />
//                 </Grid>

//                 {/* Section 2 - Vidéo hero */}
//                 <AccueilCompactVideo />

//                 {/* Section 3 - Programme */}
//                 <AccueilProgrammeSection2 />

//                 {/* Section 4 - Sponsors/Footer */}
//                 <Grid size={12}>
//                     <Box sx={{ textAlign: 'center', py: 4 }}>
//                         <IntervenantCarousel />
//                     </Box>
//                 </Grid>

//                 <Grid size={12}>
//                     <Box sx={{ textAlign: 'center', py: 4 }}>
//                         <Footer />
//                     </Box>
//                 </Grid>
//             </Grid>
//         </DashboardContent>
//     );
// }