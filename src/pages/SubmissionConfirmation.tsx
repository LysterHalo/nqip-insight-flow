import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const SubmissionConfirmation = () => {
  const navigate = useNavigate();
  const submissionDate = new Date().toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title="Submission Confirmation" 
        subtitle="Facility XYZ" 
        period="Q3 Draft"
      />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-success">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-success" />
              </div>
              <CardTitle className="text-2xl">Submission Successful</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted rounded-lg p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium text-foreground">Submission Date:</span>
                  <span className="text-muted-foreground">{submissionDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground">Status:</span>
                  <span className="text-primary font-semibold">Submitted</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground">Period:</span>
                  <span className="text-muted-foreground">Q3 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-foreground">Facility:</span>
                  <span className="text-muted-foreground">Facility XYZ</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="font-semibold text-foreground mb-2">Next Steps</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Your submission has been received by the Department of Health</li>
                  <li>You will receive a confirmation email shortly</li>
                  <li>You can view your submission history in the dashboard</li>
                  <li>The next reporting period begins in Q4</li>
                </ul>
              </div>

              <div className="pt-4">
                <Button onClick={() => navigate('/')} className="w-full" size="lg">
                  Back to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SubmissionConfirmation;
