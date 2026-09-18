import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';
import crypto from 'crypto';

const ADMIN_ACCESS_CODE = process.env.ADMIN_ACCESS_CODE || '';

function getRedis() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';
  if (!url || !token) {
    throw new Error('Redis env vars não configuradas');
  }
  return new Redis({ url, token });
}

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
    const redis = getRedis();
    const { scope } = req.body || {};

    const now = new Date();
    const todayKey = `start_today_${now.getUTCFullYear()}_${now.getUTCMonth() + 1}_${now.getUTCDate()}`;

    if (scope === 'today') {
      await redis.del(todayKey);
      return res.status(200).json({ ok: true, message: 'Hoje limpo' });
    }

    if (scope === 'total') {
      await redis.del('start_total');
      return res.status(200).json({ ok: true, message: 'Total limpo' });
    }

    if (scope === 'all') {
      await redis.del('start_total');
      await redis.del(todayKey);
      return res.status(200).json({ ok: true, message: 'Tudo limpo' });
    }

    return res.status(400).json({ error: 'Scope inválido: ' + String(scope) });
  } catch (error: any) {
    console.error('admin-reset ERROR:', error);
    return res.status(500).json({ 
      error: 'Erro ao limpar',
      detail: error?.message || String(error),
    });
  }
}