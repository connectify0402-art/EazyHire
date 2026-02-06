// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthService } from '../lib/auth';
import { Key, Mail, Lock, ArrowLeft, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState('request'); // 'request' or 'reset'
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check if we have a reset token in URL
  const resetToken = searchParams.get('token');

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
    return Object.values(requirements).every(req => req);
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    
    setLoading(true);
    setErrors({});

    try {
      await AuthService.resetPassword(email);
      setSuccess(true);
      
      // Show success for 3 seconds then redirect
      setTimeout(() => {
        setStep('checkEmail');
      }, 3000);
      
    } catch (error) {
      console.error('Reset request error:', error);
      setErrors({ general: 'Failed to send reset email. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    setErrors({});

    try {
      await AuthService.updatePassword(password);
      setSuccess(true);
      
      // Redirect to login after delay
      setTimeout(() => {
        navigate('/admin/login');
      }, 3000);
      
    } catch (error) {
      console.error('Password reset error:', error);
      setErrors({ general: 'Failed to reset password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // If we have a token, show reset form
  React.useEffect(() => {
    if (resetToken) {
      setStep('reset');
    }
  }, [resetToken]);

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
      {/* Back button */}
      <Link to="/admin/login" style={{
        position: 'absolute',
        top: '30px',
        left: '30px',
        color: '#6c757d',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        zIndex: 10,
        fontWeight: 500,
        fontSize: '14px',
        transition: 'color 0.3s ease',
      }} onMouseEnter={(e) => e.target.style.color = '#00B894'}>
        <ArrowLeft size={18} />
        Back to Login
      </Link>

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
        {success && (
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
              {step === 'request' ? 'Email Sent!' : 'Password Reset!'}
            </h3>
            <p style={{
              color: '#6c757d',
              fontSize: '16px',
              textAlign: 'center',
              marginBottom: '30px',
            }}>
              {step === 'request' 
                ? 'Check your email for password reset instructions.'
                : 'Your password has been successfully reset.'}
            </p>
            <p style={{
              color: '#00B894',
              fontSize: '14px',
              fontWeight: 500,
            }}>
              {step === 'request' 
                ? 'Redirecting...'
                : 'Redirecting to login...'}
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
            <Key size={32} color="#ffffff" />
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#333333',
            marginBottom: '10px',
          }}>
            {step === 'request' ? 'Reset Password' : 'Set New Password'}
          </h1>
          <p style={{
            color: '#6c757d',
            fontSize: '16px',
            lineHeight: 1.5,
          }}>
            {step === 'request' 
              ? 'Enter your email to receive reset instructions'
              : 'Create a new password for your account'}
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

        {step === 'checkEmail' ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: '#00B89410',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 30px',
            }}>
              <Mail size={48} color="#00B894" />
            </div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 700,
              color: '#333333',
              marginBottom: '15px',
            }}>
              Check Your Email
            </h3>
            <p style={{
              color: '#6c757d',
              fontSize: '16px',
              lineHeight: 1.6,
              marginBottom: '30px',
            }}>
              We've sent password reset instructions to:<br />
              <strong>{email}</strong>
            </p>
            <p style={{
              color: '#6c757d',
              fontSize: '14px',
              fontStyle: 'italic',
            }}>
              Didn't receive the email? Check your spam folder or try again.
            </p>
          </div>
        ) : step === 'request' ? (
          <form onSubmit={handleRequestReset}>
            {/* Email field */}
            <div style={{ marginBottom: '30px' }}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
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
                  Sending...
                </>
              ) : (
                <>
                  <Key size={20} />
                  Send Reset Instructions
                </>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            {/* New Password field */}
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: 600,
                color: '#333333',
                fontSize: '14px',
              }}>
                New Password
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
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
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

            {/* Confirm Password field */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontWeight: 600,
                color: '#333333',
                fontSize: '14px',
              }}>
                Confirm New Password
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
                  <Lock size={20} />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '16px 50px 16px 50px',
                    border: `2px solid ${errors.confirmPassword ? '#dc3545' : '#e9ecef'}`,
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p style={{
                  color: '#dc3545',
                  fontSize: '13px',
                  marginTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <AlertCircle size={14} />
                  {errors.confirmPassword}
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
                  Resetting...
                </>
              ) : (
                <>
                  <Key size={20} />
                  Reset Password
                </>
              )}
            </button>
          </form>
        )}

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
            <Key size={16} color="#00B894" />
            <span style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#00B894',
            }}>
              Password Requirements
            </span>
          </div>
          <p style={{
            color: '#6c757d',
            fontSize: '12px',
            lineHeight: 1.5,
          }}>
            • At least 8 characters<br />
            • Uppercase and lowercase letters<br />
            • At least one number<br />
            • At least one special character
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

export default ResetPassword;