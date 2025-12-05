import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Trash2, Download } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useStudentAssignments } from "@/hooks/student/use-student-assignments";
import { format } from "date-fns";

export default function AssignmentSubmission() {
  const { id, assignmentId } = useParams();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [submissionStatus, setSubmissionStatus] = useState<"none" | "submitted" | "graded">("none");
  const { assignments } = useStudentAssignments();

  const assignment = assignments.find(
    (a) => String(a.id) === assignmentId && a.courseCode === id
  );

  if(!assignment){
    return (
      <>
        {/* TODO: Lottie React 404 Page */}
      </>
    );
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedFiles([...uploadedFiles, ...Array.from(files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    setSubmissionStatus("submitted");
  };

  const getStatusColor = (status: typeof submissionStatus) => {
    switch (status) {
      case "none":
        return "bg-muted text-muted-foreground";
      case "submitted":
        return "bg-primary/10 text-primary";
      case "graded":
        return "bg-accent/10 text-accent-foreground";
    }
  };

  const getStatusText = (status: typeof submissionStatus) => {
    switch (status) {
      case "none":
        return "No submission";
      case "submitted":
        return "Submitted";
      case "graded":
        return "Graded";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column - Assignment content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-3">
                {assignment.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>{assignment.uploader}</span>
                <span>•</span>
                <span>Posted {format(new Date(Number((assignment as any).uploaded_at) || (assignment as any).uploaded_at), "MMM d, yyyy")}</span>
                <span>•</span>
                <span className="text-primary font-medium">Due {format(new Date(Number((assignment as any).deadline_at) || (assignment as any).deadline_at), "yyyy-MM-dd")}</span>
              </div>
            </div>
            {/* Description */}
            <Card className="p-6">
              <div 
                className="prose prose-sm max-w-none text-foreground"
                dangerouslySetInnerHTML={{ __html: (assignment as any).description ?? "" }}
              />
            </Card>
            {/* Attached Files (always rendered) */}
            {assignment.attached_files && assignment.attached_files.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Attached Files</h3>
                <div className="space-y-3">
                  {assignment.attached_files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium text-gray-800">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {file.type} • {file.size}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

          </div>

          {/* Right column - Submission box */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Your Work</h3>
                <Badge className={getStatusColor(submissionStatus)}>
                  {getStatusText(submissionStatus)}
                </Badge>
              </div>

              {submissionStatus !== "submitted" && submissionStatus !== "graded" && (
                <>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 mb-4 text-center hover:border-primary transition-colors cursor-pointer">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      multiple
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium text-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX, ZIP (max 10MB)</p>
                    </label>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary" />
                            <span className="text-sm text-foreground">{file.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      onClick={handleSubmit}
                      disabled={uploadedFiles.length === 0}
                    >
                      Submit
                    </Button>
                  </div>
                </>
              )}

              {(submissionStatus === "submitted" || submissionStatus === "graded") && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Submitted files:</p>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                          <FileText className="w-4 h-4 text-primary" />
                          <span className="text-sm text-foreground">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Submitted on {new Date().toLocaleDateString()}
                  </p>
                </div>
              )}
            </Card>

            {/* TODO: replace with "Submission" Type Entity */}
            {(assignment as any).grade && submissionStatus === "graded" && (
              <Card className="p-6 border-accent">
                <h3 className="font-semibold text-foreground mb-3">Grade</h3>
                <div className="text-3xl font-bold text-primary mb-3">
                  {(assignment as any).grade.value}
                </div>
                <div className="text-sm text-foreground">
                  <p className="font-medium mb-1">Feedback:</p>
                  <p className="text-muted-foreground">{(assignment as any).grade.feedback}</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
