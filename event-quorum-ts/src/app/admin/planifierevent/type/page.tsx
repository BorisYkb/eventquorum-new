import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { TypeListView } from 'src/sections/planifierevent/type/view/type-list-view';


// ----------------------------------------------------------------------

export const metadata: Metadata = { title: 'Type d\'evenement '};

export default function Page() {
    return <TypeListView />;
}