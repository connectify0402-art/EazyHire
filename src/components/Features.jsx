import React from 'react';

const Features = () => {
    const features = [
        {
            icon: 'fas fa-bolt',
            title: 'Instant Matching',
            description: 'Get connected to the right service provider within seconds of your request.'
        },
        {
            icon: 'fas fa-user-shield',
            title: 'Trusted Providers',
            description: 'Every provider is verified and rated by real customers like you.'
        },
        {
            icon: 'fas fa-headset',
            title: 'Fast Support',
            description: 'Our team is always available to help resolve any issues quickly.'
        }
    ];

    return (
        <section className="section features" id="features" style={{ background: 'var(--gray-50)' }}>
            <div className="container">
                <div className="section-header" data-scroll style={{ textAlign: 'center', marginBottom: 'var(--space-4xl)' }}>
                    <h2 className="section-title" style={{
                        fontSize: '30px',
                        color: 'var(--gray-900)',
                        marginBottom: 'var(--space-md)',
                    }}>
                        Everything You Need, Nothing You Don't
                    </h2>
                    <p className="section-subtitle" style={{
                        fontSize: '15px',
                        color: 'var(--gray-600)',
                        maxWidth: '600px',
                        margin: '0 auto',
                    }}>
                        We've stripped away the complexity to bring you a seamless service experience.
                    </p>
                </div>
                
                <div className="features-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'var(--space-lg)',
                }}>
                    {features.map((feature, index) => (
                        <div 
                            key={index}
                            className="feature-card stagger-item" 
                            data-scroll
                            style={{
                                background: 'var(--white)',
                                borderRadius: 'var(--radius-xl)',
                                padding: 'var(--space-2xl)',
                                boxShadow: 'var(--shadow-sm)',
                                transition: 'all 0.4s ease',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <div className="feature-icon" style={{
                                width: '60px',
                                height: '60px',
                                background: 'var(--gradient-subtle)',
                                borderRadius: 'var(--radius-lg)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'var(--primary)',
                                fontSize: '28px',
                                marginBottom: 'var(--space-lg)',
                                transition: 'all 0.4s ease',
                            }}>
                                <i className={feature.icon}></i>
                            </div>
                            <h3 className="feature-title" style={{
                                fontSize: '18px',
                                color: 'var(--gray-900)',
                                marginBottom: 'var(--space-md)',
                            }}>
                                {feature.title}
                            </h3>
                            <p className="feature-description" style={{
                                fontSize: '15px',
                                color: 'var(--gray-600)',
                                lineHeight: 1.6,
                            }}>
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;