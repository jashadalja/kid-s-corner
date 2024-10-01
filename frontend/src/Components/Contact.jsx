import React from 'react';
import '../css/style.css'; // Adjust path to your CSS file



const Contact = () => {
  return (
    <section className="contact background" id="contact">
      <div className="row">

        {/* Contact Info Section */}
        <div className="contact-info">
          <div className="box">
            <h3 className="title">Contact Details</h3>
            <p><i className="fas fa-map-marker-alt"></i> Ahmedabad, India - 380015.</p>
            <p><i className="fas fa-envelope"></i> jashadalja12@gmail.com</p>
            <p><i className="fas fa-phone"></i> +91 9106381073</p>
          </div>

          <div className="box">
            <h3 className="title">Follow Us</h3>
            <a href="https://www.instagram.com/______jash______/" className="fab fa-instagram"></a>
            <a href="https://in.linkedin.com/in/jash-adalja-445472270" className="fab fa-linkedin"></a>
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form">
          <h3>Contact Us</h3>
          <input type="text" placeholder="Name" className="box" />
          <input type="email" placeholder="Email" className="box" />
          <input type="number" placeholder="Number" className="box" />
          <textarea placeholder="Message" className="box message" cols="30" rows="10"></textarea>
          <a href="mailto:jashadalja12@gmail.com" className="btn">Send Message</a>
        </form>

      </div>

      {/* Contact Image */}
      <div className="image">
        <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727415602/talxj9ymxcebdtlwmuuq.png' alt="Contact" />
      </div>
    </section>
  );
};

export default Contact;
