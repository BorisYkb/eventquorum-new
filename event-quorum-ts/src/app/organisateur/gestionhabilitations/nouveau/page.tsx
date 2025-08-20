// File: src/app/organisateur/gestionhabilitations/nouveau/page.tsx
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { SelectChangeEvent } from '@mui/material/Select';
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
import Grid from '@mui/material/Grid';
import { ArrowBack } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Label } from 'src/components/label';

// Import des composants de permissions
import BasePermissionsBlock from './components/BasePermissionsBlock';
import SupervisorPermissionsBlock from './components/SupervisorPermissionsBlock';
import OperatorPermissionsBlock from './components/OperatorPermissionsBlock';
import IntervenantPermissionsBlock from './components/IntervenantPermissionsBlock';
import GuichetierPermissionsBlock from './components/GuichetierPermissionsBlock';

interface CreateAccessForm {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
  mdp: string;
  permissions: {
    // Permissions de base pour tous les rôles
    lecture: boolean;
    ecriture: boolean;
    modification: boolean;
    
    // Permissions spécifiques Superviseur
    autoriserExport: boolean;
    
    // Permissions spécifiques Opérateur de saisie
    preciserEnregistrements: boolean;
    typeEntree: string;
    admissionActivite: string;
    
    // Permissions spécifiques Intervenant
    consulterTelEmail: boolean;
    repondreQuestions: boolean;
    
    // Permissions spécifiques Guichetier
    ajouterParticipants: boolean;
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
    role: 'Operateur de saisie',
    mdp: '',
    permissions: {
      // Permissions de base
      lecture: false,
      ecriture: false,
      modification: false,
      
      // Permissions spécifiques
      autoriserExport: false,
      preciserEnregistrements: false,
      typeEntree: '',
      admissionActivite: '',
      consulterTelEmail: false,
      repondreQuestions: false,
      ajouterParticipants: false,
    }
  });

  const handleInputChange = (field: keyof Omit<CreateAccessForm, 'permissions'>) => (
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
      // Réinitialiser les permissions lors du changement de rôle
      permissions: {
        lecture: false,
        ecriture: false,
        modification: false,
        autoriserExport: false,
        preciserEnregistrements: false,
        typeEntree: '',
        admissionActivite: '',
        consulterTelEmail: false,
        repondreQuestions: false,
        ajouterParticipants: false,
      }
    }));
  };

  const handlePermissionChange = (permission: string) =>
    (value: boolean | string) => {
      setFormData(prev => ({
        ...prev,
        permissions: {
          ...prev.permissions,
          [permission]: value
        }
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
    'Operateur de saisie',
    'Intervenant',
    'Superviseur',
    'Organisateur',
    'Guichetier' // Changé de "Tous accès" à "Guichetier"
  ];

  const getRoleColor = (role: string): 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' => {
    switch (role) {
      case 'Superviseur':
        return 'primary';
      case 'Intervenant':
        return 'info';
      case 'Operateur de saisie':
        return 'secondary';
      case 'Organisateur':
        return 'success';
      case 'Guichetier':
        return 'warning';
      default:
        return 'default';
    }
  };

  // Fonction pour rendre les permissions spécifiques selon le rôle
  const renderRoleSpecificPermissions = () => {
    switch (formData.role) {
      case 'Superviseur':
        return (
          <SupervisorPermissionsBlock
            autoriserExport={formData.permissions.autoriserExport}
            onPermissionChange={handlePermissionChange}
          />
        );
      
      case 'Operateur de saisie':
        return (
          <OperatorPermissionsBlock
            preciserEnregistrements={formData.permissions.preciserEnregistrements}
            typeEntree={formData.permissions.typeEntree}
            admissionActivite={formData.permissions.admissionActivite}
            onPermissionChange={handlePermissionChange}
          />
        );
        
      case 'Intervenant':
        return (
          <IntervenantPermissionsBlock
            consulterTelEmail={formData.permissions.consulterTelEmail}
            repondreQuestions={formData.permissions.repondreQuestions}
            onPermissionChange={handlePermissionChange}
          />
        );
        
      case 'Guichetier':
        return (
          <GuichetierPermissionsBlock
            ajouterParticipants={formData.permissions.ajouterParticipants}
            onPermissionChange={handlePermissionChange}
          />
        );
        
      case 'Organisateur':
      default:
        return null; // Pas de permissions spécifiques
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
                Créer un Nouvel Accès
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configurez les informations et permissions pour le nouvel utilisateur
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
          {/* Informations utilisateur */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: 'fit-content' }}>
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
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="Nom de famille"
                      value={formData.nom}
                      onChange={handleInputChange('nom')}
                      required
                      size="small"
                    />

                    <TextField
                      fullWidth
                      label="Prénom"
                      value={formData.prenom}
                      onChange={handleInputChange('prenom')}
                      required
                      size="small"
                    />

                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      required
                      size="small"
                    />

                    <TextField
                      fullWidth
                      label="Téléphone"
                      value={formData.telephone}
                      onChange={handleInputChange('telephone')}
                      required
                      size="small"
                    />

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

                    <TextField
                      fullWidth
                      label="Mot de passe"
                      type="password"
                      value={formData.mdp}
                      onChange={handleInputChange('mdp')}
                      required
                      size="small"
                    />
                  </Stack>
                </form>
              </Box>
            </Card>
          </Grid>

          {/* Permissions dynamiques */}
          <Grid item xs={12} md={6}>
            <Card>
              <Box sx={{
                p: 2,
                backgroundColor: '#fafafa',
                borderBottom: '1px solid #e0e0e0'
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Permissions et Accès
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                {/* Permissions de base (pour tous les rôles) */}
                <BasePermissionsBlock
                  lecture={formData.permissions.lecture}
                  ecriture={formData.permissions.ecriture}
                  modification={formData.permissions.modification}
                  onPermissionChange={handlePermissionChange}
                />

                {/* Permissions spécifiques selon le rôle */}
                {renderRoleSpecificPermissions()}
              </Box>
            </Card>
          </Grid>
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
            Enregistrer l'Accès
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateAccessPage;