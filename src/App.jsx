// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import WaitlistDashboard from './pages/WaitlistDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import ResetPassword from './pages/ResetPassword';
import { AuthService } from './lib/auth';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const isAuth = await AuthService.checkAuth();
    setIsAuthenticated(isAuth);
    setChecking(false);
  };

  if (checking) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f8f9fa',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid #e9ecef',
            borderTopColor: '#00B894',
            borderRadius: '50%',
            margin: '0 auto 20px',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ color: '#6c757d', fontSize: '16px', fontWeight: 500 }}>Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

// Public Route (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const isAuth = await AuthService.checkAuth();
    setIsAuthenticated(isAuth);
    setChecking(false);
  };

  if (checking) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#f8f9fa',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #e9ecef',
            borderTopColor: '#00B894',
            borderRadius: '50%',
            margin: '0 auto 15px',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Navigate to="/admin/waitlist" /> : children;
};

function App() {
  useEffect(() => {
    // Add Font Awesome
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    document.head.appendChild(link);

    // Add Google Fonts
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Initialize global styles
    const initGlobalStyles = () => {
      const style = document.createElement('style');
      style.textContent = `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background-color: #ffffff;
          color: #333333;
        }

        /* Animation keyframes */
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: #00B894;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #009975;
        }

        /* Selection color */
        ::selection {
          background: rgba(0, 184, 148, 0.2);
          color: #333333;
        }

        /* Focus styles */
        :focus {
          outline: 2px solid #00B894;
          outline-offset: 2px;
        }

        :focus:not(:focus-visible) {
          outline: none;
        }

        /* Responsive utilities */
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none !important;
          }
        }

        @media (min-width: 769px) {
          .hide-on-desktop {
            display: none !important;
          }
        }

        /* Smooth transitions */
        .page-transition-enter {
          opacity: 0;
          transform: translateY(20px);
        }

        .page-transition-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 300ms, transform 300ms;
        }

        .page-transition-exit {
          opacity: 1;
          transform: translateY(0);
        }

        .page-transition-exit-active {
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 300ms, transform 300ms;
        }

        /* Utility classes */
        .shadow-sm {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .shadow-md {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .shadow-lg {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .shadow-xl {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .rounded-sm { border-radius: 4px; }
        .rounded-md { border-radius: 8px; }
        .rounded-lg { border-radius: 12px; }
        .rounded-xl { border-radius: 16px; }
        .rounded-2xl { border-radius: 24px; }

        .text-primary { color: #00B894; }
        .text-secondary { color: #6c757d; }
        .text-success { color: #28a745; }
        .text-danger { color: #dc3545; }
        .text-warning { color: #ffc107; }
        .text-info { color: #17a2b8; }

        .bg-primary { background-color: #00B894; }
        .bg-secondary { background-color: #6c757d; }
        .bg-success { background-color: #28a745; }
        .bg-danger { background-color: #dc3545; }
        .bg-warning { background-color: #ffc107; }
        .bg-info { background-color: #17a2b8; }
        .bg-light { background-color: #f8f9fa; }
        .bg-white { background-color: #ffffff; }

        .border-primary { border-color: #00B894; }
        .border-light { border-color: #e9ecef; }
        .border-gray { border-color: #dee2e6; }

        .font-semibold { font-weight: 600; }
        .font-bold { font-weight: 700; }
        .font-extrabold { font-weight: 800; }

        .text-xs { font-size: 12px; }
        .text-sm { font-size: 14px; }
        .text-base { font-size: 16px; }
        .text-lg { font-size: 18px; }
        .text-xl { font-size: 20px; }
        .text-2xl { font-size: 24px; }
        .text-3xl { font-size: 30px; }
        .text-4xl { font-size: 36px; }

        .transition-all {
          transition: all 0.3s ease;
        }
      `;
      document.head.appendChild(style);
    };

    initGlobalStyles();

    // Console welcome
    console.log('%c🚀 EazyHire Admin System 🚀', 'color: #00B894; font-size: 16px; font-weight: bold;');
    console.log('%cSecure professional management portal', 'color: #6c757d; font-size: 12px;');

  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Auth routes */}
        <Route path="/admin/login" element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        } />
        
        <Route path="/admin/register" element={
          <PublicRoute>
            <AdminRegister />
          </PublicRoute>
        } />
        
        <Route path="/admin/reset-password" element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        } />
        
        {/* Protected routes */}
        <Route path="/admin/waitlist" element={
          <ProtectedRoute>
            <WaitlistDashboard />
          </ProtectedRoute>
        } />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;