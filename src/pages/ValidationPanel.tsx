import { PageHeader } from "@/components/PageHeader";
import { ValidationItem } from "@/components/ValidationItem";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { validationMessages } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const ValidationPanel = () => {
  const navigate = useNavigate();
  const errors = validationMessages.filter(v => v.type === 'error');
  const warnings = validationMessages.filter(v => v.type === 'warning');

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Validation & Completeness Panel" 
        subtitle="Facility XYZ" 
        period="Q3 Draft"
      />
      
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({validationMessages.length})</TabsTrigger>
            <TabsTrigger value="errors">Errors ({errors.length})</TabsTrigger>
            <TabsTrigger value="warnings">Warnings ({warnings.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-3">
            {validationMessages.map((validation) => (
              <ValidationItem key={validation.id} {...validation} />
            ))}
          </TabsContent>
          
          <TabsContent value="errors" className="space-y-3">
            {errors.map((validation) => (
              <ValidationItem key={validation.id} {...validation} />
            ))}
          </TabsContent>
          
          <TabsContent value="warnings" className="space-y-3">
            {warnings.map((validation) => (
              <ValidationItem key={validation.id} {...validation} />
            ))}
          </TabsContent>
        </Tabs>

        <div className="flex gap-4 justify-center mt-8">
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Indicators
          </Button>
          <Button onClick={() => navigate('/indicator/PI')}>
            Continue to Indicator Details
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ValidationPanel;
