// src/components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      animation: 'fadeIn 1s ease-in-out',
    },
    heading: {
      fontSize: '48px',
      color: '#ff5733',
      marginBottom: '20px',
      animation: 'bounce 1s infinite',
    },
    message: {
      fontSize: '20px',
      marginBottom: '30px',
      color: '#555',
    },
    link: {
      fontSize: '18px',
      color: '#007bff',
      textDecoration: 'none',
      padding: '10px 20px',
      border: '2px solid #007bff',
      borderRadius: '5px',
      transition: 'background-color 0.3s ease',
    },
    linkHover: {
      backgroundColor: '#007bff',
      color: '#fff',
    },
  };

  // Add keyframes for animations
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(`
    @keyframes fadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }`, styleSheet.cssRules.length);

  styleSheet.insertRule(`
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-30px); }
      60% { transform: translateY(-15px); }
    }`, styleSheet.cssRules.length);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.message}>Sorry, the page you are looking for does not exist.</p>
      <Link 
        to="/" 
        style={styles.link} 
        onMouseOver={(e) => e.currentTarget.style = { ...styles.link, ...styles.linkHover }} 
        onMouseOut={(e) => e.currentTarget.style = styles.link}
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
