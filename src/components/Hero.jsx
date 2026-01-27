import React, { useEffect, useState } from 'react';

const Hero = () => {
    const [animateImages, setAnimateImages] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateImages(true);
        }, 800);

        // Check screen size
        const checkScreenSize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 768);
            setIsTablet(width > 768 && width <= 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkScreenSize);
        };
    }, []);

    const scrollToWaitlist = () => {
        const element = document.getElementById('waitlist');
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    };

    const imageItems = [
        {
            id: 1,
            src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3RyaWNpYW58ZW58MHx8MHx8fDA%3D",
            alt: "Home Services"
        },
        {
            id: 2,
            src: "https://plus.unsplash.com/premium_photo-1663047716627-e0b6c878761e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "Tech Services"
        },
        {
            id: 3,
            src: "https://images.unsplash.com/photo-1613186420419-868111e7ac07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJsYWNrJTIwY2hpbGQlMjBsZWFybmluZ3xlbnwwfHwwfHx8MA%3D%3D",
            alt: "Education Services"
        },
        {
            id: 4,
            src: "https://images.unsplash.com/photo-1664575601786-b00156752b61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGJ1c2luZXNzfGVufDB8fDB8fHww",
            alt: "Professional Services"
        }
    ];

    // Responsive styles
    const heroStyle = {
        paddingTop: isMobile ? '120px' : '150px',
        paddingBottom: isMobile ? 'var(--space-3xl)' : 'var(--space-6xl)',
        minHeight: isMobile ? 'auto' : '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
        isolation: 'isolate',
    };

    const heroContainerStyle = {
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? 'var(--space-2xl)' : 'var(--space-4xl)',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
    };

    const heroTitleStyle = {
        fontSize: isMobile ? '32px' : isTablet ? '40px' : '50px',
        lineHeight: 1.1,
        marginBottom: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
        color: 'var(--gray-900)',
        textAlign: isMobile ? 'center' : 'left',
    };

    const heroSubtitleStyle = {
        fontSize: isMobile ? '14px' : '15px',
        color: 'var(--gray-700)',
        marginBottom: isMobile ? 'var(--space-xl)' : 'var(--space-2xl)',
        lineHeight: 1.6,
        textAlign: isMobile ? 'center' : 'left',
    };

    const heroImagesStyle = {
        position: 'relative',
        height: isMobile ? '300px' : isTablet ? '400px' : '500px',
        marginTop: isMobile ? 'var(--space-2xl)' : 0,
    };

    const comingSoonBadgeStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-sm)',
        background: 'var(--gray-100)',
        padding: isMobile ? '8px 16px' : 'var(--space-sm) var(--space-lg)',
        borderRadius: 'var(--radius-full)',
        marginBottom: isMobile ? 'var(--space-xl)' : 'var(--space-2xl)',
        animation: 'pulse 2s infinite',
        margin: isMobile ? '0 auto' : '0',
        justifyContent: isMobile ? 'center' : 'flex-start',
        width: isMobile ? 'fit-content' : 'auto',
    };

    const badgeTextStyle = {
        fontWeight: 600,
        color: 'var(--primary)',
        fontSize: isMobile ? '12px' : '14px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    };

    const ctaButtonStyle = {
        padding: isMobile ? '14px 32px' : '16px 40px',
        fontSize: isMobile ? '15px' : '16px',
        borderRadius: 'var(--radius-full)',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        background: 'var(--gradient-primary)',
        color: 'var(--white)',
        width: isMobile ? '100%' : 'auto',
        maxWidth: isMobile ? '300px' : 'none',
        margin: isMobile ? '0 auto' : '0',
    };

    const heroContentStyle = {
        textAlign: isMobile ? 'center' : 'left',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isMobile ? 'center' : 'flex-start',
    };

    const imageGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: isMobile ? '12px' : 'var(--space-md)',
        height: '100%',
    };

    const imageItemStyle = (index) => ({
        borderRadius: isMobile ? '16px' : 'var(--radius-xl)',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: isMobile ? 'var(--shadow-md)' : 'var(--shadow-lg)',
        transform: 'translateY(50px)',
        opacity: 0,
        transition: `transform 0.8s ease ${0.1 + index * 0.1}s, opacity 0.8s ease ${0.1 + index * 0.1}s`,
        ...(animateImages && {
            transform: 'translateY(0)',
            opacity: 1,
        }),
    });

    return (
        <section className="section hero" id="home" style={heroStyle}>
            {/* Simplified Grid Background - better performance */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `
                    linear-gradient(to right, rgba(0, 146, 49, 0.3) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(0, 146, 49, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: isMobile ? '30px 30px' : '50px 50px',
                backgroundPosition: 'center center',
                maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                zIndex: -1,
                opacity: isMobile ? 0.3 : 0.5,
            }}></div>

            {/* Subtle Gradient Overlay */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: isMobile ? '100%' : '80%',
                height: isMobile ? '70%' : '80%',
                background: 'radial-gradient(ellipse at center, rgba(0, 146, 49, 0.08) 0%, rgba(0, 146, 49, 0.02) 30%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                zIndex: -2,
                opacity: 0.6,
            }}></div>

            <style jsx="true">{`
                @keyframes gridPulse {
                    0% {
                        opacity: 0.3;
                        background-size: ${isMobile ? '30px 30px' : '50px 50px'};
                    }
                    100% {
                        opacity: 0.7;
                        background-size: ${isMobile ? '32px 32px' : '55px 55px'};
                    }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
            `}</style>

            <div className="container hero-container" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: isMobile ? '0 16px' : '0 32px',
                ...heroContainerStyle,
            }}>
                <div style={heroContentStyle}>
                    <div style={comingSoonBadgeStyle}>
                        <i className="fas fa-bolt"></i>
                        <span style={badgeTextStyle}>Launching Soon</span>
                    </div> <br />
                    
                    <h1 style={heroTitleStyle}>
                        Nigeria's Premium <span style={{
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            position: 'relative',
                            display: 'inline-block',
                        }}>Service Marketplace</span>
                    </h1>
                    
                    <p style={heroSubtitleStyle}>
                        EazyHire is building Nigeria's most trusted platform connecting verified service professionals with clients. Join our exclusive waitlist to be first in line when we launch.
                    </p>
                    
                    <div style={{ width: isMobile ? '100%' : 'auto' }}>
                        <button 
                            onClick={scrollToWaitlist}
                            style={ctaButtonStyle}
                        >
                            <i className="fas fa-paper-plane"></i>
                            <span>Join Exclusive Waitlist</span>
                        </button>
                    </div>
                </div>
                
                <div style={heroImagesStyle}>
                    <div style={imageGridStyle}>
                        {imageItems.map((item, index) => (
                            <div 
                                key={item.id}
                                style={imageItemStyle(index)}
                            >
                                <img 
                                    src={item.src} 
                                    alt={item.alt}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.6s ease',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile-specific adjustments */}
            {isMobile && (
                <style jsx="true">{`
                    @media (max-width: 480px) {
                        .hero-title {
                            font-size: 28px !important;
                        }
                        
                        .hero-subtitle {
                            font-size: 13px !important;
                        }
                        
                        .hero-images {
                            height: 250px !important;
                        }
                    }
                    
                    @media (max-width: 360px) {
                        .hero-title {
                            font-size: 24px !important;
                        }
                        
                        .hero-images {
                            height: 220px !important;
                        }
                        
                        .cta-button {
                            padding: 12px 24px !important;
                            font-size: 14px !important;
                        }
                    }
                `}</style>
            )}
        </section>
    );
};

export default Hero;