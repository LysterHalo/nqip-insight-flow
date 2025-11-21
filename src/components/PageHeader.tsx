import { Link } from "react-router-dom";
import loopLogo from "@/assets/loop-logo.png";

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={loopLogo} alt="Loop" className="h-10 w-auto" />
            <div>
              <h1 className="text-3xl font-semibold text-foreground">{title}</h1>
              {subtitle && <p className="text-muted-foreground mt-1 font-light">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {period && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground font-light">Period</p>
                <p className="font-medium text-foreground">{period}</p>
              </div>
            )}
            {showBackLink && (
              <Link 
                to="/" 
                className="text-sm text-primary hover:text-primary/90 underline font-light"
              >
                Back to Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
