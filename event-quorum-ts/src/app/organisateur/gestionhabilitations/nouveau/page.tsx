// File: src/app/organisateur/gestionhabilitations/nouveau/page.tsx
'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  FormControlLabel,
  FormGroup,
  Divider,
  IconButton,
  Stack,
  Breadcrumbs,
  Link,
  Paper,
  Chip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ArrowBack } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import Checkbox from '@mui/material/Checkbox';

interface CreateAccessForm {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
  mdp: string;
  permissions: {
    preciserEnregistrements: boolean;
    admissionActivite: string;
    autoriserConsulter: boolean;
    autoriserRepondre: boolean;
    autoriserAjout: boolean;
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
      preciserEnregistrements: false,
      admissionActivite: '',
      autoriserConsulter: false,
      autoriserRepondre: false,
      autoriserAjout: false,
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

  const handlePermissionChange = (permission: keyof CreateAccessForm['permissions']) => (
    event: React.ChangeEvent<HTMLInputElement | { value: unknown }>
  ) => {
    const value = event.target.type === 'checkbox' ? (event.target as HTMLInputElement).checked : event.target.value;
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

    // TODO: Envoyer les données à votre API
    router.push('/organisateur/gestionhabilitations');
  };

  const roles = [
    'Operateur de saisie',
    'Intervenant',
    'Superviseur',
    'Organisateur',
    'Tous accès'
  ];

  const getRoleColor = (role: string): 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' => {
    switch (role) {
      case 'Superviseur':
        return 'primary';
      case 'Intervenant':
        return 'info';
      case 'Opérateur de saisie':
        return 'secondary';
      case 'Organisateur':
        return 'success';
      case 'Tous accès':
        return 'error';
      default:
        return 'default';
    }
  };

  // Permissions organisées par catégories
  const permissionCategories = [
    {
      category: 'Enregistrements',
      items: [
        {
          key: 'preciserEnregistrements',
          name: 'Préciser les enregistrements sur espace Opérateur',
          type: 'checkbox'
        }
      ]
    },
    {
      category: 'Activités',
      items: [
        {
          key: 'admissionActivite',
          name: 'Type d\'admission',
          type: 'select',
          options: [
            { value: '', label: 'Aucune admission' },
            { value: 'Admission à une activité', label: 'Admission à une activité' },
            { value: 'Admission/Gestion d\'une activité', label: 'Admission/Gestion d\'une activité' }
          ]
        }
      ]
    },
    {
      category: 'Participants',
      items: [
        {
          key: 'autoriserConsulter',
          name: 'Consulter Tel & Email des participants',
          type: 'checkbox'
        },
        {
          key: 'autoriserRepondre',
          name: 'Répondre aux questions des participants',
          type: 'checkbox'
        },
        {
          key: 'autoriserAjout',
          name: 'Ajouter des participants depuis l\'espace guichet',
          type: 'checkbox'
        }
      ]
    }
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* En-tête similaire au modal */}
      <Card sx={{ borderRadius: 2, mb: 3 }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3,
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={handleCancel}
              sx={{ mr: 2 }}
            >
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
        <Grid container spacing={3}>
          {/* Informations utilisateur */}
          <Grid item xs={12} md={5}>
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
                        onChange={handleInputChange('role')}
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

          {/* Permissions */}
          <Grid item xs={12} md={7}>
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
                {permissionCategories.map((category, categoryIndex) => (
                  <Box key={categoryIndex} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" sx={{
                      fontWeight: 600,
                      mb: 2,
                      color: '#374151',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <Box sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.primary.main,
                        mr: 1
                      }} />
                      {category.category}
                    </Typography>

                    <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                      <Table size="small">
                        <TableBody>
                          {category.items.map((permission, index) => (
                            <TableRow key={index}>
                              <TableCell sx={{ border: 'none', py: 1 }}>
                                <Typography variant="body2">
                                  {permission.name}
                                </Typography>
                              </TableCell>
                              <TableCell sx={{ border: 'none', py: 1, width: 200 }} align="right">
                                {permission.type === 'checkbox' ? (
                                  <Checkbox
                                    checked={formData.permissions[permission.key as keyof typeof formData.permissions] as boolean}
                                    onChange={handlePermissionChange(permission.key as keyof typeof formData.permissions)}
                                    size="small"
                                  />
                                ) : permission.type === 'select' ? (
                                  <FormControl size="small" sx={{ minWidth: 180 }}>
                                    <Select
                                      value={formData.permissions[permission.key as keyof typeof formData.permissions]}
                                      onChange={handlePermissionChange(permission.key as keyof typeof formData.permissions)}
                                      displayEmpty
                                    >
                                      {permission.options?.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                ) : null}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ))}
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
            startIcon={<Iconify icon="eva:close-fill" />}
            sx={{ px: 4 }}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            startIcon={<Iconify icon="eva:save-fill" />}
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
