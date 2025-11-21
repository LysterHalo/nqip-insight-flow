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
  { id: 'PI', name: 'Pressure Injuries', completeness: 90, warnings: 2, errors: 1 },
  { id: 'RP', name: 'Restrictive Practices', completeness: 100, warnings: 1, errors: 1 },
  { id: 'WL', name: 'Weight Loss', completeness: 85, warnings: 1, errors: 1 },
  { id: 'FMI', name: 'Falls & Injuries', completeness: 95, warnings: 0, errors: 0 },
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
    validation: 'valid',
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
