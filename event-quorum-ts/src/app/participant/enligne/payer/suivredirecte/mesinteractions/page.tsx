//src/app/participant/enpresentiel/payer/mesinteractions/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';

// Import du composant de statistiques 
import { GuichetWidgetSummary } from 'src/app/participant/components/guichet-widget-summary-2';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { CustomTabs } from 'src/components/custom-tabs';

// Import de la section Avis
import { ReviewsSection } from '../components/reviews-section';

// ----------------------------------------------------------------------

/**
 * Données fictives pour les statistiques des enquêtes
 */
const SURVEY_STATS = [
  {
    title: 'Nombre enquêtes',
    total: '05',
    color: 'warning' as const,
    icon: 'solar:document-text-bold-duotone',
  },
  {
    title: 'Enquête manquée',
    total: '01',
    color: 'error' as const,
    icon: 'solar:close-circle-bold-duotone',
  },
  {
    title: 'Nombre enquêtes à faire',
    total: '01',
    color: 'info' as const,
    icon: 'solar:clock-circle-bold-duotone',
  },
];

/**
 * Données fictives pour le tableau des enquêtes
 */
const SURVEY_DATA = [
  {
    id: 'survey-1',
    title: 'PANEL DE HAUT NIVEAU',
    type: 'Satisfaction',
    date: '10/09/2024 10H00',
    expirationDate: '11/09/2024 10H00',
    status: 'En cours',
    statusColor: 'success',
    note: '----',
    score: null,
  },
  {
    id: 'survey-2',
    title: 'PANEL DE HAUT NIVEAU',
    type: 'Evaluation',
    date: '10/09/2024 11H00',
    expirationDate: '11/09/2024 11H00',
    status: 'Non démarré',
    statusColor: 'warning',
    note: '7/10',
    score: 7,
  },
  {
    id: 'survey-3',
    title: 'WORKSHOP',
    type: 'Evaluation',
    date: '12/05/2023 à 08H00',
    expirationDate: '13/05/2023 à 08H00',
    status: 'Terminé',
    statusColor: 'success',
    note: '10/10',
    score: 10,
  },
  {
    id: 'survey-4',
    title: 'WORKSHOP',
    type: 'Evaluation',
    date: '12/05/2023 à 08H00',
    expirationDate: '13/05/2023 à 08H00',
    status: 'Non démarré',
    statusColor: 'warning',
    note: '00',
    score: 0,
  },
];

/**
 * Configuration des onglets disponibles
 */
const TABS_CONFIG = [
  {
    value: 'results',
    label: 'Résultats des enquêtes',
    icon: 'solar:chart-2-bold-duotone',
  },
  {
    value: 'reviews',
    label: 'Avis',
    icon: 'solar:star-bold-duotone',
  },
];

// ----------------------------------------------------------------------

/**
 * Composant principal de la page Mes Interactions
 * Affiche les statistiques des enquêtes et un tableau détaillé avec navigation par onglets
 * Inclut désormais la section complète des avis et la navigation vers les détails
 * 
 * @returns JSX.Element - Interface complète des interactions participant
 */
export default function MesInteractionsPage() {
  // Navigation
  const router = useRouter();

  // Gestion de l'onglet actif
  const [currentTab, setCurrentTab] = useState('results');

  // Gestion de la recherche
  const [searchQuery, setSearchQuery] = useState('');

  // Hooks pour la responsivité
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  /**
   * Gestionnaire de changement d'onglet
   * @param event - Événement de changement
   * @param newValue - Nouvelle valeur de l'onglet
   */
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  /**
   * Gestionnaire de changement de recherche
   * @param event - Événement de saisie
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  /**
   * Navigation vers le détail d'une enquête
   * @param surveyId - ID de l'enquête
   */
  const handleViewSurveyDetail = (surveyId: string) => {
    router.push(`/participant/enligne/payer/suivredirecte/mesinteractions/${surveyId}`);
  };

  /**
   * Téléchargement des résultats d'une enquête
   * @param surveyId - ID de l'enquête
   */
  const handleDownloadSurvey = (surveyId: string) => {
    console.log(`Téléchargement de l'enquête: ${surveyId}`);
    // TODO: Implémenter le téléchargement
  };

  /**
   * Filtrage des données selon la recherche
   */
  const filteredData = SURVEY_DATA.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * Rendu des statistiques sous forme de cartes widget
   */
  const renderStats = () => (
    <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
      {SURVEY_STATS.map((stat, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <GuichetWidgetSummary
            title={stat.title}
            total={stat.total}
            color={stat.color}
            icon={stat.icon}
            sx={{
              '& .MuiTypography-h3': {
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              },
              '& .MuiTypography-subtitle2': {
                fontSize: { xs: '0.75rem', sm: '0.875rem' },
              },
            }}
          />
        </Grid>
      ))}
    </Grid>
  );

  /**
   * Rendu de la barre de recherche avec input personnalisé
   */
  const renderSearchBar = () => (
    <Box sx={{ mb: { xs: 2, sm: 3 } }}>
      <TextField
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Recherche"
        variant="outlined"
        size={isMobile ? 'small' : 'medium'}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon="solar:magnifer-linear"
                sx={{
                  color: 'text.disabled',
                  width: { xs: 18, sm: 20 },
                  height: { xs: 18, sm: 20 },
                }}
              />
            </InputAdornment>
          ),
        }}
        sx={{
          maxWidth: { xs: '100%', sm: '400px' },
          '& .MuiOutlinedInput-root': {
            borderRadius: { xs: 1, sm: 1.5 },
            backgroundColor: 'background.paper',
            '&:hover': {
              '& > fieldset': { borderColor: 'primary.main' },
            },
          },
        }}
      />
    </Box>
  );

  /**
   * Rendu de l'en-tête du tableau avec les titres des colonnes
   */
  const renderTableHeader = () => (
    <TableHead>
      <TableRow>
        <TableCell sx={{
          fontWeight: 600,
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
          py: { xs: 1, sm: 1.5 },
        }}>
          Titre enquête
        </TableCell>
        <TableCell sx={{
          fontWeight: 600,
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
          py: { xs: 1, sm: 1.5 },
        }}>
          Date de début
        </TableCell>
        {!isSmallMobile && (
          <TableCell sx={{
            fontWeight: 600,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            py: { xs: 1, sm: 1.5 },
          }}>
            Date de fin
          </TableCell>
        )}
        <TableCell sx={{
          fontWeight: 600,
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
          py: { xs: 1, sm: 1.5 },
        }}>
          Statut de participation
        </TableCell>
        <TableCell sx={{
          fontWeight: 600,
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
          py: { xs: 1, sm: 1.5 },
        }}>
          Note
        </TableCell>
        <TableCell sx={{
          fontWeight: 600,
          fontSize: { xs: '0.75rem', sm: '0.875rem' },
          py: { xs: 1, sm: 1.5 },
        }}>
          Action
        </TableCell>
      </TableRow>
    </TableHead>
  );

  /**
   * Rendu d'une ligne du tableau avec les données d'enquête
   * @param survey - Données de l'enquête
   */
  const renderTableRow: any = (survey: typeof SURVEY_DATA[0]) => (
    <TableRow key={survey.id} hover>
      <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              mb: 0.5,
            }}
          >
            {survey.title}
          </Typography>
          {/* <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
          >
            {survey.type}
          </Typography> */}
        </Box>
      </TableCell>

      <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
        >
          {survey.date}
        </Typography>
      </TableCell>

      {!isSmallMobile && (
        <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
          <Typography
            variant="body2"
            sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
          >
            {survey.expirationDate}
          </Typography>
        </TableCell>
      )}

      <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
        <Label
          color={survey.statusColor as any}
          variant="soft"
          sx={{
            fontSize: { xs: '0.7rem', sm: '0.75rem' },
            px: 1,
          }}
        >
          {survey.status}
        </Label>
      </TableCell>

      <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          }}
        >
          {survey.note}
        </Typography>
      </TableCell>

      <TableCell sx={{ py: { xs: 1, sm: 2 } }}>
        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
          {/* Bouton voir le détail - Navigation vers la page de détail */}
          <IconButton
            size={isMobile ? 'small' : 'medium'}
            onClick={() => handleViewSurveyDetail(survey.id)}
            title="Voir le détail de l'enquête"
            sx={{
              color: 'primary.main',
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'primary.lighter'
              },
            }}
          >
            <Iconify icon="solar:eye-bold-duotone" />
          </IconButton>

          {/* Bouton télécharger */}
          <IconButton
            size={isMobile ? 'small' : 'medium'}
            onClick={() => handleDownloadSurvey(survey.id)}
            title="Télécharger les résultats"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                color: 'success.main',
                backgroundColor: 'success.lighter'
              },
            }}
          >
            <Iconify icon="material-symbols:download-rounded" color="#4CAF50" width={24} />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );

  /**
   * Rendu du tableau complet des enquêtes
   */
  const renderTable = () => (
    <Card sx={{ overflow: 'hidden' }}>
      <TableContainer>
        <Table size={isMobile ? 'small' : 'medium'}>
          {renderTableHeader()}
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map(renderTableRow)
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography variant="body2" color="text.secondary">
                    Aucun résultat trouvé pour "{searchQuery}"
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );

  /**
   * Rendu du contenu selon l'onglet actif
   */
  const renderTabContent = () => {
    switch (currentTab) {
      case 'results':
        return (
          <Box>
            {renderStats()}
            {renderSearchBar()}
            {renderTable()}
          </Box>
        );
      case 'reviews':
        return (
          <ReviewsSection />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
      {/* En-tête de la page */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            color: 'text.primary',
            mb: 1,
          }}
        >
          Mes Interactions
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          Consultez vos résultats et donnez vos avis
        </Typography>
      </Box>

      {/* Navigation par onglets */}
      <Box sx={{ mb: { xs: 3, sm: 4 } }}>
        <CustomTabs
          value={currentTab}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'standard'}
          sx={{
            borderRadius: 1,
            '& .MuiTab-root': {
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: 600,
              textTransform: 'none',
              minHeight: { xs: '40px', sm: '48px' },
              px: { xs: 2, sm: 3 },
            },
            width: { xs: '100%', sm: 380 },
          }}
        >
          {TABS_CONFIG.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              icon={
                <Iconify
                  icon={tab.icon}
                  sx={{
                    mr: 1,
                    width: { xs: 18, sm: 20 },
                    height: { xs: 18, sm: 20 },
                  }}
                />
              }
              iconPosition="start"
            />
          ))}
        </CustomTabs>
      </Box>

      {/* Contenu de l'onglet actif */}
      {renderTabContent()}
    </Box>
  );
}