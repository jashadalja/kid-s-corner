import React from 'react';
import Cookies from 'js-cookie';
import '../css/style.css'; // Adjust the path if necessary
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const Games = () => {
  const navigate = useNavigate();
  

  const serviceID = 'service_2agyi6o';
  const templateID = 'template_m7whu4p';
  const userID = 'HnRQkzYiZqmGw1sKT';
  // Helper function to send an email only if user email is in cookies
  const sendMailIfEmailExists = (templateParams, redirectUrl) => {
    const userEmail = Cookies.get('userEmail'); // Get email from cookies

    if (userEmail) {
      
      templateParams.email = userEmail;

      console.log('before sending mail');
      emailjs.send(serviceID, templateID, templateParams, userID)
        .then((res) => {
          console.log('after sending mail');
          console.log('SUCCESS!', res.status, res.text);
          console.log('Redirecting to the URL...');
          // Redirect to the game URL
          window.location.href = redirectUrl;
        })
        .catch((error) => {
          console.error('Email sending failed:', error);
        });
    } else {
      console.log('Email not found in cookies, no email sent');
      // Redirect without sending the email
      window.location.href = redirectUrl;
    }
  };

  // Each game click handler function with specific template params and redirect URL
  const sendMailAndRedirectGame1 = () => {
    const templateParams = {
      subject: " 📢 Notification: Your Child Is Accessing Kids Corner Website for Learning 📚",
      message1: "We hope you know about that. 🌟",
      motive: "Playing Addition Game  🖥️📖",
      regards: "Best Regards, Kids Corner",
    };
    sendMailIfEmailExists(templateParams, 'https://www.starfall.com/h/addsub/addsub-ladder');
  };

  const sendMailAndRedirectGame2 = () => {
    const templateParams = {
      subject: " 📢 Notification: Your Child Is Accessing Kids Corner Website for Learning 📚",
      message1: "We hope you know about that. 🌟",
      motive: "Playing Noun Game  🖥️📖",
      regards: "Best Regards, Kids Corner",
    };
    sendMailIfEmailExists(templateParams, 'https://www.starfall.com/h/ela/nounsort/?sn=ela1');
  };

  const sendMailAndRedirectGame3 = () => {
    const templateParams = {
      subject: " 📢 Notification: Your Child Is Accessing Kids Corner Website for Learning 📚",
      message1: "We hope you know about that. 🌟",
      motive: "Playing Clock Game  🖥️📖",
      regards: "Best Regards, Kids Corner",
    };
    sendMailIfEmailExists(templateParams, 'https://www.starfall.com/h/geometry/match-clocks/?mg=k');
  };

  const sendMailAndRedirectGame4 = () => {
    const templateParams = {
      subject: " 📢 Notification: Your Child Is Accessing Kids Corner Website for Learning 📚",
      message1: "We hope you know about that. 🌟",
      motive: "Playing Puzzles Game  🖥️📖",
      regards: "Best Regards, Kids Corner",
    };
    sendMailIfEmailExists(templateParams, 'https://www.starfall.com/h/geometry/puzzles-easy/?mg=k');
  };

  const sendMailAndRedirectGame5 = () => {
    const templateParams = {
      subject: " 📢 Notification: Your Child Is Accessing Kids Corner Website for Learning 📚",
      message1: "We hope you know about that. 🌟",
      motive: "Playing Monkey Mash Game  🖥️📖",
      regards: "Best Regards, Kids Corner",
    };
    sendMailIfEmailExists(templateParams, 'https://www.starfall.com/h/addsub/monkey-mash/?sn=math2');
  };

  const sendMailAndRedirectGame6 = () => {
    const templateParams = {
      subject: " 📢 Notification: Your Child Is Accessing Kids Corner Website for Learning 📚",
      message1: "We hope you know about that. 🌟",
      motive: "Playing Matching Cards Game  🖥️📖",
      regards: "Best Regards, Kids Corner",
    };
    sendMailIfEmailExists(templateParams, 'https://www.starfall.com/h/multdiv/mult03xb/?sn=math2');
  };

  return (
    <section className="games up-and-down" id="games">
      <h1 className="heading">Games</h1>

      <div className="box-container">
        {/* Game 1 */}
        <div className="box">
          <button onClick={sendMailAndRedirectGame1}>
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727415611/jobol00oeyzmsqjtuyoa.png' alt="Addition and Subtraction" />
            <div className="info">
              <h3>Addition and Subtraction</h3>
            </div>
          </button>
        </div>

        {/* Game 2 */}
        <div className="box">
          <button onClick={sendMailAndRedirectGame2}>
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727415604/fdrczumrga77akouwvo4.png' alt="What is noun" />
            <div className="info">
              <h3>What is noun</h3>
            </div>
          </button>
        </div>

        {/* Game 3 */}
        <div className="box">
          <button onClick={sendMailAndRedirectGame3}>
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727415605/znbfqx3yvutrjjexznir.png' alt="Clock Timings" />
            <div className="info">
              <h3>Clock Timings</h3>
            </div>
          </button>
        </div>

        {/* Game 4 */}
        <div className="box">
          <button onClick={sendMailAndRedirectGame4}>
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727415610/oruogw8bsgblovmxyoet.png' alt="Puzzles" />
            <div className="info">
              <h3>Puzzles</h3>
            </div>
          </button>
        </div>

        {/* Game 5 */}
        <div className="box">
          <button onClick={sendMailAndRedirectGame5}>
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727415609/bpaf5d0q5p2vqpcc3oeg.png' alt="Monkey Mash" />
            <div className="info">
              <h3>Monkey Mash</h3>
            </div>
          </button>
        </div>

        {/* Game 6 */}
        <div className="box">
          <button onClick={sendMailAndRedirectGame6}>
            <img src='https://res.cloudinary.com/dhv21yr2v/image/upload/v1727415609/db8qrud57uneate1xreh.png' alt="Matching the cards" />
            <div className="info">
              <h3>Matching the cards</h3>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Games;
