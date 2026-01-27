import React, { useEffect, useState } from 'react';

const Preloader = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className="preloader" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'var(--white)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            transition: 'opacity 0.5s ease',
        }}>
            <div className="loader" style={{
                width: '60px',
                height: '60px',
                border: '4px solid var(--gray-200)',
                borderTopColor: 'var(--primary)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
            }}></div>
        </div>
    );
};

export default Preloader;