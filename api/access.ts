import type { VercelRequest, VercelResponse } from '@vercel/node';

// Este endpoint verifica se o utilizador tem pagamento confirmado
// Por agora retorna pending porque o webhook do EscalePay ainda não foi configurado
// Quando o webhook estiver funcional, este endpoint deve consultar o banco de dados

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // TODO: Quando integrar Supabase, verificar sessão e status do pagamento
  // const sessionId = req.cookies.session_id;
  // const payment = await checkPaymentStatus(sessionId);

  // Por agora, retorna pending (o pagamento ainda não foi confirmado)
  return res.status(200).json({
    paid: false,
    status: 'pending',
    message: 'Aguardando confirmação do EscalePay. Configure o webhook para liberar acesso.',
  });
}