//src/app/organisateur/gestionparticipant/gestionparticipant-home/components/NavigationButtons.tsx

'use client';

import { useRouter } from 'next/navigation';

import {
  Stack,
  Button,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Group as GroupIcon,
  Event as EventIcon,
} from '@mui/icons-material';

const NavigationButtons = () => {
  const router = useRouter();

  const handleGestionMessages = () => {
    router.push('/organisateur/gestionparticipant/gestion-messages');
  };

  const handleDemandesInscription = () => {
    router.push('/organisateur/gestionparticipant/demandes-inscription');
  };

  const handleGestionBoitier = () => {
    router.push('/organisateur/gestionparticipant/gestion-boitiers');
  };


  return (
    <Stack direction="row" spacing={2} sx={{ my: 3 }}>
      <Button
        variant="outlined"
        startIcon={<PersonAddIcon />}
        sx={{
          borderRadius: 1,
          textTransform: 'none',
          fontWeight: 600,
        }}
        onClick={handleDemandesInscription}
      >
        Gestion des demandes d'inscription
      </Button>

      <Button
        variant="outlined"
        startIcon={<GroupIcon />}
        onClick={handleGestionMessages}
        sx={{
          borderRadius: 1,
          textTransform: 'none',
          fontWeight: 600,
        }}
      >
        Gestion des messages
      </Button>

      <Button
        variant="outlined"
        startIcon={<EventIcon />}
        sx={{
          borderRadius: 1,
          textTransform: 'none',
          fontWeight: 600,
        }}
        onClick={handleGestionBoitier}
      >
        Gestion des boitiers electroniques
      </Button>
    </Stack>
  );
};

export default NavigationButtons;