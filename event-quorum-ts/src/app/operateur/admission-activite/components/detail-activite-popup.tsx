// src/app/operateur/admissionactivite/components/detail-activite-popup.tsx

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
import Divider from '@mui/material/Divider';

import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

interface ActivityData {
  id: string;
  nom: string;
  presence: 'Confirmé' | 'Non confirmé';
  dateHeure: string;
}

interface ParticipantActiviteDetailData {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  statut: 'En ligne' | 'Physique' | 'Aucun';
  dateConfirmation: string;
  heureConfirmation: string;
  signature?: string;
  activities?: ActivityData[];
  activiteActuelle?: string;
}

interface DetailActivitePopupProps {
  open: boolean;
  participant: ParticipantActiviteDetailData | null;
  onClose: () => void;
}

// Mock data pour les activités du participant
const mockActivities: ActivityData[] = [
  {
    id: '1',
    nom: 'Activité 1',
    presence: 'Confirmé',
    dateHeure: '01/01/23 09H00'
  },
  {
    id: '2',
    nom: 'Activité 2',
    presence: 'Confirmé',
    dateHeure: '01/01/23 09H00'
  },
  {
    id: '3',
    nom: 'Activité 3',
    presence: 'Non confirmé',
    dateHeure: '--'
  },
  {
    id: '4',
    nom: 'Activité 4',
    presence: 'Non confirmé',
    dateHeure: '--'
  },
];

export function DetailActivitePopup({ 
  open, 
  participant, 
  onClose 
}: DetailActivitePopupProps) {

  if (!participant) return null;

  const getPresenceColor = (presence: string) => {
    return presence === 'Confirmé' ? 'info' : 'warning';
  };

  const formatConfirmationInfo = () => {
    const hasConfirmation = participant.statut !== 'Aucun';
    
    if (hasConfirmation) {
      return `A Confirmé le ${participant.dateConfirmation} à ${participant.heureConfirmation}`;
    }
    return 'Non confirmé';
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 1,
          height: '80vh',
          maxHeight: '80vh',
          width: '90%',
          maxWidth: 800
        }
      }}
    >
      <DialogContent sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
        {/* En-tête */}
        <Box
          sx={{
            bgcolor: 'grey.100',
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid',
            borderColor: 'grey.300'
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Participant / {participant.nom} {participant.prenom} - {participant.activiteActuelle}
          </Typography>
          
          <Button
            onClick={onClose}
            variant="contained"
            color="error"
            size="small"
            startIcon={<Iconify icon="eva:arrow-back-fill" />}
            sx={{ px: 2 }}
          >
            Retour
          </Button>
        </Box>

        {/* Contenu principal */}
        <Box sx={{ display: 'flex', height: 'calc(100% - 65px)' }}>
          {/* Panneau gauche */}
          <Box
            sx={{
              width: 200,
              bgcolor: 'grey.50',
              borderRight: '1px solid',
              borderColor: 'grey.300',
              p: 1.5,
              overflow: 'auto'
            }}
          >
            {/* Statuts de confirmation dans une Stack */}
            <Box sx={{ height: '80%', overflow: 'auto' }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.75rem' }}>
                    {formatConfirmationInfo()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                    A Confirmé en ligne :
                  </Typography>
                  <Label 
                    variant="soft" 
                    color={participant.statut === 'En ligne' ? 'success' : 'error'}
                    sx={{ fontSize: '0.65rem', px: 1, py: 0.3 }}
                  >
                    {participant.statut === 'En ligne' ? 'OUI' : 'NON'}
                  </Label>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                    A Confirmé physique :
                  </Typography>
                  <Label 
                    variant="soft" 
                    color={participant.statut === 'Physique' ? 'success' : 'error'}
                    sx={{ fontSize: '0.65rem', px: 1, py: 0.3 }}
                  >
                    {participant.statut === 'Physique' ? 'OUI' : 'NON'}
                  </Label>
                </Box>

                {/* Signature (optionnelle pour activité) */}
                {participant.signature && (
                  <Box>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, fontSize: '0.75rem' }}>
                      Signature du participant
                    </Typography>
                    <Paper
                      elevation={0}
                      sx={{
                        border: '1px solid',
                        borderColor: 'grey.300',
                        p: 0.5,
                        height: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
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
            </Box>
          </Box>

          {/* Panneau droit */}
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {/* Section Informations personnelles */}
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, textAlign: 'center', fontWeight: 600, fontSize: '1.1rem' }}>
                Informations personnelles
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, textAlign: 'center', color: 'text.secondary', fontSize: '0.8rem' }}>
                Ces informations portent sur le Nom & prénom, Email, Téléphone
              </Typography>

              {/* Titre Détail */}
              <Box
                sx={{
                  bgcolor: 'grey.200',
                  p: 0.75,
                  mb: 1.5,
                  borderRadius: 0.5
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                  Détail
                </Typography>
              </Box>

              {/* Informations en grid */}
              <Box sx={{ bgcolor: 'background.paper', p: 1.5, border: '1px solid', borderColor: 'grey.300' }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 1.5, alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Nom</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>
                    {participant.nom}
                  </Typography>

                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Prénom</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>
                    {participant.prenom}
                  </Typography>

                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Email</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>
                    {participant.email}
                  </Typography>

                  <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Téléphone</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.8rem' }}>
                    {participant.telephone}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Divider />

            {/* Section Liste des activités */}
            <Box sx={{ p: 2 }}>
              {/* Titre Liste des activités */}
              <Box
                sx={{
                  bgcolor: 'grey.200',
                  p: 0.75,
                  mb: 1.5,
                  borderRadius: 0.5
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                  Liste des activités autorisées
                </Typography>
              </Box>

              {/* Tableau des activités */}
              <TableContainer 
                component={Paper} 
                elevation={0} 
                sx={{ 
                  border: '1px solid', 
                  borderColor: 'grey.300',
                  borderRadius: 0
                }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.100' }}>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', py: 0.75 }}>
                        Nom de l'activité
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', py: 0.75 }}>
                        Présence
                      </TableCell>
                      <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', py: 0.75 }}>
                        Date et Heure
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mockActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell sx={{ py: 0.75 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: activity.nom === participant.activiteActuelle ? 900 : 700, 
                              fontSize: '0.75rem',
                              color: activity.nom === participant.activiteActuelle ? 'primary.main' : 'inherit'
                            }}
                          >
                            {activity.nom}
                            {activity.nom === participant.activiteActuelle && ' (Actuelle)'}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ py: 0.75 }}>
                          <Label 
                            variant="soft" 
                            color={getPresenceColor(activity.presence)}
                            sx={{ fontSize: '0.65rem', px: 1, py: 0.3 }}
                          >
                            {activity.presence}
                          </Label>
                        </TableCell>
                        <TableCell sx={{ py: 0.75 }}>
                          <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.75rem' }}>
                            {activity.dateHeure}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}