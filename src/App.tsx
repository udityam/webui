import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ModulePage from "./pages/ModulePage";
import CreateUser from "@/components/CreateUser";
import { AppLayout } from "./components/layout/AppLayout";
import { ALL_ROUTES } from "./lib/nav";

const queryClient = new QueryClient();

const overrides: Record<string, React.ComponentType> = {
  "/console/dashboard": Dashboard,
  "/audit/dashboard": Dashboard,
  "/pam/dashboard": Dashboard,
  "/workbench/home": Dashboard,
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
        <Route
  path="/"
  element={
    (
      sessionStorage.getItem("isLoggedIn") === "true" ||
      !!sessionStorage.getItem("token") ||
      !!localStorage.getItem("token")
    )
      ? <Navigate to="/console/dashboard" replace />
      : <Navigate to="/login" replace />
  }
/>
          <Route path="/login" element={<Login />} />
          <Route element={<AppLayout />}>
          <Route
  path="/console/users/create"
  element={<CreateUser />}
/>
            {ALL_ROUTES.map((r) => {
               const Cmp = overrides[r.url] ?? ModulePage;

                return (
      <Route
        key={r.url}
        path={r.url}
        element={
  (
    sessionStorage.getItem("isLoggedIn") === "true" ||
    !!sessionStorage.getItem("token") ||
    !!localStorage.getItem("token")
  )
    ? <Cmp />
    : <Navigate to="/login" replace />
}
      />
    );
  })}
</Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
