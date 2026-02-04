import React, { useState, useEffect, useRef, useCallback } from 'react';

const ServiceMatchGame = () => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameActive, setGameActive] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [currentService, setCurrentService] = useState('');
    const [currentProvider, setCurrentProvider] = useState('');
    const [options, setOptions] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [highScore, setHighScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [combo, setCombo] = useState(1);
    const [showTutorial, setShowTutorial] = useState(true);
    const [scoreHistory, setScoreHistory] = useState([]);
    const [powerUps, setPowerUps] = useState([]);
    const [difficulty, setDifficulty] = useState('easy');
    const [shake, setShake] = useState(false);
    const [pulse, setPulse] = useState(false);
    const [confetti, setConfetti] = useState([]);

    const timerRef = useRef(null);
    const gameAreaRef = useRef(null);
    const confettiContainerRef = useRef(null);

    // Service and provider data with green theme
    const services = [
        { name: 'Plumbing', provider: 'Expert Plumber', icon: '🔧', color: '#10b981' },
        { name: 'Electrical', provider: 'Certified Electrician', icon: '⚡', color: '#059669' },
        { name: 'Cleaning', provider: 'Professional Cleaner', icon: '🧹', color: '#34d399' },
        { name: 'Tutoring', provider: 'Qualified Tutor', icon: '📚', color: '#059669' },
        { name: 'Catering', provider: 'Master Chef', icon: '🍽️', color: '#10b981' },
        { name: 'Repair', provider: 'Tech Specialist', icon: '🔨', color: '#34d399' },
        { name: 'Delivery', provider: 'Fast Courier', icon: '📦', color: '#059669' },
        { name: 'Gardening', provider: 'Landscape Expert', icon: '🌿', color: '#10b981' },
        { name: 'Design', provider: 'Creative Designer', icon: '🎨', color: '#34d399' },
        { name: 'Fitness', provider: 'Personal Trainer', icon: '💪', color: '#059669' },
    ];

    const providers = [
        'Expert Plumber', 'Certified Electrician', 'Professional Cleaner',
        'Qualified Tutor', 'Master Chef', 'Tech Specialist',
        'Fast Courier', 'Landscape Expert', 'Creative Designer',
        'Personal Trainer', 'Handyman Pro', 'Senior Technician',
        'Home Organizer', 'Maths Whiz', 'Sous Chef'
    ];

    // Power-ups
    const powerUpTypes = [
        { id: 'time', name: '+5 Sec', icon: '⏱️', color: '#10b981' },
        { id: 'double', name: '2x Points', icon: '✨', color: '#059669' },
        { id: 'freeze', name: 'Freeze', icon: '❄️', color: '#34d399' },
    ];

    const initializeGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameActive(true);
        setGameOver(false);
        setStreak(0);
        setCombo(1);
        setFeedback('');
        setPowerUps([]);
        setConfetti([]); // Clear confetti
        generateNewQuestion();
        
        if (gameAreaRef.current) {
            gameAreaRef.current.focus();
        }
    };

    const generateNewQuestion = () => {
        const randomService = services[Math.floor(Math.random() * services.length)];
        setCurrentService(randomService);
        
        const correctProvider = randomService.provider;
        let numOptions = 4;
        
        if (difficulty === 'hard') {
            numOptions = 6;
        } else if (difficulty === 'medium') {
            numOptions = 5;
        }
        
        const incorrectProviders = providers
            .filter(p => p !== correctProvider)
            .sort(() => Math.random() - 0.5)
            .slice(0, numOptions - 1);
        
        const allOptions = [correctProvider, ...incorrectProviders]
            .sort(() => Math.random() - 0.5);
        
        setOptions(allOptions);
        setCurrentProvider(correctProvider);
    };

    // Define activatePowerUp as a regular function
    const activatePowerUp = useCallback((powerUpId) => {
        switch(powerUpId) {
            case 'time':
                setTimeLeft(prev => prev + 5);
                break;
            case 'double':
                // Already applied in scoring logic
                break;
            case 'freeze':
                setTimeLeft(prev => prev + 3);
                break;
        }
        
        setPowerUps(prev => prev.filter(p => p.id !== powerUpId));
    }, []);

    const handleAnswer = (selectedProvider) => {
        if (!gameActive || gameOver) return;

        const isCorrect = selectedProvider === currentProvider;
        
        if (isCorrect) {
            let points = 10 * combo;
            
            const doublePowerUp = powerUps.find(p => p.id === 'double');
            if (doublePowerUp) {
                points *= 2;
            }
            
            setScore(prev => prev + points);
            setStreak(prev => {
                const newStreak = prev + 1;
                if (newStreak >= 3) {
                    setCombo(Math.min(combo + 1, 5));
                }
                
                if (newStreak % 5 === 0 && Math.random() > 0.5) {
                    const randomPowerUp = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
                    setPowerUps(prev => [...prev, {
                        ...randomPowerUp,
                        expires: Date.now() + 10000
                    }]);
                }
                
                return newStreak;
            });
            
            setFeedback(`Perfect Match! +${points} points! 🔥`);
            setPulse(true);
            setTimeout(() => setPulse(false), 500);
            
        } else {
            setStreak(0);
            setCombo(1);
            setFeedback(`Wrong match! -5 seconds ⚡`);
            setShake(true);
            setTimeout(() => setShake(false), 500);
            
            setTimeLeft(prev => Math.max(0, prev - 5));
            setPowerUps([]);
        }

        setTimeout(() => setFeedback(''), 1500);
        setTimeout(generateNewQuestion, 500);
    };

    const handleKeyPress = useCallback((e) => {
        if (!gameActive) return;
        
        const key = parseInt(e.key);
        if (key >= 1 && key <= 6) {
            const selectedProvider = options[key - 1];
            if (selectedProvider) {
                handleAnswer(selectedProvider);
            }
        }
        
        // Power-up keys
        if (['q', 'w', 'e'].includes(e.key)) {
            const powerUpIndex = ['q', 'w', 'e'].indexOf(e.key);
            if (powerUps[powerUpIndex]) {
                activatePowerUp(powerUps[powerUpIndex].id);
            }
        }
        
        if (gameOver && e.key === ' ') {
            initializeGame();
        }
    }, [gameActive, gameOver, options, powerUps, activatePowerUp]);

    useEffect(() => {
        if (gameActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        endGame();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [gameActive, timeLeft]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    useEffect(() => {
        const interval = setInterval(() => {
            setPowerUps(prev => prev.filter(p => p.expires > Date.now()));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Cleanup confetti after animation
    useEffect(() => {
        if (confetti.length > 0) {
            const timer = setTimeout(() => {
                setConfetti([]);
            }, 3000);
            
            return () => clearTimeout(timer);
        }
    }, [confetti]);

    const triggerConfetti = () => {
        const colors = ['#10b981', '#34d399', '#059669', '#a7f3d0'];
        const newConfetti = [];
        
        for (let i = 0; i < 30; i++) {
            newConfetti.push({
                id: Date.now() + i,
                left: Math.random() * 100,
                color: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 0.5,
                size: 6 + Math.random() * 6,
                shape: Math.random() > 0.5 ? 'circle' : 'square'
            });
        }
        
        setConfetti(newConfetti);
    };

    const endGame = () => {
        setGameActive(false);
        setGameOver(true);
        
        if (score > highScore) {
            setHighScore(score);
            setFeedback(`🎉 New High Score: ${score}! 🎉`);
        } else {
            setFeedback(`Game Over! Final Score: ${score}`);
        }
        
        setScoreHistory(prev => [score, ...prev.slice(0, 4)]);
        
        if (score > 100) {
            triggerConfetti();
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Mobile touch handler
    const handleTouchStart = (provider) => {
        if (gameActive) {
            handleAnswer(provider);
        }
    };

    return (
        <section className="game-section" style={{
            padding: '40px 16px',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '100vh',
        }}>
            {/* Animated background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                    radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.08) 0%, transparent 40%),
                    radial-gradient(circle at 90% 30%, rgba(52, 211, 153, 0.08) 0%, transparent 40%),
                    radial-gradient(circle at 50% 80%, rgba(5, 150, 105, 0.08) 0%, transparent 40%)
                `,
            }}></div>

            {/* Grid pattern */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                    linear-gradient(rgba(16, 185, 129, 0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(16, 185, 129, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
                opacity: 0.5,
            }}></div>

            {/* Confetti Container */}
            <div ref={confettiContainerRef} style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 9999,
                overflow: 'hidden',
            }}>
                {confetti.map((piece) => (
                    <div
                        key={piece.id}
                        style={{
                            position: 'absolute',
                            top: '-20px',
                            left: `${piece.left}%`,
                            width: `${piece.size}px`,
                            height: `${piece.size}px`,
                            background: piece.color,
                            borderRadius: piece.shape === 'circle' ? '50%' : '2px',
                            animation: `confettiFall ${1 + Math.random() * 2}s linear ${piece.delay}s forwards`,
                        }}
                    />
                ))}
            </div>

            <div className="container" style={{
                maxWidth: '600px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 2,
            }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h2 style={{
                        fontSize: '28px',
                        fontWeight: '800',
                        background: 'linear-gradient(90deg, #059669, #10b981)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '8px',
                        padding: '0 16px',
                    }}>
                        Service Match Challenge
                    </h2>
                    <p style={{
                        color: '#059669',
                        fontSize: '14px',
                        lineHeight: 1.5,
                        padding: '0 16px',
                    }}>
                        Match services with the right professional! Perfect your skills while waiting.
                    </p>
                </div>

                {/* Mobile Stats Bar */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    background: 'white',
                    borderRadius: '16px',
                    padding: '16px',
                    marginBottom: '20px',
                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.15)',
                    border: '2px solid #e2e8f0',
                }}>
                    <div style={{ flex: '1 1 calc(50% - 12px)' }}>
                        <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '4px' }}>SCORE</div>
                        <div style={{
                            fontSize: '24px',
                            fontWeight: '800',
                            color: '#059669',
                        }}>{score}</div>
                    </div>
                    
                    <div style={{ flex: '1 1 calc(50% - 12px)' }}>
                        <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '4px' }}>TIME</div>
                        <div style={{
                            fontSize: '24px',
                            fontWeight: '800',
                            color: timeLeft < 10 ? '#ef4444' : '#059669',
                            animation: timeLeft < 10 ? 'pulse 1s infinite' : 'none',
                        }}>{formatTime(timeLeft)}</div>
                    </div>
                    
                    <div style={{ flex: '1 1 calc(50% - 12px)' }}>
                        <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '4px' }}>BEST</div>
                        <div style={{
                            fontSize: '24px',
                            fontWeight: '800',
                            color: '#f59e0b',
                        }}>{highScore}</div>
                    </div>
                    
                    <div style={{ flex: '1 1 calc(50% - 12px)' }}>
                        <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '4px' }}>COMBO</div>
                        <div style={{
                            fontSize: '24px',
                            fontWeight: '800',
                            color: combo > 1 ? '#8b5cf6' : '#10b981',
                        }}>x{combo}</div>
                    </div>
                </div>

                {/* Streak Indicator */}
                {streak > 0 && (
                    <div style={{
                        textAlign: 'center',
                        marginBottom: '16px',
                        animation: 'slideDown 0.3s ease',
                    }}>
                        <div style={{
                            display: 'inline-block',
                            background: 'linear-gradient(90deg, #10b981, #34d399)',
                            color: 'white',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '14px',
                            fontWeight: '600',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                        }}>
                            🔥 {streak} Perfect Matches!
                        </div>
                    </div>
                )}

                {/* Power-ups */}
                {powerUps.length > 0 && (
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        justifyContent: 'center',
                        marginBottom: '16px',
                        flexWrap: 'wrap',
                    }}>
                        {powerUps.map((powerUp, index) => (
                            <button
                                key={powerUp.id}
                                onClick={() => activatePowerUp(powerUp.id)}
                                style={{
                                    background: 'linear-gradient(135deg, #ffffff, #f0f9ff)',
                                    border: `2px solid ${powerUp.color}`,
                                    borderRadius: '12px',
                                    padding: '8px 12px',
                                    color: powerUp.color,
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                }}
                            >
                                <span style={{ fontSize: '14px' }}>{powerUp.icon}</span>
                                {powerUp.name}
                            </button>
                        ))}
                    </div>
                )}

                {/* Tutorial */}
                {showTutorial && (
                    <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        padding: '24px',
                        marginBottom: '20px',
                        textAlign: 'center',
                        boxShadow: '0 8px 32px rgba(16, 185, 129, 0.1)',
                        border: '2px solid #e2e8f0',
                        animation: 'slideUp 0.5s ease',
                    }}>
                        <h3 style={{ 
                            color: '#059669', 
                            marginBottom: '16px',
                            fontSize: '20px',
                        }}>🎮 How to Play</h3>
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(2, 1fr)', 
                            gap: '12px', 
                            marginBottom: '20px' 
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ 
                                    fontSize: '24px', 
                                    marginBottom: '4px',
                                    background: 'linear-gradient(135deg, #10b981, #34d399)',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 8px',
                                    color: 'white'
                                }}>🎯</div>
                                <div style={{ color: '#475569', fontSize: '12px' }}>Match services</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ 
                                    fontSize: '24px', 
                                    marginBottom: '4px',
                                    background: 'linear-gradient(135deg, #10b981, #34d399)',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 8px',
                                    color: 'white'
                                }}>⚡</div>
                                <div style={{ color: '#475569', fontSize: '12px' }}>Tap to answer</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ 
                                    fontSize: '24px', 
                                    marginBottom: '4px',
                                    background: 'linear-gradient(135deg, #10b981, #34d399)',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 8px',
                                    color: 'white'
                                }}>🔥</div>
                                <div style={{ color: '#475569', fontSize: '12px' }}>Build combos</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ 
                                    fontSize: '24px', 
                                    marginBottom: '4px',
                                    background: 'linear-gradient(135deg, #10b981, #34d399)',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 8px',
                                    color: 'white'
                                }}>⏱️</div>
                                <div style={{ color: '#475569', fontSize: '12px' }}>30 seconds</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                            <button
                                onClick={() => setDifficulty('easy')}
                                style={{
                                    background: difficulty === 'easy' 
                                        ? 'linear-gradient(90deg, #10b981, #34d399)' 
                                        : '#f8fafc',
                                    color: difficulty === 'easy' ? 'white' : '#64748b',
                                    border: difficulty === 'easy' ? 'none' : '2px solid #e2e8f0',
                                    padding: '10px 20px',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    flex: 1,
                                }}
                            >
                                Easy
                            </button>
                            <button
                                onClick={() => setDifficulty('medium')}
                                style={{
                                    background: difficulty === 'medium' 
                                        ? 'linear-gradient(90deg, #10b981, #34d399)' 
                                        : '#f8fafc',
                                    color: difficulty === 'medium' ? 'white' : '#64748b',
                                    border: difficulty === 'medium' ? 'none' : '2px solid #e2e8f0',
                                    padding: '10px 20px',
                                    borderRadius: '12px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    flex: 1,
                                }}
                            >
                                Medium
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                setShowTutorial(false);
                                initializeGame();
                            }}
                            style={{
                                background: 'linear-gradient(90deg, #10b981, #34d399)',
                                color: 'white',
                                border: 'none',
                                padding: '14px 40px',
                                borderRadius: '14px',
                                fontSize: '16px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                width: '100%',
                                marginTop: '20px',
                                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)',
                            }}
                        >
                            START GAME
                        </button>
                    </div>
                )}

                {/* Game Area */}
                {!showTutorial && (
                    <div
                        ref={gameAreaRef}
                        tabIndex={0}
                        style={{
                            outline: 'none',
                            opacity: gameOver ? 0.7 : 1,
                            transition: 'all 0.3s ease',
                        }}
                    >
                        {/* Service Card */}
                        {currentService && (
                            <div style={{
                                background: 'white',
                                border: `3px solid ${currentService.color}`,
                                borderRadius: '20px',
                                padding: '20px',
                                textAlign: 'center',
                                marginBottom: '20px',
                                boxShadow: `0 8px 32px ${currentService.color}20`,
                                animation: pulse ? 'pulseCard 0.5s' : 'none',
                                transform: shake ? 'translateX(10px)' : 'translateX(0)',
                                transition: 'transform 0.3s ease',
                            }}>
                                <div style={{
                                    fontSize: '48px',
                                    marginBottom: '12px',
                                    animation: 'float 3s ease-in-out infinite',
                                }}>
                                    {currentService.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '24px',
                                    color: '#1e293b',
                                    marginBottom: '8px',
                                    fontWeight: '700',
                                }}>
                                    {currentService.name}
                                </h3>
                                <p style={{
                                    color: currentService.color,
                                    fontSize: '14px',
                                    opacity: 0.9,
                                }}>
                                    Find the perfect match for this service
                                </p>
                            </div>
                        )}

                        {/* Options Grid - Mobile Optimized */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                            gap: '12px',
                            marginBottom: '20px',
                        }}>
                            {options.map((provider, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(provider)}
                                    onTouchStart={() => handleTouchStart(provider)}
                                    disabled={!gameActive || gameOver}
                                    style={{
                                        background: 'white',
                                        border: `2px solid ${provider === currentProvider && gameOver ? '#10b981' : '#e2e8f0'}`,
                                        borderRadius: '16px',
                                        padding: '20px 16px',
                                        color: '#1e293b',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: gameActive ? 'pointer' : 'not-allowed',
                                        transition: 'all 0.2s ease',
                                        textAlign: 'left',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        opacity: gameActive ? 1 : 0.7,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                    }}
                                    onTouchEnd={(e) => {
                                        e.currentTarget.style.transform = 'scale(0.98)';
                                        setTimeout(() => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                        }, 100);
                                    }}
                                >
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        background: 'linear-gradient(135deg, #10b981, #34d399)',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: '800',
                                        fontSize: '14px',
                                        flexShrink: 0,
                                    }}>
                                        {index + 1}
                                    </div>
                                    
                                    <div style={{ 
                                        fontSize: '16px',
                                        lineHeight: 1.4,
                                        flex: 1,
                                    }}>
                                        {provider}
                                    </div>
                                    
                                    {provider === currentProvider && gameOver && (
                                        <div style={{
                                            color: '#10b981',
                                            fontSize: '20px',
                                            flexShrink: 0,
                                        }}>
                                            ✅
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Feedback Message */}
                        {feedback && (
                            <div style={{
                                background: feedback.includes('Perfect') 
                                    ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1))'
                                    : 'linear-gradient(90deg, rgba(239, 68, 68, 0.1), rgba(249, 115, 22, 0.1))',
                                border: `2px solid ${feedback.includes('Perfect') ? '#10b981' : '#ef4444'}`,
                                borderRadius: '16px',
                                padding: '16px',
                                textAlign: 'center',
                                marginBottom: '20px',
                                animation: feedback.includes('Perfect') ? 'slideUp 0.3s' : 'shake 0.5s',
                            }}>
                                <span style={{
                                    fontSize: '18px',
                                    fontWeight: '700',
                                    color: feedback.includes('Perfect') ? '#059669' : '#ef4444',
                                }}>
                                    {feedback}
                                </span>
                            </div>
                        )}

                        {/* Game Over Screen */}
                        {gameOver && (
                            <div style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(255, 255, 255, 0.95)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '20px',
                                zIndex: 10,
                                animation: 'fadeIn 0.3s ease',
                            }}>
                                <div style={{
                                    background: 'white',
                                    borderRadius: '24px',
                                    padding: '32px 24px',
                                    textAlign: 'center',
                                    width: '100%',
                                    maxWidth: '400px',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                                    border: '2px solid #10b981',
                                }}>
                                    <h3 style={{
                                        fontSize: '24px',
                                        color: score > highScore ? '#f59e0b' : '#059669',
                                        marginBottom: '16px',
                                        fontWeight: '800',
                                    }}>
                                        {score > highScore ? '🏆 New High Score! 🏆' : 'Game Over'}
                                    </h3>
                                    
                                    <div style={{
                                        fontSize: '48px',
                                        fontWeight: '800',
                                        color: '#10b981',
                                        marginBottom: '16px',
                                        textShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
                                    }}>
                                        {score}
                                    </div>
                                    
                                    {scoreHistory.length > 0 && (
                                        <div style={{
                                            marginBottom: '24px',
                                            padding: '16px',
                                            background: '#f8fafc',
                                            borderRadius: '12px',
                                        }}>
                                            <div style={{ 
                                                color: '#64748b', 
                                                fontSize: '14px', 
                                                marginBottom: '8px' 
                                            }}>
                                                Recent Scores:
                                            </div>
                                            <div style={{ 
                                                display: 'flex', 
                                                gap: '8px', 
                                                justifyContent: 'center' 
                                            }}>
                                                {scoreHistory.slice(0, 3).map((s, i) => (
                                                    <div key={i} style={{
                                                        background: 'linear-gradient(135deg, #10b981, #34d399)',
                                                        color: 'white',
                                                        padding: '8px 12px',
                                                        borderRadius: '8px',
                                                        fontSize: '16px',
                                                        fontWeight: '700',
                                                        minWidth: '60px',
                                                    }}>
                                                        {s}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <button
                                            onClick={() => setShowTutorial(true)}
                                            style={{
                                                background: 'white',
                                                color: '#64748b',
                                                border: '2px solid #e2e8f0',
                                                padding: '14px',
                                                borderRadius: '14px',
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                flex: 1,
                                            }}
                                        >
                                            Menu
                                        </button>
                                        <button
                                            onClick={initializeGame}
                                            style={{
                                                background: 'linear-gradient(90deg, #10b981, #34d399)',
                                                color: 'white',
                                                border: 'none',
                                                padding: '14px',
                                                borderRadius: '14px',
                                                fontSize: '16px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                flex: 1,
                                                boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)',
                                            }}
                                        >
                                            Play Again
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Mobile Controls */}
                        <div style={{
                            display: 'flex',
                            gap: '12px',
                            marginTop: '20px',
                        }}>
                            <button
                                onClick={() => setShowTutorial(true)}
                                style={{
                                    background: 'white',
                                    color: '#64748b',
                                    border: '2px solid #e2e8f0',
                                    padding: '14px',
                                    borderRadius: '14px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    flex: 1,
                                }}
                            >
                                Menu
                            </button>
                            {gameActive && !gameOver && (
                                <button
                                    onClick={endGame}
                                    style={{
                                        background: 'linear-gradient(90deg, #ef4444, #f87171)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '14px',
                                        borderRadius: '14px',
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        flex: 1,
                                    }}
                                >
                                    End Game
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Mobile Instructions */}
                <div style={{
                    marginTop: '24px',
                    padding: '16px',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    textAlign: 'center',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                }}>
                    <div style={{ 
                        color: '#059669', 
                        marginBottom: '8px', 
                        fontSize: '12px',
                        fontWeight: '600',
                    }}>
                        💡 Tap options to match | Swipe up for more
                    </div>
                    <div style={{ 
                        color: '#94a3b8', 
                        fontSize: '11px',
                    }}>
                        Match services with their perfect providers. Build streaks for bonus points!
                    </div>
                </div>
            </div>

            {/* Custom CSS Animations */}
            <style jsx="true">{`
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.05); }
                }
                
                @keyframes pulseCard {
                    0%, 100% { box-shadow: 0 8px 32px rgba(16, 185, 129, 0.2); }
                    50% { box-shadow: 0 12px 40px rgba(16, 185, 129, 0.3); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                }
                
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes slideDown {
                    from { transform: translateY(-20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                
                @keyframes confettiFall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(720deg);
                        opacity: 0;
                    }
                }
                
                @media (max-width: 640px) {
                    .container {
                        padding: 0 8px;
                    }
                    
                    h2 {
                        font-size: 24px !important;
                    }
                    
                    .options-grid {
                        grid-template-columns: 1fr !important;
                    }
                    
                    .stats-bar {
                        padding: 12px !important;
                    }
                }
                
                @media (max-width: 480px) {
                    .game-section {
                        padding: 24px 12px !important;
                    }
                    
                    .service-card {
                        padding: 16px !important;
                    }
                    
                    h2 {
                        font-size: 20px !important;
                    }
                    
                    button {
                        font-size: 14px !important;
                        padding: 12px !important;
                    }
                }
                
                * {
                    -webkit-tap-highlight-color: transparent;
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    user-select: none;
                }
                
                html {
                    scroll-behavior: smooth;
                }
                
                button:active {
                    transform: scale(0.95) !important;
                }
            `}</style>
        </section>
    );
};

export default ServiceMatchGame;