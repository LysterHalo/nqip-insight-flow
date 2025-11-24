import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { indicators, indicatorDataMap } from "@/data/mockData";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Check, XCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

const IndicatorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  
  const indicator = indicators.find(i => i.id === id);
  const indicatorName = indicator?.name || "Indicator";
  const questionData = id && indicatorDataMap[id] ? indicatorDataMap[id] : [];

  // Scroll to highlighted question if hash is present
  useEffect(() => {
    if (location.hash) {
      const code = location.hash.substring(1); // Remove the # symbol
      const element = document.getElementById(code);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add temporary highlight effect
        element.classList.add('highlight-row');
        setTimeout(() => element.classList.remove('highlight-row'), 3000);
      }
    }
  }, [location.hash]);

  const handleEditData = () => {
    toast.info("Edit mode would open here");
  };

  const handleAcknowledgeWarnings = () => {
    toast.success("Warnings acknowledged");
  };

  const handleSaveDraft = () => {
    toast.success("Draft saved successfully");
  };

  const handleSubmitInProgress = () => {
    toast.success("Submitted to Government with 'In Progress' status");
    navigate('/submission');
  };

  const handleFinalSubmit = () => {
    toast.success("Final submission completed!");
    navigate('/submission');
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title={`Detailed QI Data – ${indicatorName}`}
        subtitle="Facility XYZ" 
        period="Q3 Draft"
      />
      
      <main className="container mx-auto px-6 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Question Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Code</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead className="w-[150px]">Answer</TableHead>
                    <TableHead className="w-[150px]">Validation</TableHead>
                  </TableRow>
            </TableHeader>
            <TableBody>
              {questionData.map((row) => (
                    <TableRow key={row.code} id={row.code} className="transition-all duration-300">
                      <TableCell className="font-medium">{row.code}</TableCell>
                      <TableCell>{row.question}</TableCell>
                      <TableCell>
                        {row.answer === null ? (
                          <span className="text-destructive font-medium">✕ Missing</span>
                        ) : (
                          row.answer
                        )}
                      </TableCell>
                      <TableCell>
                        {row.validation === 'valid' ? (
                          <div className="flex items-center gap-2 text-success">
                            <Check className="h-4 w-4" />
                            <span>Valid</span>
                          </div>
                        ) : row.validation === 'warning' ? (
                          <div className="flex items-center gap-2 text-warning">
                            <AlertTriangle className="h-4 w-4" />
                            <span>Warning</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-destructive">
                            <XCircle className="h-4 w-4" />
                            <span>Error</span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Reviewer Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" onClick={handleEditData}>
                Edit Data
              </Button>
              <Button variant="outline" onClick={handleAcknowledgeWarnings}>
                Acknowledge Warnings
              </Button>
              <Button onClick={handleSaveDraft}>
                Save Draft
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center mt-8">
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Overview Page
          </Button>
          <Button variant="outline" onClick={() => navigate('/validation')}>
            Back to Validation Panel
          </Button>
        </div>
      </main>
    </div>
  );
};

export default IndicatorDetails;
