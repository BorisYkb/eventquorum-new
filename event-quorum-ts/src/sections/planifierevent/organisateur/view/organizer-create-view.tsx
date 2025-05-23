'use client';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/admin';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { OrganizerNewEditForm } from '../organizer-new-edit-form';
import { Button } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';


// ----------------------------------------------------------------------

export function OrganizerCreateView() {
    return (
        <DashboardContent>
            <CustomBreadcrumbs
                heading="Créer un nouvel organisateur"
                links={[
                    { name: 'Planifier évènement', href: paths.admin.PLANIFIER_UN_EVENEMENT.root },
                    { name: 'Nouvel organisateur' },
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

            <OrganizerNewEditForm />
        </DashboardContent>
    );
}
