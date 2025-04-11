import React, { useState } from "react";
import emailjs from "emailjs-com";
import './contact.css'

const Contact = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        packageType: "Custom",  // Default value for dropdown
        message: ""
    });

    // Handles input changes for all form fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send(
            "service_7iqpwdh",  // Replace with your EmailJS Service ID
            "template_tysc8zc",  // Replace with your EmailJS Template ID
            {
                from_name: formData.name,
                from_email: formData.email,
                package: formData.packageType,
                message: formData.message,
                to_email: "services@zaaric.com"  // Ensure this is added in your EmailJS template
            },
            "-OEFtjFY5wjnZGRee"    // Replace with your EmailJS Public Key
        )
        .then((response) => {
            console.log("Email sent successfully!", response);
            setIsSubmitted(true);
            setFormData({ name: "", email: "", packageType: "Custom", message: "" });  // Reset form
        })
        .catch((error) => {

            console.error("Error sending email:", error);
            alert("Failed to send message.");
        });
    };

    return (
       <section className="contact">
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you! Reach out to us for any inquiries or collaborations.</p>

          <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                  <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                  />
              </div>
              <div className="form-group">
                  <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                  />
              </div>
              <div className="form-group">
                  <select
                      name="packageType"
                      value={formData.packageType}
                      onChange={handleChange}
                        required
                        className='select-package'
                  >
                      <option value="Custom" disabled>
                          Select Package
                      </option>
                      <option value="Youtuber">Youtuber</option>
                      <option value="Businessman">Businessman</option>
                      <option value="Entrepreneur">Entrepreneur</option>
                      <option value="Social Media Influencer">Social Media Influencer</option>
                      <option value="None">None</option>
                  </select>
              </div>
              <div className="form-group">
                  <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                  />
              </div>
              <button type="submit" className="submit-btn">
                  Send Message
              </button>
          </form>

          {isSubmitted && (
              <div className="success-message">
                  <p>Your message has been sent successfully! 🎉</p>
              </div>
          )}
      </section>
    );
};

export default Contact;
