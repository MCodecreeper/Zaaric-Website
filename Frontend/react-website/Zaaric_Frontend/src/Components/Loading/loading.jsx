import React, { useRef, useEffect, Suspense } from 'react';
import { gsap } from 'gsap';
import { Canvas } from '@react-three/fiber';
import ThreeDLoader from './ThreeDLoader';
import './loading.css';

// Fallback component while 3D content loads
const LoadingFallback = () => (
    <div style={{ color: '#2EC4B6', fontSize: '1.5rem' }}>
        Loading 3D elements...
    </div>
);

const Loading = ({ onLoadingComplete, setLoading }) => {
    const loadingRef = useRef();
    const progressRef = useRef();
    const cursorRef = useRef();

    useEffect(() => {
        // Progress bar animation
        const progressTl = gsap.timeline();

        if (progressRef.current) {
            progressTl
                .to(progressRef.current, {
                    width: '200%',
                    duration: 8,
                    ease: 'power1.inOut'
                })
                .to(loadingRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => {
                        if (onLoadingComplete) {
                            onLoadingComplete();
                        } else if (setLoading) {
                            setLoading(false);
                        }
                    }
                });
        }

        // Custom cursor animation
        const handleMouseMove = (e) => {
            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [onLoadingComplete, setLoading]);

    return (
        <div className="loading-container" ref={loadingRef}>
            <div className="loading-content">
                <div className="three-d-container">
                    <Canvas
                        gl={{ antialias: true }}
                        camera={{ 
                            position: [0, 0, 5],
                            fov: 50,
                            near: 0.3,
                            far: 1000
                        }}
                        style={{ 
                            background: 'transparent',
                            width: '500%',
                            height: '300%',
                            marginLeft: '-200%',
                            marginTop: '-100%'
                        }}
                    >
                        <Suspense fallback={null}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={1} />
                            <ThreeDLoader />
                        </Suspense>
                    </Canvas>
                </div>
                <div className="loading-text">
                    <h1>ZAARIC</h1>
                    <p>Loading Innovation...</p>
                </div>
                <div className="progress-bar">
                    <div className="progress" ref={progressRef}></div>
                </div>
            </div>
            <div className="custom-cursor" ref={cursorRef}></div>
        </div>
    );
};

export default Loading;
