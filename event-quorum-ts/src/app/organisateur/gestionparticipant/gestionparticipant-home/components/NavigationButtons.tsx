'use client';

import {
  Stack,
  Button,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Group as GroupIcon,
  Event as EventIcon,
} from '@mui/icons-material';

const NavigationButtons = () => (
  <Stack direction="row" spacing={2} sx={{ my: 3 }}>
    <Button
      variant="outlined"
      startIcon={<PersonAddIcon />}
      sx={{
        borderRadius: 1,
        textTransform: 'none',
        fontWeight: 600,
      }}
    >
      Gérer les invitations
    </Button>
    <Button
      variant="outlined"
      startIcon={<GroupIcon />}
      sx={{
        borderRadius: 1,
        textTransform: 'none',
        fontWeight: 600,
      }}
    >
      Groupes de participants
    </Button>
    <Button
      variant="outlined"
      startIcon={<EventIcon />}
      sx={{
        borderRadius: 1,
        textTransform: 'none',
        fontWeight: 600,
      }}
    >
      Historique des actions
    </Button>
  </Stack>
);

export default NavigationButtons;