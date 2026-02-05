import React, { useEffect } from 'react';

const Benefits = () => {
    const benefits = [
        {
            icon: 'fas fa-clock',
            title: 'Save Time',
            description: 'No more endless searching. Get matched in seconds.'
        },
        {
            icon: 'fas fa-shield-alt',
            title: 'Avoid Unreliable Providers',
            description: 'Every provider is verified and rated by real customers.'
        },
        {
            icon: 'fas fa-eye',
            title: 'Transparent Service Access',
            description: 'See ratings, reviews, and pricing before you commit.'
        },
        {
            icon: 'fas fa-check-circle',
            title: 'Get Exactly What You Need',
            description: 'One request. One match. Perfect service every time.'
        },
        {
            icon: 'fas fa-money-bill-wave',
            title: 'Fair Pricing',
            description: 'Competitive rates with no hidden fees or surprises.'
        },
        {
            icon: 'fas fa-headset',
            title: '24/7 Support',
            description: 'Round-the-clock customer service for any issues.'
        }
    ];

    useEffect(() => {
        // Initialize scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all elements with data-scroll attribute
        document.querySelectorAll('[data-scroll]').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <section className="section benefits" id="benefits" style={{ 
            background: 'var(--gray-50)',
            padding: 'var(--space-3xl) 0'
        }}>
            <div className="container">
                <div 
                    className="section-header scroll-fade-in" 
                    data-scroll
                    style={{
                        textAlign: 'center',
                        marginBottom: 'var(--space-3xl)',
                        opacity: 0,
                        transform: 'translateY(30px)',
                        transition: 'opacity 0.8s ease, transform 0.8s ease'
                    }}
                >
                    <h2 
                        className="section-title scroll-slide-in" 
                        data-scroll
                        style={{
                            fontSize: '40px',
                            color: 'var(--gray-900)',
                            marginBottom: 'var(--space-md)',
                            opacity: 0,
                            transform: 'translateY(-20px)',
                            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s'
                        }}
                    >
                        Why Choose <span style={{
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>EazyHire</span>
                    </h2>
                    <p 
                        className="section-subtitle scroll-fade-in-delay" 
                        data-scroll
                        style={{
                            fontSize: '18px',
                            color: 'var(--gray-600)',
                            maxWidth: '600px',
                            margin: '0 auto',
                            opacity: 0,
                            transform: 'translateY(20px)',
                            transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s'
                        }}
                    >
                        Experience the difference with our customer-first approach
                    </p>
                </div>
                
                <div 
                    className="benefits-grid" 
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 'var(--space-2xl)',
                    }}
                >
                    {benefits.map((benefit, index) => (
                        <div 
                            key={index}
                            className="benefit-card stagger-item hover-grow" 
                            data-scroll
                            data-delay={index * 100}
                            style={{
                                background: 'var(--white)',
                                borderRadius: 'var(--radius-xl)',
                                padding: 'var(--space-2xl)',
                                textAlign: 'center',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                opacity: 0,
                                transform: 'translateY(40px)',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden',
                                border: '2px solid transparent',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
                            }}
                        >
                            {/* Background Glow Effect */}
                            <div 
                                className="card-glow"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    background: 'var(--gradient-primary)',
                                    opacity: 0,
                                    zIndex: 0,
                                    transition: 'opacity 0.4s ease'
                                }}
                            />
                            
                            <div 
                                className="benefit-icon hover-spin" 
                                style={{
                                    width: '72px',
                                    height: '72px',
                                    background: 'var(--gradient-subtle)',
                                    borderRadius: 'var(--radius-full)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--primary)',
                                    fontSize: '28px',
                                    margin: '0 auto var(--space-lg)',
                                    transition: 'all 0.4s ease',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            >
                                <i className={benefit.icon}></i>
                            </div>
                            <h3 
                                className="benefit-title" 
                                style={{
                                    fontSize: '20px',
                                    color: 'var(--gray-900)',
                                    marginBottom: 'var(--space-sm)',
                                    transition: 'color 0.3s ease',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            >
                                {benefit.title}
                            </h3>
                            <p 
                                className="benefit-description" 
                                style={{
                                    color: 'var(--gray-600)',
                                    fontSize: '15px',
                                    lineHeight: 1.6,
                                    transition: 'color 0.3s ease',
                                    position: 'relative',
                                    zIndex: 1
                                }}
                            >
                                {benefit.description}
                            </p>
                            
                            {/* Hover Decorative Element */}
                            <div 
                                className="hover-decoration"
                                style={{
                                    position: 'absolute',
                                    bottom: '-10px',
                                    right: '-10px',
                                    width: '60px',
                                    height: '60px',
                                    background: 'var(--primary-light)',
                                    borderRadius: '50%',
                                    opacity: 0,
                                    transform: 'scale(0)',
                                    transition: 'all 0.4s ease',
                                    zIndex: 0
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style data-jsx="true">{`
                /* Animation Classes */
                .animate-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }

                /* Hover Effects */
                .hover-grow:hover {
                    transform: translateY(-8px) scale(1.02) !important;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15) !important;
                    border-color: var(--primary) !important;
                }

                .hover-grow:hover .card-glow {
                    opacity: 0.05;
                }

                .hover-grow:hover .benefit-icon {
                    transform: rotateY(180deg);
                    background: var(--gradient-primary) !important;
                    color: white !important;
                }

                .hover-grow:hover .benefit-title {
                    color: var(--primary) !important;
                }

                .hover-grow:hover .benefit-description {
                    color: var(--gray-800) !important;
                }

                .hover-grow:hover .hover-decoration {
                    opacity: 0.1;
                    transform: scale(1);
                }

                /* Staggered animation delays */
                .benefit-card:nth-child(1) { transition-delay: 0.1s !important; }
                .benefit-card:nth-child(2) { transition-delay: 0.2s !important; }
                .benefit-card:nth-child(3) { transition-delay: 0.3s !important; }
                .benefit-card:nth-child(4) { transition-delay: 0.4s !important; }
                .benefit-card:nth-child(5) { transition-delay: 0.5s !important; }
                .benefit-card:nth-child(6) { transition-delay: 0.6s !important; }

                /* Responsive breakpoints */
                @media (min-width: 1200px) {
                    .benefits-grid {
                        max-width: 1200px;
                        margin: 0 auto;
                        gap: var(--space-3xl) !important;
                    }
                    
                    .benefit-card {
                        padding: var(--space-3xl) !important;
                    }
                }

                /* Tablet: 2 columns */
                @media (max-width: 991px) and (min-width: 768px) {
                    .benefits-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: var(--space-xl) !important;
                    }
                    
                    .section-title {
                        font-size: 36px !important;
                    }
                    
                    .benefit-icon {
                        width: 64px !important;
                        height: 64px !important;
                        font-size: 24px !important;
                    }
                }

                /* Large Mobile: 2 columns */
                @media (max-width: 767px) and (min-width: 576px) {
                    .benefits-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: var(--space-lg) !important;
                    }
                    
                    .benefit-card {
                        padding: var(--space-xl) !important;
                    }
                    
                    .section-title {
                        font-size: 32px !important;
                    }
                    
                    .section-subtitle {
                        font-size: 16px !important;
                    }
                    
                    .benefit-icon {
                        width: 60px !important;
                        height: 60px !important;
                        font-size: 22px !important;
                    }
                    
                    .benefit-title {
                        font-size: 18px !important;
                    }
                }

                /* Small Mobile: 1 column */
                @media (max-width: 575px) {
                    .benefits-grid {
                        grid-template-columns: 1fr !important;
                        gap: var(--space-xl) !important;
                        max-width: 400px;
                        margin: 0 auto;
                    }
                    
                    .benefit-card {
                        padding: var(--space-xl) !important;
                    }
                    
                    .section {
                        padding: var(--space-2xl) 0 !important;
                    }
                    
                    .section-title {
                        font-size: 30px !important;
                    }
                    
                    .section-subtitle {
                        font-size: 15px !important;
                        padding: 0 var(--space-sm);
                    }
                    
                    .benefit-icon {
                        width: 56px !important;
                        height: 56px !important;
                        font-size: 20px !important;
                    }
                    
                    .benefit-title {
                        font-size: 17px !important;
                    }
                    
                    .benefit-description {
                        font-size: 14px !important;
                    }
                }

                /* Extra small screens */
                @media (max-width: 375px) {
                    .benefits-grid {
                        gap: var(--space-lg) !important;
                    }
                    
                    .benefit-card {
                        padding: var(--space-lg) !important;
                    }
                    
                    .section-title {
                        font-size: 28px !important;
                    }
                    
                    .benefit-icon {
                        width: 52px !important;
                        height: 52px !important;
                        font-size: 18px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Benefits;