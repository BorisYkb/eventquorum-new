// File: src/app/organisateur/gestionhabilitations/[id]/superviseur/page.tsx
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
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { ArrowBack, Edit } from '@mui/icons-material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Label } from 'src/components/label';
import Loading from 'src/app/loading';

interface SuperviseurData {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: string;
  createdAt: string;
  status: string;
  permissions: {
    lecture: boolean;
    ecriture: boolean;
    modification: boolean;
    autoriserExport: boolean;
  };
}

const SuperviseurDetailPage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const theme = useTheme();
  const authId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<SuperviseurData | null>(null);

  // Données spécifiques au Superviseur
  const mockSuperviseurData: SuperviseurData = {
    id: 1,
    nom: 'Martin',
    prenom: 'Pierre',
    email: 'pierre.martin@example.com',
    telephone: '0123456789',
    role: 'Superviseur',
    createdAt: '2024-01-15',
    status: 'Actif',
    permissions: {
      lecture: true,
      ecriture: true,
      modification: false,
      autoriserExport: true,
    }
  };

  useEffect(() => {
    const loadSuperviseurData = async () => {
      try {
        setLoading(true);
        
        // TODO: Appel API spécifique superviseur
        // const response = await fetch(`/api/authorizations/superviseur/${authId}`);
        // const data = await response.json();
        
        await new Promise(resolve => setTimeout(resolve, 800));
        setUserData(mockSuperviseurData);
        
      } catch (error) {
        console.error('Erreur lors du chargement:', error);
      } finally {
        setLoading(false);
      }
    };

    if (authId) {
      loadSuperviseurData();
    }
  }, [authId]);

  const handleBack = () => {
    router.push('/organisateur/gestionhabilitations');
  };

  const handleEdit = () => {
    router.push(`/organisateur/gestionhabilitations/${authId}/modifier`);
  };

  const renderPermissionStatus = (value: boolean) => {
    return value ? (
      <Chip
        icon={<CheckCircle sx={{ fontSize: '16px !important' }} />}
        label="Activé"
        color="success"
        size="small"
        variant="filled"
      />
    ) : (
      <Chip
        icon={<Cancel sx={{ fontSize: '16px !important' }} />}
        label="Désactivé"
        color="default"
        size="small"
        variant="outlined"
      />
    );
  };

  const getStatusColor = (status: string): 'success' | 'error' | 'warning' => {
    switch (status) {
      case 'Actif': return 'success';
      case 'Inactif': return 'error';
      case 'Suspendu': return 'warning';
      default: return 'success';
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
            Superviseur introuvable
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
                Détail Superviseur
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Informations et permissions du superviseur
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Label variant="soft" color="primary">
              Superviseur
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
                  Informations Superviseur
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

                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label="Nom de famille"
                    value={userData.nom}
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Prénom"
                    value={userData.prenom}
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    value={userData.email}
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Téléphone"
                    value={userData.telephone}
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                  <TextField
                    fullWidth
                    label="Date de création"
                    value={new Date(userData.createdAt).toLocaleDateString('fr-FR')}
                    size="small"
                    InputProps={{ readOnly: true }}
                  />
                </Stack>
              </Box>
            </Card>
          </Grid>

          {/* Permissions spécifiques Superviseur */}
          <Grid item xs={12} md={8}>
            <Card>
              <Box sx={{
                p: 2,
                backgroundColor: '#fafafa',
                borderBottom: '1px solid #e0e0e0'
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Permissions Superviseur
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                
                {/* Permissions de base */}
                <Box sx={{ mb: 3 }}>
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
                    Permissions de base
                  </Typography>

                  <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ border: 'none', py: 1.5 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              Lecture
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none', py: 1.5, width: 120 }} align="right">
                            {renderPermissionStatus(userData.permissions.lecture)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ border: 'none', py: 1.5 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              Écriture
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none', py: 1.5, width: 120 }} align="right">
                            {renderPermissionStatus(userData.permissions.ecriture)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={{ border: 'none', py: 1.5 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              Modification
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none', py: 1.5, width: 120 }} align="right">
                            {renderPermissionStatus(userData.permissions.modification)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>

                {/* Permissions spécifiques Superviseur */}
                <Box sx={{ mb: 3 }}>
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
                      backgroundColor: theme.palette.secondary.main,
                      mr: 1
                    }} />
                    Export des données
                  </Typography>

                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ border: 'none', py: 1.5 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              Autoriser l'export des données
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ border: 'none', py: 1.5, width: 120 }} align="right">
                            {renderPermissionStatus(userData.permissions.autoriserExport)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>

              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SuperviseurDetailPage;