//src/app/organisateur/gestionparticipant/gestion-messages/autre-message/page.tsx
'use client';

import { useState } from 'react';
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
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Paper,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';

// Import du composant Editor
import { Editor } from 'src/components/editor';

// Interface pour les messages prédéfinis
interface MessagePredefini {
    id: string;
    titre: string;
    description: string;
    contenuDefaut: string;
    declencheur?: string;
}

/**
 * Page Autre Message
 * Permet de gérer et personnaliser différents types de messages
 * avec des templates prédéfinis et un éditeur riche
 */
const AutreMessagePage = () => {
    const router = useRouter();

    // États pour les messages et éditeurs
    const [messagesExpanded, setMessagesExpanded] = useState<string>('message1');
    const [messagesContent, setMessagesContent] = useState<Record<string, string>>({
        message1: 'Parfait, rapprochez-vous d\'une hôtesse qui vous guidera vers le guichet de payement. Merci de préparer la monnaie.',
        message2: '',
        message3: '',
        message4: '',
        messageInscription: 'Inscrivez-vous dès maintenant pour accéder à votre espace',
    });

    // Messages prédéfinis
    const messagesPredefinis: MessagePredefini[] = [
        {
            id: 'message1',
            titre: 'Message d\'informations de paiement ou guichet',
            description: 'Ce message s\'affiche lorsque le participant décide de passer au guichet',
            contenuDefaut: 'Parfait, rapprochez-vous d\'une hôtesse qui vous guidera vers le guichet de payement. Merci de préparer la monnaie.',
        },
        {
            id: 'message2',
            titre: 'Message 2',
            description: 'Description du message 2',
            contenuDefaut: '',
        },
        {
            id: 'message3',
            titre: 'Message 3',
            description: 'Description du message 3',
            contenuDefaut: '',
        },
        {
            id: 'message4',
            titre: 'Message 4',
            description: 'Description du message 4',
            contenuDefaut: '',
        },
        {
            id: 'messageInscription',
            titre: 'Message d\'informations d\'inscription',
            description: 'Ce message s\'affiche lorsque le participant décide de s\'inscrire',
            contenuDefaut: 'Inscrivez-vous dès maintenant pour accéder à votre espace',
        },
    ];

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
    const handleAccordionChange = (messageId: string) => (
        event: React.SyntheticEvent,
        isExpanded: boolean
    ) => {
        setMessagesExpanded(isExpanded ? messageId : '');
    };

    /**
     * Gestion du changement de contenu d'un message
     */
    const handleContentChange = (messageId: string) => (value: string) => {
        setMessagesContent(prev => ({
            ...prev,
            [messageId]: value,
        }));
    };

    /**
     * Sauvegarde d'un message
     */
    const handleSauvegarder = (messageId: string) => {
        console.log(`Sauvegarder le message ${messageId}:`, messagesContent[messageId]);
        // TODO: Implémenter la sauvegarde
        alert(`Message "${messagesPredefinis.find(m => m.id === messageId)?.titre}" sauvegardé !`);
    };

    /**
     * Sauvegarde de tous les messages
     */
    // const handleSauvegarderTout = () => {
    //     console.log('Sauvegarder tous les messages:', messagesContent);
    //     // TODO: Implémenter la sauvegarde globale
    //     alert('Tous les messages ont été sauvegardés !');
    // };

    return (
        <Container maxWidth="lg" sx={{ py: 2 }}>
            <Stack spacing={4}>
                {/* En-tête avec breadcrumbs et navigation */}
                <Box>
                    {/* Titre principal */}
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
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                Autre Message
                            </Typography>
                            {/* Breadcrumbs */}
                            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => router.push('/organisateur/gestionparticipant')}
                                    sx={{
                                        textDecoration: 'none',
                                        color: 'primary.main',
                                        fontWeight: 500,
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
                                        color: 'primary.main',
                                        fontWeight: 500,
                                        '&:hover': { textDecoration: 'underline' }
                                    }}
                                >
                                    Gestion des messages
                                </Link>
                                <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                                    Autre message
                                </Typography>
                            </Breadcrumbs>
                        </Box>
                        {/* <Button
                            variant="contained"
                            onClick={handleSauvegarderTout}
                            sx={{
                                backgroundColor: '#00BCD4',
                                color: 'white',
                                '&:hover': { backgroundColor: '#00ACC1' },
                                borderRadius: 1,
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 3,
                            }}
                        >
                            Sauvegarder tout
                        </Button> */}
                    </Box>
                </Box>

                {/* Liste des messages avec accordéons */}
                <Card sx={{
                    borderRadius: 2,
                    boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
                }}>
                    <Box sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            {messagesPredefinis.map((message, index) => (
                                <Accordion
                                    key={message.id}
                                    expanded={messagesExpanded === message.id}
                                    onChange={handleAccordionChange(message.id)}
                                    sx={{
                                        border: 1,
                                        borderColor: 'divider',
                                        borderRadius: 2,
                                        '&:before': {
                                            display: 'none',
                                        },
                                        '&.Mui-expanded': {
                                            margin: 0,
                                        },
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        sx={{
                                            backgroundColor: messagesExpanded === message.id ? 'grey.50' : 'white',
                                            borderRadius: 1,
                                            '&.Mui-expanded': {
                                                borderBottomLeftRadius: 0,
                                                borderBottomRightRadius: 0,
                                            },
                                        }}
                                    >
                                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                            {message.titre}
                                        </Typography>
                                    </AccordionSummary>

                                    <AccordionDetails sx={{ p: 3, backgroundColor: 'grey.50' }}>
                                        <Stack spacing={3}>
                                            {/* Description du message */}
                                            {message.description && (
                                                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                                    {message.description}
                                                </Typography>
                                            )}

                                            {/* Contenu du message */}
                                            <Box>
                                                <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                                                    Contenu du message
                                                </Typography>

                                                <Paper
                                                    variant="outlined"
                                                    sx={{
                                                        borderRadius: 1,
                                                        overflow: 'hidden',
                                                    }}
                                                >
                                                    <Editor
                                                        fullItem={false}
                                                        value={messagesContent[message.id] || message.contenuDefaut}
                                                        onChange={handleContentChange(message.id)}
                                                        sx={{
                                                            height: 200,
                                                            '& .ql-container': {
                                                                border: 'none',
                                                            },
                                                            '& .ql-toolbar': {
                                                                borderBottom: 1,
                                                                borderColor: 'divider',
                                                            }
                                                        }}
                                                    />
                                                </Paper>
                                            </Box>

                                            {/* Bouton de sauvegarde individuel */}
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleSauvegarder(message.id)}
                                                    sx={{
                                                        backgroundColor: '#4CAF50',
                                                        color: 'white',
                                                        '&:hover': { backgroundColor: '#45A049' },
                                                        borderRadius: 1,
                                                        textTransform: 'none',
                                                        fontWeight: 600,
                                                        px: 3,
                                                    }}
                                                >
                                                    Enregistrer
                                                </Button>
                                            </Box>
                                        </Stack>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Stack>
                    </Box>
                </Card>

                {/* Actions globales */}
                {/* <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={handleBack}
                        sx={{
                            borderRadius: 1,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4,
                        }}
                    >
                        Annuler
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSauvegarderTout}
                        sx={{
                            backgroundColor: '#00BCD4',
                            color: 'white',
                            '&:hover': { backgroundColor: '#00ACC1' },
                            borderRadius: 1,
                            textTransform: 'none',
                            fontWeight: 600,
                            px: 4,
                        }}
                    >
                        Sauvegarder tous les messages
                    </Button>
                </Box> */}

                {/* Footer */}
                <Box sx={{
                    mt: 4,
                    py: 3,
                    borderTop: 1,
                    borderColor: 'divider',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                }}>
                    <Typography variant="body2" color="text.secondary">
                        © 2024 EVENTQUORUM. Powered by FX_LABS SARL.
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
                            Confidentialité
                        </Button>
                        <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
                            Aide
                        </Button>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    );
};

export default AutreMessagePage;