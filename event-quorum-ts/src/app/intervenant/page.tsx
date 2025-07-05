import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { OverviewIntervenantView } from 'src/sections/overview/e-commerce/view/overview-intervenant-view';


// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Accueil Intervenant - ${CONFIG.appName}` };

export default function Page() {
  return <OverviewIntervenantView />;
}
