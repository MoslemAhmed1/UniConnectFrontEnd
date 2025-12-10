import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@uploadthing/react/styles.css";
import "./main.css";

import Calendar from "@/pages/student/calendar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import GlobalLayout from "./layouts/GlobalLayout";
import CreateAdminPage from "./pages/admin/CreateAdminPage";
import MyStudentCourses from "./pages/student/my-courses";
import { MyInstructorCourses } from "./pages/instructor/my-courses";
import { StudentCoursePage } from "./pages/student/student-course-page";
import { InstructorCoursePage } from "./pages/instructor/instructor-course-page";
import AssignmentSubmission from "./components/common/course/assignments/AssignmentSubmission";
import AssignmentSubmissionProfessor from "./components/common/course/assignments/AssignmentSubmissionProfessor";
import Dashboard from "./pages/student/dashboard";
import Group from "./pages/student/group";
import Materials from "./pages/student/materials";
import { ProfilePage } from "./pages/profile";
import { MaterialViewer } from "./pages/student/material-viewer";
import LoginPage from "./pages/user/login";
import SignupPage from "./pages/user/signup";
import AuthProvider from "./providers/AuthProvider";
import ModalProvider from "./providers/ModalProvider";
import { AuthGuard } from "./components/guards/AuthGuard";
import { ClassMembers } from "./pages/student/class-members";
import { Unauthorized } from "./pages/Unauthorized";
import { UnAuthGuard } from "./components/guards/UnAuthGuard";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<UnAuthGuard />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </Route>

              <Route element={<GlobalLayout />}>
                <Route
                  element={
                    <AuthGuard
                      allowedRoles={[
                        "student",
                        "class_representative",
                        "course_head",
                      ]}
                    />
                  }
                >
                  <Route path="/student">
                    <Route path="calendar" element={<Calendar />} />
                    <Route path="groups/:id" element={<Group />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="courses" element={<MyStudentCourses />} />
                    <Route path="courses/:id" element={<StudentCoursePage />} />
                    <Route
                      path="courses/:id/assignment/:assignmentId"
                      element={<AssignmentSubmission />}
                    />
                    <Route
                      path="materials/:id/:category"
                      element={<Materials />}
                    />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route
                      element={
                        <AuthGuard allowedRoles={["class_representative"]} />
                      }
                    >
                      <Route path="members" element={<ClassMembers />} />
                    </Route>
                  </Route>
                </Route>

                <Route element={<AuthGuard allowedRoles={["professor/ta"]} />}>
                  <Route path="/instructor">
                    <Route path="profile" element={<ProfilePage />} />
                    <Route
                      path="courses/:id"
                      element={<InstructorCoursePage />}
                    />
                    <Route path="courses" element={<MyInstructorCourses />} />
                    <Route
                      path="courses/:id/assignment/:assignmentId"
                      element={<AssignmentSubmissionProfessor />}
                    />
                    <Route
                      path="materials/:id/:category"
                      element={<Materials />}
                    />
                    <Route
                      path="materials/view/:id"
                      element={<MaterialViewer />}
                    />
                  </Route>
                </Route>
              </Route>
              <Route path="/admin">
                <Route path="create" element={<CreateAdminPage />} />
              </Route>
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
            <Toaster position="top-center" />
          </BrowserRouter>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
