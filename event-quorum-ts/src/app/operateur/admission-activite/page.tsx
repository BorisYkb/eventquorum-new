
// src/app/operateur/admissionactivite/page.tsx

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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { DashboardContent } from 'src/layouts/operateur';
import type { SelectChangeEvent } from '@mui/material/Select';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { Label } from 'src/components/label';
import {
  ConfirmationActivitePopup,
  PresenceConfirmeePopup,
  QRScannerActivitePopup,
  DetailActivitePopup,
  type ParticipantActiviteInfo,
  type ParticipantActiviteDetailData
} from './components';

// ----------------------------------------------------------------------

interface ParticipantActiviteData {
  id: string;
  nom: string;
  prenom: string;
  statutEmargement: 'Aucun' | 'Physique' | 'En ligne';
  dateHeure: string;
  peutConfirmer: boolean;
  email?: string;
  telephone?: string;
}

// Mock data pour les participants d'activité
// ...existing code...
const PARTICIPANTS_ACTIVITE_DATA: ParticipantActiviteData[] = [
  {
    id: '1',
    nom: 'Koffi',
    prenom: 'grah',
    statutEmargement: 'Aucun',
    dateHeure: '------',
    peutConfirmer: true,
    email: 'koffi.grah@gmail.com',
    telephone: '0703815849'
  },
  {
    id: '2',
    nom: 'Ouattara',
    prenom: 'Ali',
    statutEmargement: 'Physique',
    dateHeure: '16/07/2024 à 15h51',
    peutConfirmer: false,
    email: 'ouattara.ali@gmail.com',
    telephone: '0703815850'
  },
  {
    id: '3',
    nom: 'Boudou',
    prenom: 'kouacou',
    statutEmargement: 'Aucun',
    dateHeure: '------',
    peutConfirmer: true,
    email: 'boudou.kouacou@gmail.com',
    telephone: '0703815851'
  },
  {
    id: '4',
    nom: 'Kouame',
    prenom: 'Jean ives',
    statutEmargement: 'Aucun',
    dateHeure: '------',
    peutConfirmer: true,
    email: 'kouame.jeanives@gmail.com',
    telephone: '0703815852'
  },
  {
    id: '5',
    nom: 'Sidibe',
    prenom: 'koffi',
    statutEmargement: 'En ligne',
    dateHeure: '16/07/2024 à 15h51',
    peutConfirmer: false,
    email: 'sidibe.koffi@gmail.com',
    telephone: '0703815853'
  },
  {
    id: '6',
    nom: 'Popo',
    prenom: 'Couleur',
    statutEmargement: 'Physique',
    dateHeure: '16/07/2024 à 15h51',
    peutConfirmer: false,
    email: 'popo.couleur@gmail.com',
    telephone: '0703815854'
  },
  // --- 10 nouveaux participants ---
  {
    id: '7',
    nom: 'Traoré',
    prenom: 'Fatou',
    statutEmargement: 'Aucun',
    dateHeure: '------',
    peutConfirmer: true,
    email: 'traore.fatou@gmail.com',
    telephone: '0703815855'
  },
  {
    id: '8',
    nom: 'Koné',
    prenom: 'Moussa',
    statutEmargement: 'Aucun',
    dateHeure: '------',
    peutConfirmer: true,
    email: 'kone.moussa@gmail.com',
    telephone: '0703815856'
  },
  {
    id: '9',
    nom: 'Yao',
    prenom: 'Awa',
    statutEmargement: 'Physique',
    dateHeure: '17/07/2024 à 09h15',
    peutConfirmer: false,
    email: 'yao.awa@gmail.com',
    telephone: '0703815857'
  },
  {
    id: '10',
    nom: 'Coulibaly',
    prenom: 'Issa',
    statutEmargement: 'Aucun',
    dateHeure: '------',
    peutConfirmer: true,
    email: 'coulibaly.issa@gmail.com',
    telephone: '0703815858'
  },
  {
    id: '11',
    nom: 'Kouassi',
    prenom: 'Brigitte',
    statutEmargement: 'En ligne',
    dateHeure: '17/07/2024 à 10h05',
    peutConfirmer: false,
    email: 'kouassi.brigitte@gmail.com',
    telephone: '0703815859'
  },
  {
    id: '12',
    nom: 'Zoungrana',
    prenom: 'Paul',
    statutEmargement: 'Aucun',
    dateHeure: '------',
    peutConfirmer: true,
    email: 'zoungrana.paul@gmail.com',
    telephone: '0703815860'
  },
  {
    id: '13',
    nom: 'N\'Guessan',
    prenom: 'Marie',
    statutEmargement: 'Aucun',
    dateHeure: '------',
    peutConfirmer: true,
    email: 'nguessan.marie@gmail.com',
    telephone: '0703815861'
  },
  {
    id: '14',
    nom: 'Bakayoko',
    prenom: 'Adama',
    statutEmargement: 'Physique',
    dateHeure: '17/07/2024 à 11h20',
    peutConfirmer: false,
    email: 'bakayoko.adama@gmail.com',
    telephone: '0703815862'
  },
  {
    id: '15',
    nom: 'Toure',
    prenom: 'Salimata',
    statutEmargement: 'Aucun',
    dateHeure: '------',
    peutConfirmer: true,
    email: 'toure.salimata@gmail.com',
    telephone: '0703815863'
  },
  {
    id: '16',
    nom: 'Diarra',
    prenom: 'Mamadou',
    statutEmargement: 'En ligne',
    dateHeure: '17/07/2024 à 12h00',
    peutConfirmer: false,
    email: 'diarra.mamadou@gmail.com',
    telephone: '0703815864'
  }
];

const ACTIVITES_LIST = [
  'Activité 1',
  'Activité 2',
  'Activité 3',
  'Activité 4'
];

// ----------------------------------------------------------------------

export default function AdmissionActivitePage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState(PARTICIPANTS_ACTIVITE_DATA);
  const [filterName, setFilterName] = useState('');
  const [affichage, setAffichage] = useState('tous');
  const [selectedActivite, setSelectedActivite] = useState('Activité 1');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [presenceConfirmeeOpen, setPresenceConfirmeeOpen] = useState(false);
  const [scannerActiviteOpen, setScannerActiviteOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedParticipantActivite, setSelectedParticipantActivite] = useState<ParticipantActiviteInfo | null>(null);
  const [selectedParticipantDetail, setSelectedParticipantDetail] = useState<ParticipantActiviteDetailData | null>(null);

  const handleConfirmer = useCallback((participantId: string) => {
    const participant = tableData.find(p => p.id === participantId);
    if (participant && participant.peutConfirmer) {
      setSelectedParticipantActivite({
        id: participant.id,
        nom: participant.nom,
        prenom: participant.prenom,
        activiteNom: selectedActivite,
        email: participant.email || `${participant.nom.toLowerCase()}.${participant.prenom.toLowerCase()}@gmail.com`,
        telephone: participant.telephone || '0703815849'
      });
      setConfirmationOpen(true);
    }
  }, [tableData, selectedActivite]);

  const handleConfirmationClose = useCallback(() => {
    setConfirmationOpen(false);
    setSelectedParticipantActivite(null);
  }, []);

  const handleConfirmationSuccess = useCallback((participantId: string) => {
    // Mettre à jour le statut du participant
    setTableData(prev =>
      prev.map(participant =>
        participant.id === participantId
          ? {
            ...participant,
            statutEmargement: 'Physique' as const,
            dateHeure: new Date().toLocaleDateString('fr-FR') + ' à ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h'),
            peutConfirmer: false
          }
          : participant
      )
    );

    // Fermer confirmation et ouvrir succès
    setConfirmationOpen(false);
    setSelectedParticipantActivite(null);
    setPresenceConfirmeeOpen(true);
  }, []);

  const handleScanQR = useCallback(() => {
    setScannerActiviteOpen(true);
  }, []);

  const handleQRScanSuccess = useCallback((qrData: string) => {
    // Extraire l'ID du participant du QR code
    const participantId = qrData.replace('PARTICIPANT_', '');

    // Chercher le participant correspondant
    const participant = tableData.find(p => p.id === participantId);

    if (participant && participant.peutConfirmer) {
      setSelectedParticipantActivite({
        id: participant.id,
        nom: participant.nom,
        prenom: participant.prenom,
        activiteNom: selectedActivite,
        email: participant.email || `${participant.nom.toLowerCase()}.${participant.prenom.toLowerCase()}@gmail.com`,
        telephone: participant.telephone || '0703815849'
      });
      setConfirmationOpen(true);
    } else if (participant && !participant.peutConfirmer) {
      console.log('Participant déjà confirmé pour cette activité');
    } else {
      console.log('Participant non inscrit à cette activité');
    }
  }, [tableData, selectedActivite]);

  const handleVoirDetail = useCallback((participantId: string) => {
    const participant = tableData.find(p => p.id === participantId);
    if (participant) {
      setSelectedParticipantDetail({
        id: participant.id,
        nom: participant.nom,
        prenom: participant.prenom,
        email: participant.email || `${participant.nom.toLowerCase()}.${participant.prenom.toLowerCase()}@gmail.com`,
        telephone: participant.telephone || '0703815849',
        statut: participant.statutEmargement,
        dateConfirmation: participant.dateHeure.includes('à') ? participant.dateHeure.split(' à ')[0] : '---',
        heureConfirmation: participant.dateHeure.includes('à') ? participant.dateHeure.split(' à ')[1] : '---',
        activiteActuelle: selectedActivite
      });
      setDetailOpen(true);
    }
  }, [tableData, selectedActivite]);

  const handleDetailClose = useCallback(() => {
    setDetailOpen(false);
    setSelectedParticipantDetail(null);
  }, []);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);



  const handleChangeRowsPerPage = useCallback((event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    setRowsPerPage(value);
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

  const handleActiviteChange = useCallback((event: any) => {
    setSelectedActivite(event.target.value);
    setPage(0);
  }, []);

  // Filter data based on search and display filter
  const filteredData = tableData.filter((participant) => {
    const matchesSearch = `${participant.nom} ${participant.prenom}`.toLowerCase().includes(filterName.toLowerCase());

    if (affichage === 'confirmes') {
      return matchesSearch && (participant.statutEmargement === 'En ligne' || participant.statutEmargement === 'Physique');
    }
    if (affichage === 'non-confirmes') {
      return matchesSearch && participant.statutEmargement === 'Aucun';
    }
    return matchesSearch;
  });

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Calculer le nombre de participants confirmés
  const participantsConfirmes = tableData.filter(p => p.statutEmargement === 'En ligne' || p.statutEmargement === 'Physique').length;

  const renderHeader = () => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
        Liste des activités
      </Typography>
    </Box>
  );

  const renderTableToolbar = () => (
    <Box
      sx={{
        p: { xs: 1.5, md: 2 },
        gap: { xs: 1, md: 1.5 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        borderBottom: 1,
        borderColor: 'divider',
        minHeight: { xs: 60, md: 70 },
      }}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, md: 1.5, lg: 7.5 },
        flexShrink: 1,
        minWidth: 0
      }}>
        <FormControl size="small" sx={{ minWidth: { xs: 70, md: 80 }, maxWidth: { xs: 80, md: 90 } }}>
          <InputLabel sx={{ fontSize: { xs: '0.75rem', md: '0.8rem' } }}>Affichage</InputLabel>
          <Select
            value={rowsPerPage}
            label="Affichage"
            sx={{ fontSize: { xs: '0.75rem', md: '0.8rem' } }}
            onChange={handleChangeRowsPerPage}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: { xs: 100, md: 130 }, maxWidth: { xs: 150, md: 180 } }}>
          <InputLabel sx={{ fontSize: { xs: '0.75rem', md: '0.8rem' } }}>Filtre</InputLabel>
          <Select
            value={affichage}
            label="Filtre"
            sx={{ fontSize: { xs: '0.70rem', md: '0.75rem' } }}
            onChange={handleAffichageChange}
          >
            <MenuItem value="tous">Tous</MenuItem>
            <MenuItem value="confirmes">Confirmés</MenuItem>
            <MenuItem value="non-confirmes">Non confirmés</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: { xs: 100, md: 120 }, maxWidth: { xs: 130, md: 150 } }}>
          <InputLabel sx={{ fontSize: { xs: '0.75rem', md: '0.8rem' } }}>Activité</InputLabel>
          <Select
            value={selectedActivite}
            label="Activité"
            sx={{ fontSize: { xs: '0.7rem', md: '0.75rem' } }}
            onChange={handleActiviteChange}
          >
            {ACTIVITES_LIST.map((activite) => (
              <MenuItem key={activite} value={activite}>
                {activite}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, md: 1.5, lg: 7.5 },
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
              width: { xs: 36, md: 40 },
              height: { xs: 36, md: 40 }
            }}
          >
            <Iconify icon="eva:camera-fill" width={20} />
          </IconButton>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.65rem', md: '0.7rem' },
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
            width: { xs: 140, sm: 160, md: 180 },
            '& .MuiInputBase-input': {
              fontSize: { xs: '0.75rem', md: '0.8rem' }
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
        <TableCell>Nom/Prénom</TableCell>
        <TableCell>Statut émargement</TableCell>
        <TableCell>Date/Heure</TableCell>
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
                  <ParticipantActiviteTableRow
                    key={row.id}
                    row={row}
                    onConfirmer={() => handleConfirmer(row.id)}
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
        // onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
      />
    </Card>
  );

  return (
    <DashboardContent>
      {renderHeader()}
      {renderTable()}
      {/* Popup Confirmation Activité */}
      <ConfirmationActivitePopup
        open={confirmationOpen}
        participant={selectedParticipantActivite}
        onClose={handleConfirmationClose}
        onConfirmation={handleConfirmationSuccess}
      />

      {/* Popup Présence Confirmée */}
      <PresenceConfirmeePopup
        open={presenceConfirmeeOpen}
        onClose={() => setPresenceConfirmeeOpen(false)}
        autoCloseDelay={3000}
      />

      {/* Popup Scanner QR Activité */}
      <QRScannerActivitePopup
        open={scannerActiviteOpen}
        onClose={() => setScannerActiviteOpen(false)}
        onScanSuccess={handleQRScanSuccess}
        activiteSelectionnee={selectedActivite}
      />

      {/* Popup Détail */}
      <DetailActivitePopup
        open={detailOpen}
        participant={selectedParticipantDetail}
        onClose={handleDetailClose}
      />
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------

interface ParticipantActiviteTableRowProps {
  row: ParticipantActiviteData;
  onConfirmer: () => void;
  onVoirDetail: () => void;
}

function ParticipantActiviteTableRow({ row, onConfirmer, onVoirDetail }: ParticipantActiviteTableRowProps) {
  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'En ligne':
        return 'info';
      case 'Physique':
        return 'success';
      case 'Aucun':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <TableRow hover>
      <TableCell>
        <Button
          variant="contained"
          color="inherit"
          size="small"
          onClick={onConfirmer}
          disabled={!row.peutConfirmer}
          sx={{
            minWidth: 80,
            ...(row.peutConfirmer ? {} : {
              bgcolor: 'grey.400',
              color: 'grey.600',
              '&:hover': {
                bgcolor: 'grey.400',
              }
            })
          }}
        >
          Confirmer
        </Button>
      </TableCell>

      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {row.nom} {row.prenom}
        </Typography>
      </TableCell>

      <TableCell>
        <Label
          color={getStatutColor(row.statutEmargement) as any}
          variant="soft"
        >
          {row.statutEmargement}
        </Label>
      </TableCell>

      <TableCell>
        <Typography variant="body2">
          {row.dateHeure}
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