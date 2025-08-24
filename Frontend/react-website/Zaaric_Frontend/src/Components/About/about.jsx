import React from 'react';
import './about.css'

const About = () => {

    return (
        
        <div>

        < section className = "about" >
                <div className="about-content">
                    <h2>OUR PHILOSOPHY</h2>
                    <p>
                    At Zaaric, we believe that ideas are the seeds of transformation. Our philosophy is grounded in the principle that technology, when combined with strategic vision, has the power to convert abstract concepts into market-ready solutions that drive meaningful impact.

                    We embrace a client-first mindset, where understanding the unique challenges and goals of each partner is paramount. Every project is approached with precision, creativity, and a commitment to excellence, ensuring that solutions are not only functional but also scalable, sustainable, and forward-looking.
                    </p>
                     <p>
                     Innovation at Zaaric is purposeful. We don’t pursue technology for its own sake; we leverage it to solve real-world problems, streamline processes, and unlock new opportunities. Collaboration, transparency, and ethical responsibility guide every decision, reflecting our unwavering dedication to creating value that endures.

                     In essence, Zaaric exists to bridge the gap between vision and execution, transforming ambitious ideas into tangible outcomes while setting new standards in technology-driven enterprise solutions.
                     </p>
                     <div className="founder-section">
                     <h4> Founder and CEO</h4>
                     <h3> Hamza Kamran </h3>
                     </div>
                   
                </div>
                <div className="about-image">
                    <img src="/Assets/teamwork1.jpg" alt="Our Team" />
                </div>
        </section >
           
        </div>
    );
};

export default About;
