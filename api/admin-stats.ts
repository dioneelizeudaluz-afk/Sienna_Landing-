import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';
import crypto from 'crypto';

const ADMIN_ACCESS_CODE = process.env.ADMIN_ACCESS_CODE || '';

const redis = new Redis({
  url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

function generateToken(): string {
  const seed = ADMIN_ACCESS_CODE + '_sienna_secret_2024';
  return crypto.createHash('sha256').update(seed).digest('hex').substring(0, 32);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = (req.headers['x-admin-token'] as string) || '';
  const expected = generateToken();

  if (!auth || auth !== expected) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  try {
    const now = new Date();
    const todayKey = `start_today_${now.getUTCFullYear()}_${now.getUTCMonth() + 1}_${now.getUTCDate()}`;

    const [total, today] = await Promise.all([
      redis.get<number>('start_total'),
      redis.get<number>(todayKey),
    ]);

    return res.status(200).json({
      total: total || 0,
      today: today || 0,
    });
  } catch (error) {
    console.error('admin-stats error:', error);
    return res.status(500).json({ error: 'Erro ao obter estatísticas' });
  }
}