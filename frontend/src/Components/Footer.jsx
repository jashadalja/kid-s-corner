import React, { useEffect, useState } from 'react';
import '../css/style.css'; // Adjust path to your CSS file

const Footer = () => {
  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);

  // Show/hide scroll to top button based on scroll position
  const handleScroll = () => {
    if (window.scrollY > 900) {
      setScrollToTopVisible(true);
    } else {
      setScrollToTopVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="footer">
        created by <span>Jash Adalja</span> | @all rights reserved!
      </div>

      {/* Scroll to top button */}
      {scrollToTopVisible && (
        <button onClick={scrollToTop} id="scrollToTopBtn" title="Go to top">
          <i className="fa fa-solid fa-arrow-up"></i>
        </button>
      )}
    </>
  );
};

export default Footer;
