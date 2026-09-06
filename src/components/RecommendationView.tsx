import React from 'react';
import {
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Layers,
  Clock,
  MapPin,
  Check,
  Edit3,
  XCircle,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import type { Recommendation, MaintenanceTask, AvailableBlock } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface RecommendationViewProps {
  recommendation: Recommendation | null;
  allRecommendations: Recommendation[];
  onSelectRecommendation: (rec: Recommendation) => void;
  onApprove: (rec: Recommendation) => void;
  onOpenModify: (rec: Recommendation) => void;
  onReject: (rec: Recommendation) => void;
  tasks: MaintenanceTask[];
  blocks: AvailableBlock[];
}

export const RecommendationView: React.FC<RecommendationViewProps> = ({
  recommendation,
  allRecommendations,
  onSelectRecommendation,
  onApprove,
  onOpenModify,
  onReject
}) => {
  const { t, tDept, tSection, tTrainName, tTaskType, tExplanation } = useLanguage();

  if (!recommendation) {
    return (
      <div className="main-container">
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
          <Sparkles size={40} color="#38bdf8" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {t('recommendation.noRecTitle')}
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '450px', margin: '0 auto 1.5rem auto' }}>
            {t('recommendation.noRecDesc')}
          </p>
          {allRecommendations.length > 0 && (
            <button
              className="btn-primary"
              onClick={() => onSelectRecommendation(allRecommendations[0])}
            >
              <span>{t('recommendation.viewTopPriorityBtn')}</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  const isConflict = recommendation.conflictStatus === 'Train Conflict Detected';
  const isNoBlock = recommendation.conflictStatus === 'No Block Available';

  return (
    <div className="main-container">
      <div className="occ-header-banner">
        <div>
          <h1 className="page-title">{t('recommendation.title')}</h1>
          <p className="page-subtitle">
            {t('recommendation.subtitle')}
          </p>
        </div>

        {/* Quick Scenario Picker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t('recommendation.demoScenarios')}</span>
          {allRecommendations.slice(0, 3).map((rec) => (
            <button
              key={rec.id}
              className={`nav-item ${rec.id === recommendation.id ? 'active' : ''}`}
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
              onClick={() => onSelectRecommendation(rec)}
            >
              {rec.linkedTaskIds.join('+')}
            </button>
          ))}
        </div>
      </div>

      <div className="recommendation-layout-grid">
        {/* Left Column: Recommendation Details & Rationale */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Main Card */}
          <div className="glass-panel" style={{ padding: '1.75rem', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ flex: '1 1 260px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {t('recommendation.recIdLabel')}
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>
                    {recommendation.id}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                  {recommendation.tasks && tTaskType(recommendation.tasks[0]?.taskType)}
                </h2>
              </div>

              {/* Conflict Status Pill */}
              <div style={{ flexShrink: 0 }}>
                {isConflict ? (
                  <span className="badge badge-conflict" style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}>
                    <AlertTriangle size={15} />
                    <span>{t('recommendation.statusConflict')}</span>
                  </span>
                ) : isNoBlock ? (
                  <span className="badge badge-high" style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}>
                    <AlertTriangle size={15} />
                    <span>{t('recommendation.statusNoBlock')}</span>
                  </span>
                ) : (
                  <span className="badge badge-clear" style={{ fontSize: '0.82rem', padding: '0.4rem 0.85rem' }}>
                    <CheckCircle size={15} />
                    <span>{t('recommendation.statusClear')}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Metrics Row: Priority Score, Section, Duration, Block */}
            <div className="rec-metrics-grid">
              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>{t('recommendation.metricPriority')}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', fontVariantNumeric: 'tabular-nums', marginTop: '0.2rem' }}>
                  {recommendation.priorityScore}
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}> /100</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>{t('recommendation.metricCorridor')}</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.3rem' }}>
                  <MapPin size={16} color="#38bdf8" />
                  <span>{tSection(recommendation.section)}</span>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>{t('recommendation.metricBlock')}</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.3rem' }}>
                  {recommendation.recommendedBlockId ?? t('recommendation.noneAvailable')}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>{t('recommendation.metricWindow')}</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.3rem' }}>
                  <Clock size={16} color="#10b981" />
                  <span>{recommendation.recommendedBlock ? `${recommendation.recommendedBlock.startTime} - ${recommendation.recommendedBlock.endTime}` : 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Multi-Department Combination Banner */}
            {recommendation.combinationFlag && (
              <div className="rec-synergy-banner">
                <div className="rec-synergy-icon">
                  <Layers size={20} />
                </div>
                <div>
                  <div className="rec-synergy-title">
                    {t('recommendation.synergyTitle')}
                  </div>
                  <div className="rec-synergy-desc">
                    {t('recommendation.synergyDesc', {
                      tasks: recommendation.linkedTaskIds.join(' + '),
                      depts: recommendation.combinedDepartments.map((d) => tDept(d)).join(' + ')
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Conflict Warning Box */}
            {isConflict && recommendation.conflictDetails && (
              <div className="rec-conflict-banner">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.3rem' }}>
                  <AlertTriangle size={18} />
                  <span>{t('recommendation.conflictAlertTitle')}</span>
                </div>
                <div style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
                  {t('recommendation.conflictAlertDesc', {
                    trainNumber: recommendation.conflictDetails.trainNumber || '',
                    trainName: tTrainName(recommendation.conflictDetails.trainName || ''),
                    section: tSection(recommendation.section),
                    window: recommendation.conflictDetails.overlapWindow || ''
                  })}
                </div>
              </div>
            )}

            {/* Natural Language Explanation Box */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <Sparkles size={16} color="#38bdf8" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {t('recommendation.rationaleTitle')}
                </h3>
              </div>
              <div className="rec-explanation-box">
                {tExplanation(recommendation)}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Human Officer Review Gate */}
        <div>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} color="#10b981" />
              <span>{t('recommendation.officerGateTitle')}</span>
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              {t('recommendation.officerGateDesc')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <button
                className="btn-approve"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => onApprove(recommendation)}
                disabled={isNoBlock}
              >
                <Check size={18} />
                <span>{t('recommendation.approveBtn')}</span>
              </button>

              <button
                className="btn-modify"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => onOpenModify(recommendation)}
              >
                <Edit3 size={16} />
                <span>{t('recommendation.modifyBtn')}</span>
              </button>

              <button
                className="btn-reject"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => onReject(recommendation)}
              >
                <XCircle size={16} />
                <span>{t('recommendation.rejectBtn')}</span>
              </button>
            </div>

            {/* Task Info breakdown */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
              <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                {t('recommendation.workOrdersTitle')}
              </h4>
              {recommendation.tasks?.map((tItem) => (
                <div key={tItem.id} style={{ background: 'var(--bg-card-elevated)', border: '1px solid var(--border-subtle)', padding: '0.6rem', borderRadius: '6px', marginBottom: '0.5rem', fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <span>{tItem.id}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{tItem.durationMinutes} {t('common.min')}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {tDept(tItem.department)} • {tTaskType(tItem.taskType)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <HelpCircle size={14} />
              <span>{t('recommendation.approvalHelpNotice')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
