import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, AlertCircle } from 'lucide-react';
import type { MaintenanceTask } from '../types';
import { calculatePriorityScore } from '../engine/optimizer';
import { useLanguage } from '../i18n/LanguageContext';

interface TasksViewProps {
  tasks: MaintenanceTask[];
  onSelectTask: (task: MaintenanceTask) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ tasks, onSelectTask }) => {
  const { t, tDept, tCrit, tUrgency, tStatus, tSection, tTaskType, tTaskDesc } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');
  const [sectionFilter, setSectionFilter] = useState('ALL');
  const [critFilter, setCritFilter] = useState('ALL');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.taskType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept = deptFilter === 'ALL' || task.department === deptFilter;
      const matchesSection = sectionFilter === 'ALL' || task.section === sectionFilter;
      const matchesCrit = critFilter === 'ALL' || task.criticality === critFilter;

      return matchesSearch && matchesDept && matchesSection && matchesCrit;
    });
  }, [tasks, searchTerm, deptFilter, sectionFilter, critFilter]);

  const getDeptBadgeClass = (dept: string) => {
    if (dept === 'Engineering') return 'dept-eng';
    if (dept === 'S&T') return 'dept-st';
    return 'dept-ohe';
  };

  const getCritBadgeClass = (crit: string) => {
    if (crit === 'Critical') return 'badge-critical';
    if (crit === 'High') return 'badge-high';
    if (crit === 'Medium') return 'badge-medium';
    return 'badge-low';
  };

  return (
    <div className="main-container">
      <div className="occ-header-banner">
        <div>
          <h1 className="page-title">{t('tasks.title')}</h1>
          <p className="page-subtitle">
            {t('tasks.subtitle')}
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel" style={{ padding: '1rem', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 240px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input"
            placeholder={t('tasks.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '2.2rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Filter size={15} color="#94a3b8" />
            <select
              className="form-select"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              style={{ width: 'auto', minWidth: '130px' }}
            >
              <option value="ALL">{t('tasks.allDepartments')}</option>
              <option value="Engineering">{tDept('Engineering')}</option>
              <option value="S&T">{tDept('S&T')}</option>
              <option value="OHE/Traction">{tDept('OHE/Traction')}</option>
            </select>
          </div>

          <div>
            <select
              className="form-select"
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              style={{ width: 'auto', minWidth: '120px' }}
            >
              <option value="ALL">{t('tasks.allSections')}</option>
              <option value="Section A-B">{tSection('Section A-B')}</option>
              <option value="Section B-C">{tSection('Section B-C')}</option>
            </select>
          </div>

          <div>
            <select
              className="form-select"
              value={critFilter}
              onChange={(e) => setCritFilter(e.target.value)}
              style={{ width: 'auto', minWidth: '120px' }}
            >
              <option value="ALL">{t('tasks.allCriticality')}</option>
              <option value="Critical">{tCrit('Critical')}</option>
              <option value="High">{tCrit('High')}</option>
              <option value="Medium">{tCrit('Medium')}</option>
              <option value="Low">{tCrit('Low')}</option>
            </select>
          </div>
        </div>

        <div style={{ marginLeft: 'auto', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 500, whiteSpace: 'nowrap' }}>
          {t('tasks.showingTasks', { filtered: filteredTasks.length, total: tasks.length })}
        </div>
      </div>

      {/* Desktop Tasks Table */}
      <div className="glass-panel table-container desktop-tasks-table">
        <table className="occ-table">
          <thead>
            <tr>
              <th>{t('tasks.colTaskId')}</th>
              <th>{t('tasks.colDepartment')}</th>
              <th>{t('tasks.colSection')}</th>
              <th>{t('tasks.colActivity')}</th>
              <th>{t('tasks.colCriticality')}</th>
              <th>{t('tasks.colUrgency')}</th>
              <th>{t('tasks.colDuration')}</th>
              <th>{t('tasks.colPriorityScore')}</th>
              <th>{t('tasks.colStatus')}</th>
              <th>{t('tasks.colAction')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                  {t('tasks.noTasksMatch')}
                </td>
              </tr>
            ) : (
              filteredTasks.map((task) => {
                const priority = calculatePriorityScore(task);
                return (
                  <tr key={task.id}>
                    <td style={{ fontWeight: 600, color: 'var(--accent-cyan)', whiteSpace: 'nowrap' }}>
                      {task.id}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <span className={`badge ${getDeptBadgeClass(task.department)}`} style={{ whiteSpace: 'nowrap' }}>
                        {tDept(task.department)}
                      </span>
                    </td>
                    <td style={{ whiteSpace: 'nowrap', fontWeight: 500 }}>{tSection(task.section)}</td>
                    <td style={{ minWidth: '240px', maxWidth: '340px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{tTaskType(task.taskType)}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4, marginTop: '0.2rem' }}>
                        {tTaskDesc(task.description)}
                      </div>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <span className={`badge ${getCritBadgeClass(task.criticality)}`} style={{ whiteSpace: 'nowrap' }}>
                        {tCrit(task.criticality)}
                      </span>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <span className="badge badge-low" style={{ whiteSpace: 'nowrap' }}>{tUrgency(task.urgency)}</span>
                    </td>
                    <td style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 500, whiteSpace: 'nowrap' }}>
                      {task.durationMinutes} {t('common.min')}
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', whiteSpace: 'nowrap' }}>
                        <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: priority >= 75 ? 'var(--status-crimson)' : priority >= 50 ? 'var(--status-amber)' : 'var(--accent-blue)' }}>
                          {priority}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>/100</span>
                      </div>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <span className={`badge ${task.status === 'Scheduled' ? 'badge-clear' : task.status === 'Recommended' ? 'badge-medium' : 'badge-low'}`} style={{ whiteSpace: 'nowrap' }}>
                        {tStatus(task.status)}
                      </span>
                    </td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button
                        className="btn-primary"
                        style={{ fontSize: '0.76rem', padding: '0.35rem 0.75rem', whiteSpace: 'nowrap' }}
                        onClick={() => onSelectTask(task)}
                      >
                        <Sparkles size={13} />
                        <span>{t('tasks.aiPlanBtn')}</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Tasks Card List (Eliminates horizontal sliding bar on mobile) */}
      <div className="mobile-tasks-cards">
        {filteredTasks.length === 0 ? (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            {t('tasks.noTasksMatch')}
          </div>
        ) : (
          filteredTasks.map((task) => {
            const priority = calculatePriorityScore(task);
            return (
              <div key={task.id} className="glass-panel mobile-task-card">
                <div className="mobile-card-top">
                  <span className="mobile-card-id">{task.id}</span>
                  <div className="mobile-card-badges">
                    <span className={`badge ${getDeptBadgeClass(task.department)}`}>
                      {tDept(task.department)}
                    </span>
                    <span className="badge badge-low">{tUrgency(task.urgency)}</span>
                  </div>
                </div>

                <div className="mobile-card-title">{tTaskType(task.taskType)}</div>
                <div className="mobile-card-desc">{tTaskDesc(task.description)}</div>

                <div className="mobile-card-details">
                  <div className="mobile-detail-item">
                    <span className="detail-label">{t('tasks.colSection')}:</span>
                    <span className="detail-val">{tSection(task.section)}</span>
                  </div>
                  <div className="mobile-detail-item">
                    <span className="detail-label">{t('tasks.colDuration')}:</span>
                    <span className="detail-val">{task.durationMinutes} {t('common.min')}</span>
                  </div>
                  <div className="mobile-detail-item">
                    <span className="detail-label">{t('tasks.colPriorityScore')}:</span>
                    <span className="detail-val" style={{ fontWeight: 700, color: priority >= 75 ? 'var(--status-crimson)' : priority >= 50 ? 'var(--status-amber)' : 'var(--accent-blue)' }}>
                      {priority}/100
                    </span>
                  </div>
                  <div className="mobile-detail-item">
                    <span className="detail-label">{t('tasks.colStatus')}:</span>
                    <span className={`badge ${task.status === 'Scheduled' ? 'badge-clear' : task.status === 'Recommended' ? 'badge-medium' : 'badge-low'}`}>
                      {tStatus(task.status)}
                    </span>
                  </div>
                </div>

                <button
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '0.85rem', fontSize: '0.82rem', padding: '0.55rem 1rem' }}
                  onClick={() => onSelectTask(task)}
                >
                  <Sparkles size={14} />
                  <span>{t('tasks.aiPlanBtn')}</span>
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Info notice */}
      <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        <AlertCircle size={15} />
        <span>{t('tasks.guidanceNotice')}</span>
      </div>
    </div>
  );
};
