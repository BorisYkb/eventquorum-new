// File: src/sections/guichet/GuichetSuccessStep.tsx

'use client';

/**
 * COMPOSANT: GuichetSuccessStep
 * 
 * Page de succès après l'enregistrement d'un participant
 * Affiche un récapitulatif et les actions disponibles (imprimer badge/reçu)
 */

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

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

interface GuichetSuccessStepProps {
    /** Informations du participant */
    participantInfo: ParticipantInfo;

    /** Activités sélectionnées */
    selectedActivites: SelectedActivite[];

    /** Montant total payé */
    totalAmount: number;

    /** ID du participant créé */
    participantId: number | null;

    /** Callback pour ajouter/Modifier un autre invités */
    onAddAnother: () => void | null;

    /** Callback pour retourner à la liste */
    onBackToList: () => void;

    isAddMode?: boolean; // 👈 ajouté
}

// ============================================
// COMPOSANT
// ============================================
export function GuichetSuccessStep({
    participantInfo,
    selectedActivites,
    totalAmount,
    participantId,
    onAddAnother,
    onBackToList,
    isAddMode,
}: GuichetSuccessStepProps) {

    // ============================================
    // HELPERS
    // ============================================

    /**
     * Récupère les détails d'une activité sélectionnée
     */
    const getActiviteDetails = (selection: SelectedActivite) => {
        const activite = ACTIVITES_DISPONIBLES.find((a) => a.id === selection.activityId);
        if (!activite) return null;

        // Si priceOptions === null, l'activité n'a pas de prix
        const hasNoPriceOptions = !activite.priceOptions || activite.priceOptions.length === 0;

        if (hasNoPriceOptions) {
            return {
                title: activite.title,
                time: activite.time,
                standing: null,
                price: null,
            };
        }

        const standingOption = activite.priceOptions?.find((p) => p.id === selection.selectedStanding);
        const resolvedOption =
            standingOption ||
            (selection.selectedStanding === 'gratuit'
                ? { id: 'gratuit', label: 'Gratuit', price: 0, currency: 'FCFA' }
                : undefined);

        if (!resolvedOption) return null;

        return {
            title: activite.title,
            time: activite.time,
            standing: resolvedOption.label,
            price: resolvedOption.price,
        };
    };

    // ============================================
    // HANDLERS
    // ============================================

    /**
     * Imprime le badge du participant
     * TODO: Implémenter l'impression du badge
     */
    const handlePrintBadge = () => {
        console.log('Impression du badge pour le participant:', participantId);
        // TODO: Appel API pour générer le badge PDF
        alert('Impression du badge en cours...');
    };

    /**
     * Imprime le reçu de paiement
     * TODO: Implémenter l'impression du reçu
     */
    const handlePrintReceipt = () => {
        console.log('Impression du reçu pour le participant:', participantId);
        // TODO: Appel API pour générer le reçu PDF
        alert('Impression du reçu en cours...');
    };

    // ============================================
    // RENDER
    // ============================================
    return (
        <Box>
            {/* ========== ICÔNE DE SUCCÈS ========== */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Box
                    sx={{
                        width: { xs: 50, md: 80 },
                        height: { xs: 50, md: 80 },
                        borderRadius: '50%',
                        bgcolor: 'success.lighter',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                    }}
                >
                    <Iconify
                        icon="eva:checkmark-circle-2-fill"
                        sx={{
                            fontSize: { xs: 60, md: 80 },
                            color: 'success.main',
                        }}
                    />
                </Box>

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 1,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                    }}
                >
                    Invité enregistré avec succès !
                </Typography>

                {/* <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                >
                    Le participant a été ajouté et ses activités ont été enregistrées
                </Typography> */}

                {participantId && (
                    <Label
                        color="info"
                        sx={{
                            mt: 2,
                            fontSize: { xs: '0.8125rem', md: '0.875rem' },
                            px: 2,
                            py: 0.5,
                        }}
                    >
                        ID: {participantId}
                    </Label>
                )}
            </Box>

            {/* ========== ACTIONS ========== */}
            <Box sx={{ mt: 4, mb: 5 }}>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                    {/* Boutons d'impression */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            sx={{ height: '100%' }}
                        >
                            <Button
                                fullWidth
                                size="large"
                                variant="outlined"
                                startIcon={<Iconify icon="mdi:card-account-details-outline" />}
                                onClick={handlePrintBadge}
                                sx={{
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                }}
                            >
                                Imprimer le badge
                            </Button>

                            <Button
                                fullWidth
                                size="large"
                                variant="contained"
                                startIcon={<Iconify icon="solar:bill-list-bold" />}
                                onClick={handlePrintReceipt}
                                sx={{
                                    fontSize: { xs: '0.875rem', md: '1rem' },
                                }}
                            >
                                Imprimer le reçu
                            </Button>
                            {isAddMode && (
                                <Button
                                    fullWidth
                                    size="large"
                                    variant="outlined"
                                    onClick={onAddAnother}
                                    sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                                >
                                    Ajouter un autre
                                </Button>
                            )}
                        </Stack>
                    </Grid>

                </Grid>
            </Box>

            {/* ========== RÉCAPITULATIF ========== */}
            <Grid container spacing={{ xs: 2, md: 3 }}>
                {/* Informations du participant */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                                fontWeight: 600,
                                fontSize: { xs: '1rem', md: '1.25rem' },
                            }}
                        >
                            Informations du participant
                        </Typography>

                        <Stack spacing={2}>
                            <Box>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ fontSize: { xs: '0.75rem', md: '0.8125rem' } }}
                                >
                                    Nom complet
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                    }}
                                >
                                    {participantInfo.prenom} {participantInfo.nom}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ fontSize: { xs: '0.75rem', md: '0.8125rem' } }}
                                >
                                    Email
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                    }}
                                >
                                    {participantInfo.email}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ fontSize: { xs: '0.75rem', md: '0.8125rem' } }}
                                >
                                    Téléphone
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                    }}
                                >
                                    {participantInfo.telephone}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    sx={{ fontSize: { xs: '0.75rem', md: '0.8125rem' } }}
                                >
                                    Type de participation
                                </Typography>
                                <Box sx={{ mt: 0.5 }}>
                                    <Label
                                        color={participantInfo.typeParticipation === 'En ligne' ? 'success' : 'warning'}
                                        sx={{ fontSize: { xs: '0.75rem', md: '0.8125rem' } }}
                                    >
                                        {participantInfo.typeParticipation}
                                    </Label>
                                </Box>
                            </Box>
                        </Stack>
                    </Card>
                </Grid>

                {/* Activités et paiement */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ p: { xs: 2, md: 3 }, height: '100%' }}>
                        <Typography
                            variant="h6"
                            sx={{
                                mb: 2,
                                fontWeight: 600,
                                fontSize: { xs: '1rem', md: '1.25rem' },
                            }}
                        >
                            Activités sélectionnées
                        </Typography>

                        <Stack spacing={1.5} sx={{ mb: 2 }}>
                            {selectedActivites.map((selection) => {
                                const details = getActiviteDetails(selection);
                                if (!details) return null;

                                return (
                                    <Box
                                        key={selection.activityId}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            p: 1.5,
                                            bgcolor: 'background.neutral',
                                            borderRadius: 1,
                                        }}
                                    >
                                        <Box sx={{ flex: 1 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 500,
                                                    fontSize: { xs: '0.8125rem', md: '0.875rem' },
                                                }}
                                            >
                                                {details.title}
                                            </Typography>
                                            {details.standing && details.price !== null && details.price !== 0 && (
                                                <Typography
                                                    variant="caption"
                                                    color="primary.main"
                                                    sx={{ fontSize: { xs: '0.7rem', md: '0.75rem' } }}
                                                >
                                                    {details.standing}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontWeight: 600,
                                                color:
                                                    details.price === null
                                                        ? 'text.secondary'
                                                        : details.price === 0
                                                            ? 'success.main'
                                                            : 'text.primary',
                                                ml: 1,
                                                fontSize: { xs: '0.8125rem', md: '0.875rem' },
                                            }}
                                        >
                                            {details.price === null
                                                ? '-'
                                                : details.price === 0
                                                    ? 'Gratuit'
                                                    : `${details.price.toLocaleString()} F`}
                                        </Typography>
                                    </Box>
                                );
                            })}
                        </Stack>

                        <Divider sx={{ my: 2 }} />

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                p: 1.5,
                                bgcolor: 'primary.lighter',
                                borderRadius: 1,
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 600,
                                    fontSize: { xs: '0.9375rem', md: '1rem' },
                                }}
                            >
                                Montant encaissé
                            </Typography>
                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: '1.125rem', md: '1.25rem' },
                                }}
                            >
                                {totalAmount.toLocaleString()} FCFA
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}