import React, { useState } from 'react';
import { ViewState } from './types';
import { Language } from './i18n';
import { LandingPage } from './landing/LandingPage';
import { Dashboard } from './dashboard/Dashboard';

export default function App() {
  const [viewState, setViewState] = useState<ViewState>('landing');
  const [lang, setLang] = useState<Language>('zh');

  const enterApp = () => setViewState('terminal');
  const logout = () => setViewState('landing');

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30">
      {viewState === 'landing' ? (
        <LandingPage onEnter={enterApp} lang={lang} setLang={setLang} />
      ) : (
        <Dashboard onLogout={logout} lang={lang} />
      )}
    </div>
  );
}
