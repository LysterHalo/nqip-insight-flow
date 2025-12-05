import { Submission, Facility, QuestionAnswer, GovernmentValidationError } from '@/types/submission';
import { indicatorDataMap, indicators } from './mockData';

export const facilities: Facility[] = [
  { id: 'FAC001', name: 'Sunrise Aged Care', address: '123 Health St, Sydney NSW 2000' },
  { id: 'FAC002', name: 'Golden Years Residence', address: '456 Care Ave, Melbourne VIC 3000' },
  { id: 'FAC003', name: 'Harmony Living', address: '789 Wellness Rd, Brisbane QLD 4000' },
];

export const quarters = [
  { id: '2025-Q1', label: '2025 Q1 (Jan-Mar)' },
  { id: '2025-Q2', label: '2025 Q2 (Apr-Jun)' },
  { id: '2024-Q4', label: '2024 Q4 (Oct-Dec)' },
  { id: '2024-Q3', label: '2024 Q3 (Jul-Sep)' },
];

export const mockSubmissions: Submission[] = [
  {
    id: 'SUB001',
    facilityId: 'FAC001',
    facilityName: 'Sunrise Aged Care',
    quarter: '2025-Q1',
    status: 'in-progress',
    createdBy: 'John Smith',
    createdDate: '2025-01-15',
    lastUpdated: '2025-01-20',
    completeness: 75,
    totalQuestions: 98,
    answeredQuestions: 74,
    errorCount: 3,
    warningCount: 5,
  },
  {
    id: 'SUB002',
    facilityId: 'FAC001',
    facilityName: 'Sunrise Aged Care',
    quarter: '2024-Q4',
    status: 'submitted',
    createdBy: 'John Smith',
    createdDate: '2024-10-01',
    lastUpdated: '2024-12-28',
    completeness: 100,
    totalQuestions: 98,
    answeredQuestions: 98,
    errorCount: 0,
    warningCount: 0,
  },
  {
    id: 'SUB003',
    facilityId: 'FAC002',
    facilityName: 'Golden Years Residence',
    quarter: '2025-Q1',
    status: 'validation-errors',
    createdBy: 'Sarah Johnson',
    createdDate: '2025-01-10',
    lastUpdated: '2025-01-18',
    completeness: 92,
    totalQuestions: 98,
    answeredQuestions: 90,
    errorCount: 4,
    warningCount: 2,
  },
  {
    id: 'SUB004',
    facilityId: 'FAC002',
    facilityName: 'Golden Years Residence',
    quarter: '2024-Q4',
    status: 'awaiting-approval',
    createdBy: 'Sarah Johnson',
    createdDate: '2024-10-05',
    lastUpdated: '2024-12-20',
    completeness: 100,
    totalQuestions: 98,
    answeredQuestions: 98,
    errorCount: 0,
    warningCount: 3,
  },
  {
    id: 'SUB005',
    facilityId: 'FAC003',
    facilityName: 'Harmony Living',
    quarter: '2025-Q1',
    status: 'draft',
    createdBy: 'Mike Wilson',
    createdDate: '2025-01-22',
    lastUpdated: '2025-01-22',
    completeness: 0,
    totalQuestions: 98,
    answeredQuestions: 0,
    errorCount: 0,
    warningCount: 0,
  },
];

// Generate question answers with pipeline values
export const generateQuestionAnswers = (): QuestionAnswer[] => {
  const answers: QuestionAnswer[] = [];
  
  Object.entries(indicatorDataMap).forEach(([indicatorId, questions]) => {
    questions.forEach((q) => {
      // Simulate pipeline values (sometimes same, sometimes different, sometimes null)
      const hasPipelineValue = Math.random() > 0.2;
      const pipelineValue = hasPipelineValue 
        ? (typeof q.answer === 'number' ? q.answer + Math.floor(Math.random() * 5) - 2 : q.answer)
        : null;
      
      answers.push({
        code: q.code,
        question: q.question,
        indicatorId,
        userValue: q.answer,
        pipelineValue,
        source: q.answer !== null ? (q.answer === pipelineValue ? 'auto-filled' : 'manual') : 'empty',
        validation: q.validation === 'valid' ? 'valid' : q.validation,
      });
    });
  });
  
  return answers;
};

export const mockGovernmentErrors: GovernmentValidationError[] = [
  {
    errorCode: 'NQIP-001',
    itemReference: 'PI-04',
    message: 'Required field "Number with pressure injuries" must not be empty',
  },
  {
    errorCode: 'NQIP-002',
    itemReference: 'RP-03',
    message: 'Required field "Number with restrictive practices" must not be empty',
  },
  {
    errorCode: 'NQIP-003',
    itemReference: 'ADL-07',
    message: 'Required field "Number with decline in ADL function" must not be empty',
  },
  {
    errorCode: 'NQIP-004',
    itemReference: 'CE-07',
    message: 'Required field "Average response satisfaction score" must not be empty',
  },
];

export const getStatusColor = (status: Submission['status']) => {
  switch (status) {
    case 'draft':
      return 'bg-muted text-muted-foreground';
    case 'in-progress':
      return 'bg-accent text-accent-foreground';
    case 'validation-errors':
      return 'bg-warning text-warning-foreground';
    case 'awaiting-approval':
      return 'bg-secondary text-secondary-foreground';
    case 'ready-to-submit':
      return 'bg-success/20 text-success';
    case 'submitted':
      return 'bg-success text-success-foreground';
    case 'rejected':
      return 'bg-destructive text-destructive-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const getStatusLabel = (status: Submission['status']) => {
  switch (status) {
    case 'draft':
      return 'Draft';
    case 'in-progress':
      return 'In Progress';
    case 'validation-errors':
      return 'Validation Errors';
    case 'awaiting-approval':
      return 'Awaiting Approval';
    case 'ready-to-submit':
      return 'Ready to Submit';
    case 'submitted':
      return 'Submitted';
    case 'rejected':
      return 'Rejected';
    default:
      return status;
  }
};
