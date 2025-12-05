import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { QuestionAnswer } from '@/types/submission';
import { Sparkles, RotateCcw, AlertCircle, AlertTriangle, Check } from 'lucide-react';

interface QuestionFieldProps {
  question: QuestionAnswer;
  onValueChange: (code: string, value: string | number | null) => void;
  onAutoFill: (code: string) => void;
  onRevert: (code: string) => void;
}

export const QuestionField = ({
  question,
  onValueChange,
  onAutoFill,
  onRevert,
}: QuestionFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const hasError = question.validation === 'error' || question.governmentError;
  const hasWarning = question.validation === 'warning';
  const isAutoFilled = question.source === 'auto-filled';
  const isManual = question.source === 'manual';
  const canAutoFill = question.pipelineValue !== null && question.userValue === null;
  const canRevert = question.pipelineValue !== null && isManual && question.userValue !== question.pipelineValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numValue = parseFloat(value);
    onValueChange(question.code, isNaN(numValue) ? value : numValue);
  };

  return (
    <div
      id={question.code}
      className={cn(
        'p-4 rounded-lg border transition-all',
        hasError && 'border-destructive bg-destructive/5',
        hasWarning && !hasError && 'border-warning bg-warning/5',
        isAutoFilled && !hasError && !hasWarning && 'border-accent/50 bg-accent/5',
        !hasError && !hasWarning && !isAutoFilled && 'border-border',
        isFocused && 'ring-2 ring-primary/20'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor={question.code} className="text-sm font-medium">
              {question.code}
            </Label>
            {isAutoFilled && (
              <Badge variant="secondary" className="text-xs gap-1 bg-accent/20 text-accent-foreground">
                <Sparkles className="h-3 w-3" />
                Auto-filled
              </Badge>
            )}
            {isManual && (
              <Badge variant="outline" className="text-xs">
                Edited manually
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{question.question}</p>
          
          <div className="flex items-center gap-2">
            <Input
              id={question.code}
              value={question.userValue ?? ''}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter value..."
              className={cn(
                'max-w-[200px]',
                hasError && 'border-destructive focus-visible:ring-destructive'
              )}
            />
            
            {canAutoFill && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAutoFill(question.code)}
                className="gap-1 text-accent-foreground border-accent/50 hover:bg-accent/10"
              >
                <Sparkles className="h-3 w-3" />
                Auto-fill
              </Button>
            )}
            
            {canRevert && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRevert(question.code)}
                className="gap-1 text-muted-foreground"
              >
                <RotateCcw className="h-3 w-3" />
                Revert to pipeline ({question.pipelineValue})
              </Button>
            )}
          </div>

          {question.pipelineValue !== null && !isAutoFilled && (
            <p className="text-xs text-muted-foreground">
              Pipeline value: <span className="font-medium">{question.pipelineValue}</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {hasError && (
            <div className="flex items-center gap-1 text-destructive">
              <AlertCircle className="h-4 w-4" />
            </div>
          )}
          {hasWarning && !hasError && (
            <div className="flex items-center gap-1 text-warning">
              <AlertTriangle className="h-4 w-4" />
            </div>
          )}
          {question.validation === 'valid' && question.userValue !== null && (
            <div className="flex items-center gap-1 text-success">
              <Check className="h-4 w-4" />
            </div>
          )}
        </div>
      </div>

      {question.governmentError && (
        <div className="mt-3 p-2 rounded bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive flex items-center gap-2">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>
              <strong>{question.governmentError.errorCode}:</strong> {question.governmentError.message}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};
