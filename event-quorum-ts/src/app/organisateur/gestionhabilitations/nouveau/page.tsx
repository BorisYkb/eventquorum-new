// File: src/app/organisateur/gestionhabilitations/nouveau/page.tsx

'use client'

import type { SelectChangeEvent } from '@mui/material/Select';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import Grid from '@mui/material/Grid';
import { ArrowBack } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Collapse,
} from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import IntervenantPermissionsBlock from './components/IntervenantPermissionsBlock';

interface ReseauSocial {
  nom: string;
  lien: string;
}

interface IntervenantData {
  activites: string[];
  intervenants: {
    image: File | string | null;
    description: string;
    reseauxSociaux: ReseauSocial[];
  }[];
}

interface CreateAccessForm {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
  mdp: string;
}

interface SavedAccess extends CreateAccessForm {
  id: number;
  dateCreation: string;
  intervenantData?: IntervenantData;
}

const CreateAccessPage: React.FC = () => {
  const router = useRouter();
  const theme = useTheme();
  
  const [formData, setFormData] = useState<CreateAccessForm>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    role: "Agent d'admission",
    mdp: '',
  });

  // État pour les données de l'intervenant
  const [intervenantData, setIntervenantData] = useState<IntervenantData>({
    activites: [],
    intervenants: []
  });

  // État pour les accès enregistrés
  const [savedAccesses, setSavedAccesses] = useState<SavedAccess[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  // État pour l'expansion des lignes du tableau
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const handleInputChange = (field: keyof CreateAccessForm) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setFormData(prev => ({
      ...prev,
      role: event.target.value,
    }));
    
    // Réinitialiser les données d'intervenant si on change de rôle
    if (event.target.value !== 'Intervenant') {
      setIntervenantData({
        activites: [],
        intervenants: []
      });
    }
  };

  const handleCancel = () => {
    router.push('/organisateur/gestionhabilitations');
  };

  const handleReset = () => {
    setFormData({
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      role: "Agent d'admission",
      mdp: '',
    });
    setIntervenantData({
      activites: [],
      intervenants: []
    });
    setEditingIndex(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Validation pour le rôle Intervenant
    if (formData.role === 'Intervenant') {
      if (intervenantData.activites.length === 0) {
        alert('Veuillez sélectionner au moins une activité pour l\'intervenant');
        return;
      }
      if (intervenantData.intervenants.length === 0) {
        alert('Veuillez ajouter au moins un intervenant');
        return;
      }
    }
    
    const newAccess: SavedAccess = {
      ...formData,
      id: editingIndex !== null ? savedAccesses[editingIndex].id : Date.now(),
      dateCreation: editingIndex !== null ? savedAccesses[editingIndex].dateCreation : new Date().toISOString(),
      intervenantData: formData.role === 'Intervenant' ? { ...intervenantData } : undefined,
    };

    if (editingIndex !== null) {
      // Mise à jour
      const updated = [...savedAccesses];
      updated[editingIndex] = newAccess;
      setSavedAccesses(updated);
      setEditingIndex(null);
    } else {
      // Ajout
      setSavedAccesses([...savedAccesses, newAccess]);
    }

    // Réinitialiser le formulaire
    handleReset();
  };

  const handleEdit = (index: number) => {
    const access = savedAccesses[index];
    setFormData({
      nom: access.nom,
      prenom: access.prenom,
      email: access.email,
      telephone: access.telephone,
      role: access.role,
      mdp: '', // Ne pas afficher le mot de passe
    });
    
    // Charger les données de l'intervenant si c'est un intervenant
    if (access.role === 'Intervenant' && access.intervenantData) {
      setIntervenantData({ ...access.intervenantData });
    }
    
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (index: number) => {
    setSavedAccesses(savedAccesses.filter((_, i) => i !== index));
  };

  const toggleRowExpansion = (index: number) => {
    setExpandedRows(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const roles = [
    "Agent d'admission",
    'Intervenant',
    'Superviseur',
    'Guichetier'
  ];

  const getRoleColor = (role: string): 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' => {
    switch (role) {
      case 'Superviseur':
        return 'primary';
      case 'Intervenant':
        return 'info';
      case "Agent d'admission":
        return 'secondary';
      case 'Guichetier':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  // Liste des activités (à adapter selon vos données)
  const activites = [
    { id: '1', nom: 'Activité 1' },
    { id: '2', nom: 'Activité 2' },
    { id: '3', nom: 'Activité 3' },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* En-tête */}
      <Card sx={{ borderRadius: 2, mb: 2 }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3,
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleCancel} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
                Créer un Nouvel Accès utilisateur
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configurez les informations pour le nouvel utilisateur
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Label variant="soft" color={getRoleColor(formData.role)}>
              {formData.role}
            </Label>
            <Label variant="soft" color={editingIndex !== null ? 'warning' : 'success'}>
              {editingIndex !== null ? 'Modification' : 'Nouveau'}
            </Label>
          </Box>
        </Box>
      </Card>

      {/* Contenu principal */}
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={2}>
          {/* Informations utilisateur - Full Width */}
          <Grid item xs={12}>
            <Card>
              <Box sx={{
                p: 2,
                backgroundColor: '#fafafa',
                borderBottom: '1px solid #e0e0e0'
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Informations Utilisateur
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                {/* Avatar prévisualisation */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 600,
                    mr: 2
                  }}>
                    {formData.prenom[0] || 'P'}{formData.nom[0] || 'N'}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {formData.prenom || 'Prénom'} {formData.nom || 'Nom'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formData.email || 'email@example.com'}
                    </Typography>
                  </Box>
                </Box>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Nom"
                        value={formData.nom}
                        onChange={handleInputChange('nom')}
                        required
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Prénom"
                        value={formData.prenom}
                        onChange={handleInputChange('prenom')}
                        required
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        required
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Téléphone"
                        value={formData.telephone}
                        onChange={handleInputChange('telephone')}
                        required
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Mot de passe"
                        type="password"
                        value={formData.mdp}
                        onChange={handleInputChange('mdp')}
                        required
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth size="small" required>
                        <InputLabel>Rôle</InputLabel>
                        <Select
                          value={formData.role}
                          onChange={handleRoleChange}
                          label="Rôle"
                        >
                          {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                              {role}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Card>
          </Grid>

          {/* Informations supplémentaires Intervenant - Conditionnel */}
          {formData.role === 'Intervenant' && (
            <Grid item xs={12}>
              <Card>
                <Box sx={{
                  p: 2,
                  backgroundColor: '#fafafa',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Informations Supplémentaires - Intervenant
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Ces informations seront enregistrées avec l'utilisateur
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <IntervenantPermissionsBlock
                    activites={activites}
                    intervenantData={intervenantData}
                    onIntervenantDataChange={setIntervenantData}
                  />
                </Box>
              </Card>
            </Grid>
          )}
        </Grid>

        {/* Actions */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleReset}
            sx={{ px: 4 }}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            sx={{ px: 4 }}
          >
            {editingIndex !== null ? 'Mettre à jour' : 'Enregistrer l\'utilisateur'}
          </Button>
        </Box>

        {/* Tableau récapitulatif */}
        {savedAccesses.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Card>
              <Box sx={{
                p: 2,
                backgroundColor: '#fafafa',
                borderBottom: '1px solid #e0e0e0'
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Accès enregistrés ({savedAccesses.length})
                </Typography>
              </Box>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: '#f3f4f6' }}>
                      <TableCell sx={{ fontWeight: 600, color: '#374151', width: 50 }}></TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Nom & Prénom</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Téléphone</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Rôle</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#374151' }}>Date création</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600, color: '#374151', width: 120 }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {savedAccesses.map((access, index) => (
                      <React.Fragment key={access.id}>
                        <TableRow hover sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
                          <TableCell>
                            {access.role === 'Intervenant' && access.intervenantData && (
                              <IconButton
                                size="small"
                                onClick={() => toggleRowExpansion(index)}
                              >
                                <Iconify 
                                  icon={expandedRows.includes(index) ? "eva:arrow-ios-upward-fill" : "eva:arrow-ios-downward-fill"} 
                                  width={20} 
                                />
                              </IconButton>
                            )}
                          </TableCell>
                          <TableCell sx={{ fontWeight: 500 }}>
                            {access.prenom} {access.nom}
                          </TableCell>
                          <TableCell sx={{ color: 'primary.main' }}>{access.email}</TableCell>
                          <TableCell>{access.telephone}</TableCell>
                          <TableCell>
                            <Label variant="soft" color={getRoleColor(access.role)}>
                              {access.role}
                            </Label>
                            {access.role === 'Intervenant' && access.intervenantData && (
                              <Box sx={{ mt: 1 }}>
                                <Typography variant="caption" color="text.secondary">
                                  {access.intervenantData.activites.length} activité(s) • {access.intervenantData.intervenants.length} intervenant(s)
                                </Typography>
                              </Box>
                            )}
                          </TableCell>
                          <TableCell>{formatDate(access.dateCreation)}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              onClick={() => handleEdit(index)}
                              sx={{ color: 'warning.main', mr: 1 }}
                            >
                              <Iconify icon="solar:pen-bold" width={18} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(index)}
                              sx={{ color: 'error.main' }}
                            >
                              <Iconify icon="solar:trash-bin-trash-bold" width={18} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        
                        {/* Ligne expansible pour les détails de l'intervenant */}
                        {access.role === 'Intervenant' && access.intervenantData && (
                          <TableRow>
                            <TableCell colSpan={7} sx={{ py: 0, borderBottom: expandedRows.includes(index) ? undefined : 'none' }}>
                              <Collapse in={expandedRows.includes(index)} timeout="auto" unmountOnExit>
                                <Box sx={{ p: 3, bgcolor: '#fafbfc' }}>
                                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                                    Détails de l'intervenant
                                  </Typography>
                                  
                                  {/* Activités */}
                                  <Box sx={{ mb: 2 }}>
                                    <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                                      Activités assignées:
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                      {access.intervenantData.activites.map((actId) => {
                                        const activite = activites.find(a => a.id === actId);
                                        return (
                                          <Chip 
                                            key={actId}
                                            label={activite?.nom || actId}
                                            size="small"
                                            color="primary"
                                            variant="outlined"
                                          />
                                        );
                                      })}
                                    </Box>
                                  </Box>
                                  
                                  {/* Intervenants */}
                                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                                    Intervenants ({access.intervenantData.intervenants.length}):
                                  </Typography>
                                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {access.intervenantData.intervenants.map((intervenant, idx) => (
                                      <Card key={idx} variant="outlined" sx={{ p: 2 }}>
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
                                            alt={`Intervenant ${idx + 1}`}
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
                                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                                                {intervenant.reseauxSociaux.map((reseau, rIdx) => (
                                                  <Chip
                                                    key={rIdx}
                                                    label={reseau.nom}
                                                    size="small"
                                                    variant="outlined"
                                                    onClick={() => window.open(reseau.lien, '_blank')}
                                                    sx={{ cursor: 'pointer' }}
                                                    icon={<Iconify icon="mdi:link-variant" width={14} />}
                                                  />
                                                ))}
                                              </Box>
                                            )}
                                          </Box>
                                        </Box>
                                      </Card>
                                    ))}
                                  </Box>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CreateAccessPage;