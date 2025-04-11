import React, { useEffect, useRef } from 'react';
import './loading.css';

const LoadingPage = ({ setLoading }) => {
    const progressBarRef = useRef(null);
    const logoContainerRef = useRef(null);
    const logoCircleRef = useRef(null);
    const logoTextRef = useRef(null);
    const loadingBarRef = useRef(null);

    useEffect(() => {
        const progressBar = progressBarRef.current;
        const logoContainer = logoContainerRef.current;
        const logoCircle = logoCircleRef.current;
        const logoText = logoTextRef.current;
        const loadingBar = loadingBarRef.current;

        if (progressBar && logoContainer && logoCircle && logoText && loadingBar) {
            progressBar.style.animation = 'progress 2.5s ease-in-out forwards';
            logoContainer.style.animation = 'fadeIn 1s ease forwards';
            logoCircle.style.animation = 'rotate 2s linear infinite';
            logoText.style.animation = 'fadeIn 1s ease forwards 0.5s';
            loadingBar.style.animation = 'expandLine 1s ease forwards';
        }

        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [setLoading]);

    return (
        <div className="loading-page">
            <div className="logo-container" ref={logoContainerRef}>
                <div className="logo-circle" ref={logoCircleRef}></div>
                <div className="logo-text" ref={logoTextRef}>Zaaric</div>
            </div>
            <div className="loading-bar" ref={loadingBarRef}>
                <div className="loading-progress" ref={progressBarRef}></div>
            </div>
        </div>
    );
};

export default LoadingPage; 