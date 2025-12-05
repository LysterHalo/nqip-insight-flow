import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Download, RefreshCw, Trash2, Database } from 'lucide-react';

interface AutoFillControlsProps {
  totalQuestions: number;
  questionsWithPipelineData: number;
  emptyQuestions: number;
  onPrefillAll: () => void;
  onPrefillMissing: () => void;
  onResetAll: () => void;
}

export const AutoFillControls = ({
  totalQuestions,
  questionsWithPipelineData,
  emptyQuestions,
  onPrefillAll,
  onPrefillMissing,
  onResetAll,
}: AutoFillControlsProps) => {
  return (
    <Card className="border-accent/30 bg-accent/5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-accent-foreground" />
          <CardTitle className="text-lg">Pre-fill from Data Pipeline</CardTitle>
        </div>
        <CardDescription>
          Import answers from your internal data systems. Pipeline data is available for{' '}
          <span className="font-semibold text-accent-foreground">{questionsWithPipelineData}</span> of{' '}
          <span className="font-semibold">{totalQuestions}</span> questions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="default" className="gap-2">
                <Download className="h-4 w-4" />
                Pre-fill Entire Questionnaire
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Override all answers?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will replace <span className="font-semibold">{questionsWithPipelineData}</span> answers 
                  with values from your data pipeline, including any manual edits you've made.
                  <br /><br />
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onPrefillAll}>
                  Yes, replace all answers
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button variant="outline" className="gap-2" onClick={onPrefillMissing}>
            <RefreshCw className="h-4 w-4" />
            Pre-fill Missing Only ({emptyQuestions})
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="gap-2 text-muted-foreground">
                <Trash2 className="h-4 w-4" />
                Reset All to Blank
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear all answers?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will remove all answers from the questionnaire. You'll need to re-enter 
                  or re-import all data.
                  <br /><br />
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onResetAll} className="bg-destructive hover:bg-destructive/90">
                  Yes, clear everything
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};
