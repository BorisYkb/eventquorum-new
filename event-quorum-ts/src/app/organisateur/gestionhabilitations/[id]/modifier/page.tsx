// File: src/app/organisateur/gestionhabilitations/[id]/modifier/page.tsx

'use client'

import type { SelectChangeEvent } from '@mui/material/Select';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

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
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';

import Loading from 'src/app/loading';
import { Label } from 'src/components/label';

import IntervenantSupinfos from 'src/sections/gestionhabilitation/nouveau/Intervenant-Sup-infos';

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

interface EditAccessForm {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
  mdp: string;
}

// Données mockées pour simulation - À remplacer par l'appel API
const getMockUserData = (id: string) => {
  // Simuler différents utilisateurs selon l'ID
  const mockUsers: Record<string, any> = {
    '1': {
      id: 1,
      firstName: 'Jean',
      lastName: 'Dupont',
      phone: '07 12 34 56 78',
      email: 'jean.dupont@example.com',
      role: 'Superviseur',
    },
    '2': {
      id: 2,
      firstName: 'Marie',
      lastName: 'Martin',
      phone: '05 98 76 54 32',
      email: 'marie.martin@example.com',
      role: 'Intervenant',
      intervenantData: {
        activites: ['1', '2'],
        image: 'https://via.placeholder.com/150',
        description: '<p><strong>Marie Martin</strong> - Experte en développement web</p><p>10 ans d\'expérience en React et TypeScript</p>',
        reseauxSociaux: [
          { nom: 'LinkedIn', lien: 'https://linkedin.com/in/mariemartin' },
          { nom: 'GitHub', lien: 'https://github.com/mariemartin' }
        ]
      }
    },
    '3': {
      id: 3,
      firstName: 'Pierre',
      lastName: 'Kouassi',
      phone: '01 23 45 67 89',
      email: 'pierre.kouassi@example.com',
      role: "Agent d'admission",
    }
  };

  return mockUsers[id] || mockUsers['1'];
};

const EditAccessPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const theme = useTheme();
  const authId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  const [formData, setFormData] = useState<EditAccessForm>({
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
    image: null,
    description: '',
    reseauxSociaux: []
  });

  // Chargement des données existantes
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);

        // TODO: Remplacer par l'appel API réel
        // const response = await fetch(`/api/authorizations/${authId}`);
        // const userData = await response.json();
        
        // Simulation d'un délai d'API
        await new Promise(resolve => setTimeout(resolve, 1000));
        const userData = getMockUserData(authId);

        // Pré-remplir les données du formulaire
        setFormData({
          nom: userData.lastName,
          prenom: userData.firstName,
          email: userData.email,
          telephone: userData.phone,
          role: userData.role,
          mdp: '',
        });

        // Si c'est un intervenant, pré-remplir les données intervenant
        if (userData.role === 'Intervenant' && userData.intervenantData) {
          setIntervenantData({
            activites: userData.intervenantData.activites || [],
            image: userData.intervenantData.image || null,
            description: userData.intervenantData.description || '',
            reseauxSociaux: userData.intervenantData.reseauxSociaux || []
          });
        }

      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    if (authId) {
      loadUserData();
    }
  }, [authId]);

  const handleInputChange = (field: keyof EditAccessForm) => (
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
        image: null,
        description: '',
        reseauxSociaux: []
      });
    }
  };

  const handleCancel = () => {
    router.push('/organisateur/gestionhabilitations');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validation pour le rôle Intervenant
    if (formData.role === 'Intervenant') {
      if (intervenantData.activites.length === 0) {
        alert('Veuillez sélectionner au moins une activité pour l\'intervenant');
        return;
      }
      if (!intervenantData.image) {
        alert('Veuillez ajouter une photo pour l\'intervenant');
        return;
      }
      if (!intervenantData.description) {
        alert('Veuillez ajouter une description pour l\'intervenant');
        return;
      }
    }

    try {
      setSaving(true);

      // TODO: Remplacer par l'appel API réel
      // const response = await fetch(`/api/authorizations/${authId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     ...formData,
      //     intervenantData: formData.role === 'Intervenant' ? intervenantData : undefined
      //   })
      // });

      // Simulation d'un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Afficher l'alerte de succès
      setShowSuccessAlert(true);

      // Rediriger après un délai pour voir l'alerte
      setTimeout(() => {
        router.push('/organisateur/gestionhabilitations');
      }, 1500);

    } catch (error) {
      console.error('Erreur lors de la modification:', error);
    } finally {
      setSaving(false);
    }
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

  // Liste des activités (à adapter selon vos données)
  const activites = [
    { id: '1', nom: 'Activité 1' },
    { id: '2', nom: 'Activité 2' },
    { id: '3', nom: 'Activité 3' },
  ];

  // Affichage du loader pendant le chargement
  if (loading) {
    return <Loading />;
  }

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
                Modification des informations
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Modifiez les informations de l'utilisateur
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Label variant="soft" color={getRoleColor(formData.role)}>
              {formData.role}
            </Label>
            <Label variant="soft" color="warning">
              Modification
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
                        placeholder="Laisser vide pour ne pas modifier"
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
                  <IntervenantSupinfos
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
            onClick={handleCancel}
            disabled={saving}
            sx={{ px: 4 }}
          >
            Annuler
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleSubmit}
            disabled={saving}
            sx={{ px: 4 }}
          >
            {saving ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                Enregistrement...
              </>
            ) : (
              "Enregistrer les modifications"
            )}
          </Button>
        </Box>
      </Box>

      {/* Notification de succès */}
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setShowSuccessAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity="success"
          onClose={() => setShowSuccessAlert(false)}
          sx={{ width: '100%' }}
        >
          Modifications enregistrées avec succès !
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EditAccessPage;