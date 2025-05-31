// src/sections/survey/survey-table-row.tsx

import { ISurveyItem } from 'src/types/survey';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  row: ISurveyItem;
  onViewDetails: () => void;
};

export function SurveyTableRow({ row, onViewDetails }: Props) {
  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'En cours':
        return 'success';
      case 'Non démarré':
        return 'warning';
      case 'Terminé':
        return 'error';
      default:
        return 'default';
    }
  };

  const getParticipationColor = (statut: string) => {
    switch (statut) {
      case 'Participer':
        return 'info';
      case 'Non participer':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <TableRow hover>
      <TableCell>{row.titre_enquete}</TableCell>
      <TableCell>{row.date}</TableCell>
      <TableCell>{row.date_expiration}</TableCell>
      <TableCell>
        <Chip
          label={row.statut}
          color={getStatusColor(row.statut)}
          size="small"
          sx={{ fontWeight: 500 }}
        />
      </TableCell>
      <TableCell>
        <Chip
          label={row.statut_participation}
          color={getParticipationColor(row.statut_participation)}
          size="small"
          sx={{ fontWeight: 500 }}
        />
      </TableCell>
      <TableCell>{row.note}</TableCell>
      <TableCell align="center">
        <IconButton onClick={onViewDetails} color="primary">
          <Iconify icon="solar:eye-bold" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}