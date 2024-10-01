import React from 'react';
import '../css/style.css'; // Adjust the path if necessary



import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Stories = () => {

  const navigate = useNavigate();
  const serviceID = 'service_2agyi6o';
  const templateID = 'template_m7whu4p';
  const userID = 'HnRQkzYiZqmGw1sKT';

  const sendMailAndRedirectStory1 = () => {
    const templateParams = {
      subject: " 📢 Notification: Your Child Is Accessing Kids Corner Website for Learning 📚",
      message1: "We hope you know about that. 🌟",
      motive: "Reading Rabbit And Turtle Story  🖥️📖",
      regards: "Best Regards, Kids Corner",
    };
    console.log('before sending mail')
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((res) => {
        console.log('after sennd ')
        console.log('SUCCESS!', res.status, res.text);
        console.log('Redirecting to the URL...');
       
        navigate('/story1')
      })
      .catch((error) => {
        console.error('Email sending failed:', error);

      });
  };
  const sendMailAndRedirectStory2 = () => {

    const templateParams = {
      subject: " 📢 Notification: Your Child Is Accessing Kids Corner Website for Learning 📚",
      message1: "We hope you know about that. 🌟",
      motive: "Reading Thirsty Crow Story  🖥️📖",
      regards: "Best Regards, Kids Corner",
    };
    console.log('before sending mail')
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((res) => {
        console.log('after sennd ')
        console.log('SUCCESS!', res.status, res.text);
        console.log('Redirecting to the URL...');
       
        navigate('/story2')
      })
      .catch((error) => {
        console.error('Email sending failed:', error);

      });
  };
  const sendMailAndRedirectStory3 = () => {
    const templateParams = {
      subject: " 📢 Notification: Your Child Is Accessing Kids Corner Website for Learning 📚",
      message1: "We hope you know about that. 🌟",
      motive: "Reading Mouse And Lion Story 🖥️📖",
      regards: "Best Regards, Kids Corner",
    };
    console.log('before sending mail')
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((res) => {
        console.log('after sennd ')
        console.log('SUCCESS!', res.status, res.text);
        console.log('Redirecting to the URL...');
        
        navigate('/story3')
      })
      .catch((error) => {
        console.error('Email sending failed:', error);

      });
  };
  const sendMailAndRedirectStory4 = () => {

    const templateParams = {
      subject: " 📢 Notification: Your Child Is Accessing Kids Corner Website for Learning 📚",
      message1: "We hope you know about that. 🌟",
      motive: " Reading Fox And Grapes Story 🖥️📖",
      regards: "Best Regards, Kids Corner",
    };
    console.log('before sending mail')
    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((res) => {
        console.log('after sennd ')
        console.log('SUCCESS!', res.status, res.text);
        console.log('Redirecting to the URL...');
       
        navigate('/story4')
      })
      .catch((error) => {
        console.error('Email sending failed:', error);

      });
  };


  return (
    <section className="stories background" id="stories">
      <h1 className="heading">Amazing Stories</h1>

      <div className="box-container">
        {/* Rabbit and Tortoise */}
        <button onClick={sendMailAndRedirectStory1}>
          <div className="box">
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/f_auto,q_auto/ucz1geiv4vicvtcaeiq9' alt="Rabbit and Tortoise" className="storiesimg" />
            <h3>Rabbit and Tortoise</h3>
            <span>Best</span>
            <p>In a race between an overconfident one rabbit and an intelligent tortoise.   </p>
          </div>
        </button>

        {/* Thirsty Crow */}
        <button onClick={sendMailAndRedirectStory2}>
          <div className="box">
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/f_auto,q_auto/tew2ufbuu5yd3bg8mph0' alt="Thirsty Crow" className="storiesimg" />
            <h3>Thirsty Crow</h3>
            <span>Best</span>
            <p>The intelligence and resourcefulness of a crow overcome challenges.</p>
          </div>
        </button>

        {/* Mouse and Lion */}
        <button onClick={sendMailAndRedirectStory3}>
          <div className="box">
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/f_auto,q_auto/lznwaxkgxhpc6ddotdtl' alt="Mouse and Lion" className="storiesimg" />
            <h3>Mouse and Lion</h3>
            <span>Best</span>
            <p>A mouse cleverly uses its intelligence to aid a mighty lion in times of need.</p>
          </div>
        </button>

        {/* The Fox and Grapes */}
        <button onClick={sendMailAndRedirectStory4}>
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
