import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import React from 'react';
import './zaaricAnimation.css';

const ZaaricAnimation = () => {
    const controls = useAnimation();
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    controls.start("visible");
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [controls]);

    const letterVariants = {
        hidden: { opacity: 0, y: -50, rotateX: -90, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            color: "#00ffcc", // Initial color
            transition: {
                delay: i * 0.15,
                duration: 0.75,
                ease: "easeOut",
                color: { delay: i * 0.15 + 0.5, duration: 1, ease: "easeInOut" }, // Color transition
            },
        }),
    };

    return (
        <div ref={ref} className="zaaric-container">
            <motion.h1
                className="zaaric-heading"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
            >
                {"ZAARIC".split("").map((char, i) => (
                    <motion.span
                        key={i}
                        custom={i}
                        variants={letterVariants}
                        className="letter"
                        style={{ display: "inline-block" }} // Ensure letters are inline-block for transformations
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.h1>
            {isVisible && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="sub-heading"
                >
                    Powering Innovation, Crafting Solutions
                </motion.p>
            )}
            
        </div>
    );
};

export default ZaaricAnimation;