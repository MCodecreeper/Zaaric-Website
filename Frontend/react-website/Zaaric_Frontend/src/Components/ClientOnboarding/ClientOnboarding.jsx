// Enterprise-Grade Client Onboarding (Pinned + Scrubbed, single-card reveal)
// Requirements: gsap ^3 with ScrollTrigger; matching CSS file present in same folder
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ClientOnboarding.css";

gsap.registerPlugin(ScrollTrigger);

const ClientOnboarding = () => {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const circleRef = useRef(null);
  const markersRef = useRef([]);
  const markerIconsRef = useRef([]);
  const stepsWrapRef = useRef(null);
  const stepsRef = useRef([]);
  const [activeStep, setActiveStep] = useState(0);

  const processSteps = [
    {
      title: "Initial Meeting / Discovery",
      description:
        "We begin with a deep-dive discovery session to understand your needs, goals, and vision.",
      icon: "🤝",
      color: "#00e5ff",
      bgColor: "rgba(0,229,255,0.1)",
      image: "/Assets/point1.png",
    },
    {
      title: "Research & Proposal (R&D)",
      description:
        "We validate feasibility, explore solution paths, and present a tailored proposal.",
      icon: "🔬",
      color: "#0a66ff",
      bgColor: "rgba(10,102,255,0.1)",
      image: "/Assets/point2.png",
    },
    {
      title: "Deal & Finances",
      description:
        "We finalize scope, pricing, contracts, and milestones with complete transparency.",
      icon: "💼",
      color: "#7c3aed",
      bgColor: "rgba(124,58,237,0.1)",
      image: "/Assets/point3.png",
    },
    {
      title: "Execution & Delivery",
      description:
        "We build, iterate, and deliver in milestones with clear progress updates.",
      icon: "🚀",
      color: "#10b981",
      bgColor: "rgba(16,185,129,0.1)",
      image: "/Assets/point4.png",
    },
  ];

  markersRef.current = [];
  markerIconsRef.current = [];
  stepsRef.current = [];

  useEffect(() => {
    if (!frameRef.current || !circleRef.current) return;

    const measureHeights = () => {
      if (!stepsWrapRef.current) return;
      const heights = stepsRef.current.filter(Boolean).map((el) => el.offsetHeight);
      const maxH = heights.length ? Math.max(...heights) : 0;
      stepsWrapRef.current.style.height = `${maxH}px`;
      stepsWrapRef.current.style.position = "relative";
    };
    measureHeights();
    const ro = new ResizeObserver(measureHeights);
    stepsRef.current.filter(Boolean).forEach((el) => ro.observe(el));

    const stepsCount = processSteps.length;
    const segment = 1 / stepsCount;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: frameRef.current,
          start: "top top",
          end: `+=${stepsCount * window.innerHeight}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.set(el, {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          autoAlpha: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 30,
          pointerEvents: i === 0 ? "auto" : "none",
        });
      });

      // Rotate exactly 360/stepsCount for each card
      tl.to(circleRef.current, { rotation: 360, ease: "none" }, 0);

      tl.eventCallback("onUpdate", () => {
        const ringRotation = gsap.getProperty(circleRef.current, "rotation") || 0;
        markerIconsRef.current.forEach((iconEl, i) => {
          const marker = markersRef.current[i];
          if (!iconEl || !marker) return;
          const angle = parseFloat(marker.dataset.angle || "0");
          gsap.set(iconEl, { rotation: -(ringRotation + angle) });
        });
      });

      for (let i = 1; i < stepsCount; i++) {
        tl.to(
          stepsRef.current[i - 1],
          { autoAlpha: 0, y: -20, duration: 0.35, ease: "power2.in", pointerEvents: "none" },
          i * segment
        );
        tl.to(
          stepsRef.current[i],
          { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out", pointerEvents: "auto" },
          i * segment + 0.05
        );
        tl.add(() => setActiveStep(i), i * segment);
      }

      tl.add(() => setActiveStep(0), 0);
    }, frameRef);

    return () => {
      ro.disconnect();
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const stepAngle = 360 / processSteps.length;
  const ringRadius = 170;

  return (
    <section className="client-onboarding" ref={sectionRef} id="process">
      <div className="onboarding-frame" ref={frameRef}>
        <div className="onboarding-container">
          <div className="onboarding-header">
            <h2 className="section-title">Our Client Onboarding Process</h2>
            <p className="section-subtitle">
              A premium 4-step journey <span>from initial discovery to successful delivery.</span>
            </p>
            <div className="progress-indicator-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${((activeStep + 1) / processSteps.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="onboarding-content">
            <div className="process-circle-container">
              <div className="process-circle" ref={circleRef}>
                {processSteps.map((step, i) => {
                  const angle = i * stepAngle;
                  return (
                    <div
                      key={i}
                      className={`step-marker ${activeStep === i ? "active" : ""}`}
                      ref={(el) => (markersRef.current[i] = el)}
                      data-angle={angle}
                      style={{
                        transform: `rotate(${angle}deg) translateY(-${ringRadius}px)`,
                        "--step-color": step.color,
                      }}
                    >
                      <div
                        className="marker-icon"
                        ref={(el) => (markerIconsRef.current[i] = el)}
                        title={step.title}
                        aria-label={step.title}
                      >
                        {step.icon}
                      </div>
                    </div>
                  );
                })}
                <div className="circle-center">
                  <div className="center-icon">⚡</div>
                  
                </div>
              </div>
              <div className="center-text">
                    {activeStep + 1} / {processSteps.length}
                  </div>
            </div>

            <div className="process-steps-wrap" ref={stepsWrapRef}>
              {processSteps.map((step, i) => (
                <article
                  key={i}
                  ref={(el) => (stepsRef.current[i] = el)}
                  className={`process-step ${activeStep === i ? "active" : ""}`}
                  aria-hidden={activeStep !== i}
                  style={{
                    "--step-color": step.color,
                    "--step-bg": step.bgColor,
                  }}
                >
                  <header className="step-header">
                    <div className="step-number">{i + 1}</div>
                    <div className="step-icon">{step.icon}</div>
                    <div className="step-title">{step.title}</div>
                  </header>
                  <p className="step-description">{step.description}</p>
                  <img src={step.image} alt={step.title} className="step-image" />
                </article>
              ))}
            </div>
          </div>

          <div className="onboarding-cta">
            <div className="cta-content">
              <h3>Ready to Start Your Project?</h3>
              <p>Begin with step 1 — book your discovery call.</p>
              <button className="cta-button">Book Your Discovery Call</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientOnboarding;
