'use client';

import { useEffect, useState, useRef } from 'react';
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
  const newIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchReceipts({ provider, search })
      .then((data) => { if (active) { setReceipts(data); setLoading(false); } })
      .catch(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [provider, search]);

  useEffect(() => {
    setIsLive(true);
    const unsubscribe = subscribeToReceipts((newReceipt) => {
      if (provider && newReceipt.provider !== provider) return;
      setReceipts((prev) => {
        if (prev.some((r) => r.id === newReceipt.id)) return prev;
        newIds.current.add(newReceipt.id);
        setTimeout(() => {
          newIds.current.delete(newReceipt.id);
        }, 3000);
        return [newReceipt, ...prev];
      });
    });
    return () => { setIsLive(false); unsubscribe(); };
  }, [provider]);

  if (loading) {
    return (
      <div className="receipt-feed-empty">
        <div className="receipt-feed-empty-icon">⏳</div>
        <p>Loading payments…</p>
      </div>
    );
  }

  if (receipts.length === 0) {
    return (
      <div className="receipt-feed-empty">
        <div className="receipt-feed-empty-icon">📭</div>
        <p>No payments yet{provider ? ` for ${provider}` : ''}.</p>
        <p style={{ fontSize: 12, marginTop: 4 }}>Waiting for incoming transfers…</p>
      </div>
    );
  }

  return (
    <div className="receipt-list">
      {receipts.map((r) => (
        <ReceiptRow key={r.id} receipt={r} isNew={newIds.current.has(r.id)} />
      ))}
    </div>
  );
}
