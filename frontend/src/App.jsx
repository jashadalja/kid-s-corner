import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import Cookies to manage cookie storage
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Animal from './Components/Animals';
import Stories from './Components/Stories';
import Games from './Components/Games';
import Movies from './Components/Movies';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Drawing from './Pages/Drawing';
import { Analytics } from "@vercel/analytics/react"
import Story1 from './Pages/Story1';
import Story2 from './Pages/Story2';
import Story3 from './Pages/Story3';
import Story4 from './Pages/Story4';
import Movie1 from './Pages/Movie1';
import Movie2 from './Pages/Movie2';
import Movie3 from './Pages/Movie3';
import Shopping from './Pages/Shopping';
import ProductDetails from './Pages/ProductDetails';
import ScrollToTopButton from './Components/ScrollToTopButton';
import NotFound from './Pages/NotFound';
import EmailPopup from './Components/EmailPopup'; // Import the EmailPopup component
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/style.css';

const App = () => {
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [isBlurred, setIsBlurred] = useState(false);
  var nextPopup = 5000
  // Close the popup and remove the blur effect
  const closePopup = () => {
    setShowPopup(false);
    setIsBlurred(false);
  };

  useEffect(() => {
    // Check if the email is already stored in cookies (account verified)
    const userEmail = Cookies.get('userEmail');

    if (!userEmail) {
      // If no email found in cookies, show the popup after 5 seconds
      const timer = setTimeout(() => {
        setShowPopup(true);
        setIsBlurred(true); // Set background blur when popup is shown
        nextPopup += nextPopup + 5000
      }, nextPopup); // 5 seconds delay

      // Clean up the timer
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <Router>
        <div className={isBlurred ? 'blurred' : ''}>
          {/* Define Routes */}
          <Routes>
            {/* Home Route */}
            <Route path="/" element={
              <>
                <Navbar />
                <Home />
                <Animal />
                <Stories />
                <Games />
                <Movies />
                <Contact />
                <Footer />
              </>
            } />

            {/* Other Routes */}
            <Route path="/drawing" element={<Drawing />} />
            <Route path="/story1" element={<Story1 />} />
            <Route path="/story2" element={<Story2 />} />
            <Route path="/story3" element={<Story3 />} />
            <Route path="/story4" element={<Story4 />} />
            <Route path="/movie1" element={<Movie1 />} />
            <Route path="/movie2" element={<Movie2 />} />
            <Route path="/movie3" element={<Movie3 />} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/productdetails/:productId" element={<ProductDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <ScrollToTopButton />

          {/* Show the popup only if showPopup is true */}
        </div>
      </Router>

      {/* Toast Container for notifications */}
      <ToastContainer position="bottom-right" />

      {/* Email Popup */}
      <div>
        {showPopup && <EmailPopup onClose={closePopup} />}
      </div>
      <Analytics />
    </>
  );
};

export default App;
