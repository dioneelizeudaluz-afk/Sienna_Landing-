import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { CONFIG } from '../config/config';

export default function AgeGate({ onContinue }: { onContinue: () => void }) {
  const { t } = useLanguage();
  const [blocked, setBlocked] = useState(false);

  if (blocked) {
    return (
      <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20, maxWidth: 500, margin: '0 auto', width: '100%' }}>
        <div className="card-premium" style={{ textAlign: 'center', width: '100%' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16, color: '#ef4444' }}>{t('age_blocked')}</h2>
          <button onClick={() => window.location.href = 'https://google.com'} className="btn-secondary" style={{ marginTop: 16 }}>
            {t('age_back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20, maxWidth: 500, margin: '0 auto', width: '100%' }}>
      <div className="card-premium" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>{t('age_title')}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={onContinue} className="btn-primary">{t('age_yes')}</button>
          <button onClick={() => setBlocked(true)} className="btn-secondary">{t('age_no')}</button>
        </div>
      </div>
    </div>
  );
}