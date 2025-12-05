import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Submission } from '@/types/submission';
import { AlertTriangle, Lock, Send } from 'lucide-react';

interface FinalSubmitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submission: Submission | null;
  onSubmit: (federatedId: string, userEmail: string) => void;
}

export const FinalSubmitDialog = ({
  open,
  onOpenChange,
  submission,
  onSubmit,
}: FinalSubmitDialogProps) => {
  const [federatedId, setFederatedId] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleSubmit = () => {
    if (federatedId && userEmail) {
      onSubmit(federatedId, userEmail);
      setFederatedId('');
      setUserEmail('');
    }
  };

  if (!submission) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Final Submission Confirmation
          </DialogTitle>
          <DialogDescription>
            You're about to formally submit this QuestionnaireResponse to the Government.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-warning">Important</p>
                <p className="text-muted-foreground mt-1">
                  After submission, this questionnaire will be <strong>locked</strong> and cannot be modified.
                  Please ensure all answers have been reviewed and approved.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-4 rounded-lg bg-muted/30">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Facility:</span>
              <span className="font-medium">{submission.facilityName}</span>
              <span className="text-muted-foreground">Quarter:</span>
              <span className="font-medium">{submission.quarter}</span>
              <span className="text-muted-foreground">Submission ID:</span>
              <span className="font-mono text-xs">{submission.id}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="federatedId">X-Federated-Id</Label>
              <Input
                id="federatedId"
                value={federatedId}
                onChange={(e) => setFederatedId(e.target.value)}
                placeholder="Enter your federated identity"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userEmail">X-User-Email</Label>
              <Input
                id="userEmail"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!federatedId || !userEmail}
            className="gap-2"
          >
            <Send className="h-4 w-4" />
            Submit to Government
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
