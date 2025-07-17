import { CONFIG } from 'src/global-config';

import { AuthGuard } from 'src/auth/guard';
import { GuichetLayout } from 'src/layouts/guichet';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return <GuichetLayout>{children}</GuichetLayout>;
  }

  return (
    <AuthGuard>
      <GuichetLayout>{children}</GuichetLayout>
    </AuthGuard>
  );
}
