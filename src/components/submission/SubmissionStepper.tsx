import { Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SubmissionStep } from '@/types/submission';

interface SubmissionStepperProps {
  steps: SubmissionStep[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const SubmissionStepper = ({ steps, currentStep, onStepClick }: SubmissionStepperProps) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center relative">
              <button
                onClick={() => onStepClick?.(step.id)}
                disabled={step.status === 'upcoming'}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all',
                  step.status === 'completed' && 'bg-success border-success text-success-foreground',
                  step.status === 'current' && 'bg-primary border-primary text-primary-foreground',
                  step.status === 'upcoming' && 'bg-background border-muted text-muted-foreground',
                  step.status === 'error' && 'bg-destructive border-destructive text-destructive-foreground',
                  step.status !== 'upcoming' && 'cursor-pointer hover:opacity-80'
                )}
              >
                {step.status === 'completed' ? (
                  <Check className="h-5 w-5" />
                ) : step.status === 'error' ? (
                  <AlertCircle className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-semibold">{step.id}</span>
                )}
              </button>
              <div className="absolute top-12 text-center w-24 -left-7">
                <p className={cn(
                  'text-xs font-medium',
                  step.status === 'current' && 'text-primary',
                  step.status === 'upcoming' && 'text-muted-foreground',
                  step.status === 'error' && 'text-destructive'
                )}>
                  {step.title}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                'flex-1 h-0.5 mx-2',
                step.status === 'completed' ? 'bg-success' : 'bg-muted'
              )} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
