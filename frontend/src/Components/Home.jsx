// src/components/Home.jsx
import React, { useRef, useEffect } from 'react';
import '../css/style.css';

import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const audioRef = useRef(null);
  const elephantRef = useRef(null);

  const navigate = useNavigate();

  const serviceID = 'service_2agyi6o';
  const templateID = 'template_m7whu4p';
  const userID = 'HnRQkzYiZqmGw1sKT';

  const sendMailAndRedirect = () => {
  

    const templateParams = {
      subject: " 📢 Notification: Your Child Is Accessing Kids Corner Website for Learning 📚",
      message1: "We hope you know about that. 🌟",
      motive: ` doing art  🖥️📖  `,
      regards: "Best Regards, Kids Corner",
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((res) => {
        console.log('SUCCESS!', res.status, res.text);
        navigate('/drawing'); // Redirect to /drawing
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
      });
  };

  const playSound = () => {
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise != undefined) {
        playPromise.catch((error) => {
          console.log('Audio playback prevented:', error);
          // Optional: provide feedback to user that audio requires interaction
        });
      }
    }
  };

  const animateElephant = () => {
    if (elephantRef.current) {
      elephantRef.current.classList.add('wave-animation');
      setTimeout(() => {
        elephantRef.current.classList.remove('wave-animation');
      }, 500); // Duration of the animation
    }
  };

  useEffect(() => {
    // Ensure audio is preloaded when the page loads
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, []);

  return (
    <section className="home background" id="home">
      <div className="content">
        <h1>Welcome to Kid's Corner</h1>
        <h3>Making education more fun.</h3>
        <p>
          Welcome to Kids Corner, where learning meets fun! Our website is dedicated to providing an enriching
          educational experience for children, blending essential learning concepts with engaging and entertaining
          activities. From interactive games to captivating lessons, we strive to make learning a delightful
          adventure for young minds.
        </p>

        <button onClick={sendMailAndRedirect} className="btn">Let's Art</button>
      </div>

      <div className="image">
        <img
          ref={elephantRef}
          id="elephant"
          src="https://res.cloudinary.com/dhv21yr2v/image/upload/v1727416483/aepzhz9oi8ffqnpdd53a.png"
          alt="Elephant"
          onMouseLeave={animateElephant}
          onMouseEnter={playSound}
        />
        <audio ref={audioRef} id="elephant-sound" src="https://res.cloudinary.com/dhv21yr2v/video/upload/v1727416575/cif2kbwrxzfartbf2rfv.mp3" preload="auto" />
      </div>
    </section>
  );
};

export default Home;
