'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/admin';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ParticipantNewEditForm } from './ParticipantNewEditForm';
import { Button } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';

import { IParticipantItem } from './types';

// ----------------------------------------------------------------------

type Props = {
  participant?: IParticipantItem;
};

export function ParticipantEditView({ participant: currentParticipant }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Modifier participant"
        links={[
          { name: 'Gestion participants', href: paths.organisateur.gestionparticipant.root },
          { name: `${currentParticipant?.nom} ${currentParticipant?.prenom}` },
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

      <ParticipantNewEditForm item={currentParticipant} />
    </DashboardContent>
  );
}