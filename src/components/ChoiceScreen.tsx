import { useLanguage } from '../hooks/useLanguage';
import { CONFIG } from '../config/config';
import { Send } from 'lucide-react';
import BackButton from './BackButton';

export default function ChoiceScreen({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();

  const handleJoin = () => {
    window.open(CONFIG.PREVIEW_GROUP_URL, '_blank');
  };

  return (
    <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', padding: 20, maxWidth: 500, margin: '0 auto', width: '100%' }}>
      <BackButton onClick={onBack} />

      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12, textAlign: 'center' }}>{t('choice_title')}</h2>
      <p style={{ fontSize: 15, color: '#9ca3af', textAlign: 'center', marginBottom: 32, lineHeight: 1.6 }}>
        {t('choice_desc')}
      </p>

      <div className="card-premium" style={{ borderColor: 'rgba(220,38,38,0.4)', boxShadow: '0 8px 40px rgba(220,38,38,0.15)', textAlign: 'center' }}>
        <div
          style={{
            width: 64,
            height: 64,
            margin: '0 auto 20px',
            borderRadius: 20,
            background: 'rgba(220,38,38,0.15)',
            border: '1px solid rgba(220,38,38,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Send size={28} color="#f87171" />
        </div>

        <button onClick={handleJoin} className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {t('choice_group_cta')}
        </button>
      </div>
    </div>
  );
}