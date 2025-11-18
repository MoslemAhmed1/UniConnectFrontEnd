import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";

import Calendar from "@/pages/student/calendar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import StudentLayout from "./layouts/student/StudentLayout";
import { StudentProfile } from "./pages/student/profile";
import LoginPage from "./pages/user/login";
import SignupPage from "./pages/user/signup";
import AuthProvider from "./providers/AuthProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<StudentLayout />}>
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/profile" element={<StudentProfile />} />
            </Route>
          </Routes>
          <Toaster position="top-center" />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
