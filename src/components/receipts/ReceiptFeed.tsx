'use client';

import { useEffect, useState } from 'react';
import { fetchReceipts, subscribeToReceipts } from '@/lib/supabase/receipts';
import type { Receipt, Provider } from '@/lib/types/receipt';
import { ReceiptRow } from './ReceiptRow';

export function ReceiptFeed({
  provider,
  search,
}: {
  provider?: Provider;
  search?: string;
}) {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetchReceipts({ provider, search })
      .then((data) => {
        if (active) {
          setReceipts(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [provider, search]);

  useEffect(() => {
    setIsLive(true);

    const unsubscribe = subscribeToReceipts((newReceipt) => {
      // Only prepend if it matches the current filter (or no filter is set).
      if (provider && newReceipt.provider !== provider) return;

      setReceipts((prev) => {
        if (prev.some((r) => r.id === newReceipt.id)) return prev; // avoid dupes
        return [newReceipt, ...prev];
      });
    });

    return () => {
      setIsLive(false);
      unsubscribe();
    };
  }, [provider]);

  return (
    <div>
      <div className="receipt-feed-header">
        <p className="receipt-feed-title">Recent payments</p>
        <span className={`live-dot ${isLive ? 'live' : ''}`}>
          ● {isLive ? 'Live' : 'Connecting…'}
        </span>
      </div>

      {loading && <p className="receipt-feed-empty">Loading…</p>}

      {!loading && receipts.length === 0 && (
        <p className="receipt-feed-empty">No payments yet.</p>
      )}

      <div className="receipt-list">
        {receipts.map((r) => (
          <ReceiptRow key={r.id} receipt={r} />
        ))}
      </div>
    </div>
  );
}
