import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "@/pages/student/calendar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import StudentLayout from "./layouts/student/StudentLayout";
import { StudentProfile } from "./pages/student/profile";
import LoginPage from "./pages/user/login";
import SignupPage from "./pages/user/signup";
import AuthProvider from "./providers/AuthProvider";
import Group from "./pages/student/group";
import ModalProvider from "./providers/ModalProvider";
import Dashboard from "./pages/student/dashboard";
import { CoursePage } from "./pages/student/course-page";
import AllCourses from "./pages/student/all-courses";
import Materials from "./pages/student/materials";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route element={<StudentLayout />}>
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/profile" element={<StudentProfile />} />
                <Route path="/groups/:id" element={<Group />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/courses" element={<AllCourses />} />
                <Route path="/course/:id" element={<CoursePage />} />
                <Route
                  path="/materials/:id/:category"
                  element={<Materials />}
                />
              </Route>
            </Routes>
            <Toaster position="top-center" />
          </BrowserRouter>
        </ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
