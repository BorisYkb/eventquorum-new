'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import CardHeader from '@mui/material/CardHeader';

import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom, TableHeadCellProps } from 'src/components/table';

import type { CardProps } from '@mui/material';

// ==============================
// Types
// ==============================

type ParticipantRow = {
  name: string;
  email: string;
  telephone: string;
  date: string;
  statut: string;
};

type Props = CardProps & {
  title?: string;
  subheader?: string;
  headCells: TableHeadCellProps[];
  tableData: ParticipantRow[];
};

// ==============================
// Composant principal
// ==============================

export function ParticipantsList({ title, subheader, tableData, headCells, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />
      <Scrollbar>
        <Table>
          <TableHeadCustom headCells={headCells} />
          <TableBody>
            {tableData.map((row, index) => (
              <ParticipantRowItem key={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
}

// ==============================
// Lignes du tableau
// ==============================

type RowItemProps = {
  row: ParticipantRow;
};

function ParticipantRowItem({ row }: RowItemProps) {
  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'Acceptée':
        return 'success';
      case 'Rejetée':
        return 'error';
      case 'En attente':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <TableRow>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>{row.telephone}</TableCell>
      <TableCell>{row.date}</TableCell>
      <TableCell>
        <Label variant="soft" color={getStatusColor(row.statut)}>
          {row.statut}
        </Label>
      </TableCell>
    </TableRow>
  );
}
