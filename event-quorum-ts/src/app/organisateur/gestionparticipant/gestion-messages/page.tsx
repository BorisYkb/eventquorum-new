//src/app/organisateur/gestionparticipant/gestion-messages/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from 'src/components/label';
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
  Paper,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
  Checkbox,
  Breadcrumbs,
  Link,
  Grid2 as Grid,
  Tooltip,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
  Download as DownloadIcon,
  Message as MessageIcon,
  Visibility as VisibilityIcon,
  WhatsApp as WhatsAppIcon,
  Call as CallIcon,
  MailOutline as MailIcon,
} from '@mui/icons-material';

// Import du composant de statistiques
import { SuperviseurWidgetSummary } from 'src/sections/overview/superviseur/view/superviseur-widget-summary-2';

// Interface pour les demandes d'inscription
interface DemandeInscription {
  id: number;
  date: string;
  titre: string;
  type: 'Programmé' | 'Automatique';
  statut: 'Envoyé' | 'Échec' | 'En cours';
  nombreDestinataires: number;
  modeEnvoi: 'WhatsApp/Téléphone' | 'WhatsApp' | 'Téléphone' | 'Mail';
}

/**
 * Page de gestion des messages
 * Permet de visualiser, gérer et envoyer des messages pour l'événement
 * Affiche les statistiques des messages envoyés et reçus
 */
const GestionMessagesPage = () => {
  const router = useRouter();

  // États pour la gestion des données et filtres
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDemandes, setSelectedDemandes] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  // Données simulées des demandes d'inscription
  const [demandes] = useState<DemandeInscription[]>([
    {
      id: 1,
      date: '04/01/2024 10H00',
      titre: 'Mail d\'invitation',
      type: 'Programmé',
      statut: 'Envoyé',
      nombreDestinataires: 100,
      modeEnvoi: 'WhatsApp/Téléphone',
    },
    {
      id: 2,
      date: '04/01/2024 10H00',
      titre: 'Mail de relance',
      type: 'Programmé',
      statut: 'Envoyé',
      nombreDestinataires: 100,
      modeEnvoi: 'WhatsApp',
    },
    {
      id: 3,
      date: '04/01/2024 10H00',
      titre: 'Mail de bienvenue',
      type: 'Automatique',
      statut: 'Échec',
      nombreDestinataires: 1,
      modeEnvoi: 'Téléphone',
    },
    {
      id: 4,
      date: '04/01/2024 10H00',
      titre: 'Mail de confirmation',
      type: 'Automatique',
      statut: 'Envoyé',
      nombreDestinataires: 100,
      modeEnvoi: 'Mail',
    },
  ]);

  /**
   * Filtrage des demandes selon le terme de recherche
   */
  const filteredDemandes = demandes.filter(demande =>
    demande.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demande.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    demande.statut.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDemandes.length / rowsPerPage);
  const paginatedDemandes = filteredDemandes.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  /**
   * Retour à la page de gestion des participants
   */
  const handleBackToManagement = () => {
    router.push('/organisateur/gestionparticipant');
  };

  /**
   * Retour à la page précédente
   */
  const handleBack = () => {
    router.back();
  };

  /**
   * Sélection/désélection d'une demande
   */
  const handleSelectDemande = (id: number) => {
    if (selectedDemandes.includes(id)) {
      setSelectedDemandes(selectedDemandes.filter(demandeId => demandeId !== id));
    } else {
      setSelectedDemandes([...selectedDemandes, id]);
    }
  };

  /**
   * Sélection/désélection de toutes les demandes
   */
  const handleSelectAll = () => {
    if (selectedDemandes.length === paginatedDemandes.length) {
      setSelectedDemandes([]);
    } else {
      setSelectedDemandes(paginatedDemandes.map(d => d.id));
    }
  };

  /**
   * Suppression des demandes sélectionnées
   */
  const handleSupprimer = () => {
    console.log('Supprimer les demandes:', selectedDemandes);
    // TODO: Implémenter la suppression
  };

  /**
   * Ajout d'un nouveau message
   */
  const handleNouveauMessage = () => {
    router.push('/organisateur/gestionparticipant/gestion-messages/autre-message');
  };

  /**
   * Planifier l'envoi d'un message
   */
  const handlePlanifierEnvoi = () => {
    router.push('/organisateur/gestionparticipant/gestion-messages/planifier-envoi');
  };

  /**
   * Visualiser une demande
   */
  const handleVisualiser = (id: number) => {
    router.push(`/organisateur/gestionparticipant/gestion-messages/detail/${id}`);
  };

  /**
   * Exportation des données
   */
  const handleExport = () => {
    console.log('Exporter les demandes');
    // TODO: Implémenter l'exportation
  };

  /**
   * Changement de page
   */
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  /**
   * Obtention de la couleur du statut pour le composant Label
   */
  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'Envoyé':
        return 'success';
      case 'Échec':
        return 'error';
      case 'En cours':
        return 'warning';
      default:
        return 'default';
    }
  };

  /**
   * Obtention de l'icône du mode d'envoi
   */

  const getModeEnvoiIcon = (mode: string) => {
    if (mode.includes('WhatsApp')) {
      return (
        <WhatsAppIcon
          fontSize="small"
          sx={{ color: '#25D366' }} // Vert WhatsApp officiel
        />
      );
    }
    if (mode.includes('Téléphone')) {
      return (
        <CallIcon
          fontSize="small"
          sx={{ color: '#2196F3' }} // Bleu téléphone
        />
      );
    }
    if (mode.includes('Mail')) {
      return (
        <MailIcon
          fontSize="small"
          sx={{ color: '#FF5722' }} // Orange/rouge mail
        />
      );
    }
    return (
      <MessageIcon
        fontSize="small"
        sx={{ color: '#9E9E9E' }} // Gris par défaut
      />
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Stack spacing={4}>
        {/* En-tête avec breadcrumbs et navigation */}
        <Box>
          {/* Titre principal */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={handleBack}
              sx={{
                backgroundColor: 'grey.100',
                '&:hover': { backgroundColor: 'grey.200' },
                borderRadius: 1,
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Gestion des Messages
              </Typography>
              {/* Breadcrumbs */}
              <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleBackToManagement}
                  sx={{
                    textDecoration: 'none',
                    color: 'primary.main',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Gestion des participants
                </Link>
                <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500 }}>
                  Gestion des messages
                </Typography>
              </Breadcrumbs>
            </Box>
          </Box>
        </Box>

        {/* Statistiques */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <SuperviseurWidgetSummary
              title="Messages envoyés"
              total={200}
              color="warning"
              sx={{ height: 180 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <SuperviseurWidgetSummary
              title="Messages/Mail reçus"
              total={190}
              color="info"
              sx={{ height: 180 }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <SuperviseurWidgetSummary
              title="Demandes d'inscription"
              total={128}
              color="secondary"
              sx={{ height: 180 }}
            />
          </Grid>
        </Grid>

        {/* Carte principale */}
        <Card sx={{
          borderRadius: 2,
          boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
        }}>
          {/* Barre d'outils */}
          <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
              {/* Zone gauche : Actions et recherche */}
              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleSupprimer}
                  disabled={selectedDemandes.length === 0}
                  sx={{
                    borderRadius: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Supprimer
                </Button>

                <TextField
                  size="small"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ minWidth: 250 }}
                />
              </Stack>

              {/* Zone droite : Actions principales */}
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={handleExport}
                  sx={{
                    borderRadius: 1,
                    textTransform: 'none',
                    fontWeight: 500,
                  }}
                >
                  Exporter
                </Button>

                <Button
                  variant="contained"
                  onClick={handleNouveauMessage}
                  sx={{
                    backgroundColor: '#000',
                    color: 'white',
                    '&:hover': { backgroundColor: '#333' },
                    borderRadius: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Autre message
                </Button>

                <Button
                  variant="contained"
                  onClick={handlePlanifierEnvoi}
                  sx={{
                    backgroundColor: '#1976D2',
                    color: 'white',
                    '&:hover': { backgroundColor: '#1565C0' },
                    borderRadius: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                  }}
                >
                  Planifier envoi d'un message
                </Button>
              </Stack>
            </Stack>
          </Box>

          {/* Tableau des demandes */}
          <Box sx={{ p: 3 }}>
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 1 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.50' }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={selectedDemandes.length > 0 && selectedDemandes.length < paginatedDemandes.length}
                        checked={paginatedDemandes.length > 0 && selectedDemandes.length === paginatedDemandes.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Titre</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Nombre destinataires</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Mode d'envoi</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedDemandes.map((demande) => (
                    <TableRow key={demande.id} hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedDemandes.includes(demande.id)}
                          onChange={() => handleSelectDemande(demande.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {demande.date}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {demande.titre}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {demande.type}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Label
                          color={getStatutColor(demande.statut)}
                          variant="soft"
                        >
                          {demande.statut}
                        </Label>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {demande.nombreDestinataires}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {getModeEnvoiIcon(demande.modeEnvoi)}
                          <Typography variant="body2" sx={{ fontSize: '0.75rem' }}>
                            {demande.modeEnvoi}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Visualiser">
                          <IconButton
                            size="small"
                            onClick={() => handleVisualiser(demande.id)}
                            sx={{
                              backgroundColor: 'grey.100',
                              '&:hover': { backgroundColor: 'grey.200' }
                            }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Contrôles de pagination */}
            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between" sx={{ mt: 3 }}>
              {/* <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleExport}
                sx={{
                  borderRadius: 1,
                  textTransform: 'none',
                  fontWeight: 500,
                }}
              >
                Exporter
              </Button> */}

              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="medium"
              />
            </Stack>
          </Box>
        </Card>

        {/* Footer */}
        <Box sx={{
          mt: 4,
          py: 3,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 EVENTQUORUM. Powered by FX_LABS SARL.
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

export default GestionMessagesPage;