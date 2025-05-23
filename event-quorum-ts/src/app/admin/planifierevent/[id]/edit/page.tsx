
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardContent } from 'src/layouts/admin';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { Button } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';
import { EventNewEditForm } from 'src/sections/planifierevent/event-new-edit-form';
import { IEvent, INewEventItem } from 'src/types/event';
import { _mockEvents } from 'src/_mock/_events';

export default function EventEditPage() {
  const params = useParams();
  const [currentEvent, setCurrentEvent] = useState<IEvent | undefined>();
  
  useEffect(() => {
    // Temporary mock data fetch
    // In production, this would be an API call using the id
    const event = _mockEvents.find((event) => event.id === params.id);
    setCurrentEvent(event as IEvent);
  }, [params.id]);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Modifier un événement"
        links={[
          { name: 'Planifier evenement', href: paths.admin.PLANIFIER_UN_EVENEMENT.root },
          { name: 'Modification d\'évenement' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.admin.PLANIFIER_UN_EVENEMENT.root}
            variant="contained"
            startIcon={<Iconify icon="mingcute:left-fill" />}
          >
            Retour
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <EventNewEditForm currentEvent={currentEvent} />
    </DashboardContent>
  );
}
