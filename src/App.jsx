import React, { useEffect } from 'react';
import Preloader from './components/Preloader';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Challenge from './components/Challenge';
import Benefits from './components/Benefits';
//import Team from './components/Team';
import Waitlist from './components/Waitlist';
import Footer from './components/Footer';
//import ServiceMatchGame from './components/ServiceMatchGame';
//import FuturisticCountdown from './components/FuturisticCountdown';

function App() {
    useEffect(() => {
        // Add Font Awesome
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
        document.head.appendChild(link);

        // Add Google Fonts
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        // Initialize scroll animations
        const initScrollAnimations = () => {
            const scrollElements = document.querySelectorAll('[data-scroll]');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('scroll-in');
                        
                        if (entry.target.classList.contains('stagger-item')) {
                            entry.target.classList.add('animate');
                        }
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });
            
            scrollElements.forEach(el => {
                observer.observe(el);
            });
        };

        // Smooth scroll for anchor links
        const smoothScroll = () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 100,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        };

        // Create bubbles effect
        const createBubbles = () => {
            const container = document.createElement('div');
            container.className = 'bubbles-container';
            container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                overflow: hidden;
                pointer-events: none;
            `;
            document.body.appendChild(container);

            const bubbleCount = 5;
            
            for (let i = 0; i < bubbleCount; i++) {
                const bubble = document.createElement('div');
                
                // Random properties
                const size = Math.random() * 100 + 50;
                const left = Math.random() * 100;
                const duration = Math.random() * 20 + 15;
                const delay = Math.random() * 10;
                const xStart = (Math.random() * 100);
                const xEnd = (Math.random() * 60 - 30);
                
                bubble.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: var(--primary-light);
                    animation: floatUp linear infinite;
                    opacity: 0;
                    filter: blur(50px);
                    will-change: transform;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${left}%;
                    animation-duration: ${duration}s;
                    animation-delay: ${delay}s;
                    --x-start: ${xStart}px;
                    --x-end: ${xEnd}px;
                `;
                
                container.appendChild(bubble);
            }

            // Add animation keyframes
            const style = document.createElement('style');
            style.textContent = `
                @keyframes floatUp {
                    0% {
                        transform: translateY(100vh) translateX(var(--x-start)) scale(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.6;
                    }
                    90% {
                        opacity: 0.3;
                    }
                    100% {
                        transform: translateY(-100px) translateX(var(--x-end)) scale(1);
                        opacity: 0;
                    }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        };

        // Initialize everything
        initScrollAnimations();
        smoothScroll();
        createBubbles();

        // Console welcome
        console.log('%c🚀 EazyHire - Coming Soon 🚀', 'color: #009231; font-size: 18px; font-weight: bold;');
        console.log('%cNigeria\'s premium service marketplace', 'color: #11ACA9; font-size: 14px;');

        return () => {
            // Cleanup if needed
        };
    }, []);

    return (
        <>
            <Preloader />
            <Header />
            <Hero />
            <Features />
            <Challenge />
            <Benefits />
            {/*<FuturisticCountdown />*/}
            {/*<Team />*/}
           {/*} <ServiceMatchGame /> */}
            <Waitlist />
            <Footer />
        </>
    );
}

export default App;