import React, { useState, useEffect, useCallback } from 'react';

const ServiceMatchGame = () => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(45);
    const [gameActive, setGameActive] = useState(false);
    const [currentScenario, setCurrentScenario] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState('');
    const [streak, setStreak] = useState(0);
    const [combo, setCombo] = useState(1);
    const [showStart, setShowStart] = useState(true);
    const [level, setLevel] = useState(1);
    const [hintUsed, setHintUsed] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [usedQuestionIds, setUsedQuestionIds] = useState([]);
    const [gameHistory, setGameHistory] = useState([]);

    // Icons mapping for categories
    const categoryIcons = {
        'Emergency': '⚡',
        'Fashion': '👗',
        'Home': '🏠',
        'Automotive': '🚗',
        'Events': '🎉',
        'Technology': '📱',
        'Construction': '🔨',
        'Finance': '💰',
        'Home Repair': '🔧',
        'Food': '🍛',
        'Education': '📚',
        'Health': '🏥',
        'Cleaning': '🧹',
        'Transport': '🚚'
    };

    // Nigerian service scenarios with more questions and proper icons
    const scenarios = [
        {
            id: 1,
            description: "Your 'I-better-pass-my-neighbour' stopped working during light outage. Call...",
            correct: "Generator Repair Expert",
            wrongAnswers: ["Tailor", "Pastor", "Mobile Money Agent", "Barber", "DJ", "Farmer"],
            hint: "Fixes small power generators",
            category: "Emergency",
            difficulty: 1,
            icon: '⚡'
        },
        {
            id: 2,
            description: "Need beautiful Ankara fabric for upcoming owambe. Find...",
            correct: "Fashion Designer",
            wrongAnswers: ["Carpenter", "Plumber", "Taxi Driver", "Electrician", "Mechanic", "Painter"],
            hint: "Creates custom traditional outfits",
            category: "Fashion",
            difficulty: 1,
            icon: '👗'
        },
        {
            id: 3,
            description: "Your pot of jollof rice is burning because gas cooker faulty. Contact...",
            correct: "Gas Cooker Technician",
            wrongAnswers: ["Hairdresser", "DJ", "Real Estate Agent", "Photographer", "Videographer", "Accountant"],
            hint: "Repairs kitchen cooking appliances",
            category: "Home",
            difficulty: 2,
            icon: '🍛'
        },
        {
            id: 4,
            description: "Car AC not working in traffic, need cold air. You need...",
            correct: "Auto AC Specialist",
            wrongAnswers: ["Shoe Maker", "Event Planner", "Barber", "Teacher", "Nurse", "Security Guard"],
            hint: "Fixes vehicle cooling systems",
            category: "Automotive",
            difficulty: 2,
            icon: '🚗'
        },
        {
            id: 5,
            description: "Planning big naming ceremony, need food and drinks. Hire...",
            correct: "Event Caterer",
            wrongAnswers: ["Computer Engineer", "Security Guard", "Keke Driver", "Journalist", "Lawyer", "Architect"],
            hint: "Provides food service for events",
            category: "Events",
            difficulty: 2,
            icon: '🎉'
        },
        {
            id: 6,
            description: "Phone fell in water during rainfall, need fixing. Take to...",
            correct: "Phone Technician",
            wrongAnswers: ["Bricklayer", "Farmer", "Bus Conductor", "Fisherman", "Gardener", "Cleaner"],
            hint: "Repairs mobile device damage",
            category: "Technology",
            difficulty: 1,
            icon: '📱'
        },
        {
            id: 7,
            description: "Building new apartment in estate, need construction help. Hire...",
            correct: "Building Contractor",
            wrongAnswers: ["Makeup Artist", "Fisherman", "Motorcycle Mechanic", "Waiter", "Cook", "Driver"],
            hint: "Manages construction projects",
            category: "Construction",
            difficulty: 3,
            icon: '🔨'
        },
        {
            id: 8,
            description: "Need to send money to village urgently. Use...",
            correct: "POS/Banking Agent",
            wrongAnswers: ["Painter", "Cleaner", "Yam Seller", "Trader", "Hawker", "Vendor"],
            hint: "Handles money transfers",
            category: "Finance",
            difficulty: 1,
            icon: '💰'
        },
        {
            id: 9,
            description: "Roof leaking seriously during rainy season. Call...",
            correct: "Roofer",
            wrongAnswers: ["DJ", "Tailor", "Bricklayer", "Musician", "Artist", "Dancer"],
            hint: "Fixes building roofs",
            category: "Home Repair",
            difficulty: 2,
            icon: '🔧'
        },
        {
            id: 10,
            description: "Want to learn how to make proper suya. Find...",
            correct: "Suya Master",
            wrongAnswers: ["Accountant", "Driver", "Teacher", "Nurse", "Doctor", "Pharmacist"],
            hint: "Specializes in grilled meat",
            category: "Food",
            difficulty: 2,
            icon: '🍢'
        },
        {
            id: 11,
            description: "Child failing mathematics, need extra lessons. Contact...",
            correct: "Maths Tutor",
            wrongAnswers: ["Mechanic", "Tailor", "Driver", "Cleaner", "Security", "Waiter"],
            hint: "Provides personalized math instruction",
            category: "Education",
            difficulty: 1,
            icon: '📚'
        },
        {
            id: 12,
            description: "Need professional cleaning for new apartment. Book...",
            correct: "Professional Cleaner",
            wrongAnswers: ["Chef", "Driver", "Gardener", "Barber", "DJ", "Photographer"],
            hint: "Specializes in thorough cleaning services",
            category: "Cleaning",
            difficulty: 1,
            icon: '🧹'
        },
        {
            id: 13,
            description: "Moving to new house, need transport for furniture. Hire...",
            correct: "Moving Van Service",
            wrongAnswers: ["Taxi Driver", "Motorcyclist", "Keke Driver", "Bus Driver", "Pilot", "Captain"],
            hint: "Provides transportation for household items",
            category: "Transport",
            difficulty: 2,
            icon: '🚚'
        },
        {
            id: 14,
            description: "Feeling sick, need medical checkup. Visit...",
            correct: "Medical Doctor",
            wrongAnswers: ["Lawyer", "Engineer", "Architect", "Accountant", "Teacher", "Banker"],
            hint: "Professional healthcare provider",
            category: "Health",
            difficulty: 1,
            icon: '🏥'
        },
        {
            id: 15,
            description: "Need to install security cameras at home. Contact...",
            correct: "Security System Installer",
            wrongAnswers: ["Electrician", "Plumber", "Carpenter", "Painter", "Mason", "Welder"],
            hint: "Sets up surveillance equipment",
            category: "Home",
            difficulty: 3,
            icon: '📹'
        },
        {
            id: 16,
            description: "Computer crashed, lost important documents. Need...",
            correct: "Computer Technician",
            wrongAnswers: ["Phone Repairer", "TV Repairer", "Radio Technician", "Generator Mechanic", "AC Repairer", "Fridge Technician"],
            hint: "Repairs and recovers computer data",
            category: "Technology",
            difficulty: 2,
            icon: '💻'
        },
        {
            id: 17,
            description: "Need to make traditional hair for wedding. Book...",
            correct: "Hair Stylist",
            wrongAnswers: ["Makeup Artist", "Nail Technician", "Spa Therapist", "Massage Therapist", "Yoga Instructor", "Fitness Trainer"],
            hint: "Specializes in hair styling and braiding",
            category: "Fashion",
            difficulty: 1,
            icon: '💇'
        },
        {
            id: 18,
            description: "Garden overgrown with weeds, need maintenance. Hire...",
            correct: "Gardener",
            wrongAnswers: ["Farmer", "Fisherman", "Hunter", "Butcher", "Baker", "Chef"],
            hint: "Maintains and beautifies outdoor spaces",
            category: "Home",
            difficulty: 1,
            icon: '🌿'
        },
        {
            id: 19,
            description: "Need legal documents reviewed for business. Consult...",
            correct: "Lawyer",
            wrongAnswers: ["Accountant", "Banker", "Insurance Agent", "Real Estate Agent", "Stock Broker", "Auditor"],
            hint: "Provides legal advice and document review",
            category: "Finance",
            difficulty: 3,
            icon: '⚖️'
        },
        {
            id: 20,
            description: "Water not flowing from tap in kitchen. Call...",
            correct: "Plumber",
            wrongAnswers: ["Electrician", "Carpenter", "Mason", "Painter", "Welder", "Mechanic"],
            hint: "Fixes water pipe and drainage issues",
            category: "Home Repair",
            difficulty: 2,
            icon: '🚿'
        }
    ];

    // Extra wrong answers pool
    const extraWrongAnswers = useCallback(() => [
        "Social Media Manager", "Content Creator", "SEO Specialist",
        "Digital Marketer", "Graphic Designer", "Video Editor",
        "Photographer", "Videographer", "Event MC",
        "Musician", "Dancer", "Actor",
        "Sports Coach", "Fitness Instructor", "Yoga Teacher",
        "Nutritionist", "Dietitian", "Therapist",
        "Interior Designer", "Landscape Architect", "Urban Planner",
        "Real Estate Agent", "Property Manager", "Estate Surveyor",
        "Insurance Agent", "Stock Broker", "Financial Advisor",
        "Travel Agent", "Tour Guide", "Hotel Manager",
        "Restaurant Manager", "Chef", "Baker",
        "Bartender", "Waiter", "Host"
    ], []);

    // Shuffle array function
    const shuffleArray = useCallback((array) => {
        return [...array].sort(() => Math.random() - 0.5);
    }, []);

    // Get random wrong answers from both scenario-specific and general pool
    const getRandomWrongAnswers = useCallback((scenario) => {
        const wrongAnswersList = extraWrongAnswers();
        // Combine scenario-specific wrong answers with random ones from pool
        const allWrongAnswers = [
            ...scenario.wrongAnswers,
            ...wrongAnswersList.filter(answer => 
                answer !== scenario.correct && 
                !scenario.wrongAnswers.includes(answer)
            )
        ];
        
        // Shuffle and take 5 wrong answers (more options)
        const shuffled = shuffleArray(allWrongAnswers);
        return shuffled.slice(0, 5);
    }, [extraWrongAnswers, shuffleArray]);

    // Get next scenario - avoids repeats
    const getNextScenario = useCallback(() => {
        const available = scenarios.filter(s => 
            s.difficulty <= level && 
            !usedQuestionIds.includes(s.id)
        );
        
        // If we've used all questions at this level, reset used questions
        if (available.length === 0) {
            setUsedQuestionIds([]);
            const resetAvailable = scenarios.filter(s => s.difficulty <= level);
            const randomScenario = resetAvailable[Math.floor(Math.random() * resetAvailable.length)];
            setUsedQuestionIds([randomScenario.id]);
            
            const wrongs = getRandomWrongAnswers(randomScenario);
            const allAnswers = shuffleArray([randomScenario.correct, ...wrongs]);
            
            return {
                ...randomScenario,
                options: allAnswers,
                correctIndex: allAnswers.indexOf(randomScenario.correct)
            };
        }
        
        const randomScenario = available[Math.floor(Math.random() * available.length)];
        setUsedQuestionIds(prev => [...prev, randomScenario.id]);
        
        // Get 5 wrong answers
        const wrongs = getRandomWrongAnswers(randomScenario);
        
        // Combine and shuffle all answers (now total of 6 options)
        const allAnswers = shuffleArray([randomScenario.correct, ...wrongs]);
        const correctIndex = allAnswers.indexOf(randomScenario.correct);
        
        return {
            ...randomScenario,
            options: allAnswers,
            correctIndex
        };
    }, [level, usedQuestionIds, getRandomWrongAnswers, shuffleArray, scenarios]);

    // Start game
    const startGame = useCallback(() => {
        setScore(0);
        setTimeLeft(45);
        setGameActive(true);
        setGameOver(false);
        setStreak(0);
        setCombo(1);
        setLevel(1);
        setShowStart(false);
        setSelectedAnswer(null);
        setFeedback('');
        setHintUsed(false);
        setUsedQuestionIds([]);
        setGameHistory([]);
        
        const firstScenario = getNextScenario();
        setCurrentScenario(firstScenario);
        
        // Haptic feedback
        if (navigator.vibrate) navigator.vibrate(30);
    }, [getNextScenario]);

    // Handle answer selection
    const handleAnswer = useCallback((answerIndex) => {
        if (!gameActive || selectedAnswer !== null || !currentScenario) return;

        setSelectedAnswer(answerIndex);
        
        // Immediate haptic feedback
        if (navigator.vibrate) navigator.vibrate(20);

        const isCorrect = answerIndex === currentScenario.correctIndex;
        
        // Add to game history
        setGameHistory(prev => [...prev, {
            question: currentScenario.description,
            correct: currentScenario.correct,
            selected: currentScenario.options[answerIndex],
            isCorrect,
            timestamp: Date.now()
        }]);

        if (isCorrect) {
            const points = currentScenario.difficulty * 50 * combo;
            setScore(prev => prev + points);
            setStreak(prev => prev + 1);
            
            // Increase combo for streaks
            if (streak >= 2) {
                setCombo(prev => Math.min(prev + 0.5, 3));
            }
            
            // Level up every 5 correct answers
            if ((streak + 1) % 5 === 0) {
                setLevel(prev => Math.min(prev + 1, 3));
                if (navigator.vibrate) navigator.vibrate([30, 20, 30]);
            }
            
            setFeedback(`✓ Correct! +${points} points`);
            if (navigator.vibrate) navigator.vibrate([20, 10, 20]);
        } else {
            setStreak(0);
            setCombo(1);
            setFeedback(`✗ Wrong! The correct answer was: ${currentScenario.correct}`);
            setTimeLeft(prev => Math.max(0, prev - 5));
            if (navigator.vibrate) navigator.vibrate([70, 40, 70]);
        }

        // Quick transition
        setTimeout(() => {
            if (timeLeft > 0) {
                setSelectedAnswer(null);
                setFeedback('');
                setHintUsed(false);
                const nextScenario = getNextScenario();
                setCurrentScenario(nextScenario);
            }
        }, 1200);
    }, [gameActive, selectedAnswer, currentScenario, combo, streak, timeLeft, getNextScenario]);

    // Show hint
    const showHint = useCallback(() => {
        if (!hintUsed && currentScenario) {
            setHintUsed(true);
            setFeedback(`💡 Hint: ${currentScenario.hint}`);
            if (navigator.vibrate) navigator.vibrate(10);
        }
    }, [hintUsed, currentScenario]);

    // Timer
    useEffect(() => {
        let timer;
        if (gameActive && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setGameActive(false);
                        setGameOver(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [gameActive, timeLeft]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!gameActive || selectedAnswer !== null) return;

            if (e.key >= '1' && e.key <= '6') {
                const index = parseInt(e.key) - 1;
                if (currentScenario?.options[index]) {
                    handleAnswer(index);
                }
            }

            if (e.key === 'h' || e.key === 'H') showHint();
            if (e.key === ' ' && gameOver) startGame();
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameActive, selectedAnswer, handleAnswer, showHint, gameOver, startGame, currentScenario]);

    // Format time
    const formatTime = useCallback((seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }, []);

    // Calculate accuracy
    const calculateAccuracy = useCallback(() => {
        if (gameHistory.length === 0) return 0;
        const correctAnswers = gameHistory.filter(q => q.isCorrect).length;
        return Math.round((correctAnswers / gameHistory.length) * 100);
    }, [gameHistory]);

    // Game over message
    const getGameOverMessage = useCallback(() => {
        const accuracy = calculateAccuracy();
        if (score > 800 && accuracy > 80) return "🏆 Service Guru Master!";
        if (score > 500 && accuracy > 70) return "⭐ Excellent Performance!";
        if (score > 300 && accuracy > 60) return "🎯 Good Job!";
        if (score > 100) return "👍 Well Done!";
        return "💪 Keep Practicing!";
    }, [score, calculateAccuracy]);

    // Get performance details
    const getPerformanceDetails = useCallback(() => {
        const accuracy = calculateAccuracy();
        if (accuracy === 100) return "Perfect score! You're a true service expert!";
        if (accuracy >= 80) return "Outstanding knowledge of service providers!";
        if (accuracy >= 60) return "Good understanding of local services.";
        if (accuracy >= 40) return "Fair knowledge, keep learning!";
        return "Keep practicing to improve your service knowledge.";
    }, [calculateAccuracy]);

    // Restart game
    const restartGame = () => {
        setShowStart(true);
        setGameOver(false);
        if (navigator.vibrate) navigator.vibrate(30);
    };

    return (
        <div style={{
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 100, 0, 0.1)',
            border: '1px solid #e0f0e0',
            fontFamily: "'Inter', -apple-system, sans-serif",
            position: 'relative',
            minHeight: '600px'
        }}>
            {/* Game Header */}
            <div style={{
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: 'white',
                padding: '16px 20px',
                textAlign: 'center',
                position: 'relative'
            }}>
                <h3 style={{
                    margin: 0,
                    fontSize: '18px',
                    fontWeight: '700',
                    letterSpacing: '0.5px'
                }}>
                    Service Match Challenge
                </h3>
                <p style={{
                    margin: '4px 0 0',
                    fontSize: '13px',
                    opacity: 0.9
                }}>
                    {gameActive ? `${scenarios.length} service scenarios` : 'Match scenarios with providers'}
                </p>
            </div>

            {/* Stats Bar */}
            {gameActive && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    background: '#f9fafb',
                    borderBottom: '1px solid #e5e7eb'
                }}>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                        <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '2px' }}>SCORE</div>
                        <div style={{ fontSize: '20px', fontWeight: '800', color: '#059669' }}>{score}</div>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                        <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '2px' }}>TIME</div>
                        <div style={{ 
                            fontSize: '20px', 
                            fontWeight: '800', 
                            color: timeLeft < 10 ? '#EF4444' : '#059669',
                            animation: timeLeft < 10 ? 'pulse 1s infinite' : 'none'
                        }}>
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', flex: 1 }}>
                        <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '2px' }}>COMBO</div>
                        <div style={{ 
                            fontSize: '20px', 
                            fontWeight: '800', 
                            color: combo > 1 ? '#8B5CF6' : '#059669'
                        }}>
                            {combo > 1 ? `x${combo}` : '-'}
                        </div>
                    </div>
                </div>
            )}

            {/* Start Screen */}
            {showStart && !gameOver && (
                <div style={{ padding: '24px 20px', textAlign: 'center' }}>
                    <div style={{ 
                        fontSize: '48px', 
                        marginBottom: '16px',
                        color: '#10B981'
                    }}>🎯</div>
                    <h4 style={{ 
                        color: '#1F2937', 
                        marginBottom: '12px',
                        fontSize: '20px',
                        fontWeight: '600'
                    }}>
                        Service Match Challenge
                    </h4>
                    <p style={{ 
                        color: '#6B7280', 
                        fontSize: '14px',
                        lineHeight: '1.5',
                        marginBottom: '24px'
                    }}>
                        Test your knowledge of service providers with {scenarios.length} real-life scenarios!
                    </p>
                    
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                        marginBottom: '24px'
                    }}>
                        {[
                            { icon: '🔍', text: 'Read scenario' },
                            { icon: '✅', text: 'Select provider' },
                            { icon: '⚡', text: '45 seconds' },
                            { icon: '🔥', text: 'Build combos' }
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                padding: '12px',
                                background: '#f0f9f0',
                                borderRadius: '10px',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '20px', marginBottom: '6px' }}>{item.icon}</div>
                                <div style={{ fontSize: '12px', color: '#059669', fontWeight: '500' }}>{item.text}</div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={startGame}
                        style={{
                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                            color: 'white',
                            border: 'none',
                            width: '100%',
                            padding: '16px',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                            transition: 'transform 0.2s'
                        }}
                        onTouchStart={(e) => {
                            e.currentTarget.style.transform = 'scale(0.98)';
                            if (navigator.vibrate) navigator.vibrate(30);
                        }}
                        onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Start Game
                    </button>
                    
                    <div style={{ 
                        marginTop: '16px', 
                        fontSize: '12px', 
                        color: '#9CA3AF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}>
                        <span>Tap options or press 1-6 keys</span>
                    </div>
                </div>
            )}

            {/* Game Area */}
            {!showStart && gameActive && currentScenario && (
                <div style={{ padding: '20px' }}>
                    {/* Scenario Card */}
                    <div style={{
                        background: '#f9fafb',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '20px',
                        border: '1px solid #e5e7eb',
                        position: 'relative'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '12px'
                        }}>
                            <div style={{
                                background: '#10B981',
                                color: 'white',
                                width: '50px',
                                height: '50px',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '24px',
                                flexShrink: 0
                            }}>
                                {currentScenario.icon || categoryIcons[currentScenario.category] || '🔧'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    fontSize: '12px',
                                    color: '#10B981',
                                    fontWeight: '600',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    marginBottom: '4px'
                                }}>
                                    {currentScenario.category}
                                </div>
                                <div style={{
                                    fontSize: '14px',
                                    color: '#1F2937',
                                    fontWeight: '500',
                                    lineHeight: '1.4'
                                }}>
                                    {currentScenario.description}
                                </div>
                            </div>
                        </div>
                        
                        {/* Difficulty & Progress */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '12px'
                        }}>
                            <div style={{
                                background: currentScenario.difficulty === 1 ? '#D1FAE5' : 
                                          currentScenario.difficulty === 2 ? '#FEF3C7' : '#FEE2E2',
                                color: currentScenario.difficulty === 1 ? '#059669' : 
                                       currentScenario.difficulty === 2 ? '#D97706' : '#DC2626',
                                padding: '4px 10px',
                                borderRadius: '20px',
                                fontSize: '11px',
                                fontWeight: '600'
                            }}>
                                Level {currentScenario.difficulty}
                            </div>
                            <div style={{
                                fontSize: '11px',
                                color: '#6B7280'
                            }}>
                                {usedQuestionIds.length}/{scenarios.length} questions
                            </div>
                        </div>
                    </div>

                    {/* Answer Options - Now 6 options */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        marginBottom: '16px'
                    }}>
                        {currentScenario.options.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const isCorrect = index === currentScenario.correctIndex;
                            
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    disabled={selectedAnswer !== null}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        background: isSelected 
                                            ? (isCorrect ? '#D1FAE5' : '#FEE2E2')
                                            : 'white',
                                        border: isSelected
                                            ? (isCorrect ? '2px solid #10B981' : '2px solid #EF4444')
                                            : '2px solid #E5E7EB',
                                        borderRadius: '10px',
                                        textAlign: 'left',
                                        cursor: selectedAnswer === null ? 'pointer' : 'default',
                                        fontSize: '14px',
                                        color: isSelected 
                                            ? (isCorrect ? '#059669' : '#DC2626')
                                            : '#1F2937',
                                        fontWeight: isSelected ? '600' : '500',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        touchAction: 'manipulation',
                                        minHeight: '54px'
                                    }}
                                    onTouchStart={(e) => {
                                        if (selectedAnswer === null) {
                                            e.currentTarget.style.transform = 'scale(0.98)';
                                        }
                                    }}
                                    onTouchEnd={(e) => {
                                        if (selectedAnswer === null) {
                                            e.currentTarget.style.transform = 'scale(1)';
                                        }
                                    }}
                                >
                                    <div style={{
                                        background: isSelected
                                            ? (isCorrect ? '#10B981' : '#EF4444')
                                            : '#10B981',
                                        color: 'white',
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '700',
                                        fontSize: '14px',
                                        flexShrink: 0
                                    }}>
                                        {index + 1}
                                    </div>
                                    <span style={{ flex: 1, fontSize: '13.5px' }}>{option}</span>
                                    {selectedAnswer !== null && isCorrect && (
                                        <span style={{ color: '#10B981', fontSize: '18px' }}>✓</span>
                                    )}
                                    {isSelected && !isCorrect && (
                                        <span style={{ color: '#EF4444', fontSize: '18px' }}>✗</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Feedback & Controls */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '16px'
                    }}>
                        {feedback && (
                            <div style={{
                                flex: 1,
                                background: feedback.includes('✓') ? '#D1FAE5' : 
                                          feedback.includes('✗') ? '#FEE2E2' : 
                                          '#E0E7FF',
                                border: feedback.includes('✓') ? '1px solid #A7F3D0' : 
                                        feedback.includes('✗') ? '1px solid #FECACA' : 
                                        '1px solid #C7D2FE',
                                color: feedback.includes('✓') ? '#065F46' : 
                                       feedback.includes('✗') ? '#991B1B' : 
                                       '#3730A3',
                                padding: '12px',
                                borderRadius: '8px',
                                fontSize: '13px',
                                fontWeight: '600',
                                textAlign: 'center'
                            }}>
                                {feedback}
                            </div>
                        )}
                        
                        {!hintUsed && selectedAnswer === null && (
                            <button
                                onClick={showHint}
                                style={{
                                    background: '#EEF2FF',
                                    color: '#4F46E5',
                                    border: '1px solid #C7D2FE',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    flexShrink: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    touchAction: 'manipulation'
                                }}
                                onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                                onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                💡 Hint
                            </button>
                        )}
                    </div>

                    {/* Streak Indicator */}
                    {streak > 1 && (
                        <div style={{
                            background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                            border: '1px solid #FCD34D',
                            padding: '10px',
                            borderRadius: '8px',
                            textAlign: 'center',
                            marginBottom: '16px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                color: '#92400E',
                                fontSize: '13px',
                                fontWeight: '600'
                            }}>
                                <span>🔥</span>
                                <span>{streak} correct in a row!</span>
                                {combo > 1 && (
                                    <span style={{
                                        background: '#8B5CF6',
                                        color: 'white',
                                        padding: '2px 8px',
                                        borderRadius: '12px',
                                        fontSize: '11px',
                                        marginLeft: '6px'
                                    }}>
                                        x{combo} Combo
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Game Over Screen */}
            {gameOver && (
                <div style={{
                    padding: '24px 20px',
                    textAlign: 'center',
                    background: 'white',
                    minHeight: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px', color: '#10B981' }}>
                        {score > 500 ? '🏆' : score > 300 ? '⭐' : '🎯'}
                    </div>
                    
                    <h4 style={{ 
                        color: '#1F2937', 
                        marginBottom: '8px',
                        fontSize: '22px',
                        fontWeight: '700'
                    }}>
                        {getGameOverMessage()}
                    </h4>
                    
                    <div style={{ 
                        color: '#6B7280', 
                        fontSize: '14px',
                        marginBottom: '24px'
                    }}>
                        {getPerformanceDetails()}
                    </div>
                    
                    <div style={{
                        fontSize: '52px',
                        fontWeight: '800',
                        color: '#059669',
                        marginBottom: '32px',
                        textShadow: '0 4px 8px rgba(16, 185, 129, 0.2)'
                    }}>
                        {score}
                    </div>
                    
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '12px',
                        marginBottom: '32px'
                    }}>
                        <div style={{
                            background: '#F0F9F0',
                            padding: '16px',
                            borderRadius: '10px',
                            border: '1px solid #D1FAE5'
                        }}>
                            <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '6px', fontWeight: '600' }}>QUESTIONS</div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#10B981' }}>{gameHistory.length}</div>
                        </div>
                        <div style={{
                            background: '#F0F9F0',
                            padding: '16px',
                            borderRadius: '10px',
                            border: '1px solid #D1FAE5'
                        }}>
                            <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '6px', fontWeight: '600' }}>ACCURACY</div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#10B981' }}>{calculateAccuracy()}%</div>
                        </div>
                        <div style={{
                            background: '#F0F9F0',
                            padding: '16px',
                            borderRadius: '10px',
                            border: '1px solid #D1FAE5'
                        }}>
                            <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '6px', fontWeight: '600' }}>BEST STREAK</div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#10B981' }}>{Math.max(0, streak)}</div>
                        </div>
                        <div style={{
                            background: '#F0F9F0',
                            padding: '16px',
                            borderRadius: '10px',
                            border: '1px solid #D1FAE5'
                        }}>
                            <div style={{ fontSize: '11px', color: '#6B7280', marginBottom: '6px', fontWeight: '600' }}>HIGHEST COMBO</div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: '#10B981' }}>x{combo > 1 ? combo.toFixed(1) : '1'}</div>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button
                            onClick={restartGame}
                            style={{
                                flex: 1,
                                background: '#EEF2FF',
                                color: '#4F46E5',
                                border: '1px solid #C7D2FE',
                                padding: '16px',
                                borderRadius: '12px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'transform 0.2s'
                            }}
                            onTouchStart={(e) => {
                                e.currentTarget.style.transform = 'scale(0.98)';
                                if (navigator.vibrate) navigator.vibrate(20);
                            }}
                            onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Menu
                        </button>
                        <button
                            onClick={startGame}
                            style={{
                                flex: 2,
                                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '16px',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                                transition: 'transform 0.2s'
                            }}
                            onTouchStart={(e) => {
                                e.currentTarget.style.transform = 'scale(0.98)';
                                if (navigator.vibrate) navigator.vibrate(30);
                            }}
                            onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Play Again
                        </button>
                    </div>
                    
                    <div style={{ 
                        marginTop: '16px', 
                        fontSize: '12px', 
                        color: '#9CA3AF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}>
                        <span>Press SPACE to restart</span>
                    </div>
                </div>
            )}

            {/* CSS Animation for pulsing timer */}
            <style>
                {`
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                `}
            </style>
        </div>
    );
};

export default ServiceMatchGame;