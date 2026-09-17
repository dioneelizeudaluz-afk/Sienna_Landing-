import { useLanguage } from '../hooks/useLanguage';
import { CONFIG } from '../config/config';

export default function IntroScreen({ onContinue }: { onContinue: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', padding: '20px', maxWidth: 500, margin: '0 auto', width: '100%' }}>
      <div className="cover-frame" style={{ marginBottom: 24 }}>
        <img src="/sienna-cover.jpg" alt="Sienna" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = '<div style="padding:80px 20px;text-align:center;color:#666;background:#131320;border-radius:24px;font-size:13px;">Adiciona a imagem em /public/sienna-cover.jpg</div>'; }} />
      </div>

      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12, textAlign: 'center' }}>{t('intro_title')}</h2>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: '#9ca3af', textAlign: 'center', marginBottom: 32 }}>{t('intro_text')}</p>

      <button onClick={onContinue} className="btn-primary" style={{ marginTop: 'auto' }}>
        {t('continue')}
      </button>
    </div>
  );
}