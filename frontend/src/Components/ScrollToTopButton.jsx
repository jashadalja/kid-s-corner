// src/components/ScrollToTopButton.jsx

import React, { useState, useEffect } from 'react';
import '../css/style.css'; // Ensure your styles are imported
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled beyond 900px
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 900) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Cleanup
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          id="scrollToTopBtn"
          title="Go to top"
          className="scroll-to-top"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;
