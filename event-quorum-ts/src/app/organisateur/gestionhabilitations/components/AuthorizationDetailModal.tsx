// components/AuthorizationDetailModal.tsx
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Card,
  Button,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
  Tooltip,
  Stack,
  Divider,
  Chip
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import { ArrowBack } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

interface Authorization {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

interface AuthorizationDetailModalProps {
  open: boolean;
  onClose: () => void;
  authorization: Authorization | null;
}

const AuthorizationDetailModal: React.FC<AuthorizationDetailModalProps> = ({
  open,
  onClose,
  authorization
}) => {
  const theme = useTheme();

  if (!authorization) return null;

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

  const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'Actif':
        return 'success';
      case 'Inactif':
        return 'error';
      case 'Suspendu':
        return 'warning';
      default:
        return 'default';
    }
  };

  // Données de permissions exemple (vous pouvez les récupérer depuis votre API)
  const permissions = [
    {
      category: 'Enregistrements',
      items: [
        { name: 'Préciser les enregistrements sur espace Opérateur', granted: true },

      ]
    },
    {
      category: 'Activités',
      items: [
        { name: 'Admission à une activité', granted: true },
        { name: 'Gestion complète d\'activité', granted: authorization.role === 'Superviseur' },
        { name: 'Création de nouvelles activités', granted: authorization.role === 'Organisateur' },
      ]
    },
    {
      category: 'Participants',
      items: [
        { name: 'Consulter Tel & Email des participants par l\'intervenant', granted: true },
        { name: 'Répondre aux questions des participants par l\'intervenant', granted: true },
        { name: 'Ajouter des participants depuis l\'espace guichet', granted: authorization.role !== 'Opérateur de saisie' },
      ]
    }

  ];

  const userInfo = [
    { label: 'Nom complet', value: `${authorization.firstName} ${authorization.lastName}` },
    { label: 'Email', value: authorization.email },
    { label: 'Téléphone', value: authorization.phone },
    { label: 'Date de création', value: new Date(authorization.createdAt).toLocaleDateString('fr-FR') },
    { label: 'Dernière connexion', value: '12/07/2025 à 14:30' }, // Exemple
    { label: 'Nombre de connexions', value: '147' }, // Exemple
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: '80vh'
        }
      }}
    >
      <DialogTitle sx={{
        p: 0,
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              onClick={onClose}
              sx={{ mr: 2 }}
            >
              <ArrowBack />
            </IconButton>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#333' }}>
                Détails de l'Accès
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Informations complètes et permissions de l'utilisateur
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Label variant="soft" color={getRoleColor(authorization.role)}>
              {authorization.role}
            </Label>
            <Label variant="soft" color={getStatusColor(authorization.status)}>
              {authorization.status}
            </Label>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Informations utilisateur */}
            <Grid size={{ xs: 12, md: 5 }}>
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
                      {authorization.firstName[0]}{authorization.lastName[0]}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {authorization.firstName} {authorization.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {authorization.email}
                      </Typography>
                    </Box>
                  </Box>

                  <Stack spacing={2}>
                    {userInfo.map((info, index) => (
                      <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {info.label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {info.value}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Card>
            </Grid>

            {/* Permissions */}
            <Grid size={{ xs: 12, md: 7 }}>
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
                  {permissions.map((category, categoryIndex) => (
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
                                <TableCell sx={{ border: 'none', py: 1, width: 100 }} align="right">
                                  <Chip
                                    label={permission.granted ? 'Accordé' : 'Refusé'}
                                    size="small"
                                    color={permission.granted ? 'success' : 'default'}
                                    variant={permission.granted ? 'filled' : 'outlined'}
                                  />
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
              variant="contained"
              onClick={onClose}
              startIcon={<Iconify icon="eva:checkmark-fill" />}
            >
              Fermer
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AuthorizationDetailModal;
