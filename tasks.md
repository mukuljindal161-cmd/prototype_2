# Phase 1: Data Foundation — Tasks & Verification Table

### 1. Dataset Compliance Verification Table

| Requirement Bullet | Satisfying Record(s) | Verification Detail |
| :--- | :--- | :--- |
| **1. Tasks from all 3 departments** | `TSK-101`, `TSK-104`, `TSK-106`, `TSK-108` (Engineering)<br>`TSK-103`, `TSK-105`, `TSK-109` (S&T)<br>`TSK-102`, `TSK-107`, `TSK-110` (OHE/Traction) | All three departments represented across both sections with domain-authentic track maintenance operations. |
| **2. Mix of Criticality / Urgency tiers** | Critical/Immediate: `TSK-101`, `TSK-107`<br>High/Immediate: `TSK-104`<br>High/High: `TSK-103`, `TSK-110`<br>Medium/Routine: `TSK-102`, `TSK-105`, `TSK-108`<br>Low/Deferrable: `TSK-106`, `TSK-109` | Spans the full matrix from safety-critical repairs to routine cyclical overhauls. |
| **3. Combinable tasks on same section** | `TSK-101` (Engineering, 90 mins, Sec A-B) + `TSK-102` (OHE, 60 mins, Sec A-B) | Both located on Section A-B. Can execute in parallel or within 120-minute window of block `BLK-301` without spatial interference. |
| **4. Duration exceeds every available block** | `TSK-106` (Engineering Deep Screening, 300 mins) | Longest block on Section A-B is `BLK-305` (180 mins) and overall max block is 180 mins. $300 > 180$, triggering the "no suitable block available" condition. |
| **5. 4–6 available blocks across 2 sections** | `BLK-301` (A-B, 120m, 09:00–11:00)<br>`BLK-302` (A-B, 120m, 15:00–17:00)<br>`BLK-303` (B-C, 120m, 14:00–16:00)<br>`BLK-304` (B-C, 150m, 10:00–12:30)<br>`BLK-305` (A-B, 180m, 22:30–01:30) | Exactly 5 blocks spanning morning, afternoon, and night slots across both Section A-B and Section B-C. |
| **6. Train timetable conflict & clear cases** | **Conflict:** `BLK-303` (14:00–16:00, Sec B-C) overlaps `TRN-203` Superfast Express (14:30–15:20, Sec B-C).<br>**Clear:** `BLK-301` (09:00–11:00, Sec A-B) has no trains (nearest train passes at 07:15 and 12:00). | Validates conflict detection and clean scheduling paths. |

---

### 2. Task Checklist Status
- [x] Define locked schemas for `MaintenanceTask`, `Train`, `AvailableBlock`, `Recommendation`, `Schedule`.
- [x] Author `/data/tasks.json` with 10 synthetic tasks.
- [x] Author `/data/trains.json` with 5 timetable trains.
- [x] Author `/data/blocks.json` with 5 available blocks across 2 sections.
- [x] Author `/data/initial_schedule.json` with sample initial block plan entry.
- [x] Validate synthetic data against all Phase 1b constraints.
