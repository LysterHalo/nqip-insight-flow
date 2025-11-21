import { PageHeader } from "@/components/PageHeader";
import { IndicatorCard } from "@/components/IndicatorCard";
import { Button } from "@/components/ui/button";
import { indicators } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

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

        <div className="flex justify-center">
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
