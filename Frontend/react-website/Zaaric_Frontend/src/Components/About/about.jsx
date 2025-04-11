import React from 'react';
import './about.css'

const About = () => {

    return (
        
        <div>

        < section className = "about" >
                <div className="about-content">
                    <h2>About Us</h2>
                    <p>
                        At ZAARIC, we do not just build digital solutions. we craft
                        experiences that redefine innovation and technology. Our team
                        of visionary developers, designers, and branding experts is
                        dedicated to transforming ideas into reality, delivering
                        high-quality services that make businesses stand out in a competitive landscape.
                    </p>
                     <p>
                        Our mission goes beyond just offering services. We aim to
                        bridge the gap between agencies and clients by ensuring seamless
                        communication, transparency, and top-tier execution. We believe
                        that every brand has a unique story, and we are here to amplify
                        that story with cutting-edge web development, stunning UI/UX design,
                        and powerful branding strategies.
                        With ZAARIC, you do not just get solutions. You get a trusted technology
                        partner committed to your success. Lets create something extraordinary together!<br></br>
                     </p>
                   
                </div>
                <div className="about-image">
                    <img src="/Assets/teamwork1.jpg" alt="Our Team" />
                </div>
        </section >
           
        </div>
    );
};

export default About;
