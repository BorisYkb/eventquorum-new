//src/app/organisateur/gestionparticipant/gestionparticipant-home/components/ExportButtons.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Button,
  Stack,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';

/**
 * Type pour les options d'export
 */
type ExportOption = {
  value: string;
  label: string;
};

/**
 * Type pour les filtres actifs
 */
type ActiveFilters = {
  activityFilter: string;
  firstConnectionFilter: string;
  connectionTypeFilter: string;
};

/**
 * Options d'export pour la liste des invités
 * Format : Activité (Format)
 */
const EXPORT_INVITE_OPTIONS: ExportOption[] = [
  { value: 'tous-pdf', label: 'Tous (PDF)' },
  { value: 'tous-excel', label: 'Tous (Excel)' },
  { value: 'pdf-conference', label: 'Conférence principale (PDF)' },
  { value: 'excel-conference', label: 'Conférence principale (Excel)' },
  { value: 'pdf-workshop', label: 'Atelier pratique (PDF)' },
  { value: 'excel-workshop', label: 'Atelier pratique (Excel)' },
  { value: 'pdf-networking', label: 'Session networking (PDF)' },
  { value: 'excel-networking', label: 'Session networking (Excel)' },
  { value: 'pdf-cocktail', label: 'Cocktail de clôture (PDF)' },
  { value: 'excel-cocktail', label: 'Cocktail de clôture (Excel)' },
];

/**
 * Options d'export pour la liste de présence
 * Inclut les options pour le type de connexion (en ligne/présentiel/tout)
 */
const EXPORT_PRESENCE_OPTIONS: ExportOption[] = [
  // Tous
  { value: 'tous-tout-pdf', label: 'Tous (PDF)' },
  { value: 'tous-tout-excel', label: 'Tout (Excel)' },
  { value: 'en-ligne-excel', label: 'En ligne (Excel)' },
  { value: 'en-ligne-pdf', label: 'En ligne (PDF)' },
  { value: 'en-presentiel-pdf', label: 'En présentiel (PDF)' },
  { value: 'en-presentiel-excel', label: 'En présentiel (Excel)' },
];
/**
 * Options d'export pour la liste des participants
 */
const EXPORT_PARTICIPANTS_OPTIONS: ExportOption[] = [
  { value: 'tous-pdf', label: 'Tous les participants (PDF)' },
  { value: 'tous-excel', label: 'Tous les participants (Excel)' },
  { value: 'pdf-conference', label: 'Participants Conférence (PDF)' },
  { value: 'excel-conference', label: 'Participants Conférence (Excel)' },
  { value: 'pdf-workshop', label: 'Participants Atelier (PDF)' },
  { value: 'excel-workshop', label: 'Participants Atelier (Excel)' },
  { value: 'pdf-networking', label: 'Participants Networking (PDF)' },
  { value: 'excel-networking', label: 'Participants Networking (Excel)' },
  { value: 'pdf-cocktail', label: 'Participants Cocktail (PDF)' },
  { value: 'excel-cocktail', label: 'Participants Cocktail (Excel)' },
];

/**
 * Props du composant ExportButtons
 */
interface ExportButtonsProps {
  /** Onglet actuellement affiché ('invites' ou 'participants') */
  currentTab: string;
  /** Filtres actuellement actifs */
  activeFilters?: ActiveFilters;
}

/**
 * Composant ExportButtons
 * Boutons d'export pour les listes d'invités, présence et participants
 * Prend en compte les filtres actifs lors de l'export
 */
const ExportButtons: React.FC<ExportButtonsProps> = ({
  currentTab,
  activeFilters = {
    activityFilter: '',
    firstConnectionFilter: '',
    connectionTypeFilter: '',
  }
}) => {
  const router = useRouter();

  // États pour les menus déroulants
  const [inviteMenuAnchor, setInviteMenuAnchor] = useState<null | HTMLElement>(null);
  const [presenceMenuAnchor, setPresenceMenuAnchor] = useState<null | HTMLElement>(null);
  const [participantsMenuAnchor, setParticipantsMenuAnchor] = useState<null | HTMLElement>(null);

  /**
   * Ouvre le menu d'export des invités
   */
  const handleInviteMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setInviteMenuAnchor(event.currentTarget);
  };

  /**
   * Ferme le menu d'export des invités
   */
  const handleInviteMenuClose = () => {
    setInviteMenuAnchor(null);
  };

  /**
   * Ouvre le menu d'export de la liste de présence
   */
  const handlePresenceMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPresenceMenuAnchor(event.currentTarget);
  };

  /**
   * Ferme le menu d'export de la liste de présence
   */
  const handlePresenceMenuClose = () => {
    setPresenceMenuAnchor(null);
  };

  /**
   * Ouvre le menu d'export des participants
   */
  const handleParticipantsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setParticipantsMenuAnchor(event.currentTarget);
  };

  /**
   * Ferme le menu d'export des participants
   */
  const handleParticipantsMenuClose = () => {
    setParticipantsMenuAnchor(null);
  };

  /**
   * Gère l'export de la liste des invités
   * Prend en compte les filtres actifs
   */
  const handleExportInvites = (option: string) => {
    console.log('Export invités:', {
      option,
      filters: activeFilters,
    });

    // TODO: Implémenter l'appel API pour l'export avec les filtres
    // L'API devra recevoir les filtres actifs pour exporter uniquement
    // les données filtrées

    handleInviteMenuClose();
  };

  /**
   * Gère l'export de la liste de présence
   * Prend en compte les filtres actifs
   * Note : Liste de présence = invités qui ont émargé (emargement !== null)
   */
  const handleExportPresence = (option: string) => {
    console.log('Export présence:', {
      option,
      filters: activeFilters,
      note: 'Exporter uniquement les participants qui ont émargé',
    });

    // TODO: Implémenter l'appel API pour l'export avec les filtres
    // L'API devra :
    // 1. Filtrer par emargement !== null (liste de présence)
    // 2. Appliquer les autres filtres actifs (activité, 1ère connexion, type de connexion)
    // 3. Exporter au format demandé (PDF ou Excel)

    handlePresenceMenuClose();
  };

  /**
   * Gère l'export de la liste des participants
   * Prend en compte les filtres actifs
   */
  const handleExportParticipants = (option: string) => {
    console.log('Export participants:', {
      option,
      filters: activeFilters,
    });

    // TODO: Implémenter l'appel API pour l'export avec les filtres

    handleParticipantsMenuClose();
  };

  /**
   * Redirige vers la page de consultation des connectés
   */
  const handleConsultConnected = () => {
    // Redirection vers la page de consultation
    router.push('/organisateur/gestionparticipant/consultation');
  };

  return (
    <Stack
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      sx={{ mb: 2 }}
    >
      {/* Boutons adaptés selon l'onglet */}
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
                Consulter la liste des connectés
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