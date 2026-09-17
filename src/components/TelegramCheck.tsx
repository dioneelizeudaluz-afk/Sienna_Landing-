import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { CONFIG } from '../config/config';

export default function TelegramCheck({ onContinue }: { onContinue: () => void }) {
  const { t } = useLanguage();
  const [noTelegram, setNoTelegram] = useState(false);

  return (
    <div className="fade-in" style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20, maxWidth: 500, margin: '0 auto', width: '100%' }}>
      <div className="card-premium">
        {!noTelegram ? (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 24, textAlign: 'center' }}>{t('telegram_title')}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button onClick={onContinue} className="btn-primary">{t('telegram_yes')}</button>
              <button onClick={() => setNoTelegram(true)} className="btn-secondary">{t('telegram_no')}</button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 20, textAlign: 'center' }}>{t('telegram_need')}</h2>
            <a href={CONFIG.TELEGRAM_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <button className="btn-primary" style={{ marginBottom: 12 }}>{t('telegram_download')}</button>
            </a>
            <button onClick={() => setNoTelegram(false)} className="btn-secondary">{t('telegram_back')}</button>
          </>
        )}
      </div>
    </div>
  );
}