import { useLanguage } from '../hooks/useLanguage';
import type { Language } from '../config/config';

export default function Header() {
  const { lang, changeLang } = useLanguage();
  const langs: { code: Language; label: string }[] = [
    { code: 'pt', label: 'PT' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
  ];

  return (
    <header style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(20px)', zIndex: 100, borderBottom: '1px solid rgba(220,38,38,0.2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, letterSpacing: 2, background: 'linear-gradient(135deg, #f87171, #dc2626)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SIENNA</h1>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#22c55e', fontWeight: 600 }}>
          <span className="online-dot"></span>
          Online
        </span>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {langs.map(l => (
          <button key={l.code} onClick={() => changeLang(l.code)} className={`lang-btn ${lang === l.code ? 'active' : ''}`}>
            {l.label}
          </button>
        ))}
      </div>
    </header>
  );
}