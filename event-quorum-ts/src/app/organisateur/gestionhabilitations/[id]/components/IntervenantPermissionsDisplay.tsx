// File: src/app/organisateur/gestionhabilitations/[id]/components/IntervenantPermissionsDisplay.tsx

'use client';

import React from 'react';

import {
    Box,
    Typography,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Card,
    Stack,
    Chip,
} from '@mui/material';

interface ReseauSocial {
    nom: string;
    lien: string;
}

interface Intervenant {
    image: File | string | null;
    description: string;
    reseauxSociaux: ReseauSocial[];
}

interface IntervenantPermissionsDisplayProps {
    consulterTelEmail: boolean;
    repondreQuestions: boolean;
}

/**
 * Composant d'affichage en lecture seule des informations de l'intervenant
 * Utilisé dans la page de détail
 */
const IntervenantPermissionsDisplay: React.FC<IntervenantPermissionsDisplayProps> = () => {
    // Données simulées - à remplacer par les vraies données depuis l'API/base de données
    const activiteSelectionnee = ['1', '2']; // IDs des activités sélectionnées
    
    const activites = [
        { id: '1', nom: 'Activité 1' },
        { id: '2', nom: 'Activité 2' },
        { id: '3', nom: 'Activité 3' },
    ];

    // Intervenants simulés
    const intervenants: Intervenant[] = [
        {
            image: 'https://via.placeholder.com/150',
            description: '<p><strong>Dr. Jean Kouassi</strong></p><p>Expert en développement durable avec 15 ans d\'expérience dans le secteur.</p>',
            reseauxSociaux: [
                { nom: 'LinkedIn', lien: 'https://linkedin.com/in/jeankouassi' },
                { nom: 'Twitter', lien: 'https://twitter.com/jeankouassi' },
            ]
        },
        {
            image: 'https://via.placeholder.com/150',
            description: '<p><strong>Marie Traoré</strong></p><p>Consultante senior en innovation technologique.</p>',
            reseauxSociaux: [
                { nom: 'LinkedIn', lien: 'https://linkedin.com/in/marietraore' },
            ]
        }
    ];

    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{
                fontWeight: 600,
                mb: 2,
                color: '#474751',
                display: 'flex',
                alignItems: 'center'
            }}>
                <Box sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#FF9800',
                    mr: 1
                }} />
                Information supplémentaire de l'intervenant
            </Typography>
            
            {/* Affichage des activités sélectionnées */}
            <FormControl fullWidth size="small" sx={{ mb: 3 }} disabled>
                <InputLabel>Activités sélectionnées</InputLabel>
                <Select
                    multiple
                    value={activiteSelectionnee}
                    label="Activités sélectionnées"
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => {
                                const activite = activites.find(a => a.id === value);
                                return (
                                    <Chip key={value} label={activite?.nom} size="small" />
                                );
                            })}
                        </Box>
                    )}
                >
                    {activites.map((activite) => (
                        <MenuItem key={activite.id} value={activite.id}>
                            {activite.nom}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            
            {/* Liste des intervenants */}
            {intervenants.length > 0 && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                        {intervenants.length} intervenant(s) enregistré(s)
                    </Typography>
                    <Stack spacing={2}>
                        {intervenants.map((intervenant, index) => (
                            <Card key={index} variant="outlined" sx={{ p: 2 }}>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                    <Box
                                        component="img"
                                        src={typeof intervenant.image === 'string' ? intervenant.image : URL.createObjectURL(intervenant.image!)}
                                        alt={`Intervenant ${index + 1}`}
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: 1,
                                            objectFit: 'cover'
                                        }}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography 
                                            variant="body2" 
                                            dangerouslySetInnerHTML={{ __html: intervenant.description }}
                                            sx={{
                                                '& p': { margin: 0 },
                                                mb: 1
                                            }}
                                        />
                                        {intervenant.reseauxSociaux.length > 0 && (
                                            <Box>
                                                <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                                                    Réseaux sociaux :
                                                </Typography>
                                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                    {intervenant.reseauxSociaux.map((reseau, idx) => (
                                                        <Chip
                                                            key={idx}
                                                            label={reseau.nom}
                                                            size="small"
                                                            variant="outlined"
                                                            component="a"
                                                            href={reseau.lien}
                                                            target="_blank"
                                                            clickable
                                                            sx={{ cursor: 'pointer' }}
                                                        />
                                                    ))}
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                </Box>
                            </Card>
                        ))}
                    </Stack>
                </Box>
            )}
        </Box>
    );
};

export default IntervenantPermissionsDisplay;