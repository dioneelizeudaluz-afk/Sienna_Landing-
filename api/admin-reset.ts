import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';
import crypto from 'crypto';

const ADMIN_ACCESS_CODE = process.env.ADMIN_ACCESS_CODE || '';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

function generateToken(): string {
  const seed = ADMIN_ACCESS_CODE + '_sienna_secret_2024';
  return crypto.createHash('sha256').update(seed).digest('hex').substring(0, 32);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = (req.headers['x-admin-token'] as string) || '';
  const expected = generateToken();

  if (!auth || auth !== expected) {
    return res.status(403).json({ error: 'Acesso negado' });
  }

  try {
    const { scope } = req.body || {};

    if (scope === 'today') {
      const now = new Date();
      const todayKey = `start_today_${now.getUTCFullYear()}_${now.getUTCMonth() + 1}_${now.getUTCDate()}`;
      await redis.del(todayKey);
      return res.status(200).json({ ok: true, message: 'Contador de hoje limpo' });
    }

    if (scope === 'total') {
      await redis.del('start_total');
      return res.status(200).json({ ok: true, message: 'Contador total limpo' });
    }

    if (scope === 'all') {
      const keys = await redis.keys('start_*');
      if (keys.length > 0) {
        await redis.del(...keys);
      }
      return res.status(200).json({ ok: true, message: 'Todos os contadores limpos' });
    }

    return res.status(400).json({ error: 'Scope inválido. Usa: today, total ou all' });
  } catch (error) {
    console.error('admin-reset error:', error);
    return res.status(500).json({ error: 'Erro ao limpar' });
  }
}