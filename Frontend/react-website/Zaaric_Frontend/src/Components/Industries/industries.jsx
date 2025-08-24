// src/components/Industries.jsx
import React, { useEffect, useState, forwardRef } from "react";
import "./industries.css";

const Industries = forwardRef((props, ref) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    {
      title: "E-commerce",
      desc: "Headless storefronts, payments, logistics.",
      tag: "Headless • Stripe • OMS",
    },
    {
      title: "SaaS",
      desc: "Multi-tenant apps, usage billing, analytics.",
      tag: "Multi-tenant • Billing",
    },
    {
      title: "Healthcare",
      desc: "Secure portals, data privacy, workflows.",
      tag: "Privacy • Interop",
    },
    {
      title: "Fintech",
      desc: "KYC/AML, ledgers, dashboards.",
      tag: "KYC/AML • Ledger",
    },
    {
      title: "Education",
      desc: "LMS, content delivery, engagement.",
      tag: "LMS • Analytics",
    },
    {
      title: "Media",
      desc: "Streaming, editing pipeline, CMS.",
      tag: "CMS • Pipeline",
    },
  ];

  // Reveal animation
  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            cardObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll(".industry-card").forEach((el) =>
      cardObserver.observe(el)
    );

    return () => cardObserver.disconnect();
  }, []);

  // Dots dynamic functionality
  const handleDotClick = (index) => {
    setActiveIndex(index);
    const cardEl = document.getElementById(`industry-${index}`);
    cardEl?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <section className="industries" id="industries" ref={ref}>
      <div className="industries-header">
        <h2 className="section-title">Industries</h2>
        <p className="section-subtitle">
          Proven patterns tailored to your domain.
        </p>
      </div>

      <div className="industries-grid">
        {cards.map((card, i) => (
          <div
            key={i}
            id={`industry-${i}`}
            className="industry-card"
          >
            <div className="industry-content">
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
              <span className="tag">{card.tag}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dots navigation */}
      <div className="industries-dots">
        {cards.map((_, i) => (
          <span
            key={i}
            className={`dot ${activeIndex === i ? "active" : ""}`}
            onClick={() => handleDotClick(i)}
          />
        ))}
      </div>
    </section>
  );
});

export default Industries;
