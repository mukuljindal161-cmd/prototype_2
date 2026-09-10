# Phase 0 Specification: AI-Powered Automatic Railway Block Planning System
## Feature: `railway-block-planning-prototype`

---

### 1. Product Objective
The **AI-Powered Automatic Railway Block Planning System** is an intelligent, transparent decision-support system designed to automate the coordination of railway track maintenance blocks. In traditional railway operations, maintenance planning between track engineering, signaling & telecommunication, and overhead electrification departments occurs in silos, leading to underutilized track closures, train schedule disruptions, and safety risks. This system harmonizes multi-department maintenance backlogs with timetable train flows, computes deterministic priority rankings, recommends optimal coordinated block windows with train conflict protection, and presents explainable justifications to railway planning officers who hold the ultimate approval authority.

---

### 2. Primary User Persona
* **Role:** Railway Maintenance Planning Officer / Chief Controller (Operating & Maintenance).
* **Environment:** Divisional Railway Operations Control Centre (OCC).
* **Goal:** Maximize maintenance throughput across track sections while minimizing train disruptions, eliminating departmental conflicts, and coordinating joint maintenance windows.

---

### 3. Core User Journey
The operational journey consists of a seamless 9-stage pipeline:
1. **Maintenance Backlog Ingestion:** The officer reviews maintenance requests submitted across departments (Engineering, S&T, OHE/Traction) categorized by criticality, urgency, and estimated duration.
2. **Train Timetable Cross-Reference:** The system ingests planned train movements (passenger express, local, freight) across corridor sections.
3. **Block Window Discovery:** The system identifies candidate track closure windows (available blocks) across sections and time slots.
4. **Transparent Priority Scoring:** Tasks are scored using an auditable mathematical model based on safety criticality, operational urgency, and duration factors.
5. **Candidate Block Matching:** Candidate blocks are filtered based on section compatibility and duration sufficiency.
6. **Train Conflict Detection:** Block intervals are cross-referenced with train timetable paths; potential train movement overlaps trigger visual conflict warnings.
7. **Multi-Department Coordination:** The engine identifies compatible tasks from different departments on the same section and bundles them into a single, unified "shadow block" to save track possession time.
8. **Recommendation & Natural Explanation:** The system presents the recommended block allocation accompanied by a clear, step-by-step natural language explanation of why the block was selected, what tasks are combined, and any train buffer considerations.
9. **Human-in-the-Loop Decision & Final Schedule:** The planning officer reviews the recommendation and executes **Approve** (commits to schedule), **Modify** (adjusts block/time), or **Reject** (returns task to queue with note). The Final Block Plan updates immediately.

---

### 4. Functional Requirements (Testable & Traceable)

| ID | Functional Requirement | UI Mapping / Target Screen | Traceable Field / Interaction |
| :--- | :--- | :--- | :--- |
| **FR-1** | System shall display aggregated key operational metrics: total pending tasks, high-priority tasks count, available block count, train conflict warnings, and scheduled blocks. | **Dashboard** | Metric KPI cards: Total Tasks, High Priority, Available Blocks, Conflicts, Scheduled |
| **FR-2** | System shall display departmental task breakdown (Engineering, S&T, OHE) and corridor status overview. | **Dashboard** | Departmental distribution cards and corridor activity status |
| **FR-3** | System shall list all maintenance tasks with complete operational attributes in a filterable table. | **Maintenance Tasks** | Columns: Task ID, Department, Section, Task Type, Criticality, Urgency, Duration (mins), Status |
| **FR-4** | System shall provide filtering of maintenance tasks by department, section, priority tier, and status. | **Maintenance Tasks** | Filter dropdowns & search bar |
| **FR-5** | System shall calculate a deterministic numerical priority score for each task based on weighted criticality, urgency, and duration factors. | **AI Recommendation** / **Maintenance Tasks** | "Priority Score" numerical badge (0–100 scale) |
| **FR-6** | System shall evaluate candidate blocks for a selected task or batch of tasks based on track section matching and duration capability. | **AI Recommendation** | "Candidate Block" selector and details (Block ID, Section, Start/End Time, Capacity) |
| **FR-7** | System shall detect time-window overlaps between candidate blocks and scheduled train passages on the section, flagging conflicts explicitly. | **AI Recommendation** / **Dashboard** | "Conflict Status" badge (Clear / Conflict Detected) with affected train ID and time overlap |
| **FR-8** | System shall identify multi-department compatibility where two or more tasks on the same section can be executed concurrently within one block. | **AI Recommendation** | "Coordinated Block / Combination Possibility" indicator with co-scheduled Task IDs |
| **FR-9** | System shall generate a transparent, human-readable natural language explanation detailing: why the block was picked, alternative rejections, combined tasks, and train conflict status. | **AI Recommendation** | "AI Recommendation Rationale" explanation card with verifiable sentence breakdown |
| **FR-10**| System shall provide an interactive Human Review Gate with explicit "Approve", "Modify", and "Reject" action buttons. | **AI Recommendation** / **Final Block Plan** | Action buttons: `Approve Block`, `Modify Block`, `Reject Block` |
| **FR-11**| System shall display the finalized block plan in an operational timeline and tabular schedule. | **Final Block Plan** | Visual timeline of blocks (time vs section) and table showing Block ID, Time Window, Section, Assigned Tasks, Departments, and Approval Status |
| **FR-12**| System shall allow manual override (Modify) of assigned block times or task assignments prior to schedule locking. | **Final Block Plan** | "Modify Schedule Entry" modal / edit controls |

---

### 5. Non-Functional Requirements
* **Explainability & Transparency:** 100% of priority scores and block recommendations must be traceable to mathematical formulas and rule-based logic. No black-box decisions.
* **Human-in-the-Loop Authority:** The system shall never transition a block to "Approved" or "Granted" without human officer confirmation.
* **Deterministic Reproducibility:** Given identical input datasets, the engine must produce identical rankings, block assignments, and explanation texts on every run.
* **Performance & Responsiveness:** Recommendation generation and conflict detection across the prototype corridor dataset must execute in under 200 milliseconds.
* **Clarity & Mission-Critical UX:** The user interface must employ high-contrast operational status indicators (Clear/Emerald, Warning/Amber, Conflict/Crimson), legible typography, and intuitive visual navigation.

---

### 6. Explicit Out-of-Scope List
1. Direct API integrations with live Indian Railways production systems (TMS, SMMS, TDMS, COA, RBS).
2. Live GPS feed ingestion or automated real-time rescheduling for unexpected live train delays.
3. Heavy machinery (e.g., track tamping machines, crane rakes) or maintenance crew shift rostering.
4. Annual or multi-month capital budget planning.
5. 3D digital twins, AR maintenance guides, or voice-activated interfaces.
6. Multi-tenant enterprise authentication, microservices clustering, or Kubernetes infrastructure.

---

### 7. Success Criteria for the Demonstration
The prototype demonstration is considered successful if all the following conditions are met:
1. **Four Fully Functional Screens:** Dashboard, Maintenance Tasks, AI Recommendation, and Final Block Plan are navigable and interactive.
2. **Deterministic Priority Ranking:** High-criticality safety tasks are prioritized over routine and deferrable tasks.
3. **Multi-Department Coordination Demonstrated:** Two distinct tasks (e.g., Engineering rail joint inspection and OHE catenary adjustment on Section A–B) are successfully identified as combinable and scheduled inside a single coordinated block.
4. **Train Conflict Detection Demonstrated:** A candidate block overlapping a passenger train timetable is clearly flagged with a Crimson conflict alert and explanatory justification.
5. **Handling Edge Cases:** A task whose duration exceeds all available blocks is gracefully flagged as "No Suitable Block Available" with deferral guidance.
6. **Human Officer Gate Verified:** The officer can review the generated plan, click "Approve", and observe the immediate update in the Final Block Plan.

---

### 8. Main Demo Scenario Overview
In the prototype demonstration corridor (Section A–B and Section B–C), the planning officer inspects 10 pending maintenance tasks submitted by Engineering, S&T, and OHE. The officer observes that Section A–B has two independent tasks: a high-criticality Track Joint Weld (Engineering, 90 mins) and a routine Catenary Cantilever Check (OHE, 60 mins). Rather than requesting two separate line closures (totaling 150 mins of disruption), the AI Block Planning engine identifies that an available 120-minute morning block (Block BLK-101, 09:00–11:00) can accommodate both tasks concurrently without train conflict. Meanwhile, on Section B–C, an afternoon block (BLK-103) is flagged with an active conflict against Express Train EXP-204, triggering an officer warning. The officer reviews the generated rationale, approves the Section A–B coordinated block, and modifies the Section B–C proposal, resulting in a locked, conflict-free Final Block Plan.
