//src/app/organisateur/gestionparticipant/gestion-messages/detail/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    Box,
    Card,
    Container,
    Stack,
    Typography,
    TextField,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Checkbox,
    FormGroup,
    Paper,
    IconButton,
    Breadcrumbs,
    Link,
    Grid2 as Grid,
    Chip,
    Divider,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Send as SendIcon,
    CalendarToday as CalendarIcon,
} from '@mui/icons-material';

// Import du composant de statistiques
import { SuperviseurWidgetSummary } from 'src/sections/overview/superviseur/view/superviseur-widget-summary-2';

// Interface pour un message
interface MessageDetail {
    id: number;
    titre: string;
    type: 'Programmé' | 'Automatique';
    statut: 'Envoyé' | 'Échec' | 'En cours';
    contenu: string;
    modeEnvoi: {
        whatsapp: boolean;
        telephone: boolean;
        email: boolean;
    };
    programmation: {
        type: 'immediate' | 'planifie';
        dateHeure?: string;
    };
    destinataires: {
        type: 'tous' | 'groupe' | 'individuel';
        nombre: number;
    };
    statistiques: {
        envoyes: number;
        recus: number;
        echecs: number;
    };
    dateCreation: string;
    dateEnvoi?: string;
}

/**
 * Page de détail d'un message
 * Affiche toutes les informations d'un message spécifique
 * avec ses statistiques et options de gestion
 */
const DetailMessagePage = () => {
    const router = useRouter();
    const params = useParams();
    const messageId = params?.id;

    // État pour les données du message
    const [message, setMessage] = useState<MessageDetail | null>(null);
    const [loading, setLoading] = useState(true);

    // Simulation de chargement des données
    useEffect(() => {
        const loadMessage = async () => {
            // Simulation d'un appel API
            await new Promise(resolve => setTimeout(resolve, 500));

            // Données simulées basées sur l'ID
            const messageData: MessageDetail = {
                id: Number(messageId),
                titre: 'Mail d\'invitation',
                type: 'Programmé',
                statut: 'Envoyé',
                contenu: `Nous avons le plaisir de vous inviter à <strong>Nom de l'Évènement</strong>, qui se tiendra le <strong>Date à Heure</strong> à <strong>Lieu</strong>. Cet évènement sera l'occasion de <strong>décrire brièvement l'objectif ou le contexte de l'évènement, par exemple : célébrer notre 10e anniversaire, présenter notre nouveau produit, etc</strong>.`,
                modeEnvoi: {
                    whatsapp: true,
                    telephone: false,
                    email: false,
                },
                programmation: {
                    type: 'planifie',
                    dateHeure: '2024-01-05T14:30',
                },
                destinataires: {
                    type: 'tous',
                    nombre: 100,
                },
                statistiques: {
                    envoyes: 100,
                    recus: 95,
                    echecs: 5,
                },
                dateCreation: '2024-01-04T10:00',
                dateEnvoi: '2024-01-05T14:30',
            };

            setMessage(messageData);
            setLoading(false);
        };

        if (messageId) {
            loadMessage();
        }
    }, [messageId]);

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
     * Édition du message
     */
    const handleEdit = () => {
        // TODO: Redirection vers la page d'édition
        console.log('Éditer le message:', messageId);
    };

    /**
     * Renvoyer le message
     */
    const handleResend = () => {
        // TODO: Logique de renvoi
        console.log('Renvoyer le message:', messageId);
    };

    /**
     * Obtenir les modes d'envoi actifs
     */
    const getModesEnvoi = () => {
        if (!message) return [];
        const modes = [];
        if (message.modeEnvoi.whatsapp) modes.push('WhatsApp');
        if (message.modeEnvoi.telephone) modes.push('Téléphone');
        if (message.modeEnvoi.email) modes.push('Email');
        return modes;
    };

    /**
     * Formatage de la date
     */
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography>Chargement...</Typography>
            </Container>
        );
    }

    if (!message) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography>Message non trouvé</Typography>
            </Container>
        );
    }

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
                                Détail d'un message
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
                                    Détail d'un message
                                </Typography>
                            </Breadcrumbs>
                        </Box>
                    </Box>
                </Box>

                {/* Statistiques */}
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <SuperviseurWidgetSummary
                            title="Nombre destinataires"
                            total={message.destinataires.nombre}
                            color="info"
                            sx={{ height: 140 }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <SuperviseurWidgetSummary
                            title="Statut"
                            total={1}
                            subtitle={message.statut}
                            color={message.statut === 'Envoyé' ? 'success' : message.statut === 'Échec' ? 'error' : 'warning'}
                            sx={{ height: 140 }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<SendIcon />}
                            onClick={handleResend}
                            sx={{
                                height: 140,
                                backgroundColor: '#00BCD4',
                                color: 'white',
                                '&:hover': { backgroundColor: '#00ACC1' },
                                borderRadius: 2,
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                            }}
                        >
                            Envoyer
                        </Button>
                    </Grid>
                </Grid>

                {/* Détails du message */}
                <Card sx={{
                    borderRadius: 2,
                    boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
                }}>
                    <Box sx={{ p: 4 }}>
                        <Stack spacing={4}>
                            {/* Titre du message */}
                            <Box>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Titre du message
                                </Typography>
                                <TextField
                                    fullWidth
                                    value={message.titre}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 1,
                                            backgroundColor: 'grey.50',
                                        }
                                    }}
                                />
                            </Box>

                            {/* Type de message et Mode d'envoi */}
                            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                {/* Type de message */}
                                <Box sx={{ flex: 1, minWidth: 250 }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                        Type de message
                                    </Typography>
                                    <FormControl component="fieldset">
                                        <RadioGroup value={message.type.toLowerCase()}>
                                            <FormControlLabel
                                                value="programmé"
                                                control={<Radio />}
                                                label="Programmé"
                                                disabled
                                            />
                                            <FormControlLabel
                                                value="automatique"
                                                control={<Radio />}
                                                label="Automatique"
                                                disabled
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>

                                {/* Mode d'envoi */}
                                <Box sx={{ flex: 1, minWidth: 250 }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                        Mode d'envoi
                                    </Typography>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={message.modeEnvoi.whatsapp}
                                                    disabled
                                                />
                                            }
                                            label="WhatsApp"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={message.modeEnvoi.telephone}
                                                    disabled
                                                />
                                            }
                                            label="Téléphone"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={message.modeEnvoi.email}
                                                    disabled
                                                />
                                            }
                                            label="Email"
                                        />
                                    </FormGroup>
                                </Box>
                            </Box>

                            {/* Contenu du message */}
                            <Box>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Contenu du message
                                </Typography>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 3,
                                        borderRadius: 1,
                                        backgroundColor: 'grey.50',
                                        minHeight: 200,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{ lineHeight: 1.6 }}
                                        dangerouslySetInnerHTML={{ __html: message.contenu }}
                                    />
                                </Paper>
                            </Box>

                            <Divider />

                            {/* Programmation de l'envoi */}
                            <Box>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Programmation de l'envoi du message
                                </Typography>

                                <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, backgroundColor: 'grey.50' }}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={message.programmation.type === 'planifie'}
                                                    disabled
                                                />
                                            }
                                            label="Envoi planifié"
                                        />
                                    </FormGroup>

                                    {message.programmation.type === 'planifie' && message.programmation.dateHeure && (
                                        <Box sx={{ mt: 2, ml: 4 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CalendarIcon sx={{ color: 'text.secondary' }} />
                                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                    Date/Heure :
                                                </Typography>
                                                <Typography variant="body2">
                                                    {formatDate(message.programmation.dateHeure)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}
                                </Paper>
                            </Box>

                            {/* Destinataires */}
                            <Box>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Destinataire
                                </Typography>

                                <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, backgroundColor: 'grey.50' }}>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={message.destinataires.type === 'tous'}
                                                    disabled
                                                />
                                            }
                                            label="Tous les participants"
                                        />
                                    </FormGroup>

                                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Nombre de destinataires :
                                        </Typography>
                                        <Chip
                                            label={message.destinataires.nombre}
                                            color="primary"
                                            size="small"
                                        />
                                    </Box>
                                </Paper>
                            </Box>

                            {/* Informations supplémentaires */}
                            <Box>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Informations
                                </Typography>

                                <Stack spacing={2}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Date de création :
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                            {formatDate(message.dateCreation)}
                                        </Typography>
                                    </Box>

                                    {message.dateEnvoi && (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Date d'envoi :
                                            </Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                {formatDate(message.dateEnvoi)}
                                            </Typography>
                                        </Box>
                                    )}

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" color="text.secondary">
                                            Modes d'envoi actifs :
                                        </Typography>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            {getModesEnvoi().map((mode) => (
                                                <Chip
                                                    key={mode}
                                                    label={mode}
                                                    size="small"
                                                    variant="outlined"
                                                    color="primary"
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                </Stack>
                            </Box>
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
                        © 2024 EVENTQUORUM EVENTS. Powered by PCI_LABS SARL.
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

export default DetailMessagePage;