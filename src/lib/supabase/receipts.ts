import { createClient } from './client';
import type { Receipt, Provider } from '../types/receipt';

/// Employees and the owner both call these for the initial list — the
/// `employee_receipts_view` never exposes balance_after or raw_sms.
///
/// For realtime updates, we subscribe to `receipt_alerts` instead of
/// `receipts` directly. This matters: Supabase Realtime delivers full
/// table rows to anyone with table-level SELECT, bypassing column
/// restrictions that views normally provide. `receipt_alerts` is a
/// narrow table (populated by a database trigger) that physically never
/// contains balance_after or raw_sms — so there's nothing sensitive to
/// leak even if a future code change forgets to filter it client-side.

export async function fetchReceipts(options?: {
  provider?: Provider;
  search?: string;
  limit?: number;
}): Promise<Receipt[]> {
  const supabase = createClient();

  let query = supabase
    .from('employee_receipts_view')
    .select('*')
    .order('received_at', { ascending: false })
    .limit(options?.limit ?? 50);

  if (options?.provider) {
    query = query.eq('provider', options.provider);
  }

  if (options?.search) {
    query = query.or(
      `payer_name.ilike.%${options.search}%,reference_no.ilike.%${options.search}%`
    );
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Receipt[];
}

export function subscribeToReceipts(onInsert: (receipt: Receipt) => void) {
  const supabase = createClient();

  const channel = supabase
    .channel('receipt-alerts-realtime')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'receipt_alerts' },
      (payload) => {
        onInsert(payload.new as Receipt);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
