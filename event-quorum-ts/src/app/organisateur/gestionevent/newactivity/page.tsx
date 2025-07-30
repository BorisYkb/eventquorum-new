import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { ActivityCreateView } from 'src/sections/gestionEvent/view/activity-create-view';


// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Création d'une nouvelle activité` };

export default function Page() {
  return <ActivityCreateView />;
}