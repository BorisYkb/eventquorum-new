// File: src/app/organisateur/gestionhabilitations/[id]/page.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  Box,
  Card,
  Typography,
  TextField,
  IconButton,
  Stack,
  Chip,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { ArrowBack, Edit } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Label } from 'src/components/label';
import Loading from 'src/app/loading';

// Import des composants de permissions en lecture seule
import BasePermissionsDisplay from './components/BasePermissionsDisplay';
import SupervisorPermissionsDisplay from './components/SupervisorPermissionsDisplay';
import OperatorPermissionsDisplay from './components/OperatorPermissionsDisplay';
import IntervenantPermissionsDisplay from './components/IntervenantPermissionsDisplay';
import GuichetierPermissionsDisplay from './components/GuichetierPermissionsDisplay';

interface UserAccess {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
  createdAt: string;
  status: string;
  permissions: {
    // Permissions de base (toujours présentes)
    lecture: boolean;
    ecriture: boolean;
    modification: boolean;

    // Permissions spécifiques (optionnelles selon le rôle)
    autoriserExport?: boolean;
    preciserEnregistrements?: boolean;
    typeEntree?: string;
    admissionActivite?: string;
    consulterTelEmail?: boolean;
    repondreQuestions?: boolean;
    ajouterParticipants?: boolean;
  };
}

const DetailAccessPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const theme = useTheme();
  const authId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserAccess | null>(null);

  // Simulation des données - à remplacer par un appel API
  const mockUserData: UserAccess = {
    id: 1,
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@example.com',
    telephone: '0123456789',
    role: 'Superviseur',
    createdAt: '2024-01-15',
    status: 'Actif',
    permissions: {
      // Permissions de base
      lecture: true,
      ecriture: true,
      modification: false,

      // SEULEMENT les permissions du Superviseur
      autoriserExport: true,
      // Les autres permissions ne sont pas définies
    }
  };

  // Chargement des données
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);

        // TODO: Remplacer par l'appel API réel
        // const response = await fetch(`/api/authorizations/${authId}`);
        // const data = await response.json();

        // Simulation d'un délai de chargement
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

  // Fonction pour rendre les permissions spécifiques selon le rôle
  const renderRoleSpecificPermissions = () => {
    if (!userData) return null;

    switch (userData.role) {
      case 'Superviseur':
        return (
          <SupervisorPermissionsDisplay
            autoriserExport={userData.permissions.autoriserExport}
          />
        );

      case 'Operateur de saisie':
        return (
          <OperatorPermissionsDisplay
            preciserEnregistrements={userData.permissions.preciserEnregistrements}
            typeEntree={userData.permissions.typeEntree}
            admissionActivite={userData.permissions.admissionActivite}
          />
        );

      case 'Intervenant':
        return (
          <IntervenantPermissionsDisplay
            consulterTelEmail={userData.permissions.consulterTelEmail}
            repondreQuestions={userData.permissions.repondreQuestions}
          />
        );

      case 'Guichetier':
        return (
          <GuichetierPermissionsDisplay
            ajouterParticipants={userData.permissions.ajouterParticipants}
          />
        );

      case 'Organisateur':
      default:
        return null;
    }
  };

  // Affichage du loader pendant le chargement
  if (loading) {
    return <Loading />;
  }

  // Gestion du cas où les données ne sont pas trouvées
  if (!userData) {
    return (
      <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            Utilisateur introuvable
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            L'accès demandé n'existe pas ou a été supprimé.
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
                Détail de l'Accès
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Informations et permissions de l'utilisateur
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
                bgcolor: '#00B8D9',
                color: 'white',
                '&:hover': { bgcolor: '#00A3C4' }
              }}
              size="small"
            >
              <Edit sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Box>
      </Card>

      {/* Contenu principal */}
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Grid container spacing={3}>
          {/* Informations utilisateur */}
          <Grid item xs={12} md={4}>
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
                {/* Avatar et informations principales */}
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

                {/* Champs en lecture seule */}
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Nom de famille"
                    value={userData.nom}
                    size="small"
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                  />

                  <TextField
                    fullWidth
                    label="Prénom"
                    value={userData.prenom}
                    size="small"
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    value={userData.email}
                    size="small"
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                  />

                  <TextField
                    fullWidth
                    label="Téléphone"
                    value={userData.telephone}
                    size="small"
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                  />

                  <TextField
                    fullWidth
                    label="Rôle"
                    value={userData.role}
                    size="small"
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                  />

                  <TextField
                    fullWidth
                    label="Date de création"
                    value={new Date(userData.createdAt).toLocaleDateString('fr-FR')}
                    size="small"
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                  />

                  <TextField
                    fullWidth
                    label="Statut"
                    value={userData.status}
                    size="small"
                    InputProps={{ readOnly: true }}
                    variant="outlined"
                  />
                </Stack>
              </Box>
            </Card>
          </Grid>

          {/* Permissions en lecture seule */}
          <Grid item xs={12} md={8}>
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
                <BasePermissionsDisplay
                  lecture={userData.permissions.lecture}
                  ecriture={userData.permissions.ecriture}
                  modification={userData.permissions.modification}
                />

                {/* Permissions spécifiques selon le rôle */}
                {renderRoleSpecificPermissions()}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DetailAccessPage;