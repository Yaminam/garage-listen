import { createBrowserRouter, Navigate } from "react-router";
import { AuthLayout } from "./layouts/AuthLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { NotFoundPage } from "./pages/NotFoundPage";

// Auth pages
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/auth/ResetPasswordPage";
import { EmailVerificationPage } from "./pages/auth/EmailVerificationPage";

// Onboarding
import { OnboardingPage } from "./pages/onboarding/OnboardingPage";

// Dashboard pages
import { DashboardHome } from "./pages/dashboard/DashboardHome";
import { SocialListeningPage } from "./pages/dashboard/SocialListeningPage";
import { SentimentAnalyticsPage } from "./pages/dashboard/SentimentAnalyticsPage";
import { CompetitorMonitoringPage } from "./pages/dashboard/CompetitorMonitoringPage";
import { TrendDiscoveryPage } from "./pages/dashboard/TrendDiscoveryPage";
import { AlertsCrisisPage } from "./pages/dashboard/AlertsCrisisPage";
import { ReportBuilderPage } from "./pages/dashboard/ReportBuilderPage";
import { SettingsPage } from "./pages/dashboard/SettingsPage";
import { UnifiedInboxPage } from "./pages/dashboard/UnifiedInboxPage";
import { AIChatPage } from "./pages/dashboard/AIChatPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth/login" replace />,
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
      { path: "verify-email", element: <EmailVerificationPage /> },
    ],
  },
  {
    path: "/onboarding",
    element: (
      <ProtectedRoute>
        <OnboardingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "listening", element: <SocialListeningPage /> },
      { path: "inbox", element: <UnifiedInboxPage /> },
      { path: "sentiment", element: <SentimentAnalyticsPage /> },
      { path: "competitors", element: <CompetitorMonitoringPage /> },
      { path: "trends", element: <TrendDiscoveryPage /> },
      { path: "alerts", element: <AlertsCrisisPage /> },
      { path: "reports", element: <ReportBuilderPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "ask-ai", element: <AIChatPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
