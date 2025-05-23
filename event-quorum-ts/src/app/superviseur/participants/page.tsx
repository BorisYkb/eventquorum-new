import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { SuperviseurClientListView } from 'src/sections/overview/superviseur/view/superviseur-clients-list-view';



// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Participants | Superviseur - ${CONFIG.appName}` };

export default function Page() {
    return <SuperviseurClientListView />;
}