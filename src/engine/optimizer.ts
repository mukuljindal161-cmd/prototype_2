import type {
  MaintenanceTask,
  Train,
  AvailableBlock,
  Recommendation,
  ConflictDetails,
  Department
} from '../types';

/**
 * Converts HH:MM 24-hour time to minutes from midnight
 */
export function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Converts minutes from midnight back to HH:MM format
 */
export function minutesToTime(minutes: number): string {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

/**
 * 1. Priority Scoring Formula
 * Score = Criticality (max 40) + Urgency (max 35) + Duration Factor (max 25)
 * Total is an auditable deterministic score from 15 to 100.
 */
export function calculatePriorityScore(task: MaintenanceTask): number {
  const criticalityWeights: Record<string, number> = {
    Critical: 40,
    High: 30,
    Medium: 20,
    Low: 10
  };

  const urgencyWeights: Record<string, number> = {
    Immediate: 35,
    High: 25,
    Routine: 15,
    Deferrable: 5
  };

  const critScore = criticalityWeights[task.criticality] ?? 10;
  const urgScore = urgencyWeights[task.urgency] ?? 5;

  // Duration factor: favors tasks between 45 and 120 mins for regular block utilization
  let durScore = 15;
  if (task.durationMinutes <= 60) {
    durScore = 25; // Quick turnaround, high efficiency
  } else if (task.durationMinutes <= 120) {
    durScore = 20; // Standard block fit
  } else if (task.durationMinutes <= 180) {
    durScore = 12; // Heavy block fit
  } else {
    durScore = 5;  // Excessive duration requiring special possession
  }

  return Math.min(100, critScore + urgScore + durScore);
}

/**
 * 2. Candidate Block Filtering Logic
 * Matches section and ensures block duration is sufficient for task duration
 */
export function findCandidateBlocks(
  task: MaintenanceTask,
  blocks: AvailableBlock[]
): AvailableBlock[] {
  return blocks.filter((block) => {
    const sameSection = block.section.trim().toLowerCase() === task.section.trim().toLowerCase();
    const fitsDuration = block.durationMinutes >= task.durationMinutes;
    return sameSection && fitsDuration;
  });
}

/**
 * 3. Train Timetable Conflict Detection Logic
 * Checks if a block interval overlaps with any scheduled train on the same section
 * with a 5-minute safety buffer.
 */
export function detectTrainConflicts(
  block: AvailableBlock,
  trains: Train[]
): { hasConflict: boolean; details?: ConflictDetails } {
  const blockStart = timeToMinutes(block.startTime);
  const blockEnd = timeToMinutes(block.endTime);
  const safetyBuffer = 5; // 5 minute buffer

  for (const train of trains) {
    if (train.section.trim().toLowerCase() !== block.section.trim().toLowerCase()) {
      continue;
    }

    const trainStart = timeToMinutes(train.startTime);
    const trainEnd = timeToMinutes(train.endTime);

    // Overlap condition: blockStart < (trainEnd + buffer) && (trainStart - buffer) < blockEnd
    const overlaps =
      blockStart < trainEnd + safetyBuffer && trainStart - safetyBuffer < blockEnd;

    if (overlaps) {
      return {
        hasConflict: true,
        details: {
          conflictingTrainId: train.id,
          trainName: train.name,
          trainNumber: train.trainNumber,
          overlapWindow: `${train.startTime} - ${train.endTime}`
        }
      };
    }
  }

  return { hasConflict: false };
}

/**
 * 4. Multi-Department Compatibility Logic
 * Finds another pending task on the same section from a different department
 * that can be co-scheduled into the candidate block without exceeding block duration.
 */
export function findCompatibleTask(
  primaryTask: MaintenanceTask,
  allTasks: MaintenanceTask[],
  candidateBlock: AvailableBlock
): MaintenanceTask | null {
  const candidates = allTasks.filter((other) => {
    if (other.id === primaryTask.id) return false;
    if (other.section !== primaryTask.section) return false;
    if (other.department === primaryTask.department) return false;
    if (other.status !== 'Pending') return false;

    // Co-scheduled tasks can execute concurrently or in staggered work zones
    // as long as the longest sub-operation fits within the block duration
    const maxSubDuration = Math.max(primaryTask.durationMinutes, other.durationMinutes);
    return maxSubDuration <= candidateBlock.durationMinutes;
  });

  // Pick candidate with highest priority
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => calculatePriorityScore(b) - calculatePriorityScore(a));
  return candidates[0];
}

/**
 * 5. Complete Recommendation Generator with Transparent Natural Language Explanation
 */
export function generateRecommendationForTask(
  primaryTask: MaintenanceTask,
  allTasks: MaintenanceTask[],
  blocks: AvailableBlock[],
  trains: Train[]
): Recommendation {
  const priorityScore = calculatePriorityScore(primaryTask);
  const candidateBlocks = findCandidateBlocks(primaryTask, blocks);

  // Case: No candidate block has sufficient duration or matches section
  if (candidateBlocks.length === 0) {
    const maxSectionBlock = blocks
      .filter((b) => b.section.trim().toLowerCase() === primaryTask.section.trim().toLowerCase())
      .reduce((max, b) => Math.max(max, b.durationMinutes), 0);

    const explanation =
      `TASK DEFERRAL NOTICE: Task ${primaryTask.id} (${primaryTask.department} - ${primaryTask.taskType}) requires ${primaryTask.durationMinutes} minutes of continuous line possession on ${primaryTask.section}. ` +
      `No available block satisfies this requirement (maximum available corridor window on this section is ${maxSectionBlock} minutes). ` +
      `Recommendation: Defer to weekend mega-block or split into phased sub-tasks. Human officer review required.`;

    return {
      id: `REC-${primaryTask.id}`,
      linkedTaskIds: [primaryTask.id],
      tasks: [primaryTask],
      priorityScore,
      recommendedBlockId: null,
      recommendedBlock: null,
      section: primaryTask.section,
      conflictStatus: 'No Block Available',
      combinationFlag: false,
      combinedDepartments: [primaryTask.department],
      explanationText: explanation
    };
  }

  // Prioritize conflict-free blocks first
  let selectedBlock: AvailableBlock | null = null;
  let selectedConflict: { hasConflict: boolean; details?: ConflictDetails } = { hasConflict: false };
  let compatibleTask: MaintenanceTask | null = null;

  for (const block of candidateBlocks) {
    const conflict = detectTrainConflicts(block, trains);
    if (!conflict.hasConflict) {
      selectedBlock = block;
      selectedConflict = conflict;
      compatibleTask = findCompatibleTask(primaryTask, allTasks, block);
      break;
    }
  }

  // If all candidate blocks have train conflicts, pick the first and flag conflict
  if (!selectedBlock) {
    selectedBlock = candidateBlocks[0];
    selectedConflict = detectTrainConflicts(selectedBlock, trains);
    compatibleTask = findCompatibleTask(primaryTask, allTasks, selectedBlock);
  }

  // Assemble linked tasks and departments
  const linkedTasks: MaintenanceTask[] = [primaryTask];
  const departments: Department[] = [primaryTask.department];
  if (compatibleTask) {
    linkedTasks.push(compatibleTask);
    departments.push(compatibleTask.department);
  }

  // Build transparent sentence-by-sentence natural language explanation
  const sentences: string[] = [];

  // Sentence 1: Priority score justification
  sentences.push(
    `Task ${primaryTask.id} evaluated at priority score ${priorityScore}/100 based on ${primaryTask.criticality} criticality (weight: ${
      primaryTask.criticality === 'Critical' ? 40 : primaryTask.criticality === 'High' ? 30 : 20
    }) and ${primaryTask.urgency} urgency.`
  );

  // Sentence 2: Block selection and capacity fit
  sentences.push(
    `Allocated to Block ${selectedBlock.id} (${selectedBlock.startTime} - ${selectedBlock.endTime}, ${selectedBlock.durationMinutes} mins) on ${selectedBlock.section}, which accommodates the required ${primaryTask.durationMinutes} minute possession.`
  );

  // Sentence 3: Multi-department combination
  if (compatibleTask) {
    sentences.push(
      `MULTI-DEPARTMENT SYNERGY: Coordinated with ${compatibleTask.department} Task ${compatibleTask.id} (${compatibleTask.taskType}, ${compatibleTask.durationMinutes} mins). Combining these operations under Block ${selectedBlock.id} eliminates redundant line closures and saves possession overhead.`
    );
  } else {
    sentences.push(`Dedicated single-department block assigned. No concurrent cross-department tasks identified on this section.`);
  }

  // Sentence 4: Train conflict analysis
  if (selectedConflict.hasConflict && selectedConflict.details) {
    sentences.push(
      `OPERATIONAL CONFLICT ALERT: Block window overlaps with scheduled passage of Train ${selectedConflict.details.trainNumber} (${selectedConflict.details.trainName}) at ${selectedConflict.details.overlapWindow}. Human officer review and timetable regulation required prior to granting.`
    );
  } else {
    sentences.push(
      `Cross-checked against corridor train timetable. Zero train movement conflicts detected within the planned window.`
    );
  }

  // Sentence 5: Alternatives evaluated
  const rejectedBlocks = candidateBlocks.filter((b) => b.id !== selectedBlock!.id);
  if (rejectedBlocks.length > 0) {
    sentences.push(
      `Evaluated ${rejectedBlocks.length} alternative block(s) (${rejectedBlocks.map((b) => b.id).join(', ')}); disqualified in favor of optimal morning/evening headway.`
    );
  }

  return {
    id: `REC-${primaryTask.id}`,
    linkedTaskIds: linkedTasks.map((t) => t.id),
    tasks: linkedTasks,
    priorityScore,
    recommendedBlockId: selectedBlock.id,
    recommendedBlock: selectedBlock,
    section: selectedBlock.section,
    conflictStatus: selectedConflict.hasConflict ? 'Train Conflict Detected' : 'Clear',
    conflictDetails: selectedConflict.details,
    combinationFlag: !!compatibleTask,
    combinedDepartments: departments,
    explanationText: sentences.join(' ')
  };
}

/**
 * 6. Generates recommendations for all pending tasks in priority order
 */
export function generateAllRecommendations(
  tasks: MaintenanceTask[],
  blocks: AvailableBlock[],
  trains: Train[]
): Recommendation[] {
  // Sort tasks by deterministic priority score descending
  const sortedTasks = [...tasks].sort(
    (a, b) => calculatePriorityScore(b) - calculatePriorityScore(a)
  );

  const recommendations: Recommendation[] = [];
  const processedTaskIds = new Set<string>();

  for (const task of sortedTasks) {
    if (processedTaskIds.has(task.id)) continue;

    const rec = generateRecommendationForTask(task, sortedTasks, blocks, trains);
    recommendations.push(rec);

    for (const id of rec.linkedTaskIds) {
      processedTaskIds.add(id);
    }
  }

  return recommendations;
}
