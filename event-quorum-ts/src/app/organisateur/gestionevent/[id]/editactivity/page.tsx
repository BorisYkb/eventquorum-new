
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _activityList } from 'src/_mock/_activity';
import { DashboardContent } from 'src/layouts/admin';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ActivityNewEditForm } from 'src/sections/gestionEvent/view/activity-new-edit-form';

import { IActivity, INewActivityItem } from 'src/types/activity';


export default function ActivityEditPage() {
  const params = useParams();
  const [currentActivity, setCurrentActivity] = useState<INewActivityItem| undefined>();
  
  useEffect(() => {
    // Temporary mock data fetch
    // In production, this would be an API call using the id
    const activity = _activityList.find((activity) => activity.id === params.id);
    setCurrentActivity(activity as INewActivityItem);
  }, [params.id]);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Modifier une activité"
        links={[
          { name: 'Gestion Event', href: paths.organisateur.gestionevent.root },
          { name: 'Modification d\'activité' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.organisateur.gestionevent.root}
            variant="contained"
            startIcon={<Iconify icon="mingcute:left-fill" />}
          >
            Retour
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ActivityNewEditForm currentActivity={currentActivity} />
    </DashboardContent>
  );
}
