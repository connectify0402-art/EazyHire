import React from 'react';

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
        }
    ];

    return (
        <section className="section challenge" id="challenge">
            <div className="container">
                <div className="challenge-content" data-scroll style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'center',
                }}>
                    <h2 className="section-title" style={{
                        fontSize: '35px',
                        color: 'var(--gray-900)',
                        marginBottom: 'var(--space-xl)',
                    }}>
                        Why We Built <span style={{
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>EazyHire</span>
                    </h2>
                    <p className="challenge-description" style={{
                        fontSize: '15px',
                        color: 'var(--gray-700)',
                        lineHeight: 1.7,
                        marginBottom: 'var(--space-2xl)',
                    }}>
                        Finding trusted service providers in Nigeria has always been a challenge. We've all experienced the frustration asking friends, searching endlessly online, and still ending up with unreliable workers or inflated prices.
                        <br/><br/>
                        EazyHire was built to change that. We're creating a platform where you can request any service and get matched with verified, trusted providers in seconds all in one app.
                    </p>
                    
                    <div className="challenge-points" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: 'var(--space-xl)',
                        marginTop: 'var(--space-3xl)',
                    }}>
                        {challengePoints.map((point, index) => (
                            <div 
                                key={index}
                                className="challenge-point stagger-item" 
                                data-scroll
                                style={{
                                    padding: 'var(--space-xl)',
                                    background: 'var(--gray-50)',
                                    borderRadius: 'var(--radius-lg)',
                                    transition: 'transform 0.3s ease',
                                }}
                            >
                                <div className="point-icon" style={{
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
                                }}>
                                    <i className={point.icon}></i>
                                </div>
                                <h3 className="point-title" style={{
                                    fontSize: '18px',
                                    color: 'var(--gray-900)',
                                    marginBottom: 'var(--space-sm)',
                                }}>
                                    {point.title}
                                </h3>
                                <p style={{ color: 'var(--gray-600)' }}>
                                    {point.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Challenge;