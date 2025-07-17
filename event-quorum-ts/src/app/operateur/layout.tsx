//src/app/operator/layout.tsx

import { CONFIG } from 'src/global-config';

import { AuthGuard } from 'src/auth/guard';
import { OperatorLayout } from 'src/layouts/operateur';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  if (CONFIG.auth.skip) {
    return <OperatorLayout>{children}</OperatorLayout>;
  }

  return (
    <AuthGuard>
      <OperatorLayout>{children}</OperatorLayout>
    </AuthGuard>
  );
}