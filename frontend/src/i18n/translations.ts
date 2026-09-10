export interface TranslationDictionary {
  common: {
    brandName: string;
    brandSub: string;
    light: string;
    dark: string;
    activeGateOn: string;
    activeGateOnMobile: string;
    active: string;
    minutes: string;
    min: string;
    tasks: string;
    trains: string;
    blocks: string;
    cancel: string;
    save: string;
    close: string;
    modify: string;
    approved: string;
    modified: string;
    pendingReview: string;
    rejected: string;
    scheduled: string;
    pending: string;
    deferred: string;
    clear: string;
    warning: string;
    conflict: string;
    actionRequired: string;
    all: string;
  };
  nav: {
    dashboard: string;
    tasks: string;
    recommendation: string;
    schedule: string;
    trainConflict: string;
    conflictShort: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    generateAiPlan: string;
    totalBacklog: string;
    totalBacklogMeta: string;
    highPriority: string;
    highPriorityMeta: string;
    availableBlocks: string;
    availableBlocksMeta: string;
    detectedConflicts: string;
    detectedConflictsMeta: string;
    scheduledPlans: string;
    scheduledPlansMeta: string;
    deptDistributionTitle: string;
    engDeptName: string;
    stDeptName: string;
    oheDeptName: string;
    multiDeptEngineTitle: string;
    multiDeptEngineDesc: string;
    inspectAllTasks: string;
    viewBlockSchedule: string;
  };
  tasks: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allDepartments: string;
    allSections: string;
    allCriticality: string;
    showingTasks: string;
    colTaskId: string;
    colDepartment: string;
    colSection: string;
    colActivity: string;
    colCriticality: string;
    colUrgency: string;
    colDuration: string;
    colPriorityScore: string;
    colStatus: string;
    colAction: string;
    noTasksMatch: string;
    aiPlanBtn: string;
    guidanceNotice: string;
  };
  recommendation: {
    noRecTitle: string;
    noRecDesc: string;
    viewTopPriorityBtn: string;
    title: string;
    subtitle: string;
    demoScenarios: string;
    recIdLabel: string;
    statusConflict: string;
    statusNoBlock: string;
    statusClear: string;
    metricPriority: string;
    metricCorridor: string;
    metricBlock: string;
    metricWindow: string;
    noneAvailable: string;
    synergyTitle: string;
    synergyDesc: string;
    conflictAlertTitle: string;
    conflictAlertDesc: string;
    rationaleTitle: string;
    officerGateTitle: string;
    officerGateDesc: string;
    approveBtn: string;
    modifyBtn: string;
    rejectBtn: string;
    workOrdersTitle: string;
    approvalHelpNotice: string;
  };
  schedule: {
    title: string;
    filterAllLanes: string;
    filterMaintenance: string;
    filterTrains: string;
    filterConflicts: string;
    legendTrain: string;
    legendClearBlock: string;
    legendConflict: string;
    corridorClear: string;
    trainConflictCorridor: string;
    laneTimetableTrains: string;
    laneScheduledMovements: string;
    laneMaintenanceBlocks: string;
    lanePossessionClosures: string;
    operationalCollisionAlert: string;
    actionRequiredBtn: string;
    inspectorTrainTitle: string;
    inspectorBlockTitle: string;
    clearCorridorPath: string;
    activeTimetableConflict: string;
    labelWindow: string;
    labelDuration: string;
    labelSection: string;
    labelAssignedTasks: string;
    labelDepartments: string;
    labelDepartures: string;
    registryTitle: string;
    officialEntries: string;
    colScheduleId: string;
    colBlockId: string;
    colSection: string;
    colPossessionWindow: string;
    colAssignedTasks: string;
    colParticipatingDepts: string;
    colConflictStatus: string;
    colApprovalStatus: string;
    colOfficerNotes: string;
    colActions: string;
    actionClear: string;
    resetScheduleBtn: string;
    noBlocksScheduled: string;
    onSection: string;
    noEventsMatch: string;
    conflictOverlapTooltip: string;
    clickToInspect: string;
  };
  modal: {
    title: string;
    sub: string;
    labelTrackSection: string;
    labelAllocatedBlock: string;
    labelStartTime: string;
    labelEndTime: string;
    labelApprovalStatus: string;
    labelOfficerJustification: string;
    placeholderOfficerNotes: string;
    statusApprovedOption: string;
    statusModifiedOption: string;
    statusPendingOption: string;
    statusRejectedOption: string;
    cancelBtn: string;
    saveBtn: string;
  };
  toasts: {
    recsGenerated: string;
    noSuitableBlockWarning: string;
    blockPlanApproved: string;
    blockPlanModified: string;
    recRejected: string;
    scheduleReset: string;
  };
  domain: {
    departments: Record<string, string>;
    criticalities: Record<string, string>;
    urgencies: Record<string, string>;
    taskStatuses: Record<string, string>;
    sections: Record<string, string>;
    trainTypes: Record<string, string>;
    trainNames: Record<string, string>;
    taskTypes: Record<string, string>;
    taskDescriptions: Record<string, string>;
    blockDescriptions: Record<string, string>;
    blockTypes: Record<string, string>;
    corridorLines: Record<string, string>;
    officerNotes: Record<string, string>;
  };
}

export const translations: { en: TranslationDictionary; hi: TranslationDictionary } = {
  en: {
    common: {
      brandName: 'RailOpt',
      brandSub: 'AI Railway Block Planning System',
      light: 'Light',
      dark: 'Dark',
      activeGateOn: 'SYSTEM ACTIVE • HUMAN GATE ON',
      activeGateOnMobile: 'ACTIVE • GATE ON',
      active: 'ACTIVE',
      minutes: 'minutes',
      min: 'min',
      tasks: 'Tasks',
      trains: 'Trains',
      blocks: 'Blocks',
      cancel: 'Cancel',
      save: 'Save & Apply Changes',
      close: 'Close',
      modify: 'Modify',
      approved: 'Approved',
      modified: 'Modified',
      pendingReview: 'Pending Review',
      rejected: 'Rejected',
      scheduled: 'Scheduled',
      pending: 'Pending',
      deferred: 'Deferred',
      clear: 'Clear',
      warning: 'Warning',
      conflict: 'Conflict',
      actionRequired: 'Action Required',
      all: 'All'
    },
    nav: {
      dashboard: 'Dashboard',
      tasks: 'Maintenance Tasks',
      recommendation: 'AI Recommendation',
      schedule: 'Final Block Plan',
      trainConflict: 'Train Conflict',
      conflictShort: 'Conflict'
    },
    dashboard: {
      title: 'Operations Control Overview',
      subtitle: 'Corridor Territory: Section A–B (Northern Line) & Section B–C (Southern Line)',
      generateAiPlan: 'Generate AI Block Plan',
      totalBacklog: 'Total Maintenance Backlog',
      totalBacklogMeta: 'Across 3 railway departments',
      highPriority: 'High-Priority Tasks',
      highPriorityMeta: 'Critical ultrasound & switch rail repairs',
      availableBlocks: 'Available Block Windows',
      availableBlocksMeta: 'Total capacity: 690 minutes',
      detectedConflicts: 'Detected Train Conflicts',
      detectedConflictsMeta: 'Superfast Express timetable overlap',
      scheduledPlans: 'Scheduled Block Plans',
      scheduledPlansMeta: 'Human-reviewed corridor plans',
      deptDistributionTitle: 'Departmental Task Distribution',
      engDeptName: 'Engineering (Civil Track)',
      stDeptName: 'S&T (Signals & Telecom)',
      oheDeptName: 'OHE / Electrical Traction',
      multiDeptEngineTitle: 'Multi-Department Optimization Engine',
      multiDeptEngineDesc:
        'RailOpt evaluates overlapping maintenance demands across Engineering, S&T, and OHE. By synchronizing compatible tasks into shared Shadow Block Windows, line possession downtime is cut by up to 40% while train punctuality is safeguarded against unexpected timetable clashes.',
      inspectAllTasks: 'Inspect All Tasks',
      viewBlockSchedule: 'View Block Schedule'
    },
    tasks: {
      title: 'Maintenance Tasks Registry',
      subtitle: 'Ingested departmental maintenance backlog awaiting block allocation',
      searchPlaceholder: 'Search by Task ID or description...',
      allDepartments: 'All Departments',
      allSections: 'All Sections',
      allCriticality: 'All Criticality',
      showingTasks: 'Showing {filtered} of {total} tasks',
      colTaskId: 'Task ID',
      colDepartment: 'Department',
      colSection: 'Section',
      colActivity: 'Maintenance Activity',
      colCriticality: 'Criticality',
      colUrgency: 'Urgency',
      colDuration: 'Duration',
      colPriorityScore: 'Priority Score',
      colStatus: 'Status',
      colAction: 'Action',
      noTasksMatch: 'No maintenance tasks matched the selected filter criteria.',
      aiPlanBtn: 'AI Plan',
      guidanceNotice: 'Click "AI Plan" on any row to inspect candidate block matching, multi-department synergy, and train conflict analysis.'
    },
    recommendation: {
      noRecTitle: 'No Active Recommendation Selected',
      noRecDesc: 'Select a maintenance task from the registry or generate recommendations for the entire corridor backlog.',
      viewTopPriorityBtn: 'View Top Priority Recommendation',
      title: 'AI Recommendation & Officer Review Gate',
      subtitle: 'Auditable mathematical block allocation with transparent natural language justification',
      demoScenarios: 'Demo Scenarios:',
      recIdLabel: 'Recommendation ID',
      statusConflict: 'Train Conflict Detected',
      statusNoBlock: 'No Suitable Block',
      statusClear: 'Timetable Clear',
      metricPriority: 'Priority Score',
      metricCorridor: 'Target Corridor',
      metricBlock: 'Recommended Block',
      metricWindow: 'Time Window',
      noneAvailable: 'None Available',
      synergyTitle: 'Multi-Department Shadow Block Coordinated',
      synergyDesc: 'Combines {tasks} across departments: {depts}.',
      conflictAlertTitle: 'Train Timetable Overlap Warning',
      conflictAlertDesc: 'Scheduled train {trainNumber} ({trainName}) traverses {section} between {window}. Planning officer must regulate train or shift block window.',
      rationaleTitle: 'AI Recommendation Rationale (Transparent & Auditable)',
      officerGateTitle: 'Human Officer Review Gate',
      officerGateDesc: 'In accordance with the Project Constitution, AI recommendations cannot autonomously lock blocks. An authorized officer must review and take action.',
      approveBtn: 'Approve Block Plan',
      modifyBtn: 'Modify Time / Parameters',
      rejectBtn: 'Reject / Defer Plan',
      workOrdersTitle: 'Included Work Orders',
      approvalHelpNotice: 'Approvals update the Final Block Plan immediately.'
    },
    schedule: {
      title: 'Corridor 24–Hour Timeline Visualizer (Dual–Lane Separation)',
      filterAllLanes: 'All Lanes',
      filterMaintenance: 'Maintenance Blocks',
      filterTrains: 'Timetable Trains',
      filterConflicts: 'Conflicts Only',
      legendTrain: 'Timetable Train',
      legendClearBlock: 'Clear Block',
      legendConflict: 'Train Conflict',
      corridorClear: 'Corridor Clear',
      trainConflictCorridor: 'Train Conflict on Corridor',
      laneTimetableTrains: 'Timetable Trains',
      laneScheduledMovements: 'Scheduled movements',
      laneMaintenanceBlocks: 'Maintenance Blocks',
      lanePossessionClosures: 'Possession closures',
      operationalCollisionAlert: 'OPERATIONAL COLLISION: Block BLK-303 (14:00–16:00) directly overlaps scheduled passage of EXP-305 (Corridor Superfast Express, 14:30–15:20). Timetable regulation or block rescheduling required.',
      actionRequiredBtn: 'Action Required',
      inspectorTrainTitle: 'TIMETABLE TRAIN MOVEMENT',
      inspectorBlockTitle: 'POSSESSION WINDOW',
      clearCorridorPath: 'Clear Corridor Path',
      activeTimetableConflict: 'Active Timetable Conflict',
      labelWindow: 'Window:',
      labelDuration: 'Duration:',
      labelSection: 'Section:',
      labelAssignedTasks: 'Assigned Work Orders:',
      labelDepartments: 'Departments:',
      labelDepartures: 'Departures / Corridor:',
      registryTitle: 'Final Block Possession Registry',
      officialEntries: 'Official Entries',
      colScheduleId: 'SCHEDULE ID',
      colBlockId: 'BLOCK ID',
      colSection: 'SECTION',
      colPossessionWindow: 'POSSESSION WINDOW',
      colAssignedTasks: 'ASSIGNED TASKS',
      colParticipatingDepts: 'PARTICIPATING DEPARTMENTS',
      colConflictStatus: 'CONFLICT STATUS',
      colApprovalStatus: 'APPROVAL STATUS',
      colOfficerNotes: 'OFFICER NOTES',
      colActions: 'ACTIONS',
      actionClear: 'Clear',
      resetScheduleBtn: 'Reset Corridor Schedule',
      noBlocksScheduled: 'No blocks scheduled yet. Go to "AI Recommendation" and click "Approve Block Plan" to commit entries.',
      onSection: 'on',
      noEventsMatch: 'No events matching filter',
      conflictOverlapTooltip: 'Timetable conflict overlap window',
      clickToInspect: 'Click to inspect'
    },
    modal: {
      title: 'Modify Block Allocation',
      sub: 'Officer Manual Override for Schedule Entry:',
      labelTrackSection: 'Corridor Track Section',
      labelAllocatedBlock: 'Select Allocated Block',
      labelStartTime: 'Start Time (HH:MM)',
      labelEndTime: 'End Time (HH:MM)',
      labelApprovalStatus: 'Approval Decision Status',
      labelOfficerJustification: 'Officer Justification / Operational Notes',
      placeholderOfficerNotes: 'Provide reason for block modification or special speed restrictions...',
      statusApprovedOption: 'Approved (Lock Block)',
      statusModifiedOption: 'Modified (Officer Altered)',
      statusPendingOption: 'Pending Review',
      statusRejectedOption: 'Rejected',
      cancelBtn: 'Cancel',
      saveBtn: 'Save & Apply Changes'
    },
    toasts: {
      recsGenerated: 'Generated {count} AI block recommendations.',
      noSuitableBlockWarning: 'Cannot approve a recommendation with no suitable block.',
      blockPlanApproved: 'Block Plan for {tasks} successfully APPROVED and scheduled!',
      blockPlanModified: 'Schedule entry {blockId} updated by Planning Officer.',
      recRejected: 'Recommendation {id} rejected. Tasks marked as Deferred.',
      scheduleReset: 'Corridor schedule reset to default prototype dataset.'
    },
    domain: {
      departments: {
        'Engineering': 'Engineering (Civil Track)',
        'S&T': 'S&T (Signals & Telecom)',
        'OHE/Traction': 'OHE / Electrical Traction'
      },
      criticalities: {
        'Critical': 'Critical',
        'High': 'High',
        'Medium': 'Medium',
        'Low': 'Low'
      },
      urgencies: {
        'Immediate': 'Immediate',
        'High': 'High',
        'Routine': 'Routine',
        'Deferrable': 'Deferrable'
      },
      taskStatuses: {
        'Pending': 'Pending',
        'Recommended': 'Recommended',
        'Scheduled': 'Scheduled',
        'Deferred': 'Deferred'
      },
      sections: {
        'Section A-B': 'Section A-B (Northern Line)',
        'Section B-C': 'Section B-C (Southern Line)'
      },
      trainTypes: {
        'Superfast Express': 'Superfast Express',
        'Passenger': 'Passenger Train',
        'Freight': 'Freight Container'
      },
      trainNames: {
        'Northern Rajdhani Link Express': 'Northern Rajdhani Link Express',
        'Intercity Passenger': 'Intercity Passenger',
        'Corridor Superfast Express': 'Corridor Superfast Express',
        'Container Freight Rake': 'Container Freight Rake',
        'Night Express': 'Night Express',
        'Rajdhani Corridor Superfast': 'Rajdhani Corridor Superfast',
        'Southern Commuter Passenger': 'Southern Commuter Passenger',
        'Heavy Haul Container Freight': 'Heavy Haul Container Freight',
        'Intercity Express': 'Intercity Express'
      },
      taskTypes: {
        'Track Joint Weld & Ultrasonic Rail Testing': 'Track Joint Weld & Ultrasonic Rail Testing',
        'Catenary Cantilever & Contact Wire Inspection': 'Catenary Cantilever & Contact Wire Inspection',
        'Point Machine 104B Overhaul & Lubrication': 'Point Machine 104B Overhaul & Lubrication',
        'Switch Rail Tongue Renewal': 'Switch Rail Tongue Renewal',
        'Digital Axle Counter Head Sensor Realignment': 'Digital Axle Counter Head Sensor Realignment',
        'Mechanized Deep Screening & Ballast Cleaning': 'Mechanized Deep Screening & Ballast Cleaning',
        'Traction Substation Isolator Maintenance': 'Traction Substation Isolator Maintenance',
        'Curve Gauge & Cross-Level Tamping': 'Curve Gauge & Cross-Level Tamping',
        'Multi-Aspect Color Light Signal Lamp Retrofit': 'Multi-Aspect Color Light Signal Lamp Retrofit',
        'Tree Trimming Near 25kV Live Wire': 'Tree Trimming Near 25kV Live Wire',
        'Track Ultrasound Testing (USFD)': 'Track Ultrasound Testing (USFD)',
        'Switch Rail & Crossing Replacement': 'Switch Rail & Crossing Replacement',
        'Turnout Deep Screening & Ballast Packing': 'Turnout Deep Screening & Ballast Packing',
        'Point Machine Motor Overhaul': 'Point Machine Motor Overhaul',
        'Axle Counter Sensor Calibration': 'Axle Counter Sensor Calibration',
        'OHE Catenary Wire Tensioning & Inspection': 'OHE Catenary Wire Tensioning & Inspection',
        'Substation Neutral Section Insulator Replacement': 'Substation Neutral Section Insulator Replacement'
      },
      taskDescriptions: {
        'Critical ultrasound flaw detected near KM 42/12 on Section A-B. Requires track possession for thermit welding repair.': 'Critical ultrasound flaw detected near KM 42/12 on Section A-B. Requires track possession for thermit welding repair.',
        'Routine monthly physical inspection of overhead contact wire and dropper alignment on Section A-B.': 'Routine monthly physical inspection of overhead contact wire and dropper alignment on Section A-B.',
        'Point machine motor contact cleaning and detection slide adjustment at Junction A.': 'Point machine motor contact cleaning and detection slide adjustment at Junction A.',
        'Wear limit reached on switch tongue rail at turnout 201 on Section B-C. Safety replacement required.': 'Wear limit reached on switch tongue rail at turnout 201 on Section B-C. Safety replacement required.',
        'Axle counter sensor coil impedance check and recalibration following heavy ballast movement.': 'Axle counter sensor coil impedance check and recalibration following heavy ballast movement.',
        'Deep screening of track bed to remove pulverized ballast over 1.2 KM. Exceeds standard block window (needs special corridor block).': 'Deep screening of track bed to remove pulverized ballast over 1.2 KM. Exceeds standard block window (needs special corridor block).',
        'Thermal hotspot detected on 25kV feeding post isolator switch on Section B-C. Urgent power block needed.': 'Thermal hotspot detected on 25kV feeding post isolator switch on Section B-C. Urgent power block needed.',
        'Hydraulic tamping of transition curve KM 68/4 to 69/2 to rectify minor alignment deviations.': 'Hydraulic tamping of transition curve KM 68/4 to 69/2 to rectify minor alignment deviations.',
        'Upgrading incandescent signal aspect lamps to fail-safe LED cluster modules on Section A-B.': 'Upgrading incandescent signal aspect lamps to fail-safe LED cluster modules on Section A-B.',
        'Trimming hazardous boughs encroaching within 2-meter electrical clearance envelope on Section A-B.': 'Trimming hazardous boughs encroaching within 2-meter electrical clearance envelope on Section A-B.',
        'Ultrasonic flaw detection across 12km continuous welded rail. Speed reduction active.': 'Ultrasonic flaw detection across 12km continuous welded rail. Speed reduction active.',
        'Worn tongue rail at Turnout #42 requires complete replacement and realignment.': 'Worn tongue rail at Turnout #42 requires complete replacement and realignment.',
        'Heavy ballast contamination on Southern freight approach track. Tamping machine required.': 'Heavy ballast contamination on Southern freight approach track. Tamping machine required.',
        'Quarterly preventative maintenance on dual-drive switch motor at Junction B.': 'Quarterly preventative maintenance on dual-drive switch motor at Junction B.',
        'High false-occupancy alarms triggered on Track Circuit #14. Re-calibration required.': 'High false-occupancy alarms triggered on Track Circuit #14. Re-calibration required.',
        'Contact wire height measurement and dropper adjustment on mainline overhead lines.': 'Contact wire height measurement and dropper adjustment on mainline overhead lines.',
        'Preventative replacement of ceramic insulator assembly near km post 142/8.': 'Preventative replacement of ceramic insulator assembly near km post 142/8.'
      },
      blockDescriptions: {
        'Standard morning maintenance corridor between peak commuter services.': 'Standard morning maintenance corridor between peak commuter services.',
        'Mid-afternoon window suitable for joint Engineering and OHE multi-department operations.': 'Mid-afternoon window suitable for joint Engineering and OHE multi-department operations.',
        'Afternoon corridor on Section B-C. Notice: Scheduled timetable train passage in vicinity.': 'Afternoon corridor on Section B-C. Notice: Scheduled timetable train passage in vicinity.',
        'Clear morning slot between freight dispatch and midday passenger departures.': 'Clear morning slot between freight dispatch and midday passenger departures.',
        'High-capacity night maintenance window with minimal passenger service impact.': 'High-capacity night maintenance window with minimal passenger service impact.',
        'Morning civil & traction routine maintenance window': 'Morning civil & traction routine maintenance window',
        'Afternoon secondary window on Northern Line': 'Afternoon secondary window on Northern Line',
        'Routine afternoon window overlapping Express timetable': 'Routine afternoon window overlapping Express timetable',
        'Late morning maintenance slot': 'Late morning maintenance slot',
        'Night-time heavy freight & infrastructure window': 'Night-time heavy freight & infrastructure window'
      },
      blockTypes: {
        'Routine Maintenance Window': 'Routine Maintenance Window',
        'Shadow Block Window': 'Shadow Block Window',
        'Heavy Track Window': 'Heavy Track Window',
        'Night Traffic Window': 'Night Traffic Window'
      },
      corridorLines: {
        'Northern Line Corridor': 'Northern Line Corridor',
        'Southern Line Corridor': 'Southern Line Corridor'
      },
      officerNotes: {
        'Proposed joint track welding and catenary inspection under single coordinated block.': 'Proposed joint track welding and catenary inspection under single coordinated block.',
        'AI Recommendation approved by officer. Coordinated multi-department block.': 'AI Recommendation approved by officer. Coordinated multi-department block.',
        'AI Recommendation approved by officer. Single-department possession.': 'AI Recommendation approved by officer. Single-department possession.',
        'Officer customized block parameters before commit.': 'Officer customized block parameters before commit.'
      }
    }
  },

  hi: {
    common: {
      brandName: 'रेलऑप्ट',
      brandSub: 'एआई रेलवे ब्लॉक योजना प्रणाली',
      light: 'दिन',
      dark: 'रात',
      activeGateOn: 'सिस्टम सक्रिय • मानव गेट चालू',
      activeGateOnMobile: 'सक्रिय • गेट चालू',
      active: 'सक्रिय',
      minutes: 'मिनट',
      min: 'मि.',
      tasks: 'कार्य',
      trains: 'ट्रेनें',
      blocks: 'ब्लॉक',
      cancel: 'रद्द करें',
      save: 'परिवर्तन सहेजें और लागू करें',
      close: 'बंद करें',
      modify: 'संशोधित करें',
      approved: 'स्वीकृत',
      modified: 'संशोधित',
      pendingReview: 'समीक्षा लंबित',
      rejected: 'अस्वीकृत',
      scheduled: 'निर्धारित',
      pending: 'लंबित',
      deferred: 'स्थगित',
      clear: 'स्पष्ट',
      warning: 'चेतावनी',
      conflict: 'संघर्ष',
      actionRequired: 'कार्रवाई आवश्यक',
      all: 'सभी'
    },
    nav: {
      dashboard: 'डैशबोर्ड',
      tasks: 'रखरखाव कार्य',
      recommendation: 'एआई अनुशंसा',
      schedule: 'अंतिम ब्लॉक योजना',
      trainConflict: 'ट्रेन संघर्ष',
      conflictShort: 'संघर्ष'
    },
    dashboard: {
      title: 'परिचालन नियंत्रण अवलोकन',
      subtitle: 'कॉरिडोर क्षेत्र: सेक्शन A–B (उत्तरी लाइन) एवं सेक्शन B–C (दक्षिणी लाइन)',
      generateAiPlan: 'एआई ब्लॉक योजना बनाएं',
      totalBacklog: 'कुल रखरखाव बैकलॉग',
      totalBacklogMeta: '3 रेलवे विभागों में लंबित',
      highPriority: 'अति-महत्वपूर्ण कार्य',
      highPriorityMeta: 'गंभीर अल्ट्रासाउंड एवं स्विच रेल मरम्मत',
      availableBlocks: 'उपलब्ध ब्लॉक विंडो',
      availableBlocksMeta: 'कुल क्षमता: 690 मिनट',
      detectedConflicts: 'पाए गए ट्रेन संघर्ष',
      detectedConflictsMeta: 'सुपरफास्ट एक्सप्रेस समय सारणी ओवरलैप',
      scheduledPlans: 'निर्धारित ब्लॉक योजनाएं',
      scheduledPlansMeta: 'अधिकारी-समीक्षित कॉरिडोर योजनाएं',
      deptDistributionTitle: 'विभागीय कार्य वितरण',
      engDeptName: 'इंजीनियरिंग (सिविल ट्रैक)',
      stDeptName: 'एस एंड टी (सिग्नल एवं दूरसंचार)',
      oheDeptName: 'ओएचई / विद्युत कर्षण',
      multiDeptEngineTitle: 'बहु-विभागीय अनुकूलन इंजन',
      multiDeptEngineDesc:
        'रेलऑप्ट इंजीनियरिंग, एसएंडटी और ओएचई की संयुक्त रखरखाव मांगों का विश्लेषण करता है। संगत कार्यों को साझा शैडो ब्लॉक विंडो में संयोजित करके, ट्रैक अवरोध समय में 40% तक की कमी आती है जबकि ट्रेनों की समयबद्धता सुरक्षित रहती है।',
      inspectAllTasks: 'सभी कार्य देखें',
      viewBlockSchedule: 'ब्लॉक शेड्यूल देखें'
    },
    tasks: {
      title: 'रखरखाव कार्य रजिस्ट्री',
      subtitle: 'ब्लॉक आवंटन की प्रतीक्षा में विभागीय रखरखाव बैकलॉग',
      searchPlaceholder: 'टास्क आईडी या विवरण द्वारा खोजें...',
      allDepartments: 'सभी विभाग',
      allSections: 'सभी सेक्शन',
      allCriticality: 'सभी गंभीरता स्तर',
      showingTasks: '{total} में से {filtered} कार्य प्रदर्शित',
      colTaskId: 'टास्क आईडी',
      colDepartment: 'विभाग',
      colSection: 'सेक्शन',
      colActivity: 'रखरखाव गतिविधि',
      colCriticality: 'गंभीरता',
      colUrgency: 'तात्कालिकता',
      colDuration: 'अवधि',
      colPriorityScore: 'प्राथमिकता स्कोर',
      colStatus: 'स्थिति',
      colAction: 'कार्रवाई',
      noTasksMatch: 'चयनित फ़िल्टर मापदंडों से कोई कार्य मेल नहीं खाता।',
      aiPlanBtn: 'एआई योजना',
      guidanceNotice: 'उम्मीदवार ब्लॉक मिलान, बहु-विभागीय समन्वय एवं ट्रेन संघर्ष विश्लेषण देखने के लिए किसी भी पंक्ति पर "एआई योजना" पर क्लिक करें।'
    },
    recommendation: {
      noRecTitle: 'कोई सक्रिय अनुशंसा चयनित नहीं है',
      noRecDesc: 'रजिस्ट्री से कोई रखरखाव कार्य चुनें या संपूर्ण कॉरिडोर बैकलॉग के लिए अनुशंसाएं उत्पन्न करें।',
      viewTopPriorityBtn: 'शीर्ष प्राथमिकता अनुशंसा देखें',
      title: 'एआई अनुशंसा एवं अधिकारी समीक्षा गेट',
      subtitle: 'पारदर्शी एवं प्राकृतिक भाषा औचित्य के साथ ऑडिट-योग्य गणितीय ब्लॉक आवंटन',
      demoScenarios: 'डेमो परिदृश्य:',
      recIdLabel: 'अनुशंसा आईडी',
      statusConflict: 'ट्रेन संघर्ष पाया गया',
      statusNoBlock: 'कोई उपयुक्त ब्लॉक नहीं',
      statusClear: 'समय सारणी स्पष्ट',
      metricPriority: 'प्राथमिकता स्कोर',
      metricCorridor: 'लक्षित कॉरिडोर',
      metricBlock: 'अनुशंसित ब्लॉक',
      metricWindow: 'समय विंडो',
      noneAvailable: 'कोई उपलब्ध नहीं',
      synergyTitle: 'बहु-विभागीय शैडो ब्लॉक समन्वित',
      synergyDesc: 'विभागों के मध्य {tasks} को संयोजित करता है: {depts}।',
      conflictAlertTitle: 'ट्रेन समय सारणी ओवरलैप चेतावनी',
      conflictAlertDesc: 'निर्धारित ट्रेन {trainNumber} ({trainName}) {window} के बीच {section} से गुजरती है। योजना अधिकारी को ट्रेन विनियमित करनी होगी या ब्लॉक समय बदलना होगा।',
      rationaleTitle: 'एआई अनुशंसा औचित्य (पारदर्शी एवं ऑडिट-योग्य)',
      officerGateTitle: 'मानव अधिकारी समीक्षा गेट',
      officerGateDesc: 'परियोजना संविधान के अनुसार, एआई अनुशंसाएं स्वचालित रूप से ब्लॉक लॉक नहीं कर सकतीं। अधिकृत अधिकारी द्वारा समीक्षा एवं कार्रवाई अनिवार्य है।',
      approveBtn: 'ब्लॉक योजना स्वीकृत करें',
      modifyBtn: 'समय / पैरामीटर संशोधित करें',
      rejectBtn: 'योजना अस्वीकृत / स्थगित करें',
      workOrdersTitle: 'शामिल कार्य आदेश',
      approvalHelpNotice: 'स्वीकृति देने पर अंतिम ब्लॉक योजना तुरंत अपडेट हो जाती है।'
    },
    schedule: {
      title: 'कॉरिडोर 24-घंटे टाइमलाइन दृश्य (दोहरी-लेन पृथक्करण)',
      filterAllLanes: 'सभी लेन',
      filterMaintenance: 'रखरखाव ब्लॉक',
      filterTrains: 'समय सारणी ट्रेनें',
      filterConflicts: 'केवल संघर्ष',
      legendTrain: 'समय सारणी ट्रेन',
      legendClearBlock: 'स्पष्ट ब्लॉक',
      legendConflict: 'ट्रेन संघर्ष',
      corridorClear: 'कॉरिडोर स्पष्ट',
      trainConflictCorridor: 'कॉरिडोर पर ट्रेन संघर्ष',
      laneTimetableTrains: 'समय सारणी ट्रेनें',
      laneScheduledMovements: 'निर्धारित आवागमन',
      laneMaintenanceBlocks: 'रखरखाव ब्लॉक',
      lanePossessionClosures: 'ट्रैक ब्लॉक बंदी',
      operationalCollisionAlert: 'परिचालन टकराव: ब्लॉक BLK-303 (14:00–16:00) ट्रेन EXP-305 (कॉरिडोर सुपरफास्ट एक्सप्रेस, 14:30–15:20) के निर्धारित समय के साथ सीधे टकरा रहा है। समय सारणी विनियमन या ब्लॉक पुनर्निर्धारण आवश्यक है।',
      actionRequiredBtn: 'कार्रवाई आवश्यक',
      inspectorTrainTitle: 'समय सारणी ट्रेन संचलन',
      inspectorBlockTitle: 'ट्रैक ब्लॉक विंडो',
      clearCorridorPath: 'स्पष्ट कॉरिडोर मार्ग',
      activeTimetableConflict: 'सक्रिय समय सारणी संघर्ष',
      labelWindow: 'समय विंडो:',
      labelDuration: 'अवधि:',
      labelSection: 'सेक्शन:',
      labelAssignedTasks: 'आवंटित कार्य आदेश:',
      labelDepartments: 'संबद्ध विभाग:',
      labelDepartures: 'प्रस्थान / कॉरिडोर:',
      registryTitle: 'अंतिम ब्लॉक अधिकार रजिस्ट्री',
      officialEntries: 'आधिकारिक प्रविष्टियां',
      colScheduleId: 'शेड्यूल आईडी',
      colBlockId: 'ब्लॉक आईडी',
      colSection: 'सेक्शन',
      colPossessionWindow: 'ब्लॉक विंडो',
      colAssignedTasks: 'आवंटित कार्य',
      colParticipatingDepts: 'संबद्ध विभाग',
      colConflictStatus: 'संघर्ष स्थिति',
      colApprovalStatus: 'स्वीकृति स्थिति',
      colOfficerNotes: 'अधिकारी टिप्पणी',
      colActions: 'कार्रवाई',
      actionClear: 'साफ़ करें',
      resetScheduleBtn: 'प्रोटोटाइप शेड्यूल रीसेट करें',
      noBlocksScheduled: 'अभी कोई ब्लॉक निर्धारित नहीं है। प्रविष्टियां जोड़ने के लिए "एआई अनुशंसा" पर जाएं और "ब्लॉक योजना स्वीकृत करें" पर क्लिक करें।',
      onSection: 'पर',
      noEventsMatch: 'फ़िल्टर से मेल खाने वाला कोई ईवेंट नहीं',
      conflictOverlapTooltip: 'समय सारणी संघर्ष ओवरलैप विंडो',
      clickToInspect: 'निरीक्षण के लिए क्लिक करें'
    },
    modal: {
      title: 'ब्लॉक आवंटन संशोधित करें',
      sub: 'शेड्यूल प्रविष्टि के लिए अधिकारी मैनुअल बदलाव:',
      labelTrackSection: 'कॉरिडोर ट्रैक सेक्शन',
      labelAllocatedBlock: 'आवंटित ब्लॉक चुनें',
      labelStartTime: 'प्रारंभ समय (HH:MM)',
      labelEndTime: 'समाप्ति समय (HH:MM)',
      labelApprovalStatus: 'स्वीकृति निर्णय स्थिति',
      labelOfficerJustification: 'अधिकारी औचित्य / परिचालन टिप्पणी',
      placeholderOfficerNotes: 'ब्लॉक संशोधन या विशेष गति प्रतिबंध का कारण लिखें...',
      statusApprovedOption: 'स्वीकृत (ब्लॉक लॉक करें)',
      statusModifiedOption: 'संशोधित (अधिकारी द्वारा परिवर्तित)',
      statusPendingOption: 'समीक्षा लंबित',
      statusRejectedOption: 'अस्वीकृत',
      cancelBtn: 'रद्द करें',
      saveBtn: 'सहेजें और लागू करें'
    },
    toasts: {
      recsGenerated: '{count} एआई ब्लॉक अनुशंसाएं उत्पन्न की गईं।',
      noSuitableBlockWarning: 'उपयुक्त ब्लॉक के बिना अनुशंसा को स्वीकृत नहीं किया जा सकता।',
      blockPlanApproved: '{tasks} के लिए ब्लॉक योजना सफलतापूर्वक स्वीकृत एवं निर्धारित की गई!',
      blockPlanModified: 'योजना अधिकारी द्वारा शेड्यूल प्रविष्टि {blockId} अद्यतन की गई।',
      recRejected: 'अनुशंसा {id} अस्वीकृत। कार्य स्थगित के रूप में चिह्नित।',
      scheduleReset: 'कॉरिडोर शेड्यूल डिफ़ॉल्ट प्रोटोटाइप डेटा पर रीसेट कर दिया गया।'
    },
    domain: {
      departments: {
        'Engineering': 'इंजीनियरिंग (सिविल ट्रैक)',
        'S&T': 'एस एंड टी (सिग्नल एवं दूरसंचार)',
        'OHE/Traction': 'ओएचई / विद्युत कर्षण'
      },
      criticalities: {
        'Critical': 'अति-गंभीर',
        'High': 'उच्च',
        'Medium': 'मध्यम',
        'Low': 'सामान्य'
      },
      urgencies: {
        'Immediate': 'तत्काल',
        'High': 'उच्च',
        'Routine': 'नियमित',
        'Deferrable': 'स्थगित योग्य'
      },
      taskStatuses: {
        'Pending': 'लंबित',
        'Recommended': 'अनुशंसित',
        'Scheduled': 'निर्धारित',
        'Deferred': 'स्थगित'
      },
      sections: {
        'Section A-B': 'सेक्शन A-B (उत्तरी लाइन)',
        'Section B-C': 'सेक्शन B-C (दक्षिणी लाइन)'
      },
      trainTypes: {
        'Superfast Express': 'सुपरफास्ट एक्सप्रेस',
        'Passenger': 'पैसेंजर ट्रेन',
        'Freight': 'कंटेनर मालगाड़ी'
      },
      trainNames: {
        'Northern Rajdhani Link Express': 'उत्तरी राजधानी लिंक एक्सप्रेस',
        'Intercity Passenger': 'इंटरसिटी पैसेंजर',
        'Corridor Superfast Express': 'कॉरिडोर सुपरफास्ट एक्सप्रेस',
        'Container Freight Rake': 'कंटेनर मालगाड़ी रैक',
        'Night Express': 'नाइट एक्सप्रेस',
        'Rajdhani Corridor Superfast': 'राजधानी कॉरिडोर सुपरफास्ट',
        'Southern Commuter Passenger': 'दक्षिणी कम्यूटर पैसेंजर',
        'Heavy Haul Container Freight': 'हैवी हॉल कंटेनर मालगाड़ी',
        'Intercity Express': 'इंटरसिटी एक्सप्रेस'
      },
      taskTypes: {
        'Track Joint Weld & Ultrasonic Rail Testing': 'ट्रैक जॉइंट वेल्डिंग एवं अल्ट्रासोनिक रेल परीक्षण',
        'Catenary Cantilever & Contact Wire Inspection': 'कैटेनरी कैंटिलीवर एवं संपर्क तार निरीक्षण',
        'Point Machine 104B Overhaul & Lubrication': 'पॉइंट मशीन 104B ओवरहाल एवं स्नेहन',
        'Switch Rail Tongue Renewal': 'स्विच रेल टंग नवीनीकरण',
        'Digital Axle Counter Head Sensor Realignment': 'डिजिटल एक्सल काउंटर हेड सेंसर पुनर्रेखण',
        'Mechanized Deep Screening & Ballast Cleaning': 'मशीनीकृत डीप स्क्रीनिंग एवं गिट्टी सफाई',
        'Traction Substation Isolator Maintenance': 'कर्षण सबस्टेशन आइसोलेटर रखरखाव',
        'Curve Gauge & Cross-Level Tamping': 'कर्व गेज एवं क्रॉस-लेवल टैंपिंग',
        'Multi-Aspect Color Light Signal Lamp Retrofit': 'मल्टी-एस्पेक्ट कलर लाइट सिग्नल लैंप नवीनीकरण',
        'Tree Trimming Near 25kV Live Wire': '25kV लाइव वायर के निकट वृक्ष छंटाई',
        'Track Ultrasound Testing (USFD)': 'ट्रैक अल्ट्रासाउंड परीक्षण (USFD)',
        'Switch Rail & Crossing Replacement': 'स्विच रेल एवं क्रॉसिंग प्रतिस्थापन',
        'Turnout Deep Screening & Ballast Packing': 'टर्नआउट डीप स्क्रीनिंग एवं गिट्टी पैकिंग',
        'Point Machine Motor Overhaul': 'पॉइंट मशीन मोटर ओवरहाल',
        'Axle Counter Sensor Calibration': 'एक्सल काउंटर सेंसर अंशांकन',
        'OHE Catenary Wire Tensioning & Inspection': 'ओएचई कैटेनरी वायर तनाव एवं निरीक्षण',
        'Substation Neutral Section Insulator Replacement': 'सबस्टेशन न्यूट्रल सेक्शन इन्सुलेटर प्रतिस्थापन'
      },
      taskDescriptions: {
        'Critical ultrasound flaw detected near KM 42/12 on Section A-B. Requires track possession for thermit welding repair.': 'सेक्शन A-B पर किमी 42/12 के निकट गंभीर अल्ट्रासाउंड दोष पाया गया। थर्मिट वेल्डिंग मरम्मत हेतु ट्रैक पजेशन आवश्यक।',
        'Routine monthly physical inspection of overhead contact wire and dropper alignment on Section A-B.': 'सेक्शन A-B पर ओवरहेड संपर्क तार और ड्रॉपर संरेखण का नियमित मासिक भौतिक निरीक्षण।',
        'Point machine motor contact cleaning and detection slide adjustment at Junction A.': 'जंक्शन A पर पॉइंट मशीन मोटर कॉन्टैक्ट सफाई और डिटेक्शन स्लाइड समायोजन।',
        'Wear limit reached on switch tongue rail at turnout 201 on Section B-C. Safety replacement required.': 'सेक्शन B-C पर टर्नआउट 201 पर स्विच टंग रेल घिसाव सीमा पर पहुंची। सुरक्षा प्रतिस्थापन आवश्यक।',
        'Axle counter sensor coil impedance check and recalibration following heavy ballast movement.': 'भारी गिट्टी संचलन के पश्चात एक्सल काउंटर सेंसर कॉइल प्रतिबाधा जांच और पुनरंशांकन।',
        'Deep screening of track bed to remove pulverized ballast over 1.2 KM. Exceeds standard block window (needs special corridor block).': '1.2 किमी से अधिक दूरी में चूर्णित गिट्टी हटाने के लिए ट्रैक बेड की गहरी स्क्रीनिंग। विशेष कॉरिडोर ब्लॉक आवश्यक।',
        'Thermal hotspot detected on 25kV feeding post isolator switch on Section B-C. Urgent power block needed.': 'सेक्शन B-C पर 25kV फीडिंग पोस्ट आइसोलेटर स्विच पर थर्मल हॉटस्पॉट का पता चला। तत्काल पावर ब्लॉक आवश्यक।',
        'Hydraulic tamping of transition curve KM 68/4 to 69/2 to rectify minor alignment deviations.': 'मामूली संरेखण विचलन को ठीक करने के लिए संक्रमण वक्र किमी 68/4 से 69/2 की हाइड्रोलिक टैंपिंग।',
        'Upgrading incandescent signal aspect lamps to fail-safe LED cluster modules on Section A-B.': 'सेक्शन A-B पर तापदीप्त सिग्नल लैंप को फेल-सेफ एलईडी क्लस्टर मॉड्यूल में अपग्रेड करना।',
        'Trimming hazardous boughs encroaching within 2-meter electrical clearance envelope on Section A-B.': 'सेक्शन A-B पर 2-मीटर विद्युत निकासी सीमा के भीतर आने वाली खतरनाक शाखाओं की छंटाई।',
        'Ultrasonic flaw detection across 12km continuous welded rail. Speed reduction active.': '12 किमी वेल्डेड रेल में अल्ट्रासोनिक दोष का पता लगाना। गति प्रतिबंध लागू।',
        'Worn tongue rail at Turnout #42 requires complete replacement and realignment.': 'टर्नआउट #42 पर घिसी हुई टंग रेल का पूर्ण प्रतिस्थापन एवं पुनर्रेखण आवश्यक है।',
        'Heavy ballast contamination on Southern freight approach track. Tamping machine required.': 'दक्षिणी मालगाड़ी पहुंच ट्रैक पर अत्यधिक गिट्टी प्रदूषण। टैंपिंग मशीन आवश्यक।',
        'Quarterly preventative maintenance on dual-drive switch motor at Junction B.': 'जंक्शन B पर डुअल-ड्राइव स्विच मोटर का त्रैमासिक निवारक रखरखाव।',
        'High false-occupancy alarms triggered on Track Circuit #14. Re-calibration required.': 'ट्रैक सर्किट #14 पर अत्यधिक झूठे अलार्म सक्रिय हुए। पुनः अंशांकन आवश्यक।',
        'Contact wire height measurement and dropper adjustment on mainline overhead lines.': 'मुख्य लाइन पर संपर्क तार की ऊंचाई मापन एवं ड्रॉपर समायोजन।',
        'Preventative replacement of ceramic insulator assembly near km post 142/8.': 'किमी पोस्ट 142/8 के निकट सिरेमिक इन्सुलेटर असेंबली का निवारक प्रतिस्थापन।'
      },
      blockDescriptions: {
        'Standard morning maintenance corridor between peak commuter services.': 'पीक कम्यूटर सेवाओं के बीच सुबह का मानक रखरखाव गलियारा।',
        'Mid-afternoon window suitable for joint Engineering and OHE multi-department operations.': 'संयुक्त इंजीनियरिंग और ओएचई बहु-विभागीय कार्यों के लिए उपयुक्त दोपहर की विंडो।',
        'Afternoon corridor on Section B-C. Notice: Scheduled timetable train passage in vicinity.': 'सेक्शन B-C पर दोपहर का गलियारा। सूचना: निकट में निर्धारित समय सारणी ट्रेन आवागमन।',
        'Clear morning slot between freight dispatch and midday passenger departures.': 'मालगाड़ी प्रेषण और दोपहर यात्री प्रस्थान के बीच स्पष्ट सुबह का स्लॉट।',
        'High-capacity night maintenance window with minimal passenger service impact.': 'यात्री सेवा पर न्यूनतम प्रभाव वाली उच्च क्षमता रात्रि रखरखाव विंडो।',
        'Morning civil & traction routine maintenance window': 'प्रातःकालीन सिविल एवं कर्षण नियमित रखरखाव विंडो',
        'Afternoon secondary window on Northern Line': 'उत्तरी लाइन पर दोपहर की द्वितीयक विंडो',
        'Routine afternoon window overlapping Express timetable': 'नियमित दोपहर विंडो जो एक्सप्रेस समय सारणी को प्रभावित करती है',
        'Late morning maintenance slot': 'देर सुबह का रखरखाव स्लॉट',
        'Night-time heavy freight & infrastructure window': 'रात्रि-कालीन भारी मालगाड़ी एवं बुनियादी ढांचा विंडो'
      },
      blockTypes: {
        'Routine Maintenance Window': 'नियमित रखरखाव विंडो',
        'Shadow Block Window': 'शैडो ब्लॉक विंडो',
        'Heavy Track Window': 'भारी ट्रैक कार्य विंडो',
        'Night Traffic Window': 'रात्रि कालीन ट्रैक विंडो'
      },
      corridorLines: {
        'Northern Line Corridor': 'उत्तरी लाइन कॉरिडोर',
        'Southern Line Corridor': 'दक्षिणी लाइन कॉरिडोर'
      },
      officerNotes: {
        'Proposed joint track welding and catenary inspection under single coordinated block.': 'एकल समन्वित ब्लॉक के तहत प्रस्तावित संयुक्त ट्रैक वेल्डिंग और कैटेनरी निरीक्षण।',
        'AI Recommendation approved by officer. Coordinated multi-department block.': 'अधिकारी द्वारा एआई अनुशंसा स्वीकृत। समन्वित बहु-विभागीय ब्लॉक।',
        'AI Recommendation approved by officer. Single-department possession.': 'अधिकारी द्वारा एआई अनुशंसा स्वीकृत। एकल-विभागीय ब्लॉक।',
        'Officer customized block parameters before commit.': 'अधिकारी ने पुष्टि से पूर्व ब्लॉक मापदंडों को अनुकूलित किया।'
      }
    }
  }
};
