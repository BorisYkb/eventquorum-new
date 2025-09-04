// src/app/participant/enligne/payer/activites/components/activites-payees-list.tsx
'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
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

interface ActivitesPayeesListProps {
  activites: ActivitePayee[];
}

export function ActivitesPayeesList({ activites }: ActivitesPayeesListProps) {
  const handleDownloadDocument = (activite: ActivitePayee) => {
    if (!activite.hasDocument || !activite.documentUrl) return;
    console.log(`Download document: ${activite.documentUrl}`);
    // TODO: Implémenter téléchargement document
  };

  const handleWatchVideo = (activite: ActivitePayee) => {
    if (!activite.hasVideo || !activite.videoUrl) return;
    console.log(`Watch video: ${activite.videoUrl}`);
    // TODO: Implémenter lecture vidéo
  };

  const isResourceDisabled = (activite: ActivitePayee, resourceType: 'document' | 'video') => {
    // Désactiver si activité non démarrée OU si la ressource n'existe pas
    const hasResource = resourceType === 'document' ? activite.hasDocument : activite.hasVideo;
    return activite.status === 'Non démarré' || !hasResource;
  };

  if (activites.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <Typography variant="h6" color="text.secondary">
          Aucune activité payée
        </Typography>
        <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
          Les activités payées apparaîtront ici une fois les paiements effectués
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
            <TableCell sx={{ fontWeight: 600 }}>Place</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Prix payé</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Date paiement</TableCell>
            <TableCell sx={{ fontWeight: 600, textAlign: 'center' }}>Ressources</TableCell>
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
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'success.main' }}>
                  {activite.prix === 0 ? 'Gratuit' : `${activite.prix.toLocaleString()} FCFA`}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="body2" color="text.secondary">
                  {new Date(activite.datePaiement).toLocaleDateString('fr-FR')}
                </Typography>
              </TableCell>

              <TableCell>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                  {/* Icône Document */}
                  <IconButton
                    size="small"
                    onClick={() => handleDownloadDocument(activite)}
                    disabled={isResourceDisabled(activite, 'document')}
                    sx={{
                      color: isResourceDisabled(activite, 'document') ? 'text.disabled' : 'primary.main',
                      '&:hover': {
                        bgcolor: isResourceDisabled(activite, 'document') ? 'transparent' : 'primary.lighter'
                      }
                    }}
                  >
                    <Iconify 
                      icon="solar:document-text-bold" 
                      width={20}
                    />
                  </IconButton>

                  {/* Icône Vidéo */}
                  <IconButton
                    size="small"
                    onClick={() => handleWatchVideo(activite)}
                    disabled={isResourceDisabled(activite, 'video')}
                    sx={{
                      color: isResourceDisabled(activite, 'video') ? 'text.disabled' : 'secondary.main',
                      '&:hover': {
                        bgcolor: isResourceDisabled(activite, 'video') ? 'transparent' : 'secondary.lighter'
                      }
                    }}
                  >
                    <Iconify 
                      icon="solar:videocamera-record-bold" 
                      width={20}
                    />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}