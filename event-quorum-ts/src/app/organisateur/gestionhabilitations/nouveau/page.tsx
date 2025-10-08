// File 1: src/app/organisateur/gestionhabilitations/nouveau/page.tsx

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
} from '@mui/material';

import { Label } from 'src/components/label';

import IntervenantPermissionsBlock from './components/IntervenantPermissionsBlock';

interface CreateAccessForm {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
  mdp: string;
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Données du formulaire:', formData);
    router.push('/organisateur/gestionhabilitations');
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
            <Label variant="soft" color="success">
              Nouveau
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
                    onPermissionChange={() => {}}
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
            onClick={handleCancel}
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
            Enregistrer l&apos;utilisateur
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateAccessPage;

// ============================================
