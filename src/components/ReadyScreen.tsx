import { useLanguage } from '../hooks/useLanguage';
import BackButton from './BackButton';

export default function ReadyScreen({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20, maxWidth: 500, margin: '0 auto', width: '100%' }}>
      <BackButton onClick={onBack} />
      <div className="card-premium" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 32, lineHeight: 1.4 }}>
          {t('ready_title')}
        </h2>
        <button onClick={onContinue} className="btn-primary">
          {t('ready_cta')}
        </button>
      </div>
    </div>
  );
}