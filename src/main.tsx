import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";

import { BrowserRouter, Routes, Route } from "react-router";
import LoginForm from "./components/forms/LoginForm";
import Calendar from "@/pages/student/calendar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StudentLayout from "./layouts/student/StudentLayout";
import AuthProvider from "./providers/AuthProvider";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route element={<StudentLayout />}>
              <Route path="/calendar" element={<Calendar />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
