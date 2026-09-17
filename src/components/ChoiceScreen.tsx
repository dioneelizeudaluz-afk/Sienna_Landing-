import { useLanguage } from '../hooks/useLanguage';
import { CONFIG } from '../config/config';
import { ExternalLink, Sparkles } from 'lucide-react';

export default function ChoiceScreen({ onCheckout }: { onCheckout: () => void }) {
  const { t } = useLanguage();

  const handlePreview = () => {
    window.open(CONFIG.PREVIEW_GROUP_URL, '_blank');
  };

  const handleCheckout = () => {
    window.open(CONFIG.CHECKOUT_URL, '_blank');
    onCheckout();
  };

  return (
    <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', padding: 20, maxWidth: 500, margin: '0 auto', width: '100%' }}>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, textAlign: 'center' }}>{t('choice_title')}</h2>
      <p style={{ fontSize: 14, color: '#9ca3af', textAlign: 'center', marginBottom: 32 }}>Sienna</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="card-premium">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <ExternalLink size={20} color="#a78bfa" />
            <h3 style={{ fontSize: 18, fontWeight: 800 }}>{t('choice_preview_title')}</h3>
          </div>
          <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 16 }}>{t('choice_preview_desc')}</p>
          <button onClick={handlePreview} className="btn-secondary">{t('choice_preview_btn')}</button>
        </div>

        <div className="card-premium" style={{ borderColor: 'rgba(139,92,246,0.6)', boxShadow: '0 8px 40px rgba(139,92,246,0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <Sparkles size={20} color="#a78bfa" />
            <h3 style={{ fontSize: 18, fontWeight: 800 }}>{t('choice_full_title')}</h3>
          </div>
          <p style={{ fontSize: 14, color: '#9ca3af', marginBottom: 16 }}>{t('choice_full_desc')}</p>
          <button onClick={handleCheckout} className="btn-primary">{t('choice_full_btn')}</button>
        </div>
      </div>
    </div>
  );
}