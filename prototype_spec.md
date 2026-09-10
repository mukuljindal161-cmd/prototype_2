# Antigravity Spec-Driven Development Prompt Pack
## AI-Powered Automatic Railway Block Planning System — SIH 2026 Prototype

This pack re-expresses your phase-wise plan in Google Antigravity's native
spec-driven development (SDD) model. Antigravity works off **Artifacts**
(not chat logs) that you review and approve before any code is written:

| Antigravity artifact | What it holds in this project |
|---|---|
| `constitution.md` | Non-negotiable rules: prototype scope, safety rules, what must never be built |
| `spec.md` | Phase 0 — WHAT/WHY: user journey, functional/non-functional requirements, demo scenario |
| `plan.md` (per phase) | HOW: architecture, schemas, files, tech choices for that phase |
| `tasks.md` (per phase) | Dependency-ordered, reviewable task list Antigravity executes against |

Antigravity will ask you to **review and approve each artifact** before
moving to the next stage — this naturally satisfies your "manual review
before execution" rule, so every prompt below is still labeled
**"PROMPT TO BE REVIEWED BEFORE EXECUTION"** as an extra checkpoint.

Feed the prompts in order, one at a time. Don't skip ahead. After each one,
open the generated artifact, edit anything wrong, and only then tell
Antigravity to proceed.

---

## 0. One-time setup: the Constitution

Run this **first, before anything else**. In Antigravity this becomeshttps://127.0.0.1:63558/static/artifacts/076d6dee-505b-4c61-928d-5701c9db938a/.user_uploaded/media_1788873404625.jpg?csrf=b97b8e7d-a5e6-47ed-b772-8bb7749a082c
`.agents/memory/constitution.md` (or `.agent/constitution.md` depending on
your Antigravity version) and is loaded into every later stage
automatically, so you don't have to repeat these rules in every prompt.

> **PROMPT TO BE REVIEWED BEFORE EXECUTION**
>
> Create the project constitution for this repository. This is a
> governing document, not code — do not write or scaffold any code yet.
>
> **Objective:** Record the non-negotiable rules for the "AI-Powered
> Automatic Railway Block Planning System" SIH 2026 prototype so every
> later spec/plan/task you generate is automatically checked against them.
>
> **Content to capture in `constitution.md`:**
> 1. This is an SIH hackathon **prototype/demo**, not a production railway
>    system. Never claim or imply real integration with TMS, SMMS, TDMS,
>    COA, or RBS. Never fabricate claims about Indian Railways.
> 2. All data is **synthetic/sample data** generated for this project.
> 3. Prototype scope is limited to ONE corridor, three departments
>    (Engineering, S&T, OHE/Traction), and the flow: maintenance tasks →
>    train timetable → available blocks → priority scoring → candidate
>    block selection → conflict detection → multi-department
>    compatibility → recommendation with explanation → human
>    approve/modify/reject → final block plan.
> 4. Priority scoring must be a transparent rule-based or mathematical
>    model. Never claim ML accuracy figures that don't exist. Do not use
>    deep learning; do not use complex ML unless explicitly justified in a
>    later plan.
> 5. The AI **must never autonomously grant** a maintenance block — every
>    recommendation ends at Approve / Modify / Reject by a human officer.
> 6. Out-of-scope for this prototype (reserve for a "final hackathon"
>    section of any spec, never implement): real system integrations,
>    live train delays, real-time rescheduling, predictive maintenance,
>    crew/resource optimization, what-if simulation, multi-month
>    planning, digital twin, blockchain, mobile app, voice assistant,
>    enterprise auth, microservices, Kubernetes, national-scale infra.
> 7. Engineering rules: simple architecture, readable code, small
>    modules, minimal dependencies, clear folder structure. No hardcoded
>    secrets, no exposed API keys, no unnecessary dependencies.
> 8. Every future task must: inspect existing code before modifying it,
>    never delete or rewrite unrelated files, never change the
>    architecture without explicit approval, explain what was changed,
>    and state how to test the change.
>
> **Do not proceed past this artifact.** Stop and show me `constitution.md`
> for review.

---

## 1. Phase 0 — Specification (`/specify`)

> **PROMPT TO BE REVIEWED BEFORE EXECUTION**
>
> Using the project constitution, create the Phase 0 specification
> (`spec.md`) for the feature "railway-block-planning-prototype". Do not
> write code.
>
> **Objective:** Define WHAT the prototype does and WHY, technology-agnostic.
>
> **Must include:**
> - Product objective (one paragraph)
> - Primary user: railway maintenance planning officer
> - Core user journey (tasks → train timetable → blocks → priority →
>   candidate block → conflict check → multi-department compatibility →
>   recommendation + explanation → officer approve/modify/reject → final
>   block plan)
> - Functional requirements, one per numbered item, each independently
>   testable
> - Non-functional requirements (transparency of scoring, human-in-the-loop,
>   simplicity, no fake real-time claims)
> - Explicit out-of-scope list (pull from the constitution)
> - Success criteria for the demo (what must be shown to count as "working")
> - One paragraph describing the main demo scenario at a high level
>   (details come later in Phase 8)
>
> **Acceptance criteria:** Every functional requirement can be traced to a
> screen or a data field in the four-screen UI (Dashboard, Maintenance
> Tasks, AI Recommendation, Final Block Plan). No requirement mentions a
> specific tech stack yet.
>
> **Stop after generating `spec.md`.** I will review and approve before
> you touch `/plan`.

---

## 2. Phase 1 — Data Foundation

### 2a. Plan

> **PROMPT TO BE REVIEWED BEFORE EXECUTION**
>
> Read `constitution.md` and `spec.md` first. Create `plan.md` for the
> "data-foundation" phase only. Do not write code yet.
>
> **Objective:** Lock the data schema and describe the synthetic dataset
> before any UI or backend exists.
>
> **Files this plan will describe (not yet create):** a `/data` directory
> containing JSON files for tasks, trains, blocks, recommendations, and
> schedules.
>
> **Must define:**
> - `MaintenanceTask` schema (Task ID, Department, Section/Corridor, Task
>   Type, Criticality, Urgency, Estimated Duration, Status)
> - `Train` schema (Train ID, Train Type, Section, Start Time, End Time)
> - `AvailableBlock` schema (Block ID, Section, Start Time, End Time,
>   Block Type)
> - `Recommendation` schema (linked task IDs, priority score, recommended
>   block ID, conflict status, combination flag, explanation text)
> - `Schedule` schema (final block plan entry: block, time, section,
>   assigned tasks, departments, conflict status, approval status)
>
> **Prerequisites:** `constitution.md` and `spec.md` are approved.
>
> **Expected output:** A locked schema section in `plan.md`, plus a
> description of the dataset composition (see task list below for exact
> counts).
>
> **Stop for review before generating any files.**

### 2b. Tasks

> **PROMPT TO BE REVIEWED BEFORE EXECUTION**
>
> Read the approved `plan.md` for data-foundation. Generate `tasks.md`
> and then, once I approve the task list, create the actual JSON dataset
> files under `/data`.
>
> **Objective:** Produce a small, realistic synthetic dataset matching
> the locked schema.
>
> **Files involved:** `/data/tasks.json`, `/data/trains.json`,
> `/data/blocks.json`. Do not touch any other file or directory.
>
> **Dataset must contain, at minimum:**
> - Tasks from all three departments (Engineering, S&T, OHE/Traction)
> - A mix of criticality/urgency levels producing different priority tiers
> - At least two tasks on the same section with durations that could be
>   combined into one coordinated block
> - At least one task whose duration exceeds every available block on its
>   section (the "no suitable block" case)
> - At least 4–6 available blocks across 2 sections, varying in duration
>   and time of day
> - At least one train timetable entry that overlaps an otherwise
>   suitable block (the conflict case) and at least one block with no
>   train conflict
>
> **Constraints:** Keep the dataset small (roughly 8–12 tasks, 4–6 trains,
> 4–6 blocks) — do not generate a large dataset. All data is synthetic;
> do not reference real train numbers, real section names beyond generic
> placeholders (e.g., "Section A–B"), or real Indian Railways systems.
>
> **Acceptance criteria:** Every "must contain" bullet above is satisfied
> and traceable to a specific record in the JSON files.
>
> **Before writing files:** inspect the repository to confirm `/data`
> doesn't already exist with conflicting content. Do not overwrite
> anything outside `/data`.
>
> **How to test:** Provide a short markdown table summarizing which
> record(s) satisfy each "must contain" bullet, so I can verify by eye.
>
> **Explain what you changed and stop for review.**

---

## 3. Phase 2 — Frontend Prototype (mock data)

> **PROMPT TO BE REVIEWED BEFORE EXECUTION**
>
> Read `constitution.md`, `spec.md`, and the approved data-foundation
> `plan.md`. Create `plan.md` and `tasks.md` for the "frontend-prototype"
> phase, then wait for my approval before generating code.
>
> **Objective:** Build a clickable frontend using the JSON files from
> `/data` as mock data — no backend yet.
>
> **Screens to plan for:**
> 1. Dashboard — total tasks, high-priority tasks, available blocks,
>    conflicts, recommended/scheduled tasks
> 2. Maintenance Tasks — table of Task ID, Department, Section, Priority,
>    Duration, Status
> 3. AI Recommendation — selected task(s), priority score, recommended
>    block, time, section, conflict status, combination possibility,
>    explanation text
> 4. Final Block Plan — timeline of blocks, assigned departments/tasks,
>    conflicts, approval status, with Approve/Modify/Reject controls
>
> **Files involved:** a new `/frontend` app only. Do not create a backend,
> do not add a database, do not add authentication.
>
> **What must NOT be changed:** `/data` files (read-only mock source for
> now), `constitution.md`, `spec.md`.
>
> **Prerequisites:** data-foundation phase approved and files exist.
>
> **Expected output:** Four working screens navigable from a simple nav
> bar, reading from the mock JSON, with realistic-looking (but clearly
> mock) recommendation and explanation text on the AI Recommendation
> screen.
>
> **Acceptance criteria:** Every field listed for each screen above is
> visibly rendered; Approve/Modify/Reject buttons exist and update local
> UI state (no backend call required at this stage).
>
> **Before generating code:** inspect the repo structure and tell me what
> currently exists. Use the Antigravity browser subagent to visually
> verify all four screens render without errors once built, and report
> what you verified.
>
> **Explain what you changed and how to run/test it locally, then stop
> for review.**

---

## 4. Phase 3 — Core Backend / Decision Logic

> **PROMPT TO BE REVIEWED BEFORE EXECUTION**
>
> Read `constitution.md`, `spec.md`, and all previous approved plans.
> Create `plan.md` and `tasks.md` for the "core-backend" phase. Do not
> write code yet.
>
> **Objective:** Decide whether a separate backend service is actually
> needed for this prototype, or whether the frontend's own API routes are
> sufficient — and justify the choice in `plan.md` before building.
>
> **The engine (wherever it lives) must accept:** maintenance tasks,
> train timetable, available blocks (from `/data`, unchanged schema).
>
> **The engine must produce:** priority scores, candidate blocks, conflict
> results, compatible-task groupings, a recommended block, and a
> human-readable explanation string.
>
> **Constraints:** No new infrastructure beyond what's justified in
> `plan.md`. If a separate Python/FastAPI service isn't clearly
> necessary, recommend the simpler option instead and say why.
>
> **What must NOT be changed:** the `/data` schema locked in Phase 1, the
> four frontend screens' visual behavior from Phase 2 (only their data
> source will change, in Phase 5 — not this phase).
>
> **Acceptance criteria:** Given the fixed sample dataset, the engine
> deterministically returns the same priority scores and recommendation
> every run (no randomness) so the demo is reproducible.
>
> **Before generating code:** inspect existing `/frontend` and `/data`
> structure so the new engine's interfaces line up with what Phase 5 will
> need. Explain what you built and provide a way to run it in isolation
> (e.g., a small script or test call) so I can verify outputs before any
> UI wiring happens.
>
> **Stop for review.**

---

## 5. Phase 4 — AI / Optimization Layer

> **PROMPT TO BE REVIEWED BEFORE EXECUTION**
>
> Read the approved core-backend `plan.md`. Create `plan.md` and
> `tasks.md` for the "optimization-layer" phase. Do not write code yet.
>
> **Objective:** Upgrade the basic decision logic into a documented,
> explainable scoring/optimization approach — rule-based or
> constraint-based only, per the constitution. Do not introduce deep
> learning or claim ML accuracy metrics.
>
> **Must define and justify in `plan.md`:**
> - Exact priority formula (which factors, what weights, why)
> - Candidate block filtering logic (duration fit, section match, time fit)
> - Conflict detection logic (train time-window overlap with block window)
> - Multi-department compatibility rule (same section + non-overlapping
>   or combinable durations)
> - The explanation-generation logic (template-based is fine — it must
>   state why a block was picked, why an alternative was rejected,
>   whether tasks were combined, and whether a conflict exists)
>
> **What must NOT be changed:** the schemas from Phase 1, the engine's
> external interface from Phase 3 (inputs/outputs), unless this plan
> explicitly proposes and justifies a change for review.
>
> **Acceptance criteria:** For the fixed sample dataset, running the
> engine produces a recommendation whose explanation text you can
> manually verify sentence-by-sentence against the underlying data.
>
> **Before generating code:** inspect the Phase 3 engine code and modify
> it in place rather than rewriting it, unless the plan explicitly calls
> for restructuring (and I've approved that separately).
>
> **How to test:** Provide the exact input/output pairs for at least 3
> sample scenarios (a clean case, a conflict case, a combinable-tasks
> case) so I can check them by hand.
>
> **Stop for review.**

---

## 6. Phase 5 — Frontend + Backend Integration

> **PROMPT TO BE REVIEWED BEFORE EXECUTION**
>
> Read all previously approved plans. Create `plan.md` and `tasks.md` for
> the "integration" phase. Do not write code yet.
>
> **Objective:** Replace the frontend's mock recommendation data with
> real calls into the Phase 3/4 engine, without changing the visual
> design built in Phase 2.
>
> **Files involved:** the "Generate Block Plan" action/handler in
> `/frontend`, plus whatever thin API layer connects it to the engine.
> Do not modify the four screens' layout or the locked schemas.
>
> **Expected flow:** User action on the frontend → request → engine →
> priority scores / conflict results / recommendation / explanation →
> response → rendered on the AI Recommendation and Final Block Plan
> screens.
>
> **Acceptance criteria:** Clicking "Generate Block Plan" in the running
> app produces the same recommendation you verified by hand in Phase 4,
> end-to-end, with no mock data left in the recommendation path.
>
> **Before generating code:** inspect both the frontend and engine code
> already in the repo; do not duplicate logic that already exists in the
> engine inside the frontend.
>
> **How to test:** Use the Antigravity browser subagent to click through
> the full journey (Dashboard → Tasks → generate a recommendation →
> Approve/Modify/Reject → Final Block Plan) and report what it observed
> at each step, including screenshots if available.
>
> **Stop for review.**

---

## 7. Phase 6 — Testing & Edge Cases

> **PROMPT TO BE REVIEWED BEFORE EXECUTION**
>
> Create `plan.md` and `tasks.md` for the "testing" phase, covering these
> ten cases against the integrated system. Do not modify engine or
> frontend logic in this phase except to fix a genuine bug you find and
> report — ask before fixing anything non-trivial.
>
> **Cases to cover, each with input / expected output / pass-fail
> condition:**
> 1. Normal task
> 2. High-priority task
> 3. Two departments on the same section
> 4. Three compatible tasks
> 5. Train conflict
> 6. No suitable block available
> 7. Multiple candidate blocks for one task
> 8. Invalid input (e.g., malformed task record)
> 9. Task duration greater than every block's duration
> 10. Two tasks competing for the same block
>
> **What must NOT be changed:** locked schemas, approved UI, approved
> engine logic — this phase verifies, it doesn't redesign.
>
> **Expected output:** A test report (`tasks.md` or a `TESTS.md`) listing
> all ten cases with actual vs. expected results and a clear pass/fail
> per case.
>
> **If a test fails:** stop, report the failure with the exact input and
> output, and propose a minimal fix for my approval before touching code.
>
> **Stop for review after the report is generated.**

---

## 8. Phase 7 — UI Polish

> **PROMPT TO BE REVIEWED BEFORE EXECUTION**
>
> Only run this after Phase 6 passes. Create `plan.md` and `tasks.md` for
> the "ui-polish" phase.
>
> **Objective:** Improve layout, spacing, typography, cards, timeline
> visuals, and status indicators for a "professional railway dashboard"
> feel — clarity over decoration, no new features.
>
> **What must NOT be changed:** any functional behavior verified in Phase
> 6; no new screens, no new data fields, no new backend calls.
>
> **Files involved:** styling/layout files in `/frontend` only.
>
> **Acceptance criteria:** Re-running the Phase 6 test scenarios still
> passes after polish (functionality unchanged); the four screens are
> visually consistent (consistent spacing, color coding for
> priority/conflict/approval status).
>
> **How to test:** Use the browser subagent to re-walk the Phase 5
> journey and confirm nothing broke, then report before/after
> observations.
>
> **Stop for review.**

---

## 9. Phase 8 — Final Demo Preparation

> **PROMPT TO BE REVIEWED BEFORE EXECUTION**
>
> Create `plan.md` documenting the final demo (no code changes unless a
> demo-blocking bug is found — report and ask before fixing).
>
> **Objective:** Produce one strong 2–4 minute demo script using the
> existing dataset (or a small, clearly-labeled demo variant of it) that
> shows **independent departmental planning vs. coordinated AI-assisted
> planning** side by side.
>
> **Must include in `plan.md`:**
> - The exact dataset/scenario used (reuse Phase 1 data or a documented
>   demo variant — do not silently change the locked schema)
> - Exact user actions, screen by screen
> - Expected results at each step, including the exact explanation text
>   the system should show
> - What the presenter should say at each step
> - A backup plan (e.g., pre-recorded screenshots or a fallback dataset)
>   in case live demo fails
>
> **Constraint:** The demo must stay inside the approved prototype scope
> — no last-minute features.
>
> **Stop for review; this is the final artifact before the live demo.**

---

## 10. Using Antigravity's Manager Mode for parallel work

Once Phase 1 (data foundation) is approved, you can hand off in parallel
via Manager Mode instead of running everything serially:

- **Agent A:** Phase 2 (frontend, mock data) — depends only on Phase 1.
- **Agent B:** Phase 3/4 planning (backend + optimization logic design) —
  depends only on Phase 1, can be planned while Agent A builds UI.

Do **not** parallelize Phase 5 (integration) — it must wait for both A and
B to be individually approved and merged, since it wires them together.
Phase 6, 7, and 8 are strictly sequential after that.

---

## 11. Safety guardrails to restate in every prompt if Antigravity drifts

If at any point a generated plan or task tries to go beyond scope, remind
it explicitly:

- No real TMS/SMMS/TDMS/COA/RBS integration, ever, in this repo.
- No claims about live/real Indian Railways data.
- No autonomous block approval — Approve/Modify/Reject stays human.
- No deep learning / unverified accuracy claims for the scoring model.
- Inspect before modifying; never delete or rewrite unrelated files;
  always explain changes and how to test them.

---

### How to use this file
Copy each blockquoted prompt into Antigravity one at a time, in order,
review the generated artifact (`constitution.md`, `spec.md`, `plan.md`,
`tasks.md`) before approving, and only then let it generate code. Keep
this file itself in your repo (e.g., `docs/sdd-prompt-pack.md`) as the
source of truth for the sequence.
