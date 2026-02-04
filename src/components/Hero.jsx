import React, { useEffect, useRef, useState } from 'react';
import '../styles/Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);
  const galleryRef = useRef(null);
  const [typedText, setTypedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [projectsCount, setProjectsCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [creativeCount, setCreativeCount] = useState(0);
  const [columns, setColumns] = useState(3);
  
  const tagline = "Crafting digital experiences with code, design & words";
  
  // Unsplash images for portfolio showcase (creative/design/development related)
  const imageSets = [
    // Design/UI/UX images
    "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&auto=format&fit=crop&w-800&q=80",
    "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    
    // Development/Code images
    "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    
    // Creative/Art images
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    
    // Brand/Design system images
    "https://images.unsplash.com/photo-1567446537710-0d61e42a5c7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1567446537710-0d61e42a5c7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  // Typing effect
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= tagline.length) {
        setTypedText(tagline.substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, []);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Number counting animation
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = 50 / steps;
    const yearsIncrement = 5 / steps;
    const creativeIncrement = 100 / steps;

    let projects = 0;
    let years = 0;
    let creative = 0;
    let step = 0;

    const counterInterval = setInterval(() => {
      if (step < steps) {
        projects += increment;
        years += yearsIncrement;
        creative += creativeIncrement;
        
        setProjectsCount(Math.floor(projects));
        setYearsCount(Math.floor(years));
        setCreativeCount(Math.floor(creative));
        step++;
      } else {
        clearInterval(counterInterval);
        setProjectsCount(50);
        setYearsCount(5);
        setCreativeCount(100);
      }
    }, duration / steps);

    return () => clearInterval(counterInterval);
  }, []);

  // Responsive columns
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setColumns(2);
      } else if (width < 1024) {
        setColumns(3);
      } else {
        setColumns(4);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Infinite scrolling gallery
  useEffect(() => {
    if (!galleryRef.current) return;

    const columns = galleryRef.current.children;
    const speeds = [0.5, 0.8, 1.2, 0.6]; // Different speeds for different columns
    const directions = [1, -1, 1, -1]; // Alternate directions

    let animationId;
    let lastTime = 0;

    const animate = (time) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      Array.from(columns).forEach((col, index) => {
        if (col) {
          const speed = speeds[index % speeds.length] || 0.5;
          const direction = directions[index % directions.length] || 1;
          
          // Calculate new position
          let currentPos = parseFloat(col.style.transform?.replace('translateY(', '')?.replace('px)', '')) || 0;
          let newPos = currentPos + (speed * direction * delta * 0.05);
          
          // Reset position when scrolled too far
          const contentHeight = col.scrollHeight / 2;
          if (Math.abs(newPos) >= contentHeight) {
            newPos = 0;
          }
          
          col.style.transform = `translateY(${newPos}px)`;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [columns]);

  // Starfield effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.1 + 0.05,
      opacity: Math.random() * 0.8 + 0.2,
      flicker: Math.random() * 0.5 + 0.5,
      flickerSpeed: Math.random() * 0.02 + 0.01
    }));

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0a2a');
      gradient.addColorStop(0.5, '#0c1a3a');
      gradient.addColorStop(1, '#0a1128');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      stars.forEach(star => {
        star.x -= star.speed;
        if (star.x < -10) {
          star.x = canvas.width + 10;
          star.y = Math.random() * canvas.height;
        }

        const flicker = Math.sin(time * star.flickerSpeed) * 0.3 + star.flicker;
        const currentOpacity = Math.max(0.1, star.opacity * flicker);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 4
        );
        glowGradient.addColorStop(0, `rgba(200, 230, 255, ${currentOpacity * 0.5})`);
        glowGradient.addColorStop(1, 'rgba(200, 230, 255, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Create columns with duplicated images for seamless scrolling
  const createImageColumns = () => {
    const cols = [];
    const imagesPerColumn = Math.ceil(imageSets.length / columns) * 2; // Duplicate for seamless scroll
    
    for (let colIndex = 0; colIndex < columns; colIndex++) {
      const columnImages = [];
      
      // Add images twice for seamless infinite scroll
      for (let i = 0; i < 2; i++) {
        // Distribute images across columns
        for (let imgIndex = colIndex; imgIndex < imageSets.length; imgIndex += columns) {
          if (imageSets[imgIndex]) {
            columnImages.push(imageSets[imgIndex]);
          }
        }
      }
      
      cols.push(
        <div key={colIndex} className="gallery-column" style={{ animationDelay: `${colIndex * 0.5}s` }}>
          {columnImages.map((img, idx) => (
            <div key={`${colIndex}-${idx}`} className="gallery-item">
              <img 
                src={img} 
                alt={`Creative work ${idx + 1}`}
                className="portfolio-image"
                loading="lazy"
              />
              <div className="image-overlay"></div>
              <div className="image-glow"></div>
            </div>
          ))}
        </div>
      );
    }
    
    return cols;
  };

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="starfield" />
      
      {/* Glow effects overlay */}
      <div className="glow-overlay">
        <div className="glow glow-1"></div>
        <div className="glow glow-2"></div>
        <div className="glow glow-3"></div>
        <div className="flare flare-1"></div>
        <div className="flare flare-2"></div>
      </div>
      
      <div className="hero-container">
        <div className="content-left">
          <div className="intro-text">
            <span className="greeting">Hello, I'm</span>
            <h1 className="name">Iheanyi Ibiam</h1>
            <h2 className="title">Creative Developer & Designer</h2>
          </div>

          <div className="tagline-container">
            <p className="tagline">
              {typedText}
              <span className={`cursor ${cursorVisible ? 'visible' : ''}`}>|</span>
            </p>
          </div>

          <div className="description">
            <p>
              I blend <span className="highlight">technical precision</span> with{' '}
              <span className="highlight">artistic vision</span> to create meaningful 
              digital experiences. Under the <span className="brand">Gifted</span> brand, 
              I explore the intersection of technology and creativity.
            </p>
          </div>

          <div className="cta-section">
            <button className="btn btn-primary">
              <span className="btn-text">Explore My Work</span>
              <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="btn-glow"></div>
            </button>
            <button className="btn btn-secondary">
              <span className="btn-text">Let's Connect</span>
              <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{projectsCount}+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{yearsCount}+</span>
              <span className="stat-label">Years</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{creativeCount}%</span>
              <span className="stat-label">Creative</span>
            </div>
          </div>
        </div>

        <div className="gallery-right">
          <div className="gallery-container" ref={galleryRef}>
            {createImageColumns()}
          </div>
          
          {/* Floating particles */}
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          
          <div className="gradient-overlay"></div>
          <div className="gallery-glow"></div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <div className="arrow">
          <div className="arrow-dot"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;