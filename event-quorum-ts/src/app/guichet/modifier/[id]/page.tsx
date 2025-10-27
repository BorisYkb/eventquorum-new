// File: src/app/guichet/modifier/[id]/page.tsx

'use client';

/**
 * PAGE: Modifier un participant (Guichet)
 * 
 * Permet à un agent de guichet de:
 * 1. Modifier les informations personnelles d'un participant
 * 2. Ajouter de nouvelles activités (les déjà payées sont grisées et désactivées)
 * 3. Enregistrer les modifications
 * 
 * Flux: Agent modifie → Participant paie (si nouvelles activités) → Agent valide → Enregistrement DB → Badge/Reçu
 */

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import { ArrowBack } from '@mui/icons-material';

import { DashboardContent } from 'src/layouts/guichet';
import { Iconify } from 'src/components/iconify';

// Import des composants
import { GuichetInfoForm } from 'src/sections/guichet/GuichetInfoForm';
import { GuichetActivitesStep } from 'src/sections/guichet/GuichetActivitesStep';
import { GuichetSuccessStep } from 'src/sections/guichet/GuichetSuccessStep';

// Import des données
import { ACTIVITES_DISPONIBLES } from 'src/app/participant/enligne/components/activites-data';

// Import des types
import type { SelectedActivite } from 'src/app/participant/enligne/components/activites-selection';

// ============================================
// TYPES
// ============================================

/**
 * Représente une activité payée par un participant
 */
type ActivitePaye = {
    activiteId: string;
    standing: string;
};

/**
 * Représente les informations d'un participant
 */
interface ParticipantInfo {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    typeParticipation: 'En ligne' | 'En présentiel';
}

/**
 * Données complètes d'un participant
 */
type ParticipantData = {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    typeParticipation: 'En ligne' | 'En présentiel';
    activites: ActivitePaye[];
};

// ============================================
// DONNÉES MOCKÉES (à remplacer par API)
// ============================================

/**
 * Données mockées des participants
 * TODO: Remplacer par un appel API
 */
const MOCK_PARTICIPANTS: ParticipantData[] = [
    {
        id: 1,
        nom: 'Boudou',
        prenom: 'Khoudou',
        email: 'boudou@gmail.com',
        telephone: '0102030405',
        typeParticipation: 'En présentiel',
        activites: [
            { activiteId: '1', standing: 'vip' },
            { activiteId: '2', standing: 'standard' },
        ],
    },
    {
        id: 2,
        nom: 'Kouame',
        prenom: 'Jean',
        email: 'kouame@gmail.com',
        telephone: '0706080945',
        typeParticipation: 'En ligne',
        activites: [],
    },
    {
        id: 3,
        nom: 'Sidibe',
        prenom: 'Moussa',
        email: 'sidibemoussa@gmail.com',
        telephone: '0544023467',
        typeParticipation: 'En présentiel',
        activites: [
            { activiteId: '3', standing: 'included' },
            { activiteId: '4', standing: 'vvip' },
        ],
    },
    {
        id: 4,
        nom: 'GRA-BI',
        prenom: 'Amira',
        email: 'grabiamira@gmail.com',
        telephone: '0701459358',
        typeParticipation: 'En ligne',
        activites: [
            { activiteId: '2', standing: 'standard' },
        ],
    },
    {
        id: 5,
        nom: 'Traore',
        prenom: 'Fatou',
        email: 'fatou.traore@gmail.com',
        telephone: '0607080910',
        typeParticipation: 'En présentiel',
        activites: [],
    },
    {
        id: 6,
        nom: 'Koffi',
        prenom: 'Emmanuel',
        email: 'koffi@gmail.com',
        telephone: '0101010101',
        typeParticipation: 'En ligne',
        activites: [
            { activiteId: '1', standing: 'vvip' },
            { activiteId: '3', standing: 'included' },
            { activiteId: '5', standing: 'gratuit' },
        ],
    },
    {
        id: 7,
        nom: 'Diallo',
        prenom: 'Mariama',
        email: 'mariama.diallo@gmail.com',
        telephone: '0708091011',
        typeParticipation: 'En présentiel',
        activites: [
            { activiteId: '6', standing: 'vip' },
            { activiteId: '4', standing: 'standard' },
        ],
    },
    {
        id: 8,
        nom: 'Kone',
        prenom: 'Abdoulaye',
        email: 'abdou.kone@gmail.com',
        telephone: '0501020304',
        typeParticipation: 'En ligne',
        activites: [],
    },
];

// ============================================
// CONFIGURATION
// ============================================
const STEPS = ['Informations personnelles', 'Sélection des activités'];

// ============================================
// COMPOSANT PRINCIPAL
// ============================================
export default function GuichetModifierParticipantPage() {
    const router = useRouter();
    const params = useParams();
    const participantId = params.id ? parseInt(params.id as string) : null;

    // ============================================
    // ÉTATS
    // ============================================

    /** Indique si les données sont en cours de chargement */
    const [isLoading, setIsLoading] = useState(true);

    /** Données du participant à modifier */
    const [originalParticipant, setOriginalParticipant] = useState<ParticipantData | null>(null);

    /** Étape active (0 = infos, 1 = activités, 2 = succès) */
    const [activeStep, setActiveStep] = useState(0);

    /** Informations modifiées du participant */
    const [participantInfo, setParticipantInfo] = useState<ParticipantInfo>({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        typeParticipation: 'En présentiel',
    });

    /** Activités sélectionnées (anciennes + nouvelles) */
    const [selectedActivites, setSelectedActivites] = useState<SelectedActivite[]>([]);

    /** Liste des IDs des activités déjà payées (pour les griser) */
    const [disabledActivities, setDisabledActivities] = useState<string[]>([]);

    // ============================================
    // CHARGEMENT DES DONNÉES
    // ============================================

    useEffect(() => {
        /**
         * Charge les données du participant depuis l'ID
         * TODO: Remplacer par un appel API
         */
        const loadParticipant = async () => {
            setIsLoading(true);

            try {
                // Simulation d'un appel API
                await new Promise((resolve) => setTimeout(resolve, 500));

                // Recherche du participant dans les données mockées
                const participant = MOCK_PARTICIPANTS.find((p) => p.id === participantId);

                if (!participant) {
                    alert('Participant introuvable');
                    router.push('/guichet');
                    return;
                }

                // Sauvegarde des données originales
                setOriginalParticipant(participant);

                // Pré-remplissage du formulaire
                setParticipantInfo({
                    nom: participant.nom,
                    prenom: participant.prenom,
                    email: participant.email,
                    telephone: participant.telephone,
                    typeParticipation: participant.typeParticipation,
                });

                // Conversion des activités payées en format SelectedActivite
                const activitesSelectionnees: SelectedActivite[] = participant.activites.map((act) => ({
                    activityId: act.activiteId,
                    selectedStanding: act.standing,
                }));

                setSelectedActivites(activitesSelectionnees);

                // Liste des activités à désactiver (déjà payées)
                const activitesDesactivees = participant.activites.map((act) => act.activiteId);
                setDisabledActivities(activitesDesactivees);

            } catch (error) {
                console.error('Erreur lors du chargement du participant:', error);
                alert('Une erreur est survenue lors du chargement des données');
                router.push('/guichet');
            } finally {
                setIsLoading(false);
            }
        };

        if (participantId) {
            loadParticipant();
        } else {
            alert('ID de participant invalide');
            router.push('/guichet');
        }
    }, [participantId, router]);

    // ============================================
    // HELPERS
    // ============================================

    /**
     * Calcule le prix d'une activité selon le standing sélectionné
     */
    const getPriceForSelection = (selection: SelectedActivite): number => {
        const act = ACTIVITES_DISPONIBLES.find((a) => a.id === selection.activityId);
        if (!act) return 0;

        // Si priceOptions === null, le prix n'est pas compté (accès déjà inclus)
        if (act.priceOptions === null) {
            return 0;
        }

        if (selection.selectedStanding === 'gratuit' || selection.selectedStanding === 'included') {
            return 0;
        }

        const opt = act.priceOptions?.find((p) => p.id === selection.selectedStanding);
        return opt ? opt.price : 0;
    };

    /**
     * Calcule le montant total UNIQUEMENT pour les NOUVELLES activités
     * (exclut les activités déjà payées)
     */
    const calculateNewActivitiesTotal = () => {
        // Filtre uniquement les nouvelles activités (non désactivées)
        const newActivites = selectedActivites.filter(
            (sel) => !disabledActivities.includes(sel.activityId)
        );

        return newActivites.reduce((sum, s) => sum + getPriceForSelection(s), 0);
    };

    const totalNewAmount = calculateNewActivitiesTotal();

    /**
     * Calcule le montant total de TOUTES les activités (pour affichage dans le succès)
     */
    const calculateTotalAmount = () => {
        return selectedActivites.reduce((sum, s) => sum + getPriceForSelection(s), 0);
    };

    const totalAmount = calculateTotalAmount();

    // ============================================
    // HANDLERS - NAVIGATION
    // ============================================

    /**
     * Retour à la liste des participants
     */
    const handleBack = () => {
        router.push('/guichet');
    };

    /**
     * Passe à l'étape suivante
     */
    const handleNext = () => {
        // Validation étape 1
        if (activeStep === 0) {
            if (!participantInfo.nom || !participantInfo.prenom || !participantInfo.email || !participantInfo.telephone) {
                alert('Veuillez remplir tous les champs obligatoires');
                return;
            }
        }

        // Validation étape 2
        if (activeStep === 1) {
            if (selectedActivites.length === 0) {
                alert('Le participant doit avoir au moins une activité');
                return;
            }

            // Enregistrement des modifications
            handleSubmitModifications();
            return;
        }

        setActiveStep((prev) => prev + 1);
    };

    /**
     * Retour à l'étape précédente
     */
    const handlePrevious = () => {
        setActiveStep((prev) => prev - 1);
    };

    /**
     * Enregistre les modifications du participant
     * TODO: Remplacer par un vrai appel API
     */
    const handleSubmitModifications = async () => {
        try {
            // Calcul des nouvelles activités ajoutées
            const nouvellesActivites = selectedActivites.filter(
                (sel) => !disabledActivities.includes(sel.activityId)
            );

            console.log('Modification du participant:', {
                participantId,
                anciennes_infos: originalParticipant,
                nouvelles_infos: participantInfo,
                anciennes_activites: originalParticipant?.activites,
                nouvelles_activites: nouvellesActivites,
                toutes_activites: selectedActivites,
                montant_nouvelles_activites: totalNewAmount,
                montant_total: totalAmount,
                dateModification: new Date().toISOString(),
            });

            // Simulation d'un appel API
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Passer à l'étape de succès
            setActiveStep(2);
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement:', error);
            alert('Une erreur est survenue lors de l\'enregistrement');
        }
    };

    /**
     * Retourne à la liste après la modification
     */
    const handleBackToList = () => {
        router.push('/guichet');
    };

    /**
     * Modifie un autre participant
     */
    const handleModifyAnother = () => {
        router.push('/guichet');
    };

    // ============================================
    // RENDER
    // ============================================

    /**
     * Affichage du loader pendant le chargement
     */
    if (isLoading) {
        return (
            <DashboardContent maxWidth="xl">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '60vh',
                    }}
                >
                    <Stack spacing={2} alignItems="center">
                        <CircularProgress />
                        <Typography variant="body2" color="text.secondary">
                            Chargement des données du participant...
                        </Typography>
                    </Stack>
                </Box>
            </DashboardContent>
        );
    }

    /**
     * Affichage si le participant n'existe pas
     */
    if (!originalParticipant) {
        return (
            <DashboardContent maxWidth="xl">
                <Box sx={{ py: 4, textAlign: 'center' }}>
                    <Typography variant="h5" color="error" gutterBottom>
                        Participant introuvable
                    </Typography>
                    <Button variant="contained" onClick={handleBack} sx={{ mt: 2 }}>
                        Retour à la liste
                    </Button>
                </Box>
            </DashboardContent>
        );
    }

    /**
     * Rendu du contenu selon l'étape active
     */
    const renderStepContent = () => {
        switch (activeStep) {
            case 0:
                return (
                    <GuichetInfoForm
                        participantInfo={participantInfo}
                        onInfoChange={setParticipantInfo}
                    />
                );

            case 1:
                return (
                    <Box>
                        {/* Message informatif sur les activités déjà payées */}
                        {disabledActivities.length > 0 && (
                            <Card
                                sx={{
                                    p: 2,
                                    mb: 3,
                                    bgcolor: 'info.lighter',
                                    border: 1,
                                    borderColor: 'info.main',
                                }}
                            >
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Iconify
                                        icon="eva:info-fill"
                                        sx={{ fontSize: 28, color: 'info.main' }}
                                    />
                                    <Box>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'info.dark',
                                                fontSize: { xs: '0.875rem', md: '1rem' },
                                            }}
                                        >
                                            Activités déjà payées
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'info.dark',
                                                fontSize: { xs: '0.75rem', md: '0.875rem' },
                                            }}
                                        >
                                            Ce participant a déjà payé {disabledActivities.length} activité(s).
                                            Ces activités sont affichées en grisé et ne peuvent pas être modifiées.
                                            Vous pouvez ajouter de nouvelles activités.
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Card>
                        )}

                        {/* Composant de sélection des activités avec les déjà payées désactivées */}
                        <GuichetActivitesStep
                            selectedActivites={selectedActivites}
                            onActivitesChange={setSelectedActivites}
                            totalAmount={totalNewAmount} // Montant uniquement pour les nouvelles activités
                            disabledActivities={disabledActivities} // Activités déjà payées (grisées)
                        />
                    </Box>
                );

            case 2:
                return (
                    <GuichetSuccessStep
                        participantInfo={participantInfo}
                        selectedActivites={selectedActivites}
                        totalAmount={totalAmount} // Montant total (toutes activités)
                        participantId={participantId}
                        onAddAnother={handleModifyAnother}
                        onBackToList={handleBackToList}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <DashboardContent maxWidth="xl">
            <Box sx={{ py: { xs: 2, md: 3 } }}>
                {/* ========== EN-TÊTE ========== */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 4,
                        flexDirection: { xs: 'column', sm: 'row' },
                    }}
                >
                    {/* Bouton retour */}
                    <IconButton
                        onClick={handleBack}
                        sx={{
                            alignSelf: { xs: 'flex-start', sm: 'center' },
                        }}
                    >
                        <ArrowBack />
                    </IconButton>

                    {/* Titre */}
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '1.5rem', md: '2rem' },
                            }}
                        >
                            Modifier le participant
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                        >
                            Modifiez les informations et ajoutez de nouvelles activités pour{' '}
                            <strong>
                                {originalParticipant.prenom} {originalParticipant.nom}
                            </strong>
                        </Typography>
                    </Box>
                </Box>

                {/* ========== STEPPER (sauf pour l'étape de succès) ========== */}
                {activeStep < 2 && (
                    <Card sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
                        <Stepper activeStep={activeStep}>
                            {STEPS.map((label) => (
                                <Step key={label}>
                                    <StepLabel
                                        sx={{
                                            '& .MuiStepLabel-label': {
                                                fontSize: { xs: '0.8rem', md: '1rem' },
                                            },
                                        }}
                                    >
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Card>
                )}

                {/* ========== CONTENU DE L'ÉTAPE ========== */}
                {renderStepContent()}

                {/* ========== BOUTONS DE NAVIGATION (sauf pour l'étape de succès) ========== */}
                {activeStep < 2 && (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 4,
                            gap: 2,
                            flexDirection: { xs: 'column-reverse', sm: 'row' },
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={activeStep === 0 ? handleBack : handlePrevious}
                            sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                        >
                            {activeStep === 0 ? 'Annuler' : 'Précédent'}
                        </Button>

                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                        >
                            {activeStep === 1 ? 'Valider les modifications' : 'Suivant'}
                        </Button>
                    </Box>
                )}
            </Box>
        </DashboardContent>
    );
}