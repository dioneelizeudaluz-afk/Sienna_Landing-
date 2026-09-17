import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

// Webhook do EscalePay
// Eventos esperados: Pagamento Confirmado, Pagamento Pendente, Pagamento Recusado,
// Assinatura Cancelada, Assinatura Reativada, Reembolso Concluído, Chargeback Recebido.
//
// IMPORTANTE:
// - NUNCA colocar ESCALEPAY_WEBHOOK_SECRET ou ESCALEPAY_API_KEY no código.
// - Adicionar as credenciais reais nas Environment Variables da Vercel.
// - Este ficheiro está preparado para receber esses valores via process.env.

const WEBHOOK_SECRET = process.env.ESCALEPAY_WEBHOOK_SECRET || '';

// Base em memória (temporária). Substituir por Supabase futuramente.
const payments: any[] = [];

function verifySignature(rawBody: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) return true; // Modo desenvolvimento
  const expected = crypto.createHmac('sha256', WEBHOOK_SECRET).update(rawBody).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  } catch {
    return false;
  }
}

function mapEventToStatus(event: string): string {
  switch (event) {
    case 'payment.confirmed':
    case 'payment.completed':
    case 'subscription.reactivated':
      return 'paid';
    case 'payment.pending':
      return 'pending';
    case 'payment.failed':
    case 'payment.declined':
      return 'failed';
    case 'payment.cancelled':
    case 'subscription.cancelled':
      return 'cancelled';
    case 'refund.completed':
    case 'chargeback.received':
      return 'refunded';
    default:
      return 'pending';
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rawBody = JSON.stringify(req.body);
    const signature = (req.headers['x-escalepay-signature'] as string) || '';

    if (WEBHOOK_SECRET && !verifySignature(rawBody, signature)) {
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { event, data } = req.body || {};
    const transactionId = data?.transaction_id || data?.id || 'unknown';

    // Idempotência
    const existing = payments.find(p => p.transaction_id === transactionId && p.event === event);
    if (existing) {
      return res.status(200).json({ ok: true, message: 'Already processed' });
    }

    const payment = {
      transaction_id: transactionId,
      event,
      status: mapEventToStatus(event),
      amount: Number(data?.amount || 0),
      currency: data?.currency || 'BRL',
      customer_reference: data?.customer_reference || data?.customer_email || '',
      created_at: new Date().toISOString(),
    };

    payments.push(payment);

    // TODO: Quando Supabase estiver configurado, substituir esta linha por:
    // await supabase.from('payments').upsert(payment);

    console.log('EscalePay webhook processado:', payment);

    return res.status(200).json({ ok: true, payment });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal error' });
  }
}