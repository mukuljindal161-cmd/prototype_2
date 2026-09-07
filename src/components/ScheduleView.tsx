import React, { useState } from 'react';
import {
  CalendarClock,
  Clock,
  Edit,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Train as TrainIcon,
  Wrench,
  X
} from 'lucide-react';
import type { ScheduleEntry, AvailableBlock, Train } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ScheduleViewProps {
  schedule: ScheduleEntry[];
  blocks: AvailableBlock[];
  trains: Train[];
  onOpenModify: (entry: ScheduleEntry) => void;
  onResetToDefault: () => void;
}

type TimelineFilter = 'all' | 'blocks' | 'trains' | 'conflicts';

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  schedule,
  blocks,
  trains,
  onOpenModify,
  onResetToDefault
}) => {
  const { t, tDept, tSection, tTrainName, tTrainType, tBlockType, tCorridorLine, tNotes } = useLanguage();
  const [filterMode, setFilterMode] = useState<TimelineFilter>('all');
  
  const sections = [
    { id: 'Section A-B', name: 'Section A–B', line: 'Northern Line Corridor' },
    { id: 'Section B-C', name: 'Section B–C', line: 'Southern Line Corridor' }
  ];

  // Selected item state for inspector
  const [selectedItem, setSelectedItem] = useState<{
    type: 'train' | 'block';
    data: Train | AvailableBlock;
  } | null>(null);

  // Helper to convert HH:MM to minute of day (0 - 1440)
  const timeToMinutes = (timeStr: string): number => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  // Convert time to percentage on 24h axis (1440 mins)
  const getSlotStyle = (startStr: string, endStr: string, isBlock: boolean = false) => {
    const startMin = timeToMinutes(startStr);
    let endMin = timeToMinutes(endStr);
    if (endMin < startMin) endMin += 1440; // overnight handling
    const duration = Math.max(isBlock ? 120 : 90, endMin - startMin);

    const leftPercent = (startMin / 1440) * 100;
    const widthPercent = (duration / 1440) * 100;

    return {
      left: `${Math.max(0, Math.min(86, leftPercent))}%`,
      width: `${Math.max(isBlock ? 11 : 9.5, Math.min(100 - leftPercent, widthPercent))}%`
    };
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Approved') return <span className="badge badge-clear" style={{ whiteSpace: 'nowrap' }}>{t('common.approved')}</span>;
    if (status === 'Modified') return <span className="badge badge-high" style={{ whiteSpace: 'nowrap' }}>{t('common.modified')}</span>;
    if (status === 'Rejected') return <span className="badge badge-conflict" style={{ whiteSpace: 'nowrap' }}>{t('common.rejected')}</span>;
    return <span className="badge badge-medium" style={{ whiteSpace: 'nowrap' }}>{t('common.pendingReview')}</span>;
  };

  const timeTicks = [
    { label: '00:00', min: 0 },
    { label: '02:00', min: 120 },
    { label: '04:00', min: 240 },
    { label: '06:00', min: 360 },
    { label: '08:00', min: 480 },
    { label: '10:00', min: 600 },
    { label: '12:00', min: 720 },
    { label: '14:00', min: 840 },
    { label: '16:00', min: 960 },
    { label: '18:00', min: 1080 },
    { label: '20:00', min: 1200 },
    { label: '22:00', min: 1320 },
    { label: '24:00', min: 1440 }
  ];

  return (
    <div className="main-container">
      {/* Banner */}
      <div className="occ-header-banner">
        <div>
          <h1 className="page-title">{t('nav.schedule')}</h1>
          <p className="page-subtitle">
            {t('schedule.title')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn-modify"
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem' }}
            onClick={onResetToDefault}
            title={t('schedule.resetScheduleBtn')}
          >
            <RefreshCw size={14} />
            <span>{t('schedule.resetScheduleBtn')}</span>
          </button>
        </div>
      </div>

      {/* Visualizer Container */}
      <div className="timeline-container" style={{ marginBottom: '2.5rem' }}>
        <div className="timeline-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Clock size={18} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t('schedule.title')}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {/* View Filter Switcher */}
            <div style={{ display: 'flex', background: 'var(--filter-bar-bg)', borderRadius: '8px', padding: '0.2rem', border: '1px solid var(--border-subtle)' }}>
              <button
                className={`nav-item ${filterMode === 'all' ? 'active' : ''}`}
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
                onClick={() => setFilterMode('all')}
              >
                {t('schedule.filterAllLanes')}
              </button>
              <button
                className={`nav-item ${filterMode === 'blocks' ? 'active' : ''}`}
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
                onClick={() => setFilterMode('blocks')}
              >
                {t('schedule.filterMaintenance')}
              </button>
              <button
                className={`nav-item ${filterMode === 'trains' ? 'active' : ''}`}
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
                onClick={() => setFilterMode('trains')}
              >
                {t('schedule.filterTrains')}
              </button>
              <button
                className={`nav-item ${filterMode === 'conflicts' ? 'active' : ''}`}
                style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
                onClick={() => setFilterMode('conflicts')}
              >
                {t('schedule.filterConflicts')}
              </button>
            </div>

            {/* Legend */}
            <div className="timeline-legend">
              <div className="legend-item">
                <div className="legend-swatch" style={{ background: '#16a34a' }} />
                <span>{t('schedule.legendTrain')}</span>
              </div>
              <div className="legend-item">
                <div className="legend-swatch" style={{ background: '#10b981' }} />
                <span>{t('schedule.legendClearBlock')}</span>
              </div>
              <div className="legend-item">
                <div className="legend-swatch" style={{ background: '#ef4444' }} />
                <span>{t('schedule.legendConflict')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop 24-Hour Timeline Canvas View (hidden on mobile <= 768px) */}
        <div className="desktop-timeline-view timeline-scroll-wrapper">
          <div className="timeline-canvas-inner">
            {/* Synchronized 24-Hour Time Axis Header */}
            <div className="timeline-axis-header">
              {timeTicks.map((tick) => {
                const leftPct = (tick.min / 1440) * 100;
                const transformVal =
                  tick.min === 0 ? 'translateX(0)' : tick.min === 1440 ? 'translateX(-100%)' : 'translateX(-50%)';
                return (
                  <div
                    key={tick.label}
                    className="timeline-hour-tick"
                    style={{ left: `${leftPct}%`, transform: transformVal }}
                  >
                    {tick.label}
                  </div>
                );
              })}
            </div>

            {/* Render Each Section */}
            {sections.map((section) => {
              const sectionBlocks = blocks.filter((b) => b.section === section.id);
              const sectionTrains = trains.filter((t) => t.section === section.id);
              const hasConflict = section.id === 'Section B-C';

              // Conflict overlap window for Section B-C: Train EXP-305 (14:30 - 15:20) and Block BLK-303 (14:00 - 16:00)
              const conflictStart = (timeToMinutes('14:30') / 1440) * 100;
              const conflictWidth = ((timeToMinutes('15:20') - timeToMinutes('14:30')) / 1440) * 100;

              return (
                <div key={section.id} className="timeline-section-card">
                  {/* Section Header */}
                  <div className="timeline-section-header">
                    <div className="section-title-group">
                      <span className="section-name">{tSection(section.name)}</span>
                      <span className="section-desc">• {tCorridorLine(section.line)}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {hasConflict ? (
                        <span className="badge badge-conflict">
                          <AlertTriangle size={13} />
                          {t('schedule.trainConflictCorridor')}
                        </span>
                      ) : (
                        <span className="badge badge-clear">
                          <CheckCircle size={13} />
                          {t('schedule.corridorClear')}
                        </span>
                      )}
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                        {sectionTrains.length} {t('common.trains')} • {sectionBlocks.length} {t('common.blocks')}
                      </span>
                    </div>
                  </div>

                  {/* Lane 1: Train Movements (Timetable Traffic) */}
                  {(filterMode === 'all' || filterMode === 'trains' || filterMode === 'conflicts') && (
                    <div className="timeline-lane-row">
                      <div className="lane-label-box">
                        <div className="lane-title">
                          <TrainIcon size={14} color="var(--accent-cyan)" />
                          <span>{t('schedule.laneTimetableTrains')}</span>
                        </div>
                        <div className="lane-sub">{t('schedule.laneScheduledMovements')}</div>
                      </div>

                      <div className="lane-track-bed">
                        {/* Time Grid Lines */}
                        {timeTicks.map((tick) => (
                          <div
                            key={tick.label}
                            className={`lane-grid-line ${tick.min % 360 === 0 ? 'major' : ''}`}
                            style={{ left: `${(tick.min / 1440) * 100}%` }}
                          />
                        ))}

                        {/* Conflict Hazard Stripe overlay */}
                        {hasConflict && (
                          <div
                            className="conflict-hazard-zone"
                            style={{ left: `${conflictStart}%`, width: `${conflictWidth}%` }}
                            title={t('schedule.conflictOverlapTooltip')}
                          />
                        )}

                        {/* Train Pills */}
                        {sectionTrains.map((train) => {
                          const isConflicted = train.id === 'TRN-103';
                          if (filterMode === 'conflicts' && !isConflicted) return null;

                          const style = getSlotStyle(train.startTime, train.endTime, false);
                          return (
                            <div
                              key={train.id}
                              className={`timeline-pill train-pill ${isConflicted ? 'train-conflict-pulse' : ''}`}
                              style={style}
                              onClick={() => setSelectedItem({ type: 'train', data: train })}
                              title={`${train.trainNumber}: ${tTrainName(train.name)} (${train.startTime} - ${train.endTime}) [${t('schedule.clickToInspect')}]`}
                            >
                              <TrainIcon size={14} style={{ flexShrink: 0 }} />
                              <span style={{ fontWeight: 700, flexShrink: 0 }}>{train.trainNumber}</span>
                              <span style={{ fontSize: '0.72rem', opacity: 0.95, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>
                                ({train.startTime}–{train.endTime})
                              </span>
                              {isConflicted && (
                                <span style={{ fontSize: '0.66rem', fontWeight: 700, background: 'rgba(239, 68, 68, 0.45)', padding: '0.12rem 0.4rem', borderRadius: '3px', flexShrink: 0 }}>
                                  {t('common.conflict')}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Lane 2: Maintenance Blocks (Possession Windows) */}
                  {(filterMode === 'all' || filterMode === 'blocks' || filterMode === 'conflicts') && (
                    <div className="timeline-lane-row">
                      <div className="lane-label-box">
                        <div className="lane-title">
                          <Wrench size={14} color="#10b981" />
                          <span>{t('schedule.laneMaintenanceBlocks')}</span>
                        </div>
                        <div className="lane-sub">{t('schedule.lanePossessionClosures')}</div>
                      </div>

                      <div className="lane-track-bed">
                        {/* Time Grid Lines */}
                        {timeTicks.map((tick) => (
                          <div
                            key={tick.label}
                            className={`lane-grid-line ${tick.min % 360 === 0 ? 'major' : ''}`}
                            style={{ left: `${(tick.min / 1440) * 100}%` }}
                          />
                        ))}

                        {/* Conflict Hazard Stripe overlay */}
                        {hasConflict && (
                          <div
                            className="conflict-hazard-zone"
                            style={{ left: `${conflictStart}%`, width: `${conflictWidth}%` }}
                            title={t('schedule.conflictOverlapTooltip')}
                          />
                        )}

                        {/* Block Pills */}
                        {sectionBlocks.map((block) => {
                          const isConflicted = block.id === 'BLK-303';
                          if (filterMode === 'conflicts' && !isConflicted) return null;

                          const style = getSlotStyle(block.startTime, block.endTime, true);
                          return (
                            <div
                              key={block.id}
                              className={`timeline-pill ${isConflicted ? 'block-conflict-pill' : 'block-clear-pill'}`}
                              style={style}
                              onClick={() => setSelectedItem({ type: 'block', data: block })}
                              title={`${t('schedule.inspectorBlockTitle')} ${block.id}: ${tBlockType(block.blockType)} (${block.startTime} - ${block.endTime}, ${block.durationMinutes}${t('common.min')})`}
                            >
                              <Wrench size={14} style={{ flexShrink: 0 }} />
                              <span style={{ fontWeight: 700, flexShrink: 0 }}>{block.id}</span>
                              <span style={{ fontSize: '0.72rem', opacity: 0.95, fontVariantNumeric: 'tabular-nums', flexShrink: 0 }}>
                                {block.durationMinutes}m ({block.startTime}–{block.endTime})
                              </span>
                              {isConflicted && (
                                <span style={{ fontSize: '0.66rem', fontWeight: 700, background: 'rgba(239, 68, 68, 0.45)', padding: '0.12rem 0.4rem', borderRadius: '3px', flexShrink: 0 }}>
                                  {t('common.conflict')}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Section Conflict Alert Bar if applicable */}
                  {hasConflict && (
                    <div className="section-conflict-banner">
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                        <AlertTriangle size={18} color="#f87171" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div className="conflict-banner-text">
                          <span>{t('schedule.operationalCollisionAlert')}</span>
                          <button
                            type="button"
                            className="badge badge-conflict conflict-action-btn"
                            onClick={() => {
                              const blk = sectionBlocks.find((b) => b.id === 'BLK-303');
                              if (blk) setSelectedItem({ type: 'block', data: blk });
                            }}
                            title={t('schedule.actionRequiredBtn')}
                          >
                            <AlertTriangle size={13} style={{ flexShrink: 0 }} />
                            <span style={{ whiteSpace: 'nowrap' }}>{t('schedule.actionRequiredBtn')}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline View (Vertical slot cards, eliminates horizontal scrollbar completely) */}
        <div className="mobile-timeline-view">
          {sections.map((section) => {
            const sectionBlocks = blocks.filter((b) => b.section === section.id);
            const sectionTrains = trains.filter((t) => t.section === section.id);
            const hasConflict = section.id === 'Section B-C';

            const items = [
              ...sectionTrains.map((t) => ({ type: 'train' as const, data: t, time: t.startTime, isConflicted: t.id === 'TRN-103' })),
              ...sectionBlocks.map((b) => ({ type: 'block' as const, data: b, time: b.startTime, isConflicted: b.id === 'BLK-303' }))
            ]
              .filter((item) => {
                if (filterMode === 'trains') return item.type === 'train';
                if (filterMode === 'blocks') return item.type === 'block';
                if (filterMode === 'conflicts') return item.isConflicted;
                return true;
              })
              .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

            return (
              <div key={section.id} className="timeline-section-card mobile-section-card">
                <div className="timeline-section-header">
                  <div className="section-title-group">
                    <span className="section-name">{tSection(section.name)}</span>
                    <span className="section-desc">• {tCorridorLine(section.line)}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {hasConflict ? (
                      <span className="badge badge-conflict">
                        <AlertTriangle size={13} />
                        {t('schedule.trainConflictCorridor')}
                      </span>
                    ) : (
                      <span className="badge badge-clear">
                        <CheckCircle size={13} />
                        {t('schedule.corridorClear')}
                      </span>
                    )}
                  </div>
                </div>

                {hasConflict && (
                  <div className="section-conflict-banner">
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                      <AlertTriangle size={18} color="#f87171" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div className="conflict-banner-text">
                        <span>{t('schedule.operationalCollisionAlert')}</span>
                        <button
                          type="button"
                          className="badge badge-conflict conflict-action-btn"
                          onClick={() => {
                            const blk = sectionBlocks.find((b) => b.id === 'BLK-303');
                            if (blk) setSelectedItem({ type: 'block', data: blk });
                          }}
                          title={t('schedule.actionRequiredBtn')}
                        >
                          <AlertTriangle size={13} style={{ flexShrink: 0 }} />
                          <span style={{ whiteSpace: 'nowrap' }}>{t('schedule.actionRequiredBtn')}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mobile-slots-list">
                  {items.length === 0 ? (
                    <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      {t('schedule.noEventsMatch')}
                    </div>
                  ) : (
                    items.map((item) => {
                      if (item.type === 'train') {
                        const trn = item.data as Train;
                        return (
                          <div
                            key={trn.id}
                            className={`mobile-slot-item slot-train ${item.isConflicted ? 'slot-conflict' : ''}`}
                            onClick={() => setSelectedItem({ type: 'train', data: trn })}
                          >
                            <div className="slot-time-col">
                              <span className="slot-time">{trn.startTime}</span>
                              <span className="slot-time-sub">{trn.endTime}</span>
                            </div>
                            <div className="slot-icon-col">
                              <TrainIcon size={16} color="var(--accent-cyan)" />
                            </div>
                            <div className="slot-info-col">
                              <div className="slot-title">
                                <span style={{ fontWeight: 700 }}>{trn.trainNumber}</span>
                                <span className="slot-name">• {tTrainName(trn.name)}</span>
                              </div>
                              <div className="slot-sub">
                                {tTrainType(trn.trainType)} • {t('schedule.laneScheduledMovements')}
                              </div>
                            </div>
                            {item.isConflicted && (
                              <span className="badge badge-conflict" style={{ fontSize: '0.68rem', flexShrink: 0 }}>
                                {t('common.conflict')}
                              </span>
                            )}
                          </div>
                        );
                      } else {
                        const blk = item.data as AvailableBlock;
                        return (
                          <div
                            key={blk.id}
                            className={`mobile-slot-item slot-block ${item.isConflicted ? 'slot-conflict' : ''}`}
                            onClick={() => setSelectedItem({ type: 'block', data: blk })}
                          >
                            <div className="slot-time-col">
                              <span className="slot-time">{blk.startTime}</span>
                              <span className="slot-time-sub">{blk.endTime}</span>
                            </div>
                            <div className="slot-icon-col">
                              <Wrench size={16} color={item.isConflicted ? '#ef4444' : '#10b981'} />
                            </div>
                            <div className="slot-info-col">
                              <div className="slot-title">
                                <span style={{ fontWeight: 700 }}>{blk.id}</span>
                                <span className="slot-name">• {blk.durationMinutes} {t('common.min')}</span>
                              </div>
                              <div className="slot-sub">
                                {tBlockType(blk.blockType)}
                              </div>
                            </div>
                            <span className={`badge ${item.isConflicted ? 'badge-conflict' : 'badge-clear'}`} style={{ fontSize: '0.68rem', flexShrink: 0 }}>
                              {item.isConflicted ? t('common.conflict') : t('common.clear')}
                            </span>
                          </div>
                        );
                      }
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Element Inspector Drawer */}
        {selectedItem && (
          <div className="timeline-inspector-card" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap', flex: '1 1 280px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: selectedItem.type === 'train' ? 'rgba(22, 163, 74, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                  border: `1px solid ${selectedItem.type === 'train' ? 'var(--accent-cyan)' : '#10b981'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: selectedItem.type === 'train' ? 'var(--accent-cyan)' : '#10b981',
                  flexShrink: 0
                }}
              >
                {selectedItem.type === 'train' ? <TrainIcon size={22} /> : <Wrench size={22} />}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {selectedItem.type === 'train' ? t('schedule.inspectorTrainTitle') : t('schedule.inspectorBlockTitle')}
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.05rem' }}>
                    {selectedItem.type === 'train' ? (selectedItem.data as Train).trainNumber : (selectedItem.data as AvailableBlock).id}
                  </span>
                  {selectedItem.data.id === 'BLK-303' || selectedItem.data.id === 'TRN-203' ? (
                    <span className="badge badge-conflict" style={{ whiteSpace: 'nowrap' }}>{t('schedule.activeTimetableConflict')}</span>
                  ) : (
                    <span className="badge badge-clear" style={{ whiteSpace: 'nowrap' }}>{t('common.clear')}</span>
                  )}
                </div>

                <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                  {selectedItem.type === 'train' ? (
                    <>
                      <strong>{tTrainName((selectedItem.data as Train).name)}</strong> ({tTrainType((selectedItem.data as Train).trainType)}) • {t('schedule.labelWindow')} <strong>{(selectedItem.data as Train).startTime} – {(selectedItem.data as Train).endTime}</strong> {t('schedule.onSection')} {tSection((selectedItem.data as Train).section)}
                    </>
                  ) : (
                    <>
                      <strong>{tBlockType((selectedItem.data as AvailableBlock).blockType)}</strong> • {t('schedule.labelWindow')} <strong>{(selectedItem.data as AvailableBlock).startTime} – {(selectedItem.data as AvailableBlock).endTime}</strong> ({(selectedItem.data as AvailableBlock).durationMinutes} {t('common.min')}) {t('schedule.onSection')} {tSection((selectedItem.data as AvailableBlock).section)}
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              style={{ color: 'var(--text-muted)', padding: '0.5rem' }}
              title={t('common.close')}
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Operational Final Block Plan Table */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CalendarClock size={20} color="#10b981" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {t('schedule.registryTitle')}
            </h3>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
            {schedule.length} {t('schedule.officialEntries')}
          </div>
        </div>

        {/* Desktop Schedule Table */}
        <div className="table-container desktop-schedule-table">
          <table className="occ-table">
            <thead>
              <tr>
                <th>{t('schedule.colScheduleId')}</th>
                <th>{t('schedule.colBlockId')}</th>
                <th>{t('schedule.colSection')}</th>
                <th>{t('schedule.colPossessionWindow')}</th>
                <th>{t('schedule.colAssignedTasks')}</th>
                <th>{t('schedule.colParticipatingDepts')}</th>
                <th>{t('schedule.colConflictStatus')}</th>
                <th>{t('schedule.colApprovalStatus')}</th>
                <th>{t('schedule.colOfficerNotes')}</th>
                <th>{t('schedule.colActions')}</th>
              </tr>
            </thead>
            <tbody>
              {schedule.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--text-muted)' }}>
                    {t('schedule.noBlocksScheduled')}
                  </td>
                </tr>
              ) : (
                schedule.map((entry) => (
                  <tr key={entry.id}>
                    <td style={{ fontWeight: 600, color: 'var(--accent-cyan)', whiteSpace: 'nowrap' }}>
                      {entry.id}
                    </td>
                    <td style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>{entry.blockId}</td>
                    <td style={{ fontWeight: 500, wordBreak: 'break-word', minWidth: '90px' }}>{tSection(entry.section)}</td>
                    <td style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 500, whiteSpace: 'nowrap' }}>
                      {entry.startTime} – {entry.endTime}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                        {entry.assignedTaskIds.map((tid) => (
                          <span key={tid} className="badge badge-low" style={{ whiteSpace: 'nowrap' }}>
                            {tid}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                        {entry.departments.map((dept) => (
                          <span
                            key={dept}
                            className={`badge ${
                              dept === 'Engineering' ? 'dept-eng' : dept === 'S&T' ? 'dept-st' : 'dept-ohe'
                            }`}
                            style={{ whiteSpace: 'nowrap' }}
                          >
                            {tDept(dept)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <span className={`badge ${entry.conflictStatus === 'Clear' ? 'badge-clear' : 'badge-conflict'}`} style={{ whiteSpace: 'nowrap' }}>
                        {entry.conflictStatus === 'Clear' ? t('common.clear') : t('common.conflict')}
                      </span>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>{getStatusBadge(entry.approvalStatus)}</td>
                    <td style={{ maxWidth: '200px', wordBreak: 'break-word', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                      {tNotes(entry.officerNotes)}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button
                        className="btn-modify"
                        style={{ fontSize: '0.74rem', padding: '0.35rem 0.75rem', whiteSpace: 'nowrap' }}
                        onClick={() => onOpenModify(entry)}
                      >
                        <Edit size={13} />
                        <span>{t('common.modify')}</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Schedule Entry Cards (Eliminates horizontal sliding bar on mobile) */}
        <div className="mobile-schedule-cards">
          {schedule.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
              {t('schedule.noBlocksScheduled')}
            </div>
          ) : (
            schedule.map((entry) => (
              <div key={entry.id} className="mobile-schedule-card glass-panel">
                <div className="mobile-card-top">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="mobile-card-id">{entry.id}</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{entry.blockId}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span className={`badge ${entry.conflictStatus === 'Clear' ? 'badge-clear' : 'badge-conflict'}`}>
                      {entry.conflictStatus === 'Clear' ? t('common.clear') : t('common.conflict')}
                    </span>
                    {getStatusBadge(entry.approvalStatus)}
                  </div>
                </div>

                <div className="mobile-card-details">
                  <div className="mobile-detail-item">
                    <span className="detail-label">{t('schedule.colSection')}:</span>
                    <span className="detail-val">{tSection(entry.section)}</span>
                  </div>
                  <div className="mobile-detail-item">
                    <span className="detail-label">{t('schedule.colPossessionWindow')}:</span>
                    <span className="detail-val" style={{ fontWeight: 600 }}>{entry.startTime} – {entry.endTime}</span>
                  </div>
                  <div className="mobile-detail-item">
                    <span className="detail-label">{t('schedule.colAssignedTasks')}:</span>
                    <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                      {entry.assignedTaskIds.map((tid) => (
                        <span key={tid} className="badge badge-low" style={{ fontSize: '0.68rem' }}>{tid}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mobile-detail-item">
                    <span className="detail-label">{t('schedule.colParticipatingDepts')}:</span>
                    <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                      {entry.departments.map((dept) => (
                        <span
                          key={dept}
                          className={`badge ${
                            dept === 'Engineering' ? 'dept-eng' : dept === 'S&T' ? 'dept-st' : 'dept-ohe'
                          }`}
                          style={{ fontSize: '0.68rem' }}
                        >
                          {tDept(dept)}
                        </span>
                      ))}
                    </div>
                  </div>
                  {entry.officerNotes && (
                    <div className="mobile-detail-item" style={{ gridColumn: 'span 2' }}>
                      <span className="detail-label">{t('schedule.colOfficerNotes')}:</span>
                      <span className="detail-val" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{tNotes(entry.officerNotes)}</span>
                    </div>
                  )}
                </div>

                <button
                  className="btn-modify"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem', fontSize: '0.82rem', padding: '0.5rem 1rem' }}
                  onClick={() => onOpenModify(entry)}
                >
                  <Edit size={14} />
                  <span>{t('common.modify')}</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
