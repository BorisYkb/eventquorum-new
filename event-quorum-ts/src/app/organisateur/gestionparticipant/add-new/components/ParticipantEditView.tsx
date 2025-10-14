//src/app/organisateur/gestionparticipant/add-new/components/ParticipantCreateView.tsx

'use client';

import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/admin';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { IParticipantItem } from './types';
import { ParticipantNewEditForm } from './ParticipantNewEditForm';

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