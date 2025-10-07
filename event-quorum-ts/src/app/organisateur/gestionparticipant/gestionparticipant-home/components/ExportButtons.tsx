//src/app/organisateur/gestionparticipant/gestionparticipant-home/components/ExportButtons.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Button,
  Stack,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

// Types
type ExportOption = {
  value: string;
  label: string;
};

const EXPORT_INVITE_OPTIONS: ExportOption[] = [
  { value: 'tous', label: 'Tous (PDF)' },
  { value: 'tous', label: 'Tous (Excel)' },
  { value: 'pdf-conference', label: 'Conférence principale (PDF)' },
  { value: 'excel-conference', label: 'Conférence principale (Excel)' },
  { value: 'pdf-workshop', label: 'Atelier pratique (PDF)' },
  { value: 'excel-workshop', label: 'Atelier pratique (Excel)' },
  { value: 'pdf-networking', label: 'Session networking (PDF)' },
  { value: 'excel-networking', label: 'Session networking (Excel)' },
  { value: 'pdf-cocktail', label: 'Cocktail de clôture (PDF)' },
  { value: 'excel-cocktail', label: 'Cocktail de clôture (Excel)' },
];

const EXPORT_PRESENCE_OPTIONS: ExportOption[] = [
  { value: 'tous', label: 'Tous (PDF)' },
  { value: 'tous', label: 'Tous (Excel)' },
  { value: 'pdf-conference', label: 'Présence Conférence (PDF)' },
  { value: 'excel-conference', label: 'Présence Conférence (Excel)' },
  { value: 'pdf-workshop', label: 'Présence Atelier (PDF)' },
  { value: 'excel-workshop', label: 'Présence Atelier (Excel)' },
  { value: 'pdf-networking', label: 'Présence Networking (PDF)' },
  { value: 'excel-networking', label: 'Présence Networking (Excel)' },
  { value: 'pdf-cocktail', label: 'Présence Cocktail (PDF)' },
  { value: 'excel-cocktail', label: 'Présence Cocktail (Excel)' },
];

const EXPORT_PARTICIPANTS_OPTIONS: ExportOption[] = [
  { value: 'tous', label: 'Tous les participants (PDF)' },
  { value: 'tous', label: 'Tous les participants (Excel)' },
  { value: 'pdf-conference', label: 'Participants Conférence (PDF)' },
  { value: 'excel-conference', label: 'Participants Conférence (Excel)' },
  { value: 'pdf-workshop', label: 'Participants Atelier (PDF)' },
  { value: 'excel-workshop', label: 'Participants Atelier (Excel)' },
  { value: 'pdf-networking', label: 'Participants Networking (PDF)' },
  { value: 'excel-networking', label: 'Participants Networking (Excel)' },
  { value: 'pdf-cocktail', label: 'Participants Cocktail (PDF)' },
  { value: 'excel-cocktail', label: 'Participants Cocktail (Excel)' },
];

interface ExportButtonsProps {
  currentTab: string; // 'invites' ou 'participants'
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ currentTab }) => {
  const router = useRouter();
  const [inviteMenuAnchor, setInviteMenuAnchor] = useState<null | HTMLElement>(null);
  const [presenceMenuAnchor, setPresenceMenuAnchor] = useState<null | HTMLElement>(null);
  const [participantsMenuAnchor, setParticipantsMenuAnchor] = useState<null | HTMLElement>(null);

  const handleInviteMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setInviteMenuAnchor(event.currentTarget);
  };

  const handleInviteMenuClose = () => {
    setInviteMenuAnchor(null);
  };

  const handlePresenceMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPresenceMenuAnchor(event.currentTarget);
  };

  const handlePresenceMenuClose = () => {
    setPresenceMenuAnchor(null);
  };

  const handleParticipantsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setParticipantsMenuAnchor(event.currentTarget);
  };

  const handleParticipantsMenuClose = () => {
    setParticipantsMenuAnchor(null);
  };

  const handleExportInvites = (option: string) => {
    console.log('Export invités:', option);
    handleInviteMenuClose();
  };

  const handleExportPresence = (option: string) => {
    console.log('Export présence:', option);
    handlePresenceMenuClose();
  };

  const handleExportParticipants = (option: string) => {
    console.log('Export participants:', option);
    handleParticipantsMenuClose();
  };

  const handleConsultConnected = () => {
    router.push('/organisateur/gestionparticipant/consultation');
  };

  // Titre dynamique selon l'onglet
  const getTitle = () => {
    switch (currentTab) {
      case 'invites':
        return 'Liste des invités';
      case 'participants':
        return 'Liste des participants';
      default:
        return 'Liste des invités';
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 2 }}
    >
      {/* Titre à gauche - Dynamique */}
      {/* <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
        {getTitle()}
      </Typography> */}

      {/* Boutons à droite - Adaptatifs selon l'onglet */}
      <Stack direction="row" spacing={2}>
        {currentTab === 'invites' && (
          <>
            {/* Bouton Exporter liste des invités */}
            <Tooltip title="Exporter la liste des invités (PDF & Excel)" arrow>
              <Button
                variant="contained"
                onClick={handleInviteMenuOpen}
                endIcon={<ExpandMoreIcon />}
                sx={{
                  bgcolor: '#000',
                  color: 'white',
                  '&:hover': { bgcolor: '#333' },
                  borderRadius: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Exporter la liste des invités
              </Button>
            </Tooltip>
            <Menu
              anchorEl={inviteMenuAnchor}
              open={Boolean(inviteMenuAnchor)}
              onClose={handleInviteMenuClose}
              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
              {EXPORT_INVITE_OPTIONS.map((option, index) => (
                <MenuItem
                  key={`${option.value}-${index}`}
                  onClick={() => handleExportInvites(option.value)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>

            {/* Bouton Exporter liste de présence */}
            <Tooltip title="Exporter la liste de présence (PDF & Excel)" arrow>
              <Button
                variant="contained"
                onClick={handlePresenceMenuOpen}
                endIcon={<ExpandMoreIcon />}
                sx={{
                  bgcolor: '#000',
                  color: 'white',
                  '&:hover': { bgcolor: '#333' },
                  borderRadius: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Exporter la liste de présence
              </Button>
            </Tooltip>
            <Menu
              anchorEl={presenceMenuAnchor}
              open={Boolean(presenceMenuAnchor)}
              onClose={handlePresenceMenuClose}
              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
              {EXPORT_PRESENCE_OPTIONS.map((option, index) => (
                <MenuItem
                  key={`${option.value}-${index}`}
                  onClick={() => handleExportPresence(option.value)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>

            {/* Bouton Consulter connectés */}
            <Tooltip title="Consulter la liste des connectés" arrow>
              <Button
                variant="contained"
                onClick={handleConsultConnected}
                sx={{
                  bgcolor: '#000',
                  color: 'white',
                  '&:hover': { bgcolor: '#333' },
                  borderRadius: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Consulter
              </Button>
            </Tooltip>
          </>
        )}

        {currentTab === 'participants' && (
          <>
            {/* Bouton Exporter liste des participants */}
            <Tooltip title="Exporter la liste des participants par activité (PDF & Excel)" arrow>
              <Button
                variant="contained"
                onClick={handleParticipantsMenuOpen}
                endIcon={<ExpandMoreIcon />}
                sx={{
                  bgcolor: '#000',
                  color: 'white',
                  '&:hover': { bgcolor: '#333' },
                  borderRadius: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                Exporter la liste des participants
              </Button>
            </Tooltip>
            <Menu
              anchorEl={participantsMenuAnchor}
              open={Boolean(participantsMenuAnchor)}
              onClose={handleParticipantsMenuClose}
              transformOrigin={{ horizontal: 'left', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
              {EXPORT_PARTICIPANTS_OPTIONS.map((option, index) => (
                <MenuItem
                  key={`${option.value}-${index}`}
                  onClick={() => handleExportParticipants(option.value)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default ExportButtons;