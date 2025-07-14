'use client';

import {
  Stack,
  IconButton,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Tooltip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Search as SearchIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { paths } from 'src/routes/paths';

// Types
type TableToolbarProps = {
  selectedCount: number;
  onSelectAll: () => void;
  isAllSelected: boolean;
  onDelete: () => void;
  onAdd: () => void;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  activityFilter: string;
  onActivityFilterChange: (e: any) => void;
  signatureEnabled: boolean;
  onSignatureToggle: (checked: boolean) => void;
};

const ACTIVITIES = [
  { value: '', label: 'Toutes les activités' },
  { value: 'conference', label: 'Conférence principale' },
  { value: 'workshop', label: 'Atelier pratique' },
  { value: 'networking', label: 'Session networking' },
  { value: 'cocktail', label: 'Cocktail de clôture' },
];

const TableToolbar = ({
  selectedCount,
  onSelectAll,
  isAllSelected,
  onDelete,
  onAdd,
  searchTerm,
  onSearchChange,
  activityFilter,
  onActivityFilterChange,
  signatureEnabled,
  onSignatureToggle
}: TableToolbarProps) => {
  const router = useRouter();

  const handleAddClick = () => {
    router.push(paths.organisateur.gestionparticipant.add);
  };

  return (
  <Stack spacing={2} sx={{ mb: 2 }}>
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
      <Stack direction="row" spacing={2} alignItems="center">
        <Tooltip title="Supprimer les sélectionnés">
          <IconButton
            color="error"
            disabled={selectedCount === 0}
            onClick={onDelete}
            sx={{
              border: 1,
              borderColor: 'error.main',
              borderRadius: 1,
              '&:disabled': {
                borderColor: 'grey.300',
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Divider orientation="vertical" flexItem />

        <TextField
          size="small"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={onSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
          sx={{ minWidth: 200 }}
        />

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Filtrer par activité</InputLabel>
          <Select
            value={activityFilter}
            onChange={onActivityFilterChange}
            label="Filtrer par activité"
          >
            {ACTIVITIES.map((activity) => (
              <MenuItem key={activity.value} value={activity.value}>
                {activity.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={2} alignItems="center">
        <FormControlLabel
          control={
            <Switch
              checked={signatureEnabled}
              onChange={(e) => onSignatureToggle(e.target.checked)}
              color="primary"
            />
          }
          label="Activé signature électronique"
          labelPlacement="start"
          sx={{ mr: 2 }}
        />

        <Tooltip title="Ajouter un invité" arrow>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddClick}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Ajouter
          </Button>
        </Tooltip>
      </Stack>
    </Stack>
  </Stack>
);
};

export default TableToolbar;