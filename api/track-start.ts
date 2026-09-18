import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const now = new Date();
    const todayKey = `start_today_${now.getUTCFullYear()}_${now.getUTCMonth() + 1}_${now.getUTCDate()}`;

    const [total, today] = await Promise.all([
      kv.incr('start_total'),
      kv.incr(todayKey),
    ]);

    // Expira a chave do dia após 7 dias
    await kv.expire(todayKey, 60 * 60 * 24 * 7);

    return res.status(200).json({ total, today });
  } catch (error) {
    console.error('track-start error:', error);
    return res.status(500).json({ error: 'Tracking failed' });
  }
}