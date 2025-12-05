import { Badge } from '@/components/ui/badge';
import { SubmissionStatus } from '@/types/submission';
import { getStatusColor, getStatusLabel } from '@/data/submissionMockData';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: SubmissionStatus;
  size?: 'sm' | 'default' | 'lg';
}

export const StatusBadge = ({ status, size = 'default' }: StatusBadgeProps) => {
  return (
    <Badge
      className={cn(
        getStatusColor(status),
        size === 'sm' && 'text-xs px-2 py-0.5',
        size === 'lg' && 'text-sm px-4 py-1'
      )}
    >
      {getStatusLabel(status)}
    </Badge>
  );
};
