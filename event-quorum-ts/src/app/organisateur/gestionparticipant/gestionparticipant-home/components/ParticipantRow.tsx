'use client';

import { Icon } from '@iconify/react';

import {
  TableRow,
  TableCell,
  Checkbox,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Box,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  Circle as CircleIcon,
  CheckBox as CheckBoxIcon,
  CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
  Block as BlockIcon,
} from '@mui/icons-material';

/**
 * Type représentant un participant
 */
type Participant = {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  connecte: boolean; // Première connexion effectuée
  emargement: string | null; // URL de la signature ou null
  activite: string;
  typeConnexion: 'en ligne' | 'en présentiel';
  checking?: boolean; // Confirme sa présence dans la salle (uniquement pour présentiel)
};

/**
 * Props du composant ParticipantRow
 */
type ParticipantRowProps = {
  /** Données du participant */
  participant: Participant;
  /** Indique si la ligne est sélectionnée */
  selected: boolean;
  /** Callback pour sélectionner/désélectionner la ligne */
  onSelect: () => void;
  /** Callback pour modifier le participant */
  onEdit: (id: number) => void;
  /** Callback pour voir les détails du participant */
  onView: (id: number) => void;
  /** Callback pour supprimer le participant */
  onDelete: (id: number) => void;
  /** Indique si la colonne checking doit être affichée */
  showCheckingColumn?: boolean;
};

/**
 * Composant ParticipantRow
 * Représente une ligne du tableau des participants
 */
const ParticipantRow = ({
  participant,
  selected,
  onSelect,
  onEdit,
  onView,
  onDelete,
  showCheckingColumn = false,
}: ParticipantRowProps) => {
  /**
   * Gère la redirection vers la page d'édition
   */
  const handleEdit = () => {
    onEdit(participant.id);
  };

  /**
   * Gère la redirection vers la page de détails
   */
  const handleView = () => {
    onView(participant.id);
  };

  /**
   * Détermine l'icône de checking à afficher
   */
  const renderCheckingIcon = () => {
    // Si participant en ligne : icône "non applicable" (rond avec barre)
    if (participant.typeConnexion === 'en ligne') {
      return (
        <Tooltip title="Non applicable (participant en ligne)" arrow>
          <BlockIcon
            sx={{
              fontSize: 24,
              color: 'error.main',
            }}
          />
        </Tooltip>
      );
    }

    // Si participant en présentiel mais n'a pas émargé : carré vide gris
    if (!participant.emargement) {
      return (
        <Tooltip title="Non émargé - Pas encore dans la salle" arrow>
          <CheckBoxOutlineBlankIcon
            sx={{
              fontSize: 24,
              color: 'grey.400',
            }}
          />
        </Tooltip>
      );
    }

    // Si participant en présentiel, a émargé et a fait le checking
    if (participant.checking) {
      return (
        <Tooltip title="Présent dans la salle (confirmé)" arrow>
          <CheckBoxIcon
            sx={{
              fontSize: 24,
              color: 'success.main',
            }}
          />
        </Tooltip>
      );
    }

    // Si participant en présentiel, a émargé mais n'a pas fait le checking
    return (
      <Tooltip title="Émargé mais pas encore dans la salle" arrow>
        <CheckBoxOutlineBlankIcon
          sx={{
            fontSize: 24,
            color: 'grey.400',
          }}
        />
      </Tooltip>
    );
  };

  return (
    <TableRow selected={selected} hover>
      {/* Case à cocher pour la sélection */}
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onChange={onSelect} />
      </TableCell>

      {/* Nom & Prénoms avec avatar */}
      <TableCell>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 32, height: 32 }}>
            {participant.prenom.charAt(0)}
          </Avatar>
          <Typography variant="subtitle2">
            {participant.nom} {participant.prenom}
          </Typography>
        </Stack>
      </TableCell>

      {/* Téléphone */}
      <TableCell>{participant.telephone}</TableCell>

      {/* Email */}
      <TableCell>{participant.email}</TableCell>

      {/* Participation (Type de connexion) */}
      <TableCell>
        <Chip
          label={participant.typeConnexion}
          size="small"
          sx={{
            backgroundColor:
              participant.typeConnexion === 'en ligne'
                ? 'rgba(0, 184, 217, 0.1)'
                : 'rgba(255, 171, 0, 0.1)',
            color:
              participant.typeConnexion === 'en ligne'
                ? '#00B8D9'
                : '#FFAB00',
            fontWeight: 600,
            textTransform: 'capitalize',
          }}
        />
      </TableCell>

      {/* 1ère Connexion (indicateur visuel) */}
      <TableCell>
        <Tooltip
          title={
            participant.connecte
              ? '1ère connexion effectuée'
              : '1ère connexion non effectuée'
          }
          arrow
        >
          <CircleIcon
            sx={{
              fontSize: 12,
              color: participant.connecte ? 'success.main' : 'error.main',
            }}
          />
        </Tooltip>
      </TableCell>

      {/* Émargement (signature) */}
      <TableCell>
        {participant.emargement ? (
          <Box
            sx={{
              width: 80,
              height: 40,
              border: 1,
              borderColor: 'divider',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.50',
            }}
          >
            <img
              src={participant.emargement}
              alt="Signature"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
        ) : (
          <Typography variant="body2" color="text.disabled" fontStyle="italic">
            Non signé
          </Typography>
        )}
      </TableCell>

      {/* Checking (visible uniquement si showCheckingColumn est true) */}
      {showCheckingColumn && (
        <TableCell align="center">
          {renderCheckingIcon()}
        </TableCell>
      )}

      {/* Actions */}
      <TableCell>
        <Stack direction="row" spacing={1}>
          {/* Bouton Voir */}
          <Tooltip title="Voir les détails" arrow>
            <IconButton
              size="small"
              onClick={handleView}
              sx={{ color: '#374151' }}
            >
              <ViewIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>

          {/* Bouton Modifier */}
          <Tooltip title="Modifier" arrow>
            <IconButton
              size="small"
              onClick={handleEdit}
              sx={{ color: '#00B8D9' }}
            >
              <Icon icon="solar:pen-new-square-linear" width={15} height={15} />
            </IconButton>
          </Tooltip>

          {/* Bouton Supprimer */}
          <Tooltip title="Supprimer" arrow>
            <IconButton
              size="small"
              onClick={() => onDelete(participant.id)}
              sx={{ color: 'error.main' }}
            >
              <DeleteIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default ParticipantRow;