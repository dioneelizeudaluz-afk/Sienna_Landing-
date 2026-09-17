import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { CONFIG } from '../config/config';
import { BookOpen, Send, CheckCircle, RefreshCw } from 'lucide-react';

type Status = 'checking' | 'paid' | 'pending' | 'failed';

export default function PaymentStatus() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>('checking');
  const [hasPaid, setHasPaid] = useState(false);

  useEffect(() => {
    checkPayment();
  }, []);

  const checkPayment = async () => {
    setStatus('checking');
    try {
      const res = await fetch('/api/access');
      if (res.ok) {
        const data = await res.json();
        if (data.paid) {
          setStatus('paid');
          setHasPaid(true);
          return;
        }
      }
      setStatus('pending');
    } catch {
      setStatus('pending');
    }
  };

  if (status === 'checking') {
    return (
      <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20, maxWidth: 500, margin: '0 auto', width: '100%' }}>
        <div className="spinner" style={{ marginBottom: 20 }}></div>
        <p style={{ color: '#9ca3af', fontSize: 15 }}>{t('payment_checking')}</p>
      </div>
    );
  }

  if (status === 'paid' || hasPaid) {
    return (
      <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20, maxWidth: 500, margin: '0 auto', width: '100%' }}>
        <div className="card-premium" style={{ textAlign: 'center' }}>
          <CheckCircle size={60} color="#22c55e" style={{ marginBottom: 20 }} />
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{t('payment_confirmed')}</h2>
          <p style={{ fontSize: 15, color: '#9ca3af', marginBottom: 32 }}>{t('payment_ready')}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href={CONFIG.EBOOK_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <BookOpen size={18} />
                {t('access_ebook')}
              </button>
            </a>
            <a href={CONFIG.MAIN_TELEGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-green" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <Send size={18} />
                {t('access_telegram')}
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20, maxWidth: 500, margin: '0 auto', width: '100%' }}>
      <div className="card-premium" style={{ textAlign: 'center' }}>
        <RefreshCw size={48} color="#f59e0b" style={{ marginBottom: 20 }} />
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>{t('payment_pending')}</h2>
        <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 24 }}>
          {status === 'failed' ? t('payment_failed') : t('payment_pending')}
        </p>
        <button onClick={checkPayment} className="btn-primary" style={{ marginBottom: 12 }}>
          {t('payment_check_again')}
        </button>
        <div style={{ marginTop: 20, padding: 16, background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: 12 }}>
          <p style={{ fontSize: 13, color: '#a78bfa', marginBottom: 4, fontWeight: 700 }}>{t('payment_proof')}</p>
          <p style={{ fontSize: 12, color: '#9ca3af' }}>{t('payment_proof_desc')}</p>
        </div>
      </div>
    </div>
  );
}