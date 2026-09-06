import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import type { ScheduleEntry, ApprovalStatus, AvailableBlock } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface ModifyModalProps {
  entry: ScheduleEntry | null;
  blocks: AvailableBlock[];
  onClose: () => void;
  onSave: (updated: ScheduleEntry) => void;
}

export const ModifyModal: React.FC<ModifyModalProps> = ({
  entry,
  blocks,
  onClose,
  onSave
}) => {
  const { t, tSection } = useLanguage();
  if (!entry) return null;

  const [blockId, setBlockId] = useState(entry.blockId);
  const [startTime, setStartTime] = useState(entry.startTime);
  const [endTime, setEndTime] = useState(entry.endTime);
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>(entry.approvalStatus);
  const [officerNotes, setOfficerNotes] = useState(entry.officerNotes);

  const handleBlockChange = (selectedBlockId: string) => {
    setBlockId(selectedBlockId);
    const found = blocks.find((b) => b.id === selectedBlockId);
    if (found) {
      setStartTime(found.startTime);
      setEndTime(found.endTime);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...entry,
      blockId,
      startTime,
      endTime,
      approvalStatus,
      officerNotes,
      updatedAt: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 className="modal-title">{t('modal.title')}</h3>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {t('modal.sub')} {entry.id}
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label className="form-label">{t('modal.labelTrackSection')}</label>
            <input
              type="text"
              className="form-input"
              value={tSection(entry.section)}
              disabled
              style={{ opacity: 0.6, cursor: 'not-allowed' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('modal.labelAllocatedBlock')}</label>
            <select
              className="form-select"
              value={blockId}
              onChange={(e) => handleBlockChange(e.target.value)}
            >
              {blocks
                .filter((b) => b.section === entry.section)
                .map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.id} ({b.startTime} - {b.endTime}, {b.durationMinutes}m) - {b.blockType}
                  </option>
                ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">{t('modal.labelStartTime')}</label>
              <input
                type="text"
                className="form-input"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">{t('modal.labelEndTime')}</label>
              <input
                type="text"
                className="form-input"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{t('modal.labelApprovalStatus')}</label>
            <select
              className="form-select"
              value={approvalStatus}
              onChange={(e) => setApprovalStatus(e.target.value as ApprovalStatus)}
            >
              <option value="Approved">{t('modal.statusApprovedOption')}</option>
              <option value="Modified">{t('modal.statusModifiedOption')}</option>
              <option value="Pending Review">{t('modal.statusPendingOption')}</option>
              <option value="Rejected">{t('modal.statusRejectedOption')}</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">{t('modal.labelOfficerJustification')}</label>
            <textarea
              className="form-textarea"
              rows={3}
              value={officerNotes}
              onChange={(e) => setOfficerNotes(e.target.value)}
              placeholder={t('modal.placeholderOfficerNotes')}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn-modify" onClick={onClose}>
              {t('modal.cancelBtn')}
            </button>
            <button type="submit" className="btn-approve">
              <Check size={16} />
              <span>{t('modal.saveBtn')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
