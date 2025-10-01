// src/app/participant/enligne/payer/activites/ajouter/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { DashboardContent } from 'src/layouts/dashboard';
import { Footer } from 'src/app/participant/components/footer';
import { Iconify } from 'src/components/iconify';

import { PaymentMethods } from '../components/methode/payment-methods';
import { ActivitesSummary } from '../components/methode/activites-summary';
// eslint-disable-next-line import/no-unresolved
import { ACTIVITES_PAYEES } from '../components/activites-payees-data';
import { ACTIVITES_DISPONIBLES } from '../components/methode/activites-data';
import { ActivitesSelection } from '../components/methode/activites-selection';

import type { SelectedActivite } from '../components/methode/activites-selection';

// ----------------------------------------------------------------------

/**
 * Page d'ajout d'activités supplémentaires
 * Permet d'ajouter de nouvelles activités à celles déjà sélectionnées
 */
export default function AjouterActivitesPage() {
    const router = useRouter();

    // États pour la nouvelle sélection d'activités
    const [newSelectedActivites, setNewSelectedActivites] = useState<SelectedActivite[]>([]);

    // États pour le paiement des nouvelles activités
    const [paymentMethod, setPaymentMethod] = useState('');
    const [mobileMoneyNetwork, setMobileMoneyNetwork] = useState('');

    // Calculer le montant total des nouvelles activités sélectionnées
    const calculateTotalAmount = () => {
        return newSelectedActivites.reduce((total, selectedActivite) => {
            const activite = ACTIVITES_DISPONIBLES.find(a => a.id === selectedActivite.activityId);
            if (!activite) return total;

            const priceOption = activite.priceOptions.find(p => p.id === selectedActivite.selectedStanding);
            return total + (priceOption?.price || 0);
        }, 0);
    };

    const totalAmount = calculateTotalAmount();

    // Modal pour guichet
    const guichetDialog = useBoolean();

    // Récupérer les IDs des activités déjà payées/sélectionnées
    const alreadySelectedIds = ACTIVITES_PAYEES.map(activite => activite.id);

    // Gestionnaire pour basculer la sélection d'une nouvelle activité
    const handleActiviteToggle = (activiteId: string) => {
        // Empêcher la sélection/désélection des activités déjà payées
        if (alreadySelectedIds.includes(activiteId)) {
            return;
        }

        setNewSelectedActivites(prev => {
            const existingIndex = prev.findIndex(item => item.activityId === activiteId);

            if (existingIndex >= 0) {
                // Désélectionner l'activité
                const newSelection = prev.filter(item => item.activityId !== activiteId);
                console.log('Activité désélectionnée:', activiteId, 'Nouvelle sélection:', newSelection);
                return newSelection;
            } else {
                // Sélectionner l'activité avec l'option standard par défaut
                const newSelection = [...prev, { activityId: activiteId, selectedStanding: 'standard' }];
                console.log('Activité sélectionnée:', activiteId, 'Nouvelle sélection:', newSelection);
                return newSelection;
            }
        });
    };

    // Gestionnaire pour changer le standing d'une nouvelle activité
    const handleStandingChange = (activiteId: string, standing: string) => {
        setNewSelectedActivites(prev =>
            prev.map(item =>
                item.activityId === activiteId
                    ? { ...item, selectedStanding: standing }
                    : item
            )
        );
        console.log('Standing changé pour:', activiteId, 'nouveau standing:', standing);
    };

    // Gestionnaire pour le changement de méthode de paiement
    const handlePaymentMethodChange = (method: string) => {
        console.log('Méthode de paiement changée:', method);
        setPaymentMethod(method);
        // Réinitialiser le réseau mobile money si on change de méthode
        if (method !== 'mobile_money') {
            setMobileMoneyNetwork('');
        }
    };

    // Gestionnaire pour le changement de réseau mobile money
    const handleMobileMoneyNetworkChange = (network: string) => {
        console.log('Réseau mobile money changé:', network);
        setMobileMoneyNetwork(network);
    };

    // Gestionnaire pour valider le paiement des nouvelles activités
    const handleValidatePayment = () => {
        console.log('Validation paiement - Activités sélectionnées:', newSelectedActivites);
        console.log('Méthode de paiement:', paymentMethod);
        console.log('Réseau mobile money:', mobileMoneyNetwork);

        if (newSelectedActivites.length === 0) {
            alert('Veuillez sélectionner au moins une nouvelle activité');
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
            router.push('/participant/enpresentiel/payer/activites');
        }
    };

    // Gestionnaire pour confirmer paiement guichet
    const handleConfirmGuichet = () => {
        guichetDialog.onFalse();
        router.push('/participant/enpresentiel/payer/activites');
    };

    // Gestionnaire pour retourner sans ajouter d'activités
    const handleGoBack = () => {
        router.back();
    };

    // Debug: Log des changements d'état
    useEffect(() => {
        console.log('État newSelectedActivites changé:', newSelectedActivites);
    }, [newSelectedActivites]);

    useEffect(() => {
        console.log('État paymentMethod changé:', paymentMethod);
    }, [paymentMethod]);

    useEffect(() => {
        console.log('État mobileMoneyNetwork changé:', mobileMoneyNetwork);
    }, [mobileMoneyNetwork]);

    return (
        <DashboardContent>
            <Container sx={{ py: 1 }}>
                {/* En-tête avec bouton retour */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2
                }}>
                    <Button
                        startIcon={<Iconify icon="eva:arrow-back-fill" />}
                        onClick={handleGoBack}
                        sx={{
                            textTransform: 'none',
                            color: 'text.secondary',
                            '&:hover': { bgcolor: 'action.hover' }
                        }}
                    >
                        Retour
                    </Button>

                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                        Ajouter des Activités
                    </Typography>

                    <Box sx={{ width: 100 }} /> {/* Spacer pour centrer le titre */}
                </Box>

                <Grid container spacing={4}>
                    {/* Section 1 - Sélection des nouvelles activités (60% largeur) */}
                    <Grid size={{ xs: 12, lg: 7 }}>
                        <ActivitesSelection
                            activites={ACTIVITES_DISPONIBLES}
                            selectedActivites={newSelectedActivites}
                            onActiviteToggle={handleActiviteToggle}
                            onStandingChange={handleStandingChange}
                            disabledActivities={alreadySelectedIds} // Passer les IDs des activités à griser
                        />
                    </Grid>

                    {/* Section 2 - Résumé et paiement des nouvelles activités (40% largeur) */}
                    <Grid size={{ xs: 12, lg: 5 }}>
                        <Stack spacing={3}>
                            {/* Résumé des nouvelles activités seulement */}
                            <ActivitesSummary
                                activites={ACTIVITES_DISPONIBLES}
                                selectedActivites={newSelectedActivites}
                            />

                            {/* Méthodes de paiement avec le composant original corrigé */}
                            {newSelectedActivites.length > 0 && (
                                <Box>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                        Moyens de Paiement
                                    </Typography>

                                    <PaymentMethods
                                        paymentMethod={paymentMethod}
                                        mobileMoneyNetwork={mobileMoneyNetwork}
                                        onPaymentMethodChange={handlePaymentMethodChange}
                                        onMobileMoneyNetworkChange={handleMobileMoneyNetworkChange}
                                        totalAmount={totalAmount} // Passer le montant total calculé
                                    />
                                </Box>
                            )}

                            {/* Boutons d'action */}
                            <Stack spacing={2}>
                                <Button
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    onClick={handleValidatePayment}
                                    disabled={newSelectedActivites.length === 0}
                                >
                                    Ajouter les Activités Sélectionnées
                                    {newSelectedActivites.length > 0 && ` (${newSelectedActivites.length})`}
                                </Button>
                            </Stack>
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

                {/* Footer */}
                <Grid size={12}>
                    <Box sx={{ textAlign: 'center', py: 4, mt: 5 }}>
                        <Footer />
                    </Box>
                </Grid>
            </Container>
        </DashboardContent>
    );
}