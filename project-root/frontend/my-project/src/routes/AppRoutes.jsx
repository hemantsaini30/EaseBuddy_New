import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";
import SubjectPage from "../pages/SubjectPage";
import ChapterDetails from "../pages/ChapterDetails";
import NotFound from "../pages/NotFound";
import MockTest from "../pages/MockTest";
import BookChapters from "../pages/BookChapters";  // NEW IMPORT
import PerformanceDashboard from "../pages/PerformanceDashboard";
import BookmarksPage from "../pages/Bookmarks";
import MistakeBook from "../pages/MistakeBook";

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Redirect root to dashboard */}
    <Route path="/" element={<Navigate to="/dashboard" replace />} />

    {/* Protected routes */}
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/subject/:subjectId" element={<ProtectedRoute><SubjectPage /></ProtectedRoute>} />
    <Route path="/subject/:subjectId/book/:bookId" element={<ProtectedRoute><BookChapters /></ProtectedRoute>}/>
    <Route path="/chapter/:slug" element={<ProtectedRoute><ChapterDetails /></ProtectedRoute>} />

    <Route path="/mock-test" element={<ProtectedRoute><MockTest /></ProtectedRoute>} />
    <Route path="/performance" element={<PerformanceDashboard />} />
    <Route path="/bookmarks" element={<ProtectedRoute><BookmarksPage /></ProtectedRoute>}/>
    <Route path="/mistakes" element={<ProtectedRoute><MistakeBook /></ProtectedRoute>}/>

    {/* 404 */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
