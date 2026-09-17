import { useState } from 'react';
import Header from './components/Header';
import IntroScreen from './components/IntroScreen';
import AgeGate from './components/AgeGate';
import Quiz from './components/Quiz';
import TelegramCheck from './components/TelegramCheck';
import ChoiceScreen from './components/ChoiceScreen';
import PaymentStatus from './components/PaymentStatus';

type Step = 'landing' | 'intro' | 'age' | 'quiz' | 'telegram' | 'choice' | 'payment';

export default function App() {
  const [step, setStep] = useState<Step>('landing');

  const renderStep = () => {
    switch (step) {
      case 'landing':
        return <Landing onStart={() => setStep('intro')} />;
      case 'intro':
        return <IntroScreen onContinue={() => setStep('age')} />;
      case 'age':
        return <AgeGate onContinue={() => setStep('quiz')} />;
      case 'quiz':
        return <Quiz onComplete={() => setStep('telegram')} />;
      case 'telegram':
        return <TelegramCheck onContinue={() => setStep('choice')} />;
      case 'choice':
        return <ChoiceScreen onCheckout={() => setStep('payment')} />;
      case 'payment':
        return <PaymentStatus />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 100%)' }}>
      <Header />
      {renderStep()}
    </div>
  );
}

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', padding: '20px', maxWidth: 500, margin: '0 auto', width: '100%' }}>
      <div className="cover-frame" style={{ marginBottom: 32 }}>
        <img src="/sienna-cover.jpg" alt="Sienna" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).parentElement!.innerHTML = '<div style="padding:120px 20px;text-align:center;color:#666;background:#131320;border-radius:24px;font-size:13px;">Adiciona a imagem em /public/sienna-cover.jpg</div>'; }} />
      </div>
      <button onClick={onStart} className="btn-primary" style={{ marginTop: 'auto' }}>
        COMEÇAR
      </button>
    </div>
  );
}