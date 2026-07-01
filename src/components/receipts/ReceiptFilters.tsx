'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function ReceiptFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') ?? '');

  function handleChange(val: string) {
    setSearch(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val) { params.set('q', val); } else { params.delete('q'); }
    router.push(`/receipts?${params.toString()}`);
  }

  return (
    <div className="receipt-filters">
      <span className="receipt-filters-icon">🔍</span>
      <input
        type="text"
        placeholder="Search customer name or reference…"
        value={search}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
