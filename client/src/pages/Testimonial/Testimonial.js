import React from "react";
import "./Testimonial.css";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: "Product Manager, Apex Tech Solutions",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      text: "Ye Yint Lin is an exceptionally talented developer. He joined our team as an intern and immediately made valuable contributions to our MERN stack codebase. His problem-solving skills and prompt communication are top-notch.",
    },
    {
      id: 2,
      name: "David Chen",
      role: "Founder, GreenFields IoT",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      text: "Working with Ye Yint on our automation dashboard was a pleasure. He bridged the gap between hardware sensors and React web interfaces seamlessly. The telemetry system he created exceeded our performance requirements.",
    },
    {
      id: 3,
      name: "Emily Taylor",
      role: "Creative Director, Studio9",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      text: "Ye Yint designed and built our company's portfolio portal. His attention to detail, clean styling transitions, and solid front-end structure made the entire launch process extremely smooth and successful.",
    },
  ];

  return (
    <div id="testimonial" className="container-fluid testimonial">
      <h2 className="col-12 mt-3 mb-1 text-center text-uppercase">Testimonials</h2>
      <hr />
      
      <div className="container">
        <div className="testimonial-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <FaQuoteLeft className="quote-icon" />
              <p className="testimonial-text">"{t.text}"</p>
              <div className="client-info">
                <img src={t.avatar} alt={t.name} className="client-avatar" />
                <h4 className="client-name">{t.name}</h4>
                <span className="client-role">{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
