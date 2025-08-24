// Enhanced Scroll-Locked Gear Animation Component
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './gearSetupAnimation.css';

gsap.registerPlugin(ScrollTrigger);

const GearSetupAnimation = () => {
  const sectionRef = useRef(null);
  const gearsRef = useRef([]);
  const textsRef = useRef([]);
  const lineRef = useRef(null);

  // Enhanced text content with better flow
  const gearTexts = [
    "Transforming your ideas to reality",
    "Delivering market-ready tech products", 
    "With end-to-end execution",
    "From concept to deployment",
    "Innovation meets implementation"
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const totalTexts = gearTexts.length;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 2,
        start: 'top top',
        end: () => `+=${window.innerHeight * (totalTexts + 1)}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Rotate gears with realistic ratios and directions, interlocked
    gearsRef.current.forEach((gear, index) => {
      if (gear) {
        let rotationMultiplier;
        switch(index) {
          case 0: rotationMultiplier = 1.1; break; // Small gear fastest
          case 1: rotationMultiplier = -0.8; break; // Medium opposite
          case 2: rotationMultiplier = 0.4; break; // Large slowest
          default: rotationMultiplier = 1;
        }
        tl.to(gear, {
          rotation: () => rotationMultiplier * 1080, // 3 full rotations
          duration: totalTexts + 1,
          ease: 'none',
        }, 0);
      }
    });

    // Neon line pulse (simplified without extra glow)
    gsap.to(lineRef.current, {
      background: '#00e5ff',
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

         // Animate texts sequentially with more gap between them
     gearTexts.forEach((_, index) => {
       const text = textsRef.current[index];
       if (text) {
         tl.fromTo(text, 
           { y: '100%', opacity: 0 },
           { y: '0%', opacity: 1, duration: 1, ease: 'power3.out' },
           index * 1.5 // More spacing between texts
         ).to(text, 
           { y: '-100%', opacity: 0, duration: 1, ease: 'power3.in' },
           index * 1.2 + 1 // Hold for full duration before fading out
         );
       }
     });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Create realistic gear shapes with proper tooth profiles
  const createRealisticGear = (teethCount, outerRadius, innerRadius, centerX = 100, centerY = 100, isLeftGear = false, isRightGear = false) => {
    const elements = [];
    const angleStep = (2 * Math.PI) / teethCount;
    
    // Adjust tooth width based on gear position for proper interlocking
    let toothWidth, gapWidth;
    if (isLeftGear) {
      toothWidth = angleStep * 0.4; // Left gear: 50% tooth, 50% gap for proper meshing
      gapWidth = angleStep * 0.6;
    } else if (isRightGear) {
      toothWidth = angleStep * 0.5; // Right gear: 50% tooth, 50% gap for proper meshing
      gapWidth = angleStep * 0.5;
    } else {
      toothWidth = angleStep * 0.4; // Center gear: 60% tooth, 40% gap
      gapWidth = angleStep * 0.6;
    }
    
    // Create gear body (inner circle)
    elements.push(
      <circle
        key="body"
        cx={centerX}
        cy={centerY}
        r={innerRadius}
        fill="rgba(0, 229, 255, 0.1)"
        stroke="#00e5ff"
        strokeWidth="2"
      />
    );
    
    // Create perfectly aligned gear teeth for realistic interlocking
    for (let i = 0; i < teethCount; i++) {
      const baseAngle = i * angleStep;
      const toothStartAngle = baseAngle - toothWidth / 2;
      const toothEndAngle = baseAngle + toothWidth / 2;
      
      // Create tooth with consistent profile for all gears
      const points = [];
      
      // Inner base of tooth
      points.push([
        centerX + Math.cos(toothStartAngle) * innerRadius,
        centerY + Math.sin(toothStartAngle) * innerRadius
      ]);
      
      // Outer edge of tooth (consistent tip for all gears)
      const tipRadius = outerRadius + 3;
      points.push([
        centerX + Math.cos(toothStartAngle) * outerRadius,
        centerY + Math.sin(toothStartAngle) * outerRadius
      ]);
      points.push([
        centerX + Math.cos(baseAngle) * tipRadius,
        centerY + Math.sin(baseAngle) * tipRadius
      ]);
      points.push([
        centerX + Math.cos(toothEndAngle) * outerRadius,
        centerY + Math.sin(toothEndAngle) * outerRadius
      ]);
      
      // Other side of tooth base
      points.push([
        centerX + Math.cos(toothEndAngle) * innerRadius,
        centerY + Math.sin(toothEndAngle) * innerRadius
      ]);
      
      // Create smooth path for tooth with consistent angle profile
      const pathData = `M ${points[0][0]} ${points[0][1]} 
                       L ${points[1][0]} ${points[1][1]}
                       Q ${points[2][0]} ${points[2][1]} ${points[3][0]} ${points[3][1]}
                       L ${points[4][0]} ${points[4][1]} Z`;
      
      elements.push(
        <path
          key={`tooth-${i}`}
          d={pathData}
          fill="#00e5ff"
          stroke="#00a0c8"
          strokeWidth="1"
        />
      );
    }
    
    // Center hub
    elements.push(
      <circle
        key="hub"
        cx={centerX}
        cy={centerY}
        r={innerRadius * 0.3}
        fill="#00e5ff"
        stroke="#00a0c8"
        strokeWidth="2"
      />
    );
    
    return elements;
  };

  return (
    <section ref={sectionRef} className="gear-setup-section">
      <div className="gear-text-container">
        <div ref={lineRef} className="neon-line"></div>
        <div className="gear-text-wrapper">
          {gearTexts.map((text, index) => (
            <h2 
              key={index}
              ref={(el) => (textsRef.current[index] = el)} 
              className="gear-text"
            >
              {text}
            </h2>
          ))}
        </div>
      </div>
      
             <div className="gears-container">
         {/* Left Gear - Small, 16 teeth */}
         <svg ref={(el) => (gearsRef.current[0] = el)} className="gear gear-left" viewBox="0 0 200 200">
           {createRealisticGear(8, 75, 50, 100, 100, true)}
         </svg>

         {/* Center Gear - Medium, 20 teeth */}
         <svg ref={(el) => (gearsRef.current[1] = el)} className="gear gear-center" viewBox="0 0 200 200">
           {createRealisticGear(10, 80, 55, 100, 100)}
         </svg>

         {/* Right Gear - Large, 24 teeth */}
         <svg ref={(el) => (gearsRef.current[2] = el)} className="gear gear-right" viewBox="0 0 200 200">
           {createRealisticGear(10, 85, 60, 100, 100, false, true)}
         </svg>
       </div>

      {/* Gear Connection Visualization (interlocking implied by positioning) */}
      <div className="gear-connections">
        <div className="connection-line line-1"></div>
        <div className="connection-line line-2"></div>
      </div>
    </section>
  );
};

export default GearSetupAnimation;