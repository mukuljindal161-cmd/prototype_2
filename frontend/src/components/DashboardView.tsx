import React from 'react';
import {
  ListTodo,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import type { MaintenanceTask, AvailableBlock, ScheduleEntry } from '../types';
import type { ActiveTab } from './Navbar';
import { useLanguage } from '../i18n/LanguageContext';

interface DashboardProps {
  tasks: MaintenanceTask[];
  blocks: AvailableBlock[];
  schedule: ScheduleEntry[];
  conflictsCount: number;
  setActiveTab: (tab: ActiveTab) => void;
  onGeneratePlan: () => void;
}

export const DashboardView: React.FC<DashboardProps> = ({
  tasks,
  blocks,
  schedule,
  conflictsCount,
  setActiveTab,
  onGeneratePlan
}) => {
  const { t } = useLanguage();

  const highPriorityCount = tasks.filter(
    (t) => t.criticality === 'Critical' || t.criticality === 'High'
  ).length;

  const engTasks = tasks.filter((t) => t.department === 'Engineering').length;
  const stTasks = tasks.filter((t) => t.department === 'S&T').length;
  const oheTasks = tasks.filter((t) => t.department === 'OHE/Traction').length;

  return (
    <div className="main-container">
      <div className="occ-header-banner">
        <div>
          <h1 className="page-title">{t('dashboard.title')}</h1>
          <p className="page-subtitle">
            {t('dashboard.subtitle')}
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={() => {
            onGeneratePlan();
            setActiveTab('recommendation');
          }}
        >
          <Sparkles size={18} />
          <span>{t('dashboard.generateAiPlan')}</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-grid">
        <div className="glass-panel kpi-card">
          <div className="kpi-title">
            <span>{t('dashboard.totalBacklog')}</span>
            <ListTodo size={18} color="var(--accent-blue)" />
          </div>
          <div className="kpi-value">{tasks.length}</div>
          <div className="kpi-meta">{t('dashboard.totalBacklogMeta')}</div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-title">
            <span>{t('dashboard.highPriority')}</span>
            <AlertTriangle size={18} color="var(--status-crimson)" />
          </div>
          <div className="kpi-value" style={{ color: 'var(--status-crimson)' }}>{highPriorityCount}</div>
          <div className="kpi-meta">{t('dashboard.highPriorityMeta')}</div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-title">
            <span>{t('dashboard.availableBlocks')}</span>
            <Clock size={18} color="var(--status-emerald)" />
          </div>
          <div className="kpi-value" style={{ color: 'var(--status-emerald)' }}>{blocks.length}</div>
          <div className="kpi-meta">{t('dashboard.availableBlocksMeta')}</div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-title">
            <span>{t('dashboard.detectedConflicts')}</span>
            <AlertTriangle size={18} color="var(--status-amber)" />
          </div>
          <div className="kpi-value" style={{ color: 'var(--status-amber)' }}>{conflictsCount}</div>
          <div className="kpi-meta">{t('dashboard.detectedConflictsMeta')}</div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-title">
            <span>{t('dashboard.scheduledPlans')}</span>
            <TrendingUp size={18} color="var(--accent-indigo)" />
          </div>
          <div className="kpi-value" style={{ color: 'var(--accent-indigo)' }}>{schedule.length}</div>
          <div className="kpi-meta">{t('dashboard.scheduledPlansMeta')}</div>
        </div>
      </div>

      {/* Two Column Layout: Departmental Split & Corridor Health */}
      <div className="dashboard-two-col">
        {/* Department Distribution */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            {t('dashboard.deptDistributionTitle')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                <span className="badge dept-eng">{t('dashboard.engDeptName')}</span>
                <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--text-primary)' }}>{engTasks} {t('common.tasks')}</span>
              </div>
              <div style={{ height: '8px', background: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                <div className="dept-bar-fill" style={{ width: `${(engTasks / tasks.length) * 100}%`, height: '100%', background: '#fb923c', borderRadius: '4px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                <span className="badge dept-st">{t('dashboard.stDeptName')}</span>
                <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--text-primary)' }}>{stTasks} {t('common.tasks')}</span>
              </div>
              <div style={{ height: '8px', background: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                <div className="dept-bar-fill" style={{ width: `${(stTasks / tasks.length) * 100}%`, height: '100%', background: '#22d3ee', borderRadius: '4px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                <span className="badge dept-ohe">{t('dashboard.oheDeptName')}</span>
                <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: 'var(--text-primary)' }}>{oheTasks} {t('common.tasks')}</span>
              </div>
              <div style={{ height: '8px', background: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                <div className="dept-bar-fill" style={{ width: `${(oheTasks / tasks.length) * 100}%`, height: '100%', background: '#fde047', borderRadius: '4px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Coordinated Planning Value Card */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
            {t('dashboard.multiDeptEngineTitle')}
          </h3>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
            {t('dashboard.multiDeptEngineDesc')}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              className="btn-primary"
              style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}
              onClick={() => setActiveTab('tasks')}
            >
              <span>{t('dashboard.inspectAllTasks')}</span>
              <ArrowRight size={15} />
            </button>
            <button
              className="btn-modify"
              style={{ fontSize: '0.82rem', padding: '0.5rem 1rem' }}
              onClick={() => setActiveTab('schedule')}
            >
              <span>{t('dashboard.viewBlockSchedule')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
