import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';
import { _clientList } from 'src/_mock/_client';

import { FicheClientView } from 'src/sections/gestionclient/ficheclient/view/ficheclient-view';


// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Fiche client` };

type Props = {
  params: { id: string };
};

export default function Page({ params }: Props) {
  const { id } = params;

  const currentClient = _clientList.find((client) => client.id === id);

  return <FicheClientView client={currentClient} />;
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
    return _clientList.map((client) => ({ id: client.id }));
  }
  return [];
}
