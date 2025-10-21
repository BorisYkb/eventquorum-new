'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Button,
  Stack,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';

/**
 * Type pour les filtres actifs
 */
type ActiveFilters = {
  activityFilter: string;
  firstConnectionFilter: string;
  connectionTypeFilter: string;
  emargementFilter: string;
  checkingFilter: string;
};

/**
 * Options d'export
 */
const EXPORT_OPTIONS = [
  { value: 'pdf', label: 'Exporter en PDF' },
  { value: 'excel', label: 'Exporter en Excel' },
];

/**
 * Props du composant ExportButtons
 */
interface ExportButtonsProps {
  /** Filtres actuellement actifs */
  activeFilters?: ActiveFilters;
}

/**
 * Composant ExportButtons
 * Bouton d'export unique qui prend en compte les filtres actifs
 */
const ExportButtons: React.FC<ExportButtonsProps> = ({
  activeFilters = {
    activityFilter: '',
    firstConnectionFilter: '',
    connectionTypeFilter: '',
    emargementFilter: '',
    checkingFilter: '',
  }
}) => {
  const router = useRouter();

  // État pour le menu déroulant d'export
  const [exportMenuAnchor, setExportMenuAnchor] = useState<null | HTMLElement>(null);

  /**
   * Ouvre le menu d'export
   */
  const handleExportMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setExportMenuAnchor(event.currentTarget);
  };

  /**
   * Ferme le menu d'export
   */
  const handleExportMenuClose = () => {
    setExportMenuAnchor(null);
  };

  /**
   * Gère l'export selon le format sélectionné
   * Prend en compte tous les filtres actifs
   */
  const handleExport = (format: string) => {
    console.log('Export:', {
      format,
      filters: activeFilters,
    });

    // TODO: Implémenter l'appel API pour l'export avec les filtres
    // L'API devra recevoir :
    // 1. Le format d'export (PDF ou Excel)
    // 2. Tous les filtres actifs
    // 3. Exporter uniquement les données filtrées

    handleExportMenuClose();

    // Exemple d'appel API
    /*
    const exportData = async () => {
      const response = await fetch('/api/participants/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          format,
          filters: activeFilters,
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `participants-${Date.now()}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    };

    exportData();
    */
  };

  /**
   * Redirige vers la page de consultation des connectés
   */
  const handleConsultConnected = () => {
    router.push('/organisateur/gestionparticipant/consultation');
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ mb: 2 }}
    >
      {/* Bouton Exporter */}
      <Button
        variant="contained"
        onClick={handleExportMenuOpen}
        endIcon={<ExpandMoreIcon />}
        sx={{
          bgcolor: '#000',
          color: 'white',
          '&:hover': { bgcolor: '#333' },
          borderRadius: 1,
          textTransform: 'none',
          fontWeight: 600,
        }}
      >
        Exporter
      </Button>
      
      <Menu
        anchorEl={exportMenuAnchor}
        open={Boolean(exportMenuAnchor)}
        onClose={handleExportMenuClose}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        {EXPORT_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleExport(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>

      {/* Bouton Consulter connectés */}
      <Tooltip title="Consulter la liste des connectés" arrow>
        <Button
          variant="contained"
          onClick={handleConsultConnected}
          sx={{
            bgcolor: '#000',
            color: 'white',
            '&:hover': { bgcolor: '#333' },
            borderRadius: 1,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Consulter la liste des connectés
        </Button>
      </Tooltip>
    </Stack>
  );
};

export default ExportButtons;