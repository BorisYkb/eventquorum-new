'use client';

import type { IUserItem } from 'src/types/user';

import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/admin';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// import { UserNewEditForm } from '../user-new-edit-form';
import { IClientItem } from 'src/types/client';

import { ClientNewEditForm } from '../client-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  client?: IClientItem;
};

export function ClientEditView({ client: currentClient }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Modifier client"
        // backHref={paths.admin.GESTION_CLIENT.root}
        links={[
          { name: 'Gestion client', href: paths.admin.GESTION_CLIENT.root },
          { name: currentClient?.company_name },
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

      <ClientNewEditForm item={currentClient} />
    </DashboardContent>
  );
}
