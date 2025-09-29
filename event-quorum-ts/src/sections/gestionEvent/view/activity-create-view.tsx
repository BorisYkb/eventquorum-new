'use client';

import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/admin';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ActivityNewEditForm } from './activity-new-edit-form';

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
