import type { VercelRequest, VercelResponse } from '@vercel/node';

// Este endpoint verifica se o utilizador tem pagamento confirmado.
// Por agora retorna { paid: false } porque o webhook do EscalePay ainda não está configurado.
// Quando o webhook estiver funcional e as credenciais estiverem na Vercel, este endpoint
// deve consultar o banco de dados e verificar se o pagamento associado à sessão está confirmado.

const EBOOK_URL = process.env.EBOOK_URL || 'COLOCAR_LINK_DO_EBOOK_AQUI';
const MAIN_TELEGRAM_URL = 'https://t.me/+FuoS4pIVDuAyM2M8';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type } = req.query;

  // Estado atual: não há pagamento confirmado (webhook ainda não configurado)
  const paid = false;

  if (!paid) {
    return res.status(403).json({
      paid: false,
      status: 'pending',
      error: 'Pagamento ainda não foi confirmado',
      message: 'Aguarda a confirmação do EscalePay via webhook. Configure ESCALEPAY_WEBHOOK_SECRET na Vercel.',
    });
  }

  // Só chega aqui se paid for true (futuro)
  if (type === 'ebook') {
    return res.status(200).json({ paid: true, url: EBOOK_URL });
  }

  if (type === 'telegram') {
    return res.status(200).json({ paid: true, url: MAIN_TELEGRAM_URL });
  }

  return res.status(200).json({ paid: true });
}