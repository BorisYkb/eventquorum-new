//src/sections/gestionhabilitation/nouveau/Intervenant-Sup-infos.tsx

'use client';

import React from 'react';
import { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import {
    Box,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Card,
    IconButton,
    Stack,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';

import { Editor } from 'src/components/editor';
import { Iconify } from 'src/components/iconify';
import { UploadAvatar } from 'src/components/upload';

interface ReseauSocial {
    nom: string;
    lien: string;
}

interface IntervenantData {
    activites: string[];
    image: File | string | null;
    description: string;
    reseauxSociaux: ReseauSocial[];
}

interface IntervenantSupinfosProps {
    activites: { id: string; nom: string; }[];
    intervenantData: IntervenantData;
    onIntervenantDataChange: React.Dispatch<React.SetStateAction<IntervenantData>>;
}

// Liste des réseaux sociaux préenregistrés
const RESEAUX_SOCIAUX_PREDEFINIS = [
    'LinkedIn',
    'Twitter',
    'Facebook',
    'Instagram',
    'YouTube',
    'GitHub',
    'TikTok',
];

const IntervenantSupinfos: React.FC<IntervenantSupinfosProps> = ({
    activites,
    intervenantData,
    onIntervenantDataChange
}) => {
    const theme = useTheme();

    // States pour les réseaux sociaux
    const [reseauxSociauxDisponibles, setReseauxSociauxDisponibles] = useState<string[]>(RESEAUX_SOCIAUX_PREDEFINIS);
    const [selectedReseau, setSelectedReseau] = useState('');
    const [nouveauLien, setNouveauLien] = useState('');

    // Dialog pour ajouter un nouveau réseau
    const [openNewReseauDialog, setOpenNewReseauDialog] = useState(false);
    const [newReseauName, setNewReseauName] = useState('');

    // Gérer le changement des activités
    const handleActivitesChange = (newActivites: string[]) => {
        onIntervenantDataChange(prev => ({
            ...prev,
            activites: newActivites
        }));
    };

    // Ajouter un réseau social
    const handleAddReseauSocial = () => {
        if (selectedReseau && nouveauLien) {
            onIntervenantDataChange(prev => ({
                ...prev,
                reseauxSociaux: [...prev.reseauxSociaux, { nom: selectedReseau, lien: nouveauLien }]
            }));
            setSelectedReseau('');
            setNouveauLien('');
        }
    };

    // Ajouter un nouveau réseau social à la liste
    const handleAddNewReseauToList = () => {
        if (newReseauName && !reseauxSociauxDisponibles.includes(newReseauName)) {
            setReseauxSociauxDisponibles([...reseauxSociauxDisponibles, newReseauName]);
            setSelectedReseau(newReseauName);
            setOpenNewReseauDialog(false);
            setNewReseauName('');
        }
    };

    // Supprimer un réseau social
    const handleDeleteReseauSocial = (index: number) => {
        onIntervenantDataChange(prev => ({
            ...prev,
            reseauxSociaux: prev.reseauxSociaux.filter((_, i) => i !== index)
        }));
    };

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
                    backgroundColor: theme.palette.warning.main,
                    mr: 1
                }} />
                Information supplémentaire de l'intervenant
            </Typography>

            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Sélectionner une ou plusieurs activités</InputLabel>
                <Select
                    multiple
                    value={intervenantData.activites}
                    onChange={(e) => handleActivitesChange(typeof e.target.value === 'string' ? [e.target.value] : e.target.value)}
                    label="Sélectionner une ou plusieurs activités"
                >
                    {activites.map((activite) => (
                        <MenuItem key={activite.id} value={activite.id}>
                            {activite.nom}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Stack>
                <Card variant="outlined" sx={{ p: 3, backgroundColor: '#f9f9f9' }}>
                    <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                        {/* Image à gauche */}
                        <Box sx={{ minWidth: 200 }}>
                            <UploadAvatar
                                value={intervenantData.image}
                                onDrop={(acceptedFiles: File[]) => {
                                    onIntervenantDataChange(prev => ({
                                        ...prev,
                                        image: acceptedFiles[0]
                                    }));
                                }}
                                validator={(fileData) => {
                                    if (fileData.size > 2000000) {
                                        return { code: 'file-too-large', message: 'Fichier trop volumineux' };
                                    }
                                    return null;
                                }}
                                helperText={
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            mt: 2,
                                            display: 'block',
                                            textAlign: 'center',
                                            color: 'text.disabled',
                                        }}
                                    >
                                        Photo de l'intervenant
                                    </Typography>
                                }
                            />
                        </Box>

                        {/* Description et réseaux sociaux à droite */}
                        <Box sx={{ flex: 1 }}>
                            <Editor
                                fullItem
                                value={intervenantData.description}
                                onChange={(value: string) => {
                                    onIntervenantDataChange(prev => ({
                                        ...prev,
                                        description: value
                                    }));
                                }}
                                placeholder="Décrivez l'intervenant (nom, fonction, biographie...)"
                                sx={{ maxHeight: 300, mb: 2 }}
                            />

                            {/* Section réseaux sociaux */}
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    Réseaux sociaux
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                    <FormControl size="small" sx={{ flex: 1 }}>
                                        <InputLabel>Réseau social</InputLabel>
                                        <Select
                                            value={selectedReseau}
                                            onChange={(e) => setSelectedReseau(e.target.value)}
                                            label="Réseau social"
                                        >
                                            {reseauxSociauxDisponibles.map((reseau) => (
                                                <MenuItem key={reseau} value={reseau}>
                                                    {reseau}
                                                </MenuItem>
                                            ))}
                                            <MenuItem
                                                value="__add_new__"
                                                onClick={() => setOpenNewReseauDialog(true)}
                                                sx={{
                                                    color: 'primary.main',
                                                    fontStyle: 'italic',
                                                    borderTop: 1,
                                                    borderColor: 'divider'
                                                }}
                                            >
                                                + Ajouter un nouveau réseau
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        size="small"
                                        placeholder="Lien (ex: https://...)"
                                        value={nouveauLien}
                                        onChange={(e) => setNouveauLien(e.target.value)}
                                        sx={{ flex: 2 }}
                                    />
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={handleAddReseauSocial}
                                        disabled={!selectedReseau || !nouveauLien}
                                    >
                                        Ajouter
                                    </Button>
                                </Box>

                                {/* Liste des réseaux sociaux ajoutés */}
                                {intervenantData.reseauxSociaux.length > 0 && (
                                    <Stack spacing={1}>
                                        {intervenantData.reseauxSociaux.map((reseau, index) => (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    p: 1,
                                                    bgcolor: 'background.paper',
                                                    borderRadius: 1,
                                                    border: '1px solid',
                                                    borderColor: 'divider'
                                                }}
                                            >
                                                <Typography variant="body2" sx={{ fontWeight: 600, minWidth: 80 }}>
                                                    {reseau.nom}:
                                                </Typography>
                                                <Typography variant="body2" sx={{ flex: 1, color: 'primary.main' }}>
                                                    {reseau.lien}
                                                </Typography>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleDeleteReseauSocial(index)}
                                                    sx={{ color: 'error.main' }}
                                                >
                                                    <Iconify icon="solar:trash-bin-trash-bold" width={18} height={18} />
                                                </IconButton>
                                            </Box>
                                        ))}
                                    </Stack>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Card>
            </Stack>

            {/* Dialog pour ajouter un nouveau réseau */}
            <Dialog open={openNewReseauDialog} onClose={() => setOpenNewReseauDialog(false)}>
                <DialogTitle>Ajouter un nouveau réseau social</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nom du réseau social"
                        fullWidth
                        value={newReseauName}
                        onChange={(e) => setNewReseauName(e.target.value)}
                        placeholder="Ex: Discord, Telegram, etc."
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenNewReseauDialog(false)}>Annuler</Button>
                    <Button
                        onClick={handleAddNewReseauToList}
                        variant="contained"
                        disabled={!newReseauName.trim()}
                    >
                        Ajouter
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default IntervenantSupinfos;