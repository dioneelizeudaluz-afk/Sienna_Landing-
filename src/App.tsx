import { useState } from 'react';
import { LanguageProvider } from './hooks/LanguageProvider';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import AgeGate from './components/AgeGate';
import ReadyScreen from './components/ReadyScreen';
import ChoiceScreen from './components/ChoiceScreen';
import type { Step } from './config/config';

function AppContent() {
  const [step, setStep] = useState<Step>('home');
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
      case 'home':
        return <HomeScreen onStart={() => goTo('age')} />;
      case 'age':
        return <AgeGate onContinue={() => goTo('ready')} onBack={goBack} />;
      case 'ready':
        return <ReadyScreen onContinue={() => goTo('choice')} onBack={goBack} />;
      case 'choice':
        return <ChoiceScreen onBack={goBack} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000000' }}>
      <Header />
      {render()}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}