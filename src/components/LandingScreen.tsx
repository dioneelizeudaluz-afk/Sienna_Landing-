import { useLanguage } from '../hooks/useLanguage';

export default function LandingScreen({ onStart }: { onStart: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', padding: '20px', maxWidth: 500, margin: '0 auto', width: '100%' }}>
      <div className="cover-frame" onClick={onStart} style={{ marginBottom: 20 }}>
        <img
          src="/sienna-cover.jpg"
          alt="Sienna"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement!;
            parent.innerHTML = '<div style="padding:120px 20px;text-align:center;color:#666;background:#1a0a0a;border-radius:24px;font-size:13px;">Adiciona a imagem em /public/sienna-cover.jpg</div>';
          }}
        />
      </div>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, background: 'linear-gradient(135deg, #f87171, #dc2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: 0.5 }}>
          ✨ {t('welcome_title')}
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#d1d5db', marginBottom: 8 }}>
          💋 {t('welcome_line1')}
        </p>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#f87171' }}>
          🔐 {t('welcome_line2')} 👀
        </p>
      </div>

      <p style={{ fontSize: 12, color: '#6b7280', textAlign: 'center', marginBottom: 12, fontStyle: 'italic' }}>
        {t('start_hint')}
      </p>

      <button onClick={onStart} className="btn-primary" style={{ marginTop: 'auto' }}>
        {t('start')}
      </button>
    </div>
  );
}