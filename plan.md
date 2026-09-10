# Phase 1 Plan: Data Foundation & Locked Schemas
## Component: `data-foundation`

---

### 1. Objective
Establish the locked JSON data schemas and author the synthetic prototype dataset for the Railway Block Planning System prior to building the frontend UI or decision engine.

---

### 2. Locked Schemas

#### 2.1 `MaintenanceTask` Schema
Represents a maintenance work order submitted by a railway department.
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "MaintenanceTask",
  "type": "object",
  "required": ["id", "department", "section", "taskType", "criticality", "urgency", "durationMinutes", "status"],
  "properties": {
    "id": { "type": "string", "description": "Unique identifier e.g. TSK-101" },
    "department": { "type": "string", "enum": ["Engineering", "S&T", "OHE/Traction"] },
    "section": { "type": "string", "description": "Track section, e.g. Section A-B" },
    "taskType": { "type": "string", "description": "Specific maintenance activity" },
    "criticality": { "type": "string", "enum": ["Critical", "High", "Medium", "Low"] },
    "urgency": { "type": "string", "enum": ["Immediate", "High", "Routine", "Deferrable"] },
    "durationMinutes": { "type": "integer", "minimum": 15 },
    "status": { "type": "string", "enum": ["Pending", "Recommended", "Scheduled", "Deferred"] },
    "description": { "type": "string" }
  }
}
```

#### 2.2 `Train` Timetable Schema
Represents scheduled train traffic passing through corridor sections.
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Train",
  "type": "object",
  "required": ["id", "trainNumber", "name", "trainType", "section", "startTime", "endTime"],
  "properties": {
    "id": { "type": "string", "description": "Unique identifier e.g. TRN-201" },
    "trainNumber": { "type": "string", "description": "Synthetic train number e.g. EXP-1001" },
    "name": { "type": "string", "description": "Synthetic service name" },
    "trainType": { "type": "string", "enum": ["Superfast Express", "Passenger", "Freight"] },
    "section": { "type": "string", "description": "Track section traversing" },
    "startTime": { "type": "string", "pattern": "^[0-2][0-9]:[0-5][0-9]$", "description": "HH:MM format" },
    "endTime": { "type": "string", "pattern": "^[0-2][0-9]:[0-5][0-9]$", "description": "HH:MM format" }
  }
}
```

#### 2.3 `AvailableBlock` Schema
Represents a designated track possession / maintenance window available for booking.
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AvailableBlock",
  "type": "object",
  "required": ["id", "section", "startTime", "endTime", "durationMinutes", "blockType"],
  "properties": {
    "id": { "type": "string", "description": "Unique identifier e.g. BLK-301" },
    "section": { "type": "string", "description": "Track section" },
    "startTime": { "type": "string", "pattern": "^[0-2][0-9]:[0-5][0-9]$" },
    "endTime": { "type": "string", "pattern": "^[0-2][0-9]:[0-5][0-9]$" },
    "durationMinutes": { "type": "integer" },
    "blockType": { "type": "string", "enum": ["Shadow Block", "Routine Maintenance", "Emergency Corridor", "Night Traffic Window"] }
  }
}
```

#### 2.4 `Recommendation` Schema
Output produced by the decision and optimization engine.
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Recommendation",
  "type": "object",
  "required": ["id", "linkedTaskIds", "priorityScore", "recommendedBlockId", "conflictStatus", "combinationFlag", "explanationText"],
  "properties": {
    "id": { "type": "string" },
    "linkedTaskIds": { "type": "array", "items": { "type": "string" } },
    "priorityScore": { "type": "number", "minimum": 0, "maximum": 100 },
    "recommendedBlockId": { "type": ["string", "null"] },
    "conflictStatus": { "type": "string", "enum": ["Clear", "Train Conflict Detected", "Capacity Exceeded", "No Block Available"] },
    "conflictDetails": {
      "type": "object",
      "properties": {
        "conflictingTrainId": { "type": "string" },
        "overlapWindow": { "type": "string" }
      }
    },
    "combinationFlag": { "type": "boolean" },
    "combinedDepartments": { "type": "array", "items": { "type": "string" } },
    "explanationText": { "type": "string" }
  }
}
```

#### 2.5 `Schedule` Schema (Final Block Plan)
The approved operational schedule resulting from human officer decision.
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ScheduleEntry",
  "type": "object",
  "required": ["id", "blockId", "section", "startTime", "endTime", "assignedTaskIds", "departments", "conflictStatus", "approvalStatus", "officerNotes"],
  "properties": {
    "id": { "type": "string" },
    "blockId": { "type": "string" },
    "section": { "type": "string" },
    "startTime": { "type": "string" },
    "endTime": { "type": "string" },
    "assignedTaskIds": { "type": "array", "items": { "type": "string" } },
    "departments": { "type": "array", "items": { "type": "string" } },
    "conflictStatus": { "type": "string", "enum": ["Clear", "Warning", "Conflict"] },
    "approvalStatus": { "type": "string", "enum": ["Pending Review", "Approved", "Modified", "Rejected"] },
    "officerNotes": { "type": "string" },
    "updatedAt": { "type": "string" }
  }
}
```

---

### 3. Dataset Composition Strategy (10 Tasks, 5 Trains, 5 Blocks)
* **Corridor Sections:** `Section A-B (Northern Line)` and `Section B-C (Southern Line)`.
* **Departments Included:** Engineering (Civil), S&T (Signaling), OHE/Traction (Electrical).
* **Combination Target:** Task `TSK-101` (Engineering, Section A-B, 90 mins) and Task `TSK-102` (OHE, Section A-B, 60 mins) to be combined into `BLK-301` (120 mins).
* **Exceeding Duration Case:** Task `TSK-106` (Engineering Deep Screening, 300 mins) which exceeds all available blocks (max block duration is 180 mins).
* **Train Conflict Case:** Block `BLK-303` (14:00–16:00 on Section B-C) overlaps with Express Train `TRN-203` (14:30–15:15 on Section B-C).
* **Conflict-Free Blocks:** `BLK-301` (09:00–11:00 on Section A-B) and `BLK-304` (22:00–01:00 night window).
