import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronLeft, FileText, Download, Eye, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useStudentAssignments } from "@/hooks/student/use-student-assignments";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const AssignmentSubmissionProfessor = () => {
  const { id, assignmentId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null);
  const { assignments } = useStudentAssignments();

  const assignment = assignments.find(
    (a) => String(a.id) === assignmentId
  );

  if(!assignment){
    return (
      <>
        {/* TODO: Lottie React 404 Page */}
      </>
    );
  }

  const [grades, setGrades] = useState<Record<number, { grade: string; feedback: string }>>({});

  const handleGradeSubmission = (submissionId: number) => {
    const gradeData = grades[submissionId];
    if (gradeData) {
      console.log("Grading submission", submissionId, gradeData);
      setSelectedSubmission(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-start justify-between">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-3">
                {assignment.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>{(assignment.assigner?.first_name ?? "") + (assignment.assigner?.parent_name ?? "")}</span>
                <span>•</span>
                <span>Posted {format(new Date(Number((assignment as any).uploaded_at) || (assignment as any).uploaded_at), "MMM d, yyyy")}</span>
                <span>•</span>
                <span className="text-primary font-medium">Due {format(new Date(Number((assignment as any).deadline_at) || (assignment as any).deadline_at), "yyyy-MM-dd")}</span>
              </div>
            </div>
            {/* View Submissions */}
            <Button>
              <Users className="w-4 h-4 mr-2" />
              View Submissions (3)
            </Button>
            {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  View Submissions ({submissions.length})
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Student Submissions</DialogTitle>
                  <DialogDescription>
                    Review and grade student submissions for this assignment
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4">
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <Card key={submission.id} className="p-4">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-10 h-10 bg-linear-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold shrink-0">
                            {submission.avatar}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{submission.studentName}</h4>
                            <p className="text-sm text-muted-foreground">Submitted {submission.submittedAt}</p>
                          </div>
                          {submission.grade && (
                            <Badge className="bg-accent/10 text-accent-foreground">
                              {submission.grade}
                            </Badge>
                          )}
                        </div>

                        <div className="space-y-2 mb-4">
                          <p className="text-sm font-medium text-foreground">Files:</p>
                          {submission.files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-primary" />
                                <span className="text-sm">{file.name}</span>
                                <span className="text-xs text-muted-foreground">({file.size})</span>
                              </div>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {submission.grade ? (
                          <div className="p-3 bg-accent/5 rounded border border-accent/20">
                            <p className="text-sm font-medium text-foreground mb-1">Grade: {submission.grade}</p>
                            <p className="text-sm text-muted-foreground">{submission.feedback}</p>
                          </div>
                        ) : (
                          <>
                            {selectedSubmission === submission.id ? (
                              <div className="space-y-3 pt-3 border-t">
                                <div>
                                  <Label htmlFor={`grade-${submission.id}`}>Grade</Label>
                                  <Input
                                    id={`grade-${submission.id}`}
                                    placeholder="e.g., 95/100 or A+"
                                    value={grades[submission.id]?.grade || ""}
                                    onChange={(e) =>
                                      setGrades({
                                        ...grades,
                                        [submission.id]: {
                                          ...grades[submission.id],
                                          grade: e.target.value,
                                        },
                                      })
                                    }
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`feedback-${submission.id}`}>Feedback (optional)</Label>
                                  <Textarea
                                    id={`feedback-${submission.id}`}
                                    placeholder="Provide feedback to the student..."
                                    value={grades[submission.id]?.feedback || ""}
                                    onChange={(e) =>
                                      setGrades({
                                        ...grades,
                                        [submission.id]: {
                                          ...grades[submission.id],
                                          feedback: e.target.value,
                                        },
                                      })
                                    }
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleGradeSubmission(submission.id)}
                                    disabled={!grades[submission.id]?.grade}
                                  >
                                    Submit Grade
                                  </Button>
                                  <Button
                                    variant="outline"
                                    onClick={() => setSelectedSubmission(null)}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => setSelectedSubmission(submission.id)}
                              >
                                Assign Grade
                              </Button>
                            )}
                          </>
                        )}
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog> */}
          </div>

          {/* Description */}
          <Card className="p-6">
            <div 
              className="prose prose-sm max-w-none text-foreground"
              dangerouslySetInnerHTML={{ __html: (assignment as any).description ?? "" }}
            />
          </Card>
          
          {/* Attached Files */}
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Attached Files</h3>
            <div className="space-y-3">
              {/* TODO: List attached files here */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmissionProfessor;
