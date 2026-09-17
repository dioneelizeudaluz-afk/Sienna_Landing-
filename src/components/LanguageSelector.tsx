import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { LANGUAGES } from '../translations';
import { ChevronDown } from 'lucide-react';

export default function LanguageSelector() {
  const { lang, changeLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '8px 12px',
          background: 'rgba(220,38,38,0.1)',
          border: '1px solid rgba(220,38,38,0.3)',
          borderRadius: 10,
          color: '#fff',
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <span style={{ fontSize: 16 }}>{current.flag}</span>
        <span>{current.label}</span>
        <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            background: '#0f0505',
            border: '1px solid rgba(220,38,38,0.3)',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 10px 40px rgba(0,0,0,0.6)',
            minWidth: 160,
            zIndex: 200,
          }}
        >
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              onClick={() => {
                changeLang(l.code);
                setOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '12px 16px',
                background: lang === l.code ? 'rgba(220,38,38,0.2)' : 'transparent',
                border: 'none',
                color: lang === l.code ? '#f87171' : '#d1d5db',
                fontSize: 14,
                fontWeight: lang === l.code ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 18 }}>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}