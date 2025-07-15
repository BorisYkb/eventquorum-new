// src/app/operateur/components/detail-popup.tsx

'use client';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

interface ActivityData {
  id: string;
  nom: string;
  presence: 'Confirmé' | 'Non confirmé';
  dateHeure: string;
}

interface ParticipantDetailData {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  statut: 'En ligne' | 'En physique' | 'Aucun';
  dateEmargement: string;
  heureEmargement: string;
  signature?: string;
  activities: ActivityData[];
}

interface DetailPopupProps {
  open: boolean;
  participant: ParticipantDetailData | null;
  onClose: () => void;
}

// Mock data pour les activités
const mockActivities: ActivityData[] = [
  {
    id: '1',
    nom: 'activité 1',
    presence: 'Confirmé',
    dateHeure: '01/01/23 09H00'
  },
  {
    id: '2',
    nom: 'activité 2',
    presence: 'Confirmé',
    dateHeure: '01/01/23 09H00'
  },
  {
    id: '3',
    nom: 'activité 3',
    presence: 'Non confirmé',
    dateHeure: '--'
  },
  {
    id: '4',
    nom: 'activité 4',
    presence: 'Non confirmé',
    dateHeure: '--'
  },
];

export function DetailPopup({ 
  open, 
  participant, 
  onClose 
}: DetailPopupProps) {

  if (!participant) return null;

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'En ligne':
        return 'info';
      case 'En physique':
        return 'success';
      case 'Aucun':
        return 'default';
      default:
        return 'default';
    }
  };

  const getPresenceColor = (presence: string) => {
    return presence === 'Confirmé' ? 'success' : 'default';
  };

  const formatEmargementInfo = () => {
    const hasEmargement = participant.statut !== 'Aucun';
    const emargementType = participant.statut === 'En ligne' ? 'en ligne' : 'physique';
    
    if (hasEmargement) {
      return `A Émargé le ${participant.dateEmargement} à ${participant.heureEmargement}`;
    }
    return 'Non émargé';
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: 600,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        {/* En-tête avec titre et bouton retour */}
        <Box
          sx={{
            bgcolor: 'grey.100',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Participant / {participant.nom} {participant.prenom}
          </Typography>
          
          <Button
            onClick={onClose}
            variant="contained"
            color="inherit"
            size="small"
            sx={{ minWidth: 100 }}
          >
            Retour
          </Button>
        </Box>

        <Box sx={{ display: 'flex', minHeight: 500 }}>
          {/* Panneau gauche - Statuts d'émargement */}
          <Box
            sx={{
              width: 280,
              bgcolor: 'grey.50',
              borderRight: 1,
              borderColor: 'divider',
              p: 2
            }}
          >

            {/* Statuts d'émargement */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                {formatEmargementInfo()}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                A Émargé en ligne : NON
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                A Émargé physique : {participant.statut === 'En physique' ? 'OUI' : 'NON'}
              </Typography>
            </Box>

            {/* Signature */}
            {participant.signature && (
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Signature du participant
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    border: 1,
                    borderColor: 'grey.300',
                    p: 1,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1
                  }}
                >
                  <img
                    src={participant.signature}
                    alt="Signature"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </Paper>
              </Box>
            )}
          </Box>

          {/* Panneau droit - Informations détaillées */}
          <Box sx={{ flex: 1, p: 3 }}>
            {/* Informations personnelles */}
            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ pb: '16px !important' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Informations personnelles
                  </Typography>
                  <Chip
                    label={participant.statut}
                    color={getStatutColor(participant.statut) as any}
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Ces informations portent sur le Nom & prénom, Email, Téléphone
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                    Détail
                  </Typography>
                </Box>

                <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 500 }}>
                      Nom
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 4, fontWeight: 600 }}>
                      {participant.nom}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 500 }}>
                      Prénom
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 4, fontWeight: 600 }}>
                      {participant.prenom}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', mb: 1.5 }}>
                    <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 500 }}>
                      Email
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 4, fontWeight: 600 }}>
                      {participant.email}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex' }}>
                    <Typography variant="body2" sx={{ minWidth: 80, fontWeight: 500 }}>
                      Téléphone
                    </Typography>
                    <Typography variant="body2" sx={{ ml: 4, fontWeight: 600 }}>
                      {participant.telephone}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Liste des activités autorisées */}
            <Card>
              <CardContent sx={{ pb: '16px !important' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Liste des activités autorisées
                </Typography>

                <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: 'grey.300' }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ bgcolor: 'grey.100' }}>
                        <TableCell sx={{ fontWeight: 600, py: 1.5 }}>
                          Nom de l'activité
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, py: 1.5 }}>
                          Présence
                        </TableCell>
                        <TableCell sx={{ fontWeight: 600, py: 1.5 }}>
                          Date et Heure
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {mockActivities.map((activity) => (
                        <TableRow key={activity.id} hover>
                          <TableCell sx={{ py: 1.5 }}>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {activity.nom}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 1.5 }}>
                            <Chip
                              label={activity.presence}
                              color={getPresenceColor(activity.presence) as any}
                              size="small"
                              variant="soft"
                            />
                          </TableCell>
                          <TableCell sx={{ py: 1.5 }}>
                            <Typography variant="body2" color="text.secondary">
                              {activity.dateHeure}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}