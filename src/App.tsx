import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './users/AuthContext';
import ProtectedRoute from './users/ProtectedRoute';
import Login from './users/Login';
import Register from './users/Register';
import Dashboard from './pages/Dashboard';
import JobAllocationPage from './pages/JobAllocationPage';
import StaffPortal from './pages/StaffPortal';
import ITAdminPortal from './pages/ITAdminPortal';

// Navigation component that has access to auth context
const AppNav: React.FC = () => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-blue-600">
              Train Company
            </h1>
            
            {/* Role Badge */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Role:</span>
              <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-md text-sm font-medium capitalize">
                {currentUser?.role === 'itadmin' ? 'IT Admin' : currentUser?.role}
              </span>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-4">
              {currentUser?.role === 'manager' && (
                <>
                  <Link to="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link to="/allocate" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                    Job Allocation
                  </Link>
                </>
              )}
              {currentUser?.role === 'staff' && (
                <Link to="/staff" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  My Portal
                </Link>
              )}
              {currentUser?.role === 'itadmin' && (
                <Link to="/admin" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  User Management
                </Link>
              )}
            </div>
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{currentUser?.name}</p>
              <p className="text-xs text-gray-500">{currentUser?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Main App Router Component
const AppRouter: React.FC = () => {
  const { isAuthenticated, currentUser } = useAuth();

  // Redirect to role-specific home page
  const getDefaultRoute = () => {
    if (!currentUser) return '/login';
    
    switch (currentUser.role) {
      case 'manager':
        return '/';
      case 'staff':
        return '/staff';
      case 'itadmin':
        return '/admin';
      default:
        return '/login';
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <AppNav />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to={getDefaultRoute()} replace /> : <Login />
        } />
        <Route path="/register" element={
          isAuthenticated ? <Navigate to={getDefaultRoute()} replace /> : <Register />
        } />

        {/* Protected Routes - Manager */}
        <Route path="/" element={
          <ProtectedRoute allowedRoles={['manager']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/allocate" element={
          <ProtectedRoute allowedRoles={['manager']}>
            <JobAllocationPage />
          </ProtectedRoute>
        } />

        {/* Protected Routes - Staff */}
        <Route path="/staff" element={
          <ProtectedRoute allowedRoles={['staff']}>
            <StaffPortal />
          </ProtectedRoute>
        } />

        {/* Protected Routes - IT Admin */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['itadmin']}>
            <ITAdminPortal />
          </ProtectedRoute>
        } />

        {/* Catch all - redirect to appropriate page */}
        <Route path="*" element={
          <Navigate to={isAuthenticated ? getDefaultRoute() : '/login'} replace />
        } />
      </Routes>
    </div>
  );
};

// Main App Component with Auth Provider
export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}