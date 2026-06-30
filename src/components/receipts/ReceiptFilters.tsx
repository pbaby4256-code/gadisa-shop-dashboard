'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function ReceiptFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') ?? '');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set('q', search);
    } else {
      params.delete('q');
    }
    router.push(`/receipts?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="receipt-filters">
      <input
        type="text"
        placeholder="Search customer name or reference"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
}
