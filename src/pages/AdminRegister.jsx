// src/pages/AdminRegister.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../lib/auth';
import { UserPlus, Mail, Lock, Shield, Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  // Password strength requirements
  const passwordRequirements = [
    { id: 1, text: 'At least 8 characters', regex: /.{8,}/ },
    { id: 2, text: 'Contains uppercase letter', regex: /[A-Z]/ },
    { id: 3, text: 'Contains lowercase letter', regex: /[a-z]/ },
    { id: 4, text: 'Contains number', regex: /[0-9]/ },
    { id: 5, text: 'Contains special character', regex: /[!@#$%^&*(),.?":{}|<>]/ }
  ];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return passwordRequirements.map(req => ({
      ...req,
      met: req.regex.test(password)
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
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
      const checks = validatePassword(formData.password);
      const unmet = checks.filter(check => !check.met);
      if (unmet.length > 0) {
        newErrors.password = 'Password does not meet all requirements';
      }
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.adminCode) {
      newErrors.adminCode = 'Admin registration code is required';
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
      await AuthService.registerAdmin(formData.email, formData.password, formData.adminCode);
      
      // Show success message
      setRegistrationSuccess(true);
      
      // Redirect to login after delay
      setTimeout(() => {
        navigate('/admin/login');
      }, 3000);
      
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.message.includes('Invalid admin registration code')) {
        setErrors({ adminCode: 'Invalid admin registration code' });
      } else if (error.message.includes('already registered')) {
        setErrors({ email: 'This email is already registered' });
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const passwordChecks = validatePassword(formData.password);
  const passwordStrength = passwordChecks.filter(check => check.met).length;

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
        maxWidth: '520px',
        background: '#ffffff',
        borderRadius: '24px',
        padding: '50px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
        position: 'relative',
        zIndex: 10,
        border: '1px solid rgba(0, 0, 0, 0.05)',
      }}>
        {/* Success overlay */}
        {registrationSuccess && (
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
              Registration Successful!
            </h3>
            <p style={{
              color: '#6c757d',
              fontSize: '16px',
              textAlign: 'center',
              marginBottom: '30px',
            }}>
              Please check your email to confirm your account.
            </p>
            <p style={{
              color: '#00B894',
              fontSize: '14px',
              fontWeight: 500,
            }}>
              Redirecting to login page...
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
            <UserPlus size={32} color="#ffffff" />
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            color: '#333333',
            marginBottom: '10px',
          }}>
            Admin Registration
          </h1>
          <p style={{
            color: '#6c757d',
            fontSize: '16px',
            lineHeight: 1.5,
          }}>
            Create a new administrator account
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
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: 600,
              color: '#333333',
              fontSize: '14px',
            }}>
              Password
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
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

            {/* Password strength indicator */}
            {formData.password && (
              <div style={{ marginTop: '15px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '10px',
                }}>
                  <span style={{
                    fontSize: '13px',
                    color: '#6c757d',
                    fontWeight: 500,
                  }}>
                    Password strength:
                  </span>
                  <span style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: passwordStrength <= 2 ? '#dc3545' : 
                           passwordStrength <= 4 ? '#ffc107' : '#28a745',
                  }}>
                    {passwordStrength <= 2 ? 'Weak' : 
                     passwordStrength <= 4 ? 'Good' : 'Strong'}
                  </span>
                </div>
                <div style={{
                  height: '6px',
                  background: '#e9ecef',
                  borderRadius: '3px',
                  overflow: 'hidden',
                  marginBottom: '15px',
                }}>
                  <div style={{
                    width: `${(passwordStrength / 5) * 100}%`,
                    height: '100%',
                    background: passwordStrength <= 2 ? '#dc3545' : 
                               passwordStrength <= 4 ? '#ffc107' : '#28a745',
                    borderRadius: '3px',
                    transition: 'width 0.3s ease',
                  }}></div>
                </div>
                
                {/* Password requirements */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '10px',
                }}>
                  {passwordRequirements.map(req => (
                    <div key={req.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      <div style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: `2px solid ${req.met ? '#28a745' : '#e9ecef'}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {req.met && (
                          <div style={{
                            width: '8px',
                            height: '8px',
                            background: '#28a745',
                            borderRadius: '50%',
                          }}></div>
                        )}
                      </div>
                      <span style={{
                        fontSize: '12px',
                        color: req.met ? '#28a745' : '#6c757d',
                      }}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password field */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: 600,
              color: '#333333',
              fontSize: '14px',
            }}>
              Confirm Password
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
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
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

          {/* Admin Code field */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              marginBottom: '10px',
              fontWeight: 600,
              color: '#333333',
              fontSize: '14px',
            }}>
              Admin Registration Code
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
                <Shield size={20} />
              </div>
              <input
                type="text"
                name="adminCode"
                value={formData.adminCode}
                onChange={handleChange}
                placeholder="Enter admin registration code"
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '16px 16px 16px 50px',
                  border: `2px solid ${errors.adminCode ? '#dc3545' : '#e9ecef'}`,
                  borderRadius: '12px',
                  fontSize: '16px',
                  color: '#333333',
                  background: '#ffffff',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                }}
              />
            </div>
            {errors.adminCode && (
              <p style={{
                color: '#dc3545',
                fontSize: '13px',
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <AlertCircle size={14} />
                {errors.adminCode}
              </p>
            )}
            <p style={{
              color: '#6c757d',
              fontSize: '12px',
              marginTop: '8px',
              fontStyle: 'italic',
            }}>
              Contact system administrator for registration code
            </p>
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
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus size={20} />
                Create Admin Account
              </>
            )}
          </button>
        </form>

        {/* Login link */}
        <div style={{ textAlign: 'center' }}>
          <p style={{
            color: '#6c757d',
            fontSize: '15px',
            marginBottom: '15px',
          }}>
            Already have an account?
          </p>
          <Link 
            to="/admin/login"
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
            Sign In Instead
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
              Security Notice
            </span>
          </div>
          <p style={{
            color: '#6c757d',
            fontSize: '12px',
            lineHeight: 1.5,
          }}>
            Admin accounts have full access to the system. Keep your credentials secure and never share them.
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

export default AdminRegister;