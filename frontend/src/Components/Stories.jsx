import React from 'react';
import '../css/style.css'; // Adjust the path if necessary
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Cookies from 'js-cookie'; // Importing js-cookie

const Stories = () => {
  const navigate = useNavigate();
  const serviceID = 'service_2agyi6o';
  const templateID = 'template_m7whu4p';
  const userID = 'HnRQkzYiZqmGw1sKT';

  // Function to check if userEmail is in cookies
  
  const userEmail= Cookies.get('userEmail')  // Adjust the cookie name as needed
  

  const sendMailAndRedirect = (motive, redirectPath) => {
    if (userEmail==undefined) {
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
        console.log(userEmail)
        console.error('Email sending failed:', error);
      });
  };

  return (
    <section className="stories background" id="stories">
      <h1 className="heading">Amazing Stories</h1>

      <div className="box-container">
        {/* Rabbit and Tortoise */}
        <button onClick={() => sendMailAndRedirect("Reading Rabbit And Turtle Story 🖥️📖", '/story1')}>
          <div className="box">
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/f_auto,q_auto/ucz1geiv4vicvtcaeiq9' alt="Rabbit and Tortoise" className="storiesimg" />
            <h3>Rabbit and Tortoise</h3>
            <span>Best</span>
            <p>In a race between an overconfident one rabbit and an intelligent tortoise.</p>
          </div>
        </button>

        {/* Thirsty Crow */}
        <button onClick={() => sendMailAndRedirect("Reading Thirsty Crow Story 🖥️📖", '/story2')}>
          <div className="box">
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/f_auto,q_auto/tew2ufbuu5yd3bg8mph0' alt="Thirsty Crow" className="storiesimg" />
            <h3>Thirsty Crow</h3>
            <span>Best</span>
            <p>The intelligence and resourcefulness of a crow overcome challenges.</p>
          </div>
        </button>

        {/* Mouse and Lion */}
        <button onClick={() => sendMailAndRedirect("Reading Mouse And Lion Story 🖥️📖", '/story3')}>
          <div className="box">
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/f_auto,q_auto/lznwaxkgxhpc6ddotdtl' alt="Mouse and Lion" className="storiesimg" />
            <h3>Mouse and Lion</h3>
            <span>Best</span>
            <p>A mouse cleverly uses its intelligence to aid a mighty lion in times of need.</p>
          </div>
        </button>

        {/* The Fox and Grapes */}
        <button onClick={() => sendMailAndRedirect("Reading Fox And Grapes Story 🖥️📖", '/story4')}>
          <div className="box">
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/f_auto,q_auto/mdeahzo1utcparamhrvu' alt="The Fox and Grapes" className="storiesimg" />
            <h3>The Fox and Grapes</h3>
            <span>Best</span>
            <p>The fox learns that what seems unreachable may not be as valuable.</p>
          </div>
        </button>
      </div>
    </section>
  );
};

export default Stories;
