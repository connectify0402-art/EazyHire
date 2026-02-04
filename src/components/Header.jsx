import React, { useState, useEffect } from 'react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

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

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkMobile);
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        const newMenuState = !isMenuOpen;
        setIsMenuOpen(newMenuState);
        document.body.classList.toggle('menu-open', newMenuState);
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

    // Styles with actual values instead of CSS variables
    const mobileToggleStyle = {
        display: isMobile ? 'block' : 'none',
        background: 'transparent',
        border: 'none',
        fontSize: '24px',
        color: '#616161',
        cursor: 'pointer',
        padding: '8px',
        zIndex: 1001,
        transition: 'transform 0.3s ease',
    };

    const navMenuStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '32px' : '48px',
        ...(isMobile && {
            position: 'fixed',
            top: '70px',
            left: 0,
            width: '100%',
            maxHeight: 'calc(100vh - 80px)',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            padding: '32px',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '32px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            zIndex: 999,
            opacity: isMenuOpen ? 1 : 0,
            transform: isMenuOpen ? 'translateY(0)' : 'translateY(-20px)',
            visibility: isMenuOpen ? 'visible' : 'hidden',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            borderBottom: '1px solid #EEEEEE',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
        }),
    };

    const navLinksStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '32px' : '48px',
        ...(isMobile && {
            flexDirection: 'column',
            gap: '32px',
            width: '100%',
            alignItems: 'center',
        }),
    };

    const navLinkStyle = {
        background: 'transparent',
        border: 'none',
        color: '#616161',
        textDecoration: 'none',
        fontWeight: 500,
        fontSize: '15px',
        position: 'relative',
        padding: '4px 0',
        transition: 'color 0.3s ease',
        cursor: 'pointer',
        fontFamily: "'Inter', sans-serif",
        ...(isMobile && {
            padding: '8px 0',
            fontSize: '16px',
            width: '100%',
            textAlign: 'center',
            borderBottom: '1px solid #F5F5F5',
            paddingBottom: '16px',
        }),
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
        gap: '8px',
        background: 'linear-gradient(135deg, rgb(0, 146, 49), #11ACA9)',
        color: '#FFFFFF',
        ...(isMobile && {
            width: '100%',
            justifyContent: 'center',
            marginTop: '16px',
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
                    height: 100vh;
                    position: fixed;
                    width: 100%;
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
            `}</style>
            
            <header style={headerStyle}>
                <div style={containerStyle}>
                    <button 
                        className="logo" 
                        onClick={() => scrollToSection('home')}
                        style={logoStyle}
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
                            {/* <button 
                                className="nav-link" 
                                onClick={() => scrollToSection('team')}
                                style={navLinkStyle}
                            >
                                Team
                            </button> */}
                        </div>
                        <button 
                            className="btn btn-primary nav-cta-btn" 
                            onClick={() => scrollToSection('waitlist')}
                            style={navCtaButtonStyle}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.08)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
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