import { Card } from "@/components/ui/card";
import { AlertTriangle, Check, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface IndicatorCardProps {
  id: string;
  name: string;
  completeness: number;
  warnings: number;
  errors: number;
}

export const IndicatorCard = ({ id, name, completeness, warnings, errors }: IndicatorCardProps) => {
  return (
    <Link to={`/indicator/${id}`}>
      <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/50">
        <h3 className="text-lg font-semibold text-foreground mb-4">{name}</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-2xl font-bold text-primary mb-1">{completeness}%</div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
          <div className="flex items-start gap-2">
            {warnings > 0 ? (
              <>
                <AlertTriangle className="h-5 w-5 text-warning mt-1" />
                <div>
                  <div className="text-lg font-semibold text-foreground">{warnings}</div>
                  <div className="text-xs text-muted-foreground">Warn</div>
                </div>
              </>
            ) : (
              <>
                <Check className="h-5 w-5 text-success mt-1" />
                <div>
                  <div className="text-lg font-semibold text-foreground">0</div>
                  <div className="text-xs text-muted-foreground">Warn</div>
                </div>
              </>
            )}
          </div>
          <div className="flex items-start gap-2">
            {errors > 0 ? (
              <>
                <XCircle className="h-5 w-5 text-destructive mt-1" />
                <div>
                  <div className="text-lg font-semibold text-foreground">{errors}</div>
                  <div className="text-xs text-muted-foreground">Error</div>
                </div>
              </>
            ) : (
              <>
                <Check className="h-5 w-5 text-success mt-1" />
                <div>
                  <div className="text-lg font-semibold text-foreground">0</div>
                  <div className="text-xs text-muted-foreground">Error</div>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};
