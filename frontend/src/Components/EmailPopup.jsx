import React, { useState } from 'react';
import Cookies from 'js-cookie';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  

  const sendOtpEmail = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    setGeneratedOtp(otp);
    
    const serviceID = 'service_2agyi6o';
    const templateID = 'template_m7whu4p';
    const userID = 'HnRQkzYiZqmGw1sKT';

    const templateParams = {
      subject: "📢 OTP For Kid's Corner 📚",
      email: `${email}`, 
      message1: `${otp}`,
      motive: `You are verifying your email for Kid's Corner. Your OTP: ${otp}`,
      regards: "Best Regards, Kids Corner",
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((res) => {
        toast.success(`OTP sent to ${email}`);
        setShowOtpInput(true); // Show OTP input field
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        toast.error("Failed to send OTP.");
      });
  };

  const handleContinue = () => {
    if (email) {
      sendOtpEmail();
    } else {
      toast.error('Enter email id')
    }
  };

  const verifyOtp = () => {
    if (enteredOtp === generatedOtp) {
      Cookies.set('userEmail', email, { expires: 7 }); // Store email in cookies for 7 days
      toast.success("OTP verified successfully!");
      onClose(); // Close popup
    } else {
      toast.error("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Would you like to stay updated on exciting content for your kids?</h2>

        {!showOtpInput ? (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email ID"
              required
            />
            <div className="popup-buttons">
              <button className="continuebutton" onClick={handleContinue}>Continue</button>
              <button className="skipbutton" onClick={onClose}>Skip</button>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              placeholder="Enter the OTP sent to your email"
              required
            />
            <div className="popup-buttons">
              <button className='continuebutton' onClick={verifyOtp}>Verify OTP</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailPopup;
