'use client';

import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type MessageItem = {
  id: number;
  title: string;
  date: string;
  status: 'Envoyer' | 'Échec';
};

export type MessagesListProps = CardProps & {
  title?: string;
  subheader?: string;
  tableData: MessageItem[];
};

export function MessagesList({ title, subheader, tableData, ...other }: MessagesListProps) {
  const theme = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Envoyer':
        return 'success';
      case 'Échec':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Envoyer':
        return 'eva:checkmark-circle-2-fill';
      case 'Échec':
        return 'eva:close-circle-fill';
      default:
        return 'eva:radio-button-off-fill';
    }
  };

  return (
    <Card {...other}>
      <CardHeader 
        title={title} 
        subheader={subheader} 
        sx={{ pb: 3 }}
        action={
          <Chip 
            label={`${tableData.length} messages`}
            size="small"
            variant="soft"
            color="primary"
          />
        }
      />

      <TableContainer>
        <Scrollbar>
          <Table sx={{ minWidth: { xs: 500, md: 600 } }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: { xs: '50%', md: '45%' }, py: 1 }}>
                  <Typography variant="subtitle2">Message</Typography>
                </TableCell>
                <TableCell sx={{ width: { xs: '25%', md: '30%' }, py: 1 }} align="center">
                  <Typography variant="subtitle2">Date</Typography>
                </TableCell>
                <TableCell sx={{ width: { xs: '25%', md: '25%' }, py: 1 }} align="center">
                  <Typography variant="subtitle2">Statut</Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tableData.map((row) => (
                <TableRow 
                  key={row.id}
                  hover
                  sx={{
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  {/* Colonne Message */}
                  <TableCell sx={{ py: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1.5 } }}>
                      <Avatar
                        sx={{
                          width: { xs: 32, md: 40 },
                          height: { xs: 32, md: 40 },
                          backgroundColor: alpha(theme.palette.secondary.main, 0.12),
                          color: theme.palette.secondary.main,
                        }}
                      >
                        <Iconify icon="eva:email-fill" width={20} />
                      </Avatar>
                      
                      <Box sx={{ minWidth: 0, flex: 1 }}>
                        <Typography 
                          variant="subtitle2" 
                          noWrap
                          sx={{ 
                            mb: 0.5,
                            fontSize: { xs: '0.875rem', md: '1rem' }
                          }}
                        >
                          {row.title}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Colonne Date */}
                  <TableCell align="center" sx={{ py: 1.5, px: { xs: 0.5, md: 1 } }}>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary',
                        fontSize: { xs: '0.75rem', md: '0.875rem' }
                      }}
                    >
                      {row.date}
                    </Typography>
                  </TableCell>

                  {/* Colonne Statut */}
                  <TableCell align="center" sx={{ py: 1.5, px: { xs: 0.5, md: 1 } }}>
                    <Label 
                      variant="soft" 
                      color={getStatusColor(row.status)}
                      sx={{ 
                        minWidth: { xs: 60, md: 80 },
                        fontSize: { xs: '0.75rem', md: '0.875rem' },
                        px: { xs: 1, md: 1.5 }
                      }}
                    >
                      {row.status}
                    </Label>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      {/* Footer avec statistiques */}
      <Box 
        sx={{ 
          p: 2, 
          borderTop: `1px dashed ${alpha(theme.palette.grey[500], 0.32)}`,
          backgroundColor: alpha(theme.palette.grey[500], 0.04),
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1
        }}>
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                backgroundColor: theme.palette.success.main 
              }} />
              <Typography variant="caption">
                {tableData.filter(item => item.status === 'Envoyer').length} Envoyés
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ 
                width: 8, 
                height: 8, 
                borderRadius: '50%', 
                backgroundColor: theme.palette.error.main 
              }} />
              <Typography variant="caption">
                {tableData.filter(item => item.status === 'Échec').length} Échecs
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}