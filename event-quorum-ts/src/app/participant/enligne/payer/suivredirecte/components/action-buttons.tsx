// src/app/participant/enligne/payer/suivredirecte/components/action-buttons.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid2';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

import { Iconify } from 'src/components/iconify';
import { PROGRAMME_DAYS } from './programme/programme-data';

// ----------------------------------------------------------------------

interface Question {
    id: string;
    question: string;
    isEvent: boolean;
    activityId?: string;
    activityTitle?: string;
    date: string;
    status: 'En attente' | 'Répondu';
    response?: string;
}

/**
 * Composant des boutons d'action pour la participation aux enquêtes et partage d'avis
 * Maintenant avec accordion pour poser des questions
 */
export function ActionButtons() {
    const router = useRouter();
    const [enqueteModalOpen, setEnqueteModalOpen] = useState(false);
    const [codeEnquete, setCodeEnquete] = useState('');
    const [questionAccordionExpanded, setQuestionAccordionExpanded] = useState(false);

    // États pour le formulaire de question
    const [isEventQuestion, setIsEventQuestion] = useState(true);
    const [selectedActivityId, setSelectedActivityId] = useState('');
    const [questionText, setQuestionText] = useState('');

    // État pour les questions (simule une base de données locale)
    const [questions, setQuestions] = useState<Question[]>([
        {
            id: '1',
            question: 'Quelle est l\'horaire exact de la cérémonie d\'ouverture ?',
            isEvent: false,
            activityId: '2',
            activityTitle: "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
            date: new Date('2024-01-15T10:30:00').toLocaleString('fr-FR'),
            status: 'Répondu',
            response: 'La cérémonie d\'ouverture commence à 09h00 précises et se termine à 12h00.'
        }
    ]);

    // État pour le popup de détail
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

    // Récupérer toutes les activités de tous les jours
    const allActivities = PROGRAMME_DAYS.flatMap(day =>
        day.activities.map(activity => ({
            id: activity.id,
            title: activity.title,
            day: day.label
        }))
    );

    /**
     * Ouvre la modal pour participer à une enquête
     */
    const handleParticiperEnquete = () => {
        setEnqueteModalOpen(true);
    };

    /**
     * Navigue vers la page de partage d'avis
     */
    const handlePartagerAvis = () => {
        router.push('/participant/enligne/payer/suivredirecte/mesinteractions?tab=reviews');
    };

    /**
     * Confirme la participation à l'enquête avec le code saisi
     */
    const handleConfirmEnquete = () => {
        if (codeEnquete.trim()) {
            router.push(`/participant/enligne/payer/suivredirecte/enquete?code=${codeEnquete}`);
            setEnqueteModalOpen(false);
            setCodeEnquete('');
        }
    };

    /**
     * Ferme la modal d'enquête et remet à zéro le code
     */
    const handleCloseEnqueteModal = () => {
        setEnqueteModalOpen(false);
        setCodeEnquete('');
    };

    /**
     * Gère le changement du checkbox Événement
     */
    const handleEventCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsEventQuestion(event.target.checked);
        if (event.target.checked) {
            setSelectedActivityId(''); // Reset l'activité si on sélectionne Événement
        }
    };

    /**
     * Envoie la question
     */
    const handleSendQuestion = () => {
        if (!questionText.trim()) return;
        if (!isEventQuestion && !selectedActivityId) return;

        const selectedActivity = allActivities.find(act => act.id === selectedActivityId);

        const newQuestion: Question = {
            id: Date.now().toString(),
            question: questionText,
            isEvent: isEventQuestion,
            activityId: isEventQuestion ? undefined : selectedActivityId,
            activityTitle: isEventQuestion ? undefined : selectedActivity?.title,
            date: new Date().toLocaleString('fr-FR'),
            status: 'En attente'
        };

        setQuestions([newQuestion, ...questions]);

        // Reset le formulaire
        setQuestionText('');
        setIsEventQuestion(true);
        setSelectedActivityId('');
    };

    /**
     * Ouvre le popup de détail d'une question
     */
    const handleViewDetails = (question: Question) => {
        setSelectedQuestion(question);
        setDetailModalOpen(true);
    };

    /**
     * Ferme le popup de détail
     */
    const handleCloseDetailModal = () => {
        setDetailModalOpen(false);
        setSelectedQuestion(null);
    };

    return (
        <>
            <Grid size={12}>
                <Card
                    sx={{
                        borderRadius: { xs: 1, md: 2 },
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                        {/* Première ligne de boutons */}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            gap: { xs: 1.5, md: 2 },
                            flexWrap: 'wrap',
                            mb: 2
                        }}>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<Iconify icon="mdi:poll" />}
                                onClick={handleParticiperEnquete}
                                sx={{
                                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    px: { xs: 1.5, md: 2 },
                                    py: { xs: 0.75, md: 1 },
                                    fontWeight: 600,
                                    borderRadius: 1
                                }}
                            >
                                Je participe à une enquête
                            </Button>

                            <Button
                                variant="contained"
                                color="warning"
                                startIcon={<Iconify icon="solar:heart-bold" />}
                                onClick={handlePartagerAvis}
                                sx={{
                                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    px: { xs: 1.5, md: 2 },
                                    py: { xs: 0.75, md: 1 },
                                    fontWeight: 600,
                                    borderRadius: 1
                                }}
                            >
                                Partager un avis
                            </Button>
                        </Box>

                        {/* Accordion pour poser une question */}
                        <Accordion
                            expanded={questionAccordionExpanded}
                            onChange={(e, isExpanded) => setQuestionAccordionExpanded(isExpanded)}
                            sx={{
                                boxShadow: 'none',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                                '&:before': { display: 'none' }
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                                sx={{
                                    bgcolor: 'grey.50',
                                    '&:hover': { bgcolor: 'grey.100' }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Iconify icon="mdi:help-circle-outline" width={20} />
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                        Poser une question
                                    </Typography>
                                </Box>
                            </AccordionSummary>

                            <AccordionDetails sx={{ p: 2 }}>
                                {/* Formulaire de question */}
                                <Box sx={{ mb: 3 }}>
                                    <Grid container spacing={2}>
                                        {/* Checkbox Événement */}
                                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={isEventQuestion}
                                                        onChange={handleEventCheckboxChange}
                                                    />
                                                }
                                                label="Événement"
                                            />
                                        </Grid>

                                        {/* Liste déroulante des activités */}
                                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                                            <FormControl fullWidth disabled={isEventQuestion}>
                                                <InputLabel>Sélectionner une activité</InputLabel>
                                                <Select
                                                    value={selectedActivityId}
                                                    onChange={(e) => setSelectedActivityId(e.target.value)}
                                                    label="Sélectionner une activité"
                                                    MenuProps={{
                                                        PaperProps: {
                                                            sx: {
                                                                maxHeight: 300,
                                                                maxWidth: { xs: '90vw', sm: 500 }
                                                            }
                                                        }
                                                    }}
                                                    sx={{ minHeight: '56px' }}
                                                >
                                                    {allActivities.map((activity) => (
                                                        <MenuItem
                                                            key={activity.id}
                                                            value={activity.id}
                                                            sx={{
                                                                whiteSpace: 'normal',
                                                                wordWrap: 'break-word',
                                                                py: 1.5
                                                            }}
                                                        >
                                                            {activity.title} ({activity.day})
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        {/* Champ de texte pour la question */}
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            <TextField
                                                fullWidth
                                                label="Votre question"
                                                placeholder="Écrivez votre question ici..."
                                                value={questionText}
                                                onChange={(e) => setQuestionText(e.target.value)}
                                                multiline
                                                rows={2}
                                                sx={{ minHeight: '56px' }}
                                            />
                                        </Grid>

                                        {/* Bouton d'envoi */}
                                        <Grid size={{ xs: 12, md: 2 }}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                onClick={handleSendQuestion}
                                                disabled={!questionText.trim() || (!isEventQuestion && !selectedActivityId)}
                                                startIcon={<Iconify icon="solar:paper-plane-bold" />}
                                                sx={{
                                                    height: '40px',
                                                    fontSize: { xs: '0.75rem', md: '0.875rem' }
                                                }}
                                            >
                                                Envoyer
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>

                                {/* Tableau des questions */}
                                <TableContainer component={Paper} variant="outlined">
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 600 }}>Question</TableCell>
                                                <TableCell sx={{ fontWeight: 600 }}>Activité</TableCell>
                                                <TableCell sx={{ fontWeight: 600 }}>Date & Heure</TableCell>
                                                <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
                                                <TableCell align="center" sx={{ fontWeight: 600 }}>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {questions.length === 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Aucune question posée pour le moment
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                questions.map((q) => (
                                                    <TableRow key={q.id} hover>
                                                        <TableCell sx={{ maxWidth: 250 }}>
                                                            <Typography variant="body2" noWrap>
                                                                {q.question}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2" noWrap>
                                                                {q.isEvent ? 'Event' : q.activityTitle}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                                                                {q.date}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip
                                                                label={q.status}
                                                                size="small"
                                                                color={q.status === 'Répondu' ? 'success' : 'warning'}
                                                                variant="soft"
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => handleViewDetails(q)}
                                                                color="primary"
                                                            >
                                                                <Iconify icon="solar:eye-bold" width={18} />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                    </CardContent>
                </Card>
            </Grid>

            {/* Modal pour saisir le code d'enquête */}
            <Dialog
                open={enqueteModalOpen}
                onClose={handleCloseEnqueteModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 2 }
                }}
            >
                <DialogTitle sx={{ textAlign: 'center', pb: 1 }}>
                    <Typography variant="h5" component="div">
                        Participer à une enquête
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ pt: 2, pb: 3 }}>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ textAlign: 'center', mb: 3 }}
                    >
                        Donnez vos avis sur l'activité/Événement
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{ mb: 2, fontWeight: 500 }}
                    >
                        Renseigner le code de l'enquête
                    </Typography>

                    <TextField
                        fullWidth
                        label="Code"
                        placeholder="Ex: AZ123"
                        value={codeEnquete}
                        onChange={(e) => setCodeEnquete(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 2 }}
                    />
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'center', pb: 2, gap: 1 }}>
                    <Button
                        onClick={handleCloseEnqueteModal}
                        color="inherit"
                        variant="outlined"
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleConfirmEnquete}
                        variant="contained"
                        disabled={!codeEnquete.trim()}
                    >
                        Participer
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal de détail d'une question */}
            <Dialog
                open={detailModalOpen}
                onClose={handleCloseDetailModal}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 2 }
                }}
            >
                <DialogTitle sx={{ pb: 1 }}>
                    <Typography variant="h5" component="div">
                        Détail de la question
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ pt: 2, pb: 3 }}>
                    {selectedQuestion && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {/* Question */}
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Question :
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {selectedQuestion.question}
                                </Typography>
                            </Box>

                            {/* Activité concernée */}
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Activité concernée :
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {selectedQuestion.isEvent ? 'Événement général' : selectedQuestion.activityTitle}
                                </Typography>
                            </Box>

                            {/* Date et heure */}
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Date et heure d'envoi :
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {selectedQuestion.date}
                                </Typography>
                            </Box>

                            {/* Statut */}
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                    Statut :
                                </Typography>
                                <Chip
                                    label={selectedQuestion.status}
                                    size="small"
                                    color={selectedQuestion.status === 'Répondu' ? 'success' : 'warning'}
                                    variant="soft"
                                />
                            </Box>

                            {/* Réponse si disponible */}
                            {selectedQuestion.status === 'Répondu' && selectedQuestion.response && (
                                <Box
                                    sx={{
                                        p: 2,
                                        borderRadius: 1,
                                        bgcolor: 'success.lighter',
                                        border: '1px solid',
                                        borderColor: 'success.light'
                                    }}
                                >
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                        Réponse :
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {selectedQuestion.response}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    )}
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button
                        onClick={handleCloseDetailModal}
                        variant="contained"
                    >
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}