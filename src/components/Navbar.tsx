import React from 'react';
import {
  LayoutDashboard,
  ListTodo,
  Sparkles,
  CalendarClock,
  ShieldCheck,
  Sun,
  Moon,
  Languages
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export type ActiveTab = 'dashboard' | 'tasks' | 'recommendation' | 'schedule';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  pendingCount: number;
  conflictCount: number;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  pendingCount,
  conflictCount,
  theme,
  setTheme
}) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
      <header className="occ-nav">
        {/* Brand Title: "RailOpt" */}
        <div className="brand-badge">
          <div className="brand-icon">
            <ShieldCheck size={22} />
          </div>
          <div>
            <div className="brand-title">{t('common.brandName')}</div>
            <div className="brand-sub">{t('common.brandSub')}</div>
          </div>
        </div>

        {/* Desktop Main Nav Tabs (hidden on mobile <= 768px) */}
        <nav className="nav-links desktop-nav-links" aria-label="Main Navigation">
          <button
            type="button"
            className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
            title={t('nav.dashboard')}
            aria-label={t('nav.dashboard')}
          >
            <div className="nav-icon-wrapper">
              <LayoutDashboard size={18} />
            </div>
            <span>{t('nav.dashboard')}</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
            title={t('nav.tasks')}
            aria-label={t('nav.tasks')}
          >
            <div className="nav-icon-wrapper">
              <ListTodo size={18} />
              {pendingCount > 0 && <span className="nav-badge-dot" />}
            </div>
            <span>{t('nav.tasks')}</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'recommendation' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommendation')}
            title={t('nav.recommendation')}
            aria-label={t('nav.recommendation')}
          >
            <div className="nav-icon-wrapper">
              <Sparkles size={18} />
            </div>
            <span>{t('nav.recommendation')}</span>
          </button>

          <button
            type="button"
            className={`nav-item ${activeTab === 'schedule' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedule')}
            title={t('nav.schedule')}
            aria-label={t('nav.schedule')}
          >
            <div className="nav-icon-wrapper">
              <CalendarClock size={18} />
              {conflictCount > 0 && <span className="nav-badge-dot" />}
            </div>
            <span>{t('nav.schedule')}</span>
          </button>
        </nav>

        {/* Right Controls: Theme Toggle Bar, Language Switcher & Status Pill */}
        <div className="nav-controls-right">
        {conflictCount > 0 && (
          <div className="badge badge-conflict occ-conflict-badge">
            <span className="conflict-badge-full">⚠ {conflictCount} {t('nav.trainConflict')}</span>
            <span className="conflict-badge-compact">⚠ {conflictCount} {t('nav.conflictShort')}</span>
            <span className="conflict-badge-tiny">⚠ {conflictCount}</span>
          </div>
        )}

        {/* Language Switcher Bar */}
        <div className="lang-toggle-bar" title="Switch Language / भाषा बदलें">
          <button
            type="button"
            className={`lang-toggle-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
            aria-label="English"
          >
            <Languages size={13} />
            <span>EN</span>
          </button>
          <button
            type="button"
            className={`lang-toggle-btn ${language === 'hi' ? 'active' : ''}`}
            onClick={() => setLanguage('hi')}
            aria-label="Hindi"
          >
            <span>हिंदी</span>
          </button>
        </div>

        {/* Light / Dark Theme Toggle Bar */}
        <div className="theme-toggle-bar" title="Toggle Light / Dark Mode">
          <button
            type="button"
            className={`theme-toggle-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => setTheme('light')}
            aria-label="Light Theme"
          >
            <Sun size={14} />
            <span className="theme-btn-label">{t('common.light')}</span>
          </button>
          <button
            type="button"
            className={`theme-toggle-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => setTheme('dark')}
            aria-label="Dark Theme"
          >
            <Moon size={14} />
            <span className="theme-btn-label">{t('common.dark')}</span>
          </button>
        </div>

        {/* Operational Status Pill */}
        <div className="occ-status-pill">
          <div className="pulse-dot" />
          <span className="status-text-desktop">{t('common.activeGateOn')}</span>
          <span className="status-text-mobile">{t('common.activeGateOnMobile')}</span>
          <span className="status-text-tiny">{t('common.active')}</span>
        </div>
      </div>
    </header>

    {/* Mobile Bottom Navigation Bar (pinned to viewport bottom on mobile <= 768px) */}
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <button
        type="button"
        className={`mobile-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
        onClick={() => setActiveTab('dashboard')}
        title={t('nav.dashboard')}
        aria-label={t('nav.dashboard')}
      >
        <div className="nav-icon-wrapper">
          <LayoutDashboard size={22} />
        </div>
      </button>

      <button
        type="button"
        className={`mobile-nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
        onClick={() => setActiveTab('tasks')}
        title={t('nav.tasks')}
        aria-label={t('nav.tasks')}
      >
        <div className="nav-icon-wrapper">
          <ListTodo size={22} />
          {pendingCount > 0 && <span className="nav-badge-dot" />}
        </div>
      </button>

      <button
        type="button"
        className={`mobile-nav-item ${activeTab === 'recommendation' ? 'active' : ''}`}
        onClick={() => setActiveTab('recommendation')}
        title={t('nav.recommendation')}
        aria-label={t('nav.recommendation')}
      >
        <div className="nav-icon-wrapper">
          <Sparkles size={22} />
        </div>
      </button>

      <button
        type="button"
        className={`mobile-nav-item ${activeTab === 'schedule' ? 'active' : ''}`}
        onClick={() => setActiveTab('schedule')}
        title={t('nav.schedule')}
        aria-label={t('nav.schedule')}
      >
        <div className="nav-icon-wrapper">
          <CalendarClock size={22} />
          {conflictCount > 0 && <span className="nav-badge-dot" />}
        </div>
      </button>
    </nav>
  </>
  );
};
