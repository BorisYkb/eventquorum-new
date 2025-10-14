'use client';

import React from 'react';
import { useState, useCallback } from 'react';
import { useBoolean } from 'minimal-shared/hooks';

import { useTheme } from '@mui/material/styles';
import {
    Box,
    Typography,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Switch,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Card,
    IconButton,
    Stack,
    TextField,
    Chip,
} from '@mui/material';

import { Upload } from 'src/components/upload';
import { Editor } from 'src/components/editor';
import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { UploadAvatar } from 'src/components/upload'; 

interface IntervenantPermissionsBlockProps {
    consulterTelEmail: boolean;
    repondreQuestions: boolean;
    onPermissionChange: (permission: string) => (value: boolean | string) => void;
}

interface ReseauSocial {
    nom: string;
    lien: string;
}

interface Intervenant {
    image: File | string | null;
    description: string;
    reseauxSociaux: ReseauSocial[];
    index: number | null;
}

/**
 * Composant des permissions spécifiques au rôle Intervenant
 * - Consulter Tel & Email des participants
 * - Répondre aux questions des participants
 */
const IntervenantPermissionsBlock: React.FC<IntervenantPermissionsBlockProps> = ({
    consulterTelEmail,
    repondreQuestions,
    onPermissionChange
}) => {
    const theme = useTheme();

    const [files, setFiles] = useState<(File | string)[]>([]);
    const [showPreview, setShowPreview] = React.useState(true);
    
    // States pour les images
    const [pourActivite, setPourActivite] = useState(false);
    const [pourEvenement, setPourEvenement] = useState(false);
    const [activiteSelectionnee, setActiviteSelectionnee] = useState<string[]>([]);

    // States pour les intervenants
    const [isAddingIntervenant, setIsAddingIntervenant] = useState(false);
    const [intervenants, setIntervenants] = useState<Intervenant[]>([]);
    const [currentIntervenant, setCurrentIntervenant] = useState<Intervenant>({
        image: null,
        description: '',
        reseauxSociaux: [],
        index: null
    });
    const [nouveauReseau, setNouveauReseau] = useState({ nom: '', lien: '' });

    // Liste des activités (à adapter selon vos données)
    const activites = [
        { id: '1', nom: 'Activité 1' },
        { id: '2', nom: 'Activité 2' },
        { id: '3', nom: 'Activité 3' },
    ];

    const handleDropMultiFile = (acceptedFiles: File[]) => {
        setFiles([...files, ...acceptedFiles]);
    };
    
    const handleRemoveFile = (inputFile: File | string) => {
        const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
        setFiles(filesFiltered);
    };
    
    const handleRemoveAllFiles = () => {
        setFiles([]);
    };

    // Ajouter un réseau social à l'intervenant en cours
    const handleAddReseauSocial = () => {
        if (nouveauReseau.nom && nouveauReseau.lien) {
            setCurrentIntervenant({
                ...currentIntervenant,
                reseauxSociaux: [...currentIntervenant.reseauxSociaux, { ...nouveauReseau }]
            });
            setNouveauReseau({ nom: '', lien: '' });
        }
    };

    // Supprimer un réseau social
    const handleDeleteReseauSocial = (index: number) => {
        setCurrentIntervenant({
            ...currentIntervenant,
            reseauxSociaux: currentIntervenant.reseauxSociaux.filter((_, i) => i !== index)
        });
    };

    // Ajouter ou mettre à jour un intervenant
    const handleAddIntervenant = () => {
        if (currentIntervenant.index !== null) {
            // Mise à jour
            const updatedIntervenants = [...intervenants];
            updatedIntervenants[currentIntervenant.index] = {
                ...currentIntervenant,
                index: null
            };
            setIntervenants(updatedIntervenants);
        } else {
            // Ajout
            setIntervenants([...intervenants, { ...currentIntervenant, index: null }]);
        }
        setIsAddingIntervenant(false);
        setCurrentIntervenant({ image: null, description: '', reseauxSociaux: [], index: null });
    };

    // Éditer un intervenant
    const handleEditIntervenant = (index: number) => {
        setCurrentIntervenant({ ...intervenants[index], index });
        setIsAddingIntervenant(true);
    };

    // Supprimer un intervenant
    const handleDeleteIntervenant = (index: number) => {
        setIntervenants(intervenants.filter((_, i) => i !== index));
    };

    const intervenantPermissions = [
        {
            key: 'consulterTelEmail',
            label: 'Consulter Tel & Email des participants',
            value: consulterTelEmail
        },
        {
            key: 'repondreQuestions',
            label: 'Répondre aux questions des participants',
            value: repondreQuestions
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
                    backgroundColor: theme.palette.warning.main,
                    mr: 1
                }} />
                Information supplémentaire de l'intervenant
            </Typography>

            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Sélectionner une ou plusieurs activités</InputLabel>
                <Select
                    multiple
                    value={activiteSelectionnee}
                    onChange={(e) => setActiviteSelectionnee(typeof e.target.value === 'string' ? [e.target.value] : e.target.value)}
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
                {/* Formulaire d'ajout/édition d'intervenant */}
                <Card variant="outlined" sx={{ p: 3, mb: 3, backgroundColor: '#f9f9f9' }}>
                    <Typography variant="subtitle2" sx={{ mb: 2 }}>
                        {currentIntervenant.index !== null ? 'Modifier l\'intervenant' : 'Nouvel intervenant'}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                        {/* Image à gauche */}
                        <Box sx={{ minWidth: 200 }}>
                            <UploadAvatar
                                value={currentIntervenant.image}
                                onDrop={(acceptedFiles: File[]) => {
                                    setCurrentIntervenant({
                                        ...currentIntervenant,
                                        image: acceptedFiles[0]
                                    });
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
                                value={currentIntervenant.description}
                                onChange={(value: string) => {
                                    setCurrentIntervenant({
                                        ...currentIntervenant,
                                        description: value
                                    });
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
                                    <TextField
                                        size="small"
                                        placeholder="Nom (ex: LinkedIn)"
                                        value={nouveauReseau.nom}
                                        onChange={(e) => setNouveauReseau({ ...nouveauReseau, nom: e.target.value })}
                                        sx={{ flex: 1 }}
                                    />
                                    <TextField
                                        size="small"
                                        placeholder="Lien (ex: https://...)"
                                        value={nouveauReseau.lien}
                                        onChange={(e) => setNouveauReseau({ ...nouveauReseau, lien: e.target.value })}
                                        sx={{ flex: 2 }}
                                    />
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={handleAddReseauSocial}
                                        disabled={!nouveauReseau.nom || !nouveauReseau.lien}
                                    >
                                        Ajouter
                                    </Button>
                                </Box>

                                {/* Liste des réseaux sociaux ajoutés */}
                                {currentIntervenant.reseauxSociaux.length > 0 && (
                                    <Stack spacing={1}>
                                        {currentIntervenant.reseauxSociaux.map((reseau, index) => (
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
                            
                            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    onClick={() => {
                                        setCurrentIntervenant({ image: null, description: '', reseauxSociaux: [], index: null });
                                        setNouveauReseau({ nom: '', lien: '' });
                                    }}
                                >
                                    Annuler
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAddIntervenant}
                                    disabled={!currentIntervenant.image || !currentIntervenant.description}
                                >
                                    {currentIntervenant.index !== null ? 'Mettre à jour' : 'Enregistrer'}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Card>

                {/* Liste des intervenants ajoutés */}
                {intervenants.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
                            {intervenants.length} intervenant(s) ajouté(s)
                        </Typography>
                        <Stack spacing={2}>
                            {intervenants.map((intervenant, index) => (
                                <Card key={index} variant="outlined" sx={{ p: 2 }}>
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                                        <Box
                                            component="img"
                                            src={
                                                typeof intervenant.image === 'string'
                                                    ? intervenant.image
                                                    : intervenant.image
                                                        ? URL.createObjectURL(intervenant.image)
                                                        : undefined
                                            }
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
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    display: '-webkit-box',
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: 'vertical',
                                                    mb: 1
                                                }}
                                            />
                                            {intervenant.reseauxSociaux.length > 0 && (
                                                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                                    {intervenant.reseauxSociaux.map((reseau, idx) => (
                                                        <Chip
                                                            key={idx}
                                                            label={reseau.nom}
                                                            size="small"
                                                            variant="outlined"
                                                            onClick={() => window.open(reseau.lien, '_blank')}
                                                            sx={{ cursor: 'pointer' }}
                                                        />
                                                    ))}
                                                </Box>
                                            )}
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleEditIntervenant(index)}
                                                sx={{ color: 'warning.main' }}
                                            >
                                                <Iconify icon="solar:pen-bold" width={18} height={18} />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleDeleteIntervenant(index)}
                                                sx={{ color: 'error.main' }}
                                            >
                                                <Iconify icon="solar:trash-bin-trash-bold" width={18} height={18} />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Card>
                            ))}
                        </Stack>
                    </Box>
                )}
            </Stack>
        </Box>
    );
};

export default IntervenantPermissionsBlock;