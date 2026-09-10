# RailOpt — AI-Powered Automatic Railway Block Planning System

RailOpt is an intelligent, explainable decision-support system designed to optimize railway maintenance block scheduling across departments (Engineering, S&T, OHE/Traction), harmonize track possessions with timetable train flows, and prevent train delays—with **mandatory Human-in-the-Loop approval**.

---

## 🚆 System Overview

In conventional railway operations, maintenance planning occurs in departmental silos. Track Engineering, Signaling & Telecom, and Electrical Traction independently demand separate track possessions, leading to underutilized track closures, train schedule disruptions, and safety risks.

**RailOpt OCC solves this by:**
1. **Multi-Department Coordination:** Merging compatible maintenance tasks on the same section into unified **Shadow Block Windows** (saving up to 40% of line downtime).
2. **Train Timetable Conflict Protection:** Automatically cross-referencing block intervals against train paths with safety buffers.
3. **Transparent Mathematical Scoring:** Deterministic 0–100 priority scoring with auditable weights (no black-box AI).
4. **Sentence-by-Sentence Natural Explanations:** Clear operational justifications for why blocks are selected or alternatives rejected.
5. **Human Officer Review Gate:** The AI never autonomously grants a block; planning officers have full authority to **Approve**, **Modify**, or **Reject**.

---

## 🛠️ Technology Stack

- **Frontend Application:** React 19 + TypeScript + Vite + Lucide Icons
- **Design System:** Responsive Modern Theme with interactive **Light & Dark Mode** toggle bar, glassmorphism, high-contrast operational status indicators, and an interactive 24-hour Gantt corridor timeline
- **Optimization Engine:** Pure deterministic rule-based algorithms with zero external AI dependencies
- **Runtime:** Node.js (v18+)

---

## 📋 Prerequisites

Make sure you have Node.js and npm installed on your machine:
- **Node.js**: v18.0.0 or higher (Tested on Node v24.16.0)
- **npm**: v9.0.0 or higher (Tested on npm v11.13.0)

Check your versions by running:
```bash
node -v
npm -v
```

---

## 🚀 Quick Start: Running the Project Locally

### 1. Clone or Open the Repository
Open a terminal in the root directory of the project:
```bash
cd "c:\Users\Mukul Jindal\OneDrive\Desktop\prototype2"
```

### 2. Navigate to the Frontend Directory & Install Dependencies
```bash
cd frontend
npm install
```

### 3. Start the Local Development Server
```bash
npm run dev
```

The application will start immediately:
```
  VITE ready in ~700 ms

  ➜  Local:   http://localhost:5173/
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser to access the RailOpt OCC dashboard.

---

## 🧪 Running the Automated Test Suite

RailOpt includes an automated test runner validating all 10 mandatory operational edge cases (normal tasks, high-priority preemption, multi-department coordination, timetable conflict detection, exceeding duration handling, and competing task prioritization):

From the repository root:
```bash
node scripts/test-engine.mjs
```

**Expected output:**
```
=== RAILOPT OCC TEST RUNNER (PHASE 6: 10 SCENARIOS) ===

┌─────────┬────┬──────────────────────────────────────────┬────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ (index) │ #  │ Scenario                                 │ Result │ Detail                                                                                                   │
├─────────┼────┼──────────────────────────────────────────┼────────┼──────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ 0       │ 1  │ 'Normal Task Allocation'                 │ 'PASS' │ 'Score: 55, Candidates: 2 blocks'                                                                        │
│ 1       │ 2  │ 'High-Priority Task Preemption'          │ 'PASS' │ 'Score: 95 (Critical=40, Immediate=35, Duration=20)'                                                     │
│ 2       │ 3  │ 'Two Departments on Same Section'        │ 'PASS' │ 'Found 4 compatible tasks: TSK-102 (OHE/Traction), TSK-103 (S&T), TSK-109 (S&T), TSK-110 (OHE/Traction)' │
│ 3       │ 4  │ 'Three Compatible Tasks'                 │ 'PASS' │ 'Departments identified: Engineering, OHE/Traction, S&T'                                                 │
│ 4       │ 5  │ 'Train Timetable Conflict'               │ 'PASS' │ 'Conflict: YES, Train: EXP-305, Overlap: 14:30 - 15:20'                                                  │
│ 5       │ 6  │ 'No Suitable Block Available'            │ 'PASS' │ 'Candidate blocks returned: 0'                                                                           │
│ 6       │ 7  │ 'Multiple Candidate Blocks for One Task' │ 'PASS' │ 'Matched 3 candidate blocks: BLK-301, BLK-302, BLK-305'                                                  │
│ 7       │ 8  │ 'Invalid / Malformed Input Handling'     │ 'PASS' │ 'Calculated fallback score: 20 without error'                                                            │
│ 8       │ 9  │ 'Task Duration Greater Than Every Block' │ 'PASS' │ 'Candidates: 0; Requires 300m vs max 180m'                                                               │
│ 9       │ 10 │ 'Two Tasks Competing for Same Block'     │ 'PASS' │ 'TSK-101 Score: 95 vs TSK-109 Score: 40 -> Allocated to TSK-101'                                         │
└─────────┴────┴──────────────────────────────────────────┴────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────────┘

OVERALL TEST RESULT: ALL 10 TESTS PASSED (100%)
```

---

## 🏗️ Project Architecture & Directory Structure

```
prototype2/
├── constitution.md           # Charter enshrining prototype scope and human-in-the-loop rules
├── spec.md                   # Phase 0 Functional & Non-Functional Specifications
├── plan.md                   # Phase 1 Data Foundation plan and locked schemas
├── tasks.md                  # Task tracking and dataset compliance verification table
├── TESTS.md                  # Detailed Phase 6 test execution report
├── demo_script.md            # 3-minute evaluator presentation script
├── README.md                 # Project setup and usage instructions
├── data/                     # Single source of truth synthetic datasets
│   ├── tasks.json            # 10 maintenance tasks across 3 departments
│   ├── trains.json           # 5 scheduled corridor passenger/freight trains
│   ├── blocks.json           # 5 available corridor block windows
│   └── initial_schedule.json # Initial operational block plan entries
├── scripts/
│   └── test-engine.mjs       # Automated test runner for the 10 scenarios
└── frontend/                 # Vite + React + TypeScript Web Application
    ├── index.html            # Entry HTML with OCC theme typography
    ├── package.json          # Dependencies & scripts
    └── src/
        ├── App.tsx           # Application orchestrator and state manager
        ├── index.css         # OCC Dark Theme styling and glassmorphic components
        ├── types/
        │   └── index.ts      # TypeScript interfaces for tasks, trains, and blocks
        ├── engine/
        │   └── optimizer.ts  # Priority scoring, candidate matching, and conflict logic
        └── components/
            ├── Navbar.tsx             # OCC navigation and status indicator
            ├── DashboardView.tsx      # Operational KPI cards & department distribution
            ├── TasksView.tsx          # Filterable maintenance tasks registry
            ├── RecommendationView.tsx # AI recommendation and Officer Review Gate
            ├── ScheduleView.tsx       # 24-hour visual corridor timeline and plan
            └── ModifyModal.tsx        # Officer manual override modal
```

---

## 🖥️ Screen-by-Screen User Journey

1. **Dashboard (`/`)**:
   - Aggregated metrics: Total Backlog (10), High-Priority Tasks (5), Available Blocks (5), Train Conflicts (1), Scheduled Blocks.
   - Departmental breakdown charts (Civil Engineering, S&T, Electrical Traction).
   - "Generate AI Block Plan" master action.

2. **Maintenance Tasks Registry**:
   - Filter by Department, Corridor Section, and Criticality tier.
   - Search by Task ID or keyword.
   - Click **"AI Plan"** on any task to trigger targeted optimization.

3. **AI Recommendation & Officer Review Gate**:
   - Inspect Priority Score (0–100) and formula factor breakdown.
   - Multi-department coordination badge (combining cross-department tasks into shadow blocks).
   - Train conflict status alert (identifying affected passenger express trains).
   - Sentence-by-sentence verifiable explanation.
   - Officer Review Actions: **Approve Block Plan**, **Modify Parameters**, or **Reject / Defer**.

4. **Final Block Plan & Corridor Timeline**:
   - Interactive 24-hour timeline visualizing Section A–B and Section B–C.
   - Color-coded slots: Green (Clear Block), Red (Train Conflict), Cyan (Train Passages).
   - Official schedule registry with real-time updates upon officer approval.

---

## 🛡️ Constitution & Safety Guardrails Compliance

- **Synthetic Data Only:** All data is synthetic; no claims of real-time production connections to Indian Railways systems (TMS, SMMS, TDMS, COA, RBS).
- **Zero Autonomous Granting:** Every block allocation terminates at an explicit human officer decision gate.
- **Explainable Mathematics:** 100% auditable formulas—no black-box or fabricated deep learning accuracy claims.

---

## 👥 Authors
Built for the **Smart India Hackathon (SIH 2026)** — AI-Powered Automatic Railway Block Planning System.
