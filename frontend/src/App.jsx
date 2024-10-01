// src/App.jsx

import React from 'react';
import axios from 'axios';
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

import './css/style.css';

const App = () => {
  
  return (
    <Router>
      <div>
    

        {/* Navigation Bar */}

        {/* Define Routes */}
        <Routes>
          {/* Home Route */}
          <Route path="/" element={
            <>
        <Navbar />

              <Home />
              <Animal/>
              <Stories />
              <Games />
              <Movies />
              <Contact />
              <Footer />
            </>
          } />

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
          <Route path="*" element={<NotFound/>} />
        </Routes>


        <ScrollToTopButton />
      </div>
    </Router>
  );
};

export default App;
