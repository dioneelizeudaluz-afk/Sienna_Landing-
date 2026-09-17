import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

export default function Quiz({ onComplete }: { onComplete: () => void }) {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);

  const questions = [
    { q: t('quiz_q1'), opts: [t('quiz_q1_a'), t('quiz_q1_b'), t('quiz_q1_c')] },
    { q: t('quiz_q2'), opts: [t('quiz_q2_a'), t('quiz_q2_b'), t('quiz_q2_c')] },
    { q: t('quiz_q3'), opts: [t('quiz_q3_a'), t('quiz_q3_b'), t('quiz_q3_c')] },
    { q: t('quiz_q4'), opts: [t('quiz_q4_a'), t('quiz_q4_b')] },
  ];

  const [selected, setSelected] = useState<string | null>(null);

  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleNext = () => {
    if (!selected) return;
    if (step < questions.length - 1) {
      setStep(step + 1);
      setSelected(null);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', padding: 20, maxWidth: 500, margin: '0 auto', width: '100%' }}>
      <div style={{ marginBottom: 30 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 12, color: '#9ca3af', fontWeight: 600 }}>
          <span>{t('quiz_progress')} {step + 1} {t('quiz_of')} {questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24, textAlign: 'center' }}>{current.q}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {current.opts.map((opt, i) => (
          <button key={i} onClick={() => setSelected(opt)} className={`option-card ${selected === opt ? 'selected' : ''}`}>
            {opt}
          </button>
        ))}
      </div>

      <button onClick={handleNext} disabled={!selected} className="btn-primary" style={{ marginTop: 32, opacity: selected ? 1 : 0.5 }}>
        {step < questions.length - 1 ? t('continue') : t('quiz_done_btn')}
      </button>
    </div>
  );
}