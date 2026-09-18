import { useState } from 'react';
import { X, Lock } from 'lucide-react';

export default function AdminLogin({ onSuccess, onClose }: { onSuccess: (token: string) => void; onClose: () => void }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!code.trim()) {
      setError('Digite o código');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.ok && data.token) {
        onSuccess(data.token);
      } else {
        setError(data.error || 'Código incorreto');
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
        background: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(10px)',
        zIndex: 300,
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
          maxWidth: 380,
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            background: 'transparent',
            border: 'none',
            color: '#6b7280',
            cursor: 'pointer',
            padding: 4,
          }}
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div
            style={{
              width: 56,
              height: 56,
              margin: '0 auto 16px',
              borderRadius: 16,
              background: 'rgba(220,38,38,0.15)',
              border: '1px solid rgba(220,38,38,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Lock size={24} color="#f87171" />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Admin Access</h2>
          <p style={{ fontSize: 13, color: '#6b7280' }}>Insere o código de acesso</p>
        </div>

        <label style={{ fontSize: 11, color: '#6b7280', display: 'block', marginBottom: 6, fontWeight: 600 }}>
          ACCESS CODE
        </label>
        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
          placeholder="••••••••"
          autoFocus
          style={{
            width: '100%',
            padding: '14px 16px',
            background: '#000',
            border: '1px solid #1a1a1a',
            borderRadius: 10,
            color: '#fff',
            fontSize: 15,
            outline: 'none',
            marginBottom: 12,
          }}
        />

        {error && (
          <div
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#f87171',
              padding: 10,
              borderRadius: 8,
              fontSize: 13,
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="btn-primary"
          style={{ opacity: loading ? 0.6 : 1 }}
        >
          {loading ? 'A VERIFICAR...' : 'LOGIN'}
        </button>
      </div>
    </div>
  );
}