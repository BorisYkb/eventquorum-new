import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { OverviewGuichetView } from 'src/sections/overview/e-commerce/view/overview-guichet-view';


// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Accueil Guichet - ${CONFIG.appName}` };

export default function Page() {
  return <OverviewGuichetView />;
}
