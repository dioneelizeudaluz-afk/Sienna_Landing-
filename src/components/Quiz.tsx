import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import BackButton from './BackButton';
import type { TranslationKey } from '../translations';

interface QuizProps {
  step: number;
  totalSteps: number;
  questionKey: TranslationKey;
  options: { key: TranslationKey; value: string }[];
  onSelect: (value: string) => void;
  onBack: () => void;
}

export default function Quiz({ step, totalSteps, questionKey, options, onSelect, onBack }: QuizProps) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (selected) onSelect(selected);
  };

  return (
    <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', padding: 20, maxWidth: 500, margin: '0 auto', width: '100%' }}>
      <BackButton onClick={onBack} />

      <div style={{ marginBottom: 30 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 12, color: '#9ca3af', fontWeight: 600 }}>
          <span>{t('quiz_progress')} {step} {t('quiz_of')} {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24, textAlign: 'center' }}>{t(questionKey)}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setSelected(opt.value)}
            className={`option-card ${selected === opt.value ? 'selected' : ''}`}
          >
            {t(opt.key)}
          </button>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={!selected}
        className="btn-primary"
        style={{ marginTop: 32, opacity: selected ? 1 : 0.5 }}
      >
        {t('quiz_continue')}
      </button>
    </div>
  );
}