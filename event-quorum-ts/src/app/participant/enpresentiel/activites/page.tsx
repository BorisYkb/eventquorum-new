// src/app/participant/enligne/activites/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';

import { useBoolean } from 'minimal-shared/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { ActivitesSelection } from '../components/activites-selection';
import { ActivitesSummary } from '../components/activites-summary';
import { PaymentMethods } from '../components/payment-methods';
import { ACTIVITES_DISPONIBLES } from '../components/activites-data';

import type { SelectedActivite } from '../components/activites-selection';
import { IntervenantCarousel } from 'src/app/participant/components/intervenant-carousel';
import { Footer } from 'src/app/participant/components/footer';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

/**
 * Page principale /participant/enpresentiel/activites
 */
export default function ParticipantEnligneActivitesPage() {
    const router = useRouter();

    // États pour la sélection d'activités avec standing
    const [selectedActivites, setSelectedActivites] = useState<SelectedActivite[]>([]);

    // États pour le paiement
    const [paymentMethod, setPaymentMethod] = useState('');
    const [mobileMoneyNetwork, setMobileMoneyNetwork] = useState('');

    // Modal pour guichet
    const guichetDialog = useBoolean();

    // Gestionnaire pour basculer la sélection d'une activité
    const handleActiviteToggle = (activiteId: string) => {
        setSelectedActivites(prev => {
            const existingIndex = prev.findIndex(item => item.activityId === activiteId);

            if (existingIndex >= 0) {
                // Désélectionner l'activité
                return prev.filter(item => item.activityId !== activiteId);
            } else {
                // Sélectionner l'activité avec l'option standard par défaut
                return [...prev, {
                    activityId: activiteId,
                    selectedStanding: 'standard'
                }];
            }
        });
    };

    // Gestionnaire pour changer le standing d'une activité
    const handleStandingChange = (activiteId: string, standing: string) => {
        setSelectedActivites(prev =>
            prev.map(item =>
                item.activityId === activiteId
                    ? { ...item, selectedStanding: standing }
                    : item
            )
        );
    };

    // Gestionnaire pour valider le paiement
    const handleValidatePayment = () => {
        if (selectedActivites.length === 0) {
            alert('Veuillez sélectionner au moins une activité');
            return;
        }

        if (!paymentMethod) {
            alert('Veuillez choisir un moyen de paiement');
            return;
        }

        if (paymentMethod === 'mobile_money' && !mobileMoneyNetwork) {
            alert('Veuillez sélectionner un réseau mobile money');
            return;
        }

        if (paymentMethod === 'guichet') {
            guichetDialog.onTrue();
        } else if (paymentMethod === 'mobile_money') {
            // Simulation paiement mobile money réussi
            router.push('/participant/enpresentiel/payer');
        }
    };

    // Gestionnaire pour confirmer paiement guichet
    const handleConfirmGuichet = () => {
        guichetDialog.onFalse();
        router.push('/participant/enpresentiel');
    };

    return (
        <DashboardContent>
            <Container sx={{ py: 1 }}>
                <Typography variant="h4" align="center" sx={{ mb: 2 }}>
                    Sélection des activités
                </Typography>

                <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
                    Choisissez les activités qui vous intéressent et procédez au paiement
                </Typography>

                <Grid container spacing={4}>
                    {/* Section 1 - Sélection des activités (60% largeur) */}
                    <Grid size={{ xs: 12, lg: 7 }}>
                        <ActivitesSelection
                            activites={ACTIVITES_DISPONIBLES}
                            selectedActivites={selectedActivites}
                            onActiviteToggle={handleActiviteToggle}
                            onStandingChange={handleStandingChange}
                        />
                    </Grid>

                    {/* Section 2 - Résumé et paiement (40% largeur) */}
                    <Grid size={{ xs: 12, lg: 5 }}>
                        <Stack spacing={3}>
                            {/* Résumé */}
                            <ActivitesSummary
                                activites={ACTIVITES_DISPONIBLES}
                                selectedActivites={selectedActivites}
                            />

                            {/* Méthodes de paiement */}
                            <PaymentMethods
                                paymentMethod={paymentMethod}
                                mobileMoneyNetwork={mobileMoneyNetwork}
                                onPaymentMethodChange={setPaymentMethod}
                                onMobileMoneyNetworkChange={setMobileMoneyNetwork}
                            />

                            {/* Bouton validation */}
                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                onClick={handleValidatePayment}
                                disabled={selectedActivites.length === 0}
                                sx={{ mt: 2 }}
                            >
                                Valider la sélection
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Modal pour paiement guichet */}
                <Dialog
                    open={guichetDialog.value}
                    onClose={guichetDialog.onFalse}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle sx={{ textAlign: 'center' }}>
                        Instructions de paiement
                    </DialogTitle>

                    <DialogContent sx={{ textAlign: 'center', py: 3 }}>
                        <Typography variant="body1">
                            Parfait, rapprochez-vous d'une hôtesse qui
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            vous guidera vers le guichet de paiement.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Merci de préparer la monnaie.
                        </Typography>
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: 'center' }}>
                        <Button onClick={handleConfirmGuichet} variant="contained">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Section 4 - Sponsors/Footer */}

                {/* <Grid size={12}>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <IntervenantCarousel />
                    </Box>
                </Grid> */}

                <Grid size={12}>
                    <Box sx={{ textAlign: 'center', py: 4, mt: 5 }}>
                        <Footer />
                    </Box>
                </Grid>
            </Container>
        </DashboardContent>
    );
}