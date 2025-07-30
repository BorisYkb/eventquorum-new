
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { DashboardContent } from 'src/layouts/admin';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { Button } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';
import { IActivity, INewActivityItem } from 'src/types/activity';
import { _activityList } from 'src/_mock/_activity';
import { ActivityNewEditForm } from 'src/sections/gestionEvent/view/activity-new-edit-form';


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
