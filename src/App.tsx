import { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingScreen from './components/LandingScreen';
import AgeGate from './components/AgeGate';
import Quiz from './components/Quiz';
import TelegramCheck from './components/TelegramCheck';
import ChoiceScreen from './components/ChoiceScreen';
import PaymentStatus from './components/PaymentStatus';
import type { Step } from './config/config';

export default function App() {
  const [step, setStep] = useState<Step>('landing');
  const [history, setHistory] = useState<Step[]>([]);

  const goTo = (next: Step) => {
    setHistory([...history, step]);
    setStep(next);
  };

  const goBack = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setStep(prev);
  };

  const render = () => {
    switch (step) {
      case 'landing':
        return <LandingScreen onStart={() => goTo('age')} />;
      case 'age':
        return <AgeGate onContinue={() => goTo('quiz1')} onBack={goBack} />;
      case 'quiz1':
        return (
          <Quiz
            step={1}
            totalSteps={3}
            questionKey="quiz1_title"
            options={[
              { key: 'quiz1_a', value: 'preview' },
              { key: 'quiz1_b', value: 'content' },
              { key: 'quiz1_c', value: 'vip' },
              { key: 'quiz1_d', value: 'all' },
            ]}
            onSelect={() => goTo('quiz2')}
            onBack={goBack}
          />
        );
      case 'quiz2':
        return (
          <Quiz
            step={2}
            totalSteps={3}
            questionKey="quiz2_title"
            options={[
              { key: 'quiz2_a', value: 'yes' },
              { key: 'quiz2_b', value: 'no' },
            ]}
            onSelect={() => goTo('quiz3')}
            onBack={goBack}
          />
        );
      case 'quiz3':
        return (
          <Quiz
            step={3}
            totalSteps={3}
            questionKey="quiz3_title"
            options={[
              { key: 'quiz3_a', value: 'continue' },
              { key: 'quiz3_b', value: 'preview' },
            ]}
            onSelect={() => goTo('telegram')}
            onBack={goBack}
          />
        );
      case 'telegram':
        return <TelegramCheck onContinue={() => goTo('choice')} onBack={goBack} />;
      case 'choice':
        return <ChoiceScreen onCheckout={() => goTo('payment')} onBack={goBack} />;
      case 'payment':
        return <PaymentStatus onBack={goBack} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 100%)' }}>
      <Header />
      {render()}
    </div>
  );
}