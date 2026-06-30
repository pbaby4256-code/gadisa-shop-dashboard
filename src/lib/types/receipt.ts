// Mirrors the Flutter ReceiptModel and the `receipts` table / employee view.
// Note: balance_after and raw_sms are intentionally NOT included here —
// the employee dashboard reads from employee_receipts_view, which doesn't
// expose those columns at all.

export type Provider = 'CBE' | 'telebirr' | 'BOA' | 'Awash';

export interface Receipt {
  id: string;
  provider: Provider;
  amount: number;
  payer_name: string | null;
  payer_account_masked: string | null;
  reference_no: string | null;
  receipt_url: string | null;
  received_at: string; // ISO timestamp
  status: string;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string | null;
  role: 'owner' | 'employee';
}
