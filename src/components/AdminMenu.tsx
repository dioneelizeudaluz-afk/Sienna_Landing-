import { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

export default function AdminMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [token, setToken] = useState<string>('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('sienna_admin_token');
    if (saved) {
      setToken(saved);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAdminClick = () => {
    setMenuOpen(false);
    if (token) {
      setShowPanel(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLoginSuccess = (newToken: string) => {
    setToken(newToken);
    sessionStorage.setItem('sienna_admin_token', newToken);
    setShowLogin(false);
    setShowPanel(true);
  };

  const handleLogout = () => {
    setToken('');
    sessionStorage.removeItem('sienna_admin_token');
    setShowPanel(false);
  };

  return (
    <>
      <div ref={ref} style={{ position: 'absolute', top: 16, right: 16, zIndex: 150 }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          style={{
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid #1a1a1a',
            borderRadius: 10,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#6b7280',
            backdropFilter: 'blur(10px)',
          }}
        >
          <MoreVertical size={18} />
        </button>

        {menuOpen && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              right: 0,
              background: '#0a0a0a',
              border: '1px solid #1a1a1a',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.8)',
              minWidth: 140,
            }}
          >
            <button
              onClick={handleAdminClick}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 16px',
                background: 'transparent',
                border: 'none',
                color: '#d1d5db',
                fontSize: 14,
                fontWeight: 600,
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#f87171'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#d1d5db'; }}
            >
              Admin
            </button>
          </div>
        )}
      </div>

      {showLogin && (
        <AdminLogin
          onSuccess={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}

      {showPanel && token && (
        <AdminPanel
          token={token}
          onLogout={handleLogout}
          onClose={() => setShowPanel(false)}
        />
      )}
    </>
  );
}