import React from "react";
import "./Portfolio.css"; // Import the CSS file for styling

const Portfolio = () => {
    return (
        <section className="portfolio">
            <h2>Our Portfolio</h2>
            <p className="portfolio-subtitle">Showcasing Excellence in Design, Development, and Editing</p>

            <div className="portfolio-categories">
                {/* Designing Portfolio */}
                <div className="portfolio-card designing">
                    <h3>Designing</h3>
                    <p>Explore our stunning designs that captivate and inspire.</p>
                    <a
                        href="https://drive.google.com/your-design-portfolio-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-btn"
                    >
                        View Designs
                    </a>
                </div>

                {/* Development Portfolio */}
                <div className="portfolio-card development">
                    <h3>Development</h3>
                    <p>Discover our cutting-edge development projects that redefine innovation.</p>
                    <a
                        href="https://drive.google.com/your-development-portfolio-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-btn"
                    >
                        View Projects
                    </a>
                </div>

                {/* Editing Portfolio */}
                <div className="portfolio-card editing">
                    <h3>Editing</h3>
                    <p>Witness our professional editing work that brings stories to life.</p>
                    <a
                        href="https://drive.google.com/your-editing-portfolio-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-btn"
                    >
                        View Edits
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Portfolio;