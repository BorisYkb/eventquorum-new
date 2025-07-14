'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/admin';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ParticipantNewEditForm } from './ParticipantNewEditForm';
import { Button } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ParticipantCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Ajouter un nouveau participant"
        links={[
          { name: 'Gestion participants', href: paths.organisateur.gestionparticipant.root },
          { name: 'Nouveau participant' },
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