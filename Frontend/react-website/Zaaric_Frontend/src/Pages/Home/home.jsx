import React, { useRef, useEffect } from "react";
import "./home.css";
import logo from '../../assets/zaaric_logo.png';
import tailoredImg from '/Assets/tailored_img.jpg';
import ZaaricAnimation from "../../Components/ZaaricAnimation/zaaricAnimation";
import circleBg from '/Assets/circle_bg.jpg';
import TestimonialSection from "../../Components/Testimonials/testimonials";
import Contact from "../../Components/Contact/contact";
import Portfolio from "../../Components/Portfolio/portfolio";
import About from '../../Components/About/about.jsx';

const Home = () => {
    const contactRef = useRef(null);
    const servicesRef = useRef(null);
    const tailoredRef = useRef(null);
    const packagesRef = useRef(null);
    const aboutRef = useRef(null);
    const heroRef = useRef(null);

    const scrollToSection = (ref) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Intersection Observer to trigger animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.2, // Trigger when 20% of the section is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-in'); // Add class when in view
                    observer.unobserve(entry.target); // Stop observing after animation triggers
                }
            });
        }, observerOptions);

        // Observe the sections
        if (servicesRef.current) observer.observe(servicesRef.current);
        if (tailoredRef.current) observer.observe(tailoredRef.current);
        if (packagesRef.current) observer.observe(packagesRef.current);
        if (aboutRef.current) observer.observe(aboutRef.current); // Add About section

        // Cleanup observer on component unmount
        return () => {
            if (servicesRef.current) observer.unobserve(servicesRef.current);
            if (tailoredRef.current) observer.unobserve(tailoredRef.current);
            if (packagesRef.current) observer.unobserve(packagesRef.current);
            if (aboutRef.current) observer.unobserve(aboutRef.current); // Cleanup for About
        };
    }, []);

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero" id="hero" ref={heroRef}>
                <div className="hero-bg">
                    <img src={circleBg} alt="Tech Circle Background" className="circle-bg" />
                </div>
                <div className="hero-content">
                    <div className="heroMainText">
                        <img src={logo} height="60px" width="300px" alt="Zaaric Logo" />
                        <h2>Defining your Digital Excellence</h2>
                    </div>
                    <p>Elevate your brand with cutting-edge development, stunning graphics, and premium editing.</p>
                    <button onClick={() => scrollToSection(contactRef)} className="cta-btn">Get Started</button>
                </div>
            </section>

            {/* Services Section */}
            <section className="services" ref={servicesRef} id="services">
                <h2>Our Expertise</h2>
                <div className="service-cards">
                    <div onClick={() => scrollToSection(contactRef)} className="service-card"><h3>Web & App Development</h3><p>Building seamless, high-performance digital experiences.</p></div>
                    <div onClick={() => scrollToSection(contactRef)} className="service-card"><h3>UIUX & Graphic Design</h3><p>Stunning visuals that captivate audiences.</p></div>
                    <div onClick={() => scrollToSection(contactRef)} className="service-card"><h3>Video Editing</h3><p>Professional-grade editing for storytelling.</p></div>
                    <div onClick={() => scrollToSection(contactRef)} className="service-card"><h3>SEO Services</h3><p>Ranking your business professionally on digital platforms</p></div>
                    <div onClick={() => scrollToSection(contactRef)} className="service-card"><h3>Brand Designing</h3><p>Creating the unique identity of your brand from scratch.</p></div>
                    <div onClick={() => scrollToSection(contactRef)} className="service-card"><h3>Cutting-edge Solutions</h3><p>We foster cutting-edge digital solutions with blockchain and AI</p></div>
                </div>
                <div className="srvc_logo">
                    <ZaaricAnimation></ZaaricAnimation>
                </div>
            </section>

            {/* Special Packages Section */}
            <section className="special-packages" ref={packagesRef} id="packages">
                <h2>Tailored Packages for <span>Your Niche</span></h2>
                <p>We offer specialized solutions designed to meet the unique needs of your industry.</p>
                <div className="package-cards">
                    <div className="package-card">
                        <img src="/Assets/socials.jpg" alt="Social Media Influencer" height="200px" />
                        <h3>Social Media Influencer</h3>
                        <p id="social_media_influencer">Boost your online presence with custom content and branding. From post designs to content strategy, we provide everything you need.</p>
                    </div>
                    <div className="package-card">
                        <img src="/Assets/youtube.jpg" alt="YouTuber" height="200px" />
                        <h3>YouTuber</h3>
                        <p>Enhance your videos with professional editing and thumbnails. Choose a custom package according to your content niche and feasibility.</p>
                    </div>
                    <div className="package-card">
                        <img src="/Assets/business.jpg" alt="Business Owner" height="190px" />
                        <h3>Business Owner</h3>
                        <p>Streamline your operations with custom web and app solutions. We are here to redefine your digital presence.</p>
                    </div>
                    <div className="package-card">
                        <img src="/Assets/entrepreneur.jpg" alt="Entrepreneur" height="190px" />
                        <h3>Entrepreneur</h3>
                        <p>Launch your startup with cutting-edge tech and branding. Don’t worry about brand kits, logos, and establishing a strong brand identity with us.</p>
                    </div>
                </div>
            </section>

            {/* Client-Tailored Solutions Section */}
            <section className="tailored" ref={tailoredRef}>
                <div className="tailored-text">
                    <h2>Client-Tailored Solutions</h2>
                    <p>Every business is unique, and so are our solutions. We craft strategies that align with your brand's specific needs. Choose a customized plan and make your own bundle of services.</p>
                    <button onClick={() => scrollToSection(contactRef)} className="cta-btn">Get Your Custom Plan</button>
                </div>
                <div className="tailored-img">
                    <img src={tailoredImg} alt="Tailored Solutions" />
                </div>
            </section>

            {/* About Section */}
            <div ref={aboutRef} id="about" className="about-section">
                <About></About>
            </div>

            {/* Testimonials Section */}
            <TestimonialSection />

            {/* Contact Section */}
            <div ref={contactRef} id="contact">
                <Contact></Contact>
            </div>

            {/* Footer Section */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-logo">
                        <h2>ZAARIC</h2>
                        <p>Defining Digital Excellence</p>
                    </div>
                    <div className="footer-links">
                        <a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Home</a>
                        <a href="/" onClick={(e) => { e.preventDefault(); scrollToSection(servicesRef) }}>Services</a>
                        <a href="/" onClick={(e) => { e.preventDefault(); scrollToSection(aboutRef) }}>About Us</a>
                        <a href="/" onClick={(e) => { e.preventDefault(); scrollToSection(contactRef) }}>Contact</a>
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