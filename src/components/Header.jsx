import React, { useState, useEffect, useRef } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const menuRef = useRef(null);
    const ctaButtonRef = useRef(null);

    // Define CSS variables inline
    const cssVariables = {
        '--primary': 'rgb(0, 146, 49)',
        '--primary-light': 'rgb(86, 255, 114)',
        '--secondary': '#11ACA9',
        '--gradient-primary': 'linear-gradient(135deg, rgb(0, 146, 49), #11ACA9)',
        '--white': '#FFFFFF',
        '--gray-100': '#F5F5F5',
        '--gray-200': '#EEEEEE',
        '--gray-700': '#616161',
        '--gray-900': '#212121',
        '--font-heading': "'Manrope', sans-serif",
        '--font-body': "'Inter', sans-serif",
        '--space-xs': '4px',
        '--space-sm': '8px',
        '--space-md': '16px',
        '--space-lg': '24px',
        '--space-xl': '32px',
        '--space-2xl': '48px',
        '--radius-md': '12px',
        '--radius-full': '9999px',
        '--shadow-sm': '0 2px 8px rgba(0, 0, 0, 0.05)',
        '--shadow-md': '0 8px 30px rgba(0, 0, 0, 0.08)',
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        // Check screen size on mount and resize
        const checkMobile = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            
            // Close menu when switching to desktop
            if (!mobile && isMenuOpen) {
                setIsMenuOpen(false);
                document.body.classList.remove('menu-open');
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Close menu when clicking outside on mobile
        const handleClickOutside = (event) => {
            if (isMobile && isMenuOpen && menuRef.current && 
                !menuRef.current.contains(event.target) &&
                !event.target.closest('.mobile-toggle') &&
                !event.target.closest('.logo')) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        // Prevent body scroll when menu is open
        if (isMobile && isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkMobile);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isMenuOpen, isMobile]); // Added isMobile to dependencies

    const toggleMenu = () => {
        const newMenuState = !isMenuOpen;
        setIsMenuOpen(newMenuState);
        
        if (newMenuState) {
            document.body.classList.add('menu-open');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.classList.remove('menu-open');
            document.body.style.overflow = '';
        }
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        document.body.classList.remove('menu-open');
        if (document.body) {
            document.body.style.overflow = '';
        }
    };

    const scrollToSection = (sectionId) => {
        // Close menu first on mobile
        if (isMobile) {
            closeMenu();
        }
        
        // Small delay to allow menu to close before scrolling
        setTimeout(() => {
            const element = document.getElementById(sectionId);
            if (element) {
                const headerHeight = 80; // Height of your fixed header
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, isMobile ? 100 : 0);
    };

    // Event handler utilities with null checks
    const handleNavLinkTouch = (e) => {
        if (isMobile && e.currentTarget) {
            e.currentTarget.style.backgroundColor = '#F5F5F5';
        }
    };

    const handleNavLinkTouchEnd = (e) => {
        if (isMobile && e.currentTarget) {
            setTimeout(() => {
                if (e.currentTarget) {
                    e.currentTarget.style.backgroundColor = '';
                }
            }, 200);
        }
    };

    const handleCtaHover = (e, isEnter) => {
        if (!isMobile && e.currentTarget) {
            e.currentTarget.style.transform = isEnter ? 'translateY(-2px)' : 'translateY(0)';
            e.currentTarget.style.boxShadow = isEnter ? '0 8px 30px rgba(0, 0, 0, 0.08)' : 'none';
        }
    };

    const handleCtaTouch = (e, isStart) => {
        if (isMobile && e.currentTarget) {
            e.currentTarget.style.transform = isStart ? 'translateY(-2px)' : 'translateY(0)';
            e.currentTarget.style.boxShadow = isStart ? '0 8px 30px rgba(0, 0, 0, 0.08)' : 'none';
        }
    };

    // Styles with actual values instead of CSS variables
    const mobileToggleStyle = {
        display: isMobile ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
        border: 'none',
        fontSize: '24px',
        color: '#616161',
        cursor: 'pointer',
        padding: '8px',
        width: '44px',
        height: '44px',
        zIndex: 1001,
        transition: 'transform 0.3s ease',
    };

    const navMenuStyle = {
        display: isMobile ? 'flex' : 'flex',
        alignItems: 'center',
        gap: isMobile ? '32px' : '48px',
        ...(isMobile && {
            position: 'fixed',
            top: '70px',
            left: 0,
            right: 0,
            width: '100%',
            height: isMenuOpen ? 'calc(100vh - 70px)' : 0,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            padding: isMenuOpen ? '32px' : '0 32px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: '0',
            boxShadow: isMenuOpen ? '0 10px 30px rgba(0, 0, 0, 0.1)' : 'none',
            zIndex: 999,
            opacity: isMenuOpen ? 1 : 0,
            transform: isMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
            visibility: isMenuOpen ? 'visible' : 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            borderBottom: isMenuOpen ? '1px solid #EEEEEE' : 'none',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            pointerEvents: isMenuOpen ? 'auto' : 'none',
        }),
    };

    const navLinksStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '0' : '48px',
        ...(isMobile && {
            flexDirection: 'column',
            gap: '0',
            width: '100%',
            alignItems: 'stretch',
        }),
    };

    // Get nav link style for specific index
    const getNavLinkStyle = (index, total) => {
        const baseStyle = {
            background: 'transparent',
            border: 'none',
            color: '#616161',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '15px',
            position: 'relative',
            padding: isMobile ? '16px 20px' : '4px 0',
            transition: 'color 0.3s ease, background-color 0.2s ease',
            cursor: 'pointer',
            fontFamily: "'Inter', sans-serif",
            textAlign: 'left',
            borderRadius: isMobile ? '8px' : '0',
            display: 'block',
            width: isMobile ? '100%' : 'auto',
        };

        if (isMobile) {
            const mobileStyle = {
                ...baseStyle,
                fontSize: '16px',
                borderBottom: index === total - 1 ? 'none' : '1px solid #F5F5F5',
                margin: 0,
            };
            return mobileStyle;
        }

        return baseStyle;
    };

    const navCtaButtonStyle = {
        padding: '12px 28px',
        borderRadius: '9999px',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: '15px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: 'none',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        background: 'linear-gradient(135deg, rgb(0, 146, 49), #11ACA9)',
        color: '#FFFFFF',
        ...(isMobile && {
            width: '100%',
            marginTop: '24px',
            padding: '16px 28px',
        }),
    };

    const headerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        padding: isMobile ? '12px 0' : '16px 0',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #F5F5F5',
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '0 16px' : '0 32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const logoStyle = {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '6px' : '8px',
        textDecoration: 'none',
        zIndex: 1001,
    };

    const logoIconStyle = {
        width: isMobile ? '36px' : '40px',
        height: isMobile ? '36px' : '40px',
        background: 'linear-gradient(135deg, rgb(0, 146, 49), #11ACA9)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        fontSize: isMobile ? '20px' : '24px',
        transform: 'rotate(-5deg)',
        transition: 'transform 0.3s ease',
    };

    const logoTextStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    };

    const logoPrimaryStyle = {
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 800,
        color: '#212121',
        letterSpacing: '-0.5px',
        fontSize: isMobile ? '20px' : '25px',
    };

    const logoSubStyle = {
        fontSize: isMobile ? '8px' : '10px',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        color: '#11ACA9',
        fontWeight: 600,
    };

    // Navigation items with their section IDs
    const navItems = [
        { label: 'Home', sectionId: 'home' },
        { label: 'Features', sectionId: 'features' },
        { label: 'Benefits', sectionId: 'benefits' },
        { label: 'The Challenge', sectionId: 'challenge' },
        { label: 'Service Game', sectionId: 'servicematchgame' },
    ];

    return (
        <>
            {/* Inject CSS variables as style tag */}
            <style>{`
                :root {
                    --primary: ${cssVariables['--primary']};
                    --primary-light: ${cssVariables['--primary-light']};
                    --secondary: ${cssVariables['--secondary']};
                    --gradient-primary: ${cssVariables['--gradient-primary']};
                    --white: ${cssVariables['--white']};
                    --gray-100: ${cssVariables['--gray-100']};
                    --gray-200: ${cssVariables['--gray-200']};
                    --gray-700: ${cssVariables['--gray-700']};
                    --gray-900: ${cssVariables['--gray-900']};
                    --font-heading: ${cssVariables['--font-heading']};
                    --font-body: ${cssVariables['--font-body']};
                    --space-xs: ${cssVariables['--space-xs']};
                    --space-sm: ${cssVariables['--space-sm']};
                    --space-md: ${cssVariables['--space-md']};
                    --space-lg: ${cssVariables['--space-lg']};
                    --space-xl: ${cssVariables['--space-xl']};
                    --space-2xl: ${cssVariables['--space-2xl']};
                    --radius-md: ${cssVariables['--radius-md']};
                    --radius-full: ${cssVariables['--radius-full']};
                    --shadow-sm: ${cssVariables['--shadow-sm']};
                    --shadow-md: ${cssVariables['--shadow-md']};
                }
                
                body.menu-open {
                    overflow: hidden;
                    position: fixed;
                    width: 100%;
                    height: 100%;
                }
                
                .nav-link:hover {
                    color: ${cssVariables['--primary']};
                }
                
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: ${cssVariables['--shadow-md']};
                }
                
                .logo-icon:hover {
                    transform: rotate(5deg) scale(1.1);
                }
                
                /* Mobile-specific styles */
                @media (max-width: 768px) {
                    .mobile-nav-link {
                        -webkit-tap-highlight-color: rgba(0, 146, 49, 0.1);
                        touch-action: manipulation;
                    }
                    
                    .mobile-nav-link:hover {
                        background-color: #F5F5F5;
                    }
                    
                    .mobile-nav-link:active {
                        background-color: #F5F5F5 !important;
                        transform: scale(0.98);
                    }
                    
                    /* Remove border from last nav item on mobile */
                    .mobile-nav-link:last-child {
                        border-bottom: none !important;
                    }
                }
            `}</style>
            
            <header style={headerStyle}>
                <div style={containerStyle}>
                    <button 
                        className="logo" 
                        onClick={() => scrollToSection('home')}
                        style={logoStyle}
                        aria-label="Go to Home"
                    >
                        <div className="logo-icon" style={logoIconStyle}>
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
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                        style={mobileToggleStyle}
                    >
                        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>

                    <nav 
                        ref={menuRef}
                        style={navMenuStyle}
                        aria-hidden={isMobile ? !isMenuOpen : false}
                    >
                        <div style={navLinksStyle}>
                            {navItems.map((item, index) => (
                                <button 
                                    key={item.sectionId}
                                    className={`nav-link ${isMobile ? 'mobile-nav-link' : ''}`}
                                    onClick={() => scrollToSection(item.sectionId)}
                                    style={getNavLinkStyle(index, navItems.length)}
                                    onTouchStart={handleNavLinkTouch}
                                    onTouchEnd={handleNavLinkTouchEnd}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                        <button 
                            ref={ctaButtonRef}
                            className="btn btn-primary nav-cta-btn" 
                            onClick={() => scrollToSection('waitlist')}
                            style={navCtaButtonStyle}
                            onMouseEnter={(e) => handleCtaHover(e, true)}
                            onMouseLeave={(e) => handleCtaHover(e, false)}
                            onTouchStart={(e) => handleCtaTouch(e, true)}
                            onTouchEnd={(e) => handleCtaTouch(e, false)}
                        >
                            <i className="fas fa-rocket"></i>
                            <span>Join Waitlist</span>
                        </button>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;