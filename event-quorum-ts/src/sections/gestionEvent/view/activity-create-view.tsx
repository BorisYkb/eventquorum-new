'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/admin';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ActivityNewEditForm } from './activity-new-edit-form';
import { Button } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ActivityCreateView() {
    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="Création d'une activité"
                links={[
                    { name: 'Gestion event', href: paths.organisateur.gestionevent.root },
                    { name: 'Création d\'activité' },
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

            <ActivityNewEditForm />
        </DashboardContent>
    );
}
