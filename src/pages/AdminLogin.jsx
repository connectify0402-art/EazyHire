import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../lib/auth';
import { Lock, Mail, Shield, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    return requirements;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Validate password in real-time (passwordChecks variable removed since it's not used)
    if (name === 'password') {
      // You can add password validation UI updates here if needed
      validatePassword(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordChecks = validatePassword(formData.password);
      if (!Object.values(passwordChecks).every(check => check)) {
        newErrors.password = 'Password does not meet security requirements';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});

    try {
      await AuthService.loginAdmin(formData.email, formData.password);
      
      // Show success animation
      setLoginSuccess(true);
      
      // Redirect after delay
      setTimeout(() => {
        navigate('/admin/waitlist');
      }, 1500);
      
    } catch (error) {
      console.error('Login error:', error);
      
      // Handle specific error cases
      if (error.message.includes('Invalid login credentials')) {
        setErrors({ general: 'Invalid email or password. Please try again.' });
      } else if (error.message.includes('Email not confirmed')) {
        setErrors({ general: 'Please verify your email address before logging in.' });
      } else if (error.message.includes('Too many requests')) {
        setErrors({ general: 'Too many login attempts. Please try again later.' });
      } else {
        setErrors({ general: 'An error occurred. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      padding: '20px',
      position: 'relative',
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(#00B89422 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        opacity: 0.3,
      }}></div>

      {/* Main card */}
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: '#ffffff',
        borderRadius: '24px',
        padding: '50px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
        position: 'relative',
        zIndex: 10,
        border: '1px solid rgba(0, 0, 0, 0.05)',
      }}>
        {/* Success overlay */}
        {loginSuccess && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#ffffff',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 20,
            animation: 'fadeIn 0.3s ease-out',
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: '#00B894',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '25px',
              animation: 'scaleIn 0.5s ease-out',
            }}>
              <CheckCircle size={40} color="#ffffff" />
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#333333',
              marginBottom: '10px',
            }}>
              Login Successful
            </h3>
            <p style={{
              color: '#6c757d',
              fontSize: '16px',
            }}>
              Redirecting to dashboard...
            </p>
          </div>
        )}

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '70px',
            height: '70px',
            background: 'linear-gradient(135deg, #00B894 0%, #009975 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 25px',
            boxShadow: '0 10px 30px rgba(0, 184, 148, 0.2)',
          }}>
            <Shield size={32} color="#ffffff" />
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#333333',
            marginBottom: '10px',
          }}>
            Admin Login
          </h1>
          <p style={{
            color: '#6c757d',
            fontSize: '16px',
            lineHeight: 1.5,
          }}>
            Access your EazyHire management dashboard
          </p>
        </div>

        {/* Error message */}
        {errors.general && (
          <div style={{
            background: '#fee',
            border: '1px solid #fcc',
            color: '#c00',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '25px',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <AlertCircle size={20} />
            <span>{errors.general}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: 600,
              color: '#333333',
              fontSize: '14px',
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6c757d',
                zIndex: 1,
              }}>
                <Mail size={20} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@eazyhire.ng"
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 50px',
                  border: `2px solid ${errors.email ? '#dc3545' : '#e9ecef'}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  color: '#333333',
                  background: '#ffffff',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            {errors.email && (
              <p style={{
                color: '#dc3545',
                fontSize: '13px',
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <AlertCircle size={14} />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password field */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px',
            }}>
              <label style={{
                fontWeight: 600,
                color: '#333333',
                fontSize: '14px',
              }}>
                Password
              </label>
              <Link 
                to="/admin/reset-password"
                style={{
                  color: '#00B894',
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.color = '#009975'}
                onMouseLeave={(e) => e.target.style.color = '#00B894'}
              >
                Forgot password?
              </Link>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6c757d',
                zIndex: 1,
              }}>
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px 50px 16px 50px',
                  border: `2px solid ${errors.password ? '#dc3545' : '#e9ecef'}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  color: '#333333',
                  background: '#ffffff',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#6c757d',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p style={{
                color: '#dc3545',
                fontSize: '13px',
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <AlertCircle size={14} />
                {errors.password}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '18px',
              background: loading ? '#6c757d' : '#00B894',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '25px',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.background = '#009975';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px rgba(0, 184, 148, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.background = '#00B894';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  borderTopColor: '#ffffff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Signing In...
              </>
            ) : (
              <>
                <Lock size={20} />
                Sign In
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          margin: '30px 0',
        }}>
          <div style={{ flex: 1, height: '1px', background: '#e9ecef' }}></div>
          <span style={{
            padding: '0 15px',
            color: '#6c757d',
            fontSize: '14px',
            fontWeight: 500,
          }}>
            Don't have an account?
          </span>
          <div style={{ flex: 1, height: '1px', background: '#e9ecef' }}></div>
        </div>

        {/* Register link */}
        <div style={{ textAlign: 'center' }}>
          <Link 
            to="/admin/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 28px',
              background: '#f8f9fa',
              color: '#333333',
              border: '1px solid #e9ecef',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#e9ecef';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#f8f9fa';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <Shield size={18} />
            Register as Admin
          </Link>
        </div>

        {/* Security notice */}
        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: '#f8f9fa',
          borderRadius: '12px',
          border: '1px solid #e9ecef',
          textAlign: 'center',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '10px',
          }}>
            <Shield size={16} color="#00B894" />
            <span style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#00B894',
            }}>
              Security Information
            </span>
          </div>
          <p style={{
            color: '#6c757d',
            fontSize: '12px',
            lineHeight: 1.5,
          }}>
            Your login is secured with end-to-end encryption. Always ensure you're on the official EazyHire domain.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: '#6c757d',
        fontSize: '13px',
        textAlign: 'center',
        zIndex: 10,
      }}>
        <p>© {new Date().getFullYear()} EazyHire Admin Portal. All rights reserved.</p>
      </div>

      {/* Add animation styles */}
      <style data-jsx="true">{`
        @keyframes scaleIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        input:focus {
          outline: none;
          border-color: #00B894 !important;
          box-shadow: 0 0 0 3px rgba(0, 184, 148, 0.1);
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;