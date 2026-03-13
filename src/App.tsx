import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import ForgotPassword from "./pages/ForgotPassword";
import Support from "./pages/Support";
import NewHired from "./pages/NewHired";
import DayPage from "./pages/DayPage";
import Assessment from "./pages/Assessment";
import FinalAssessment from "./pages/FinalAssessment";
import VideoPlayer from "./pages/VideoPlayer";
import SoftSkill from "./pages/SoftSkill";
import ProductTraining from "./pages/ProductTraining";
import OJT from "./pages/OJT";
import MonthlyPkt from "./pages/MonthlyPkt";

import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        

        {/* ================= USER ROUTES ================= */}

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <>
                <Home />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <>
                <Support />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/new-hired"
          element={
            <ProtectedRoute>
              <>
                <NewHired />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/new-hired/:dayId"
          element={
            <ProtectedRoute>
              <>
                <DayPage />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/video/:dayId/:topicId"
          element={
            <ProtectedRoute>
              <>
                <VideoPlayer />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/assessment/:dayId/:topicId"
          element={
            <ProtectedRoute>
              <>
                <Assessment />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/final-assessment/:dayId"
          element={
            <ProtectedRoute>
              <>
                <FinalAssessment />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/soft-skill"
          element={
            <ProtectedRoute>
              <>
                <SoftSkill />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/product-training"
          element={
            <ProtectedRoute>
              <>
                <ProductTraining />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ojt"
          element={
            <ProtectedRoute>
              <>
                <OJT />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />
        <Route
          path="/MonthlyPkt"
          element={
            <ProtectedRoute>
              <>
                <MonthlyPkt />
                <Footer />
              </>
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ROUTES ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        {/* ================= UNKNOWN ROUTE ================= */}

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;