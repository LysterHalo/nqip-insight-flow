import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RoleSelector } from '@/components/submission/RoleSelector';
import { SubmissionStepper } from '@/components/submission/SubmissionStepper';
import { StatusBadge } from '@/components/submission/StatusBadge';
import { AutoFillControls } from '@/components/submission/AutoFillControls';
import { QuestionField } from '@/components/submission/QuestionField';
import { ValidationSummaryPanel } from '@/components/submission/ValidationSummaryPanel';
import { FinalSubmitDialog } from '@/components/submission/FinalSubmitDialog';
import { UserRole, SubmissionStep, WORKFLOW_STEPS, QuestionAnswer } from '@/types/submission';
import {
  mockSubmissions,
  generateQuestionAnswers,
  mockGovernmentErrors,
  getStatusLabel,
} from '@/data/submissionMockData';
import { indicators } from '@/data/mockData';
import { toast } from 'sonner';
import {
  Save,
  Send,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Download,
  Printer,
  Home,
  AlertCircle,
  Check,
} from 'lucide-react';

const SubmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [role, setRole] = useState<UserRole>('reviewer');
  const [currentStep, setCurrentStep] = useState(4);
  const [submission, setSubmission] = useState(mockSubmissions.find((s) => s.id === id) || mockSubmissions[0]);
  const [questions, setQuestions] = useState<QuestionAnswer[]>([]);
  const [governmentErrors, setGovernmentErrors] = useState(
    submission.status === 'validation-errors' ? mockGovernmentErrors : []
  );
  const [isRevalidating, setIsRevalidating] = useState(false);
  const [isFinalSubmitOpen, setIsFinalSubmitOpen] = useState(false);
  const [selectedIndicator, setSelectedIndicator] = useState(indicators[0].id);

  useEffect(() => {
    const generatedQuestions = generateQuestionAnswers();
    // Map government errors to questions
    const questionsWithErrors = generatedQuestions.map((q) => {
      const error = governmentErrors.find((e) => e.itemReference === q.code);
      return error ? { ...q, governmentError: error, validation: 'error' as const } : q;
    });
    setQuestions(questionsWithErrors);
  }, [governmentErrors]);

  // Derive step state from submission status
  const steps: SubmissionStep[] = useMemo(() => {
    const statusToStep: Record<string, number> = {
      draft: 1,
      'in-progress': 4,
      'validation-errors': 6,
      'awaiting-approval': 7,
      'ready-to-submit': 8,
      submitted: 9,
    };
    const activeStep = statusToStep[submission.status] || 4;
    
    return WORKFLOW_STEPS.map((step) => ({
      ...step,
      status:
        step.id < activeStep
          ? 'completed'
          : step.id === activeStep
          ? submission.status === 'validation-errors' && step.id === 6
            ? 'error'
            : 'current'
          : 'upcoming',
    }));
  }, [submission.status]);

  const currentIndicatorQuestions = questions.filter((q) => q.indicatorId === selectedIndicator);
  
  const stats = useMemo(() => {
    const total = questions.length;
    const answered = questions.filter((q) => q.userValue !== null).length;
    const withPipelineData = questions.filter((q) => q.pipelineValue !== null).length;
    const empty = questions.filter((q) => q.userValue === null && q.pipelineValue !== null).length;
    const errors = questions.filter((q) => q.validation === 'error').length;
    const warnings = questions.filter((q) => q.validation === 'warning').length;
    return { total, answered, withPipelineData, empty, errors, warnings };
  }, [questions]);

  const handleValueChange = (code: string, value: string | number | null) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.code === code
          ? {
              ...q,
              userValue: value === '' ? null : value,
              source: value !== null ? 'manual' : 'empty',
              validation: value !== null ? 'valid' : 'pending',
              governmentError: undefined,
            }
          : q
      )
    );
  };

  const handleAutoFill = (code: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.code === code && q.pipelineValue !== null
          ? { ...q, userValue: q.pipelineValue, source: 'auto-filled', validation: 'valid' }
          : q
      )
    );
    toast.success(`Auto-filled ${code} with pipeline value`);
  };

  const handleRevert = (code: string) => {
    const question = questions.find((q) => q.code === code);
    if (question?.pipelineValue !== null) {
      handleAutoFill(code);
      toast.info(`Reverted ${code} to pipeline value`);
    }
  };

  const handlePrefillAll = () => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.pipelineValue !== null
          ? { ...q, userValue: q.pipelineValue, source: 'auto-filled', validation: 'valid' }
          : q
      )
    );
    toast.success(`Pre-filled ${stats.withPipelineData} questions with pipeline data`);
  };

  const handlePrefillMissing = () => {
    let count = 0;
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.userValue === null && q.pipelineValue !== null) {
          count++;
          return { ...q, userValue: q.pipelineValue, source: 'auto-filled', validation: 'valid' };
        }
        return q;
      })
    );
    toast.success(`Pre-filled ${count} empty questions with pipeline data`);
  };

  const handleResetAll = () => {
    setQuestions((prev) =>
      prev.map((q) => ({ ...q, userValue: null, source: 'empty', validation: 'pending' }))
    );
    toast.info('All answers cleared');
  };

  const handleSave = () => {
    toast.success('Draft saved successfully');
  };

  const handleSendInProgress = () => {
    setSubmission((prev) => ({ ...prev, status: 'in-progress' }));
    toast.success('Submitted to Government as In Progress');
  };

  const handleGoToQuestion = (itemReference: string) => {
    const question = questions.find((q) => q.code === itemReference);
    if (question) {
      setSelectedIndicator(question.indicatorId);
      setTimeout(() => {
        const element = document.getElementById(itemReference);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('ring-2', 'ring-primary');
          setTimeout(() => element.classList.remove('ring-2', 'ring-primary'), 2000);
        }
      }, 100);
    }
  };

  const handleRevalidate = async () => {
    setIsRevalidating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Check if all errors are fixed
    const remainingErrors = governmentErrors.filter((err) => {
      const q = questions.find((q) => q.code === err.itemReference);
      return q?.userValue === null;
    });
    
    setGovernmentErrors(remainingErrors);
    setIsRevalidating(false);
    
    if (remainingErrors.length === 0) {
      setSubmission((prev) => ({ ...prev, status: 'ready-to-submit' }));
      toast.success('All validations passed! Ready for final submission.');
    } else {
      toast.warning(`${remainingErrors.length} validation errors remain`);
    }
  };

  const handleMarkForApproval = () => {
    setSubmission((prev) => ({ ...prev, status: 'awaiting-approval' }));
    toast.success('Marked as awaiting approval');
  };

  const handleFinalSubmit = (federatedId: string, userEmail: string) => {
    setIsFinalSubmitOpen(false);
    setSubmission((prev) => ({ ...prev, status: 'submitted' }));
    toast.success('Submission completed successfully!');
  };

  const isSubmitted = submission.status === 'submitted';
  const canSubmit = role === 'submitter' && submission.status === 'ready-to-submit';

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title={`Submission: ${submission.facilityName}`}
        subtitle={submission.quarter}
        period=""
      />

      <main className="container mx-auto px-6 py-8">
        {/* Header Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/submissions')} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Submissions
            </Button>
            <StatusBadge status={submission.status} size="lg" />
          </div>
          <RoleSelector role={role} onRoleChange={setRole} />
        </div>

        {/* Stepper */}
        <Card className="mb-6">
          <CardContent className="pt-6 pb-16">
            <SubmissionStepper steps={steps} currentStep={currentStep} />
          </CardContent>
        </Card>

        {/* Submitted Confirmation View */}
        {isSubmitted ? (
          <Card className="border-success bg-success/5">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-success/20">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                </div>
                <div>
                  <CardTitle className="text-xl">Submission Complete</CardTitle>
                  <CardDescription>
                    Your quarterly quality indicators have been submitted to the Government.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <div className="p-4 rounded-lg bg-background border">
                  <p className="text-sm text-muted-foreground">Government Reference</p>
                  <p className="font-mono text-lg font-medium">GOV-{submission.id}-2025</p>
                </div>
                <div className="p-4 rounded-lg bg-background border">
                  <p className="text-sm text-muted-foreground">Submitted</p>
                  <p className="font-medium">{new Date().toLocaleString()}</p>
                </div>
                <div className="p-4 rounded-lg bg-background border">
                  <p className="text-sm text-muted-foreground">Facility</p>
                  <p className="font-medium">{submission.facilityName}</p>
                </div>
                <div className="p-4 rounded-lg bg-background border">
                  <p className="text-sm text-muted-foreground">Quarter</p>
                  <p className="font-medium">{submission.quarter}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Summary
                </Button>
                <Button variant="outline" className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
                <Button onClick={() => navigate('/submissions')} className="gap-2">
                  <Home className="h-4 w-4" />
                  Back to Submissions
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Validation Errors Panel */}
            {governmentErrors.length > 0 && (
              <div className="mb-6">
                <ValidationSummaryPanel
                  errors={governmentErrors}
                  onGoToQuestion={handleGoToQuestion}
                  onRevalidate={handleRevalidate}
                  isRevalidating={isRevalidating}
                />
              </div>
            )}

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <Card>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">Answered</p>
                  <p className="text-2xl font-bold text-primary">{stats.answered}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">Pipeline Data</p>
                  <p className="text-2xl font-bold text-accent-foreground">{stats.withPipelineData}</p>
                </CardContent>
              </Card>
              <Card className={stats.errors > 0 ? 'border-destructive' : ''}>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">Errors</p>
                  <p className={`text-2xl font-bold ${stats.errors > 0 ? 'text-destructive' : ''}`}>
                    {stats.errors}
                  </p>
                </CardContent>
              </Card>
              <Card className={stats.warnings > 0 ? 'border-warning' : ''}>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground">Warnings</p>
                  <p className={`text-2xl font-bold ${stats.warnings > 0 ? 'text-warning' : ''}`}>
                    {stats.warnings}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Auto-Fill Controls */}
            <div className="mb-6">
              <AutoFillControls
                totalQuestions={stats.total}
                questionsWithPipelineData={stats.withPipelineData}
                emptyQuestions={stats.empty}
                onPrefillAll={handlePrefillAll}
                onPrefillMissing={handlePrefillMissing}
                onResetAll={handleResetAll}
              />
            </div>

            {/* Questions by Indicator */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Questionnaire</CardTitle>
                <CardDescription>Review and complete answers for each quality indicator</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedIndicator} onValueChange={setSelectedIndicator}>
                  <TabsList className="flex flex-wrap h-auto gap-1 mb-6">
                    {indicators.map((ind) => {
                      const indQuestions = questions.filter((q) => q.indicatorId === ind.id);
                      const hasErrors = indQuestions.some((q) => q.validation === 'error');
                      const hasWarnings = indQuestions.some((q) => q.validation === 'warning');
                      const allAnswered = indQuestions.every((q) => q.userValue !== null);
                      
                      return (
                        <TabsTrigger
                          key={ind.id}
                          value={ind.id}
                          className="relative data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                          {ind.id}
                          {hasErrors && (
                            <AlertCircle className="absolute -top-1 -right-1 h-3 w-3 text-destructive" />
                          )}
                          {!hasErrors && hasWarnings && (
                            <AlertCircle className="absolute -top-1 -right-1 h-3 w-3 text-warning" />
                          )}
                          {!hasErrors && !hasWarnings && allAnswered && (
                            <Check className="absolute -top-1 -right-1 h-3 w-3 text-success" />
                          )}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>

                  {indicators.map((ind) => (
                    <TabsContent key={ind.id} value={ind.id}>
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">{ind.name}</h3>
                        {currentIndicatorQuestions.map((question) => (
                          <QuestionField
                            key={question.code}
                            question={question}
                            onValueChange={handleValueChange}
                            onAutoFill={handleAutoFill}
                            onRevert={handleRevert}
                          />
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={handleSave} className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Draft
                    </Button>
                    {submission.status === 'draft' && (
                      <Button variant="outline" onClick={handleSendInProgress} className="gap-2">
                        <Send className="h-4 w-4" />
                        Send In-Progress to Government
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    {role === 'reviewer' && submission.status === 'in-progress' && (
                      <Button onClick={handleMarkForApproval} className="gap-2">
                        <ArrowRight className="h-4 w-4" />
                        Mark as Awaiting Approval
                      </Button>
                    )}
                    {canSubmit && (
                      <Button onClick={() => setIsFinalSubmitOpen(true)} className="gap-2 bg-success hover:bg-success/90">
                        <CheckCircle2 className="h-4 w-4" />
                        Final Submit to Government
                      </Button>
                    )}
                    {role === 'submitter' && submission.status === 'awaiting-approval' && stats.errors === 0 && (
                      <Button
                        onClick={() => setSubmission((prev) => ({ ...prev, status: 'ready-to-submit' }))}
                        className="gap-2"
                      >
                        <Check className="h-4 w-4" />
                        Approve for Submission
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>

      <FinalSubmitDialog
        open={isFinalSubmitOpen}
        onOpenChange={setIsFinalSubmitOpen}
        submission={submission}
        onSubmit={handleFinalSubmit}
      />
    </div>
  );
};

export default SubmissionDetail;
