import { useState, useEffect } from 'react';
import { X, LogOut, RefreshCw } from 'lucide-react';

export default function AdminPanel({ token, onLogout, onClose }: { token: string; onLogout: () => void; onClose: () => void }) {
  const [stats, setStats] = useState({ total: 0, today: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin-stats', {
        headers: { 'x-admin-token': token },
      });
      const data = await res.json();
      if (res.ok) {
        setStats({ total: data.total || 0, today: data.today || 0 });
      } else {
        setError(data.error || 'Erro ao carregar');
      }
    } catch (e) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        zIndex: 400,
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #1a1a1a',
        }}
      >
        <h1
          style={{
            fontSize: 18,
            fontWeight: 900,
            letterSpacing: 2,
            background: 'linear-gradient(135deg, #f87171, #dc2626)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ADMIN
        </h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={loadStats}
            style={{
              background: 'transparent',
              border: '1px solid #1a1a1a',
              color: '#6b7280',
              borderRadius: 8,
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Refresh"
          >
            <RefreshCw size={16} />
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid #1a1a1a',
              color: '#6b7280',
              borderRadius: 8,
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Fechar"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
        <h2
          style={{
            fontSize: 14,
            color: '#6b7280',
            letterSpacing: 1.5,
            fontWeight: 700,
            marginBottom: 16,
            marginTop: 20,
          }}
        >
          START CLICKS
        </h2>

        {loading ? (
          <div className="card-premium" style={{ textAlign: 'center', padding: 40 }}>
            <p style={{ color: '#6b7280', fontSize: 14 }}>A carregar...</p>
          </div>
        ) : error ? (
          <div
            className="card-premium"
            style={{ borderColor: 'rgba(239,68,68,0.3)', textAlign: 'center', padding: 20 }}
          >
            <p style={{ color: '#f87171', fontSize: 14 }}>{error}</p>
          </div>
        ) : (
          <>
            <div
              className="card-premium"
              style={{
                textAlign: 'center',
                padding: 40,
                marginBottom: 20,
                borderColor: 'rgba(220,38,38,0.3)',
                boxShadow: '0 8px 40px rgba(220,38,38,0.15)',
              }}
            >
              <p
                style={{
                  fontSize: 64,
                  fontWeight: 900,
                  background: 'linear-gradient(135deg, #f87171, #dc2626)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1,
                }}
              >
                {stats.total.toLocaleString('pt-BR')}
              </p>
            </div>

            <h2
              style={{
                fontSize: 14,
                color: '#6b7280',
                letterSpacing: 1.5,
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              TODAY
            </h2>
            <div className="card-premium" style={{ textAlign: 'center', padding: 30 }}>
              <p
                style={{
                  fontSize: 42,
                  fontWeight: 900,
                  color: '#fff',
                  lineHeight: 1,
                }}
              >
                {stats.today.toLocaleString('pt-BR')}
              </p>
            </div>
          </>
        )}

        <button
          onClick={onLogout}
          className="btn-secondary"
          style={{
            marginTop: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <LogOut size={16} />
          LOGOUT
        </button>
      </div>
    </div>
  );
}