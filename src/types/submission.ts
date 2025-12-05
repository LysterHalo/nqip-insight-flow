export type SubmissionStatus = 
  | 'draft'
  | 'in-progress'
  | 'validation-errors'
  | 'awaiting-approval'
  | 'ready-to-submit'
  | 'submitted'
  | 'rejected';

export type UserRole = 'reviewer' | 'submitter';

export interface Submission {
  id: string;
  facilityId: string;
  facilityName: string;
  quarter: string;
  status: SubmissionStatus;
  createdBy: string;
  createdDate: string;
  lastUpdated: string;
  completeness: number;
  totalQuestions: number;
  answeredQuestions: number;
  errorCount: number;
  warningCount: number;
}

export interface QuestionAnswer {
  code: string;
  question: string;
  indicatorId: string;
  userValue: string | number | null;
  pipelineValue: string | number | null;
  source: 'auto-filled' | 'manual' | 'empty';
  validation: 'valid' | 'error' | 'warning' | 'pending';
  governmentError?: GovernmentValidationError;
}

export interface GovernmentValidationError {
  errorCode: string;
  itemReference: string;
  message: string;
}

export interface Facility {
  id: string;
  name: string;
  address: string;
}

export interface SubmissionStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming' | 'error';
}

export const WORKFLOW_STEPS: Omit<SubmissionStep, 'status'>[] = [
  { id: 1, title: 'Create Submission', description: 'Choose facility and quarter' },
  { id: 2, title: 'Retrieve Questionnaire', description: 'Get latest from Government' },
  { id: 3, title: 'Pre-fill Data', description: 'Import from data pipeline' },
  { id: 4, title: 'Review & Complete', description: 'Verify all answers' },
  { id: 5, title: 'Send In-Progress', description: 'Submit draft to Government' },
  { id: 6, title: 'Fix Errors', description: 'Resolve validation issues' },
  { id: 7, title: 'Final Review', description: 'Submitter approval' },
  { id: 8, title: 'Final Submit', description: 'Complete submission' },
  { id: 9, title: 'Confirmation', description: 'Submission complete' },
];
