import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function BackButton({ onClick }: { onClick: () => void }) {
  const { t } = useLanguage();
  return (
    <button onClick={onClick} className="btn-back" style={{ marginBottom: 20 }}>
      <ArrowLeft size={16} />
      {t('back')}
    </button>
  );
}