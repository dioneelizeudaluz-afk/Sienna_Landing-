import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const now = new Date();
    const todayKey = `start_today_${now.getUTCFullYear()}_${now.getUTCMonth() + 1}_${now.getUTCDate()}`;

    const [total, today] = await Promise.all([
      redis.incr('start_total'),
      redis.incr(todayKey),
    ]);

    await redis.expire(todayKey, 60 * 60 * 24 * 7);

    return res.status(200).json({ total, today });
  } catch (error) {
    console.error('track-start error:', error);
    return res.status(500).json({ error: 'Tracking failed' });
  }
}