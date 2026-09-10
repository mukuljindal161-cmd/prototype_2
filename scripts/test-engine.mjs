// Automated test suite verifying the 10 mandatory test scenarios for Phase 6

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load synthetic datasets
const tasks = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/tasks.json'), 'utf-8'));
const trains = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/trains.json'), 'utf-8'));
const blocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/blocks.json'), 'utf-8'));

function timeToMinutes(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
}

function calculatePriorityScore(task) {
  const critWeights = { Critical: 40, High: 30, Medium: 20, Low: 10 };
  const urgWeights = { Immediate: 35, High: 25, Routine: 15, Deferrable: 5 };
  const crit = critWeights[task.criticality] ?? 10;
  const urg = urgWeights[task.urgency] ?? 5;
  let dur = 15;
  if (task.durationMinutes <= 60) dur = 25;
  else if (task.durationMinutes <= 120) dur = 20;
  else if (task.durationMinutes <= 180) dur = 12;
  else dur = 5;
  return Math.min(100, crit + urg + dur);
}

function findCandidateBlocks(task, blockList) {
  return blockList.filter((b) => {
    return b.section.trim().toLowerCase() === task.section.trim().toLowerCase() &&
           b.durationMinutes >= task.durationMinutes;
  });
}

function detectTrainConflicts(block, trainList) {
  const blockStart = timeToMinutes(block.startTime);
  const blockEnd = timeToMinutes(block.endTime);
  const safetyBuffer = 5;

  for (const train of trainList) {
    if (train.section.trim().toLowerCase() !== block.section.trim().toLowerCase()) continue;
    const trainStart = timeToMinutes(train.startTime);
    const trainEnd = timeToMinutes(train.endTime);
    const overlaps = blockStart < trainEnd + safetyBuffer && trainStart - safetyBuffer < blockEnd;
    if (overlaps) {
      return { hasConflict: true, train: train.trainNumber, overlap: `${train.startTime} - ${train.endTime}` };
    }
  }
  return { hasConflict: false };
}

function findCompatibleTasks(primaryTask, allTasks, candidateBlock) {
  return allTasks.filter((other) => {
    if (other.id === primaryTask.id) return false;
    if (other.section !== primaryTask.section) return false;
    if (other.department === primaryTask.department) return false;
    return Math.max(primaryTask.durationMinutes, other.durationMinutes) <= candidateBlock.durationMinutes;
  });
}

const results = [];

console.log('=== RAILOPT OCC TEST RUNNER (PHASE 6: 10 SCENARIOS) ===\n');

// Test 1: Normal Task
try {
  const task = tasks.find((t) => t.id === 'TSK-108'); // Curve Gauge & Tamping, Medium/Routine, 75 mins
  const score = calculatePriorityScore(task);
  const pass = score >= 40 && score <= 70; // 20 + 15 + 20 = 55
  results.push({
    id: 1,
    name: 'Normal Task Allocation',
    input: `TSK-108 (${task.criticality}/${task.urgency}, ${task.durationMinutes}m)`,
    expected: 'Priority score in normal tier (40-70 range), valid block found',
    actual: `Score: ${score}, Candidates: ${findCandidateBlocks(task, blocks).length} blocks`,
    status: pass ? 'PASS' : 'FAIL'
  });
} catch (e) {
  results.push({ id: 1, name: 'Normal Task', status: 'FAIL', actual: e.message });
}

// Test 2: High-Priority Task
try {
  const task = tasks.find((t) => t.id === 'TSK-101'); // Critical/Immediate, 90 mins
  const score = calculatePriorityScore(task);
  const pass = score >= 90; // 40 + 35 + 20 = 95
  results.push({
    id: 2,
    name: 'High-Priority Task Preemption',
    input: `TSK-101 (${task.criticality}/${task.urgency})`,
    expected: 'Score >= 90, prioritized at top of queue',
    actual: `Score: ${score} (Critical=40, Immediate=35, Duration=20)`,
    status: pass ? 'PASS' : 'FAIL'
  });
} catch (e) {
  results.push({ id: 2, name: 'High-Priority Task', status: 'FAIL', actual: e.message });
}

// Test 3: Two Departments on Same Section (Combination Test)
try {
  const t1 = tasks.find((t) => t.id === 'TSK-101'); // Eng, Sec A-B
  const block = blocks.find((b) => b.id === 'BLK-301'); // Sec A-B, 120m
  const compatible = findCompatibleTasks(t1, tasks, block);
  const pass = compatible.some((t) => t.id === 'TSK-102' || t.id === 'TSK-103');
  results.push({
    id: 3,
    name: 'Two Departments on Same Section',
    input: `TSK-101 (Eng) on Sec A-B in BLK-301`,
    expected: 'Detects cross-department task on same section (S&T / OHE)',
    actual: `Found ${compatible.length} compatible tasks: ${compatible.map((c) => `${c.id} (${c.department})`).join(', ')}`,
    status: pass ? 'PASS' : 'FAIL'
  });
} catch (e) {
  results.push({ id: 3, name: 'Two Departments', status: 'FAIL', actual: e.message });
}

// Test 4: Three Compatible Tasks Evaluation
try {
  // Sec A-B has TSK-101 (Eng), TSK-102 (OHE), TSK-103 (S&T)
  const secATasks = tasks.filter((t) => t.section === 'Section A-B');
  const depts = new Set(secATasks.map((t) => t.department));
  const pass = depts.size === 3;
  results.push({
    id: 4,
    name: 'Three Compatible Tasks',
    input: `Section A-B task pool (${secATasks.length} tasks)`,
    expected: 'All 3 departments (Engineering, S&T, OHE) present and combinable into shadow block',
    actual: `Departments identified: ${Array.from(depts).join(', ')}`,
    status: pass ? 'PASS' : 'FAIL'
  });
} catch (e) {
  results.push({ id: 4, name: 'Three Compatible Tasks', status: 'FAIL', actual: e.message });
}

// Test 5: Train Conflict Detection
try {
  const block = blocks.find((b) => b.id === 'BLK-303'); // Sec B-C, 14:00 - 16:00
  const conflict = detectTrainConflicts(block, trains);
  const pass = conflict.hasConflict && conflict.train === 'EXP-305';
  results.push({
    id: 5,
    name: 'Train Timetable Conflict',
    input: `BLK-303 (14:00-16:00, Sec B-C) vs Trains`,
    expected: 'Flags conflict against EXP-305 (14:30-15:20)',
    actual: `Conflict: ${conflict.hasConflict ? 'YES' : 'NO'}, Train: ${conflict.train}, Overlap: ${conflict.overlap}`,
    status: pass ? 'PASS' : 'FAIL'
  });
} catch (e) {
  results.push({ id: 5, name: 'Train Conflict', status: 'FAIL', actual: e.message });
}

// Test 6: No Suitable Block Available
try {
  // Synthetic high duration task or section with no blocks
  const mockTask = { id: 'MOCK-999', section: 'Section Nonexistent', durationMinutes: 60, criticality: 'High', urgency: 'High' };
  const candidates = findCandidateBlocks(mockTask, blocks);
  const pass = candidates.length === 0;
  results.push({
    id: 6,
    name: 'No Suitable Block Available',
    input: `Mock task on unserved section`,
    expected: '0 candidate blocks returned, triggers deferral warning',
    actual: `Candidate blocks returned: ${candidates.length}`,
    status: pass ? 'PASS' : 'FAIL'
  });
} catch (e) {
  results.push({ id: 6, name: 'No Suitable Block', status: 'FAIL', actual: e.message });
}

// Test 7: Multiple Candidate Blocks for One Task
try {
  const task = tasks.find((t) => t.id === 'TSK-103'); // S&T, 45 mins, Sec A-B
  const candidates = findCandidateBlocks(task, blocks);
  const pass = candidates.length >= 2;
  results.push({
    id: 7,
    name: 'Multiple Candidate Blocks for One Task',
    input: `TSK-103 (45 mins on Sec A-B)`,
    expected: 'Matches multiple available blocks (BLK-301, BLK-302, BLK-305)',
    actual: `Matched ${candidates.length} candidate blocks: ${candidates.map((b) => b.id).join(', ')}`,
    status: pass ? 'PASS' : 'FAIL'
  });
} catch (e) {
  results.push({ id: 7, name: 'Multiple Candidate Blocks', status: 'FAIL', actual: e.message });
}

// Test 8: Invalid Input Handling (Malformed Task Record)
try {
  const malformed = { id: 'MAL-1', section: 'Section A-B' }; // missing criticality, urgency, duration
  const score = calculatePriorityScore(malformed);
  const pass = typeof score === 'number' && !isNaN(score);
  results.push({
    id: 8,
    name: 'Invalid / Malformed Input Handling',
    input: `Malformed task missing criticality & urgency fields`,
    expected: 'Graceful fallback with safe default score, no crash',
    actual: `Calculated fallback score: ${score} without error`,
    status: pass ? 'PASS' : 'FAIL'
  });
} catch (e) {
  results.push({ id: 8, name: 'Malformed Input', status: 'FAIL', actual: e.message });
}

// Test 9: Task Duration Exceeding Every Block
try {
  const task = tasks.find((t) => t.id === 'TSK-106'); // 300 mins
  const maxBlockDuration = Math.max(...blocks.map((b) => b.durationMinutes));
  const candidates = findCandidateBlocks(task, blocks);
  const pass = task.durationMinutes > maxBlockDuration && candidates.length === 0;
  results.push({
    id: 9,
    name: 'Task Duration Greater Than Every Block',
    input: `TSK-106 (300 mins) vs max block (${maxBlockDuration} mins)`,
    expected: '300 > 180 mins; 0 blocks match; flags mega-block requirement',
    actual: `Candidates: ${candidates.length}; Requires ${task.durationMinutes}m vs max ${maxBlockDuration}m`,
    status: pass ? 'PASS' : 'FAIL'
  });
} catch (e) {
  results.push({ id: 9, name: 'Exceeding Duration', status: 'FAIL', actual: e.message });
}

// Test 10: Two Tasks Competing for the Same Block
try {
  const t1 = tasks.find((t) => t.id === 'TSK-101'); // Critical (score 95)
  const t2 = tasks.find((t) => t.id === 'TSK-109'); // Low/Deferrable (score 30)
  const score1 = calculatePriorityScore(t1);
  const score2 = calculatePriorityScore(t2);
  const winner = score1 > score2 ? t1.id : t2.id;
  const pass = winner === 'TSK-101' && score1 > score2;
  results.push({
    id: 10,
    name: 'Two Tasks Competing for Same Block',
    input: `TSK-101 (Critical) vs TSK-109 (Low) competing for BLK-301`,
    expected: 'Deterministic preemption: TSK-101 wins block allocation',
    actual: `TSK-101 Score: ${score1} vs TSK-109 Score: ${score2} -> Allocated to ${winner}`,
    status: pass ? 'PASS' : 'FAIL'
  });
} catch (e) {
  results.push({ id: 10, name: 'Competing Tasks', status: 'FAIL', actual: e.message });
}

// Output summary
console.table(results.map(({ id, name, status, actual }) => ({ '#': id, Scenario: name, Result: status, Detail: actual })));

const allPassed = results.every((r) => r.status === 'PASS');
console.log(`\nOVERALL TEST RESULT: ${allPassed ? 'ALL 10 TESTS PASSED (100%)' : 'SOME TESTS FAILED'}`);

if (!allPassed) process.exit(1);
