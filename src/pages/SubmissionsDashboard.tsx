import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RoleSelector } from '@/components/submission/RoleSelector';
import { StatusBadge } from '@/components/submission/StatusBadge';
import { CreateSubmissionDialog } from '@/components/submission/CreateSubmissionDialog';
import { UserRole } from '@/types/submission';
import { mockSubmissions, facilities, quarters } from '@/data/submissionMockData';
import { Plus, Eye, History, FileText } from 'lucide-react';
import { toast } from 'sonner';

const SubmissionsDashboard = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>('reviewer');
  const [selectedFacility, setSelectedFacility] = useState<string>('all');
  const [selectedQuarter, setSelectedQuarter] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [submissions, setSubmissions] = useState(mockSubmissions);

  const filteredSubmissions = submissions.filter((sub) => {
    const facilityMatch = selectedFacility === 'all' || sub.facilityId === selectedFacility;
    const quarterMatch = selectedQuarter === 'all' || sub.quarter === selectedQuarter;
    return facilityMatch && quarterMatch;
  });

  const handleCreateSubmission = (facilityId: string, quarter: string) => {
    const facility = facilities.find((f) => f.id === facilityId);
    const newSubmission = {
      id: `SUB${String(submissions.length + 1).padStart(3, '0')}`,
      facilityId,
      facilityName: facility?.name || '',
      quarter,
      status: 'draft' as const,
      createdBy: 'Current User',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      completeness: 0,
      totalQuestions: 98,
      answeredQuestions: 0,
      errorCount: 0,
      warningCount: 0,
    };
    setSubmissions([newSubmission, ...submissions]);
    setIsCreateDialogOpen(false);
    toast.success('Submission created successfully');
    navigate(`/submissions/${newSubmission.id}`);
  };

  const handleOpenSubmission = (id: string) => {
    navigate(`/submissions/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Submissions Dashboard"
        subtitle="NQIP Quality Indicators"
        period=""
      />

      <main className="container mx-auto px-6 py-8">
        {/* Filters Row */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <RoleSelector role={role} onRoleChange={setRole} />
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Facility:</span>
                  <Select value={selectedFacility} onValueChange={setSelectedFacility}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="All facilities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Facilities</SelectItem>
                      {facilities.map((facility) => (
                        <SelectItem key={facility.id} value={facility.id}>
                          {facility.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Quarter:</span>
                  <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All quarters" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Quarters</SelectItem>
                      {quarters.map((q) => (
                        <SelectItem key={q.id} value={q.id}>
                          {q.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Create New Submission
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Submissions Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Your Submissions
            </CardTitle>
            <CardDescription>
              {filteredSubmissions.length} submission{filteredSubmissions.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Facility</TableHead>
                  <TableHead>Quarter</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Completeness</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{submission.facilityName}</div>
                        <div className="text-xs text-muted-foreground">{submission.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>{submission.quarter}</TableCell>
                    <TableCell>
                      <StatusBadge status={submission.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${submission.completeness}%` }}
                          />
                        </div>
                        <span className="text-sm">{submission.completeness}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {submission.lastUpdated}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenSubmission(submission.id)}
                          className="gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          Open
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <History className="h-4 w-4" />
                          History
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSubmissions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No submissions found. Create a new submission to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <CreateSubmissionDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateSubmission={handleCreateSubmission}
      />
    </div>
  );
};

export default SubmissionsDashboard;
