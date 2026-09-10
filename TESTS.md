# Phase 6: Test & Edge Case Verification Report
## AI-Powered Automatic Railway Block Planning System (SIH 2026 Prototype)

This report details the execution and verification of the 10 mandatory operational edge cases defined in Phase 6 of [prototype_spec.md](file:///c:/Users/Mukul%20Jindal/OneDrive/Desktop/prototype2/prototype_spec.md).

**Automated Test Runner:** `node scripts/test-engine.mjs`  
**Execution Timestamp:** 2026-09-06  
**Result:** **10 / 10 Passed (100%)**

---

### Test Scenarios & Results

| # | Test Scenario | Input Data | Expected Output | Actual Observed Output | Status |
| :-: | :--- | :--- | :--- | :--- | :-: |
| **1** | **Normal Task Allocation** | `TSK-108` (Engineering, Medium Criticality, Routine Urgency, 75 mins) | Deterministic score in mid-tier (40–70); candidate blocks located on Section B-C. | Calculated score **55/100**; found 2 suitable candidate blocks (`BLK-303`, `BLK-304`). | <span style="color:#10b981;font-weight:bold">PASS</span> |
| **2** | **High-Priority Task Preemption** | `TSK-101` (Engineering Ultrasonic Rail Test, Critical / Immediate, 90 mins) | Deterministic score $\ge 90$; placed at top of optimization queue. | Calculated score **95/100** (Critical: 40 + Immediate: 35 + Duration: 20); placed first in queue. | <span style="color:#10b981;font-weight:bold">PASS</span> |
| **3** | **Two Departments on Same Section (Combination Test)** | `TSK-101` (Engineering, Sec A-B) evaluated against block `BLK-301` (120 mins) | Engine identifies concurrent cross-department task on Section A-B without spatial conflict. | Identified 4 cross-department candidate tasks: `TSK-102` (OHE), `TSK-103` (S&T), `TSK-109` (S&T), `TSK-110` (OHE). Coordinated into shadow block. | <span style="color:#10b981;font-weight:bold">PASS</span> |
| **4** | **Three Compatible Tasks** | Task pool on `Section A-B` across departments | Validates that Engineering, S&T, and OHE can all be represented and evaluated for joint possession. | All 3 departments detected on corridor; multi-department coordination flag asserted. | <span style="color:#10b981;font-weight:bold">PASS</span> |
| **5** | **Train Timetable Conflict** | `BLK-303` (14:00–16:00, Section B-C) evaluated against train schedule | Detects overlap with Superfast Express `TRN-203` (`EXP-305`, 14:30–15:20); triggers officer alert. | Flagged: **Train Conflict Detected** against Train `EXP-305` (Corridor Superfast Express) at `14:30 - 15:20`. | <span style="color:#10b981;font-weight:bold">PASS</span> |
| **6** | **No Suitable Block Available** | Synthetic work order on an unserved or out-of-schedule section | Zero candidate blocks returned; triggers graceful deferral notice. | Returned 0 candidate blocks; logged officer deferral notice without crash. | <span style="color:#10b981;font-weight:bold">PASS</span> |
| **7** | **Multiple Candidate Blocks for One Task** | `TSK-103` (S&T Point Machine Overhaul, 45 mins, Section A-B) | Multiple candidate blocks returned ($\ge 2$); engine selects optimal time slot. | Matched 3 available blocks (`BLK-301`, `BLK-302`, `BLK-305`); selected `BLK-301` for morning execution. | <span style="color:#10b981;font-weight:bold">PASS</span> |
| **8** | **Invalid / Malformed Input Handling** | Malformed task record missing `criticality` and `urgency` fields | Safe mathematical fallback; zero NaN errors or crashes. | Fallback calculated score: **20/100**; no application panic or uncaught exception. | <span style="color:#10b981;font-weight:bold">PASS</span> |
| **9** | **Task Duration Greater Than Every Block** | `TSK-106` (Engineering Mechanized Deep Screening, 300 mins) vs max block (180 mins) | Duration (300m) exceeds corridor max capacity (180m); triggers mega-block recommendation. | Candidate count: 0; explanation explicitly informs officer that 300m exceeds max 180m block and recommends special possession. | <span style="color:#10b981;font-weight:bold">PASS</span> |
| **10**| **Two Tasks Competing for Same Block** | `TSK-101` (Critical, Score: 95) vs `TSK-109` (Low, Score: 40) competing for `BLK-301` | Deterministic preemption based on priority formula. | Score 95 > Score 40 $\implies$ `TSK-101` preempts `TSK-109` and is granted the primary block slot. | <span style="color:#10b981;font-weight:bold">PASS</span> |

---

### Verification Summary
* All 10 cases executed deterministically with identical outputs on repeated runs.
* Full traceability between mathematical formulas, dataset records, and user interface elements.
