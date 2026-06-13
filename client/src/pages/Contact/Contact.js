import React, { useState } from 'react';
import './Contact.css';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { BsGithub, BsLinkedin, BsFacebook } from 'react-icons/bs';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all fields.");
      return;
    }
    // Success feedback
    alert(`Thank you, ${formData.name}! Your message has been sent successfully.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div id="contact" className="container-fluid contact">
      <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">Contact</h2>
      <hr />
      
      <div className="container">
        <div className="row">
          {/* Left Side: Contact Information */}
          <div className="col-md-5 mb-4 mb-md-0">
            <div className="contact-info-card">
              <div>
                <h3>Connect With Me</h3>
                <p>
                  Have an exciting project, job opportunity, or just want to chat about Mechatronics and Web Development? Drop me a line, and I will get back to you as soon as possible!
                </p>
                
                <div className="contact-details">
                  <div className="contact-detail-item">
                    <MdEmail />
                    <span>yeyint2702@gmail.com</span>
                  </div>
                  <div className="contact-detail-item">
                    <MdPhone />
                    <span>+95 9 798 123456</span>
                  </div>
                  <div className="contact-detail-item">
                    <MdLocationOn />
                    <span>Yangon, Myanmar</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="social-links">
                  <a href="https://github.com/YeYintLin" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
                    <BsGithub />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
                    <BsLinkedin />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon" aria-label="Facebook">
                    <BsFacebook />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side: Contact Form */}
          <div className="col-md-7">
            <div className="contact-form-container">
              <h3>Send a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control-custom"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control-custom"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control-custom"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-submit">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
