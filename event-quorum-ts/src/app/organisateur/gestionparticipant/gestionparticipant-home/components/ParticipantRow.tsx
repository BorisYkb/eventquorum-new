'use client';

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
} from '@mui/material';
import {
  Edit as EditIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { paths } from 'src/routes/paths';
import { Icon } from '@iconify/react';

// Types
type Participant = {
  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  connecte: boolean;
  emargement: string | null; // URL de la signature ou null si pas signé
  activite: string;
};

type ParticipantRowProps = {
  participant: Participant;
  selected: boolean;
  onSelect: () => void;
  onEdit: (id: number) => void;
  onView: (id: number) => void;
  onDelete: (id: number) => void;
};

const ParticipantRow = ({
  participant,
  selected,
  onSelect,
  onEdit,
  onView,
  onDelete
}: ParticipantRowProps) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(paths.organisateur.gestionparticipant.edit(participant.id.toString()));
  };

  return (
  <TableRow selected={selected} hover>
    <TableCell padding="checkbox">
      <Checkbox checked={selected} onChange={onSelect} />
    </TableCell>
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
    <TableCell>{participant.telephone}</TableCell>
    <TableCell>{participant.email}</TableCell>
    <TableCell>
      <CircleIcon 
        sx={{ 
          fontSize: 12, 
          color: participant.connecte ? 'success.main' : 'error.main' 
        }} 
      />
    </TableCell>
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
            bgcolor: 'grey.50'
          }}
        >
          <img 
            src={participant.emargement} 
            alt="Signature" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />
        </Box>
      ) : (
        <Typography variant="body2" color="text.disabled" fontStyle="italic">
          Non signé
        </Typography>
      )}
    </TableCell>
    <TableCell>
      <Stack direction="row" spacing={1}>
        <Tooltip title="Voir les détails" arrow>
          <IconButton 
            size="small" 
            onClick={() => onView(participant.id)}
            sx={{ color: '#374151' }} // Tailwind gray-700
          >
            <ViewIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
          <Tooltip title="Modifier" arrow>
            <IconButton
              size="small"
              onClick={handleEdit}
              sx={{ color: '#00B8D9' }}
            >
              <Icon icon="solar:pen-new-square-linear" width={15} height={15} />
            </IconButton>
          </Tooltip>
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