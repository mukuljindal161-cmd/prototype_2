import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type TranslationDictionary } from './translations';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, params?: Record<string, string | number>) => string;
  tDept: (dept: string) => string;
  tCrit: (crit: string) => string;
  tUrgency: (urgency: string) => string;
  tStatus: (status: string) => string;
  tSection: (section: string) => string;
  tTrainType: (trainType: string) => string;
  tTrainName: (trainName: string) => string;
  tTaskType: (taskType: string) => string;
  tTaskDesc: (taskDesc: string) => string;
  tBlockDesc: (blockDesc?: string) => string;
  tExplanation: (rec: any) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('railopt-lang');
    return saved === 'hi' || saved === 'en' ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('railopt-lang', lang);
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    localStorage.setItem('railopt-lang', language);
  }, [language]);

  // Nested translation lookup with parameter interpolation
  const t = (path: string, params?: Record<string, string | number>): string => {
    const dict = translations[language] as unknown as Record<string, unknown>;
    const fallbackDict = translations.en as unknown as Record<string, unknown>;

    const keys = path.split('.');
    let current: unknown = dict;
    let fallback: unknown = fallbackDict;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = (current as Record<string, unknown>)[key];
      } else {
        current = undefined;
      }

      if (fallback && typeof fallback === 'object' && key in fallback) {
        fallback = (fallback as Record<string, unknown>)[key];
      } else {
        fallback = undefined;
      }
    }

    let result = (typeof current === 'string' ? current : typeof fallback === 'string' ? fallback : path) as string;

    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        result = result.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      });
    }

    return result;
  };

  // Domain entity translation helpers
  const tDept = (dept: string) => {
    return translations[language].domain.departments[dept] || dept;
  };

  const tCrit = (crit: string) => {
    return translations[language].domain.criticalities[crit] || crit;
  };

  const tUrgency = (urgency: string) => {
    return translations[language].domain.urgencies[urgency] || urgency;
  };

  const tStatus = (status: string) => {
    return translations[language].domain.taskStatuses[status] || translations[language].common[status.toLowerCase() as keyof TranslationDictionary['common']] || status;
  };

  const tSection = (section: string) => {
    return translations[language].domain.sections[section] || section;
  };

  const tTrainType = (trainType: string) => {
    return translations[language].domain.trainTypes[trainType] || trainType;
  };

  const tTrainName = (trainName: string) => {
    return translations[language].domain.trainNames[trainName] || trainName;
  };

  const tTaskType = (taskType: string) => {
    return translations[language].domain.taskTypes[taskType] || taskType;
  };

  const tTaskDesc = (taskDesc: string) => {
    return translations[language].domain.taskDescriptions[taskDesc] || taskDesc;
  };

  const tBlockDesc = (blockDesc?: string) => {
    if (!blockDesc) return '';
    return translations[language].domain.blockDescriptions[blockDesc] || blockDesc;
  };

  const tExplanation = (rec: any) => {
    if (language === 'en') return rec.explanationText;
    const primary = rec.tasks && rec.tasks[0];
    if (!primary) return rec.explanationText;

    if (rec.conflictStatus === 'No Block Available' || !rec.recommendedBlock) {
      return `कार्य स्थगन सूचना: कार्य ${primary.id} (${tDept(primary.department)} - ${tTaskType(primary.taskType)}) को ${tSection(rec.section)} पर ${primary.durationMinutes} मिनट के निरंतर लाइन अधिकार की आवश्यकता है। कोई भी उपलब्ध ब्लॉक इस आवश्यकता को पूरा नहीं करता है। अनुशंसा: इसे सप्ताहांत मेगा-ब्लॉक में स्थानांतरित करें अथवा उप-कार्यों में विभाजित करें। मानव अधिकारी समीक्षा अनिवार्य है।`;
    }

    const sentences: string[] = [];
    sentences.push(`कार्य ${primary.id} का मूल्यांकन ${primary.criticality === 'Critical' ? 'अति-गंभीर' : primary.criticality === 'High' ? 'उच्च' : 'मध्यम'} स्तर की गंभीरता एवं ${primary.urgency === 'Immediate' ? 'तत्काल' : primary.urgency === 'High' ? 'उच्च' : 'नियमित'} तात्कालिकता के आधार पर ${rec.priorityScore}/100 प्राथमिकता स्कोर पर किया गया।`);
    sentences.push(`इसे ${tSection(rec.section)} पर ब्लॉक ${rec.recommendedBlockId} (${rec.recommendedBlock.startTime} - ${rec.recommendedBlock.endTime}, ${rec.recommendedBlock.durationMinutes} मिनट) में आवंटित किया गया, जो आवश्यक ${primary.durationMinutes} मिनट के ब्लॉक अधिकार को पूरा करता है।`);

    if (rec.combinationFlag && rec.tasks && rec.tasks.length > 1) {
      const other = rec.tasks[1];
      sentences.push(`बहु-विभागीय समन्वय: ${tDept(other.department)} के कार्य ${other.id} (${tTaskType(other.taskType)}, ${other.durationMinutes} मिनट) के साथ समन्वित किया गया। इन दोनों परिचालनों को ब्लॉक ${rec.recommendedBlockId} के तहत संयोजित करने से ट्रैक बंदी समय में बचत होती है।`);
    } else {
      sentences.push(`समर्पित एकल-विभागीय ब्लॉक सौंपा गया। इस सेक्शन पर कोई अन्य क्रॉस-विभागीय कार्य नहीं पाया गया।`);
    }

    if (rec.conflictStatus === 'Train Conflict Detected' && rec.conflictDetails) {
      sentences.push(`परिचालन संघर्ष चेतावनी: यह ब्लॉक विंडो ट्रेन ${rec.conflictDetails.trainNumber} (${tTrainName(rec.conflictDetails.trainName || '')}) के निर्धारित समय (${rec.conflictDetails.overlapWindow}) से टकराती है। ब्लॉक आवंटन से पूर्व समय सारणी विनियमन अथवा अधिकारी समीक्षा आवश्यक है।`);
    } else {
      sentences.push(`कॉरिडोर ट्रेन समय सारणी के साथ मिलान किया गया। योजनाबद्ध विंडो के भीतर शून्य ट्रेन संघर्ष पाए गए।`);
    }

    return sentences.join(' ');
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        tDept,
        tCrit,
        tUrgency,
        tStatus,
        tSection,
        tTrainType,
        tTrainName,
        tTaskType,
        tTaskDesc,
        tBlockDesc,
        tExplanation
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
