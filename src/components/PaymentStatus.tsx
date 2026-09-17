import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { RefreshCw, CheckCircle, BookOpen, Send } from 'lucide-react';
import BackButton from './BackButton';

type Status = 'checking' | 'pending' | 'paid' | 'failed' | 'cancelled';

export default function PaymentStatus({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>('checking');
  const [error, setError] = useState('');

  useEffect(() => {
    checkPayment();
  }, []);

  const checkPayment = async () => {
    setStatus('checking');
    setError('');
    try {
      const res = await fetch('/api/access', { credentials: 'include' });
      if (!res.ok) {
        setStatus('pending');
        return;
      }
      const data = await res.json();

      if (data.paid === true) setStatus('paid');
      else if (data.status === 'failed') setStatus('failed');
      else if (data.status === 'cancelled') setStatus('cancelled');
      else setStatus('pending');
    } catch (e) {
      setError(t('error_connection'));
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

  if (status === 'paid') {
    return (
      <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20, maxWidth: 500, margin: '0 auto', width: '100%' }}>
        <div className="card-premium" style={{ textAlign: 'center' }}>
          <CheckCircle size={60} color="#22c55e" style={{ marginBottom: 20 }} />
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>{t('payment_confirmed_title')}</h2>
          <p style={{ fontSize: 15, color: '#9ca3af', marginBottom: 32 }}>{t('payment_confirmed_text')}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <a href="/api/access?type=ebook" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <BookOpen size={18} />
                {t('access_ebook')}
              </button>
            </a>
            <a href="/api/access?type=telegram" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-green">
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
      <BackButton onClick={onBack} />
      <div className="card-premium" style={{ textAlign: 'center' }}>
        <RefreshCw size={48} color="#f59e0b" style={{ marginBottom: 20 }} />
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
          {status === 'failed' ? t('payment_failed') : status === 'cancelled' ? t('payment_cancelled') : t('payment_pending_title')}
        </h2>
        <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 24 }}>
          {status === 'pending' ? t('payment_pending_text') : ''}
        </p>
        {error && <p style={{ fontSize: 12, color: '#ef4444', marginBottom: 12 }}>{error}</p>}
        <button onClick={checkPayment} className="btn-primary">
          {t('payment_check_again')}
        </button>
      </div>
    </div>
  );
}