import { PageHeader } from "@/components/PageHeader";
import { IndicatorCard } from "@/components/IndicatorCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { indicators } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSubmitInProgress = () => {
    toast.success("Submitted to Government with 'In Progress' status");
    navigate('/submission');
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="NQIP Data Review" 
        subtitle="Facility XYZ" 
        period="Q3 Draft"
        showBackLink={false}
      />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Indicators Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {indicators.map((indicator) => (
              <IndicatorCard key={indicator.id} {...indicator} />
            ))}
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Submission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              I attest that the information provided in this submission is accurate and complete to the best of my knowledge, 
              and has been reviewed according to the National Quality Indicator Program requirements.
            </p>
            <div className="flex justify-center">
              <Button onClick={handleSubmitInProgress} size="lg">
                Submit to Government — In Progress
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => navigate('/dashboard')}
            size="lg"
            className="px-8"
          >
            Go To Dashboard
          </Button>
          <Button 
            onClick={() => window.open('https://prod-apsoutheast-a.online.tableau.com/#/site/rockpool/views/NQIPQuarterlyReport/Falls?:iid=1', '_blank')}
            size="lg"
            className="px-8"
          >
            Go To Summary Dashboard
          </Button>
          <Button 
            onClick={() => navigate('/validation')}
            size="lg"
            className="px-8"
          >
            Go to Validation Panel
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
