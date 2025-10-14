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
    FormControl,
    FormLabel,
    FormControlLabel,
    Checkbox,
    FormGroup,
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

// Interface pour les modes d'envoi
interface ModeEnvoi {
    whatsapp: boolean;
    sms: boolean;
    mail: boolean;
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

    // État pour les modes d'envoi de chaque message
    const [modesEnvoi, setModesEnvoi] = useState<Record<string, ModeEnvoi>>({
        message1: { whatsapp: false, sms: false, mail: true },
        message2: { whatsapp: false, sms: false, mail: true },
        message3: { whatsapp: false, sms: false, mail: true },
        message4: { whatsapp: false, sms: false, mail: true },
        messageInscription: { whatsapp: false, sms: false, mail: true },
    });

    // Messages prédéfinis
    const messagesPredefinis: MessagePredefini[] = [
        {
            id: 'message1',
            titre: 'Message d\'informations de paiement au guichet',
            description: 'Affiché lorsque le participant choisit de payer directement au guichet physique',
            contenuDefaut: 'Parfait ! Rapprochez-vous d\'une hôtesse qui vous guidera vers le guichet de paiement. Merci de préparer la monnaie exacte si possible.',
        },
        {
            id: 'message2',
            titre: 'Message de confirmation après paiement',
            description: 'Envoyé automatiquement après validation et traitement réussi du paiement',
            contenuDefaut: 'Votre paiement a été validé avec succès ! Vous recevrez votre billet de confirmation par email d\'ici quelques instants. Merci de votre participation.',
        },
        {
            id: 'message3',
            titre: 'Message d\'alerte problème technique',
            description: 'Diffusé en cas de dysfonctionnement technique ou d\'interruption de service',
            contenuDefaut: 'Nous rencontrons actuellement un problème technique. Nos équipes travaillent à sa résolution. Veuillez réessayer dans quelques minutes ou contactez notre support.',
        },
        {
            id: 'message4',
            titre: 'Message de report ou annulation d\'événement',
            description: 'Communiqué aux participants en cas de changement de date ou d\'annulation de l\'événement',
            contenuDefaut: 'Important : L\'événement a été reporté à une date ultérieure. Votre inscription reste valide. Vous serez informé de la nouvelle date prochainement. Nous nous excusons pour ce désagrément.',
        },
        {
            id: 'messageInscription',
            titre: 'Message d\'invitation à l\'inscription',
            description: 'Affiché pour encourager les visiteurs à créer un compte et s\'inscrire à l\'événement',
            contenuDefaut: 'Inscrivez-vous dès maintenant pour accéder à votre espace participant et profiter de toutes les fonctionnalités de l\'événement.',
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
     * Gestion du changement de mode d'envoi
     */
    const handleModeEnvoiChange = (messageId: string, mode: keyof ModeEnvoi) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setModesEnvoi(prev => ({
            ...prev,
            [messageId]: {
                ...prev[messageId],
                [mode]: event.target.checked,
            },
        }));
    };

    /**
     * Sauvegarde d'un message
     */
    const handleSauvegarder = (messageId: string) => {
        console.log(`Sauvegarder le message ${messageId}:`, {
            contenu: messagesContent[messageId],
            modesEnvoi: modesEnvoi[messageId],
        });
        // TODO: Implémenter la sauvegarde
        alert(`Message "${messagesPredefinis.find(m => m.id === messageId)?.titre}" sauvegardé !`);
    };

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
                    </Box>
                </Box>

                {/* Liste des messages avec accordéons */}
                <Card sx={{
                    borderRadius: 2,
                    boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
                }}>
                    <Box sx={{ p: 3 }}>
                        <Stack spacing={3}>
                            {messagesPredefinis.map((message) => (
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
                                            {/* Mode d'envoi avec checkboxes */}
                                            <Box>
                                                <FormControl component="fieldset" fullWidth>
                                                    <FormLabel
                                                        component="legend"
                                                        sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}
                                                    >
                                                        Mode d'envoi
                                                    </FormLabel>

                                                    <FormGroup
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection: { xs: 'column', sm: 'row' },
                                                            gap: 2,
                                                        }}
                                                    >
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={modesEnvoi[message.id]?.whatsapp || false}
                                                                    onChange={handleModeEnvoiChange(message.id, 'whatsapp')}
                                                                />
                                                            }
                                                            label="WhatsApp"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={modesEnvoi[message.id]?.sms || false}
                                                                    onChange={handleModeEnvoiChange(message.id, 'sms')}
                                                                />
                                                            }
                                                            label="SMS"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={modesEnvoi[message.id]?.mail || false}
                                                                    onChange={handleModeEnvoiChange(message.id, 'mail')}
                                                                />
                                                            }
                                                            label="Mail"
                                                        />
                                                    </FormGroup>
                                                </FormControl>
                                            </Box>

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