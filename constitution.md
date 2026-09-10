# Project Constitution: AI-Powered Automatic Railway Block Planning System
## SIH 2026 Prototype — Governing Charter

This governing document outlines the foundational constraints, safety boundaries, architectural standards, and operational guidelines for the **AI-Powered Automatic Railway Block Planning System** Smart India Hackathon (SIH 2026) prototype.

Every subsequent specification, architecture plan, synthetic data generator, algorithm, test suite, and user interface must comply with the rules set forth in this document.

---

### 1. Prototype & Simulation Status (No Fabrication)
* This project is an **SIH hackathon prototype and proof-of-concept demonstration**, not a live production railway signaling or dispatch system.
* **Zero Real-System Claims:** The system shall never claim or imply real-time or production integration with Indian Railways enterprise systems such as **TMS** (Train Management System), **SMMS** (Track Management System), **TDMS** (Time Table Management System), **COA** (Control Office Application), or **RBS** (Rates Branch System).
* No false claims regarding operational certifications, national deployment, or real-time live data feeds from Indian Railways divisions shall be made.

### 2. Synthetic Sample Data
* All data utilized by this system—including maintenance tasks, train timetables, block corridors, and infrastructure layouts—is **100% synthetic sample data** created explicitly for demonstration and validation purposes.
* Station and section names must use clear, representative descriptors (e.g., *Section A–B (Northern Line)*, *Section B–C (Southern Line)*) rather than claiming live operational track circuits.

### 3. Defined Prototype Scope
The prototype is strictly bounded to:
* **One Corridor / Line Territory**: Defined track sections with unidirectional or bidirectional simulated traffic.
* **Three Key Railway Departments**:
  1. **Engineering (Civil / Track)**: Track renewal, rail replacement, tamping, deep screening.
  2. **S&T (Signaling & Telecommunication)**: Point machine servicing, track circuit maintenance, signal lamp replacement, interlocking overhaul.
  3. **OHE / Traction (Overhead Equipment)**: Cantilever adjustment, contact wire inspection, isolator maintenance, tree trimming near live catenary.
* **Standard Operational Flow**:
  $$\text{Maintenance Tasks} \longrightarrow \text{Train Timetable} \longrightarrow \text{Available Blocks} \longrightarrow \text{Priority Scoring}$$
  $$\longrightarrow \text{Candidate Block Selection} \longrightarrow \text{Conflict Detection} \longrightarrow \text{Multi-Department Compatibility}$$
  $$\longrightarrow \text{Recommendation + Natural Explanation} \longrightarrow \text{Human Officer (Approve / Modify / Reject)} \longrightarrow \text{Final Block Plan}$$

### 4. Transparent, Deterministic Mathematical Scoring (No Black-Box ML)
* Priority scoring, block matching, and multi-department coordination must be governed by a **transparent, auditable mathematical and rule-based decision model**.
* No claims of fictitious machine learning metrics (e.g., "99.4% accuracy neural network") shall be fabricated.
* Deep learning and opaque black-box AI are strictly prohibited for core block allocation. Every recommendation must provide a sentence-by-sentence verifiable explanation of why a block was recommended and why alternatives were disqualified.

### 5. Mandatory Human-in-the-Loop (No Autonomous Granting)
* **The AI system must NEVER autonomously grant, lock, or enforce a railway maintenance block.**
* Every candidate plan terminates at an interactive **Human Review Gate** where an authorized Railway Planning Officer reviews the recommendation and selects:
  - **Approve**: Confirm the block into the official schedule.
  - **Modify**: Adjust time slots, reduce duration, or reassign tasks.
  - **Reject**: Decline the recommendation with logged rationale.

### 6. Explicit Out-of-Scope Elements
The following features are strictly out of scope for this prototype and must not be implemented:
* Direct integration with production railway hardware, interlockings, or axle counters.
* Live GPS tracking or real-time dynamic train delay recalculations.
* Crew, locomotive, or specialized heavy-machinery (e.g., BCM/CSM tamping machine) rosters.
* Multi-month or annual enterprise maintenance budgeting.
* Full-scale 3D digital twins, blockchain ledgers, or augmented reality apps.
* Voice assistants, enterprise SSO/OAuth, microservices architectures, or Kubernetes deployments.

### 7. Engineering & Architectural Standards
* **Simplicity First**: Clean, self-contained architecture with minimal external dependencies.
* **Readability**: Well-structured, modular code with descriptive variable naming and comprehensive documentation.
* **Security & Cleanliness**: No hardcoded API keys, no secrets, no telemetry tracking, and no redundant bloat packages.
* **Reproducibility**: Local setup must be immediate and straightforward (`npm install` followed by `npm run dev`).

### 8. Modification & Review Protocol
* Always inspect existing modules and data files before making modifications.
* Never delete, rewrite, or break unrelated files.
* Changes must preserve deterministic outputs across the locked test cases.
* Every change must explain what was altered and demonstrate how it can be tested and verified.
