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
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import IntervenantPermissionsBlock from './components/IntervenantPermissionsBlock';

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
  intervenantData?: {
    activites: string[];
    intervenants: number;
  };
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

  // État pour les accès enregistrés
  const [savedAccesses, setSavedAccesses] = useState<SavedAccess[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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
    setEditingIndex(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const newAccess: SavedAccess = {
      ...formData,
      id: editingIndex !== null ? savedAccesses[editingIndex].id : Date.now(),
      dateCreation: editingIndex !== null ? savedAccesses[editingIndex].dateCreation : new Date().toISOString(),
      // TODO: Récupérer les vraies données de l'intervenant si le rôle est "Intervenant"
      intervenantData: formData.role === 'Intervenant' ? {
        activites: ['Activité 1', 'Activité 2'], // À remplacer par les vraies données
        intervenants: 2, // À remplacer par le vrai nombre
      } : undefined,
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
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (index: number) => {
    setSavedAccesses(savedAccesses.filter((_, i) => i !== index));
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
                </Box>
                <Box sx={{ p: 3 }}>
                  <IntervenantPermissionsBlock
                    consulterTelEmail={false}
                    repondreQuestions={false}
                    onPermissionChange={() => () => {}}
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
                      <TableRow key={access.id} hover sx={{ '&:hover': { bgcolor: '#f9fafb' } }}>
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
                                {access.intervenantData.activites.length} activité(s) • {access.intervenantData.intervenants} intervenant(s)
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