// Hero.jsx
import React, { useEffect, useRef } from 'react';
import './Hero.css'; // We'll create this CSS file separately

const Hero = () => {
  const imageRefs = useRef([]);

  useEffect(() => {
    // Animate hero images on mount
    const imageItems = document.querySelectorAll('.image-item');
    imageItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('animate');
      }, 800 + (index * 100));
    });

    // Entrance animations
    const animateElements = document.querySelectorAll('[data-animate]');
    animateElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate');
      }, 500 + (index * 100));
    });
  }, []);

  return (
    <section className="section hero" id="home">
      <div className="container hero-container">
        <div className="hero-content">
          <div className="coming-soon-badge" data-animate>
            <i className="fas fa-bolt"></i>
            <span className="badge-text">Launching Soon</span>
          </div>
          
          <h1 className="hero-title" data-animate>
            Nigeria's Premium <span className="title-highlight">Service Marketplace</span>
          </h1>
          
          <p className="hero-subtitle" data-animate>
            EazyHire is building Nigeria's most trusted platform connecting verified service professionals with clients. Join our exclusive waitlist to be first in line when we launch.
          </p>
          
          <div className="hero-cta" data-animate>
            <a href="#waitlist" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '16px' }}>
              <i className="fas fa-paper-plane"></i>
              <span>Join Exclusive Waitlist</span>
            </a>
          </div>
        </div>
        
        {/* Hero Images Grid */}
        <div className="hero-images">
          <div className="image-grid">
            <div className="image-item" id="image1" ref={el => imageRefs.current[0] = el}>
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3RyaWNpYW58ZW58MHx8MHx8fDA%3D" 
                alt="Home Services"
                loading="lazy"
              />
            </div>
            
            <div className="image-item" id="image2" ref={el => imageRefs.current[1] = el}>
              <img 
                src="https://plus.unsplash.com/premium_photo-1663047716627-e0b6c878761e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Tech Services"
                loading="lazy"
              />
            </div>
            
            <div className="image-item" id="image3" ref={el => imageRefs.current[2] = el}>
              <img 
                src="https://images.unsplash.com/photo-1613186420419-868111e7ac07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGJsYWNrJTIwY2hpbGQlMjBsZWFybmluZ3xlbnwwfHwwfHx8MA%3D%3D" 
                alt="Education Services"
                loading="lazy"
              />
            </div>
            
            <div className="image-item" id="image4" ref={el => imageRefs.current[3] = el}>
              <img 
                src="https://images.unsplash.com/photo-1664575601786-b00156752b61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGJ1c2luZXNzfGVufDB8fDB8fHww" 
                alt="Professional Services"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;