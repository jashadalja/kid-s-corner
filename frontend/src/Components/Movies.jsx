import React from 'react';
import '../css/style.css'; // Adjust the path as necessary
import cardBg1 from '../assets/card-bg1.png';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Cookies from 'js-cookie'; // Importing js-cookie

const Movies = () => {
  const navigate = useNavigate();
  const serviceID = 'service_2agyi6o';
  const templateID = 'template_m7whu4p';
  const userID = 'HnRQkzYiZqmGw1sKT';

  // Function to check if userEmail is in cookies
  const isUserEmailInCookies = () => {
    return Cookies.get('userEmail') !== undefined; // Adjust the cookie name as needed
  };
  const userEmail=Cookies.get('userEmail')
  const sendMailAndRedirect = (motive, redirectPath) => {
    if (!isUserEmailInCookies()) {
      console.log('User email is not in cookies. Not sending mail.');
      navigate(redirectPath); // Directly navigate without sending email
      return;
    }

    const templateParams = {
      subject: " 📢 Notification: Your Child Is Accessing Kids Corner Website for Learning 📚",
      email:userEmail,
      message1: "We hope you know about that. 🌟",
      motive: motive,
      regards: "Best Regards, Kids Corner",
    };

    console.log('before sending mail');
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((res) => {
        console.log('after sending');
        console.log('SUCCESS!', res.status, res.text);
        console.log('Redirecting to the URL...');
        navigate(redirectPath);
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
          <button className='btn' onClick={() => sendMailAndRedirect("Watching Bal Ganesha Movie 🖥️📖", '/movie1')}>Watch Now</button>
        </div>

        {/* Movie 2 */}
        <div className="box" style={{ background: `url(${cardBg1}) no-repeat` }}>
          <span className="choise">Best</span>
          <div className="movie">
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727418265/sjnx004zbvolg8hvi03o.png' style={{ height: '30vh', width: '20vw' }} alt="Return of Hanuman" />
            <p>Return of Hanuman</p>
          </div>
          <button className='btn' onClick={() => sendMailAndRedirect("Watching Returns Of Hanuman Movie 🖥️📖", '/movie2')}>Watch Now</button>
        </div>

        {/* Movie 3 */}
        <div className="box" style={{ background: `url(${cardBg1}) no-repeat` }}>
          <div className="movie">
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727418265/f6cjucrlbljf2dh4zig1.png' style={{ height: '30vh', width: '20vw' }} alt="Little Krishna" />
            <p>Little Krishna</p>
          </div>
          <button className='btn' onClick={() => sendMailAndRedirect("Watching Little Krishna Movie 🖥️📖", '/movie3')}>Watch Now</button>
        </div>

      </div>
    </section>
  );
};

export default Movies;
