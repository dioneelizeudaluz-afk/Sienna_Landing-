import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import BackButton from './BackButton';

export default function AgeGate({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) {
  const { t } = useLanguage();
  const [blocked, setBlocked] = useState(false);

  if (blocked) {
    return (
      <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20, maxWidth: 500, margin: '0 auto', width: '100%' }}>
        <BackButton onClick={() => setBlocked(false)} />
        <div className="card-premium" style={{ textAlign: 'center' }}>
          <div className="age-emoji">🔞</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, color: '#ef4444' }}>{t('age_blocked_title')}</h2>
          <p style={{ fontSize: 15, color: '#9ca3af', marginBottom: 24 }}>{t('age_blocked_text')}</p>
          <button onClick={() => window.location.href = 'https://google.com'} className="btn-secondary">
            {t('age_exit')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20, maxWidth: 500, margin: '0 auto', width: '100%' }}>
      <BackButton onClick={onBack} />
      <div className="card-premium" style={{ textAlign: 'center' }}>
        <div className="age-emoji">🔞</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24 }}>{t('age_title')}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={onContinue} className="btn-primary">{t('age_yes')}</button>
          <button onClick={() => setBlocked(true)} className="btn-secondary">{t('age_no')}</button>
        </div>
      </div>
    </div>
  );
}