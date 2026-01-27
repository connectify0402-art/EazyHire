import React, { useState, useEffect } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        // Check screen size on mount and resize
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Close menu on resize to desktop
        const handleResize = () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                setIsMenuOpen(false);
                document.body.classList.remove('menu-open');
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('resize', handleResize);
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.classList.toggle('menu-open', !isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.classList.remove('menu-open');
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 100,
                behavior: 'smooth'
            });
        }
        closeMenu();
    };

    // Media query styles
    const mobileToggleStyle = {
        display: isMobile ? 'block' : 'none',
        background: 'transparent',
        border: 'none',
        fontSize: '24px',
        color: 'var(--gray-700)',
        cursor: 'pointer',
        padding: 'var(--space-sm)',
        zIndex: 1001,
        transition: 'transform 0.3s ease',
    };

    const navMenuStyle = {
        display: isMobile ? 'flex' : 'flex',
        alignItems: 'center',
        gap: 'var(--space-2xl)',
        ...(isMobile && {
            position: 'fixed',
            top: '70px',
            left: 0,
            width: '100%',
            maxHeight: 'calc(100vh - 80px)',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            padding: 'var(--space-xl)',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-xl)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            zIndex: 999,
            opacity: isMenuOpen ? 1 : 0,
            transform: isMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
            visibility: isMenuOpen ? 'visible' : 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            // Use borderBottom only, not border
            borderBottom: '1px solid var(--gray-200)',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
        }),
    };

    const navLinksStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2xl)',
        ...(isMobile && {
            flexDirection: 'column',
            gap: 'var(--space-xl)',
            width: '100%',
            alignItems: 'center',
        }),
    };

    // Fixed: Remove borderBottom from navLinkStyle and only use border for specific cases
    const navLinkStyle = {
        background: 'transparent',
        border: 'none', // Only use border here
        color: 'var(--gray-700)',
        textDecoration: 'none',
        fontWeight: 500,
        fontSize: '15px',
        position: 'relative',
        padding: 'var(--space-xs) 0',
        transition: 'color 0.3s ease',
        cursor: 'pointer',
        fontFamily: 'inherit',
        ...(isMobile && {
            padding: 'var(--space-sm) 0',
            fontSize: '16px',
            width: '100%',
            textAlign: 'center',
            // Use borderBottom without mixing with border
            borderBottom: '1px solid var(--gray-100)',
            paddingBottom: 'var(--space-md)',
        }),
    };

    const navCtaButtonStyle = {
        padding: '12px 28px',
        borderRadius: 'var(--radius-full)',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: '15px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: 'none', // Only use border here
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'var(--gradient-primary)',
        color: 'var(--white)',
        ...(isMobile && {
            width: '100%',
            justifyContent: 'center',
            marginTop: 'var(--space-md)',
        }),
    };

    // Responsive logo text styles
    const logoTextStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    };

    const logoPrimaryStyle = {
        fontFamily: 'var(--font-heading)',
        fontWeight: 800,
        color: 'var(--gray-900)',
        letterSpacing: '-0.5px',
        fontSize: isMobile ? '20px' : '25px',
    };

    const logoSubStyle = {
        fontSize: isMobile ? '8px' : '10px',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: 'var(--secondary)',
        fontWeight: 600,
    };

    return (
        <header className="header" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 1000,
            padding: isMobile ? '12px 0' : '16px 0',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            // Use borderBottom only, not border
            borderBottom: '1px solid var(--gray-100)',
            transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
            <div className="container header-container" style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: isMobile ? '0 16px' : '0 32px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <button 
                    className="logo" 
                    onClick={() => scrollToSection('home')}
                    style={{
                        background: 'transparent',
                        border: 'none', // Consistent: only use border
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: isMobile ? '6px' : '8px',
                        textDecoration: 'none',
                    }}
                >
                    <div className="logo-icon" style={{
                        width: isMobile ? '36px' : '40px',
                        height: isMobile ? '36px' : '40px',
                        background: 'var(--gradient-primary)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--white)',
                        fontSize: isMobile ? '20px' : '24px',
                        transform: 'rotate(-5deg)',
                        transition: 'transform 0.3s ease',
                    }}>
                        <i className="fas fa-handshake"></i>
                    </div>
                    <div style={logoTextStyle}>
                        <span style={logoPrimaryStyle}>EazyHire</span>
                        <span style={logoSubStyle}>Coming Soon</span>
                    </div>
                </button>

                <button 
                    className="mobile-toggle" 
                    onClick={toggleMenu}
                    aria-label="Toggle navigation"
                    style={mobileToggleStyle}
                >
                    <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>

                <nav style={navMenuStyle}>
                    <div style={navLinksStyle}>
                        <button 
                            className="nav-link" 
                            onClick={() => scrollToSection('home')}
                            style={navLinkStyle}
                        >
                            Home
                        </button>
                        <button 
                            className="nav-link" 
                            onClick={() => scrollToSection('features')}
                            style={navLinkStyle}
                        >
                            Features
                        </button>
                        <button 
                            className="nav-link" 
                            onClick={() => scrollToSection('challenge')}
                            style={navLinkStyle}
                        >
                            The Challenge
                        </button>
                       {/*} <button 
                            className="nav-link" 
                            onClick={() => scrollToSection('team')}
                            style={navLinkStyle}
                        >
                            Team
                        </button>*/}
                    </div>
                    <button 
                        className="btn btn-primary nav-cta-btn" 
                        onClick={() => scrollToSection('waitlist')}
                        style={navCtaButtonStyle}
                    >
                        <i className="fas fa-rocket"></i>
                        <span>Join Waitlist</span>
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;