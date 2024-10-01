import React from 'react';
import '../css/style.css'; // Adjust the path as necessary

// Importing images from assets
import cardBg1 from '../assets/card-bg1.png';

import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Movies = () => {
  const navigate = useNavigate();
  const serviceID = 'service_2agyi6o';
  const templateID = 'template_m7whu4p';
  const userID = 'HnRQkzYiZqmGw1sKT';
  const sendMailAndRedirectMovie1 = () => {
    const templateParams = {
      subject: " 📢 Notification: Your Child Is Accessing Kids Corner Website for Learning 📚",
      message1: "We hope you know about that. 🌟",
      motive: "Watching Bal Ganesha Movie  🖥️📖",
      regards: "Best Regards, Kids Corner",
    };
    console.log('before sending mail')
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((res) => {
        console.log('after sennd ')
        console.log('SUCCESS!', res.status, res.text);
        console.log('Redirecting to the URL...');
        navigate('/movie1')
      })
      .catch((error) => {
        console.error('Email sending failed:', error);

      });
  };
  const sendMailAndRedirectMovie2 = () => {
    const templateParams = {
      subject: " 📢 Notification: Your Child Is Accessing Kids Corner Website for Learning 📚",
      message1: "We hope you know about that. 🌟",
      motive: "Watching Returns Of Hanuman Movie  🖥️📖",
      regards: "Best Regards, Kids Corner",
    };
    console.log('before sending mail')
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((res) => {
        console.log('after sennd ')
        console.log('SUCCESS!', res.status, res.text);
        console.log('Redirecting to the URL...');
        navigate('/movie2')
      })
      .catch((error) => {
        console.error('Email sending failed:', error);

      });
  };
  const sendMailAndRedirectMovie3 = () => {
    const templateParams = {
      subject: " 📢 Notification: Your Child Is Accessing Kids Corner Website for Learning 📚",
      message1: "We hope you know about that. 🌟",
      motive: "Watching Little Krishna Movie  🖥️📖",
      regards: "Best Regards, Kids Corner",
    };
    console.log('before sending mail')
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((res) => {
        console.log('after sennd ')
        console.log('SUCCESS!', res.status, res.text);
        console.log('Redirecting to the URL...');
        navigate('/movie3')
      })
      .catch((error) => {
        console.error('Email sending failed:', error);

      });
  };

  return (
    <section className="movies up-and-down" id="movies">
      <h1 className="heading">Movies</h1>

      <div className="box-container">

        {/* Movie 1 */}
        <div className="box" style={{ background: `url(${cardBg1}) no-repeat` }}>
          <div className="movie">
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727418265/rjcikoggjqy9mkofkjsa.png' style={{ height: '30vh', width: '22vw' }} alt="Bal Ganesh" />
            <p>Bal Ganesh</p>
          </div>
          <button className='btn' onClick={sendMailAndRedirectMovie1}>Watch Now</button>
        </div>

        {/* Movie 2 */}
        <div className="box" style={{ background: `url(${cardBg1}) no-repeat` }}>
          <span className="choise">Best</span>
          <div className="movie">
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727418265/sjnx004zbvolg8hvi03o.png' style={{ height: '30vh', width: '20vw' }} alt="Return of Hanuman" />
            <p>Return of Hanuman</p>
          </div>
          <button className='btn' onClick={sendMailAndRedirectMovie2}>Watch Now</button>
        </div>

        {/* Movie 3 */}
        <div className="box" style={{ background: `url(${cardBg1}) no-repeat` }}>
          <div className="movie">
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727418265/f6cjucrlbljf2dh4zig1.png' style={{ height: '30vh', width: '20vw' }} alt="Little Krishna" />
            <p>Little Krishna</p>
          </div>
          <button className='btn' onClick={sendMailAndRedirectMovie3}>Watch Now</button>
        </div>

      </div>
    </section>
  );
};

export default Movies;
