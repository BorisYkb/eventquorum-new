//src/app/organisateur/gestionparticipant/gestion-messages/planifier-envoi/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import {
    ArrowBack as ArrowBackIcon,
    Send as SendIcon,
} from '@mui/icons-material';
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
    Alert,
    Divider,
} from '@mui/material';

import { Editor } from 'src/components/editor';

/**
 * Page de planification d'envoi de message
 * Permet de créer et planifier l'envoi de messages personnalisés
 * aux participants selon différents critères
 */
const PlanifierEnvoiPage = () => {
    const router = useRouter();

    // États pour le formulaire
    const [titreMessage, setTitreMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('programmé');
    const [contenuMessage, setContenuMessage] = useState('');
    const [modeEnvoi, setModeEnvoi] = useState({
        whatsapp: false,
        telephone: false,
        email: false,
    });
    const [programmationEnvoi, setProgrammationEnvoi] = useState({
        immediate: false,
        planifie: false,
        dateHeure: '',
    });
    const [destinataires, setDestinataires] = useState({
        tousParticipants: false,
        groupeMultiple: false,
        individuel: false,
    });
    const [checked, setChecked] = useState(false); // Pour fullItem si nécessaire

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
     * Gestion du changement de mode d'envoi
     */
    const handleModeEnvoiChange = (mode: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setModeEnvoi(prev => ({
            ...prev,
            [mode]: event.target.checked,
        }));
    };

    /**
     * Gestion du changement de programmation
     */
    const handleProgrammationChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setProgrammationEnvoi(prev => ({
            immediate: false,
            planifie: false,
            dateHeure: prev.dateHeure,
            [type]: event.target.checked,
        }));
    };

    /**
     * Gestion du changement de destinataires
     */
    const handleDestinatairesChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setDestinataires(prev => ({
            tousParticipants: false,
            groupeMultiple: false,
            individuel: false,
            [type]: event.target.checked,
        }));
    };

    /**
     * Validation et envoi du formulaire
     */
    const handleEnvoyer = () => {
        // Validation basique
        if (!titreMessage.trim()) {
            alert('Veuillez saisir un titre de message');
            return;
        }
        if (!contenuMessage.trim()) {
            alert('Veuillez saisir le contenu du message');
            return;
        }
        if (!Object.values(modeEnvoi).some(Boolean)) {
            alert('Veuillez sélectionner au moins un mode d\'envoi');
            return;
        }
        if (!Object.values(destinataires).some(Boolean)) {
            alert('Veuillez sélectionner les destinataires');
            return;
        }

        // Simulation de l'envoi
        console.log('Données du message:', {
            titreMessage,
            typeMessage,
            contenuMessage,
            modeEnvoi,
            programmationEnvoi,
            destinataires,
        });

        alert('Message planifié avec succès !');
        handleBackToMessages();
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Stack spacing={4}>
                {/* En-tête avec breadcrumbs et navigation */}
                <Box>
                    {/* Titre principal */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                Planifier l'envoi d'un message
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
                                    Planifier l'envoi d'un message
                                </Typography>
                            </Breadcrumbs>
                        </Box>

                        <Button
                            variant="contained"
                            startIcon={<ArrowBackIcon />}
                            onClick={handleBack}
                            sx={{
                                backgroundColor: '#000',
                                color: 'white',
                                '&:hover': { backgroundColor: '#333' },
                                borderRadius: 1,
                                textTransform: 'none',
                                fontWeight: 600,
                                px: 3,
                            }}
                        >
                            Retour
                        </Button>
                    </Box>
                </Box>

                {/* Formulaire principal */}
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
                                    placeholder="Mail d'invitation"
                                    value={titreMessage}
                                    onChange={(e) => setTitreMessage(e.target.value)}
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 1,
                                        }
                                    }}
                                />
                            </Box>

                            {/* Type de message et Mode d'envoi */}
                            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                {/* Type de message */}
                                <Box sx={{ flex: 1, minWidth: 250 }}>
                                    <FormControl component="fieldset">
                                        <FormLabel
                                            component="legend"
                                            sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}
                                        >
                                            Type de message
                                        </FormLabel>
                                        <RadioGroup
                                            value={typeMessage}
                                            onChange={(e) => setTypeMessage(e.target.value)}
                                        >
                                            <FormControlLabel
                                                value="programmé"
                                                control={<Radio />}
                                                label="Programmé"
                                            />
                                            <FormControlLabel
                                                value="automatique"
                                                control={<Radio />}
                                                label="Automatique"
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
                                                    checked={modeEnvoi.whatsapp}
                                                    onChange={handleModeEnvoiChange('whatsapp')}
                                                />
                                            }
                                            label="WhatsApp"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={modeEnvoi.telephone}
                                                    onChange={handleModeEnvoiChange('telephone')}
                                                />
                                            }
                                            label="Téléphone"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={modeEnvoi.email}
                                                    onChange={handleModeEnvoiChange('email')}
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
                                <Editor
                                    fullItem={checked}
                                    value={contenuMessage}
                                    onChange={(value) => setContenuMessage(value)}
                                    sx={{
                                        height: 1000,        // Hauteur fixe de 500px
                                        maxHeight: 720,     // Hauteur maximale conservée
                                        border: 1,
                                        borderColor: 'divider',
                                        borderRadius: 1,
                                    }}
                                />
                            </Box>
                            <Divider />

                            {/* Programmation de l'envoi de message */}
                            <Box>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Programmation de l'envoi de message
                                </Typography>

                                <FormGroup sx={{ mb: 3 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={programmationEnvoi.immediate}
                                                onChange={handleProgrammationChange('immediate')}
                                            />
                                        }
                                        label="Envoi immédiat"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={programmationEnvoi.planifie}
                                                onChange={handleProgrammationChange('planifie')}
                                            />
                                        }
                                        label="Envoi planifié"
                                    />
                                </FormGroup>

                                {/* Date et heure si planifié */}
                                {programmationEnvoi.planifie && (
                                    <Box sx={{ ml: 4, mb: 2 }}>
                                        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                            Date/Heure :
                                        </Typography>
                                        <TextField
                                            type="datetime-local"
                                            value={programmationEnvoi.dateHeure}
                                            onChange={(e) => setProgrammationEnvoi(prev => ({
                                                ...prev,
                                                dateHeure: e.target.value
                                            }))}
                                            sx={{ maxWidth: 250 }}
                                        />
                                    </Box>
                                )}
                            </Box>

                            <Divider />

                            {/* Destinataires */}
                            <Box>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                                    Destinataires
                                </Typography>

                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={destinataires.tousParticipants}
                                                onChange={handleDestinatairesChange('tousParticipants')}
                                            />
                                        }
                                        label="Tous les participants"
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={destinataires.groupeMultiple}
                                                onChange={handleDestinatairesChange('groupeMultiple')}
                                            />
                                        }
                                        label="Groupe (choix multiple)"
                                    />

                                    {/* Zone de sélection de groupes si activée */}
                                    {destinataires.groupeMultiple && (
                                        <Paper variant="outlined" sx={{ p: 2, ml: 4, mt: 1, maxWidth: 300 }}>
                                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                                Sélectionner les groupes :
                                            </Typography>
                                            <FormGroup>
                                                <FormControlLabel control={<Checkbox size="small" />} label="Groupe 1" />
                                                <FormControlLabel control={<Checkbox size="small" />} label="Groupe 2" />
                                                <FormControlLabel control={<Checkbox size="small" />} label="Groupe 3" />
                                            </FormGroup>
                                        </Paper>
                                    )}

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={destinataires.individuel}
                                                onChange={handleDestinatairesChange('individuel')}
                                            />
                                        }
                                        label="Individuel"
                                    />

                                    {/* Zone de sélection individuelle si activée */}
                                    {destinataires.individuel && (
                                        <Paper variant="outlined" sx={{ p: 2, ml: 4, mt: 1, maxWidth: 300 }}>
                                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                                                Coordonnées du participant :
                                            </Typography>
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={3}
                                                placeholder="Mail / SMS / Whatsapp"
                                                variant="outlined"
                                                size="small"
                                            />
                                        </Paper>
                                    )}
                                </FormGroup>
                            </Box>

                            {/* Bouton d'envoi */}
                            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                                <Button
                                    variant="contained"
                                    startIcon={<SendIcon />}
                                    onClick={handleEnvoyer}
                                    size="large"
                                    sx={{
                                        backgroundColor: '#00BCD4',
                                        color: 'white',
                                        '&:hover': { backgroundColor: '#00ACC1' },
                                        borderRadius: 1,
                                        textTransform: 'none',
                                        fontWeight: 600,
                                        px: 4,
                                        py: 1.5,
                                    }}
                                >
                                    Envoyer
                                </Button>
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

export default PlanifierEnvoiPage;