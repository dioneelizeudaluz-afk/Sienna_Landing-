import { useLanguage } from '../hooks/useLanguage';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const { t } = useLanguage();

  return (
    <header style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(20px)', zIndex: 100, borderBottom: '1px solid rgba(220,38,38,0.2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, letterSpacing: 2, background: 'linear-gradient(135deg, #f87171, #dc2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SIENNA</h1>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#22c55e', fontWeight: 600 }}>
          <span className="online-dot"></span>
          {t('online')}
        </span>
      </div>
      <LanguageSelector />
    </header>
  );
}