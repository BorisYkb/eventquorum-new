'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  Container,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Button,
} from '@mui/material';

// Import des composants
import ExportButtons from './components/ExportButtons';
import TableToolbar from './components/TableToolbar';
import ParticipantRow from './components/ParticipantRow';
import NavigationButtons from './components/NavigationButtons';
import PaginationControls from './components/PaginationControls';

// Import des types
import { Participant } from './components/types';

// Composant principal
const ParticipantManagementPage = () => {
  const [selectedParticipants, setSelectedParticipants] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activityFilter, setActivityFilter] = useState('');
  const [signatureEnabled, setSignatureEnabled] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Données d'exemple avec activités
  const participants: Participant[] = [
    {
      id: 1,
      nom: 'Koffi',
      prenom: 'Emmanuel',
      telephone: '0101010101',
      email: 'koffi@gmail.com',
      connecte: true,
      emargement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', // Exemple d'URL de signature
      activite: 'conference',
    },
    {
      id: 2,
      nom: 'Kouassi',
      prenom: 'Marie',
      telephone: '0202020202',
      email: 'marie@gmail.com',
      connecte: false,
      emargement: null, // Pas encore signé
      activite: 'workshop',
    },
    {
      id: 3,
      nom: 'Ouattara',
      prenom: 'Jean',
      telephone: '0303030303',
      email: 'jean@gmail.com',
      connecte: true,
      emargement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', // Exemple d'URL de signature
      activite: 'networking',
    },
    {
      id: 4,
      nom: 'Traore',
      prenom: 'Fatou',
      telephone: '0404040404',
      email: 'fatou@gmail.com',
      connecte: true,
      emargement: null, // Pas encore signé
      activite: 'cocktail',
    },
    {
      id: 5,
      nom: 'Bamba',
      prenom: 'Sekou',
      telephone: '0505050505',
      email: 'sekou@gmail.com',
      connecte: false,
      emargement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', // Exemple d'URL de signature
      activite: 'conference',
    },
    {
      id: 1,
      nom: 'Koffi',
      prenom: 'Emmanuel',
      telephone: '0101010101',
      email: 'koffi@gmail.com',
      connecte: true,
      emargement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', // Exemple d'URL de signature
      activite: 'conference',
    },
    {
      id: 2,
      nom: 'Kouassi',
      prenom: 'Marie',
      telephone: '0202020202',
      email: 'marie@gmail.com',
      connecte: false,
      emargement: null, // Pas encore signé
      activite: 'workshop',
    },
    {
      id: 3,
      nom: 'Ouattara',
      prenom: 'Jean',
      telephone: '0303030303',
      email: 'jean@gmail.com',
      connecte: true,
      emargement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', // Exemple d'URL de signature
      activite: 'networking',
    },
    {
      id: 4,
      nom: 'Traore',
      prenom: 'Fatou',
      telephone: '0404040404',
      email: 'fatou@gmail.com',
      connecte: true,
      emargement: null, // Pas encore signé
      activite: 'cocktail',
    },
    {
      id: 5,
      nom: 'Bamba',
      prenom: 'Sekou',
      telephone: '0505050505',
      email: 'sekou@gmail.com',
      connecte: false,
      emargement: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', // Exemple d'URL de signature
      activite: 'conference',
    },
  ];

  // Filtrage des participants
  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = 
      participant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesActivity = !activityFilter || participant.activite === activityFilter;
    
    return matchesSearch && matchesActivity;
  });

  const totalPages = Math.ceil(filteredParticipants.length / rowsPerPage);
  const paginatedParticipants = filteredParticipants.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  // Handlers
  const handleSelectAll = () => {
    if (selectedParticipants.length === paginatedParticipants.length) {
      setSelectedParticipants([]);
    } else {
      setSelectedParticipants(paginatedParticipants.map(p => p.id));
    }
  };

  const handleSelectParticipant = (id: number) => {
    if (selectedParticipants.includes(id)) {
      setSelectedParticipants(selectedParticipants.filter(pid => pid !== id));
    } else {
      setSelectedParticipants([...selectedParticipants, id]);
    }
  };

  const handleDelete = () => {
    console.log('Supprimer les participants sélectionnés:', selectedParticipants);
    // Logique de suppression
    setSelectedParticipants([]);
  };

  const handleDeleteSingle = (id: number) => {
    console.log('Supprimer participant:', id);
    // Logique de suppression individuelle
  };

  const handleAdd = () => {
    console.log('Ajouter un participant');
    // Logique d'ajout
  };

  const handleView = (id: number) => {
    console.log('Voir participant:', id);
    // Logique de visualisation
  };

  const handleEdit = (id: number) => {
    console.log('Modifier participant:', id);
    // Logique de modification
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(event.target.value);
    setPage(1);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* En-tête */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Gestion des Participants
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gérez les invités et participants de votre événement
          </Typography>
        </Box>

        {/* Boutons d'exportation */}
        <ExportButtons />

        {/* Tableau des participants */}
        <Card sx={{ 
          borderRadius: 2, 
          boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px' 
        }}>
          <Box sx={{ p: 3 }}>
            <TableToolbar
              selectedCount={selectedParticipants.length}
              onSelectAll={handleSelectAll}
              isAllSelected={selectedParticipants.length === paginatedParticipants.length && paginatedParticipants.length > 0}
              onDelete={handleDelete}
              onAdd={handleAdd}
              searchTerm={searchTerm}
              onSearchChange={(e) => setSearchTerm(e.target.value)}
              activityFilter={activityFilter}
              onActivityFilterChange={(e) => setActivityFilter(e.target.value)}
              signatureEnabled={signatureEnabled}
              onSignatureToggle={setSignatureEnabled}
            />

            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={selectedParticipants.length > 0 && selectedParticipants.length < paginatedParticipants.length}
                        checked={paginatedParticipants.length > 0 && selectedParticipants.length === paginatedParticipants.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Nom & Prénoms</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Téléphone</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Connecté</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Émargement</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedParticipants.map((participant) => (
                    <ParticipantRow
                      key={participant.id}
                      participant={participant}
                      selected={selectedParticipants.includes(participant.id)}
                      onSelect={() => handleSelectParticipant(participant.id)}
                      onEdit={handleEdit}
                      onView={handleView}
                      onDelete={handleDeleteSingle}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination avec sélecteur */}
            <PaginationControls
              page={page}
              totalPages={totalPages}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              totalItems={filteredParticipants.length}
            />
          </Box>
        </Card>

        {/* Boutons de navigation */}
        <NavigationButtons />

        {/* Footer */}
        <Box sx={{
          mt: 4,
          py: 3,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 EVENTQUORUM EVENTS. Powered by PCI_LABS SARL.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
              Confidentialité
            </Button>
            <Button variant="text" size="small" sx={{ textTransform: 'none' }}>
              Aide
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default ParticipantManagementPage;