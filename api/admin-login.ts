import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

const ADMIN_ACCESS_CODE = process.env.ADMIN_ACCESS_CODE || '';

// Token secreto derivado do código (não expõe o código diretamente)
function generateToken(): string {
  const seed = ADMIN_ACCESS_CODE + '_sienna_secret_2024';
  return crypto.createHash('sha256').update(seed).digest('hex').substring(0, 32);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!ADMIN_ACCESS_CODE) {
    return res.status(500).json({ error: 'ADMIN_ACCESS_CODE não configurado na Vercel' });
  }

  const { code } = req.body || {};

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Código obrigatório' });
  }

  if (code.trim() !== ADMIN_ACCESS_CODE) {
    return res.status(401).json({ error: 'Código incorreto' });
  }

  // Retorna token (o frontend guarda em sessionStorage)
  return res.status(200).json({
    ok: true,
    token: generateToken(),
  });
}