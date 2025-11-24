import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { indicators } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";

const SummaryDashboard = () => {
  const navigate = useNavigate();

  // Calculate overall KPIs
  const totalIndicators = indicators.length;
  const avgCompleteness = Math.round(
    indicators.reduce((sum, ind) => sum + ind.completeness, 0) / totalIndicators
  );
  const totalWarnings = indicators.reduce((sum, ind) => sum + ind.warnings, 0);
  const totalErrors = indicators.reduce((sum, ind) => sum + ind.errors, 0);

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="KPI Summary Dashboard" 
        subtitle="Facility XYZ" 
        period="Q3 Draft"
        showBackLink={true}
      />
      
      <main className="container mx-auto px-6 py-8">
        {/* Overall KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Indicators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalIndicators}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Avg Completeness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{avgCompleteness}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                Total Warnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-500">{totalWarnings}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                Total Errors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">{totalErrors}</div>
            </CardContent>
          </Card>
        </div>

        {/* Indicator Details */}
        <Card>
          <CardHeader>
            <CardTitle>Indicator Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {indicators.map((indicator) => (
                <div 
                  key={indicator.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/indicator/${indicator.id}`)}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{indicator.name}</h3>
                    <div className="flex gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-muted-foreground">
                          Completeness: <span className="font-medium text-foreground">{indicator.completeness}%</span>
                        </span>
                      </div>
                      {indicator.warnings > 0 && (
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span className="text-muted-foreground">
                            Warnings: <span className="font-medium text-yellow-500">{indicator.warnings}</span>
                          </span>
                        </div>
                      )}
                      {indicator.errors > 0 && (
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <span className="text-muted-foreground">
                            Errors: <span className="font-medium text-red-500">{indicator.errors}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center mt-8">
          <Button onClick={() => navigate('/')} size="lg" variant="outline">
            Back to Home
          </Button>
        </div>
      </main>
    </div>
  );
};

export default SummaryDashboard;
