import { AlertTriangle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface ValidationItemProps {
  type: 'error' | 'warning';
  code: string;
  message: string;
  indicatorId: string;
}

export const ValidationItem = ({ type, code, message, indicatorId }: ValidationItemProps) => {
  return (
    <Link to={`/indicator/${indicatorId}#${code}`}>
      <div className="flex items-start gap-3 p-4 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer">
        {type === 'error' ? (
          <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
        )}
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            {type === 'error' ? 'Error' : 'Warning'}: {message}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Code: {code} • Click to view in detail</p>
        </div>
      </div>
    </Link>
  );
};
