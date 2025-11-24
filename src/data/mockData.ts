export interface Indicator {
  id: string;
  name: string;
  completeness: number;
  warnings: number;
  errors: number;
}

export interface ValidationMessage {
  id: string;
  type: 'error' | 'warning';
  code: string;
  message: string;
  indicatorId: string;
}

export interface QuestionData {
  code: string;
  question: string;
  answer: number | string | null;
  validation: 'valid' | 'error' | 'warning';
}

export const indicators: Indicator[] = [
  { id: 'PI', name: 'Pressure Injuries', completeness: 90, warnings: 1, errors: 1 },
  { id: 'RP', name: 'Restrictive Practices', completeness: 88, warnings: 1, errors: 1 },
  { id: 'UWL', name: 'Unplanned Weight Loss', completeness: 100, warnings: 1, errors: 0 },
  { id: 'FMI', name: 'Falls & Major Injury', completeness: 100, warnings: 0, errors: 0 },
  { id: 'MM', name: 'Medication Management', completeness: 100, warnings: 0, errors: 0 },
  { id: 'ADL', name: 'Activities of Daily Living', completeness: 88, warnings: 0, errors: 1 },
  { id: 'IC', name: 'Incontinence Care', completeness: 100, warnings: 0, errors: 0 },
  { id: 'HOSP', name: 'Hospitalisation', completeness: 100, warnings: 1, errors: 0 },
  { id: 'WF', name: 'Workforce', completeness: 100, warnings: 0, errors: 0 },
  { id: 'CE', name: 'Consumer Experience', completeness: 86, warnings: 0, errors: 1 },
  { id: 'QOL', name: 'Quality of Life', completeness: 100, warnings: 2, errors: 0 },
  { id: 'AH', name: 'Allied Health', completeness: 100, warnings: 0, errors: 0 },
  { id: 'EN', name: 'Enrolled Nursing', completeness: 100, warnings: 1, errors: 0 },
  { id: 'LO', name: 'Lifestyle Officers', completeness: 100, warnings: 0, errors: 0 },
];

export const validationMessages: ValidationMessage[] = [
  {
    id: 'v1',
    type: 'error',
    code: 'PI-04',
    message: 'PI-04 missing (required)',
    indicatorId: 'PI',
  },
  {
    id: 'v2',
    type: 'error',
    code: 'UPWL-11',
    message: 'UPWL-11 incomplete weights',
    indicatorId: 'WL',
  },
  {
    id: 'v3',
    type: 'warning',
    code: 'UPWL-04',
    message: 'UPWL-04 – comment expected',
    indicatorId: 'WL',
  },
  {
    id: 'v4',
    type: 'warning',
    code: 'PI-08',
    message: 'PI-08 – outlier detected, please verify',
    indicatorId: 'PI',
  },
  {
    id: 'v5',
    type: 'error',
    code: 'RP-03',
    message: 'RP-03 missing (required)',
    indicatorId: 'RP',
  },
  {
    id: 'v6',
    type: 'warning',
    code: 'RP-07',
    message: 'RP-07 – comment expected',
    indicatorId: 'RP',
  },
];

export const pressureInjuriesData: QuestionData[] = [
  {
    code: 'PI-01',
    question: '# assessed for pressure injuries',
    answer: 120,
    validation: 'valid',
  },
  {
    code: 'PI-02',
    question: '# excluded (withheld consent)',
    answer: 3,
    validation: 'valid',
  },
  {
    code: 'PI-03',
    question: '# excluded (absent entire quarter)',
    answer: 1,
    validation: 'valid',
  },
  {
    code: 'PI-04',
    question: '# with ≥1 pressure injuries',
    answer: null,
    validation: 'error',
  },
  {
    code: 'PI-05',
    question: 'Stage 1 pressure injuries',
    answer: 2,
    validation: 'valid',
  },
  {
    code: 'PI-06',
    question: 'Stage 2 pressure injuries',
    answer: 1,
    validation: 'valid',
  },
  {
    code: 'PI-07',
    question: 'Stage 3 pressure injuries',
    answer: 0,
    validation: 'valid',
  },
  {
    code: 'PI-08',
    question: 'Stage 4 pressure injuries',
    answer: 0,
    validation: 'warning',
  },
  {
    code: 'PI-09',
    question: 'Unstageable pressure injuries',
    answer: 0,
    validation: 'valid',
  },
  {
    code: 'PI-10',
    question: 'Deep tissue injury pressure injuries',
    answer: 0,
    validation: 'valid',
  },
];

export const restrictivePracticesData: QuestionData[] = [
  { code: 'RP-01', question: '# residents in care', answer: 124, validation: 'valid' },
  { code: 'RP-02', question: '# excluded (withheld consent)', answer: 2, validation: 'valid' },
  { code: 'RP-03', question: '# with restrictive practices', answer: null, validation: 'error' },
  { code: 'RP-04', question: 'Chemical restraints used', answer: 5, validation: 'valid' },
  { code: 'RP-05', question: 'Physical restraints used', answer: 2, validation: 'valid' },
  { code: 'RP-06', question: 'Environmental restraints used', answer: 1, validation: 'valid' },
  { code: 'RP-07', question: 'Seclusion incidents', answer: 0, validation: 'warning' },
  { code: 'RP-08', question: '# with consent documented', answer: 8, validation: 'valid' },
];

export const unplannedWeightLossData: QuestionData[] = [
  { code: 'UWL-01', question: '# residents assessed', answer: 118, validation: 'valid' },
  { code: 'UWL-02', question: '# excluded (palliative care)', answer: 4, validation: 'valid' },
  { code: 'UWL-03', question: '# with significant weight loss', answer: 8, validation: 'valid' },
  { code: 'UWL-04', question: '# with ≥5% weight loss', answer: 5, validation: 'warning' },
  { code: 'UWL-05', question: '# with ≥10% weight loss', answer: 3, validation: 'valid' },
  { code: 'UWL-06', question: '# referred to dietitian', answer: 7, validation: 'valid' },
  { code: 'UWL-07', question: '# with nutritional care plan', answer: 8, validation: 'valid' },
];

export const fallsAndMajorInjuryData: QuestionData[] = [
  { code: 'FMI-01', question: '# residents in care', answer: 124, validation: 'valid' },
  { code: 'FMI-02', question: '# excluded (absent >50% of quarter)', answer: 3, validation: 'valid' },
  { code: 'FMI-03', question: 'Total falls recorded', answer: 15, validation: 'valid' },
  { code: 'FMI-04', question: '# residents with ≥1 fall', answer: 12, validation: 'valid' },
  { code: 'FMI-05', question: 'Falls with major injury', answer: 2, validation: 'valid' },
  { code: 'FMI-06', question: 'Falls with fracture', answer: 1, validation: 'valid' },
  { code: 'FMI-07', question: '# with falls risk assessment', answer: 121, validation: 'valid' },
  { code: 'FMI-08', question: '# with falls prevention plan', answer: 115, validation: 'valid' },
];

export const medicationManagementData: QuestionData[] = [
  { code: 'MM-01', question: '# residents receiving medication', answer: 122, validation: 'valid' },
  { code: 'MM-02', question: '# with medication review in quarter', answer: 118, validation: 'valid' },
  { code: 'MM-03', question: '# receiving ≥9 medications', answer: 45, validation: 'valid' },
  { code: 'MM-04', question: 'Medication errors reported', answer: 3, validation: 'valid' },
  { code: 'MM-05', question: 'Adverse drug reactions', answer: 2, validation: 'valid' },
  { code: 'MM-06', question: '# on antipsychotics', answer: 18, validation: 'valid' },
  { code: 'MM-07', question: '# on benzodiazepines', answer: 12, validation: 'valid' },
];

export const activitiesOfDailyLivingData: QuestionData[] = [
  { code: 'ADL-01', question: '# residents assessed', answer: 120, validation: 'valid' },
  { code: 'ADL-02', question: '# independent with mobility', answer: 35, validation: 'valid' },
  { code: 'ADL-03', question: '# requiring assistance with mobility', answer: 65, validation: 'valid' },
  { code: 'ADL-04', question: '# fully dependent for mobility', answer: 20, validation: 'valid' },
  { code: 'ADL-05', question: '# independent with eating', answer: 85, validation: 'valid' },
  { code: 'ADL-06', question: '# requiring assistance with eating', answer: 28, validation: 'valid' },
  { code: 'ADL-07', question: '# with decline in ADL function', answer: null, validation: 'error' },
  { code: 'ADL-08', question: '# with improvement in ADL function', answer: 12, validation: 'valid' },
];

export const incontinenceCareData: QuestionData[] = [
  { code: 'IC-01', question: '# residents assessed', answer: 124, validation: 'valid' },
  { code: 'IC-02', question: '# continent (bladder)', answer: 45, validation: 'valid' },
  { code: 'IC-03', question: '# with bladder incontinence', answer: 62, validation: 'valid' },
  { code: 'IC-04', question: '# with indwelling catheter', answer: 17, validation: 'valid' },
  { code: 'IC-05', question: '# continent (bowel)', answer: 78, validation: 'valid' },
  { code: 'IC-06', question: '# with bowel incontinence', answer: 46, validation: 'valid' },
  { code: 'IC-07', question: '# with continence care plan', answer: 108, validation: 'valid' },
];

export const hospitalisationData: QuestionData[] = [
  { code: 'HOSP-01', question: '# residents in care', answer: 124, validation: 'valid' },
  { code: 'HOSP-02', question: '# hospitalised during quarter', answer: 8, validation: 'valid' },
  { code: 'HOSP-03', question: 'Total hospitalisations', answer: 9, validation: 'valid' },
  { code: 'HOSP-04', question: 'Emergency department presentations', answer: 12, validation: 'valid' },
  { code: 'HOSP-05', question: 'Planned hospitalisations', answer: 3, validation: 'valid' },
  { code: 'HOSP-06', question: 'Unplanned hospitalisations', answer: 6, validation: 'valid' },
  { code: 'HOSP-07', question: 'Readmissions within 28 days', answer: 1, validation: 'warning' },
];

export const workforceData: QuestionData[] = [
  { code: 'WF-01', question: 'Total FTE registered nurses', answer: 15.2, validation: 'valid' },
  { code: 'WF-02', question: 'Total FTE enrolled nurses', answer: 8.5, validation: 'valid' },
  { code: 'WF-03', question: 'Total FTE care workers', answer: 32.8, validation: 'valid' },
  { code: 'WF-04', question: 'Total care hours per resident per day', answer: 4.2, validation: 'valid' },
  { code: 'WF-05', question: 'RN hours per resident per day', answer: 0.85, validation: 'valid' },
  { code: 'WF-06', question: '# staff with First Aid certificate', answer: 45, validation: 'valid' },
  { code: 'WF-07', question: '# staff with dementia training', answer: 52, validation: 'valid' },
];

export const consumerExperienceData: QuestionData[] = [
  { code: 'CE-01', question: '# residents surveyed', answer: 85, validation: 'valid' },
  { code: 'CE-02', question: '# satisfied with care', answer: 78, validation: 'valid' },
  { code: 'CE-03', question: '# satisfied with food', answer: 72, validation: 'valid' },
  { code: 'CE-04', question: '# satisfied with activities', answer: 68, validation: 'valid' },
  { code: 'CE-05', question: '# complaints received', answer: 4, validation: 'valid' },
  { code: 'CE-06', question: '# complaints resolved', answer: 3, validation: 'valid' },
  { code: 'CE-07', question: 'Average response satisfaction score', answer: null, validation: 'error' },
];

export const qualityOfLifeData: QuestionData[] = [
  { code: 'QOL-01', question: '# residents assessed', answer: 118, validation: 'valid' },
  { code: 'QOL-02', question: '# participating in activities', answer: 95, validation: 'valid' },
  { code: 'QOL-03', question: '# with individualized care plan', answer: 118, validation: 'valid' },
  { code: 'QOL-04', question: '# with social engagement', answer: 88, validation: 'valid' },
  { code: 'QOL-05', question: '# with family involvement', answer: 102, validation: 'valid' },
  { code: 'QOL-06', question: '# expressing satisfaction with autonomy', answer: 85, validation: 'warning' },
  { code: 'QOL-07', question: '# participating in community outings', answer: 32, validation: 'warning' },
];

export const alliedHealthData: QuestionData[] = [
  { code: 'AH-01', question: '# residents requiring allied health', answer: 95, validation: 'valid' },
  { code: 'AH-02', question: '# reviewed by physiotherapist', answer: 78, validation: 'valid' },
  { code: 'AH-03', question: '# reviewed by occupational therapist', answer: 65, validation: 'valid' },
  { code: 'AH-04', question: '# reviewed by speech pathologist', answer: 24, validation: 'valid' },
  { code: 'AH-05', question: '# reviewed by dietitian', answer: 45, validation: 'valid' },
  { code: 'AH-06', question: '# reviewed by podiatrist', answer: 82, validation: 'valid' },
];

export const enrolledNursingData: QuestionData[] = [
  { code: 'EN-01', question: 'Total FTE enrolled nurses', answer: 8.5, validation: 'valid' },
  { code: 'EN-02', question: '# with current registration', answer: 9, validation: 'valid' },
  { code: 'EN-03', question: '# with medication administration competency', answer: 9, validation: 'valid' },
  { code: 'EN-04', question: '# with wound care competency', answer: 8, validation: 'valid' },
  { code: 'EN-05', question: 'Average years of experience', answer: 6.2, validation: 'valid' },
  { code: 'EN-06', question: '# completing PD this quarter', answer: 7, validation: 'warning' },
];

export const lifestyleOfficersData: QuestionData[] = [
  { code: 'LO-01', question: 'Total FTE lifestyle officers', answer: 3.8, validation: 'valid' },
  { code: 'LO-02', question: '# activities offered per week', answer: 42, validation: 'valid' },
  { code: 'LO-03', question: 'Average resident participation rate (%)', answer: 78, validation: 'valid' },
  { code: 'LO-04', question: '# one-on-one sessions conducted', answer: 156, validation: 'valid' },
  { code: 'LO-05', question: '# group activities conducted', answer: 128, validation: 'valid' },
  { code: 'LO-06', question: '# external events/outings', answer: 8, validation: 'valid' },
];

export const indicatorDataMap: Record<string, QuestionData[]> = {
  PI: pressureInjuriesData,
  RP: restrictivePracticesData,
  UWL: unplannedWeightLossData,
  FMI: fallsAndMajorInjuryData,
  MM: medicationManagementData,
  ADL: activitiesOfDailyLivingData,
  IC: incontinenceCareData,
  HOSP: hospitalisationData,
  WF: workforceData,
  CE: consumerExperienceData,
  QOL: qualityOfLifeData,
  AH: alliedHealthData,
  EN: enrolledNursingData,
  LO: lifestyleOfficersData,
};
