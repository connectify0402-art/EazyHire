import React, { useEffect } from 'react';

const Challenge = () => {
    const challengePoints = [
        {
            icon: 'fas fa-search',
            title: 'Hard to Find',
            description: 'Spending hours searching for reliable service providers'
        },
        {
            icon: 'fas fa-user-shield',
            title: 'Trust Issues',
            description: 'No way to verify if providers are legitimate or skilled'
        },
        {
            icon: 'fas fa-tags',
            title: 'Overpricing',
            description: 'Getting quoted different prices for the same service'
        },
        {
            icon: 'fas fa-clock',
            title: 'Delays',
            description: 'Waiting days for a provider who may never show up'
        },
        {
            icon: 'fas fa-star-half-alt',
            title: 'Inconsistent Quality',
            description: 'No standardized ratings or reviews to compare providers'
        },
        {
            icon: 'fas fa-exchange-alt',
            title: 'No Accountability',
            description: 'Providers disappearing after payment with no recourse'
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
        <section className="section challenge" id="challenge">
            <div className="container">
                <div 
                    className="challenge-content scroll-fade-in" 
                    data-scroll 
                    style={{
                        maxWidth: '1000px',
                        margin: '0 auto',
                        textAlign: 'center',
                        opacity: 0,
                        transform: 'translateY(30px)',
                        transition: 'opacity 0.8s ease, transform 0.8s ease'
                    }}
                >
                    <h2 
                        className="section-title scroll-slide-in" 
                        data-scroll
                        style={{
                            fontSize: '35px',
                            color: 'var(--gray-900)',
                            marginBottom: 'var(--space-xl)',
                            opacity: 0,
                            transform: 'translateY(-20px)',
                            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s'
                        }}
                    >
                        Why We Built <span style={{
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>EazyHire</span>
                    </h2>
                    <p 
                        className="challenge-description scroll-fade-in-delay" 
                        data-scroll
                        style={{
                            fontSize: '15px',
                            color: 'var(--gray-700)',
                            lineHeight: 1.7,
                            marginBottom: 'var(--space-2xl)',
                            opacity: 0,
                            transform: 'translateY(20px)',
                            transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s'
                        }}
                    >
                        Finding trusted service providers in Nigeria has always been a challenge. We've all experienced the frustration asking friends, searching endlessly online, and still ending up with unreliable workers or inflated prices.
                        <br/><br/>
                        EazyHire was built to change that. We're creating a platform where you can request any service and get matched with verified, trusted providers in seconds all in one app.
                    </p>
                    
                    <div 
                        className="challenge-points" 
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 'var(--space-xl)',
                            marginTop: 'var(--space-3xl)',
                        }}
                    >
                        {challengePoints.map((point, index) => (
                            <div 
                                key={index}
                                className="challenge-point stagger-item hover-lift" 
                                data-scroll
                                data-delay={index * 100}
                                style={{
                                    padding: 'var(--space-xl)',
                                    background: 'var(--gray-50)',
                                    borderRadius: 'var(--radius-lg)',
                                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease, opacity 0.4s ease, border 0.3s ease',
                                    opacity: 0,
                                    transform: 'translateY(40px)',
                                    border: '2px solid transparent',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div 
                                    className="point-icon hover-bounce" 
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        background: 'var(--gradient-subtle)',
                                        borderRadius: 'var(--radius-full)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--primary)',
                                        fontSize: '20px',
                                        margin: '0 auto var(--space-lg)',
                                        transition: 'transform 0.3s ease, background 0.3s ease'
                                    }}
                                >
                                    <i className={point.icon}></i>
                                </div>
                                <h3 
                                    className="point-title" 
                                    style={{
                                        fontSize: '18px',
                                        color: 'var(--gray-900)',
                                        marginBottom: 'var(--space-sm)',
                                        transition: 'color 0.3s ease'
                                    }}
                                >
                                    {point.title}
                                </h3>
                                <p style={{ 
                                    color: 'var(--gray-600)',
                                    transition: 'color 0.3s ease',
                                    fontSize: '14px',
                                    lineHeight: 1.6
                                }}>
                                    {point.description}
                                </p>
                                
                                {/* Hover Effect Background */}
                                <div 
                                    className="hover-bg"
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'var(--gradient-subtle)',
                                        opacity: 0,
                                        zIndex: -1,
                                        transition: 'opacity 0.4s ease'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style >{`
                /* Animation Classes */
                .animate-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }

                /* Hover Effects */
                .hover-lift:hover {
                    transform: translateY(-10px) !important;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                    border-color: var(--primary-light) !important;
                }

                .hover-lift:hover .point-icon {
                    transform: scale(1.1);
                    background: var(--gradient-primary) !important;
                    color: white !important;
                }

                .hover-lift:hover .point-title {
                    color: var(--primary) !important;
                }

                .hover-lift:hover .hover-bg {
                    opacity: 0.1;
                }

                .hover-lift:hover p {
                    color: var(--gray-800) !important;
                }

                /* Staggered animation delays */
                .challenge-point:nth-child(1) { transition-delay: 0.1s !important; }
                .challenge-point:nth-child(2) { transition-delay: 0.2s !important; }
                .challenge-point:nth-child(3) { transition-delay: 0.3s !important; }
                .challenge-point:nth-child(4) { transition-delay: 0.4s !important; }
                .challenge-point:nth-child(5) { transition-delay: 0.5s !important; }
                .challenge-point:nth-child(6) { transition-delay: 0.6s !important; }

                /* Responsive breakpoints */
                @media (min-width: 1200px) {
                    .challenge-content {
                        max-width: 1100px !important;
                    }
                    
                    .challenge-points {
                        gap: var(--space-2xl) !important;
                    }
                }

                @media (min-width: 992px) and (max-width: 1199px) {
                    .challenge-points {
                        gap: var(--space-xl) !important;
                    }
                    
                    .challenge-point {
                        padding: var(--space-lg) !important;
                    }
                }

                /* Tablet: 2 columns */
                @media (max-width: 991px) and (min-width: 768px) {
                    .challenge-points {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: var(--space-lg) !important;
                    }
                    
                    .section-title {
                        font-size: 30px !important;
                    }
                }

                /* Large Mobile: 2 columns */
                @media (max-width: 767px) and (min-width: 576px) {
                    .challenge-points {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: var(--space-md) !important;
                    }
                    
                    .challenge-point {
                        padding: var(--space-lg) !important;
                    }
                    
                    .section-title {
                        font-size: 28px !important;
                    }
                }

                /* Small Mobile: 1 column */
                @media (max-width: 575px) {
                    .challenge-points {
                        grid-template-columns: 1fr !important;
                        gap: var(--space-lg) !important;
                        max-width: 400px;
                        margin-left: auto;
                        margin-right: auto;
                    }
                    
                    .challenge-point {
                        padding: var(--space-lg) !important;
                    }
                    
                    .section-title {
                        font-size: 26px !important;
                    }
                    
                    .challenge-description {
                        font-size: 14px !important;
                        padding: 0 var(--space-sm);
                    }
                }

                /* Extra small screens */
                @media (max-width: 375px) {
                    .challenge-points {
                        gap: var(--space-md) !important;
                    }
                    
                    .challenge-point {
                        padding: var(--space-md) !important;
                    }
                    
                    .section-title {
                        font-size: 24px !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Challenge;