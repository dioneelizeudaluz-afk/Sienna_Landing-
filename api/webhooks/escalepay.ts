import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

// Webhook do EscalePay
// Recebe eventos: Pagamento Confirmado, Pendente, Recusado, Assinatura Cancelada, Reativada, Reembolso, Chargeback

const WEBHOOK_SECRET = process.env.ESCALEPAY_WEBHOOK_SECRET || '';
const API_KEY = process.env.ESCALEPAY_API_KEY || '';

// Base de dados temporária em memória (substituir por Supabase depois)
const payments: any[] = [];

function verifySignature(payload: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) return true; // Se não tem secret configurado, aceita (modo desenvolvimento)
  
  const expected = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rawBody = JSON.stringify(req.body);
    const signature = (req.headers['x-escalepay-signature'] as string) || '';

    // Verificar assinatura se o secret estiver configurado
    if (WEBHOOK_SECRET && !verifySignature(rawBody, signature)) {
      console.error('Assinatura inválida');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const { event, data } = req.body;

    console.log('EscalePay Webhook:', event);

    const transactionId = data?.transaction_id || data?.id;

    // Idempotência: verificar se já processamos esta transação
    const existing = payments.find(p => p.transaction_id === transactionId && p.event === event);
    if (existing) {
      return res.status(200).json({ ok: true, message: 'Already processed' });
    }

    const payment = {
      transaction_id: transactionId,
      event,
      status: 'pending',
      amount: data?.amount || 0,
      currency: data?.currency || 'BRL',
      customer_reference: data?.customer_reference || data?.customer_email || '',
      created_at: new Date().toISOString(),
    };

    // Mapear eventos para status
    switch (event) {
      case 'payment.confirmed':
      case 'payment.completed':
        payment.status = 'paid';
        break;
      case 'payment.pending':
        payment.status = 'pending';
        break;
      case 'payment.failed':
      case 'payment.declined':
        payment.status = 'failed';
        break;
      case 'payment.cancelled':
      case 'subscription.cancelled':
        payment.status = 'cancelled';
        break;
      case 'subscription.reactivated':
        payment.status = 'paid';
        break;
      case 'refund.completed':
      case 'chargeback.received':
        payment.status = 'refunded';
        break;
    }

    payments.push(payment);

    // TODO: Salvar no Supabase quando estiver configurado
    // await supabase.from('payments').insert(payment);

    return res.status(200).json({ ok: true, payment });
  } catch (error) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: 'Internal error' });
  }
}