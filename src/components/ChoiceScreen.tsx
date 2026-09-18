import { useLanguage } from '../hooks/useLanguage';
import { CONFIG } from '../config/config';
import { ExternalLink, Crown } from 'lucide-react';
import BackButton from './BackButton';

export default function ChoiceScreen({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();

  const handlePreview = () => {
    window.open(CONFIG.PREVIEW_GROUP_URL, '_blank');
  };

  const handleCheckout = () => {
    window.open(CONFIG.CHECKOUT_URL, '_blank');
  };

  return (
    <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', padding: 20, maxWidth: 500, margin: '0 auto', width: '100%' }}>
      <BackButton onClick={onBack} />

      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, textAlign: 'center' }}>{t('choice_title')}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card-premium">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <ExternalLink size={20} color="#9ca3af" />
            <h3 style={{ fontSize: 18, fontWeight: 800 }}>{t('choice_preview_title')}</h3>
          </div>
          <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 16, lineHeight: 1.5 }}>{t('choice_preview_desc')}</p>
          <button onClick={handlePreview} className="btn-secondary">{t('choice_preview_cta')}</button>
        </div>

        <div className="card-premium" style={{ borderColor: 'rgba(220,38,38,0.4)', boxShadow: '0 8px 40px rgba(220,38,38,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <Crown size={20} color="#fbbf24" />
            <h3 style={{ fontSize: 18, fontWeight: 800 }}>{t('choice_vip_title')}</h3>
          </div>
          <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 16, lineHeight: 1.5 }}>{t('choice_vip_desc')}</p>
          <button onClick={handleCheckout} className="btn-primary">{t('choice_vip_cta')}</button>
        </div>
      </div>
    </div>
  );
}