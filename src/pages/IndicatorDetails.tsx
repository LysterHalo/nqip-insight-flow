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
import { pressureInjuriesData, indicators } from "@/data/mockData";
import { useNavigate, useParams } from "react-router-dom";
import { Check, XCircle } from "lucide-react";
import { toast } from "sonner";

const IndicatorDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const indicator = indicators.find(i => i.id === id);
  const indicatorName = indicator?.name || "Pressure Injuries";

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
                  {pressureInjuriesData.map((row) => (
                    <TableRow key={row.code}>
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
                        ) : (
                          <div className="flex items-center gap-2 text-destructive">
                            <XCircle className="h-4 w-4" />
                            <span>Missing</span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">...</TableCell>
                    <TableCell className="text-muted-foreground">
                      (all sub-questions PI-07 ... PI-18)
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
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
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={handleEditData}>
                Edit Data
              </Button>
              <Button variant="outline" onClick={handleAcknowledgeWarnings}>
                Acknowledge Warnings
              </Button>
              <Button variant="secondary" onClick={handleSaveDraft}>
                Save Draft
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submission</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={handleSubmitInProgress} size="lg">
                Submit to Government — In Progress
              </Button>
              <Button variant="outline" onClick={handleFinalSubmit} size="lg">
                Final Submit — Status: Submitted
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              * Attestation Message (auto from API doc)
            </p>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Button variant="outline" onClick={() => navigate('/')}>
            Back to Dashboard
          </Button>
        </div>
      </main>
    </div>
  );
};

export default IndicatorDetails;
