import { useState, useMemo, useEffect } from 'react';
import type { ActiveTab } from './components/Navbar';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { TasksView } from './components/TasksView';
import { RecommendationView } from './components/RecommendationView';
import { ScheduleView } from './components/ScheduleView';
import { ModifyModal } from './components/ModifyModal';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

import initialTasksData from './data/tasks.json';
import initialTrainsData from './data/trains.json';
import initialBlocksData from './data/blocks.json';
import initialScheduleData from './data/initial_schedule.json';

import type {
  MaintenanceTask,
  Train,
  AvailableBlock,
  ScheduleEntry,
  Recommendation
} from './types';
import {
  generateAllRecommendations,
  generateRecommendationForTask,
  detectTrainConflicts
} from './engine/optimizer';

function AppContent() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('railopt-theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('railopt-theme', theme);
  }, [theme]);

  // State
  const [tasks, setTasks] = useState<MaintenanceTask[]>(initialTasksData as MaintenanceTask[]);
  const [trains] = useState<Train[]>(initialTrainsData as Train[]);
  const [blocks] = useState<AvailableBlock[]>(initialBlocksData as AvailableBlock[]);
  const [schedule, setSchedule] = useState<ScheduleEntry[]>(initialScheduleData as ScheduleEntry[]);

  // Generated recommendations
  const allRecommendations = useMemo(() => {
    return generateAllRecommendations(tasks, blocks, trains);
  }, [tasks, blocks, trains]);

  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(
    () => (allRecommendations.length > 0 ? allRecommendations[0] : null)
  );

  // Modal State
  const [modifyingEntry, setModifyingEntry] = useState<ScheduleEntry | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'warning' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Conflict count
  const conflictsCount = useMemo(() => {
    return blocks.filter((b) => detectTrainConflicts(b, trains).hasConflict).length;
  }, [blocks, trains]);

  // Handlers
  const handleGeneratePlan = () => {
    const recs = generateAllRecommendations(tasks, blocks, trains);
    if (recs.length > 0) {
      setSelectedRecommendation(recs[0]);
      showToast(t('toasts.recsGenerated', { count: recs.length }), 'info');
    }
  };

  const handleSelectTask = (task: MaintenanceTask) => {
    const rec = generateRecommendationForTask(task, tasks, blocks, trains);
    setSelectedRecommendation(rec);
    setActiveTab('recommendation');
  };

  const handleApproveRecommendation = (rec: Recommendation) => {
    if (!rec.recommendedBlockId || !rec.recommendedBlock) {
      showToast(t('toasts.noSuitableBlockWarning'), 'warning');
      return;
    }

    const newScheduleEntry: ScheduleEntry = {
      id: `SCH-${Math.floor(100 + Math.random() * 900)}`,
      blockId: rec.recommendedBlockId,
      section: rec.section,
      startTime: rec.recommendedBlock.startTime,
      endTime: rec.recommendedBlock.endTime,
      assignedTaskIds: rec.linkedTaskIds,
      departments: rec.combinedDepartments,
      conflictStatus: rec.conflictStatus === 'Clear' ? 'Clear' : 'Warning',
      approvalStatus: 'Approved',
      officerNotes: `AI Recommendation approved by officer. ${rec.combinationFlag ? 'Coordinated multi-department block.' : 'Single-department possession.'}`,
      updatedAt: new Date().toISOString()
    };

    // Update tasks status to Scheduled
    setTasks((prev) =>
      prev.map((t) =>
        rec.linkedTaskIds.includes(t.id) ? { ...t, status: 'Scheduled' } : t
      )
    );

    // Update Schedule
    setSchedule((prev) => [newScheduleEntry, ...prev]);

    showToast(t('toasts.blockPlanApproved', { tasks: rec.linkedTaskIds.join('+') }), 'success');
    setActiveTab('schedule');
  };

  const handleOpenModify = (recOrEntry: Recommendation | ScheduleEntry) => {
    if ('linkedTaskIds' in recOrEntry) {
      // It is a Recommendation, convert to temporary ScheduleEntry for modification
      const rec = recOrEntry as Recommendation;
      const tempEntry: ScheduleEntry = {
        id: `SCH-NEW`,
        blockId: rec.recommendedBlockId ?? blocks.find(b => b.section === rec.section)?.id ?? 'BLK-301',
        section: rec.section,
        startTime: rec.recommendedBlock?.startTime ?? '09:00',
        endTime: rec.recommendedBlock?.endTime ?? '11:00',
        assignedTaskIds: rec.linkedTaskIds,
        departments: rec.combinedDepartments,
        conflictStatus: rec.conflictStatus === 'Clear' ? 'Clear' : 'Warning',
        approvalStatus: 'Modified',
        officerNotes: 'Officer customized block parameters before commit.'
      };
      setModifyingEntry(tempEntry);
    } else {
      setModifyingEntry(recOrEntry as ScheduleEntry);
    }
  };

  const handleSaveModified = (updated: ScheduleEntry) => {
    setSchedule((prev) => {
      const exists = prev.some((e) => e.id === updated.id);
      if (exists) {
        return prev.map((e) => (e.id === updated.id ? updated : e));
      } else {
        return [
          { ...updated, id: `SCH-${Math.floor(100 + Math.random() * 900)}` },
          ...prev
        ];
      }
    });

    // Mark tasks as Scheduled
    setTasks((prev) =>
      prev.map((t) =>
        updated.assignedTaskIds.includes(t.id) ? { ...t, status: 'Scheduled' } : t
      )
    );

    showToast(t('toasts.blockPlanModified', { blockId: updated.blockId }), 'info');
    setActiveTab('schedule');
  };

  const handleRejectRecommendation = (rec: Recommendation) => {
    setTasks((prev) =>
      prev.map((t) =>
        rec.linkedTaskIds.includes(t.id) ? { ...t, status: 'Deferred' } : t
      )
    );
    showToast(t('toasts.recRejected', { id: rec.id }), 'warning');
  };

  const handleResetToDefault = () => {
    setTasks(initialTasksData as MaintenanceTask[]);
    setSchedule(initialScheduleData as ScheduleEntry[]);
    showToast(t('toasts.scheduleReset'), 'info');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={tasks.filter((t) => t.status === 'Pending').length}
        conflictCount={conflictsCount}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Toast Notification Banner */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            top: '70px',
            right: '25px',
            zIndex: 9999,
            padding: '0.85rem 1.25rem',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '0.86rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
            background:
              toast.type === 'success'
                ? 'linear-gradient(135deg, #059669, #10b981)'
                : toast.type === 'warning'
                ? 'linear-gradient(135deg, #d97706, #f59e0b)'
                : 'linear-gradient(135deg, #0284c7, #2563eb)',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          <span>{toast.message}</span>
        </div>
      )}

      {/* Main Screen Views */}
      <main style={{ flex: 1 }}>
        {activeTab === 'dashboard' && (
          <DashboardView
            tasks={tasks}
            blocks={blocks}
            schedule={schedule}
            conflictsCount={conflictsCount}
            setActiveTab={setActiveTab}
            onGeneratePlan={handleGeneratePlan}
          />
        )}

        {activeTab === 'tasks' && (
          <TasksView tasks={tasks} onSelectTask={handleSelectTask} />
        )}

        {activeTab === 'recommendation' && (
          <RecommendationView
            recommendation={selectedRecommendation}
            allRecommendations={allRecommendations}
            onSelectRecommendation={(rec) => setSelectedRecommendation(rec)}
            onApprove={handleApproveRecommendation}
            onOpenModify={handleOpenModify}
            onReject={handleRejectRecommendation}
            tasks={tasks}
            blocks={blocks}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleView
            schedule={schedule}
            blocks={blocks}
            trains={trains}
            onOpenModify={handleOpenModify}
            onResetToDefault={handleResetToDefault}
          />
        )}
      </main>

      {/* Officer Modification Modal */}
      {modifyingEntry && (
        <ModifyModal
          entry={modifyingEntry}
          blocks={blocks}
          onClose={() => setModifyingEntry(null)}
          onSave={handleSaveModified}
        />
      )}
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
