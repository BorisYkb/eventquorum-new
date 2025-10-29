// src/app/organisateur/gestionparticipant/gestion-messages/autre-message/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Box,
    Card,
    Container,
    Stack,
    Typography,
    Button,
    IconButton,
    Breadcrumbs,
    Link,
    Collapse,
    Alert,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

import { Iconify } from 'src/components/iconify';

// Import des composants
import { AddMessageDialog, NewMessageData } from 'src/sections/gestion-messages/add-message-dialog';
import { MessageAccordionItem, Message, ModeEnvoi } from 'src/sections/gestion-messages/message-accordion-item';

// ----------------------------------------------------------------------

/**
 * Données initiales des messages prédéfinis
 */
const MESSAGES_INITIAUX: Message[] = [
    {
        id: 'message1',
        titre: 'Message d\'informations de paiement au guichet',
        description: 'Affiché lorsque le participant choisit de payer directement au guichet physique',
        contenu: 'Parfait ! Rapprochez-vous d\'une hôtesse qui vous guidera vers le guichet de paiement. Merci de préparer la monnaie exacte si possible.',
        modesEnvoi: { whatsapp: false, sms: false, mail: false },
        estPublie: true,
        afficherSurPage: true,
        envoyerParReseau: false, // Les réseaux sont grisés pour ce message
    },
    {
        id: 'message2',
        titre: 'Message de confirmation après paiement',
        description: 'Envoyé automatiquement après validation et traitement réussi du paiement',
        contenu: 'Votre paiement a été validé avec succès ! Vous recevrez votre billet de confirmation par email d\'ici quelques instants. Merci de votre participation.',
        modesEnvoi: { whatsapp: false, sms: false, mail: true },
        estPublie: true,
        afficherSurPage: false,
        envoyerParReseau: true,
    },
    {
        id: 'message3',
        titre: 'Message d\'alerte problème technique',
        description: 'Diffusé en cas de dysfonctionnement technique ou d\'interruption de service',
        contenu: 'Nous rencontrons actuellement un problème technique. Nos équipes travaillent à sa résolution. Veuillez réessayer dans quelques minutes ou contactez notre support.',
        modesEnvoi: { whatsapp: false, sms: false, mail: true },
        estPublie: false,
        afficherSurPage: true,
        envoyerParReseau: true,
    },
    {
        id: 'message4',
        titre: 'Message de report ou annulation d\'événement',
        description: 'Communiqué aux participants en cas de changement de date ou d\'annulation de l\'événement',
        contenu: 'Important : L\'événement a été reporté à une date ultérieure. Votre inscription reste valide. Vous serez informé de la nouvelle date prochainement. Nous nous excusons pour ce désagrément.',
        modesEnvoi: { whatsapp: false, sms: false, mail: true },
        estPublie: false,
        afficherSurPage: false,
        envoyerParReseau: true,
    },
    {
        id: 'messageInscription',
        titre: 'Message d\'invitation à l\'inscription',
        description: 'Affiché pour encourager les visiteurs à créer un compte et s\'inscrire à l\'événement',
        contenu: 'Inscrivez-vous dès maintenant pour accéder à votre espace participant et profiter de toutes les fonctionnalités de l\'événement.',
        modesEnvoi: { whatsapp: false, sms: false, mail: true },
        estPublie: true,
        afficherSurPage: true,
        envoyerParReseau: true,
    },
];

// ----------------------------------------------------------------------

/**
 * Page Autre Message
 * Permet de gérer et personnaliser différents types de messages
 * avec des templates prédéfinis et un éditeur riche
 */
const AutreMessagePage = () => {
    const router = useRouter();

    // États pour les messages
    const [messages, setMessages] = useState<Message[]>(MESSAGES_INITIAUX);
    const [messagesExpanded, setMessagesExpanded] = useState<string>('message1');

    // États pour la publication
    const [originalPublicationStates, setOriginalPublicationStates] = useState<Record<string, boolean>>({});
    const [hasPublicationChanges, setHasPublicationChanges] = useState(false);

    // État pour le dialog d'ajout
    const [dialogOpen, setDialogOpen] = useState(false);

    // État pour l'alerte de succès
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    /**
     * Initialisation : Sauvegarder les états de publication initiaux
     */
    useEffect(() => {
        const initialStates: Record<string, boolean> = {};
        messages.forEach((msg) => {
            initialStates[msg.id] = msg.estPublie;
        });
        setOriginalPublicationStates(initialStates);
    }, []);

    /**
     * Détection des changements de publication
     */
    useEffect(() => {
        const hasChanges = messages.some(
            (msg) => msg.estPublie !== originalPublicationStates[msg.id]
        );
        setHasPublicationChanges(hasChanges);
    }, [messages, originalPublicationStates]);

    /**
     * Retour à la page de gestion des messages
     */
    const handleBackToMessages = () => {
        router.push('/organisateur/gestionparticipant/gestion-messages');
    };

    /**
     * Retour à la page précédente
     */
    const handleBack = () => {
        router.back();
    };

    /**
     * Gestion de l'expansion des accordéons
     */
    const handleAccordionExpand = (messageId: string, isExpanded: boolean) => {
        setMessagesExpanded(isExpanded ? messageId : '');
    };

    /**
     * Gestion du changement de contenu d'un message
     */
    const handleContentChange = (messageId: string, content: string) => {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === messageId ? { ...msg, contenu: content } : msg
            )
        );
    };

    /**
     * Gestion du changement de mode d'envoi
     */
    const handleModeEnvoiChange = (messageId: string, mode: keyof ModeEnvoi, checked: boolean) => {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === messageId
                    ? {
                        ...msg,
                        modesEnvoi: {
                            ...msg.modesEnvoi,
                            [mode]: checked,
                        },
                    }
                    : msg
            )
        );
    };

    /**
     * Gestion du changement de publication
     */
    const handlePublicationChange = (messageId: string, checked: boolean) => {
        setMessages((prev) =>
            prev.map((msg) =>
                msg.id === messageId ? { ...msg, estPublie: checked } : msg
            )
        );
    };

    /**
     * Sauvegarde d'un message individuel
     */
    const handleSaveMessage = (messageId: string) => {
        const message = messages.find((m) => m.id === messageId);
        console.log(`Sauvegarder le message ${messageId}:`, message);
        // TODO: Appel API pour sauvegarder le message

        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);
    };

    /**
     * Sauvegarde des changements de publication
     */
    const handleSavePublications = () => {
        console.log('Sauvegarder les états de publication:', messages);
        // TODO: Appel API pour sauvegarder les états de publication

        // Mettre à jour les états de référence
        const newStates: Record<string, boolean> = {};
        messages.forEach((msg) => {
            newStates[msg.id] = msg.estPublie;
        });
        setOriginalPublicationStates(newStates);
        setHasPublicationChanges(false);

        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);
    };

    /**
     * Ouverture du dialog d'ajout
     */
    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    /**
     * Fermeture du dialog d'ajout
     */
    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    /**
     * Ajout d'un nouveau message
     */
    const handleAddMessage = (data: NewMessageData) => {
        const newMessage: Message = {
            id: `message-${Date.now()}`,
            titre: data.titre,
            description: data.description || undefined, // undefined si vide
            contenu: data.contenu,
            modesEnvoi: { whatsapp: false, sms: false, mail: false },
            estPublie: false, // Nouveau message = non publié
            afficherSurPage: data.afficherSurPage,
            envoyerParReseau: data.envoyerParReseau,
        };

        setMessages((prev) => [...prev, newMessage]);
        setDialogOpen(false);

        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);
    };

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
            <Stack spacing={4}>
                {/* En-tête avec breadcrumbs et navigation */}
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            onClick={handleBack}
                            sx={{
                                backgroundColor: 'grey.100',
                                '&:hover': { backgroundColor: 'grey.200' },
                                borderRadius: 1,
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Box sx={{ flex: 1 }}>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: { xs: '1.5rem', md: '2rem' },
                                }}
                            >
                                Message automatique
                            </Typography>
                            {/* Breadcrumbs */}
                            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => router.push('/organisateur/gestionparticipant')}
                                    sx={{
                                        textDecoration: 'none',
                                        fontWeight: 500,
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                        '&:hover': { textDecoration: 'underline' }
                                    }}
                                >
                                    Gestion des participants
                                </Link>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={handleBackToMessages}
                                    sx={{
                                        textDecoration: 'none',
                                        fontWeight: 500,
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                        '&:hover': { textDecoration: 'underline' }
                                    }}
                                >
                                    Gestion des messages
                                </Link>
                                <Typography
                                    variant="body2"
                                    color="text.primary"
                                    sx={{
                                        fontWeight: 500,
                                        fontSize: { xs: '0.875rem', md: '1rem' },
                                    }}
                                >
                                    Message automatique
                                </Typography>
                            </Breadcrumbs>
                        </Box>
                    </Box>
                </Box>

                {/* Alerte de succès */}
                <Collapse in={showSuccessAlert}>
                    <Alert
                        severity="success"
                        onClose={() => setShowSuccessAlert(false)}
                        sx={{
                            fontSize: { xs: '0.875rem', md: '1rem' },
                        }}
                    >
                        Les modifications ont été enregistrées avec succès !
                    </Alert>
                </Collapse>

                {/* Barre d'actions avec bouton Enregistrer et Ajouter */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: { xs: 'center', sm: 'flex-end' },
                        alignItems: 'center',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                        width: '100%',
                        mt: 2,
                    }}
                >
                    {hasPublicationChanges && (
                        <Button
                            variant="contained"
                            onClick={handleSavePublications}
                            sx={{
                                color: '#fff',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: { xs: '0.875rem', md: '1rem' },
                                // px: 3,
                                // py: 1,
                                borderRadius: 1,
                                width: { xs: '100%', sm: 'auto' },
                            }}
                        >
                            Enregistrer
                        </Button>
                    )}

                    <Button
                        variant="outlined"
                        startIcon={<Iconify icon="eva:plus-fill" />}
                        onClick={handleOpenDialog}
                        sx={{
                            bgcolor: '#fff',
                            borderColor: '#ccc',
                            color: '#000',
                            '&:hover': {
                                bgcolor: '#f5f5f5',
                                borderColor: '#999',
                            },
                            textTransform: 'none',
                            fontWeight: 500,
                            fontSize: { xs: '0.875rem', md: '1rem' },
                            // px: 3,
                            // py: 1,
                            borderRadius: 1,
                            width: { xs: '100%', sm: 'auto' },
                        }}
                    >
                        Ajouter
                    </Button>
                </Box>

                {/* Liste des messages avec accordéons */}
                <Card
                    sx={{
                        borderRadius: 2,
                        boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
                    }}
                >
                    <Box sx={{ p: { xs: 2, md: 3 } }}>
                        <Stack spacing={3}>
                            {messages.map((message) => (
                                <MessageAccordionItem
                                    key={message.id}
                                    message={message}
                                    expanded={messagesExpanded === message.id}
                                    onExpand={handleAccordionExpand}
                                    onContentChange={handleContentChange}
                                    onModeEnvoiChange={handleModeEnvoiChange}
                                    onPublicationChange={handlePublicationChange}
                                    onSave={handleSaveMessage}
                                />
                            ))}
                        </Stack>
                    </Box>
                </Card>

                {/* Footer */}
                <Box
                    sx={{
                        mt: 4,
                        py: 3,
                        borderTop: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 2,
                    }}
                >
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.75rem', md: '0.875rem' } }}
                    >
                        © 2024 EVENTQUORUM. Powered by FX_LABS SARL.
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="text"
                            size="small"
                            sx={{
                                textTransform: 'none',
                                fontSize: { xs: '0.75rem', md: '0.875rem' },
                            }}
                        >
                            Confidentialité
                        </Button>
                        <Button
                            variant="text"
                            size="small"
                            sx={{
                                textTransform: 'none',
                                fontSize: { xs: '0.75rem', md: '0.875rem' },
                            }}
                        >
                            Aide
                        </Button>
                    </Stack>
                </Box>
            </Stack>

            {/* Dialog d'ajout de message */}
            <AddMessageDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                onAdd={handleAddMessage}
            />
        </Container>
    );
};

export default AutreMessagePage;