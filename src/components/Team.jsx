import React from 'react';

const Team = () => {
    const teamMembers = [
        {
            name: 'Nwokafor Netochukwu',
            role: 'Founder',
            bio: 'Determined leader with a creative vision.',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            name: 'Nwokafor',
            role: 'Co-founder',
            bio: 'Expert in scaling service businesses across Nigeria.',
            image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
    ];

    const openSocialLink = (platform) => {
        const urls = {
            instagram: 'https://instagram.com/eazyhire',
            twitter: 'https://twitter.com/eazyhire'
        };
        window.open(urls[platform], '_blank', 'noopener,noreferrer');
    };

    return (
        <section className="section team" id="team">
            <div className="container">
                <div className="section-header" data-scroll>
                    <h2 className="section-title" style={{
                        fontSize: '35px',
                        color: 'var(--gray-900)',
                        marginBottom: 'var(--space-md)',
                    }}>
                        Meet <span style={{
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>The Team</span>
                    </h2>
                    <p className="section-subtitle" style={{
                        fontSize: '18px',
                        color: 'var(--gray-600)',
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}>
                        The passionate minds building Nigeria's trusted service marketplace
                    </p>
                </div>
                
                <div className="team-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 'var(--space-2xl)',
                    marginTop: 'var(--space-3xl)',
                }}>
                    {teamMembers.map((member, index) => (
                        <div 
                            key={index}
                            className="team-member stagger-item" 
                            data-scroll
                            style={{
                                textAlign: 'center',
                                padding: 'var(--space-xl)',
                                borderRadius: 'var(--radius-xl)',
                                background: 'var(--white)',
                                boxShadow: 'var(--shadow-sm)',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                position: 'relative',
                                overflow: 'hidden',
                                border: '1px solid var(--gray-100)',
                            }}
                        >
                            <div className="member-avatar" style={{
                                width: '120px',
                                height: '120px',
                                margin: '0 auto var(--space-lg)',
                                position: 'relative',
                            }}>
                                <div className="avatar-inner" style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    border: '4px solid var(--white)',
                                    boxShadow: 'var(--shadow-md)',
                                    position: 'relative',
                                    zIndex: 2,
                                }}>
                                    <img 
                                        src={member.image} 
                                        alt={member.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform 0.6s ease',
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="member-info" style={{ position: 'relative', zIndex: 2 }}>
                                <h3 className="member-name" style={{
                                    fontSize: '20px',
                                    color: 'var(--gray-900)',
                                    marginBottom: 'var(--space-xs)',
                                    fontWeight: 700,
                                }}>
                                    {member.name}
                                </h3>
                                <p className="member-role" style={{
                                    color: 'var(--primary)',
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    marginBottom: 'var(--space-md)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                }}>
                                    {member.role}
                                </p>
                                <p className="member-bio" style={{
                                    color: 'var(--gray-600)',
                                    fontSize: '14px',
                                    lineHeight: 1.5,
                                    marginBottom: 'var(--space-lg)',
                                    minHeight: '60px',
                                }}>
                                    {member.bio}
                                </p>
                                <div className="member-social" style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: 'var(--space-md)',
                                }}>
                                    <button 
                                        onClick={() => openSocialLink('instagram')}
                                        aria-label={`Follow ${member.name} on Instagram`}
                                        style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '50%',
                                            background: 'var(--gray-100)',
                                            color: 'var(--gray-700)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s ease',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <i className="fab fa-instagram"></i>
                                    </button>
                                    <button 
                                        onClick={() => openSocialLink('twitter')}
                                        aria-label={`Follow ${member.name} on Twitter`}
                                        style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '50%',
                                            background: 'var(--gray-100)',
                                            color: 'var(--gray-700)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textDecoration: 'none',
                                            transition: 'all 0.3s ease',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <i className="fab fa-twitter"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;