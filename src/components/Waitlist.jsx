import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const Waitlist = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        location: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const nigerianStates = [
        'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
        'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa',
        'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
        'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe',
        'Zamfara', 'Federal Capital Territory (Abuja)'
    ];

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError('Please enter your name');
            return false;
        }
        if (!validateEmail(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }
        if (!formData.location) {
            setError('Please select your state');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        setError('');

        try {
            // Check for duplicate email
            const { data: existing } = await supabase
                .from('waitlist')
                .select('email')
                .eq('email', formData.email.toLowerCase().trim())
                .single();

            if (existing) {
                setError('This email is already registered');
                setIsSubmitting(false);
                return;
            }

            // Insert into database
            const { error: insertError } = await supabase
                .from('waitlist')
                .insert([
                    {
                        name: formData.name.trim(),
                        email: formData.email.toLowerCase().trim(),
                        location: formData.location,
                        status: 'active',
                        created_at: new Date()
                    }
                ]);

            if (insertError) {
                if (insertError.code === '23505') { // Unique violation
                    setError('This email is already registered');
                } else {
                    throw insertError;
                }
                return;
            }

            // Success
            setShowSuccess(true);
            setFormData({ name: '', email: '', location: '' });
            
            // Analytics event (optional)
            if (window.gtag) {
                window.gtag('event', 'waitlist_signup', {
                    'event_category': 'engagement',
                    'event_label': 'waitlist'
                });
            }

            // Hide success after 5 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);

        } catch (error) {
            console.error('Error submitting form:', error);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        // Clear error when user starts typing
        if (error) setError('');
    };

    return (
        <section className="section waitlist" id="waitlist" style={{
            background: 'var(--gradient-primary)',
            color: 'var(--white)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            <div className="container">
                <div className="waitlist-container" style={{
                    maxWidth: '600px',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                }}>
                    <h2 className="waitlist-title" style={{
                        fontSize: '30px',
                        marginBottom: 'var(--space-lg)',
                    }}>
                        Be Among the First to Experience EazyHire
                    </h2>
                    <p className="waitlist-subtitle" style={{
                        fontSize: '18px',
                        marginBottom: 'var(--space-2xl)',
                        opacity: 0.9,
                    }}>
                        Join our waitlist and get exclusive early access when we launch. Plus, early members get special perks!
                    </p>
                    
                    {showSuccess ? (
                        <div className="success-message" style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: 'var(--radius-xl)',
                            padding: 'var(--space-xl)',
                            textAlign: 'center',
                            animation: 'slideIn 0.5s ease'
                        }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'var(--white)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto var(--space-lg)',
                                animation: 'scaleIn 0.5s ease'
                            }}>
                                <i className="fas fa-check" style={{ color: 'var(--primary)', fontSize: '36px' }}></i>
                            </div>
                            <h3 style={{ fontSize: '24px', marginBottom: 'var(--space-sm)' }}>Successfully Joined!</h3>
                            <p style={{ opacity: 0.9 }}>Thank you for joining our waitlist. We'll notify you when we launch!</p>
                            <p style={{ fontSize: '14px', marginTop: 'var(--space-md)', opacity: 0.7 }}>
                                Check your email for confirmation
                            </p>
                        </div>
                    ) : (
                        <form className="waitlist-form" onSubmit={handleSubmit} style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: 'var(--radius-xl)',
                            padding: 'var(--space-xl)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}>
                            {error && (
                                <div className="error-message" style={{
                                    background: 'rgba(255, 0, 0, 0.1)',
                                    border: '1px solid rgba(255, 0, 0, 0.3)',
                                    borderRadius: 'var(--radius-md)',
                                    padding: 'var(--space-md)',
                                    marginBottom: 'var(--space-lg)',
                                    textAlign: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                }}>
                                    <i className="fas fa-exclamation-circle"></i>
                                    <span>{error}</span>
                                </div>
                            )}
                            
                            <div className="form-group">
                                <label className="form-label" style={{
                                    display: 'block',
                                    marginBottom: 'var(--space-sm)',
                                    fontWeight: 500,
                                    fontSize: '16px',
                                    textAlign: 'left',
                                }}>Full Name *</label>
                                <input 
                                    type="text" 
                                    className="form-input"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name" 
                                    required
                                    disabled={isSubmitting}
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '2px solid rgba(255, 255, 255, 0.2)',
                                        color: 'var(--white)',
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease',
                                        opacity: isSubmitting ? 0.7 : 1,
                                    }}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Email Address *</label>
                                <input 
                                    type="email" 
                                    className="form-input"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com" 
                                    required
                                    disabled={isSubmitting}
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '2px solid rgba(255, 255, 255, 0.2)',
                                        color: 'var(--white)',
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease',
                                        opacity: isSubmitting ? 0.7 : 1,
                                    }}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">Location in Nigeria *</label>
                                <select 
                                    className="form-input"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    disabled={isSubmitting}
                                    style={{
                                        width: '100%',
                                        padding: '16px 20px',
                                        borderRadius: 'var(--radius-md)',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        border: '2px solid rgba(255, 255, 255, 0.2)',
                                        color: 'var(--white)',
                                        fontFamily: 'var(--font-body)',
                                        fontSize: '16px',
                                        transition: 'all 0.3s ease',
                                        opacity: isSubmitting ? 0.7 : 1,
                                    }}
                                >
                                    <option value="">Select your state</option>
                                    {nigerianStates.map((state, index) => (
                                        <option key={index} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            
                            <button 
                                type="submit" 
                                className="form-submit" 
                                disabled={isSubmitting}
                                style={{
                                    width: '100%',
                                    padding: '18px',
                                    background: isSubmitting ? 'var(--gray-400)' : 'var(--white)',
                                    color: 'var(--primary)',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    opacity: isSubmitting ? 0.8 : 1,
                                }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <i className="fas fa-spinner fa-spin" style={{ marginRight: '8px' }}></i>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i>
                                        <span>Join Waitlist</span>
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                    
                    <p style={{ 
                        marginTop: 'var(--space-xl)', 
                        marginBottom: 'var(--space-lg)', 
                        fontSize: '14px', 
                        opacity: 0.8,
                        textAlign: 'center'
                    }}>
                        No spam, ever. We'll only email you about the launch.
                    </p>
                    
                    <div className="perks" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 'var(--space-2xl)',
                        marginTop: 'var(--space-xl)',
                        flexWrap: 'wrap',
                    }}>
                        {['Free to join', 'No credit card required', 'Early bird perks'].map((perk, index) => (
                            <div key={index} className="perk" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-sm)',
                                color: 'rgba(255, 255, 255, 0.9)',
                            }}>
                                <i className="fas fa-check-circle" style={{ color: 'var(--accent-light)' }}></i>
                                <span>{perk}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx="true">{`
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes scaleIn {
                    from {
                        transform: scale(0);
                    }
                    to {
                        transform: scale(1);
                    }
                }
                
                .fa-spinner {
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default Waitlist;