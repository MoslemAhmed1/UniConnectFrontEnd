import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";

import Calendar from "@/pages/student/calendar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import StudentLayout from "./layouts/student/StudentLayout";
import CreateAdminPage from "./pages/admin/CreateAdminPage";
import AllCourses from "./pages/student/all-courses";
import { CoursePage } from "./pages/student/course-page";
import Dashboard from "./pages/student/dashboard";
import Group from "./pages/student/group";
import Materials from "./pages/student/materials";
import { StudentProfile } from "./pages/student/profile";
import LoginPage from "./pages/user/login";
import SignupPage from "./pages/user/signup";
import AuthProvider from "./providers/AuthProvider";
import ModalProvider from "./providers/ModalProvider";
import { AuthGuard } from "./components/guards/AuthGuard";
import { ClassMembers } from "./pages/student/class-members";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

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
                <Route path="/student" element={<StudentLayout />}>
                  <Route path="calendar" element={<Calendar />} />
                  <Route path="groups/:id" element={<Group />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="courses" element={<AllCourses />} />
                  <Route
                    path="materials/:id/:category"
                    element={<Materials />}
                  />
                  <Route path="profile" element={<StudentProfile />} />
                  <Route
                    element={
                      <AuthGuard allowedRoles={["class_representative"]} />
                    }
                  >
                    <Route path="members" element={<ClassMembers />} />
                  </Route>
                </Route>
              </Route>

              <Route path="course/:id" element={<CoursePage />} />
              <Route path="/admin">
                <Route path="create" element={<CreateAdminPage />} />
              </Route>
            </Routes>
            <Toaster position="top-center" />
          </BrowserRouter>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
