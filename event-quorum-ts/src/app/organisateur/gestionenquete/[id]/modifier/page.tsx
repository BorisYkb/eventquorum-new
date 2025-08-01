// File: src/app/organisateur/gestionenquetes/[id]/modifier/page.tsx

'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid2';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';

// Types
interface EnqueteForm {
    titre: string;
    activite: string;
    typeEnquete: 'live' | 'asynchrone';
    enqueteAnonymat: boolean;
    authentificationNumerique: boolean;
}

interface Enquete {
    id: number;
    titre: string;
    activite: string;
    code: string;
    nombreParticipants: number;
    statut: string;
    createdAt: string;
}

const ModifyEnquetePage: React.FC = () => {
    const theme = useTheme();
    const router = useRouter();
    const params = useParams();
    const enqueteId = params.id as string;

    // État pour le chargement et les erreurs
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [enqueteOriginal, setEnqueteOriginal] = useState<Enquete | null>(null);

    // Données d'exemple des enquêtes (normalement viendraient d'une API)
    const sampleEnquetes: Enquete[] = [
        {
            id: 1,
            titre: "Satisfaction des participants",
            activite: "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
            code: "ENQ-001",
            nombreParticipants: 156,
            statut: "Terminé",
            createdAt: "2024-01-15"
        },
        {
            id: 2,
            titre: "Évaluation de la qualité des intervenants",
            activite: "PANEL DE HAUT NIVEAU",
            code: "ENQ-002",
            nombreParticipants: 89,
            statut: "En cours",
            createdAt: "2024-02-10"
        },
        {
            id: 3,
            titre: "Feedback sur l'organisation",
            activite: "POINT DE PRESSE",
            code: "ENQ-003",
            nombreParticipants: 45,
            statut: "Non démarré",
            createdAt: "2024-01-20"
        },
        {
            id: 4,
            titre: "Enquête de satisfaction générale",
            activite: "COOLING BREAK",
            code: "ENQ-004",
            nombreParticipants: 234,
            statut: "Terminé",
            createdAt: "2024-03-05"
        },
        {
            id: 5,
            titre: "Évaluation des installations",
            activite: "PAUSE CAFE",
            code: "ENQ-005",
            nombreParticipants: 78,
            statut: "En cours",
            createdAt: "2024-02-28"
        },
        {
            id: 6,
            titre: "Questionnaire post-événement",
            activite: "PANEL DE HAUT NIVEAU",
            code: "ENQ-006",
            nombreParticipants: 167,
            statut: "Non démarré",
            createdAt: "2024-03-12"
        },
        {
            id: 7,
            titre: "Analyse des besoins futurs",
            activite: "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
            code: "ENQ-007",
            nombreParticipants: 203,
            statut: "En cours",
            createdAt: "2024-03-20"
        },
        {
            id: 8,
            titre: "Évaluation de la communication",
            activite: "POINT DE PRESSE",
            code: "ENQ-008",
            nombreParticipants: 91,
            statut: "Terminé",
            createdAt: "2024-02-15"
        },
        {
            id: 9,
            titre: "Satisfaction des sponsors",
            activite: "COOLING BREAK",
            code: "ENQ-009",
            nombreParticipants: 32,
            statut: "Non démarré",
            createdAt: "2024-03-25"
        },
        {
            id: 10,
            titre: "Enquête sur l'accessibilité",
            activite: "PAUSE CAFE",
            code: "ENQ-010",
            nombreParticipants: 145,
            statut: "En cours",
            createdAt: "2024-03-18"
        }
    ];

    // État du formulaire d'enquête
    const [enqueteForm, setEnqueteForm] = useState<EnqueteForm>({
        titre: '',
        activite: '',
        typeEnquete: 'live',
        enqueteAnonymat: false,
        authentificationNumerique: false
    });

    // Options disponibles pour les activités
    const activites = [
        "CÉRÉMONIE D'OUVERTURE OFFICIELLE",
        "PANEL DE HAUT NIVEAU",
        "POINT DE PRESSE",
        "COOLING BREAK",
        "PAUSE CAFE"
    ];

    // Effet pour charger les données de l'enquête à modifier
    useEffect(() => {
        const loadEnqueteData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Simuler un appel API pour récupérer l'enquête
                const enqueteIdNumber = parseInt(enqueteId);
                const enquete = sampleEnquetes.find(e => e.id === enqueteIdNumber);

                if (!enquete) {
                    setError(`Enquête avec l'ID ${enqueteId} introuvable`);
                    return;
                }

                setEnqueteOriginal(enquete);

                // Initialiser le formulaire avec les données existantes
                setEnqueteForm({
                    titre: enquete.titre,
                    activite: enquete.activite,
                    typeEnquete: 'live', // Valeur par défaut, à adapter selon vos besoins
                    enqueteAnonymat: false, // Valeur par défaut, à adapter selon vos besoins
                    authentificationNumerique: false // Valeur par défaut, à adapter selon vos besoins
                });

            } catch (err) {
                setError('Erreur lors du chargement de l\'enquête');
                console.error('Erreur:', err);
            } finally {
                setLoading(false);
            }
        };

        if (enqueteId) {
            loadEnqueteData();
        }
    }, [enqueteId]);

    // Gestionnaire de changement du formulaire
    const handleEnqueteFormChange = (field: keyof EnqueteForm, value: any) => {
        setEnqueteForm(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Gestionnaire de sauvegarde
    const handleSaveEnquete = () => {
        if (!enqueteForm.titre.trim() || !enqueteForm.activite) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }

        // Logique de sauvegarde des modifications
        console.log('Enquête modifiée à sauvegarder:', enqueteForm);
        console.log('Enquête originale:', enqueteOriginal);

        // Simuler la sauvegarde
        alert('Enquête modifiée avec succès !');

        // Redirection vers la liste des enquêtes
        router.push('/organisateur/gestionenquete');
    };

    // Gestionnaire d'annulation
    const handleCancel = () => {
        router.push('/organisateur/gestionenquete');
    };

    // Affichage du chargement
    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#fafafa'
            }}>
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress size={60} sx={{ mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                        Chargement de l'enquête...
                    </Typography>
                </Box>
            </Box>
        );
    }

    // Affichage d'erreur
    if (error) {
        return (
            <Box sx={{ p: 4, backgroundColor: '#fafafa', minHeight: '100vh' }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button
                    variant="contained"
                    onClick={() => router.push('/organisateur/gestionenquete')}
                    sx={{ mt: 2 }}
                >
                    Retour à la liste des enquêtes
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 4, backgroundColor: '#fafafa', minHeight: '100vh' }}>
            {/* En-tête avec titre et bouton retour */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 4,
                pb: 2,
                borderBottom: '1px solid #e0e0e0'
            }}>
                <Box>
                    <Typography variant="h4" component="h1" sx={{
                        fontWeight: 700,
                        color: '#1a1a1a',
                        fontSize: '2rem',
                        mb: 1
                    }}>
                        Modifier l'enquête
                    </Typography>
                    {enqueteOriginal && (
                        <Typography variant="subtitle1" sx={{ color: '#666' }}>
                            Code: {enqueteOriginal.code} • Créée le {new Date(enqueteOriginal.createdAt).toLocaleDateString('fr-FR')}
                        </Typography>
                    )}
                </Box>
                <Button
                    variant="contained"
                    onClick={() => router.back()}
                    sx={{
                        bgcolor: '#2c2c2c',
                        color: 'white',
                        px: 3,
                        py: 1,
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                            bgcolor: '#1a1a1a',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        },
                        transition: 'all 0.2s ease'
                    }}
                >
                    Retour
                </Button>
            </Box>

            {/* Section principale en deux colonnes */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
                {/* Colonne gauche - Informations générales */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{
                        p: 4,
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        border: '1px solid #f0f0f0'
                    }}>
                        <Typography variant="h6" sx={{
                            mb: 3,
                            fontWeight: 600,
                            color: '#333',
                            fontSize: '1.2rem'
                        }}>
                            Informations générales
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" sx={{
                                mb: 1.5,
                                fontWeight: 600,
                                color: '#555'
                            }}>
                                Titre de l'enquête
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Entrez le titre de votre enquête"
                                value={enqueteForm.titre}
                                onChange={(e) => handleEnqueteFormChange('titre', e.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        backgroundColor: '#fafafa'
                                    }
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography variant="subtitle2" sx={{
                                mb: 1.5,
                                fontWeight: 600,
                                color: '#555'
                            }}>
                                Activité associée
                            </Typography>
                            <FormControl fullWidth>
                                <Select
                                    value={enqueteForm.activite}
                                    onChange={(e) => handleEnqueteFormChange('activite', e.target.value)}
                                    displayEmpty
                                    sx={{
                                        borderRadius: '8px',
                                        backgroundColor: '#fafafa'
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Sélectionner une activité</em>
                                    </MenuItem>
                                    {activites.map((activite) => (
                                        <MenuItem key={activite} value={activite}>
                                            {activite}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Card>
                </Grid>

                {/* Colonne droite - Options */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{
                        p: 4,
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        border: '1px solid #f0f0f0'
                    }}>
                        <Typography variant="h6" sx={{
                            mb: 3,
                            fontWeight: 600,
                            color: '#333',
                            fontSize: '1.2rem'
                        }}>
                            Options de l'enquête
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" sx={{
                                mb: 2,
                                fontWeight: 600,
                                color: '#555'
                            }}>
                                Type d'enquête
                            </Typography>
                            <RadioGroup
                                value={enqueteForm.typeEnquete}
                                onChange={(e) => handleEnqueteFormChange('typeEnquete', e.target.value)}
                                row
                            >
                                <FormControlLabel
                                    value="live"
                                    control={<Radio sx={{ color: '#666' }} />}
                                    label="Live"
                                    sx={{ mr: 3 }}
                                />
                                <FormControlLabel
                                    value="asynchrone"
                                    control={<Radio sx={{ color: '#666' }} />}
                                    label="Asynchrone"
                                />
                            </RadioGroup>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={enqueteForm.enqueteAnonymat}
                                        onChange={(e) => handleEnqueteFormChange('enqueteAnonymat', e.target.checked)}
                                        sx={{ ml: 1 }}
                                    />
                                }
                                label="Enquête anonyme"
                                sx={{
                                    justifyContent: 'space-between',
                                    ml: 0,
                                    '& .MuiFormControlLabel-label': {
                                        fontWeight: 500,
                                        color: '#555'
                                    }
                                }}
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={enqueteForm.authentificationNumerique}
                                        onChange={(e) => handleEnqueteFormChange('authentificationNumerique', e.target.checked)}
                                        sx={{ ml: 1 }}
                                    />
                                }
                                label="Authentification numérique"
                                sx={{
                                    justifyContent: 'space-between',
                                    ml: 0,
                                    '& .MuiFormControlLabel-label': {
                                        fontWeight: 500,
                                        color: '#555'
                                    }
                                }}
                            />
                        </Box>
                    </Card>
                </Grid>
            </Grid>

            {/* Boutons finaux - Pleine largeur */}
            <Box sx={{
                display: 'flex',
                gap: 3,
                justifyContent: 'flex-end',
                pt: 3
            }}>
                <Button
                    variant="outlined"
                    onClick={handleCancel}
                    sx={{
                        minWidth: 100,
                        py: 1,
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderColor: '#ccc',
                        color: 'black',
                        '&:hover': {
                            borderColor: '#999',
                            color: '#333',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        },
                        transition: 'all 0.2s ease'
                    }}
                >
                    Annuler
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSaveEnquete}
                    disabled={!enqueteForm.titre.trim() || !enqueteForm.activite}
                    sx={{
                        minWidth: 140,
                        py: 1.5,
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontWeight: 600,
                        bgcolor: '#1976d2',
                        '&:hover': {
                            bgcolor: '#1565c0',
                            transform: 'translateY(-1px)',
                            boxShadow: '0 4px 12px rgba(25,118,210,0.3)'
                        },
                        '&:disabled': {
                            bgcolor: '#ccc',
                            color: '#999'
                        },
                        transition: 'all 0.2s ease'
                    }}
                >
                    Sauvegarder les modifications
                </Button>
            </Box>
        </Box>
    );
};

export default ModifyEnquetePage;