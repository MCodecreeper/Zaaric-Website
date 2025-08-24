import React, { useEffect, useState, forwardRef } from "react";
import "./testimonials.css"; // Import the new CSS file
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"; // Import quote icons

const testimonials = [
    {
        id: 1,
        name: "John Doe",
        role: "CEO, Tech Innovations",
        text: "Zaaric transformed our digital presence with their cutting-edge solutions. Highly recommended!",
    },
    {
        id: 2,
        name: "Jane Smith",
        role: "Founder, Creative Studio",
        text: "Their team is incredibly talented and professional. They delivered beyond our expectations.",
    },
    {
        id: 3,
        name: "Michael Brown",
        role: "CTO, NextGen Solutions",
        text: "The best decision we made was partnering with Zaaric. Their expertise is unmatched.",
    },
    {
        id: 4,
        name: "Emily Davis",
        role: "Marketing Head, Bright Ideas",
        text: "Zaaric's creativity and technical skills are truly exceptional. A game-changer for our business!",
    },
];

const TestimonialSection = forwardRef((props, ref) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [exitIndex, setExitIndex] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setExitIndex(activeIndex); // Set the exiting testimonial
            setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000); // Change testimonial every 5 seconds

        return () => clearInterval(interval);
    }, [activeIndex]);

    return (
        <section className="testimonials" ref={ref}>
            <h2>What Our Clients Say</h2>
            <div className="testimonial-container">
                {testimonials.map((testimonial, index) => (
                    <div
                        key={testimonial.id}
                        className={`testimonial-card ${index === activeIndex ? "active" : ""
                            } ${index === exitIndex ? "exit" : ""}`}
                    >
                        <div className="quote-icon">
                            <FaQuoteLeft />
                        </div>
                        <p>{testimonial.text}</p>
                        <div className="quote-icon">
                            <FaQuoteRight />
                        </div>
                        <div className="testimonial-author">
                            <h3>{testimonial.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});

export default TestimonialSection;