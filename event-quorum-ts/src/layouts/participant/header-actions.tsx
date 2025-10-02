// src/layouts/participant/header-actions.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Iconify } from 'src/components/iconify';
import { ParticipantBadgeDialog, useParticipantBadgeDialog } from 'src/app/participant/components/participant-badge-dialog';

// ----------------------------------------------------------------------

interface ParticipantHeaderActionsProps {
    pathname: string;
}

export function ParticipantHeaderActions({ pathname }: ParticipantHeaderActionsProps) {
    const router = useRouter();

    // États pour les dialogs existants
    const [confirmPresenceOpen, setConfirmPresenceOpen] = useState(false);
    const [followLiveOpen, setFollowLiveOpen] = useState(false);
    const [participationType, setParticipationType] = useState<'enligne' | 'enpresentiel'>('enpresentiel');

    // Hook pour le dialog badge
    const badgeDialog = useParticipantBadgeDialog();

    /**
     * Vérifie si le pathname correspond à la page d'accueil participant
     * Gère : /participant, /participant/, /participant/[id], /participant/[id]/
     */
    const isParticipantHomePage = () => {
        // Cas simples : /participant ou /participant/
        if (pathname === '/participant' || pathname === '/participant/') {
            return true;
        }

        // Cas avec ID dynamique : /participant/[id] ou /participant/[id]/
        // Vérifie que le chemin commence par /participant/ 
        // ET ne contient pas 'enligne' ou 'enpresentiel'
        if (pathname.startsWith('/participant/')) {
            const segments = pathname.split('/').filter(seg => seg !== '');

            // segments[0] sera 'participant'
            // segments[1] sera l'ID (ou 'enligne'/'enpresentiel')

            // Si on a exactement 2 segments (participant + id) 
            // ET que le 2e segment n'est ni 'enligne' ni 'enpresentiel'
            if (segments.length === 2 &&
                segments[1] !== 'enligne' &&
                segments[1] !== 'enpresentiel') {
                return true;
            }
        }

        return false;
    };

    // Actions selon le niveau de progression
    const renderActions = () => {
        // Niveau initial - Bouton "Confirmer ma présence"
        // Gère : /participant, /participant/, /participant/[id], /participant/[id]/
        if (isParticipantHomePage()) {
            return (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setConfirmPresenceOpen(true)}
                        startIcon={<Iconify icon="solar:check-circle-bold" />}
                        sx={{
                            fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' }
                        }}
                    >
                        Participer à l'évènement
                    </Button>

                    {/* Dialog confirmation présence */}
                    <Dialog open={confirmPresenceOpen} onClose={() => setConfirmPresenceOpen(false)} maxWidth="sm" fullWidth>
                        <DialogTitle sx={{ textAlign: 'center' }}>
                            Voulez-vous participer à l'évènement en ligne ou en présentiel ?
                        </DialogTitle>
                        <DialogContent sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                            <ToggleButtonGroup
                                value={participationType}
                                exclusive
                                onChange={(_, value) => value && setParticipationType(value)}
                                color="primary"
                            >
                                <ToggleButton value="enligne">En ligne</ToggleButton>
                                <ToggleButton value="enpresentiel">En présentiel</ToggleButton>
                            </ToggleButtonGroup>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setConfirmPresenceOpen(false)}>Annuler</Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    router.push(`/participant/${participationType}/activites`);
                                    setConfirmPresenceOpen(false);
                                }}
                            >
                                Valider
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            );
        }

        // Niveau en ligne payé (avant suivi direct) - Bouton "Suivre en direct"
        if (pathname.startsWith('/participant/enligne/payer') && !pathname.includes('/suivredirecte')) {
            return (
                <>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setFollowLiveOpen(true)}
                        sx={{
                            fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' }
                        }}
                    >
                        Suivre en direct
                    </Button>

                    {/* Dialog suivi en direct */}
                    <Dialog open={followLiveOpen} onClose={() => setFollowLiveOpen(false)} maxWidth="sm" fullWidth>
                        <DialogTitle sx={{ textAlign: 'center' }}>
                            Autorisation pour vous inscrire sur liste d'émargement
                        </DialogTitle>
                        <DialogContent sx={{ textAlign: 'center', py: 2 }}>
                            En cliquant sur le bouton "suivre en direct" vous acceptez d'être inscrit sur la liste de présence
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setFollowLiveOpen(false)}>Annuler</Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    router.push('/participant/enligne/payer/suivredirecte');
                                    setFollowLiveOpen(false);
                                }}
                            >
                                Confirmer
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            );
        }

        // Niveau avec badge (présentiel payé OU en ligne avec suivi direct) - Bouton "Afficher mon badge"
        if (
            pathname.startsWith('/participant/enpresentiel/payer') ||
            pathname.startsWith('/participant/enligne/payer/suivredirecte')
        ) {
            return (
                <>
                    <Button
                        variant="outlined"
                        onClick={badgeDialog.handleOpen}
                        startIcon={<Iconify icon="solar:card-bold" />}
                        sx={{
                            fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.875rem' },
                            border: '1.5px solid #000',
                            '&:hover': {
                                backgroundColor: '#000',
                                color: '#fff',
                                border: '1.5px solid #000',
                            },
                        }}
                    >
                        Afficher mon badge
                    </Button>

                    {/* Dialog badge participant */}
                    <ParticipantBadgeDialog
                        open={badgeDialog.open}
                        onClose={badgeDialog.handleClose}
                    />
                </>
            );
        }

        return null;
    };

    return renderActions();
}