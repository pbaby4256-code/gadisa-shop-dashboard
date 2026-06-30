'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const TABS = [
  { href: '/receipts', label: 'Home', icon: '🏠', provider: undefined },
  { href: '/receipts?provider=telebirr', label: 'telebirr', icon: '🟡', provider: 'telebirr' },
  { href: '/receipts?provider=BOA', label: 'BOA', icon: '🏦', provider: 'BOA' },
  { href: '/receipts?provider=CBE', label: 'CBE', icon: '🏛️', provider: 'CBE' },
];

export function BottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeProvider = searchParams.get('provider');

  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => {
        const isActive =
          pathname === '/receipts' &&
          ((tab.provider === undefined && !activeProvider) ||
            tab.provider === activeProvider);

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="bottom-nav-icon">{tab.icon}</span>
            <span className="bottom-nav-label">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
