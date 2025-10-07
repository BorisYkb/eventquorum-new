'use client';

import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/admin';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ParticipantNewEditForm } from './ParticipantNewEditForm';

// ----------------------------------------------------------------------

export function ParticipantCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Ajouter un nouvel invité"
        links={[
          { name: 'Gestion participants', href: paths.organisateur.gestionparticipant.root },
          { name: 'Nouveau Invité' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.organisateur.gestionparticipant.root}
            variant="contained"
            startIcon={<Iconify icon="mingcute:left-fill" />}
          >
            Retour
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ParticipantNewEditForm />
    </DashboardContent>
  );
}