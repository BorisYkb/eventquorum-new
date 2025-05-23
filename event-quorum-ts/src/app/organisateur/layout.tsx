import { CONFIG } from 'src/global-config';

import { AuthGuard } from 'src/auth/guard';
import { OrganisateurLayout } from 'src/layouts/organisateur/layout';

// ----------------------------------------------------------------------

type Props = {
    children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    if (CONFIG.auth.skip) {
        return <OrganisateurLayout>{children}</OrganisateurLayout>;
    }

    return (
        <AuthGuard>
            <OrganisateurLayout>{children}</OrganisateurLayout>
        </AuthGuard>
    );
}
