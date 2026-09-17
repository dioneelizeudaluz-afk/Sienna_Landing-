import { useLanguage } from '../hooks/useLanguage';

export default function LandingScreen({ onStart }: { onStart: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', padding: '20px', maxWidth: 500, margin: '0 auto', width: '100%' }}>
      <div className="cover-frame" onClick={onStart} style={{ marginBottom: 24 }}>
        <img
          src="/sienna-cover.jpg"
          alt="Sienna"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement!;
            parent.innerHTML = '<div style="padding:120px 20px;text-align:center;color:#666;background:#131320;border-radius:24px;font-size:13px;">Adiciona a imagem em /public/sienna-cover.jpg</div>';
          }}
        />
      </div>

      <p style={{ fontSize: 13, color: '#6b7280', textAlign: 'center', marginBottom: 16, fontStyle: 'italic' }}>
        {t('start_hint')}
      </p>

      <button onClick={onStart} className="btn-primary" style={{ marginTop: 'auto' }}>
        {t('start')}
      </button>
    </div>
  );
}