import { useLanguage } from '../hooks/useLanguage';
import { CONFIG } from '../config/config';
import AdminMenu from './AdminMenu';

export default function HomeScreen({ onStart }: { onStart: () => void }) {
  const { t } = useLanguage();

  const handleStart = () => {
    // Registar clique no backend (não bloqueia navegação)
    fetch('/api/track-start', { method: 'POST' }).catch(() => {
      // falha silenciosa - não bloqueia o utilizador
    });
    onStart();
  };

  return (
    <div className="home-screen fade-in">
      <AdminMenu />

      <video
        className="home-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={CONFIG.BACKGROUND_VIDEO} type="video/mp4" />
      </video>

      <div className="home-overlay" />

      <div className="home-content">
        <div className="cover-frame" onClick={handleStart} style={{ marginBottom: 20 }}>
          <img
            src={CONFIG.COVER_IMAGE}
            alt="Sienna"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement!;
              parent.innerHTML = '<div style="padding:120px 20px;text-align:center;color:#666;background:#0a0a0a;border-radius:24px;font-size:13px;">Adiciona a imagem em /public/sienna-cover.jpg</div>';
            }}
          />
        </div>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h1 style={{
            fontSize: 34,
            fontWeight: 900,
            letterSpacing: 6,
            marginBottom: 8,
            background: 'linear-gradient(135deg, #f87171, #dc2626)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {t('sienna_name')}
          </h1>
          <p style={{ fontSize: 13, color: '#9ca3af', fontStyle: 'italic', marginBottom: 16 }}>
            {t('sienna_tagline')}
          </p>
          <p style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: '#e5e5e5',
            maxWidth: 340,
            margin: '0 auto',
          }}>
            {t('home_description')}
          </p>
        </div>

        <button onClick={handleStart} className="btn-primary" style={{ maxWidth: 340, margin: '0 auto' }}>
          {t('home_cta')}
        </button>
      </div>
    </div>
  );
}