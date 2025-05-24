import type { CardProps } from '@mui/material/Card';
import type { TableHeadCustomProps } from 'src/components/table';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import Link from '@mui/material/Link';
import Checkbox from '@mui/material/Checkbox';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

// ----------------------------------------------------------------------

type ActivityData = {
  name: string;
  link: string;
  status: 'Terminé' | 'En cours' | 'Non démarrer';
  hasVideo: boolean;
  hasDocument: boolean;
};

export type ActivitiesListProps = CardProps & {
  title?: string;
  subheader?: string;
  tableData: ActivityData[];
  headCells: TableHeadCustomProps['headCells'];
};

export function ActivitiesList({ title, subheader, tableData, headCells, ...other }: ActivitiesListProps) {
  const getStatusColor = (status: ActivityData['status']) => {
    switch (status) {
      case 'Terminé':
        return 'error';
      case 'En cours':
        return 'success';
      case 'Non démarrer':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <>
      <Card {...other}>
        <CardHeader title={title} subheader={subheader} sx={{ pb: 3 }} />

        <TableContainer sx={{ overflow: 'unset' }}>
          <Scrollbar sx={{ minWidth: 720 }}>
            <Table sx={{ minWidth: 720 }}>
              <TableHeadCustom headCells={headCells} />

              <TableBody>
                {tableData.map((row, index) => (
                  <ActivityTableRow key={index} row={row} />
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            size="small"
            color="inherit"
            endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
          >
            Voir tout
          </Button>
        </Box>
      </Card>
    </>
  );
}

// ----------------------------------------------------------------------

type ActivityTableRowProps = {
  row: ActivityData;
};

function ActivityTableRow({ row }: ActivityTableRowProps) {
  const getStatusColor = (status: ActivityData['status']) => {
    switch (status) {
      case 'Terminé':
        return 'error';
      case 'En cours':
        return 'success';
      case 'Non démarrer':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Checkbox 
            size="small"
            defaultChecked
            sx={{ color: 'success.main' }}
          />
          
          {row.link && (
            <Link 
              href={row.link} 
              target="_blank" 
              rel="noopener noreferrer"
              sx={{ color: 'primary.main', textDecoration: 'none' }}
            >
              {row.link}
            </Link>
          )}
          
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <Checkbox 
              size="small"
              checked={row.hasVideo}
              sx={{ color: 'text.secondary' }}
            />
            
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <Iconify icon="eva:play-circle-fill" />
            </IconButton>
            
            <Checkbox 
              size="small"
              checked={row.hasVideo}
              sx={{ color: 'success.main' }}
            />
            
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <Iconify icon="eva:file-text-fill" />
            </IconButton>
          </Box>
        </Box>
        
        <Box sx={{ ml: 2 }}>
          <Box component="span" sx={{ typography: 'body2', fontWeight: 'fontWeightMedium' }}>
            {row.name}
          </Box>
        </Box>
      </TableCell>

      <TableCell align="right">
        <Label variant="soft" color={getStatusColor(row.status)}>
          {row.status}
        </Label>
      </TableCell>
    </TableRow>
  );
}