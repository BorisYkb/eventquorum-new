// File: src/app/guichet/ajouter/page.tsx

'use client';

/**
 * PAGE: Ajouter un participant (Guichet)
 * 
 * Permet à un agent de guichet d'enregistrer un nouveau participant en 3 étapes:
 * 1. Informations personnelles + Type de participation
 * 2. Sélection des activités avec standing
 * 3. Page de succès avec détails et actions (imprimer badge/reçu)
 * 
 * Flux: Agent saisit → Participant paie → Agent valide → Enregistrement DB → Badge/Reçu
 */

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
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
interface ParticipantInfo {
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    typeParticipation: 'En ligne' | 'En présentiel';
}

// ============================================
// CONFIGURATION
// ============================================
const STEPS = ['Informations personnelles', 'Sélection des activités'];

// ============================================
// COMPOSANT PRINCIPAL
// ============================================
export default function GuichetAjouterParticipantPage() {
    const router = useRouter();

    // ============================================
    // ÉTATS
    // ============================================

    /** Étape active (0 = infos, 1 = activités, 2 = succès) */
    const [activeStep, setActiveStep] = useState(0);

    /** Informations du participant */
    const [participantInfo, setParticipantInfo] = useState<ParticipantInfo>({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        typeParticipation: 'En présentiel',
    });

    /** Activités sélectionnées avec standing */
    const [selectedActivites, setSelectedActivites] = useState<SelectedActivite[]>([]);

    /** ID du participant créé (pour affichage dans step succès) */
    const [createdParticipantId, setCreatedParticipantId] = useState<number | null>(null);

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
     * Calcule le montant total à payer
     */
    const calculateTotal = () => {
        return selectedActivites.reduce((sum, s) => sum + getPriceForSelection(s), 0);
    };

    const totalAmount = calculateTotal();

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
                alert('Veuillez sélectionner au moins une activité');
                return;
            }

            // Enregistrement dans la base de données (TODO: Appel API)
            handleSubmitParticipant();
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
     * Enregistre le participant dans la base de données
     * TODO: Remplacer par un vrai appel API
     */
    const handleSubmitParticipant = async () => {
        try {
            // Simulation d'un appel API
            console.log('Enregistrement du participant:', {
                ...participantInfo,
                activites: selectedActivites,
                montantPaye: totalAmount,
                dateCreation: new Date().toISOString(),
            });

            // Simuler un délai de chargement
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Générer un ID fictif
            const newId = Date.now();
            setCreatedParticipantId(newId);

            // Passer à l'étape de succès
            setActiveStep(2);
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement:', error);
            alert('Une erreur est survenue lors de l\'enregistrement');
        }
    };

    /**
     * Réinitialise le formulaire pour ajouter un autre participant
     */
    const handleAddAnother = () => {
        setParticipantInfo({
            nom: '',
            prenom: '',
            email: '',
            telephone: '',
            typeParticipation: 'En présentiel',
        });
        setSelectedActivites([]);
        setCreatedParticipantId(null);
        setActiveStep(0);
    };

    // ============================================
    // RENDER
    // ============================================

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
                    <GuichetActivitesStep
                        selectedActivites={selectedActivites}
                        onActivitesChange={setSelectedActivites}
                        totalAmount={totalAmount}
                    />
                );

            case 2:
                return (
                    <GuichetSuccessStep
                        participantInfo={participantInfo}
                        selectedActivites={selectedActivites}
                        totalAmount={totalAmount}
                        participantId={createdParticipantId}
                        onAddAnother={handleAddAnother}
                        onBackToList={handleBack}
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
                            Ajouter un participant
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                        >
                            Enregistrez les informations du participant et sélectionnez ses activités
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
                            {activeStep === 1 ? 'Valider et enregistrer' : 'Suivant'}
                        </Button>
                    </Box>
                )}
            </Box>
        </DashboardContent>
    );
}