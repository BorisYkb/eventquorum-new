// src/app/participant/enligne/payer/activites/components/activites-non-payees-list.tsx
'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { Iconify } from 'src/components/iconify';

import type { ActivitePayee } from './activites-payees-data';

// ----------------------------------------------------------------------

interface ActivitesNonPayeesListProps {
  activites: ActivitePayee[];
}

export function ActivitesNonPayeesList({ activites }: ActivitesNonPayeesListProps) {
  const handlePayActivity = (activite: ActivitePayee) => {
    console.log(`Pay for activity: ${activite.id}, amount: ${activite.prix}`);
    // TODO: Rediriger vers le système de paiement
  };

  const handleDownloadDocument = (activite: ActivitePayee) => {
    if (!activite.hasDocument || !activite.documentUrl) return;
    console.log(`Download document: ${activite.documentUrl}`);
    // TODO: Implémenter téléchargement document
  };

  if (activites.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Iconify 
          icon="solar:check-circle-bold" 
          width={64} 
          sx={{ color: 'success.main', mb: 2 }}
        />
        <Typography variant="h6" color="success.main" sx={{ mb: 1 }}>
          Toutes vos activités sont payées !
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Vous avez accès à toutes les activités sélectionnées
        </Typography>
      </Box>
    );
  }

  return (
    <TableContainer sx={{ boxShadow: 2, borderRadius: 1}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Activité</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Horaire</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Standing</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Prix de départ</TableCell>
            <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activites.map((activite) => (
            <TableRow key={activite.id} hover>
              <TableCell>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {activite.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {activite.description}
                  </Typography>
                </Box>
              </TableCell>
              
              <TableCell>
                <Chip
                  label={activite.time}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    fontSize: '0.75rem'
                  }}
                />
              </TableCell>

              <TableCell>
                <Chip
                  label={activite.status}
                  size="small"
                  color={activite.statusColor}
                  variant="soft"
                  sx={{ fontWeight: 500, fontSize: '0.75rem' }}
                />
              </TableCell>

              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {activite.standing}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 600, 
                    color: activite.prix === 0 ? 'success.main' : 'warning.main' 
                  }}
                >
                  {activite.prix === 0 ? 'Gratuit' : `${activite.prix.toLocaleString()} FCFA`}
                </Typography>
              </TableCell>

              <TableCell>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, alignItems: 'center' }}>

                  {/* Bouton payer/confirmer */}
                  {activite.prix === 0 ? (
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      startIcon={<Iconify icon="solar:check-circle-bold" width={16} />}
                      onClick={() => handlePayActivity(activite)}
                      sx={{ 
                        fontSize: '0.75rem',
                        minWidth: 'auto',
                        px: 1.5,
                        py: 0.5
                      }}
                    >
                      Confirmer
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      variant="contained"
                      color="primary"
                      startIcon={<Iconify icon="solar:card-bold" width={16} />}
                      onClick={() => handlePayActivity(activite)}
                      sx={{ 
                        fontSize: '0.75rem',
                        minWidth: 'auto',
                        px: 1.5,
                        py: 0.5
                      }}
                    >
                      Payer
                    </Button>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}