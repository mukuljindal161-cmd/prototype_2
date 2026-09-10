# Phase 8: Prototype Demonstration Script
## AI-Powered Automatic Railway Block Planning System (SIH 2026)

**Target Duration:** 3–4 Minutes  
**Audience:** SIH Evaluators / Railway Operations Technical Jury  
**Key Value Narrative:** *Transitioning from fragmented, departmental silo planning to coordinated, explainable AI-assisted railway block scheduling.*

---

### Demo Scenario Overview
* **Corridor:** Section A–B (Northern Line) and Section B–C (Southern Line).
* **Dataset:** 10 multi-department maintenance tasks, 5 scheduled trains, 5 available corridor blocks.
* **Core Contrast:**
  - *Traditional Way:* Engineering and OHE independently demand separate line blocks on Section A–B, requiring 150 minutes of track closure and potential timetable delays.
  - *RailOpt Way:* The AI engine identifies track geometry and catenary synergy, merges tasks into a single 120-minute **Shadow Block Window** (`BLK-301`), flags an active train conflict on Section B–C (`EXP-305`), and gives the human officer complete oversight to Approve or Modify.

---

### Step-by-Step Presenter Script

#### Step 1: OCC Dashboard (0:00 – 0:45)
* **Action:** Open `http://localhost:5173/`. Point to the top navigation, OCC Live Status pill, and KPI metrics cards.
* **What to Show:**
  - Total Backlog: `10` tasks across Engineering, S&T, and OHE.
  - High-Priority Tasks: `5` critical safety tasks.
  - Available Blocks: `5` windows totaling 690 minutes.
  - Detected Train Conflicts: `1` conflict flagged automatically.
* **Presenter Script:**
  > *"Respected jury members, welcome to RailOpt OCC. In daily railway operations, track maintenance is requested by three independent departments: Civil Engineering, Signaling & Telecom, and Overhead Electrical Traction. Without coordination, these departments demand separate line possessions, leading to underutilized track closures and train delays. RailOpt unifies these demands in real time while maintaining strict human-in-the-loop safety."*

---

#### Step 2: Maintenance Tasks Registry (0:45 – 1:30)
* **Action:** Click **"Maintenance Tasks"** in the navigation bar. Type `TSK-101` in the search bar or filter by *Engineering*.
* **What to Show:**
  - `TSK-101`: Track Joint Weld & Ultrasonic Rail Testing (Critical / Immediate, 90 mins, Priority Score: 95/100).
  - Highlight the transparent score badge (40 for Critical + 35 for Immediate + 20 for Duration = 95).
* **Presenter Script:**
  > *"Here in the Maintenance Tasks Registry, every task is ingested with standardized operational metadata. Notice Task TSK-101: an urgent ultrasonic rail flaw on Section A–B. RailOpt's mathematical scoring engine calculates a deterministic priority score of 95 out of 100 without opaque black-box AI. Let's ask RailOpt to plan this block by clicking 'AI Plan'."*

---

#### Step 3: AI Recommendation & Multi-Department Synergy (1:30 – 2:30)
* **Action:** Click **"AI Plan"** on `TSK-101` to open the **AI Recommendation** view.
* **What to Show:**
  - Target Corridor: `Section A-B` | Recommended Block: `BLK-301` (`09:00 - 11:00`).
  - **Multi-Department Shadow Block Banner:** Combines `TSK-101` (Engineering) and `TSK-103` (S&T) or `TSK-102` (OHE).
  - **Conflict Status:** `Timetable Clear` (green pill).
  - **AI Recommendation Rationale:** Read the 5-sentence explainable justification.
* **Presenter Script:**
  > *"Here is RailOpt's decision intelligence in action. Rather than granting a solitary 90-minute block for Engineering, the engine detected that S&T Task TSK-103 also requires possession on Section A-B. It has coordinated both into a single 120-minute shadow block (BLK-301), saving over 40 minutes of separate track downtime! Crucially, the system cross-referenced the train timetable and confirmed zero passenger train conflicts within this window. Notice that every recommendation produces a clear, auditable sentence-by-sentence explanation."*

---

#### Step 4: Human Officer Review Gate (Approve / Modify / Reject) (2:30 – 3:15)
* **Action:** In the Human Review Gate panel, click **"Approve Block Plan"**.
* **What to Show:**
  - Success toast notification: *"Block Plan for TSK-101+TSK-103 successfully APPROVED and scheduled!"*
  - Automatically transitions to the **Final Block Plan** screen.
  - Newly approved block appears in the official schedule registry with status `Approved`.
* **Presenter Script:**
  > *"Under our project constitution, the AI can never autonomously grant track possession. The human officer holds ultimate authority. We click 'Approve Block Plan'—the system logs the decision and commits the possession directly to the Final Block Plan."*

---

#### Step 5: Corridor Timeline & Train Conflict Protection (3:15 – 4:00)
* **Action:** Point to the **24-Hour Corridor Timeline Visualizer**. Point to `BLK-303` on Section B–C (red slot).
* **What to Show:**
  - Visual Gantt view contrasting train paths (blue) against maintenance blocks (green/red).
  - `BLK-303` overlapping with Express Train `TRN-203` (`EXP-305`, 14:30–15:20).
  - Click **"Modify"** to show officer override capability.
* **Presenter Script:**
  > *"On our 24-hour visual corridor timeline, controllers can instantly spot clearances and overlaps. For instance, on Section B–C, block BLK-303 is highlighted in red because Superfast Express EXP-305 is scheduled right through that window. The officer can simply click 'Modify' to adjust the block timing or impose a speed restriction. In summary: RailOpt cuts block idle time, prevents timetable disruptions, and maintains 100% human accountability."*

---

### Backup Plan (If Network / Local Port Glitch Occurs)
1. **Pre-Rendered Screen Captures:** View artifacts stored in `C:\Users\Mukul Jindal\.gemini\antigravity-ide\brain\790b04cc-6ae8-4a33-b1f4-6b77fd075a2d\`:
   - `dashboard_screen_*.png`
   - `maintenance_tasks_screen_*.png`
   - `ai_recommendation_tsk101_*.png`
   - `after_approve_click_*.png`
2. **Recorded Interaction Walkthrough Video:** Play the generated WebP recording: `verify_prototype_ui_1788690362647.webp`.
3. **Automated Test Validation:** Run `node scripts/test-engine.mjs` in terminal to demonstrate 100% test pass across all 10 edge cases.
