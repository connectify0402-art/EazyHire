import React from 'react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const openSocialLink = (platform) => {
        const urls = {
            twitter: 'https://x.com/eazyhirenig?s=21',
            instagram: 'https://www.instagram.com/eazyhirenig?igsh=MWRmcGtwY3JvNGVsbw=='
        };
        window.open(urls[platform], '_blank', 'noopener,noreferrer');
    };

    return (
        <footer className="footer" style={{
            background: 'var(--gray-900)',
            color: 'var(--white)',
            padding: 'var(--space-3xl) 0 var(--space-xl)',
        }}>
            <div className="container">
                <div className="footer-content" data-scroll style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 'var(--space-lg)',
                }}>
                    <button 
                        onClick={scrollToTop}
                        className="footer-logo" 
                        data-scroll 
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-sm)',
                            textDecoration: 'none',
                        }}
                    >
                        <div className="footer-logo-icon" style={{
                            width: '32px',
                            height: '32px',
                            background: 'var(--gradient-primary)',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--white)',
                            fontSize: '16px',
                        }}>
                            <i className="fas fa-handshake"></i>
                        </div>
                        <span className="footer-logo-text" style={{
                            fontFamily: 'var(--font-heading)',
                            fontSize: '20px',
                            fontWeight: 700,
                            color: 'var(--white)',
                        }}>EazyHire</span>
                    </button>
                    
                    <p className="footer-tagline" data-scroll style={{
                        color: 'var(--gray-400)',
                        maxWidth: '400px',
                        margin: '0 auto',
                        lineHeight: 1.6,
                    }}>
                        Building Nigeria's most trusted service marketplace. Connecting verified professionals with clients who value quality, reliability, and trust.
                    </p>
                    
                    <div className="footer-social" style={{
                        display: 'flex',
                        gap: 'var(--space-md)',
                        marginTop: 'var(--space-lg)',
                    }}>
                        {[
                            { platform: 'twitter', icon: 'fab fa-x-twitter' },
                            { platform: 'instagram', icon: 'fab fa-instagram' }
                        ].map((social, index) => (
                            <button 
                                key={index}
                                onClick={() => openSocialLink(social.platform)}
                                className="social-link"
                                aria-label={`Follow us on ${social.platform}`}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: 'var(--radius-full)',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--white)',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <i className={social.icon}></i>
                            </button>
                        ))}
                    </div>
                    
                    <p className="copyright" data-scroll style={{
                        color: 'var(--gray-500)',
                        fontSize: '14px',
                        marginTop: 'var(--space-xl)',
                    }}>
                        © 2026 EazyHire Nigeria. Coming Soon.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;