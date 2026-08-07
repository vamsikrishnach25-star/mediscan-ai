import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";

import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import About from "./pages/About";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import AIScan from "./pages/AIScan";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Compare from "./pages/Compare";

function App() {

  // 🔥 Keep Render backend awake — ping every 14 minutes
  useEffect(() => {
    const keepAlive = setInterval(() => {
      fetch("https://mediscan-ai-backend-5ele.onrender.com/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "ping@ping.com", password: "ping" })
      }).catch(() => {});
    }, 14 * 60 * 1000);

    return () => clearInterval(keepAlive);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public Landing Page */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* AUTH ROUTES */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* PROTECTED APP ROUTES */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ai-scan" element={<AIScan />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/compare" element={<Compare />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;