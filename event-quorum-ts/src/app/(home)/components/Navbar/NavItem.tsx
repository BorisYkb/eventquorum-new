import Link from 'next/link';

type NavItemProps = {
  href: string;
  label: string;
};

export default function NavItem({ href, label }: NavItemProps) {
  return (
    <Link
      href={href}
      className="text-gray-900 dark:text-white hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
    >
      {label}
    </Link>
  );
}
