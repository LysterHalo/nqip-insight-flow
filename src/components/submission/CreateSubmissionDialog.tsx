import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { facilities, quarters } from '@/data/submissionMockData';
import { Building2, Calendar } from 'lucide-react';

interface CreateSubmissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateSubmission: (facilityId: string, quarter: string) => void;
}

export const CreateSubmissionDialog = ({
  open,
  onOpenChange,
  onCreateSubmission,
}: CreateSubmissionDialogProps) => {
  const [facilityId, setFacilityId] = useState('');
  const [quarter, setQuarter] = useState('');

  const handleCreate = () => {
    if (facilityId && quarter) {
      onCreateSubmission(facilityId, quarter);
      setFacilityId('');
      setQuarter('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Submission</DialogTitle>
          <DialogDescription>
            Start a new quarterly submission for one of your facilities. You can save your progress 
            and return to complete it later.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="facility" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Facility
            </Label>
            <Select value={facilityId} onValueChange={setFacilityId}>
              <SelectTrigger id="facility">
                <SelectValue placeholder="Select a facility" />
              </SelectTrigger>
              <SelectContent>
                {facilities.map((facility) => (
                  <SelectItem key={facility.id} value={facility.id}>
                    <div>
                      <div className="font-medium">{facility.name}</div>
                      <div className="text-xs text-muted-foreground">{facility.address}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quarter" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Quarter
            </Label>
            <Select value={quarter} onValueChange={setQuarter}>
              <SelectTrigger id="quarter">
                <SelectValue placeholder="Select a quarter" />
              </SelectTrigger>
              <SelectContent>
                {quarters.map((q) => (
                  <SelectItem key={q.id} value={q.id}>
                    {q.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={!facilityId || !quarter}>
            Create Submission
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
