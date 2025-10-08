// File 2: src/app/organisateur/gestionhabilitations/[id]/page.tsx
// eslint-disable-next-line @typescript-eslint/no-unused-expressions

'use client'

import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter, useParams } from 'next/navigation';

import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Card,
  Typography,
  TextField,
  IconButton,
  Stack,
  Chip,
} from '@mui/material';

import Loading from 'src/app/loading';

import { Label } from 'src/components/label';

import IntervenantPermissionsDisplay from './components/IntervenantPermissionsDisplay';

interface UserAccess {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
  createdAt: string;
  status: string;
}

const DetailAccessPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const theme = useTheme();
  const authId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserAccess | null>(null);

  const mockUserData: UserAccess = {
    id: 1,
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@example.com',
    telephone: '0123456789',
    role: 'Intervenant',
    createdAt: '2024-01-15',
    status: 'Actif',
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setUserData(mockUserData);
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

  const handleBack = () => {
    router.push('/organisateur/gestionhabilitations');
  };

  const handleEdit = () => {
    router.push(`/organisateur/gestionhabilitations/${authId}/modifier`);
  };

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

  const getStatusColor = (status: string): 'success' | 'error' | 'warning' => {
    switch (status) {
      case 'Actif':
        return 'success';
      case 'Inactif':
        return 'error';
      case 'Suspendu':
        return 'warning';
      default:
        return 'success';
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!userData) {
    return (
      <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            Utilisateur introuvable
          </Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* En-tête */}
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
            <IconButton onClick={handleBack} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
                Détail de l'Accès utisalisateur
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Informations de l'utilisateur
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Label variant="soft" color={getRoleColor(userData.role)}>
              {userData.role}
            </Label>
            <Chip
              label={userData.status}
              color={getStatusColor(userData.status)}
              size="small"
              variant="filled"
            />
            <IconButton 
              onClick={handleEdit}
              sx={{ 
                bgcolor: 'white', 
                color: '#00B8D9',
                '&:hover': { bgcolor: '#F3F4F6' }
              }}
              size="small"
            >
              <Icon icon="solar:pen-new-square-linear" width={18} height={18} />
            </IconButton>
          </Box>
        </Box>
      </Card>

      {/* Contenu principal */}
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={3}>
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
                    {userData.prenom[0]}{userData.nom[0]}
                  </Box>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {userData.prenom} {userData.nom}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {userData.email}
                    </Typography>
                  </Box>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Nom de famille"
                      value={userData.nom}
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Prénom"
                      value={userData.prenom}
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={userData.email}
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Téléphone"
                      value={userData.telephone}
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Rôle"
                      value={userData.role}
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Date de création"
                      value={new Date(userData.createdAt).toLocaleDateString('fr-FR')}
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Statut"
                      value={userData.status}
                      size="small"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Card>
          </Grid>

          {/* Informations supplémentaires Intervenant - Conditionnel */}
          {/* {userData.role === 'Intervenant' && (
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
                  <IntervenantPermissionsDisplay consulterTelEmail={false} repondreQuestions={false}                    
                  />
                </Box>
              </Card>
            </Grid>
          )} */}
        </Grid>
      </Box>
    </Box>
  );
};

export default DetailAccessPage;