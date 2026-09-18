import { useState, useEffect } from 'react';
import { X, LogOut, RefreshCw, Trash2, AlertTriangle } from 'lucide-react';

export default function AdminPanel({ token, onLogout, onClose }: { token: string; onLogout: () => void; onClose: () => void }) {
  const [stats, setStats] = useState({ total: 0, today: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [resetting, setResetting] = useState(false);

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

  const handleReset = async (scope: 'today' | 'total' | 'all') => {
    setResetting(true);
    try {
      const res = await fetch('/api/admin-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify({ scope }),
      });

      if (res.ok) {
        setShowReset(false);
        await loadStats();
      } else {
        const data = await res.json();
        setError(data.error || 'Erro ao limpar');
      }
    } catch (e) {
      setError('Erro de conexão');
    } finally {
      setResetting(false);
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
          onClick={() => setShowReset(true)}
          disabled={loading || resetting}
          className="btn-secondary"
          style={{
            marginTop: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            borderColor: 'rgba(239,68,68,0.4)',
            color: '#f87171',
          }}
        >
          <Trash2 size={16} />
          RESET
        </button>

        <button
          onClick={onLogout}
          className="btn-secondary"
          style={{
            marginTop: 12,
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

      {showReset && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.9)',
            backdropFilter: 'blur(10px)',
            zIndex: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            className="card-premium"
            style={{
              width: '100%',
              maxWidth: 400,
              borderColor: 'rgba(239,68,68,0.4)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  margin: '0 auto 16px',
                  borderRadius: 16,
                  background: 'rgba(239,68,68,0.15)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AlertTriangle size={24} color="#f87171" />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>Reset Contadores</h3>
              <p style={{ fontSize: 13, color: '#9ca3af' }}>Escolhe o que queres limpar</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={() => handleReset('today')}
                disabled={resetting}
                className="btn-secondary"
                style={{ padding: 14, fontSize: 14 }}
              >
                Limpar apenas HOJE
              </button>
              <button
                onClick={() => handleReset('total')}
                disabled={resetting}
                className="btn-secondary"
                style={{ padding: 14, fontSize: 14 }}
              >
                Limpar apenas TOTAL
              </button>
              <button
                onClick={() => handleReset('all')}
                disabled={resetting}
                className="btn-primary"
                style={{ padding: 14, fontSize: 14, background: 'linear-gradient(135deg, #dc2626, #991b1b)' }}
              >
                {resetting ? 'A LIMPAR...' : 'Limpar TUDO'}
              </button>
              <button
                onClick={() => setShowReset(false)}
                disabled={resetting}
                style={{
                  padding: 14,
                  fontSize: 14,
                  background: 'transparent',
                  border: '1px solid #1a1a1a',
                  borderRadius: 12,
                  color: '#9ca3af',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}