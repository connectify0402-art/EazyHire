import React from 'react';

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
        }
    ];

    return (
        <section className="section benefits" id="benefits" style={{ background: 'var(--gray-50)' }}>
            <div className="container">
                <div className="section-header" data-scroll>
                    <h2 className="section-title" style={{
                        fontSize: '40px',
                        color: 'var(--gray-900)',
                        marginBottom: 'var(--space-md)',
                    }}>
                        Why Choose <span style={{
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>EazyHire</span>
                    </h2>
                    <p className="section-subtitle" style={{
                        fontSize: '18px',
                        color: 'var(--gray-600)',
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}>
                        Experience the difference with our customer-first approach
                    </p>
                </div>
                
                <div className="benefits-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 'var(--space-2xl)',
                }}>
                    {benefits.map((benefit, index) => (
                        <div 
                            key={index}
                            className="benefit-card stagger-item" 
                            data-scroll
                            style={{
                                background: 'var(--white)',
                                borderRadius: 'var(--radius-xl)',
                                padding: 'var(--space-2xl)',
                                textAlign: 'center',
                                transition: 'all 0.3s ease',
                            }}
                        >
                            <div className="benefit-icon" style={{
                                width: '64px',
                                height: '64px',
                                background: 'var(--gradient-subtle)',
                                borderRadius: 'var(--radius-full)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--primary)',
                                fontSize: '24px',
                                margin: '0 auto var(--space-lg)',
                                transition: 'all 0.3s ease',
                            }}>
                                <i className={benefit.icon}></i>
                            </div>
                            <h3 className="benefit-title" style={{
                                fontSize: '18px',
                                color: 'var(--gray-900)',
                                marginBottom: 'var(--space-sm)',
                            }}>
                                {benefit.title}
                            </h3>
                            <p className="benefit-description" style={{
                                color: 'var(--gray-600)',
                                fontSize: '14px',
                            }}>
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;