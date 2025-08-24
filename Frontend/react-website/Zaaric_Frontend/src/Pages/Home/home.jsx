import React, { useRef, useEffect, useState } from "react";
import "./home.css";
import logo from '../../assets/zaaric_logo.png';
import heroVideo from '../../assets/hero_bgVideo.mp4';
import ZaaricAnimation from "../../Components/ZaaricAnimation/zaaricAnimation";
import TestimonialSection from "../../Components/Testimonials/testimonials";
import Contact from "../../Components/Contact/contact";
import Portfolio from "../../Components/Portfolio/portfolio";
import About from '../../Components/About/about.jsx';
import Industries from '../../Components/Industries/industries.jsx'
import ClientOnboarding from '../../Components/ClientOnboarding/ClientOnboarding.jsx'
import GearSetupAnimation from '../../Components/GearSetup/gearSetupAnimation.jsx'
import robotImage from '/Assets/hero_robot3.png'
import aiIdeaImage from '/Assets/AI_idea.png'
import marketAnalysisImage from '/Assets/tech_market_analytics.png'
import marketAnalysis2Image from '/Assets/point4.png'
import robotWorkingImage from '/Assets/robot_working.png'
import ZaaricScrollGears from "../../Components/GearSetup/gearSetupAnimation.jsx";

const Home = () => {
  const contactRef = useRef(null);
  const servicesRef = useRef(null);
  const industriesRef = useRef(null);
  const teamRef = useRef(null);
  const timelineLineRef = useRef(null);
  const timelineGlowRef = useRef(null);
  const timelineSleekLineRef = useRef(null);
  const insightsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const careersRef = useRef(null);
  const tailoredRef = useRef(null);
  const packagesRef = useRef(null);
  const aboutRef = useRef(null);
  const heroRef = useRef(null);
  const connectorLineRef = useRef(null);
  const timelineProgressRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  // Utility function for reduced motion preference
  const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  // Dynamic import of anime.js
  useEffect(() => {
    import('animejs').then((module) => {
      window.anime = module.default;
    });
  }, []);

  const onTimelineDotClick = (nodeIndex) => {
    const sectionEl = teamRef.current;
    if (!sectionEl) return;
    const cards = sectionEl.querySelectorAll(".timeline-card");
    const target = cards[nodeIndex];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleMobileDotClick = (index) => {
    const container = document.querySelector('.mobile-images-container');
    if (!container) return;
    
    const items = container.querySelectorAll('.mobile-image-item');
    const targetItem = items[index];
    if (targetItem) {
      targetItem.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
    
    // Update active dot
    const dots = document.querySelectorAll('.mobile-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  };

  const scrollToSection = (ref) => ref.current?.scrollIntoView({ behavior: "smooth" });

    /* ################################################################################################ */
  /* ################# Control for the Dynamic Timeline in Our Leadership Section  ################## */
  /* ############################################################################################### */
  useEffect(() => {
    const handleTimelineScroll = () => {
      const section = teamRef.current;
      const progress = timelineProgressRef.current;
      const glow = timelineGlowRef.current;
      const sleekLine = timelineSleekLineRef.current;
      
      if (!section || !progress) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress within the section
      const totalScrollDistance = sectionHeight + windowHeight;
      const scrolled = Math.min(Math.max((windowHeight - sectionTop) / totalScrollDistance, 0), 1);
      
      // Update timeline progress
      progress.style.height = `${scrolled * 100}%`;
      
      // Update glow position and opacity
      if (glow) {
        const glowPosition = scrolled * (sectionHeight - 150);
        glow.style.top = `${glowPosition}px`;
        glow.style.opacity = scrolled > 0.1 && scrolled < 0.9 ? '1' : '0';
      }
      
      // Update sleek line position
      if (sleekLine) {
        const linePosition = scrolled * (sectionHeight - 50);
        sleekLine.style.top = `${linePosition}px`;
        sleekLine.style.height = scrolled > 0.05 ? '50px' : '0';
      }
    };

    // Timeline card reveal animation
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    // Observe timeline cards
    document.querySelectorAll(".timeline-card").forEach((card) => {
      cardObserver.observe(card);
    });

    window.addEventListener("scroll", handleTimelineScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleTimelineScroll);
      cardObserver.disconnect();
    };
  }, []);

  // Mobile images scroll detection
  useEffect(() => {
    const container = document.querySelector('.mobile-images-container');
    if (!container) return;

    const handleMobileScroll = () => {
      const items = container.querySelectorAll('.mobile-image-item');
      const dots = document.querySelectorAll('.mobile-dot');
      
      if (items.length === 0 || dots.length === 0) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let activeIndex = 0;
      let minDistance = Infinity;

      items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const distance = Math.abs(containerCenter - itemCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          activeIndex = index;
        }
      });

      // Update active dot
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
      });
    };

    container.addEventListener('scroll', handleMobileScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleMobileScroll);
    };
  }, []);

  /* ---------------- IntersectionObserver: section slide-in ---------------- */
  useEffect(() => {
    const options = { threshold: 0.15 };
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("slide-in");
          sectionObserver.unobserve(e.target);
        }
      });
    }, options);

    [servicesRef, industriesRef, teamRef, insightsRef, careersRef, tailoredRef, packagesRef, aboutRef, contactRef, testimonialsRef]
      .forEach(r => r.current && sectionObserver.observe(r.current));

    return () => sectionObserver.disconnect();
  }, []);



  /* ---------------- Timeline: glow and sleek line follow scroll + active dots on view + dynamic navigation ---------------- */
  useEffect(() => {
    const lineEl = timelineLineRef.current;
    const glowEl = timelineGlowRef.current;
    const sleekLineEl = timelineSleekLineRef.current;
    const sectionEl = teamRef.current;
    if (!lineEl || !glowEl || !sleekLineEl || !sectionEl) return;

    let currentNode = 0;
    const cards = sectionEl.querySelectorAll(".timeline-card");
    const totalNodes = cards.length;
    let lineHeight; // Define outside for scope
    let cardPositions = []; // Populate properly

    const updateTimeline = () => {
      const rect = sectionEl.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionHeight = sectionEl.offsetHeight;
      const viewportH = window.innerHeight;
      const scrollY = window.scrollY;

      const start = sectionTop - viewportH * 0.2;
      const end = sectionTop + sectionHeight - viewportH * 0.8;
      const progress = Math.max(0, Math.min(1, (scrollY - start) / (end - start)));

      lineHeight = lineEl.offsetHeight;
      const glowHeight = glowEl.offsetHeight;
      const travel = Math.max(0, lineHeight - glowHeight);
      glowEl.style.transform = `translateY(${progress * travel}px)`;

      cardPositions = Array.from(cards).map(card => {
        const cardRect = card.getBoundingClientRect();
        return cardRect.top + window.scrollY - sectionTop;
      });
      const nodeHeight = lineHeight / (totalNodes - 1);
      const targetTop = cardPositions[currentNode] || 0;
      const sleekLineHeight = Math.min(targetTop + nodeHeight, lineHeight);

      sleekLineEl.style.height = `${sleekLineHeight}px`;
      sleekLineEl.style.top = `${progress * travel}px`;
    };

    const handleDotClick = (nodeIndex) => {
      currentNode = nodeIndex;
      const nodeTop = cardPositions[nodeIndex];
      const sleekLineHeight = Math.min(nodeTop + (lineHeight / (totalNodes - 1)), lineHeight);

      sleekLineEl.style.transition = 'height 0.5s ease-out 0.2s, top 0.5s ease-out 0.2s';
      sleekLineEl.style.height = `${sleekLineHeight}px`;
      sleekLineEl.style.top = `${nodeTop}px`;

      cards.forEach((card, idx) => card.classList.toggle("active", idx === nodeIndex));
      window.scrollTo({ top: cards[nodeIndex].offsetTop + sectionEl.offsetTop, behavior: "smooth" });
    };

    updateTimeline();
    window.addEventListener("scroll", updateTimeline, { passive: true });
    window.addEventListener("resize", updateTimeline);

    const dotObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const card = e.target;
          const nodeIndex = parseInt(card.getAttribute("data-node"));
          if (nodeIndex > currentNode) {
            currentNode = nodeIndex;
            const nodeTop = cardPositions[nodeIndex];
            sleekLineEl.style.height = `${nodeTop + (lineHeight / (totalNodes - 1))}px`;
            sleekLineEl.style.top = `${nodeTop}px`;
          }
          card.classList.add("active");
        } else {
          e.target.classList.remove("active");
        }
      });
    }, { threshold: 0.55 });

    cards.forEach((c) => dotObserver.observe(c));

    return () => {
      window.removeEventListener("scroll", updateTimeline);
      window.removeEventListener("resize", updateTimeline);
    };
  }, []);

  
  /* ---------------- Connector Line Animation from Hero to Services ---------------- */
  useEffect(() => {
    const heroEl = heroRef.current;
    const servicesEl = servicesRef.current;
    const lineEl = connectorLineRef.current;
    if (!heroEl || !servicesEl || !lineEl) return;

    const updateConnectorLine = () => {
      const heroRect = heroEl.getBoundingClientRect();
      const servicesRect = servicesEl.getBoundingClientRect();
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;

      const heroBottom = heroRect.bottom + scrollY;
      const servicesTop = servicesRect.top + scrollY;
      const totalDistance = servicesTop - heroBottom;
      const scrollProgress = Math.max(0, Math.min(1, (scrollY + viewportH - heroBottom) / totalDistance));

      lineEl.style.height = `${totalDistance}px`; // Set dynamic height
      const path = lineEl.querySelector("path");
      if (path) {
        const lineLength = totalDistance * scrollProgress;
        path.setAttribute("d", `M 50 0 L 50 ${lineLength}`);
        lineEl.style.opacity = scrollProgress > 0 ? 1 : 0;
      }
    };

    // Delay services cards reveal until line animation is near completion
    const servicesObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const heroRect = heroEl.getBoundingClientRect();
          const servicesRect = servicesEl.getBoundingClientRect();
          const scrollY = window.scrollY;
          const heroBottom = heroRect.bottom + scrollY;
          const servicesTop = servicesRect.top + scrollY;
          const totalDistance = servicesTop - heroBottom;
          const scrollProgress = Math.max(0, Math.min(1, (scrollY + window.innerHeight - heroBottom) / totalDistance));

          if (scrollProgress >= 0.9) {
            const cards = servicesEl.querySelectorAll(".service-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("visible");
              }, index * 200);
            });
            servicesObserver.unobserve(e.target);
          }
        }
      });
    }, { threshold: 0.1 });

    servicesObserver.observe(servicesEl);
    window.addEventListener("scroll", updateConnectorLine, { passive: true });
    window.addEventListener("resize", updateConnectorLine);

    return () => {
      window.removeEventListener("scroll", updateConnectorLine);
      window.removeEventListener("resize", updateConnectorLine);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ------------ data for stagger delays (industries, insights) ------------- */
  const setDelay = (i) => ({ style: { ["--delay"]: `${i * 80}ms` } });

  // Hero section animations with anime.js
  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Wait for anime.js to be loaded
    const checkAnimeAndAnimate = () => {
      if (!window.anime) {
        setTimeout(checkAnimeAndAnimate, 100);
        return;
      }

      const heroElements = [
        { el: '.hero-logo', delay: 0, duration: 800 },
        { el: '.hero-title', delay: 200, duration: 1000 },
        { el: '.hero-subtitle', delay: 400, duration: 800 },
        { el: '.hero-ctas', delay: 600, duration: 600 },
        { el: '.trust-badges', delay: 800, duration: 600 }
      ];

      heroElements.forEach(({ el, delay, duration }) => {
        const element = document.querySelector(el);
        if (element) {
          window.anime({
            targets: element,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: duration,
            delay: delay,
            easing: 'easeOutCubic'
          });
        }
      });
    };

    // Fallback animation if anime.js fails to load
    const fallbackAnimation = () => {
      const heroElements = [
        '.hero-logo', '.hero-title', '.hero-subtitle', 
        '.hero-ctas', '.trust-badges'
      ];
      
      heroElements.forEach((el, index) => {
        const element = document.querySelector(el);
        if (element) {
          element.style.opacity = '0';
          element.style.transform = 'translateY(30px)';
          
          setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }, index * 150);
        }
      });
    };

    // Try anime.js first, fallback to CSS if it fails
    const timeoutId = setTimeout(fallbackAnimation, 2000);
    checkAnimeAndAnimate();
    
    // Hero visual story animations
    const animateHeroStory = () => {
      // Animate flow lines first
      setTimeout(() => {
        const flowLines = document.querySelectorAll('.flow-line');
        flowLines.forEach((line, index) => {
          setTimeout(() => {
            line.classList.add('animate');
          }, index * 300);
        });
      }, 1000);

      // Animate story layers with jitter
      setTimeout(() => {
        const storyLayers = document.querySelectorAll('.story-layer');
        storyLayers.forEach((layer, index) => {
          setTimeout(() => {
            layer.classList.add('animate');
          }, index * 200);
        });
      }, 2200);

      // Animate robot last
      setTimeout(() => {
        const robot = document.querySelector('.hero-robot');
        if (robot) {
          robot.classList.add('animate');
        }
      }, 3000);
    };

    // Start hero story animation
    setTimeout(animateHeroStory, 500);
    
    // Parallax effect for hero robot
    const handleHeroParallax = () => {
      const robot = document.querySelector('.hero-robot');
      if (robot) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        robot.style.transform = `translateY(${rate}px) rotateY(${scrolled * 0.02}deg)`;
      }
    };

    window.addEventListener('scroll', handleHeroParallax, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleHeroParallax);
    };
  }, []);



  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="revamped-hero" id='hero'>
        <div className="hero-inner">
          {/* Left Content */}
          <div className="hero-left">
            <div className="hero-logo">
              <img src="/Assets/zaaric_logo.png" alt="Zaaric Logo" />
            </div>
            
            <h1 className="hero-title">
              Transforming <span className="highlight"> Your Ideas</span> into 
              <span className="highlight"> Digital Reality</span>
            </h1>
            
            <p className="hero-subtitle">
              We bridge the gap between innovative AI concepts and market-ready solutions. 
              From initial ideation to market analysis and final execution, we turn your 
              vision into a competitive advantage.
            </p>
            
            <div className="hero-ctas">
              <button className="cta-btn">Start Your AI Journey</button>
              <button className="cta-btn secondary">View Our Process</button>
            </div>
            
            <div className="trust-badges">
              <div className="badge-item">
                <div className="badge-icon">🚀</div>
                <span>AI Innovation</span>
              </div>
              <div className="badge-item">
                <div className="badge-icon">📊</div>
                <span>Market Research</span>
              </div>
              <div className="badge-item">
                <div className="badge-icon">⚡</div>
                <span>End-to-End Delivery</span>
              </div>
            </div>
          </div>
          
          {/* Right: Visual Story */}
          <div className="hero-right">
            <div className="hero-visual-story">
              {/* Background Layer 1: AI Idea */}
              <div className="story-layer idea-layer">
                <img 
                  src={aiIdeaImage} 
                  alt="AI Innovation & Ideas" 
                  className="story-image idea-image"
                />
                                 <div className="story-overlay idea-overlay">
                   <div className="story-label">AI Innovation</div>
                 </div>
              </div>
              
              {/* Background Layer 2: Market Analysis */}
              <div className="story-layer market-layer">
                <img 
                  src={marketAnalysisImage} 
                  alt="Tech Market Analysis" 
                  className="story-image market-image"
                />
                                 <div className="story-overlay market-overlay">
                   <div className="story-label">Market Research</div>
                 </div>
              </div>
              
              {/* Background Layer 3: Market Analysis 2 */}
              <div className="story-layer market2-layer">
                <img 
                  src={marketAnalysis2Image} 
                  alt="Advanced Market Analytics" 
                  className="story-image market2-image"
                />
                                 <div className="story-overlay market2-overlay">
                   <div className="story-label">Deep Analytics</div>
                 </div>
              </div>
              
              {/* Background Layer 4: Robot Working */}
              <div className="story-layer working-layer">
                <img 
                  src={robotWorkingImage} 
                  alt="AI Robot Working" 
                  className="story-image working-image"
                />
                                 <div className="story-overlay working-overlay">
                   <div className="story-label">AI Execution</div>
                 </div>
              </div>
              
              {/* Foreground: Hero Robot */}
              <div className="story-layer robot-layer">
                <img 
                  src={robotImage} 
                  alt="AI Robot - From Idea to Reality" 
                  className="hero-robot"
                />
                                 <div className="robot-glow"></div>
              </div>
              
              {/* Story Flow Lines */}
              <div className="story-flow-lines">
                <div className="flow-line idea-to-market"></div>
                <div className="flow-line market2-to-working"></div>
                <div className="flow-dots">
                  <div className="flow-dot idea-dot"></div>
                  <div className="flow-dot market-dot"></div>
                  <div className="flow-dot working-dot"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Zaaric Scroll Gears Animation */}

    <ZaaricScrollGears></ZaaricScrollGears>

{/* Services Section */}
<section className="services" id="services" ref={servicesRef}>
  <div className="services-header">
    <h2>Our Services</h2>
    <p>
      Zaaric delivers end-to-end solutions — from raw ideas to market-ready
      products. We take care of everything so you can focus on growth.
    </p>
  </div>

  <div className="services-grid">
    <div className="service-card">
      <h3>Idea Validation & Research</h3>
      <ul>
        <li><span className='blue-dot'>•</span> Market study & feasibility analysis</li>
        <li><span className='blue-dot'>•</span> Structured product roadmapping</li>
        <li><span className='blue-dot'>•</span> Competitive landscape research</li>
      </ul>
    </div>

    <div className="service-card">
      <h3>Agentic AI Solutions</h3>
      <ul>
        <li><span className='blue-dot'>•</span> Custom AI Agents for automation & workflows</li>
        <li><span className='blue-dot'>•</span> LLM-powered copilots for enterprises</li>
        <li><span className='blue-dot'>•</span> Agentic orchestration (multi-agent ecosystems)</li>
      </ul>
    </div>

    <div className="service-card">
      <h3>Product Design & Branding</h3>
      <ul>
        <li><span className='blue-dot'>•</span> UI/UX design & prototyping</li>
        <li><span className='blue-dot'>•</span> Brand identity & visual design</li>
        <li><span className='blue-dot'>•</span> Responsive design systems</li>
      </ul>
    </div>

    <div className="service-card">
      <h3>Full-Stack Development</h3>
      <ul>
        <li><span className='blue-dot'>•</span> Web & mobile applications</li>
        <li><span className='blue-dot'>•</span> Backend & API development</li>
        <li><span className='blue-dot'>•</span> Third-party integrations</li>
      </ul>
    </div>

    <div className="service-card">
      <h3>AI & Automation</h3>
      <ul>
        <li><span className='blue-dot'>•</span> Custom AI assistants</li>
        <li><span className='blue-dot'>•</span> Machine learning models</li>
        <li><span className='blue-dot'>•</span> Workflow automation</li>
      </ul>
    </div>

    <div className="service-card">
      <h3>Cloud & Infrastructure</h3>
      <ul>
        <li><span className='blue-dot'>•</span> Scalable cloud hosting</li>
        <li><span className='blue-dot'>•</span> DevOps & CI/CD pipelines</li>
        <li><span className='blue-dot'>•</span> Enterprise security</li>
      </ul>
    </div>

    <div className="service-card">
      <h3>Content & Creative Production</h3>
      <ul>
        <li><span className='blue-dot'>•</span> Video editing & production</li>
        <li><span className='blue-dot'>•</span> Marketing campaigns</li>
        <li><span className='blue-dot'>•</span> Creative assets & branding</li>
      </ul>
    </div>

    <div className="service-card">
      <h3>Launch & Growth Strategy</h3>
      <ul>
        <li><span className='blue-dot'>•</span> SEO & analytics optimization</li>
        <li><span className='blue-dot'>•</span> Growth hacking strategies</li>
        <li><span className='blue-dot'>•</span> Continuous product support</li>
      </ul>
    </div>
  </div>

  <div className="services-cta">
    <button
      onClick={() => scrollToSection(contactRef)}
      className="cta-btn primary"
    >
      Start Your Project Today
    </button>
  </div>

  <div className="services-cta-row">
    <div className="srvc_logo">
      <ZaaricAnimation />
      <button
        onClick={() => scrollToSection(contactRef)}
        className="cta-btn primary animation-cta"
      >
        Book Your call now !
      </button>
    </div>
  </div>
</section>


{/* ******************    INDUSTRIES !      ****************************/}


<Industries ref={industriesRef} />

{/* ******************    CLIENT ONBOARDING PROCESS !      ****************************/ }

<ClientOnboarding />





    {/* Team – timeline with scroll-activated dots and dynamic node navigation with sleek line */}
<section className="team" ref={teamRef} id="team">
  <h2>Our Leadership</h2>
  <p className="section-subtitle">
    The team that takes products from idea to market with precision and speed.
  </p>

  <div className="timeline">
    {/* Timeline line with progress */}
    <div className="timeline-line" ref={timelineLineRef}>
      <div className="timeline-progress" ref={timelineProgressRef}></div>
      <div className="timeline-glow" ref={timelineGlowRef}></div>
      <div className="timeline-sleek-line" ref={timelineSleekLineRef}></div>
    </div>

         {/* Timeline content */}
     <div className="timeline-content">

              {/* CEO */}
        <article className="timeline-card left" data-node="0">
          <div className="dot" onClick={() => onTimelineDotClick(0)}></div>
          <div className="card-inner">
            <h4>Hamza Kamran</h4>
            <span className="role">Founder & CEO</span>
            <p>
              Full-stack MERN developer with Agentic AI expertise. Leads end-to-end
              product strategy and delivery—discovery, design, engineering, and
              go-to-market. Selected for the Qimam Fellowship (0.3% acceptance),
              recognized for leadership and execution.
            </p>
            <ul>
              <li>Owns product direction, quality bar, and delivery velocity</li>
              <li>Architects scalable MVP → Scale roadmaps for US/EU markets</li>
              <li>Drives security, privacy, and enterprise readiness</li>
            </ul>
          </div>
        </article>
        {!isMobile && <div className="card-img" id='img1'>
          <img src="/Assets/founder_ceo.jpg" alt="Hamza Kamran" />
        </div>}

        {/* CTO */}
        <article className="timeline-card right" data-node="1">
          <div className="dot" onClick={() => onTimelineDotClick(1)}></div>
          <div className="card-inner">
            <h4>Umair Khan Shinwai</h4>
            <span className="role">Co-Founder & CTO</span>
            <p>
              Systems and cloud engineering leader. Designs fault-tolerant, secure
              architectures and developer platforms. Champions CI/CD, observability,
              and cloud cost discipline.
            </p>
            <ul>
              <li>Cloud architecture on AWS/GCP with IaC and zero-downtime delivery</li>
              <li>Data pipelines, integrations, and performance engineering</li>
              <li>Team enablement, code quality, and standards</li>
            </ul>
          </div>
        </article>
                 {!isMobile && <div className="card-img" id='img2'>
           <img src="/Assets/CEO.jpg" alt="Umair Khan Shinwai" />
         </div>}

        {/* Business Dev Lead */}
        {/* <article className="timeline-card left" data-node="2">
          <div className="dot" onClick={() => onTimelineDotClick(2)}></div>
          <div className="card-inner">
            <h4>Riyaan bin Shamas</h4>
            <span className="role">Business Development Lead</span>
            <p>
              Owns pipeline and partnerships for US/EU. Aligns solutions with business
              outcomes, turning requirements into clear scopes and measurable ROI.
            </p>
            <ul>
              <li>Enterprise discovery, proposals, and stakeholder alignment</li>
              <li>Pricing strategy and value communication</li>
              <li>Account growth and relationship management</li>
            </ul>
          </div>
        </article> */}
        {!isMobile && <div className="card-img" id='img3'>
          <img src="/Assets/founder_ceo.jpg" alt="Riyaan bin Shamas" />
        </div>} 

        {/* Graphics Lead */}
        {/* <article className="timeline-card right" data-node="3">
          <div className="dot" onClick={() => onTimelineDotClick(3)}></div>
          <div className="card-inner">
            <h4>M. Umair</h4>
            <span className="role">Graphics Lead</span>
            <p>
              Crafts enterprise-grade brand systems, UI kits, and motion. Ensures that
              every interaction feels intentional and on-brand.
            </p>
            <ul>
              <li>Design systems, accessibility, and interaction patterns</li>
              <li>Motion design for product and marketing</li>
              <li>Brand identity and multi-channel assets</li>
            </ul>
          </div>
        </article> */}
        {!isMobile && <div className="card-img" id='img4'>
          <img src="/Assets/CEO.jpg" alt="M. Umair" />
        </div>}

     </div>

           {/* Mobile Images Container */}
      {isMobile && <div className="mobile-images-container visibility">
        <div className="mobile-image-item">
          <div className="card-img">
            <img src="/Assets/founder_ceo.jpg" alt="Hamza Kamran" />
          </div>
          <div className="mobile-image-info">
            <h4>Hamza Kamran</h4>
            <span className="role">Founder & CEO</span>
          </div>
        </div>
        <div className="mobile-image-item">
          <div className="card-img">
            <img src="/Assets/CEO.jpg" alt="Umair Khan Shinwai" />
          </div>
          <div className="mobile-image-info">
            <h4>Umair Khan Shinwai</h4>
            <span className="role">Co-Founder & CTO</span>
          </div>
        </div>
        <div className="mobile-image-item">
          <div className="card-img">
            <img src="/Assets/founder_ceo.jpg" alt="Riyaan bin Shamas" />
          </div>
          <div className="mobile-image-info">
            <h4>Riyaan bin Shamas</h4>
            <span className="role">Business Development Lead</span>
          </div>
        </div>
        <div className="mobile-image-item">
          <div className="card-img">
            <img src="/Assets/CEO.jpg" alt="M. Umair" />
          </div>
          <div className="mobile-image-info">
            <h4>M. Umair</h4>
            <span className="role">Graphics Lead</span>
          </div>
        </div>
      </div>}

     {/* Mobile Dots Navigation */}
     {isMobile && <div className="mobile-images-dots">
       <span className="mobile-dot active" onClick={() => handleMobileDotClick(0)}></span>
       <span className="mobile-dot" onClick={() => handleMobileDotClick(1)}></span>
       <span className="mobile-dot" onClick={() => handleMobileDotClick(2)}></span>
       <span className="mobile-dot" onClick={() => handleMobileDotClick(3)}></span>
     </div>}
  </div>
</section>




      {/* Careers – enterprise recruiting block */}
      <section className="careers" ref={careersRef} id="careers">
        <h2>Careers</h2>
        <p className="section-subtitle">Join a multidisciplinary team shipping world-class products.</p>

        <div className="careers-wrap">
          <div className="job-board reveal" {...setDelay(0)}>
            <div className="job">
              <div>
                <h5>Senior Full-Stack Engineer (React/Node)</h5>
                <div className="meta">Remote • Pakistan/US overlap • Full-time</div>
              </div>
              <button className="apply" onClick={() => scrollToSection(contactRef)}>Apply</button>
            </div>
            <div className="job">
              <div>
                <h5>Product Designer (Systems & Motion)</h5>
                <div className="meta">Remote • Portfolio required • Contract/FT</div>
              </div>
              <button className="apply" onClick={() => scrollToSection(contactRef)}>Apply</button>
            </div>
            <div className="job">
              <div>
                <h5>Business Development Associate (US/EU)</h5>
                <div className="meta">Remote • Commission + Base • Entry/Mid</div>
              </div>
              <button className="apply" onClick={() => scrollToSection(contactRef)}>Apply</button>
            </div>
          </div>

          <div className="careers-side">
            <div className='careerImg'>
                <img src="/Assets/techGuy.png" width='500' height='700' ></img>
            </div>
          </div>
        </div>

        <div className="careers-cta">
          <span className="careers-note">Don’t see your role? Send your portfolio — we hire excellence.</span>
        </div>
      </section>

      {/* About */}
      <div ref={aboutRef} id="about" className="about-section">
        <About />
      </div>

      {/* Testimonials */}
      <TestimonialSection ref={testimonialsRef} />

      {/* Contact */}
      <div ref={contactRef} id="contact">
        <Contact />
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-logo">
            <h2>ZAARIC</h2>
            <p>Defining Digital Excellence</p>
          </div>
          <div className="footer-links">
            <a href="/" onClick={(e)=>{e.preventDefault(); window.scrollTo({top:0,behavior:"smooth"})}}>Home</a>
            <a href="/" onClick={(e)=>{e.preventDefault(); scrollToSection(servicesRef)}}>Services</a>
            <a href="/" onClick={(e)=>{e.preventDefault(); scrollToSection(aboutRef)}}>About Us</a>
            <a href="/" onClick={(e)=>{e.preventDefault(); scrollToSection(contactRef)}}>Contact</a>
          </div>
          <div className="footer-social">
            <a href="https://www.linkedin.com/company/106320714/admin/dashboard/" aria-label="LinkedIn">Linkedin</a>
            <a href="https://www.instagram.com/zaaric.official/" aria-label="Instagram">Instagram</a>
            <a href="https://www.facebook.com/profile.php?id=61572632620192" aria-label="Facebook">Facebook</a>
            <a href="https://twitter.com/zaaric" aria-label="Twitter">X.com</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 ZAARIC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;