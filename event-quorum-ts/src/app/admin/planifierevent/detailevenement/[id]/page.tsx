import type { Metadata } from 'next';
import { _eventList } from 'src/_mock/_events';

import { CONFIG } from 'src/global-config';
import { DetailEventView } from 'src/sections/planifierevent/detailevenement/view/detailevent-view';
// import { FicheClientView } from 'src/sections/gestionclient/ficheclient/view/ficheclient-view';


// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Détail evenement` };

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  const { id } = params;

  const currentEvent = _eventList.find((event) => event.id === id);

  return <DetailEventView event={currentEvent} />;
}

// ----------------------------------------------------------------------

/**
 * [1] Default
 * Remove [1] and [2] if not using [2]
 * Will remove in Next.js v15
 */
const dynamic = CONFIG.isStaticExport ? 'auto' : 'force-dynamic';
export { dynamic };

/**
 * [2] Static exports
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */
export async function generateStaticParams() {
  if (CONFIG.isStaticExport) {
    return _eventList.map((event) => ({ id: event.id }));
  }
  return [];
}
