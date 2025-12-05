import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { GovernmentValidationError } from '@/types/submission';
import { AlertCircle, ExternalLink, RefreshCw } from 'lucide-react';

interface ValidationSummaryPanelProps {
  errors: GovernmentValidationError[];
  onGoToQuestion: (itemReference: string) => void;
  onRevalidate: () => void;
  isRevalidating?: boolean;
}

export const ValidationSummaryPanel = ({
  errors,
  onGoToQuestion,
  onRevalidate,
  isRevalidating = false,
}: ValidationSummaryPanelProps) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <Card className="border-warning bg-warning/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-warning/20">
              <AlertCircle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <CardTitle className="text-lg">Validation Errors</CardTitle>
              <CardDescription>
                Government found <span className="font-semibold text-warning">{errors.length}</span> issue{errors.length !== 1 ? 's' : ''} that need to be resolved
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={onRevalidate}
            disabled={isRevalidating}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRevalidating ? 'animate-spin' : ''}`} />
            Revalidate with Government
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Error Code</TableHead>
              <TableHead className="w-[120px]">Question</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="w-[100px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {errors.map((error, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Badge variant="destructive" className="font-mono">
                    {error.errorCode}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{error.itemReference}</TableCell>
                <TableCell className="text-sm">{error.message}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onGoToQuestion(error.itemReference)}
                    className="gap-1"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Go to
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
