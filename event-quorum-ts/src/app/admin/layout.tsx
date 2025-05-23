import { CONFIG } from 'src/global-config';
// import { AdminLayout } from 'src/layouts/admin';

import { AuthGuard } from 'src/auth/guard';
import { AdminLayout } from 'src/layouts/admin';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return (
    <AuthGuard>
      <AdminLayout>{children}</AdminLayout>
    </AuthGuard>
  );
}
