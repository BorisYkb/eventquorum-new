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
} from '@mui/material';

import { Label } from 'src/components/label';

import IntervenantSupinfos from 'src/sections/gestionhabilitation/nouveau/Intervenant-Sup-infos';
import AgentSaisieSupinfos from 'src/sections/gestionhabilitation/nouveau/AgentSaisie-Sup-infos';
import GuichetSupinfos from 'src/sections/gestionhabilitation/nouveau/Guichet-Sup-infos';

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

interface AgentSaisieData {
  typeAdmission: 'entree' | 'activite' | 'entree_et_activite' | '';
  activiteSelectionnee: string;
}

interface GuichetData {
  autoriserAjoutParticipant: boolean;
}

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

  // État pour les données de l'intervenant
  const [intervenantData, setIntervenantData] = useState<IntervenantData>({
    activites: [],
    image: null,
    description: '',
    reseauxSociaux: []
  });

  // État pour les données de l'agent de saisie
  const [agentSaisieData, setAgentSaisieData] = useState<AgentSaisieData>({
    typeAdmission: '',
    activiteSelectionnee: ''
  });

  // État pour les données du guichet
  const [guichetData, setGuichetData] = useState<GuichetData>({
    autoriserAjoutParticipant: false
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

    // Réinitialiser les données selon le rôle
    if (event.target.value !== 'Intervenant') {
      setIntervenantData({
        activites: [],
        image: null,
        description: '',
        reseauxSociaux: []
      });
    }
    if (event.target.value !== "Agent d'admission") {
      setAgentSaisieData({
        typeAdmission: '',
        activiteSelectionnee: ''
      });
    }
    if (event.target.value !== 'Guichetier') {
      setGuichetData({
        autoriserAjoutParticipant: false
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
      image: null,
      description: '',
      reseauxSociaux: []
    });
    setAgentSaisieData({
      typeAdmission: '',
      activiteSelectionnee: ''
    });
    setGuichetData({
      autoriserAjoutParticipant: false
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
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

    // Validation pour Agent d'admission
    if (formData.role === "Agent d'admission") {
      if (!agentSaisieData.typeAdmission) {
        alert('Veuillez sélectionner un type d\'admission');
        return;
      }
      if ((agentSaisieData.typeAdmission === 'activite' || agentSaisieData.typeAdmission === 'entree_et_activite') 
          && !agentSaisieData.activiteSelectionnee) {
        alert('Veuillez sélectionner une activité');
        return;
      }
    }

    // Ici vous pouvez traiter la soumission du formulaire
    console.log('Données du formulaire:', formData);
    console.log('Données intervenant:', intervenantData);
    console.log('Données agent de saisie:', agentSaisieData);
    console.log('Données guichet:', guichetData);

    alert('Utilisateur créé avec succès!');
    handleReset();
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

          {/* Informations supplémentaires Agent de saisie - Conditionnel */}
          {formData.role === "Agent d'admission" && (
            <Grid item xs={12}>
              <Card>
                <Box sx={{
                  p: 2,
                  backgroundColor: '#fafafa',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Informations Supplémentaires - Agent d'admission
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Ces informations seront enregistrées avec l'utilisateur
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <AgentSaisieSupinfos
                    activites={activites}
                    agentSaisieData={agentSaisieData}
                    onAgentSaisieDataChange={setAgentSaisieData}
                  />
                </Box>
              </Card>
            </Grid>
          )}

          {/* Informations supplémentaires Guichetier - Conditionnel */}
          {formData.role === 'Guichetier' && (
            <Grid item xs={12}>
              <Card>
                <Box sx={{
                  p: 2,
                  backgroundColor: '#fafafa',
                  borderBottom: '1px solid #e0e0e0'
                }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Informations Supplémentaires - Guichetier
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Ces informations seront enregistrées avec l'utilisateur
                  </Typography>
                </Box>
                <Box sx={{ p: 3 }}>
                  <GuichetSupinfos
                    guichetData={guichetData}
                    onGuichetDataChange={setGuichetData}
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
            Enregistrer l'utilisateur
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateAccessPage;