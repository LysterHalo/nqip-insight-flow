import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  period?: string;
  showBackLink?: boolean;
}

export const PageHeader = ({ title, subtitle, period, showBackLink = true }: PageHeaderProps) => {
  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">{title}</h1>
            {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="text-right">
            {period && (
              <p className="text-sm font-medium text-muted-foreground mb-2">Period: {period}</p>
            )}
            {showBackLink && (
              <Link 
                to="/" 
                className="text-sm text-primary hover:text-primary/90 underline"
              >
                [Back to Dashboard]
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
