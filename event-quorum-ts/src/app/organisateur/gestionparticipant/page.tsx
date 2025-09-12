//src/app/organisateur/gestionparticipant/page.tsx
import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import ParticipantManagementPage from 'src/app/organisateur/gestionparticipant/gestionparticipant-home/participant-management-home';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Coming soon - ${CONFIG.appName}` };

export default function Page() {
    return <ParticipantManagementPage />;
}
