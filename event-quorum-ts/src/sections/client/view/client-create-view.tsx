'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/admin';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ClientNewEditForm } from '../client-new-edit-form';
import { Button } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ClientCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Créer un nouveau client"
        links={[
          { name: 'Gestion client', href: paths.admin.GESTION_CLIENT.root },
          { name: 'Nouveau client' },
        ]}
        action={
          <Button
              component={RouterLink}
              href={paths.admin.GESTION_CLIENT.root}
              variant="contained"
              startIcon={<Iconify icon="mingcute:left-fill" />}
          >
              Retour
          </Button>
      }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ClientNewEditForm />
    </DashboardContent>
  );
}
