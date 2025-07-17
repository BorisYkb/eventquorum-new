'use client';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { DashboardContent } from 'src/layouts/operateur';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { QRScannerPopup } from 'src/app/operateur/components/qr-scanner-popup';
import { EmargementPopup } from 'src/app/operateur/components/emargement-popup';
import { SuccessPopup } from 'src/app/operateur/components/success-popup';
import { DetailPopup } from 'src/app/operateur/components/detail-popup';

// ----------------------------------------------------------------------

interface ParticipantData {
  id: string;
  nom: string;
  prenom: string;
  statut: 'En ligne' | 'En physique' | 'Aucun';
  dateEmargement: string;
  heureEmargement: string;
  peutEmarger: boolean; // true si peut être émargé, false si déjà émargé ou en ligne
  email: string;
  telephone: string;
}

// Mock data pour les participants
const PARTICIPANTS_DATA: ParticipantData[] = [
  {
    id: '1',
    nom: 'Boudou',
    prenom: 'Kouassi Evelet',
    statut: 'En physique',
    dateEmargement: '16/07/2024',
    heureEmargement: '19h51',
    peutEmarger: false,
    email: 'boudou.kouassi@gmail.com',
    telephone: '0703815849'
  },
  {
    id: '2',
    nom: 'Boudou',
    prenom: 'Kouassi Evelet',
    statut: 'Aucun',
    dateEmargement: '---',
    heureEmargement: '---',
    peutEmarger: true,
    email: 'boudoukoauacou000@gmail.com',
    telephone: '0703815849'
  },
  {
    id: '3',
    nom: 'Boudou',
    prenom: 'Kouassi Evelet',
    statut: 'En ligne',
    dateEmargement: '16/07/2024',
    heureEmargement: '19h51',
    peutEmarger: false,
    email: 'boudou.evelet@gmail.com',
    telephone: '0703815849'
  },
  {
    id: '4',
    nom: 'Boudou',
    prenom: 'Kouassi Evelet',
    statut: 'En physique',
    dateEmargement: '16/07/2024',
    heureEmargement: '19h51',
    peutEmarger: false,
    email: 'kouassi.boudou@gmail.com',
    telephone: '0703815849'
  },
  {
    id: '5',
    nom: 'Boudou',
    prenom: 'Kouassi Evelet',
    statut: 'Aucun',
    dateEmargement: '---',
    heureEmargement: '---',
    peutEmarger: true,
    email: 'evelet.boudou@gmail.com',
    telephone: '0703815849'
  },
  {
    id: '6',
    nom: 'Kouame',
    prenom: 'Marie Claire',
    statut: 'En ligne',
    dateEmargement: '16/07/2024',
    heureEmargement: '18h32',
    peutEmarger: false,
    email: 'marie.kouame@gmail.com',
    telephone: '0708123456'
  },
  {
    id: '7',
    nom: 'Yao',
    prenom: 'Jean Baptiste',
    statut: 'Aucun',
    dateEmargement: '---',
    heureEmargement: '---',
    peutEmarger: true,
    email: 'jean.yao@gmail.com',
    telephone: '0709876543'
  },
];

// ----------------------------------------------------------------------

export function OverviewOperateurView() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState(PARTICIPANTS_DATA);
  const [filterName, setFilterName] = useState('');
  const [affichage, setAffichage] = useState('tous'); // 'tous', 'emarges', 'non-emarges'
  const [scannerOpen, setScannerOpen] = useState(false);
  const [emargementOpen, setEmargementOpen] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState<ParticipantData | null>(null);
  const [successOpen, setSuccessOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleFilterName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
    setPage(0);
  }, []);

  const handleAffichageChange = useCallback((event: any) => {
    setAffichage(event.target.value);
    setPage(0);
  }, []);

  const handleEmarger = useCallback((participantId: string) => {
    const participant = tableData.find(p => p.id === participantId);
    if (participant && participant.peutEmarger) {
      setSelectedParticipant(participant);
      setEmargementOpen(true);
    }
  }, [tableData]);

  const handleEmargementClose = useCallback(() => {
    setEmargementOpen(false);
    setSelectedParticipant(null);
  }, []);

  const handleEmargementConfirm = useCallback((participantId: string, signature: string, boitierNumber: string) => {
    setTableData(prev => 
      prev.map(participant => 
        participant.id === participantId 
          ? { 
              ...participant, 
              statut: 'En physique' as const,
              dateEmargement: new Date().toLocaleDateString('fr-FR'),
              heureEmargement: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h'),
              peutEmarger: false
            }
          : participant
      )
    );
    
    // Ici vous pouvez aussi sauvegarder la signature et le numéro de boîtier
    console.log('Émargement confirmé:', {
      participantId,
      signature: signature.substring(0, 50) + '...', // Juste les premiers caractères pour le log
      boitierNumber
    });

    // Fermer le popup d'émargement et afficher le succès
    setEmargementOpen(false);
    setSelectedParticipant(null);
    setSuccessOpen(true);
  }, []);

  const handleSuccessClose = useCallback(() => {
    setSuccessOpen(false);
  }, []);

  const handleScanQR = useCallback(() => {
    setScannerOpen(true);
  }, []);

  const handleScannerClose = useCallback(() => {
    setScannerOpen(false);
  }, []);

  const handleQRScanSuccess = useCallback((qrData: string) => {
    console.log('QR Code scanné:', qrData);
    
    // Extraire l'ID du participant du QR code
    // Format attendu: "PARTICIPANT_123" ou directement l'ID
    const participantId = qrData.replace('PARTICIPANT_', '');
    
    // Chercher le participant correspondant
    const participant = tableData.find(p => p.id === participantId);
    
    if (participant) {
      if (participant.peutEmarger) {
        // Ouvrir le popup d'émargement pour ce participant
        setSelectedParticipant(participant);
        setEmargementOpen(true);
      } else {
        // Participant déjà émargé
        console.log('Participant déjà émargé');
        // Ici vous pourriez afficher une notification
      }
    } else {
      // Participant non trouvé
      console.log('Participant non trouvé dans la liste');
      // Ici vous pourriez afficher une notification d'erreur
    }
  }, [tableData]);

  const handleVoirDetail = useCallback((participantId: string) => {
    const participant = tableData.find(p => p.id === participantId);
    if (participant) {
      setSelectedParticipant(participant);
      setDetailOpen(true);
    }
  }, [tableData]);

  const handleDetailClose = useCallback(() => {
    setDetailOpen(false);
    setSelectedParticipant(null);
  }, []);

  // Filter data based on search and display filter
  const filteredData = tableData.filter((participant) => {
    const matchesSearch = `${participant.nom} ${participant.prenom}`.toLowerCase().includes(filterName.toLowerCase());
    
    if (affichage === 'emarges') {
      return matchesSearch && (participant.statut === 'En ligne' || participant.statut === 'En physique');
    }
    if (affichage === 'non-emarges') {
      return matchesSearch && participant.statut === 'Aucun';
    }
    return matchesSearch; // 'tous'
  });

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Calculer le nombre de participants émargés
  const participantsEmarges = tableData.filter(p => p.statut === 'En ligne' || p.statut === 'En physique').length;

  const renderHeader = () => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        Liste des participants
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Vous avez émargé {participantsEmarges} participants
      </Typography>
    </Box>
  );

  const renderTableToolbar = () => (
    <Box
      sx={{
        p: 2,
        gap: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        borderBottom: 1,
        borderColor: 'divider',
        minHeight: 80, // Hauteur fixe pour éviter l'instabilité
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 7.5,
        flexShrink: 1,
        minWidth: 0
      }}>
        <FormControl size="small" sx={{ minWidth: 80, maxWidth: 100 }}>
          <InputLabel sx={{ fontSize: '0.875rem' }}>Affichage</InputLabel>
          <Select
            value={rowsPerPage}
            label="Affichage"
            sx={{ fontSize: '0.875rem' }}
            onChange={handleChangeRowsPerPage}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 140, maxWidth: 180 }}>
          <InputLabel sx={{ fontSize: '0.875rem' }}>Filtre</InputLabel>
          <Select
            value={affichage}
            label="Filtre"
            sx={{ fontSize: '0.875rem' }}
            onChange={handleAffichageChange}
          >
            <MenuItem value="tous">Tous</MenuItem>
            <MenuItem value="emarges">Émargés</MenuItem>
            <MenuItem value="non-emarges">Non émargés</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 7.5,
        flexShrink: 0
      }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 0.3,
          width: 'auto'
        }}>
          <IconButton
            onClick={handleScanQR}
            color="primary"
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              width: 40,
              height: 40
            }}
          >
            <Iconify icon="eva:camera-fill" width={20} />
          </IconButton>
          <Typography 
            variant="caption" 
            color="text.secondary" 
            sx={{ 
              fontSize: '0.7rem',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              lineHeight: 1
            }}
          >
            Scanner QR
          </Typography>
        </Box>
        
        <TextField
          size="small"
          value={filterName}
          onChange={handleFilterName}
          placeholder="Recherche"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
          sx={{ 
            width: 180,
            '& .MuiInputBase-input': {
              fontSize: '0.875rem'
            }
          }}
        />
      </Box>
    </Box>
  );

  const renderTableHead = () => (
    <TableHead>
      <TableRow>
        <TableCell sx={{ width: 120 }}>Actions</TableCell>
        <TableCell>Nom Prénom</TableCell>
        <TableCell>Statut émargement</TableCell>
        <TableCell>Date et heure</TableCell>
        <TableCell align="center" sx={{ width: 80 }}>Détail</TableCell>
      </TableRow>
    </TableHead>
  );

  const renderTable = () => (
    <Card>
      {renderTableToolbar()}
      <TableContainer>
        <Scrollbar>
          <Table sx={{ minWidth: 750 }}>
            {renderTableHead()}
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => (
                  <ParticipantTableRow
                    key={row.id}
                    row={row}
                    onEmarger={() => handleEmarger(row.id)}
                    onVoirDetail={() => handleVoirDetail(row.id)}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    <Typography variant="body2" color="text.secondary">
                      Aucun participant trouvé
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
      />
    </Card>
  );

  return (
    <DashboardContent>
      {renderHeader()}
      {renderTable()}
      
      {/* Popup Scanner QR */}
      <QRScannerPopup
        open={scannerOpen}
        onClose={handleScannerClose}
        onScanSuccess={handleQRScanSuccess}
      />

      {/* Popup Émargement */}
      <EmargementPopup
        open={emargementOpen}
        participant={selectedParticipant}
        onClose={handleEmargementClose}
        onEmargement={handleEmargementConfirm}
      />

      {/* Popup Succès */}
      <SuccessPopup
        open={successOpen}
        onClose={handleSuccessClose}
        autoCloseDelay={2500}
      />

      {/* Popup Détail */}
      <DetailPopup
        open={detailOpen}
        participant={selectedParticipant}
        onClose={handleDetailClose}
      />
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

interface ParticipantTableRowProps {
  row: ParticipantData;
  onEmarger: () => void;
  onVoirDetail: () => void;
}

function ParticipantTableRow({ row, onEmarger, onVoirDetail }: ParticipantTableRowProps) {
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

  const formatDateTime = (date: string, heure: string) => {
    if (date === '---' || heure === '---') return '---';
    return `${date} à ${heure}`;
  };

  return (
    <TableRow hover>
      <TableCell>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={onEmarger}
          disabled={!row.peutEmarger}
          sx={{ 
            minWidth: 80,
            ...(row.peutEmarger ? {} : {
              bgcolor: 'grey.400',
              color: 'grey.600',
              '&:hover': {
                bgcolor: 'grey.400',
              }
            })
          }}
        >
          Émarger
        </Button>
      </TableCell>
      
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {row.nom} {row.prenom}
        </Typography>
      </TableCell>
      
      <TableCell>
        <Chip
          label={row.statut}
          color={getStatutColor(row.statut) as any}
          size="small"
          variant="soft"
        />
      </TableCell>
      
      <TableCell>
        <Typography variant="body2">
          {formatDateTime(row.dateEmargement, row.heureEmargement)}
        </Typography>
      </TableCell>
      
      <TableCell align="center">
        <Tooltip title="Voir détails">
          <IconButton size="small" color="primary" onClick={onVoirDetail}>
            <Iconify icon="eva:eye-fill" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}